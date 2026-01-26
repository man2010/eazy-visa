/**
 * PAGE BILLETS D'AVION - SERVER COMPONENT (SEO)
 * SEO ULTRA-OPTIMISÉ POUR: "Billet Avion Pas Cher Dakar"
 * Recherche interactive avec API Amadeus
 */

import { Metadata } from 'next';

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://www.eazy-visa.com' 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Billets d\'Avion Pas Cher depuis Dakar | Eazy-Visa',
  description: 'Réservez vos vols depuis Dakar simplement. Paiement local, assistance humaine, destinations populaires.',
  
  keywords: [
    // Mots-clés principaux
    'recherche billet avion',
    'comparateur vol en ligne',
    'billet avion pas cher Dakar',
    'réservation vol temps réel',
    'vol Dakar Paris pas cher',
    
    // Longue traîne - Recherche/Comparaison
    'comparer prix billet avion',
    'moteur recherche vol',
    'trouver vol pas cher Dakar',
    'chercher billet avion Sénégal',
    'comparaison vol international',
    
    // Longue traîne - Destinations Europe
    'vol Dakar Paris aujourd\'hui',
    'billet avion Dakar France',
    'chercher vol Dakar Berlin',
    'prix vol Dakar Madrid',
    'réserver vol Dakar Rome',
    'billet Dakar Londres prix',
    
    // Longue traîne - Fonctionnalités
    'vol direct Dakar Paris',
    'vol avec escale pas cher',
    'dernière minute vol Dakar',
    'billet aller simple Dakar',
    'vol aller retour Dakar',
    'réservation instantanée vol',
    
    // Compagnies aériennes
    'Air France Dakar Paris',
    'Air Sénégal international',
    'Turkish Airlines Dakar',
    'Royal Air Maroc vol',
    'Brussels Airlines Dakar',
    'Iberia Dakar Madrid',
    
    // Paiement
    'payer billet Wave',
    'acheter vol Orange Money',
    'réserver billet carte bancaire',
    
    // Marque
    'Eazy-Visa recherche vol',
    'comparateur Eazy-Visa',
  ],

  alternates: {
    canonical: `${baseUrl}/billets`,
    languages: {
      'fr-SN': `${baseUrl}/billets`,
      'fr-FR': `${baseUrl}/billets`,
    },
  },

  openGraph: {
    type: 'website',
    url: `${baseUrl}/billets`,
    title: 'Recherche & Réservation Billets d\'Avion | Comparateur Vol | Eazy-Visa',
    description: 'Comparez +500 compagnies en temps réel. Vol Dakar-Paris dès 400K FCFA. Réservation instantanée. Paiement flexible.',
    images: [
      {
        url: `${baseUrl}/billets-recherche.jpg`,
        width: 1200,
        height: 630,
        alt: 'Recherche Billets d\'Avion - Comparateur Eazy-Visa',
      },
    ],
    siteName: 'Eazy-Visa',
    locale: 'fr_SN',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Comparateur Vol | Recherche Billets d\'Avion | Eazy-Visa',
    description: 'Trouvez votre vol au meilleur prix en temps réel. +500 compagnies comparées.',
    images: [`${baseUrl}/billets-recherche.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

// Importer le composant client avec toute la logique de recherche
export { default } from './BilletsSearchClient';