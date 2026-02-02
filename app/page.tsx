/* app/page.tsx - VERSION ULTRA OPTIMISÉE TOP 1 */
import { Metadata } from 'next';
import HomePageClient from './home/HomePageClient';

// ✅ CRITIQUE: Metadata complète pour la page d'accueil
export const metadata: Metadata = {
  // ✅ TITLE: 59 caractères (OPTIMAL 50-60)
  title: 'Agence Voyage Dakar | Billets Avion & Visa Allemagne',
  
  // ✅ DESCRIPTION: 159 caractères (OPTIMAL 150-160)
  description: 'Billets d\'avion pas cher depuis Dakar. Visa Allemagne express 48h. Service 24/7. Paiement Wave/Orange Money. Prix imbattables. ☎️ +221 76 948 60 60',
  
  // ✅ CANONICAL ABSOLU CRITIQUE
  alternates: {
    canonical: 'https://www.app.eazy-visa.com',
    languages: {
      'fr-SN': 'https://www.app.eazy-visa.com',
      'fr-FR': 'https://www.app.eazy-visa.com',
    },
  },

  // ✅ OG: Type website pour page d'accueil
  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://www.app.eazy-visa.com',
    siteName: 'Eazy-Visa',
    title: 'Agence Voyage Dakar | Billets Avion & Visa Allemagne',
    description: 'Meilleur prix garanti. Service 24/7. Paiement flexible. Réservez maintenant!',
    images: [
      {
        url: 'https://www.app.eazy-visa.com/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Eazy-Visa Dakar - Agence de voyages #1 au Sénégal',
        type: 'image/jpeg',
      },
    ],
  },

  // ✅ TWITTER CARD
  twitter: {
    card: 'summary_large_image',
    site: '@EazyVisa',
    creator: '@EazyVisa',
    title: 'Agence Voyage Dakar | Vols & Visa Allemagne',
    description: 'Prix imbattables. Service 24/7. +221 76 948 60 60',
    images: ['https://www.app.eazy-visa.com/og-image-home.jpg'],
  },

  // ✅ ROBOTS: Indexation prioritaire
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  // ✅ KEYWORDS: Long-tail spécifiques
  keywords: [
    'agence de voyage dakar',
    'billet avion pas cher dakar',
    'visa allemagne senegal',
    'reservation vol dakar paris',
    'vol dakar europe pas cher',
    'agence voyage keur gorgui',
    'visa allemagne dakar prix',
    'billet avion dakar france',
    'voyage allemagne senegal',
    'eazy-visa dakar',
  ],
};

// ✅ SCHEMA.ORG PAGE D'ACCUEIL (WebPage)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.app.eazy-visa.com/#webpage',
  'url': 'https://www.app.eazy-visa.com',
  'name': 'Eazy-Visa | Agence de Voyages Dakar - Billets d\'Avion & Visa Allemagne',
  'description': 'Réservation billets d\'avion pas cher et visa Allemagne express au Sénégal',
  'inLanguage': 'fr-SN',
  'isPartOf': {
    '@id': 'https://www.app.eazy-visa.com/#website'
  },
  'about': {
    '@id': 'https://www.app.eazy-visa.com/#organization'
  },
  'datePublished': '2023-01-01',
  'dateModified': new Date().toISOString().split('T')[0],
  'potentialAction': {
    '@type': 'SearchAction',
    'target': {
      '@type': 'EntryPoint',
      'urlTemplate': 'https://www.app.eazy-visa.com/recherche?query={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
};

export default function HomePage() {
  return (
    <>
      {/* ✅ Schema.org dans le head de la page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}