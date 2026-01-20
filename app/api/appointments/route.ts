import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/config/database';
import Appointment from '@/lib/models/appointment.model';
import emailService from '@/lib/services/email.service';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, phone, date, time, service, message } = body;

    if (!name || !email || !phone || !date || !time || !service) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tous les champs obligatoires doivent être remplis',
        },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      date,
      time,
      service,
      message: message || '',
      status: 'pending',
    });

    // Envoyer emails
    await emailService.sendAppointmentConfirmation(appointment);
    await emailService.notifyAdminNewAppointment(appointment);

    console.log('✅ Rendez-vous créé:', appointment._id);

    return NextResponse.json(
      {
        success: true,
        message: 'Rendez-vous créé avec succès',
        data: appointment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Erreur création rendez-vous:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la création du rendez-vous',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    const filter: any = {};
    if (status) filter.status = status;
    if (date) filter.date = new Date(date);

    const appointments = await Appointment.find(filter)
      .sort({ date: -1, time: -1 });

    return NextResponse.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error: any) {
    console.error('❌ Erreur récupération rendez-vous:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la récupération des rendez-vous',
      },
      { status: 500 }
    );
  }
}