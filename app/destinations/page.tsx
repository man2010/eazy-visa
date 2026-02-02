// app/destinations/page.tsx
/**
 * PAGE HUB DESTINATIONS - SERVER COMPONENT
 * Gère les métadonnées SEO et importe le composant client
 */

import type { Metadata } from 'next';
import DestinationsClient from './DestinationsClient';

export const metadata: Metadata = {
  title: 'Destinations Populaires depuis Dakar | Billets Avion Pas Cher | Eazy-Visa',
  description: 'Découvrez nos vols depuis Dakar vers Paris, Istanbul, Casablanca et plus. Billets avion pas cher avec paiement Wave/Orange Money. Réservez en ligne 24/7.',
  keywords: 'destinations Dakar, vols depuis Dakar, billets avion Sénégal, voyage Dakar',
  openGraph: {
    title: 'Destinations Populaires depuis Dakar | Billets Avion Pas Cher | Eazy-Visa',
    description: 'Découvrez nos vols depuis Dakar vers Paris, Istanbul, Casablanca et plus. Billets avion pas cher avec paiement Wave/Orange Money. Réservez en ligne 24/7.',
    images: [{ url: '/og-destinations.jpg' }],
    url: 'https://www.app.eazy-visa.com/destinations',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Destinations Populaires depuis Dakar | Billets Avion Pas Cher | Eazy-Visa',
    description: 'Découvrez nos vols depuis Dakar vers Paris, Istanbul, Casablanca et plus. Billets avion pas cher avec paiement Wave/Orange Money. Réservez en ligne 24/7.',
    images: ['/twitter-destinations.jpg'],
  },
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}