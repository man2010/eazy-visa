import { NextRequest, NextResponse } from 'next/server';
import amadeusService from '@/lib/services/amadeus.service';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');
    const subType = searchParams.get('subType') || 'AIRPORT,CITY';

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: 'keyword requis' },
        { status: 400 }
      );
    }

    const result = await amadeusService.searchLocations({ 
      keyword: keyword.toString(), 
      subType 
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur recherche locations:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la recherche de lieux',
      },
      { status: 500 }
    );
  }
}