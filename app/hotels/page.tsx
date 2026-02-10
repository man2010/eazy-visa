/**
 * PAGE HÔTELS - SERVER COMPONENT (SEO)
 * Métadonnées ultra-optimisées pour réservation hôtels
 */

import type { Metadata } from 'next';

const siteUrl = 'https://eazy-visa.com'

export const metadata: Metadata = {
  title: 'Réservation Hôtels Pas Cher | 2M+ Hôtels Monde | Meilleur Prix Garanti | Eazy-Visa',
  description: 'Réservez votre hôtel au meilleur prix garanti. 2 millions d\'hôtels dans 190 pays. Annulation gratuite, avis clients vérifiés, réductions jusqu\'à 50%. Paiement Wave, Orange Money, CB. Service 24/7 depuis Dakar. +221 76 948 60 60',
  
  keywords: [
    // Mots-clés principaux
    'réservation hôtel en ligne',
    'hôtels pas cher',
    'réserver hôtel',
    'meilleur prix hôtel garanti',
    
    // Longue traîne - Général
    'comparateur hôtels',
    'booking hôtel',
    'hôtel dernière minute',
    'promotion hôtel',
    'offre hôtel',
    'tarif hôtel',
    
    // Longue traîne - Sénégal/Afrique
    'réservation hôtel Dakar',
    'hôtels Dakar pas cher',
    'réserver hôtel Sénégal',
    'hôtels Saly Sénégal',
    'hôtels Cap Skirring',
    'agence réservation hôtel Dakar',
    
    // Longue traîne - International
    'réservation hôtel Paris',
    'hôtels Paris pas cher',
    'hôtel New York',
    'hôtel Dubaï',
    'hôtel Londres',
    'hôtel Rome',
    'hôtel Barcelone',
    
    // Types d'hôtels
    'hôtel luxe',
    'hôtel 5 étoiles',
    'hôtel budget',
    'hôtel économique',
    'hôtel boutique',
    'resort hôtel',
    
    // Services
    'annulation gratuite hôtel',
    'hôtel avec piscine',
    'hôtel wifi gratuit',
    'hôtel parking gratuit',
    'hôtel petit déjeuner inclus',
    'hôtel spa',
    
    // Marque
    'Eazy-Visa hôtels',
    'réservation hôtel Eazy-Visa',
  ],
  
  alternates: {
    canonical: `${siteUrl}/hotels`,
  },
  
  openGraph: {
    type: 'website',
    url: `${siteUrl}/hotels`,
    title: 'Réservation Hôtels | 2M+ Hôtels | Meilleur Prix Garanti | Eazy-Visa',
    description: 'Réservez parmi 2 millions d\'hôtels dans 190 pays. Annulation gratuite, réductions jusqu\'à 50%. Paiement flexible Wave/Orange Money/CB.',
    images: [{
      url: `${siteUrl}/hotels-og.jpg`,
      width: 1200,
      height: 630,
      alt: 'Réservation Hôtels en ligne - Eazy-Visa',
    }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Réservation Hôtels | 2M+ Hôtels Monde | Eazy-Visa',
    description: 'Meilleur prix garanti. Annulation gratuite. Réductions -50%. Paiement Wave/Orange Money.',
    images: [`${siteUrl}/hotels-og.jpg`],
  },
};

// Importer le composant client
export { default } from './HotelsClient';