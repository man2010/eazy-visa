/**
 * GET  /api/bookings/[id]    → Détails de la commande
 * DELETE /api/bookings/[id]  → Annuler la commande
 */

import { NextRequest, NextResponse } from 'next/server';
import duffelService from '@/lib/services/duffel.service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await duffelService.getOrder(id);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Erreur get order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Commande introuvable' },
      { status: 404 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await duffelService.cancelOrder(id);
    return NextResponse.json({
      success: true,
      message: 'Commande annulée',
      data: result.data,
    });
  } catch (error: any) {
    console.error('❌ Erreur annulation:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur annulation' },
      { status: 500 }
    );
  }
}