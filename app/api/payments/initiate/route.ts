import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/config/database';
import Payment from '@/lib/models/payment.model';
import Booking from '@/lib/models/booking.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { bookingId, amount, paymentMethod } = body;

    if (!bookingId || !amount || !paymentMethod) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données manquantes',
        },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'Réservation non trouvée',
        },
        { status: 404 }
      );
    }

    // Pour Wave et Orange Money, vous devez implémenter les services correspondants
    // Pour l'instant, on simule une réponse
    const paymentReference = `PAY${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Enregistrer le paiement
    const payment = await Payment.create({
      bookingId,
      amount,
      paymentMethod,
      paymentReference,
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      data: {
        paymentUrl: `https://payment.example.com/${paymentReference}`,
        paymentId: paymentReference,
      },
    });
  } catch (error: any) {
    console.error('❌ Erreur initialisation paiement:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de l\'initialisation du paiement',
      },
      { status: 500 }
    );
  }
}