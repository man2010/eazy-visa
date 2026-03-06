import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/lib/services/email.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      // Entreprise
      companyName,
      sector,
      companySize,
      annualTrips,
      mainDestinations,
      // Contact
      contactName,
      contactRole,
      email,
      phone,
      // Besoins
      services,
      message,
    } = body;

    if (!companyName || !contactName || !email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nom de l\'entreprise, nom du contact et email sont obligatoires',
        },
        { status: 400 }
      );
    }

    const b2bData = {
      companyName,
      sector: sector || 'Non renseigné',
      companySize: companySize || 'Non renseigné',
      annualTrips: annualTrips || 'Non renseigné',
      mainDestinations: mainDestinations || 'Non renseignées',
      contactName,
      contactRole: contactRole || 'Non renseigné',
      email,
      phone: phone || 'Non renseigné',
      services: services || [],
      message: message || '',
    };

    // Notification admin + confirmation client en parallèle
    await Promise.all([
      emailService.notifyAdminB2BRequest(b2bData),
      emailService.sendB2BConfirmation(b2bData),
    ]);

    console.log('✅ Demande B2B Corporate reçue et emails envoyés pour:', companyName);

    return NextResponse.json({
      success: true,
      message: 'Demande de devis Corporate envoyée avec succès ! Notre équipe vous contactera sous 24 heures.',
    });
  } catch (error: any) {
    console.error('❌ Erreur envoi demande B2B:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'envoi de la demande' },
      { status: 500 }
    );
  }
}