import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/config/database';
import Booking from '@/lib/models/booking.model';
import amadeusService from '@/lib/services/amadeus.service';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { flightOffer, travelers, contacts, paymentMethod } = body;

    if (!flightOffer || !travelers || !contacts) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données manquantes',
        },
        { status: 400 }
      );
    }

    // Générer référence unique
    const bookingReference = `EV${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Confirmer le prix
    const pricingResult = await amadeusService.confirmPrice(flightOffer);
    if (!pricingResult.success) {
      throw new Error('Impossible de confirmer le prix');
    }

    const confirmedOffer = pricingResult.data.flightOffers[0];
    const totalPrice = parseFloat(confirmedOffer.price.total);

    // Créer la réservation
    const booking = await Booking.create({
      bookingReference,
      flightOffer: confirmedOffer,
      travelers,
      contacts,
      totalPrice,
      paymentMethod,
      bookingStatus: 'pending_payment',
    });

    console.log('✅ Réservation créée:', bookingReference);

    return NextResponse.json(
      {
        success: true,
        message: 'Réservation créée avec succès',
        data: {
          bookingReference,
          totalPrice,
          currency: 'XOF',
          bookingId: booking._id,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Erreur création réservation:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la création de la réservation',
      },
      { status: 500 }
    );
  }
}