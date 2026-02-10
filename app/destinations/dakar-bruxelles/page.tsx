// app/destinations/dakar-bruxelles/page.tsx
import type { Metadata } from 'next';
import DakarBruxellesClient from './DakarBruxellesClient';

const siteUrl = 'https://eazy-visa.com'; // URL de production pour les métadonnées

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Bruxelles Pas Cher | Dès 400K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Bruxelles au meilleur prix. Brussels Airlines, Air France, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Vols via escales – Réservation 24/7.',
  keywords:
    'billet dakar bruxelles, vol dakar bruxelles pas cher, brussels airlines dakar, billet avion sénégal belgique',
  alternates: {
    canonical: `${siteUrl}/destinations/dakar-bruxelles`,
  },
    openGraph: {
    title: 'Billet Avion Dakar Bruxelles Pas Cher | Dès 400K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Bruxelles au meilleur prix. Brussels Airlines, Air France, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Support 24/7.',
    images: [{ url: '/og-dakar-bruxelles.jpg' }],
    url: `${siteUrl}/destinations/dakar-bruxelles`,
  },
};

export default function DakarBruxellesPage() {
  return <DakarBruxellesClient />;
}