// app/destinations/dakar-istanbul/page.tsx
import type { Metadata } from 'next';
import DakarIstanbulClient from './DakarIstanbulClient';


const siteUrl = 'https://eazy-visa.com'; // URL de production pour les métadonnées

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Istanbul Pas Cher | Dès 350K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Istanbul au meilleur prix. Turkish Airlines et autres compagnies. Paiement Wave, Orange Money, carte. Support 24/7 – Réservation rapide.',
  keywords:
    'billet dakar istanbul, vol dakar istanbul pas cher, turkish airlines dakar, billet avion sénégal turquie',
  alternates: {
    canonical: `${siteUrl}/destinations/dakar-istanbul`,
  },
  
    openGraph: {
    title: 'Billet Avion Dakar Istanbul Pas Cher | Dès 350K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Istanbul au meilleur prix. Turkish Airlines et autres compagnies. Paiement Wave, Orange Money, carte. Support 24/7.',
    images: [{ url: '/og-dakar-istanbul.jpg' }],
    url: `${siteUrl}/destinations/dakar-istanbul`,
  },
};

export default function DakarIstanbulPage() {
  return <DakarIstanbulClient />;
}