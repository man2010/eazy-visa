// src/lib/services/email.service.ts

import nodemailer from "nodemailer";

// ─────────────────────────────────────────────────────────────────────────────
// BRAND CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const BRAND = {
  primary:    "#A11C1C",
  primaryDark:"#7A1515",
  dark:       "#1a1a2e",
  gray:       "#6B7280",
  lightGray:  "#F9FAFB",
  border:     "#E5E7EB",
  // Logo hébergé sur le domaine public — fallback sur texte si indisponible
  logoUrl:    "https://eazy-visa.com/apple-splash-2868-1320.jpg",
  siteName:   "Eazy-Visa",
  siteUrl:    "https://eazy-visa.com",
  address:    "Keur Gorgui, Dakar, Sénégal",
  phone:      "+221 33 844 12 12",
  supportEmail: "service@eazy-visa.com",
  instagram:  "https://www.instagram.com/eazyvisa",
  whatsapp:   "https://wa.me/221767673838",
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED LAYOUT — Header & Footer brandés
// ─────────────────────────────────────────────────────────────────────────────

function emailHeader(title: string, subtitle?: string): string {
  return `
    <!-- HEADER -->
    <tr>
      <td align="center" style="background: linear-gradient(135deg, ${BRAND.dark} 0%, #2d1b1b 100%); padding: 0;">
        <!-- Logo band -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding: 28px 40px 20px;">
              <img
                src="${BRAND.logoUrl}"
                alt="Eazy-Visa"
                width="140"
                style="display:block; max-width:140px; height:auto;"
                onerror="this.style.display='none'"
              />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px 28px;">
              <div style="display:inline-block; background:${BRAND.primary}; height:3px; width:48px; border-radius:2px; margin-bottom:16px;"></div>
              <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:-0.3px; line-height:1.3;">
                ${title}
              </h1>
              ${subtitle ? `<p style="margin:8px 0 0; color:rgba(255,255,255,0.65); font-size:14px; line-height:1.5;">${subtitle}</p>` : ''}
            </td>
          </tr>
          <!-- Accent bar -->
          <tr>
            <td style="background:${BRAND.primary}; height:4px; padding:0;"></td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function emailFooter(): string {
  return `
    <!-- FOOTER -->
    <tr>
      <td style="background:${BRAND.dark}; padding: 0;">
        <!-- Accent top -->
        <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:${BRAND.primary}; height:3px;"></td></tr></table>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding: 28px 40px 16px;">
              <!-- Links -->
              <p style="margin:0 0 12px; font-size:13px; color:rgba(255,255,255,0.5);">
                <a href="${BRAND.siteUrl}" style="color:${BRAND.primary}; text-decoration:none; font-weight:600;">Notre site</a>
                &nbsp;·&nbsp;
                <a href="${BRAND.whatsapp}" style="color:${BRAND.primary}; text-decoration:none; font-weight:600;">WhatsApp</a>
                &nbsp;·&nbsp;
                <a href="${BRAND.instagram}" style="color:${BRAND.primary}; text-decoration:none; font-weight:600;">Instagram</a>
              </p>
              <!-- Address -->
              <p style="margin:0 0 8px; font-size:12px; color:rgba(255,255,255,0.35); line-height:1.6;">
                📍 ${BRAND.address} &nbsp;|&nbsp; 📞 ${BRAND.phone}
              </p>
              <p style="margin:0; font-size:11px; color:rgba(255,255,255,0.2);">
                © ${new Date().getFullYear()} ${BRAND.siteName} — Tous droits réservés
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function emailWrapper(innerRows: string): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Eazy-Visa</title>
    </head>
    <body style="margin:0; padding:0; background-color:#F3F4F6; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing:antialiased;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F3F4F6; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.10);">
              ${innerRows}
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// INFO ROW helper — ligne clé/valeur dans un tableau de détails
// ─────────────────────────────────────────────────────────────────────────────
function infoRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid ${BRAND.border}; vertical-align:top;">
        <span style="color:${BRAND.gray}; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">${label}</span>
      </td>
      <td style="padding: 8px 0 8px 16px; border-bottom: 1px solid ${BRAND.border}; vertical-align:top;">
        <span style="color:${BRAND.dark}; font-size:14px; font-weight:500;">${value}</span>
      </td>
    </tr>
  `;
}

function detailsCard(title: string, rows: string): string {
  return `
    <div style="background:#FFFFFF; border:1px solid ${BRAND.border}; border-radius:12px; padding:20px 24px; margin: 20px 0;">
      ${title ? `<p style="margin:0 0 14px; font-size:13px; font-weight:700; color:${BRAND.primary}; text-transform:uppercase; letter-spacing:0.8px;">${title}</p>` : ''}
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </div>
  `;
}

function ctaButton(label: string, url: string): string {
  return `
    <div style="text-align:center; margin: 24px 0 8px;">
      <a href="${url}"
        style="display:inline-block; background:${BRAND.primary}; color:#ffffff; text-decoration:none;
               font-weight:700; font-size:14px; padding:14px 36px; border-radius:10px;
               letter-spacing:0.3px; box-shadow: 0 4px 12px rgba(161,28,28,0.35);">
        ${label}
      </a>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG SMTP
// ─────────────────────────────────────────────────────────────────────────────
function getEmailConfig() {
  const {
    SMTP_HOST, SMTP_PORT, SMTP_SECURE,
    SMTP_USER, SMTP_PASS, EMAIL_FROM,
    ADMIN_EMAIL, FRONTEND_URL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("❌ Configuration SMTP manquante", {
      SMTP_HOST: !!SMTP_HOST, SMTP_USER: !!SMTP_USER, SMTP_PASS: !!SMTP_PASS,
    });
    throw new Error("Configuration SMTP invalide");
  }

  const cleanEmailFrom = EMAIL_FROM
    ? EMAIL_FROM.replace(/^["']|["']$/g, "")
    : `${BRAND.siteName} <service@eazy-visa.com>`;

  const cleanPassword = SMTP_PASS.replace(/\s+/g, "");

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: cleanPassword },
    from: cleanEmailFrom,
    adminEmail: ADMIN_EMAIL || BRAND.supportEmail,
    frontendUrl: FRONTEND_URL || BRAND.siteUrl,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE CLASS
// ─────────────────────────────────────────────────────────────────────────────
class EmailService {
  private transporter: any = null;

  private getTransporter(): any {
    if (this.transporter) return this.transporter;

    const config = getEmailConfig();
    console.log("📧 Initialisation SMTP:", {
      host: config.host, port: config.port, secure: config.secure,
      user: config.auth.user, from: config.from,
    });

    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
      ...(config.host.includes("gmail") && { service: "gmail" }),
    });

    console.log("✅ Transporter SMTP créé");
    return this.transporter;
  }

  /* ══════════════════════════════════════════════════════
     RENDEZ-VOUS
  ══════════════════════════════════════════════════════ */

  async sendAppointmentConfirmation(appointment: any) {
    const config = getEmailConfig();
    const html = emailWrapper(`
      ${emailHeader("Rendez-vous confirmé ✅", "Votre rendez-vous a bien été enregistré")}
      <tr>
        <td style="background:#fff; padding: 32px 40px;">
          <p style="margin:0 0 6px; color:${BRAND.dark}; font-size:16px; font-weight:600;">
            Bonjour <span style="color:${BRAND.primary};">${appointment.name}</span>,
          </p>
          <p style="margin:0 0 20px; color:${BRAND.gray}; font-size:14px; line-height:1.7;">
            Nous avons bien enregistré votre rendez-vous. Voici le récapitulatif :
          </p>
          ${detailsCard("Détails du rendez-vous",
            infoRow("📅 Date",    new Date(appointment.date).toLocaleDateString("fr-FR", { weekday:"long", year:"numeric", month:"long", day:"numeric" })) +
            infoRow("⏰ Heure",   appointment.time) +
            infoRow("🎯 Service", this.getServiceName(appointment.service)) +
            (appointment.message ? infoRow("💬 Message", appointment.message) : "")
          )}
          <p style="margin:20px 0 0; color:${BRAND.gray}; font-size:13px; line-height:1.7;">
            Notre équipe vous contactera prochainement pour confirmer les détails de votre rendez-vous.
            En cas de question, n'hésitez pas à nous joindre directement.
          </p>
          ${ctaButton("Visiter notre site", config.frontendUrl)}
        </td>
      </tr>
      ${emailFooter()}
    `);

    const info = await this.getTransporter().sendMail({
      from: config.from,
      to: appointment.email,
      subject: `✅ Confirmation de rendez-vous — ${BRAND.siteName}`,
      html,
    });
    console.log("✅ Email rendez-vous envoyé:", info.messageId, "→", appointment.email);
    return { success: true, messageId: info.messageId };
  }

  async notifyAdminNewAppointment(appointment: any) {
    const config = getEmailConfig();
    const html = emailWrapper(`
      ${emailHeader("🔔 Nouveau rendez-vous", appointment.name)}
      <tr>
        <td style="background:#fff; padding: 32px 40px;">
          ${detailsCard("Informations client",
            infoRow("👤 Nom",     appointment.name) +
            infoRow("📧 Email",   appointment.email) +
            infoRow("📞 Tél",     appointment.phone || "—") +
            infoRow("📅 Date",    new Date(appointment.date).toLocaleDateString("fr-FR") + " à " + appointment.time) +
            infoRow("🎯 Service", this.getServiceName(appointment.service)) +
            (appointment.message ? infoRow("💬 Message", appointment.message) : "")
          )}
        </td>
      </tr>
      ${emailFooter()}
    `);

    await this.getTransporter().sendMail({
      from: config.from,
      to: config.adminEmail,
      subject: `🔔 Nouveau rendez-vous — ${appointment.name}`,
      html,
    });
    console.log("✅ Notif admin rendez-vous → ", config.adminEmail);
  }

  /* ══════════════════════════════════════════════════════
     CONTACT
  ══════════════════════════════════════════════════════ */

  async sendContactConfirmation({ name, email }: any) {
    const config = getEmailConfig();
    const html = emailWrapper(`
      ${emailHeader("Message bien reçu 👋", "Nous vous répondrons très bientôt")}
      <tr>
        <td style="background:#fff; padding: 32px 40px;">
          <p style="margin:0 0 12px; color:${BRAND.dark}; font-size:16px; font-weight:600;">
            Bonjour <span style="color:${BRAND.primary};">${name}</span>,
          </p>
          <p style="margin:0 0 16px; color:${BRAND.gray}; font-size:14px; line-height:1.7;">
            Merci de nous avoir contactés. Notre équipe prend connaissance de votre message
            et vous répondra <strong style="color:${BRAND.dark};">dans les 24 heures</strong>.
          </p>
          <div style="background:${BRAND.lightGray}; border-left:4px solid ${BRAND.primary}; border-radius:0 8px 8px 0; padding:14px 18px; margin:20px 0;">
            <p style="margin:0; font-size:13px; color:${BRAND.gray}; line-height:1.6;">
              💡 <strong>Besoin urgent ?</strong> Contactez-nous directement sur WhatsApp :
              <a href="${BRAND.whatsapp}" style="color:${BRAND.primary}; font-weight:600; text-decoration:none;">+221 76 767 38 38</a>
            </p>
          </div>
          ${ctaButton("Visiter notre site", config.frontendUrl)}
        </td>
      </tr>
      ${emailFooter()}
    `);

    await this.getTransporter().sendMail({
      from: config.from, to: email,
      subject: `✅ Nous avons bien reçu votre message — ${BRAND.siteName}`,
      html,
    });
    console.log("✅ Confirmation contact → ", email);
  }

  async notifyAdminContactMessage({ name, phone, email, subject, message }: any) {
    const config = getEmailConfig();
    const html = emailWrapper(`
      ${emailHeader("📩 Nouveau message de contact", subject || "Sans objet")}
      <tr>
        <td style="background:#fff; padding: 32px 40px;">
          ${detailsCard("Expéditeur",
            infoRow("👤 Nom",    name) +
            infoRow("📧 Email",  email) +
            infoRow("📞 Tél",    phone || "—") +
            (subject ? infoRow("📝 Sujet", subject) : "")
          )}
          <div style="background:${BRAND.lightGray}; border-radius:10px; padding:18px 20px; margin-top:4px;">
            <p style="margin:0 0 8px; font-size:12px; font-weight:700; color:${BRAND.primary}; text-transform:uppercase; letter-spacing:0.8px;">Message</p>
            <p style="margin:0; font-size:14px; color:${BRAND.dark}; line-height:1.7; white-space:pre-wrap;">${message}</p>
          </div>
        </td>
      </tr>
      ${emailFooter()}
    `);

    await this.getTransporter().sendMail({
      from: config.from, to: config.adminEmail,
      subject: `📩 Contact — ${subject || "Sans objet"} — ${name}`,
      html,
    });
    console.log("✅ Notif admin contact → ", config.adminEmail);
  }

  /* ══════════════════════════════════════════════════════
     RÉSERVATION VOL
  ══════════════════════════════════════════════════════ */

  async sendFlightBookingConfirmation(booking: any) {
    const config = getEmailConfig();
    const html = emailWrapper(`
      ${emailHeader("Réservation confirmée ✈️", `Référence : ${booking.bookingReference}`)}
      <tr>
        <td style="background:#fff; padding: 32px 40px;">
          <p style="margin:0 0 16px; color:${BRAND.gray}; font-size:14px; line-height:1.7;">
            Votre vol a bien été réservé. Retrouvez ci-dessous le récapitulatif de votre commande.
          </p>
          ${detailsCard("Détails de la réservation",
            infoRow("🔖 Référence", booking.bookingReference) +
            infoRow("💰 Montant",   `${Number(booking.totalPrice).toLocaleString("fr-FR")} ${booking.currency || "XOF"}`) +
            infoRow("📋 Statut",    booking.bookingStatus)
          )}
          <div style="background:${BRAND.lightGray}; border-left:4px solid ${BRAND.primary}; border-radius:0 8px 8px 0; padding:14px 18px; margin:20px 0;">
            <p style="margin:0; font-size:13px; color:${BRAND.gray}; line-height:1.6;">
              📧 Vous recevrez votre <strong>billet électronique</strong> dans un email séparé sous peu.
            </p>
          </div>
          ${ctaButton("Gérer ma réservation", config.frontendUrl)}
        </td>
      </tr>
      ${emailFooter()}
    `);

    const info = await this.getTransporter().sendMail({
      from: config.from,
      to: booking.contacts.email,
      subject: `✈️ Réservation confirmée — ${booking.bookingReference}`,
      html,
    });
    console.log("✅ Email réservation envoyé:", info.messageId, "→", booking.contacts.email);
    return { success: true, messageId: info.messageId };
  }

  /* ══════════════════════════════════════════════════════
     B2B CORPORATE
  ══════════════════════════════════════════════════════ */

  async sendB2BConfirmation(data: any) {
    const config = getEmailConfig();
    const html = emailWrapper(`
      ${emailHeader("Demande Corporate reçue 🏢", "Notre équipe vous contactera sous 24h")}
      <tr>
        <td style="background:#fff; padding: 32px 40px;">
          <p style="margin:0 0 6px; color:${BRAND.dark}; font-size:16px; font-weight:600;">
            Bonjour <span style="color:${BRAND.primary};">${data.contactName}</span>,
          </p>
          <p style="margin:0 0 20px; color:${BRAND.gray}; font-size:14px; line-height:1.7;">
            Nous avons bien reçu votre demande de devis Corporate pour
            <strong style="color:${BRAND.dark};">${data.companyName}</strong>.
            Notre équipe dédiée aux entreprises analyse votre dossier et vous recontactera
            <strong>dans les 24 heures ouvrables</strong> avec une proposition personnalisée.
          </p>

          ${detailsCard("Votre entreprise",
            infoRow("🏢 Entreprise",   data.companyName) +
            infoRow("🏭 Secteur",      data.sector) +
            infoRow("👥 Effectif",     data.companySize) +
            infoRow("✈️ Voyages/an",   data.annualTrips) +
            infoRow("🌍 Destinations", data.mainDestinations)
          )}

          ${data.services && data.services.length > 0 ? detailsCard("Services souhaités",
            infoRow("🎯 Sélection", data.services.map((s: string) => {
              const labels: Record<string, string> = {
                flights: "Billets d'avion", hotels: "Hébergements", visa: "Visas & démarches",
                insurance: "Assurances voyage", transfers: "Transferts & mobilité", reporting: "Reporting & gestion des coûts",
              };
              return labels[s] || s;
            }).join(" · "))
          ) : ""}

          <div style="background:${BRAND.lightGray}; border-left:4px solid ${BRAND.primary}; border-radius:0 8px 8px 0; padding:14px 18px; margin:20px 0;">
            <p style="margin:0; font-size:13px; color:${BRAND.gray}; line-height:1.6;">
              💡 <strong>Besoin urgent ?</strong> Contactez directement notre équipe Corporate :
              <a href="${BRAND.whatsapp}" style="color:${BRAND.primary}; font-weight:600; text-decoration:none;">+221 76 767 38 38</a>
            </p>
          </div>
          ${ctaButton("Découvrir Eazy-Visa Corporate", config.frontendUrl)}
        </td>
      </tr>
      ${emailFooter()}
    `);

    const info = await this.getTransporter().sendMail({
      from: config.from,
      to: data.email,
      subject: `🏢 Demande Corporate bien reçue — ${BRAND.siteName}`,
      html,
    });
    console.log("✅ Confirmation B2B → ", data.email, info.messageId);
    return { success: true, messageId: info.messageId };
  }

  async notifyAdminB2BRequest(data: any) {
    const config = getEmailConfig();
    const html = emailWrapper(`
      ${emailHeader("🏢 Nouvelle demande Corporate", data.companyName)}
      <tr>
        <td style="background:#fff; padding: 32px 40px;">
          ${detailsCard("Entreprise",
            infoRow("🏢 Nom",         data.companyName) +
            infoRow("🏭 Secteur",     data.sector) +
            infoRow("👥 Effectif",    data.companySize) +
            infoRow("✈️ Voyages/an",  data.annualTrips) +
            infoRow("🌍 Destinations",data.mainDestinations)
          )}
          ${detailsCard("Contact",
            infoRow("👤 Nom",      data.contactName) +
            infoRow("💼 Fonction", data.contactRole) +
            infoRow("📧 Email",    data.email) +
            infoRow("📞 Tél",      data.phone)
          )}
          ${data.services && data.services.length > 0 ? detailsCard("Services souhaités",
            infoRow("🎯 Sélection", data.services.map((s: string) => {
              const labels: Record<string, string> = {
                flights: "Billets d'avion", hotels: "Hébergements", visa: "Visas & démarches",
                insurance: "Assurances voyage", transfers: "Transferts & mobilité", reporting: "Reporting & gestion des coûts",
              };
              return labels[s] || s;
            }).join(" · "))
          ) : ""}
          ${data.message ? `
            <div style="background:${BRAND.lightGray}; border-radius:10px; padding:18px 20px; margin-top:4px;">
              <p style="margin:0 0 8px; font-size:12px; font-weight:700; color:${BRAND.primary}; text-transform:uppercase; letter-spacing:0.8px;">Message</p>
              <p style="margin:0; font-size:14px; color:${BRAND.dark}; line-height:1.7; white-space:pre-wrap;">${data.message}</p>
            </div>
          ` : ""}
        </td>
      </tr>
      ${emailFooter()}
    `);

    await this.getTransporter().sendMail({
      from: config.from,
      to: config.adminEmail,
      subject: `🏢 Corporate — ${data.companyName} (${data.annualTrips})`,
      html,
    });
    console.log("✅ Notif admin B2B → ", config.adminEmail);
  }

  /* ══════════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════════ */

  private getServiceName(code: string): string {
    const services: Record<string, string> = {
      billet:    "Billet d'avion",
      hotel:     "Réservation d'hôtel",
      visa:      "Demande de visa Allemagne",
      assurance: "Assurance voyage",
      formation: "Formation en allemand",
      autre:     "Autre service",
    };
    return services[code] || code;
  }

  async testConnection() {
    try {
      await this.getTransporter().verify();
      console.log("✅ Connexion SMTP vérifiée");
      return { success: true, message: "SMTP OK" };
    } catch (error: any) {
      console.error("❌ Erreur SMTP:", error);
      return { success: false, error: error.message };
    }
  }
}

export default new EmailService();