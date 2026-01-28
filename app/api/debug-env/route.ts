/**
 * 🧪 ROUTE DE DEBUG - Variables d'environnement
 * GET /api/debug-env
 * 
 * ⚠️ À SUPPRIMER après avoir confirmé que tout fonctionne !
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Variables d'environnement - Status",
    timestamp: new Date().toISOString(),
    
    // ✅ Statut des variables (boolean seulement, jamais les valeurs réelles)
    variables: {
      amadeus: {
        apiUrl: !!process.env.AMADEUS_API_URL,
        clientId: !!process.env.AMADEUS_CLIENT_ID,
        clientSecret: !!process.env.AMADEUS_CLIENT_SECRET,
      },
      smtp: {
        host: !!process.env.SMTP_HOST,
        port: !!process.env.SMTP_PORT,
        user: !!process.env.SMTP_USER,
        pass: !!process.env.SMTP_PASS,
        from: !!process.env.EMAIL_FROM,
        adminEmail: !!process.env.ADMIN_EMAIL,
      },
      database: {
        mongoUri: !!process.env.MONGODB_URI,
      },
      app: {
        frontendUrl: !!process.env.FRONTEND_URL,
        nodeEnv: process.env.NODE_ENV, // OK de montrer car pas sensible
      },
    },

    // ✅ Diagnostic
    diagnosis: {
      allAmadeusSet: !!(
        process.env.AMADEUS_API_URL &&
        process.env.AMADEUS_CLIENT_ID &&
        process.env.AMADEUS_CLIENT_SECRET
      ),
      allSmtpSet: !!(
        process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS
      ),
      databaseSet: !!process.env.MONGODB_URI,
    },
  });
}