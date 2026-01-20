import { NextRequest, NextResponse } from 'next/server';
import amadeusService from '@/lib/services/amadeus.service';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cityCode = searchParams.get('cityCode');
    const ratings = searchParams.get('ratings');
    const amenities = searchParams.get('amenities');

    if (!cityCode) {
      return NextResponse.json(
        { success: false, error: 'cityCode requis' },
        { status: 400 }
      );
    }

    const result = await amadeusService.searchHotelsByCity({
      cityCode: cityCode.toUpperCase(),
      ratings: ratings ? ratings.split(',') : undefined,
      amenities: amenities ? amenities.split(',') : undefined,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur recherche hôtels:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la recherche d\'hôtels',
      },
      { status: 500 }
    );
  }
}