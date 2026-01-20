// lib/middleware/error.ts
import { NextRequest, NextResponse } from 'next/server';

export function nextErrorHandler(err: any) {
  console.error('❌ ❌ ❌ Next API error', err);

  const status = err.statusCode ?? err.status ?? 500;
  const data = {
    success: false,
    error: err.message ?? 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  return NextResponse.json(data, { status });
}
