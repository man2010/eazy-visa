import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/config/database';
import Booking from '@/lib/models/booking.model';
import amadeusService from '@/lib/services/amadeus.service';
import emailService from '@/lib/services/email.service';

// POST /api/bookings/finalize - Finaliser une réservation après paiement
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { bookingId, paymentReference } = body;

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          error: 'bookingId est requis',
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

    // Créer la commande dans Amadeus
    const amadeusResult = await amadeusService.createBooking(
      booking.flightOffer,
      booking.travelers,
      booking.contacts
    );

    if (!amadeusResult.success) {
      throw new Error('Échec de la création de la commande Amadeus');
    }

    // Mettre à jour la réservation
    booking.amadeusOrderId = amadeusResult.data.id;
    booking.paymentReference = paymentReference;
    booking.paymentStatus = 'paid';
    booking.bookingStatus = 'confirmed';
    booking.emailSent = true;
    await booking.save();

    // Envoyer l'email de confirmation
    try {
      await emailService.sendFlightBookingConfirmation(booking);
    } catch (emailError) {
      console.error('⚠️ Erreur envoi email (réservation confirmée quand même):', emailError);
    }

    console.log('✅ Réservation finalisée:', booking.bookingReference);

    return NextResponse.json({
      success: true,
      message: 'Réservation confirmée avec succès',
      data: {
        bookingReference: booking.bookingReference,
        amadeusOrderId: amadeusResult.data.id,
        status: booking.bookingStatus,
      },
    });
  } catch (error: any) {
    console.error('❌ Erreur finalisation réservation:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la finalisation de la réservation',
      },
      { status: 500 }
    );
  }
}