// app/destinations/dakar-casablanca/page.tsx
import type { Metadata } from 'next';
import DakarCasablancaClient from './DakarCasablancaClient';

const siteUrl = 'https://eazy-visa.com'; // URL de production pour les métadonnées

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Casablanca Pas Cher | Dès 250K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Casablanca au meilleur prix. Royal Air Maroc et autres compagnies. Paiement Wave, Orange Money, carte. Vols fréquents – Réservation 24/7.',
  keywords:
    'billet dakar casablanca, vol dakar casablanca pas cher, royal air maroc dakar, billet avion sénégal maroc',
  alternates: {
    canonical: `${siteUrl}/destinations/dakar-casablanca`,
  },
    openGraph: {
    title: 'Billet Avion Dakar Casablanca Pas Cher | Dès 250K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Casablanca au meilleur prix. Royal Air Maroc et autres compagnies. Paiement Wave, Orange Money, carte. Vols fréquents.',
    images: [{ url: '/og-dakar-casablanca.jpg' }],
    url: `${siteUrl}/destinations/dakar-casablanca`,
  },
};

export default function DakarCasablancaPage() {
  return <DakarCasablancaClient />;
}