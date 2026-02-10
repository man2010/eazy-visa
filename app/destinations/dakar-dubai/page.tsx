// app/destinations/dakar-dubai/page.tsx
import type { Metadata } from 'next';
import DakarDubaiClient from './DakarDubaiClient';


const siteUrl = 'https://eazy-visa.com'; // URL de production pour les métadonnées

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Dubaï Pas Cher | Dès 450K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Dubaï au meilleur prix. Emirates, Turkish Airlines, Qatar Airways. Paiement Wave, Orange Money, carte. Vols via escales – Réservation 24/7.',
  keywords:
    'billet dakar dubai, vol dakar dubai pas cher, emirates dakar, billet avion sénégal emirats arabes unis',
  alternates: {
    canonical: `${siteUrl}/destinations/dakar-dubai`,
  },
    openGraph: {
    title: 'Billet Avion Dakar Dubaï Pas Cher | Dès 450K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Dubaï au meilleur prix. Emirates, Turkish Airlines, Qatar Airways. Paiement Wave, Orange Money, carte. Support 24/7.',
    images: [{ url: '/og-dakar-dubai.jpg' }],
    url: `${siteUrl}/destinations/dakar-dubai`,
  },
};

export default function DakarDubaiPage() {
  return <DakarDubaiClient />;
}