// src/services/email.service.ts

import nodemailer from "nodemailer";

/**
 * Charge et valide la config SMTP AU RUNTIME
 */
function getEmailConfig() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    EMAIL_FROM,
    ADMIN_EMAIL,
    FRONTEND_URL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("❌ Configuration SMTP manquante", {
      SMTP_HOST: !!SMTP_HOST,
      SMTP_USER: !!SMTP_USER,
      SMTP_PASS: !!SMTP_PASS,
    });
    throw new Error("Configuration SMTP invalide");
  }

  // ✅ CRITICAL FIX: Enlever les guillemets si présents (bug Amplify)
  const cleanEmailFrom = EMAIL_FROM
    ? EMAIL_FROM.replace(/^["']|["']$/g, "")
    : "Eazy-Visa <service@eazy-visa.com>";

  // ✅ CRITICAL FIX: Enlever les espaces dans le mot de passe (App Password Gmail)
  const cleanPassword = SMTP_PASS.replace(/\s+/g, "");

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: cleanPassword,
    },
    from: cleanEmailFrom,
    adminEmail: ADMIN_EMAIL || "service@eazy-visa.com",
    frontendUrl: FRONTEND_URL || "https://www.app.eazy-visa.com",
  };
}

class EmailService {
  private transporter: any = null;

  /**
   * Initialisation lazy du transporter
   */
  private getTransporter(): any {
    if (this.transporter) return this.transporter;

    const config = getEmailConfig();

    console.log("📧 Initialisation SMTP avec config:", {
      host: config.host,
      port: config.port,
      secure: config.secure,
      user: config.auth.user,
      from: config.from,
    });

    try {
      this.transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.auth,
        // ✅ AJOUT : Options supplémentaires pour Gmail
        ...(config.host.includes("gmail") && {
          service: "gmail",
        }),
      });

      console.log("✅ Transporter SMTP créé avec succès");
      return this.transporter;
    } catch (error) {
      console.error("❌ Erreur création transporter:", error);
      throw error;
    }
  }

  /* =========================
     RENDEZ-VOUS
     ========================= */

  async sendAppointmentConfirmation(appointment: any) {
    try {
      const config = getEmailConfig();
      const transporter = this.getTransporter();

      const mailOptions = {
        from: config.from,
        to: appointment.email,
        subject: "✅ Confirmation de rendez-vous - Eazy-Visa",
        html: this.renderAppointmentEmail(appointment, config.frontendUrl),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email rendez-vous envoyé:", info.messageId, "à", appointment.email);

      return { success: true, messageId: info.messageId };
    } catch (error: any) {
      console.error("❌ Erreur envoi email rendez-vous:", error);
      throw error;
    }
  }

  async notifyAdminNewAppointment(appointment: any) {
    try {
      const config = getEmailConfig();
      const transporter = this.getTransporter();

      await transporter.sendMail({
        from: config.from,
        to: config.adminEmail,
        subject: `🔔 Nouveau rendez-vous - ${appointment.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #A11C1C;">Nouveau rendez-vous</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Client:</strong> ${appointment.name}</p>
              <p><strong>Email:</strong> ${appointment.email}</p>
              <p><strong>Téléphone:</strong> ${appointment.phone}</p>
              <p><strong>Date:</strong> ${new Date(
                appointment.date
              ).toLocaleDateString("fr-FR")} à ${appointment.time}</p>
              <p><strong>Service:</strong> ${this.getServiceName(
                appointment.service
              )}</p>
              ${
                appointment.message
                  ? `<p><strong>Message:</strong> ${appointment.message}</p>`
                  : ""
              }
            </div>
          </div>
        `,
      });

      console.log("✅ Notification admin rendez-vous envoyée à", config.adminEmail);
    } catch (error: any) {
      console.error("❌ Erreur notification admin rendez-vous:", error);
      throw error;
    }
  }

  /* =========================
     CONTACT
     ========================= */

  async sendContactConfirmation({ name, email }: any) {
    try {
      const config = getEmailConfig();
      const transporter = this.getTransporter();

      await transporter.sendMail({
        from: config.from,
        to: email,
        subject: "✅ Nous avons bien reçu votre message - Eazy-Visa",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #A11C1C;">Message bien reçu</h2>
            <p>Bonjour <strong>${name}</strong>,</p>
            <p>Merci de nous avoir contactés. Notre équipe vous répondra sous 24 heures.</p>
            <p>Cordialement,<br><strong>L'équipe Eazy-Visa</strong></p>
          </div>
        `,
      });

      console.log("✅ Confirmation contact envoyée à", email);
    } catch (error: any) {
      console.error("❌ Erreur confirmation contact:", error);
      throw error;
    }
  }

  async notifyAdminContactMessage({ name, email, subject, message }: any) {
    try {
      const config = getEmailConfig();
      const transporter = this.getTransporter();

      await transporter.sendMail({
        from: config.from,
        to: config.adminEmail,
        subject: `📩 Message contact - ${subject || "Sans objet"} - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #A11C1C;">Nouveau message de contact</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${subject ? `<p><strong>Sujet:</strong> ${subject}</p>` : ""}
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      });

      console.log("✅ Notification admin contact envoyée à", config.adminEmail);
    } catch (error: any) {
      console.error("❌ Erreur notification admin contact:", error);
      throw error;
    }
  }

  /* =========================
     RÉSERVATION VOL
     ========================= */

  async sendFlightBookingConfirmation(booking: any) {
    try {
      const config = getEmailConfig();
      const transporter = this.getTransporter();

      const info = await transporter.sendMail({
        from: config.from,
        to: booking.contacts.email,
        subject: `✈️ Confirmation réservation - ${booking.bookingReference}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #A11C1C;">Réservation confirmée ✈️</h1>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Référence:</strong> ${booking.bookingReference}</p>
              <p><strong>Montant:</strong> ${Number(
                booking.totalPrice
              ).toLocaleString()} ${booking.currency || "XOF"}</p>
              <p><strong>Statut:</strong> ${booking.bookingStatus}</p>
            </div>
            <p>Vous recevrez un email séparé avec votre billet électronique.</p>
            <p>Merci de faire confiance à Eazy-Visa.</p>
            <p><a href="${config.frontendUrl}" style="color: #A11C1C;">Visiter notre site</a></p>
          </div>
        `,
      });

      console.log("✅ Email réservation envoyé:", info.messageId, "à", booking.contacts.email);
      return { success: true, messageId: info.messageId };
    } catch (error: any) {
      console.error("❌ Erreur email réservation:", error);
      throw error;
    }
  }

  /* =========================
     HELPERS
     ========================= */

  private getServiceName(code: string) {
    const services: Record<string, string> = {
      billet: "Billet d'avion",
      hotel: "Réservation d'hôtel",
      visa: "Demande de visa Allemagne",
      assurance: "Assurance voyage",
      formation: "Formation en allemand",
      autre: "Autre service",
    };
    return services[code] || code;
  }

  private renderAppointmentEmail(appointment: any, frontendUrl: string) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #A11C1C;">✈️ Eazy-Visa</h1>
        <p>Bonjour <strong>${appointment.name}</strong>,</p>
        <p>Votre rendez-vous est confirmé :</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date :</strong> ${new Date(appointment.date).toLocaleDateString(
            "fr-FR"
          )}</p>
          <p><strong>Heure :</strong> ${appointment.time}</p>
          <p><strong>Service :</strong> ${this.getServiceName(
            appointment.service
          )}</p>
          ${
            appointment.message
              ? `<p><strong>Message :</strong> ${appointment.message}</p>`
              : ""
          }
        </div>
        <p>Nous vous contacterons prochainement pour confirmer les détails.</p>
        <p>À très bientôt,<br><strong>L'équipe Eazy-Visa</strong></p>
        <p><a href="${frontendUrl}" style="color: #A11C1C; text-decoration: none;">Visiter notre site</a></p>
      </div>
    `;
  }

  /**
   * ✅ TEST de la configuration email
   */
  async testConnection() {
    try {
      const transporter = this.getTransporter();
      await transporter.verify();
      console.log("✅ Connexion SMTP vérifiée avec succès");
      return { success: true, message: "SMTP OK" };
    } catch (error: any) {
      console.error("❌ Erreur vérification SMTP:", error);
      return { success: false, error: error.message };
    }
  }
}

export default new EmailService();