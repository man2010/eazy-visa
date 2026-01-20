import { NextRequest, NextResponse } from 'next/server';
import amadeusService from '@/lib/services/amadeus.service';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');
    const adults = searchParams.get('adults');

    if (!origin || !destination || !departureDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Paramètres manquants: origin, destination, departureDate sont requis',
        },
        { status: 400 }
      );
    }

    const params = {
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase(),
      departureDate,
      returnDate: returnDate || null,
      adults: parseInt(adults || '1'),
    };

    const result = await amadeusService.searchFlights(params);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur recherche vols:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la recherche de vols',
      },
      { status: 500 }
    );
  }
}