/**
 * POST /api/flights/search
 * Recherche de vols via Duffel API
 * 
 * Body:
 * {
 *   slices: [{ origin, destination, departure_date }],   // 1 = aller, 2 = aller-retour
 *   passengers: [{ type: 'adult'|'child'|'infant_without_seat' }],
 *   cabin_class?: 'economy'|'premium_economy'|'business'|'first',
 *   max_connections?: 0|1|2
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import duffelService from '@/lib/services/duffel.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slices, passengers, cabin_class, max_connections } = body;

    // Validation
    if (!slices || !Array.isArray(slices) || slices.length === 0) {
      return NextResponse.json(
        { success: false, error: 'slices[] est requis (1 = aller simple, 2 = aller-retour)' },
        { status: 400 }
      );
    }
    for (const slice of slices) {
      if (!slice.origin || !slice.destination || !slice.departure_date) {
        return NextResponse.json(
          { success: false, error: 'Chaque slice doit avoir origin, destination, departure_date' },
          { status: 400 }
        );
      }
    }
    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'passengers[] est requis' },
        { status: 400 }
      );
    }

    const result = await duffelService.searchFlights({
      slices,
      passengers,
      cabin_class: cabin_class || 'economy',
      max_connections,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur recherche vols Duffel:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur lors de la recherche de vols' },
      { status: 500 }
    );
  }
}