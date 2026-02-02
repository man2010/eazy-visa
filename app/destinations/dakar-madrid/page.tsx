// app/destinations/dakar-madrid/page.tsx
import type { Metadata } from 'next';
import DakarMadridClient from './DakarMadridClient';

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Madrid Pas Cher | Dès 300K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Madrid au meilleur prix. Iberia, Air Europa, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Vols via escales – Réservation 24/7.',
  keywords:
    'billet dakar madrid, vol dakar madrid pas cher, iberia dakar, billet avion sénégal espagne',
  openGraph: {
    title: 'Billet Avion Dakar Madrid Pas Cher | Dès 300K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Madrid au meilleur prix. Iberia, Air Europa, TAP Air Portugal et autres. Paiement Wave, Orange Money, carte. Support 24/7.',
    images: [{ url: '/og-dakar-madrid.jpg' }],
    url: 'https://www.app.eazy-visa.com/destinations/dakar-madrid',
  },
};

export default function DakarMadridPage() {
  return <DakarMadridClient />;
}