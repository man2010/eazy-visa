import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/config/database';
import Booking from '@/lib/models/booking.model';

// GET /api/bookings/:id - Récupérer une réservation par ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const booking = await Booking.findById(params.id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'Réservation non trouvée',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    console.error('❌ Erreur récupération réservation:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la récupération de la réservation',
      },
      { status: 500 }
    );
  }
}