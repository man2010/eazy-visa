/**
 * POST /api/bookings
 * Crée ET paie la commande en une seule étape via Duffel
 * (mode test : Duffel Balance illimité)
 *
 * Body:
 * {
 *   selectedOfferId: "off_xxx",
 *   passengers: [{
 *     id: "pas_xxx",          // ID issu de l'offre Duffel
 *     title: "mr",
 *     gender: "m",
 *     given_name: "Prénom",
 *     family_name: "Nom",
 *     born_on: "1990-01-15",
 *     email: "...",
 *     phone_number: "+22170000000",
 *     identity_documents: [{ type:"passport", number:"AB123", issuing_country_code:"SN", expires_on:"2030-01-01" }]
 *   }],
 *   services: [{ id:"srv_xxx", quantity:1 }],  // bagages / extras
 *   amount: "120.00",
 *   currency: "GBP",
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import duffelService from '@/lib/services/duffel.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { selectedOfferId, passengers, services, amount, currency } = body;

    if (!selectedOfferId || !passengers?.length || !amount || !currency) {
      return NextResponse.json(
        { success: false, error: 'Données manquantes : selectedOfferId, passengers, amount, currency' },
        { status: 400 }
      );
    }

    const result = await duffelService.createOrder({
      selectedOfferId,
      passengers,
      services: services || [],
      amount,
      currency,
      metadata: { source: 'eazy-visa-web' },
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: 'Échec création commande Duffel' }, { status: 500 });
    }

    const order = result.data;

    console.log('✅ Commande Duffel créée:', order.booking_reference);

    return NextResponse.json(
      {
        success: true,
        message: 'Réservation confirmée avec succès !',
        data: {
          orderId: order.id,
          bookingReference: order.booking_reference,
          status: order.payment_status?.awaiting_payment === false ? 'confirmed' : 'pending',
          passengers: order.passengers,
          slices: order.slices,
          totalAmount: order.total_amount,
          totalCurrency: order.total_currency,
          documents: order.documents || [],   // billets si disponibles
          conditions: order.conditions,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Erreur création commande Duffel:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur lors de la réservation' },
      { status: 500 }
    );
  }
}