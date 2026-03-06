/**
 * GET /api/flights/offers/[offerId]
 * GET /api/flights/offers/[offerId]?services=true   →  inclut les available_services (bagages)
 *
 * ⚠️  Duffel ne retourne available_services que sur ce endpoint single offer,
 *     JAMAIS dans la liste de recherche.
 */

import { NextRequest, NextResponse } from 'next/server';
import duffelService from '@/lib/services/duffel.service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ offerId: string }> }
) {
  try {
    const { offerId } = await params;
    const returnServices = req.nextUrl.searchParams.get('services') === 'true';

    const result = await duffelService.getOffer(offerId, returnServices);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur get offer:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Offre introuvable ou expirée' },
      { status: 500 }
    );
  }
}