/* app/billetterie/page.tsx — ULTRA SEO OPTIMISÉ #1 BILLETTERIE DAKAR */
import { Metadata } from 'next';
import BilletteriePage from './BilleteriePage';

// ✅ TITLE: 58 caractères (OPTIMAL 50-60)
// ✅ DESCRIPTION: 158 caractères (OPTIMAL 150-160)
export const metadata: Metadata = {
  title: 'Billetterie Dakar | Billets Avion Pas Cher - Eazy-Visa',

  description:
    'Billetterie n°1 à Dakar : billets avion, hôtels, transport & assurance voyage. Amadeus, Sabre, Galileo. Toutes destinations. Devis gratuit 24/7. ☎ +221 76 767 67 38',

  alternates: {
    canonical: 'https://eazy-visa.com/billetterie',
    languages: {
      'fr-SN': 'https://eazy-visa.com/billetterie',
      'fr-FR': 'https://eazy-visa.com/billetterie',
      'x-default': 'https://eazy-visa.com/billetterie',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://eazy-visa.com/billetterie',
    siteName: 'Eazy-Visa',
    title: 'Billetterie Dakar | Billets Avion Toutes Destinations - Eazy-Visa',
    description:
      'Billets avion pas cher depuis Dakar. Amadeus · Sabre · Galileo. Hôtels, transport & assurance. Devis gratuit en 5 min. Service 24/7.',
    images: [
      {
        url: 'https://eazy-visa.com/og-billetterie.jpg',
        width: 1200,
        height: 630,
        alt: 'Billetterie Eazy-Visa Dakar - Billets avion toutes destinations',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@EazyVisa',
    creator: '@EazyVisa',
    title: 'Billetterie Dakar | Billets Avion Pas Cher - Eazy-Visa',
    description: 'Réservez vos billets avion depuis Dakar. Amadeus, Sabre, Galileo. 24/7.',
    images: ['https://eazy-visa.com/og-billetterie.jpg'],
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
    // 🔑 HEAD TERMS – volume maximal
    'billetterie dakar',
    'billetterie sénégal',
    'billet avion dakar',
    'billet avion pas cher dakar',
    'billets avion sénégal',
    'réservation billet avion dakar',
    // 🔑 LONG-TAIL – haute conversion
    'acheter billet avion dakar paris',
    'billet avion dakar new york pas cher',
    'billet avion dakar dubai pas cher',
    'billet avion dakar casablanca',
    'billet avion dakar rome',
    'vol pas cher dakar',
    'vol dakar europe',
    'vol dakar afrique pas cher',
    // 🔑 GDS & AGENCE
    'agence billetterie dakar',
    'agence voyage billets avion dakar',
    'amadeus dakar',
    'sabre dakar',
    'galileo dakar',
    // 🔑 SERVICES ASSOCIÉS
    'reservation hotel dakar',
    'assurance voyage sénégal',
    'transport aeroport dakar',
    'transfert aeroport dakar',
    // 🔑 LOCAL
    'billetterie keur gorgui dakar',
    'agence voyage keur gorgui',
    'eazy visa billets avion',
    'eazy-visa billetterie',
  ],
};

// ═══════════════════════════════════════════════════════════
//  SCHEMAS JSON-LD — Section SEO ultra-avancée
// ═══════════════════════════════════════════════════════════

/** Service : Billetterie avion */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://eazy-visa.com/billetterie/#service',
  serviceType: 'Billetterie aérienne',
  name: 'Billetterie - Billets Avion Toutes Destinations',
  description:
    'Réservation de billets avion pas cher depuis Dakar vers toutes destinations mondiales. Systèmes GDS Amadeus, Sabre et Galileo. Hôtels, transport et assurance voyage inclus.',
  url: 'https://eazy-visa.com/billetterie',
  provider: {
    '@id': 'https://eazy-visa.com/#organization',
  },
  areaServed: [
    { '@type': 'Country', name: 'Sénégal' },
    { '@type': 'AdministrativeArea', name: 'Dakar' },
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://eazy-visa.com/billetterie',
    servicePhone: '+221767673838',
    availableLanguage: { '@type': 'Language', name: 'French' },
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'XOF',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      description: 'Prix variables selon destination et disponibilité',
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de billetterie Eazy-Visa',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Billets avion toutes destinations' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Réservation hôtels internationaux' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transport / transfert aéroport' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assurance voyage' } },
    ],
  },
};

/** BreadcrumbList */
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://eazy-visa.com' },
    { '@type': 'ListItem', position: 2, name: 'Billetterie', item: 'https://eazy-visa.com/billetterie' },
  ],
};

/** FAQ Schema pour les rich snippets */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment réserver un billet avion depuis Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contactez-nous sur WhatsApp au +221 76 767 67 38 ou visitez notre agence à Keur Gorgui. Nos conseillers utilisent les systèmes GDS Amadeus, Sabre et Galileo pour vous trouver le meilleur tarif en temps réel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelles destinations couvrez-vous depuis Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nous couvrons toutes les destinations mondiales : Europe (Paris, Rome, Berlin, Madrid…), Amérique (New York, Montréal…), Asie (Dubai, Istanbul, Bangkok…), Afrique (Abidjan, Casablanca, Lagos…) et bien plus.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels systèmes GDS utilisez-vous ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eazy-Visa est accrédité sur les trois principaux GDS mondiaux : Amadeus, Sabre et Galileo, vous garantissant l\'accès aux meilleurs tarifs et disponibilités de toutes les compagnies aériennes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous des services hôtel et assurance voyage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui ! En plus des billets avion, nous proposons la réservation d\'hôtels, l\'organisation de transferts aéroport et la souscription d\'assurance voyage, pour un service "One Stop Shop" complet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment payer votre billet avion ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nous acceptons Wave, Orange Money, carte bancaire et le paiement en espèces directement à notre agence de Keur Gorgui, Dakar.',
      },
    },
  ],
};

/** WebPage schema */
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://eazy-visa.com/billetterie/#webpage',
  url: 'https://eazy-visa.com/billetterie',
  name: 'Billetterie Dakar | Billets Avion Toutes Destinations – Eazy-Visa',
  description:
    'Billetterie aérienne n°1 à Dakar. Billets avion, hôtels, transport et assurance. Amadeus, Sabre, Galileo. Devis 24/7.',
  inLanguage: 'fr-SN',
  isPartOf: { '@id': 'https://eazy-visa.com/#website' },
  about: { '@id': 'https://eazy-visa.com/#organization' },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  breadcrumb: { '@id': 'https://eazy-visa.com/billetterie/#breadcrumb' },
};

export default function Page() {
  return (
    <>
      {/* ── Structured data injected in <head> via Next.js ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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

      <BilletteriePage />
    </>
  );
}