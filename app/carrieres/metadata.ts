import type { Metadata } from 'next';

const siteUrl = process.env.NODE_ENV === 'production' 
  ? 'https://www.eazy-visa.com' 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Carrières | Rejoignez Notre Équipe | Eazy-Visa Dakar',
  description: 'Rejoignez l\'équipe Eazy-Visa! Nous recrutons des talents passionnés par le voyage. Opportunités professionnelles à Dakar. Culture d\'entreprise dynamique. Candidature en ligne.',
  keywords: [
    'carrières',
    'emploi agence voyage',
    'offres d\'emploi Dakar',
    'rejoindre Eazy-Visa',
    'travail voyage',
  ],
  alternates: {
    canonical: `${siteUrl}/carrieres`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/carrieres`,
    title: 'Carrières | Eazy-Visa',
    description: 'Rejoignez notre équipe dynamique. Opportunités emploi à Dakar.',
  },
};

