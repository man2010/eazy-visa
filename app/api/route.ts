import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Eazy-Visa API is running',
    version: '1.0.0',
    endpoints: {
      flights: '/api/flights/*',
      hotels: '/api/hotels/*',
      appointments: '/api/appointments',
      bookings: '/api/bookings',
      payments: '/api/payments/*',
      contact: '/api/contact',
    },
  });
}