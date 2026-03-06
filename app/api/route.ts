import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Eazy-Visa API is running',
    version: '1.0.0',
    endpoints: {
      hotels: '/api/hotels/*',
      appointments: '/api/appointments',
      payments: '/api/payments/*',
      contact: '/api/contact',
      flights: {
        search: 'POST /api/flights/search',
        offer: 'GET /api/flights/offers/[offerId]',
        seatmaps: 'GET /api/flights/seatmaps?offerId=xxx',
        locations: 'GET /api/flights/locations?query=xxx',
      },
      bookings: {
        create: 'POST /api/bookings',
        get: 'GET /api/bookings/[id]',
        cancel: 'DELETE /api/bookings/[id]',
      },
    },
  });
}