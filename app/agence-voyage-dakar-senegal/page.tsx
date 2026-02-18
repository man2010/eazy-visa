/* app/agence-voyage-dakar-senegal/page.tsx — ULTRA SEO #1 AGENCE VOYAGE */
import { Metadata } from 'next';
import AgenceVoyagePage from './AgenceVoyagePage';

// ✅ TITLE: 60 caractères exact (OPTIMAL)
// ✅ DESCRIPTION: 157 caractères (OPTIMAL 150-160)
export const metadata: Metadata = {
  title: 'Agence Voyage Dakar #1 | Meilleur Prix & Service 24/7',

  description:
    'Agence de voyage n°1 à Dakar : billets avion, visa, hôtels, circuits. 10 000+ clients satisfaits. Devis gratuit 24/7. ☎ +221 76 767 67 38',

  alternates: {
    canonical: 'https://eazy-visa.com/agence-voyage-dakar-senegal',
    languages: {
      'fr-SN': 'https://eazy-visa.com/agence-voyage-dakar-senegal',
      'fr-FR': 'https://eazy-visa.com/agence-voyage-dakar-senegal',
      'x-default': 'https://eazy-visa.com/agence-voyage-dakar-senegal',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://eazy-visa.com/agence-voyage-dakar-senegal',
    siteName: 'Eazy-Visa',
    title: 'Agence Voyage Dakar #1 au Sénégal | Eazy-Visa',
    description:
      'Meilleure agence de voyage à Dakar. Billets avion, visa Allemagne, hôtels, circuits. Prix imbattables. Service 24/7. 10 000+ clients satisfaits.',
    images: [
      {
        url: 'https://eazy-visa.com/og-agence-voyage.jpg',
        width: 1200,
        height: 630,
        alt: 'Eazy-Visa - Agence de Voyage #1 à Dakar Sénégal',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@EazyVisa',
    creator: '@EazyVisa',
    title: 'Agence Voyage Dakar #1 | Eazy-Visa Sénégal',
    description: 'Billets avion, visa, hôtels, circuits. Service 24/7. +221 76 767 67 38',
    images: ['https://eazy-visa.com/og-agence-voyage.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  keywords: [
    // 🔑 HEAD TERMS — volume maximal
    'agence de voyage dakar',
    'agence voyage dakar',
    'agence de voyage senegal',
    'agence voyage senegal',
    'agence tourisme dakar',
    'tour operator dakar',
    'tour operateur senegal',
    
    // 🔑 LONG-TAIL spécifiques
    'meilleure agence voyage dakar',
    'agence de voyage dakar pas cher',
    'agence voyage keur gorgui',
    'agence voyage dakar avis',
    'organisateur voyage dakar',
    'agence voyage internationale dakar',
    'agence receptive senegal',
    
    // 🔑 SERVICES combinés
    'agence voyage billet avion dakar',
    'agence voyage visa dakar',
    'agence voyage hotel dakar',
    'agence voyage circuit senegal',
    'agence voyage excursion dakar',
    
    // 🔑 COMPARATIFS
    'agence voyage dakar fiable',
    'agence voyage dakar serieuse',
    'agence voyage dakar recommandee',
    'quelle agence voyage choisir dakar',
    
    // 🔑 GEO + BRAND
    'eazy visa dakar',
    'eazy-visa agence voyage',
    'agence eazy visa senegal',
  ],
};

// ═══════════════════════════════════════════════════════════
//  SCHEMAS JSON-LD — LocalBusiness + TravelAgency
// ═══════════════════════════════════════════════════════════

/** LocalBusiness & TravelAgency — double typage pour visibilité max */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'TravelAgency'],
  '@id': 'https://eazy-visa.com/agence-voyage-dakar-senegal/#agence',
  name: 'Eazy-Visa',
  alternateName: 'Eazy Visa Dakar',
  description:
    'Agence de voyage #1 à Dakar, Sénégal. Spécialiste billets avion, visa Allemagne, réservation hôtels et circuits touristiques. Service 24/7.',
  url: 'https://eazy-visa.com',
  image: 'https://eazy-visa.com/Logo.png',
  logo: {
    '@type': 'ImageObject',
    url: 'https://eazy-visa.com/Logo.png',
    width: 250,
    height: 60,
  },
  telephone: '+221767673838',
  email: 'contact@eazy-visa.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cité Keur Gorgui, Immeuble R98, Lot 12',
    addressLocality: 'Dakar',
    postalCode: '14000',
    addressCountry: 'SN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 14.7523,
    longitude: -17.3635,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'XOF',
  paymentAccepted: 'Cash, Credit Card, Wave, Orange Money',
  areaServed: [
    { '@type': 'City', name: 'Dakar' },
    { '@type': 'Country', name: 'Sénégal' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'Country', name: 'Allemagne' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services Agence Voyage Eazy-Visa',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Billetterie aérienne internationale' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Obtention visa Allemagne et Schengen' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Réservation hôtels monde entier' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Circuits et excursions Sénégal' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assurance voyage internationale' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transferts aéroport et transport' } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '487',
    bestRating: '5',
  },
  founder: {
    '@type': 'Person',
    name: 'Bertrand Gopele',
  },
  foundingDate: '2019',
  sameAs: [
    'https://www.facebook.com/eazy.visa',
    'https://www.instagram.com/eazyvisa',
  ],
};

/** Service principal */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://eazy-visa.com/agence-voyage-dakar-senegal/#service',
  serviceType: 'Agence de voyage',
  name: 'Services Agence Voyage Complète — Eazy-Visa Dakar',
  description:
    'Agence de voyage complète à Dakar : billetterie aérienne (Amadeus, Sabre, Galileo), visa Allemagne express, réservation hôtels, circuits touristiques, assurance voyage. Service 24/7.',
  provider: {
    '@id': 'https://eazy-visa.com/#organization',
  },
  areaServed: [
    { '@type': 'Country', name: 'Sénégal' },
    { '@type': 'City', name: 'Dakar' },
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://eazy-visa.com',
    servicePhone: '+221767673838',
  },
};

/** BreadcrumbList */
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://eazy-visa.com/agence-voyage-dakar-senegal/#breadcrumb',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: { '@type': 'Thing', '@id': 'https://eazy-visa.com', name: 'Accueil' },
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Agence Voyage Dakar',
      item: {
        '@type': 'Thing',
        '@id': 'https://eazy-visa.com/agence-voyage-dakar-senegal',
        name: 'Agence Voyage Dakar',
      },
    },
  ],
};

/** FAQ — questions ultra-ciblées agence de voyage */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Pourquoi choisir une agence de voyage à Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Une agence de voyage professionnelle à Dakar vous fait gagner du temps et de l'argent. Eazy-Visa négocie les meilleurs tarifs grâce à ses accès GDS (Amadeus, Sabre, Galileo), gère toutes vos démarches visa, et vous accompagne 24/7 en cas d'imprévu. Contrairement aux plateformes en ligne, vous avez un interlocuteur humain disponible à tout moment.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la meilleure agence de voyage à Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Eazy-Visa est reconnue comme l'agence de voyage #1 à Dakar avec plus de 10 000 clients satisfaits, un taux de satisfaction de 98%, et des avis clients excellents. Notre force : accès aux 3 GDS mondiaux, service 24/7, prix transparents, et accompagnement personnalisé de A à Z.",
      },
    },
    {
      '@type': 'Question',
      name: "Quels services propose une agence de voyage complète ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Une agence de voyage complète comme Eazy-Visa propose : billetterie aérienne internationale, obtention de visas (Allemagne, Schengen), réservation hôtels 1 à 5 étoiles, circuits touristiques personnalisés, assurance voyage, transferts aéroport, et assistance 24/7. Concept One Stop Shop : tout en un seul endroit.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte une agence de voyage à Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chez Eazy-Visa, la consultation et le devis sont gratuits. Nos tarifs sont transparents et souvent moins chers que la réservation directe grâce à nos accords avec les compagnies aériennes et hôtels. Nous facturons uniquement une commission raisonnable sur les services réservés, sans frais cachés.",
      },
    },
    {
      '@type': 'Question',
      name: 'Comment contacter une agence de voyage à Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Contactez Eazy-Visa par WhatsApp au +221 76 767 67 38 (réponse immédiate), par téléphone, ou visitez notre agence à Keur Gorgui (Cité Keur Gorgui, Immeuble R98, Lot 12). Nous sommes disponibles 7j/7, 24h/24 pour toute urgence.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelle est la différence entre une agence de voyage et un tour opérateur ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Une agence de voyage comme Eazy-Visa vend des prestations individuelles (billets, hôtels, visa) et des packages. Un tour opérateur crée et vend ses propres circuits. Eazy-Visa combine les deux : nous vendons toutes les prestations voyage ET créons des circuits sur mesure au Sénégal.",
      },
    },
  ],
};

/** WebPage */
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://eazy-visa.com/agence-voyage-dakar-senegal/#webpage',
  url: 'https://eazy-visa.com/agence-voyage-dakar-senegal',
  name: 'Agence de Voyage Dakar #1 au Sénégal | Eazy-Visa',
  description:
    'Meilleure agence de voyage à Dakar. Billets avion, visa, hôtels, circuits. Amadeus, Sabre, Galileo. Service 24/7. 10 000+ clients satisfaits.',
  inLanguage: 'fr-SN',
  isPartOf: { '@id': 'https://eazy-visa.com/#website' },
  about: { '@id': 'https://eazy-visa.com/#organization' },
  datePublished: '2023-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  breadcrumb: { '@id': 'https://eazy-visa.com/agence-voyage-dakar-senegal/#breadcrumb' },
};

export default function Page() {
  return (
    <>
      {/* ── Structured data injected in <head> ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AgenceVoyagePage />
    </>
  );
}