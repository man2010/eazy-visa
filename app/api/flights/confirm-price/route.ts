import { NextRequest, NextResponse } from 'next/server';
import amadeusService from '@/lib/services/amadeus.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { flightOffer } = body;

    if (!flightOffer) {
      return NextResponse.json(
        {
          success: false,
          error: 'flightOffer est requis',
        },
        { status: 400 }
      );
    }

    const result = await amadeusService.confirmPrice(flightOffer);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur confirmation prix:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la confirmation du prix',
      },
      { status: 500 }
    );
  }
}