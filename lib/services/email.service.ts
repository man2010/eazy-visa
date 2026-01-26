// src/services/email.service.ts

import nodemailer, { Transporter } from "nodemailer";

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

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    from: EMAIL_FROM || "Eazy-Visa <noreply@eazy-visa.com>",
    adminEmail: ADMIN_EMAIL || "admin@eazy-visa.com",
    frontendUrl: FRONTEND_URL || "http://localhost:3000",
  };
}

class EmailService {
  private transporter: Transporter | null = null;

  /**
   * Initialisation lazy du transporter
   */
  private getTransporter(): Transporter {
    if (this.transporter) return this.transporter;

    const config = getEmailConfig();

    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });

    return this.transporter;
  }

  /* =========================
     RENDEZ-VOUS
     ========================= */

  async sendAppointmentConfirmation(appointment: any) {
    const config = getEmailConfig();
    const transporter = this.getTransporter();

    const mailOptions = {
      from: config.from,
      to: appointment.email,
      cc: config.adminEmail,
      subject: "✅ Confirmation de rendez-vous - Eazy-Visa",
      html: this.renderAppointmentEmail(appointment, config.frontendUrl),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email rendez-vous envoyé:", info.messageId);

    return { success: true, messageId: info.messageId };
  }

  async notifyAdminNewAppointment(appointment: any) {
    const config = getEmailConfig();
    const transporter = this.getTransporter();

    await transporter.sendMail({
      from: config.from,
      to: config.adminEmail,
      subject: `🔔 Nouveau rendez-vous - ${appointment.name}`,
      html: `
        <h2>Nouveau rendez-vous</h2>
        <p><strong>Client:</strong> ${appointment.name}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Téléphone:</strong> ${appointment.phone}</p>
        <p><strong>Date:</strong> ${new Date(
          appointment.date
        ).toLocaleDateString("fr-FR")} à ${appointment.time}</p>
        <p><strong>Service:</strong> ${this.getServiceName(
          appointment.service
        )}</p>
        ${appointment.message ? `<p><strong>Message:</strong> ${appointment.message}</p>` : ""}
      `,
    });

    console.log("✅ Notification admin rendez-vous envoyée");
  }

  /* =========================
     CONTACT
     ========================= */

  async sendContactConfirmation({ name, email }: any) {
    const config = getEmailConfig();
    const transporter = this.getTransporter();

    await transporter.sendMail({
      from: config.from,
      to: email,
      subject: "✅ Nous avons bien reçu votre message - Eazy-Visa",
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Merci de nous avoir contactés.</p>
        <p>Notre équipe vous répondra sous 24h.</p>
        <p><strong>L'équipe Eazy-Visa</strong></p>
      `,
    });

    console.log("✅ Confirmation contact envoyée:", email);
  }

  async notifyAdminContactMessage({ name, email, subject, message }: any) {
    const config = getEmailConfig();
    const transporter = this.getTransporter();

    await transporter.sendMail({
      from: config.from,
      to: config.adminEmail,
      subject: `📩 Message contact - ${subject || "Sans objet"} - ${name}`,
      html: `
        <h2>Nouveau message</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("✅ Notification admin contact envoyée");
  }

  /* =========================
     RÉSERVATION VOL
     ========================= */

  async sendFlightBookingConfirmation(booking: any) {
    const config = getEmailConfig();
    const transporter = this.getTransporter();

    const info = await transporter.sendMail({
      from: config.from,
      to: booking.contacts.email,
      subject: `✈️ Confirmation réservation - ${booking.bookingReference}`,
      html: `
        <h1>Réservation confirmée ✈️</h1>
        <p><strong>Référence:</strong> ${booking.bookingReference}</p>
        <p><strong>Montant:</strong> ${Number(
          booking.totalPrice
        ).toLocaleString()} ${booking.currency}</p>
        <p>Merci de faire confiance à Eazy-Visa.</p>
      `,
    });

    console.log("✅ Email réservation envoyé:", info.messageId);
    return { success: true, messageId: info.messageId };
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
      <h1>✈️ Eazy-Visa</h1>
      <p>Bonjour <strong>${appointment.name}</strong>,</p>
      <p>Votre rendez-vous est confirmé :</p>
      <ul>
        <li>Date : ${new Date(appointment.date).toLocaleDateString("fr-FR")}</li>
        <li>Heure : ${appointment.time}</li>
        <li>Service : ${this.getServiceName(appointment.service)}</li>
      </ul>
      <a href="${frontendUrl}">Visiter notre site</a>
    `;
  }
}


export default new EmailService();