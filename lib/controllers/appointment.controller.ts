// lib/controllers/appointment.controller.ts
import Appointment from '@/lib/models/appointment.model';
import emailService from '@/lib/services/email.service';

export async function createAppointment({
  name,
  email,
  phone,
  date,
  time,
  service,
  message,
}: {
  name: string; email: string; phone: string; date: string; time: string; service: string; message?: string; // …
}) {
  if (!name || !email || !phone || !date || !time || !service)
    throw { status: 400, message: 'Tous les champs obligatoires doivent être remplis' };

  const appointment = await Appointment.create({
    name,
    email,
    phone,
    date,
    time,
    service,
    message: message ?? '',
    status: 'pending',
  });

  // ⚡ Email
  await emailService.sendAppointmentConfirmation(appointment);
  await emailService.notifyAdminNewAppointment(appointment);

  return appointment;
}

/* GET all, UPDATE status … → similaires */
