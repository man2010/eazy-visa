// app/destinations/dakar-montreal/page.tsx
import type { Metadata } from 'next';
import DakarMontrealClient from './DakarMontrealClient';

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Montréal Pas Cher | Dès 600K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Montréal au meilleur prix. Air Canada, Air France, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Support 24/7 – Vols via escales.',
  keywords:
    'billet dakar montréal, vol dakar montréal pas cher, air canada dakar, billet avion sénégal canada',
  alternates: {
    canonical: 'https://www.app.eazy-visa.com/destinations/dakar-montreal',
  },
    openGraph: {
    title: 'Billet Avion Dakar Montréal Pas Cher | Dès 600K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Montréal au meilleur prix. Air Canada, Air France, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Support 24/7.',
    images: [{ url: '/og-dakar-montreal.jpg' }],
    url: 'https://www.app.eazy-visa.com/destinations/dakar-montreal',
  },
};

export default function DakarMontrealPage() {
  return <DakarMontrealClient />;
}