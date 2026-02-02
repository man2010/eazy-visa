// app/destinations/dakar-casablanca/page.tsx
import type { Metadata } from 'next';
import DakarCasablancaClient from './DakarCasablancaClient';

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Casablanca Pas Cher | Dès 250K FCFA | Eazy-Visa',
  description:
    'Réservez votre vol Dakar-Casablanca au meilleur prix. Royal Air Maroc et autres compagnies. Paiement Wave, Orange Money, carte. Vols fréquents – Réservation 24/7.',
  keywords:
    'billet dakar casablanca, vol dakar casablanca pas cher, royal air maroc dakar, billet avion sénégal maroc',
  openGraph: {
    title: 'Billet Avion Dakar Casablanca Pas Cher | Dès 250K FCFA | Eazy-Visa',
    description:
      'Réservez votre vol Dakar-Casablanca au meilleur prix. Royal Air Maroc et autres compagnies. Paiement Wave, Orange Money, carte. Vols fréquents.',
    images: [{ url: '/og-dakar-casablanca.jpg' }],
    url: 'https://www.app.eazy-visa.com/destinations/dakar-casablanca',
  },
};

export default function DakarCasablancaPage() {
  return <DakarCasablancaClient />;
}