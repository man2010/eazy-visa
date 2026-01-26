// app/destinations/dakar-rome/page.tsx
import type { Metadata } from 'next';
import DakarRomeClient from './DakarRomeClient';

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Rome Pas Cher | Dès 350K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Rome au meilleur prix. Alitalia, ITA Airways, TAP Air Portugal, Air France. Paiement Wave, Orange Money, carte. Vols via escales – Réservation 24/7.',
  keywords:
    'billet dakar rome, vol dakar rome pas cher, ita airways dakar, billet avion sénégal italie',
  openGraph: {
    title: 'Billet Avion Dakar Rome Pas Cher | Dès 350K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Rome au meilleur prix. Alitalia, ITA Airways, TAP Air Portugal, Air France. Paiement Wave, Orange Money, carte. Support 24/7.',
    images: [{ url: '/og-dakar-rome.jpg' }],
    url: 'https://www.eazy-visa.com/destinations/dakar-rome',
  },
};

export default function DakarRomePage() {
  return <DakarRomeClient />;
}