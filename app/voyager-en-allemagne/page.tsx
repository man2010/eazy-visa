/**
 * PAGE VOYAGER EN ALLEMAGNE - SERVER COMPONENT (SEO)
 * Métadonnées ultra-optimisées pour le référencement visa Allemagne
 */

import type { Metadata } from 'next';

const siteUrl =  'https://eazy-visa.com' 

export const metadata: Metadata = {
  title: 'Visa Allemagne depuis le Sénégal | Eazy-Visa',
  description: 'Étudier, se former ou travailler en Allemagne. Un accompagnement clair, humain et structuré depuis Dakar.',
  
  keywords: [
    // Mots-clés principaux visa Allemagne
    'visa Allemagne Sénégal',
    'visa Allemagne Dakar',
    'demande visa Allemagne',
    'visa étudiant Allemagne',
    'visa formation Allemagne',
    'visa travail Allemagne',
    
    // Longue traîne - Études
    'étudier en Allemagne depuis Sénégal',
    'université gratuite Allemagne',
    'étudier gratuitement Allemagne',
    'inscription université Allemagne',
    'bourse études Allemagne Sénégal',
    'master Allemagne gratuit',
    
    // Longue traîne - Formation professionnelle
    'formation professionnelle Allemagne',
    'ausbildung Allemagne Sénégal',
    'formation rémunérée Allemagne',
    'apprentissage Allemagne',
    'formation santé Allemagne',
    'formation technique Allemagne',
    
    // Longue traîne - Travail
    'travailler en Allemagne',
    'emploi Allemagne Sénégal',
    'recrutement Allemagne',
    'opportunité travail Allemagne',
    'salaire Allemagne',
    
    // Cours allemand
    'cours allemand Dakar',
    'apprendre allemand Sénégal',
    'formation allemand Dakar',
    'Goethe Institut Sénégal',
    'niveau B1 allemand',
    
    // Accompagnement
    'agence visa Allemagne Dakar',
    'accompagnement visa Allemagne',
    'dossier visa Allemagne',
    'obtention visa Allemagne',
    'Eazy-Visa Allemagne',
  ],
  
  alternates: {
    canonical: `${siteUrl}/voyager-en-allemagne`,
  },
  
  openGraph: {
    type: 'website',
    url: `${siteUrl}/voyager-en-allemagne`,
    title: 'Visa Allemagne - Études, Formation, Travail | 95% Réussite | Eazy-Visa',
    description: 'Partez en Allemagne avec Eazy-Visa : visa étudiant, formation rémunérée 1000€/mois, travail qualifié. Accompagnement complet + cours allemand. 1 mois hébergement offert à l\'arrivée.',
    images: [{
      url: `${siteUrl}/germany-og.jpg`,
      width: 1200,
      height: 630,
      alt: 'Visa Allemagne - Eazy-Visa Dakar',
    }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Visa Allemagne Sénégal | Études & Travail | Eazy-Visa',
    description: '95% réussite visa Allemagne. Études gratuites, formation rémunérée, travail qualifié. Accompagnement A-Z.',
    images: [`${siteUrl}/germany-og.jpg`],
  },
};

// Importer le composant client
export { default } from './GermanyClient';