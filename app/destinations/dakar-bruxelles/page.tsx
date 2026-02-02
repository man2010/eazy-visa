// app/destinations/dakar-bruxelles/page.tsx
import type { Metadata } from 'next';
import DakarBruxellesClient from './DakarBruxellesClient';

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Bruxelles Pas Cher | Dès 400K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Bruxelles au meilleur prix. Brussels Airlines, Air France, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Vols via escales – Réservation 24/7.',
  keywords:
    'billet dakar bruxelles, vol dakar bruxelles pas cher, brussels airlines dakar, billet avion sénégal belgique',
  openGraph: {
    title: 'Billet Avion Dakar Bruxelles Pas Cher | Dès 400K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Bruxelles au meilleur prix. Brussels Airlines, Air France, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Support 24/7.',
    images: [{ url: '/og-dakar-bruxelles.jpg' }],
    url: 'https://www.app.eazy-visa.com/destinations/dakar-bruxelles',
  },
};

export default function DakarBruxellesPage() {
  return <DakarBruxellesClient />;
}