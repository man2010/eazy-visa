import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/config/database';
import Appointment from '@/lib/models/appointment.model';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await req.json();
    const { status } = body;

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Statut invalide',
        },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rendez-vous non trouvé',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error: any) {
    console.error('❌ Erreur mise à jour statut:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors de la mise à jour du statut',
      },
      { status: 500 }
    );
  }
}