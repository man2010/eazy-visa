/**
 * GET /api/flights/seatmaps?offerId=off_xxx
 * Récupère le plan de cabine pour une offre sélectionnée
 */

import { NextRequest, NextResponse } from 'next/server';
import duffelService from '@/lib/services/duffel.service';

export async function GET(req: NextRequest) {
  try {
    const offerId = req.nextUrl.searchParams.get('offerId');
    if (!offerId) {
      return NextResponse.json(
        { success: false, error: 'offerId requis' },
        { status: 400 }
      );
    }
    const result = await duffelService.getSeatMaps(offerId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur seatmaps Duffel:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur seatmaps' },
      { status: 500 }
    );
  }
}