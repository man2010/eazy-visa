import { NextRequest, NextResponse } from 'next/server';
import amadeusService from '@/lib/services/amadeus.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { flightOffers } = body;

    if (!flightOffers || !Array.isArray(flightOffers)) {
      return NextResponse.json(
        {
          success: false,
          error: 'flightOffers array est requis',
        },
        { status: 400 }
      );
    }

    const result = await amadeusService.getSeatmaps(flightOffers);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur seatmaps:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la récupération des seatmaps',
      },
      { status: 500 }
    );
  }
}