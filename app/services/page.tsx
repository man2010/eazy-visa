/**
 * PAGE SERVICES - SERVER COMPONENT (SEO)
 * Métadonnées optimisées pour le référencement
 */

import type { Metadata } from 'next';

const siteUrl = 'https://www.app.eazy-visa.com' 
  

export const metadata: Metadata = {
  title: 'Tout Ce Qu\'il Faut pour Voyager Sereinement | Eazy-Visa',
  description: 'Billets, visas, hébergement, accompagnement. Un seul point de départ pour votre voyage.',
  
  keywords: [
    'services voyage Dakar',
    'billet avion pas cher Sénégal',
    'visa Allemagne Dakar',
    'assurance voyage Sénégal',
    'formation allemand Dakar',
    'réservation hôtel Dakar',
    'agence voyage services complets',
    'tour opérateur Sénégal',
    'services personnalisés voyage',
    'agence visa Allemagne Dakar',
    'billets avion Dakar',
    'cours allemand Sénégal',
  ],
  
  alternates: {
    canonical: 'https://www.app.eazy-visa.com/services',
  },
  
  openGraph: {
    type: 'website',
    url: 'https://www.app.eazy-visa.com/services',
    title: 'Services Voyage Complets | Visa, Billets, Hôtels & Plus | Eazy-Visa',
    description: 'Tous nos services: visa Allemagne (95% réussite), billets avion prix imbattables, hôtels, assurance voyage, formation allemand. 10,000+ clients satisfaits.',
    images: [{
      url: 'https://www.app.eazy-visa.com/services-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Services Eazy-Visa Dakar - Visa, Billets, Hôtels',
    }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Tous nos Services Voyage | Eazy-Visa Dakar',
    description: 'Billets d\'avion, visa Allemagne, hôtels, assurance, formation. 5+ ans d\'expertise. Service 24/7.',
    images: ['https://www.app.eazy-visa.com/services-og.jpg'],
  },
};

// Importer le composant client
export { default } from './ServicesClient';