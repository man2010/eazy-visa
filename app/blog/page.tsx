/**
 * PAGE BLOG - SERVER COMPONENT (SEO ULTRA-OPTIMISÉ)
 * Métadonnées stratégiques pour dominer "billets d'avion Dakar" sur tous les navigateurs
 */

import type { Metadata } from 'next';

const siteUrl = process.env.NODE_ENV === 'production' 
  ? 'https://www.app.eazy-visa.com' 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Blog Voyage Dakar | Billets d\'Avion, Destinations, Guides Complets | Eazy-Visa',
  description: 'Découvrez nos guides de voyage, astuces pour billets d\'avion pas cher depuis Dakar, meilleures destinations 2025, visas, et conseils d\'experts. La référence voyage au Sénégal.',
  
  keywords: [
    // ═══════════════════════════════════════════════════════════
    // 🎯 MOTS-CLÉS BILLETS D'AVION (Position #1 visée)
    // ═══════════════════════════════════════════════════════════
    
    // Variations principales billets
    'billets d\'avion Dakar',
    'billet d\'avion Dakar',
    'billets avion Dakar',
    'billet avion Dakar',
    'billets d\'avion pas cher Dakar',
    'billet d\'avion pas cher Dakar',
    'billets avion pas cher Sénégal',
    
    // Acheter / Réserver
    'acheter billet d\'avion Dakar',
    'acheter billets avion Dakar',
    'réserver billet d\'avion Dakar',
    'réserver billets avion Sénégal',
    'où acheter billets avion Dakar',
    'comment acheter billet avion Dakar',
    
    // Prix / Tarifs
    'prix billet d\'avion Dakar',
    'prix billets avion Dakar Paris',
    'tarif billet avion Dakar',
    'tarifs billets avion Sénégal',
    'comparateur prix billets avion Dakar',
    'meilleur prix billet avion Dakar',
    
    // Destinations depuis Dakar
    'billet avion Dakar Paris',
    'billets avion Dakar France',
    'billet avion Dakar Lyon',
    'billet avion Dakar Marseille',
    'billet avion Dakar New York',
    'billet avion Dakar Dubai',
    'billet avion Dakar Casablanca',
    'billet avion Dakar Abidjan',
    'billet avion Dakar Istanbul',
    'billet avion Dakar Madrid',
    'billet avion Dakar Rome',
    'billet avion Dakar Londres',
    'billet avion Dakar Bruxelles',
    'billet avion Dakar Genève',
    'billet avion Dakar Montreal',
    
    // Aller-retour / Aller simple
    'billet avion aller-retour Dakar Paris',
    'billet avion aller simple Dakar',
    'billets aller-retour Dakar France',
    
    // Urgence / Dernière minute
    'billet avion dernière minute Dakar',
    'billets avion urgence Dakar',
    'réservation rapide billet Dakar',
    'billet avion aujourd\'hui Dakar',
    
    // Compagnies aériennes
    'billet Air France Dakar Paris',
    'billet Air Sénégal',
    'billet Turkish Airlines Dakar',
    'billet Emirates Dakar Dubai',
    'billets Brussels Airlines Dakar',
    
    // Long-tail voyage
    'blog voyage Dakar',
    'blog voyage Sénégal',
    'guide voyage Dakar',
    'conseils voyage Sénégal',
    'astuces billets avion pas cher',
    'comment trouver billets avion moins cher',
    'meilleure période acheter billet avion',
    'économiser billets avion Dakar',
    
    // Destinations populaires (contenu blog)
    'meilleures destinations depuis Dakar',
    'où voyager depuis Sénégal',
    'destinations vacances Dakar',
    'voyages pas cher depuis Dakar',
    'destinations 2025 Dakar',
    
    // Guides pratiques
    'guide billet avion Dakar',
    'tuto réserver billet avion Sénégal',
    'comment voyager moins cher Dakar',
    'préparer voyage depuis Dakar',
    
    // Visa + voyage
    'visa voyage Dakar',
    'documents voyage Sénégal',
    'préparer voyage international Dakar',
    
    // Saisons / Périodes
    'billet avion vacances Dakar',
    'billet avion été Dakar',
    'billet avion Noël Dakar Paris',
    'billet avion Tabaski',
    'billet avion ramadan',
    
    // Étudiants / Familles
    'billet avion étudiant Dakar',
    'billet avion famille Dakar',
    'billet avion groupe Sénégal',
    
    // Comparaison
    'comparateur billets avion Dakar',
    'meilleur site billets avion Sénégal',
    'agence billets avion Dakar',
    
    // Marque
    'Eazy-Visa blog',
    'Eazy-Visa billets avion',
    'blog Eazy-Visa Dakar',
  ],
  
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  
  openGraph: {
    type: 'website',
    url: `${siteUrl}/blog`,
    siteName: 'Eazy-Visa Blog',
    locale: 'fr_SN',
    title: 'Blog Voyage Eazy-Visa | Billets d\'Avion Dakar, Destinations, Guides 2025',
    description: '✈️ Le meilleur blog voyage du Sénégal : guides destinations, astuces billets d\'avion pas cher, visas, conseils experts. Tout pour voyager malin depuis Dakar.',
    images: [{
      url: `${siteUrl}/blog-og.jpg`,
      width: 1200,
      height: 630,
      alt: 'Eazy-Visa Blog - Guides Voyage et Billets d\'Avion Dakar',
    }],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@EazyVisa',
    title: 'Blog Voyage Dakar | Billets d\'Avion, Destinations & Astuces | Eazy-Visa',
    description: 'Guides complets, destinations top 2025, astuces billets pas cher. Le blog voyage référence du Sénégal.',
    images: [`${siteUrl}/blog-og.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Données structurées Schema.org pour le Blog
export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Blog principal
    {
      '@type': 'Blog',
      '@id': `${siteUrl}/blog#blog`,
      url: `${siteUrl}/blog`,
      name: 'Eazy-Visa Blog Voyage',
      description: 'Blog de référence sur les billets d\'avion depuis Dakar, guides de destinations, visas et conseils voyage au Sénégal',
      publisher: {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Eazy-Visa',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
      inLanguage: 'fr-SN',
    },
    
    // Collection d'articles
    {
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/blog#webpage`,
      url: `${siteUrl}/blog`,
      name: 'Blog Voyage Dakar | Billets d\'Avion & Destinations',
      description: 'Articles, guides et conseils pour voyager malin depuis Dakar',
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/blog#blog`,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${siteUrl}/blog`,
          },
        ],
      },
    },
    
    // FAQ Blog
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Comment trouver des billets d\'avion pas cher depuis Dakar ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pour trouver des billets d\'avion pas cher depuis Dakar : 1) Réservez 2-3 mois à l\'avance, 2) Comparez les prix sur Eazy-Visa, 3) Soyez flexible sur les dates, 4) Évitez les périodes de vacances scolaires. Eazy-Visa offre jusqu\'à 40% de réduction vs agences traditionnelles.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelles sont les meilleures destinations depuis Dakar en 2025 ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Les destinations favorites depuis Dakar en 2025 : Paris (culture), Dubai (luxe), Istanbul (histoire), New York (business), Casablanca (proximité), Abidjan (affaires), Rome (gastronomie). Consultez notre blog pour des guides détaillés de chaque destination.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelle est la meilleure période pour acheter un billet d\'avion ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le meilleur moment pour acheter un billet d\'avion depuis Dakar est 6-8 semaines avant le départ pour les vols courts (Afrique, Europe) et 3-4 mois pour les vols longs (Amérique, Asie). Évitez les achats de dernière minute sauf urgence.',
          },
        },
      ],
    },
  ],
};

// Importer le composant client
export { default } from './BlogClient';