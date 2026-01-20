import { NextRequest, NextResponse } from 'next/server';
import amadeusService from '@/lib/services/amadeus.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hotelIds, checkInDate, checkOutDate, adults = 1 } = body;

    if (!hotelIds || !checkInDate || !checkOutDate) {
      return NextResponse.json(
        { success: false, error: 'Données manquantes' },
        { status: 400 }
      );
    }

    const result = await amadeusService.getHotelOffers({
      hotelIds,
      checkInDate,
      checkOutDate,
      adults: parseInt(adults),
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur offres hôtels:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la récupération des offres',
      },
      { status: 500 }
    );
  }
}