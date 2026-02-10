// app/destinations/dakar-paris/page.tsx
/**
 * PAGE DAKAR-PARIS - SERVER COMPONENT
 * Métadonnées SEO optimisées pour la billetterie
 */

import type { Metadata } from 'next';
import DakarParisClient from './DakarParisClient';

const siteUrl = 'https://eazy-visa.com'; // URL de production pour les métadonnées

export const metadata: Metadata = {
  title: 'Billet Avion Dakar Paris Pas Cher | Dès 400K FCFA | Eazy-Visa',
  description: 'Réservez votre vol Dakar-Paris au meilleur prix. Paiement Wave/Orange Money/Carte. Vols directs ou escales. Support 24/7. Annulation flexible.',
  keywords: 'billet dakar paris, vol dakar paris pas cher, billet avion sénégal france',
  alternates: {
    canonical: `${siteUrl}/destinations/dakar-paris`,
  },
  openGraph: {
    title: 'Billet Avion Dakar Paris Pas Cher | Dès 400K FCFA | Eazy-Visa',
    description: 'Réservez votre vol Dakar-Paris au meilleur prix. Paiement Wave/Orange Money/Carte. Vols directs ou escales. Support 24/7. Annulation flexible.',
    images: [{ url: '/og-dakar-paris.jpg' }],
    url: `${siteUrl}/destinations/dakar-paris`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Billet Avion Dakar Paris Pas Cher | Dès 400K FCFA | Eazy-Visa',
    description: 'Réservez votre vol Dakar-Paris au meilleur prix. Paiement Wave/Orange Money/Carte. Vols directs ou escales. Support 24/7. Annulation flexible.',
    images: ['/twitter-dakar-paris.jpg'],
  },
};

export default function DakarParisPage() {
  return <DakarParisClient />;
}