import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/config/database';
import Payment from '@/lib/models/payment.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { payment_id, status } = body;

    console.log('📞 Callback Wave reçu:', { payment_id, status });

    await Payment.findOneAndUpdate(
      { paymentReference: payment_id },
      { 
        status: status === 'SUCCESS' ? 'paid' : 'failed',
        providerResponse: body,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('❌ Erreur callback Wave:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erreur lors du traitement du callback',
      },
      { status: 500 }
    );
  }
}