import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this.verifyConnection();
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ Service email prêt');
    } catch (error: any) {
      console.error('❌ Erreur service email:', error.message);
    }
  }

  async sendAppointmentConfirmation(appointment: any) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Eazy-Visa <noreply@eazy-visa.com>',
      to: appointment.email,
      cc: process.env.ADMIN_EMAIL,
      subject: '✅ Confirmation de rendez-vous - Eazy-Visa',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #A11C1C, #D32F2F); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; border-left: 4px solid #A11C1C; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
            .button { display: inline-block; padding: 12px 30px; background: #A11C1C; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✈️ Eazy-Visa</h1>
              <p>Votre rendez-vous est confirmé !</p>
            </div>
            <div class="content">
              <p>Bonjour <strong>${appointment.name}</strong>,</p>
              
              <p>Nous avons bien reçu votre demande de rendez-vous. Voici les détails :</p>
              
              <div class="info-box">
                <p><strong>📅 Date :</strong> ${new Date(appointment.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>🕐 Heure :</strong> ${appointment.time}</p>
                <p><strong>📋 Service :</strong> ${this.getServiceName(appointment.service)}</p>
                ${appointment.message ? `<p><strong>💬 Message :</strong> ${appointment.message}</p>` : ''}
              </div>
              
              <p>Notre équipe vous contactera très prochainement au <strong>${appointment.phone}</strong> pour confirmer votre rendez-vous.</p>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Visiter notre site</a>
              </div>
              
              <p><strong>Besoin de modifier ou d'annuler ?</strong><br>
              Contactez-nous au +221 XX XXX XX XX ou par email à contact@eazy-visa.com</p>
            </div>
            <div class="footer">
              <p>Eazy-Visa - Cité Keur Gorgui, Immeuble Keur Mbaye Lô, Villa Nr 12<br>
              📞 +221 XX XXX XX XX | 📧 contact@eazy-visa.com<br>
              Service disponible 24/7</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email rendez-vous envoyé:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Erreur envoi email rendez-vous:', error);
      throw error;
    }
  }

  async notifyAdminNewAppointment(appointment: any) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Eazy-Visa <noreply@eazy-visa.com>',
      to: process.env.ADMIN_EMAIL || 'admin@eazy-visa.com',
      subject: `🔔 Nouveau rendez-vous - ${appointment.name}`,
      html: `
        <h2>Nouveau rendez-vous</h2>
        <p><strong>Client:</strong> ${appointment.name}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Téléphone:</strong> ${appointment.phone}</p>
        <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString('fr-FR')} à ${appointment.time}</p>
        <p><strong>Service:</strong> ${this.getServiceName(appointment.service)}</p>
        ${appointment.message ? `<p><strong>Message:</strong> ${appointment.message}</p>` : ''}
        <hr>
        <p><small>Cet email a été envoyé automatiquement depuis Eazy-Visa Backend</small></p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Notification admin envoyée');
    } catch (error) {
      console.error('❌ Erreur notification admin:', error);
    }
  }

  async sendContactConfirmation({ name, email }: any) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Eazy-Visa <noreply@eazy-visa.com>',
      to: email,
      subject: '✅ Nous avons bien reçu votre message - Eazy-Visa',
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Merci d'avoir pris contact avec nous !</p>
        <p>Nous avons bien reçu votre message et un membre de notre équipe vous répondra dans les plus brefs délais (généralement sous 24h).</p>
        <p>À très bientôt !</p>
        <p><strong>L'équipe Eazy-Visa</strong></p>
        <hr>
        <small>Cet email est automatique, merci de ne pas y répondre directement.</small>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Confirmation contact envoyée à:', email);
    } catch (error) {
      console.error('❌ Erreur envoi confirmation contact:', error);
    }
  }

  async notifyAdminContactMessage({ name, email, subject, message }: any) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Eazy-Visa <noreply@eazy-visa.com>',
      to: process.env.ADMIN_EMAIL || 'admin@eazy-visa.com',
      subject: `📩 Nouveau message de contact - ${subject || 'Sans objet'} - ${name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Sujet:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="background:#f4f4f4; padding:15px; border-radius:8px;">${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Envoyé depuis le formulaire de contact du site Eazy-Visa</small>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Notification contact envoyée à l\'admin');
    } catch (error) {
      console.error('❌ Erreur notification admin contact:', error);
    }
  }

  async sendFlightBookingConfirmation(booking: any) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Eazy-Visa <noreply@eazy-visa.com>',
      to: booking.contacts.email,
      subject: `✈️ Confirmation de réservation - ${booking.bookingReference}`,
      html: `
        <h1>Votre réservation est confirmée!</h1>
        <p><strong>Référence:</strong> ${booking.bookingReference}</p>
        <p><strong>Total payé:</strong> ${parseFloat(booking.totalPrice).toLocaleString()} ${booking.currency}</p>
        <p>Merci de voyager avec Eazy-Visa !</p>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email réservation envoyé:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Erreur envoi email réservation:', error);
      throw error;
    }
  }

  private getServiceName(code: string) {
    const services: { [key: string]: string } = {
      billet: "Billet d'avion",
      hotel: "Réservation d'hôtel",
      visa: "Demande de visa Allemagne",
      assurance: "Assurance voyage",
      formation: "Formation en allemand",
      autre: "Autre service",
    };
    return services[code] || code;
  }
}

export default new EmailService();