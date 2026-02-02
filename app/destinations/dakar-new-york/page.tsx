// app/destinations/dakar-new-york/page.tsx
import type { Metadata } from 'next';
import DakarNewYorkClient from './DakarNewYorkClient';

export const metadata: Metadata = {
  title: 'Billet Avion Dakar New York Pas Cher | Dès 550K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-New York au meilleur prix. Delta, Air France, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Vols via escales – Réservation 24/7.',
  keywords:
    'billet dakar new york, vol dakar new york pas cher, delta airlines dakar, billet avion sénégal usa',
  openGraph: {
    title: 'Billet Avion Dakar New York Pas Cher | Dès 550K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-New York au meilleur prix. Delta, Air France, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Support 24/7.',
    images: [{ url: '/og-dakar-new-york.jpg' }],
    url: 'https://www.app.eazy-visa.com/destinations/dakar-new-york',
  },
};

export default function DakarNewYorkPage() {
  return <DakarNewYorkClient />;
}