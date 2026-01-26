/**
 * PAGE À PROPOS - SERVER COMPONENT (SEO)
 * Métadonnées optimisées pour le référencement
 */

import type { Metadata } from 'next';

const siteUrl = process.env.NODE_ENV === 'production' 
  ? 'https://www.eazy-visa.com' 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'À Propos Eazy-Visa | Histoire, Équipe, Valeurs | Agence Voyage Dakar',
  description: 'Découvrez Eazy-Visa: agence voyage Dakar depuis 2019. Équipe experte, 10,000+ clients satisfaits, 98% taux de satisfaction. Visa Allemagne (95% réussite), billets avion, hôtels. Expertise reconnue, service 24/7.',
  
  keywords: [
    'Eazy-Visa à propos',
    'agence voyage Dakar histoire',
    'équipe Eazy-Visa',
    'histoire agence voyage Sénégal',
    'expertise voyage Dakar',
    'confiance agence voyage',
    'mission Eazy-Visa',
    'valeurs agence voyage',
    'fondateur Eazy-Visa',
    'Bertrand Gopele',
  ],
  
  alternates: {
    canonical: `${siteUrl}/a-propos`,
  },
  
  openGraph: {
    type: 'website',
    url: `${siteUrl}/a-propos`,
    title: 'À Propos Eazy-Visa | Agence de Voyages Dakar - Notre Histoire',
    description: 'Depuis 2019, Eazy-Visa accompagne 10,000+ voyageurs. 98% de satisfaction. Équipe dédiée 24/7. Découvrez notre histoire et nos valeurs.',
    images: [{
      url: `${siteUrl}/about-og.jpg`,
      width: 1200,
      height: 630,
      alt: 'Équipe Eazy-Visa Dakar - Agence de Voyages',
    }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'À Propos Eazy-Visa | Notre Histoire et Équipe',
    description: '5+ ans d\'expérience. 10,000+ clients. 98% satisfaction. Découvrez l\'équipe qui révolutionne le voyage au Sénégal.',
    images: [`${siteUrl}/about-og.jpg`],
  },
};

// Importer le composant client
export { default } from './AProposClient';