import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/lib/services/email.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nom, email et message sont obligatoires',
        },
        { status: 400 }
      );
    }

    await emailService.notifyAdminContactMessage({ name, email, subject, message });
    await emailService.sendContactConfirmation({ name, email });

    console.log('✅ Message de contact reçu et emails envoyés');

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès ! Nous vous répondrons rapidement.',
    });
  } catch (error: any) {
    console.error('❌ Erreur envoi message contact:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'envoi du message',
      },
      { status: 500 }
    );
  }
}