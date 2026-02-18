/* app/billet-avion-dakar/page.tsx — ULTRA SEO #1 BILLET AVION DAKAR */
import { Metadata } from 'next';
import BilletAvionPage from './BilletAvionPage';

// ✅ TITLE: 59 caractères (OPTIMAL 50-60)
// ✅ DESCRIPTION: 159 caractères (OPTIMAL 150-160)
export const metadata: Metadata = {
  title: 'Billet Avion Dakar Pas Cher | Meilleur Prix Garanti 2025',

  description:
    'Achetez votre billet avion à Dakar au meilleur prix. Amadeus · Sabre · Galileo. Toutes destinations. Paiement Wave/OM. Réservation immédiate. ☎ +221 76 767 67 38',

  alternates: {
    canonical: 'https://eazy-visa.com/billet-avion-dakar',
    languages: {
      'fr-SN': 'https://eazy-visa.com/billet-avion-dakar',
      'fr-FR': 'https://eazy-visa.com/billet-avion-dakar',
      'x-default': 'https://eazy-visa.com/billet-avion-dakar',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://eazy-visa.com/billet-avion-dakar',
    siteName: 'Eazy-Visa',
    title: 'Billet Avion Dakar Pas Cher | Prix Imbattables – Eazy-Visa',
    description:
      'Réservez votre billet avion depuis Dakar. Amadeus, Sabre, Galileo : meilleurs tarifs garantis. Paiement flexible. Émission immédiate.',
    images: [
      {
        url: 'https://eazy-visa.com/og-billet-avion.jpg',
        width: 1200,
        height: 630,
        alt: 'Billet avion Dakar pas cher – Eazy-Visa Sénégal',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@EazyVisa',
    creator: '@EazyVisa',
    title: 'Billet Avion Dakar Pas Cher | Eazy-Visa',
    description: 'Meilleurs prix billets avion depuis Dakar. GDS Amadeus/Sabre/Galileo. +221 76 767 67 38',
    images: ['https://eazy-visa.com/og-billet-avion.jpg'],
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
    'billet avion dakar',
    'billet avion pas cher dakar',
    "billet d'avion dakar",
    'billet avion senegal',
    'vol pas cher dakar',
    
    // 🔑 INTENT TRANSACTIONNEL
    'acheter billet avion dakar',
    'achat billet avion dakar',
    'reservation billet avion dakar',
    'reserver billet avion dakar',
    'prix billet avion dakar',
    'tarif billet avion dakar',
    
    // 🔑 LONG-TAIL DESTINATIONS
    'billet avion dakar paris',
    'billet avion dakar france',
    'billet avion dakar dubai',
    'billet avion dakar new york',
    'billet avion dakar casablanca',
    'billet avion dakar abidjan',
    'vol dakar paris pas cher',
    'vol dakar europe',
    
    // 🔑 COMPARATIFS
    'meilleur prix billet avion dakar',
    'billet avion moins cher dakar',
    'ou acheter billet avion dakar',
    'comparateur billet avion dakar',
    
    // 🔑 SERVICES ASSOCIÉS
    'billet avion last minute dakar',
    'billet avion aller simple dakar',
    'billet avion aller retour dakar',
    'reservation vol dakar',
    
    // 🔑 GEO + BRAND
    'eazy visa billet avion',
    'billet avion keur gorgui',
    'agence billet avion dakar',
  ],
};

// ═══════════════════════════════════════════════════════════
//  SCHEMAS JSON-LD — Product/Offer pour signaler la VENTE
// ═══════════════════════════════════════════════════════════

/** Product — Billet avion comme produit */
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': 'https://eazy-visa.com/billet-avion-dakar/#product',
  name: 'Billet Avion International depuis Dakar',
  description:
    'Billets avion toutes destinations depuis Dakar, Sénégal. Accès GDS Amadeus, Sabre et Galileo pour les meilleurs tarifs du marché. Émission immédiate, paiement flexible.',
  image: 'https://eazy-visa.com/og-billet-avion.jpg',
  brand: {
    '@type': 'Brand',
    name: 'Eazy-Visa',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'XOF',
    lowPrice: '120000',
    highPrice: '2500000',
    offerCount: '1200',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Eazy-Visa',
      '@id': 'https://eazy-visa.com/#organization',
    },
    url: 'https://eazy-visa.com/billet-avion-dakar',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2847',
    bestRating: '5',
  },
};

/** Service — Vente billets avion */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://eazy-visa.com/billet-avion-dakar/#service',
  serviceType: 'Vente billets avion',
  name: 'Réservation et Vente Billets Avion Dakar',
  description:
    'Service de réservation et vente de billets avion depuis Dakar vers toutes destinations internationales. Accès aux 3 GDS mondiaux (Amadeus, Sabre, Galileo). Meilleur prix garanti.',
  provider: {
    '@id': 'https://eazy-visa.com/#organization',
  },
  areaServed: [
    { '@type': 'Country', name: 'Sénégal' },
    { '@type': 'City', name: 'Dakar' },
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://eazy-visa.com/billet-avion-dakar',
    servicePhone: '+221767673838',
    availableLanguage: { '@type': 'Language', name: 'French' },
  },
  termsOfService: 'https://eazy-visa.com/conditions',
};

/** BreadcrumbList */
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://eazy-visa.com/billet-avion-dakar/#breadcrumb',
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
      name: 'Billet Avion Dakar',
      item: { '@type': 'Thing', '@id': 'https://eazy-visa.com/billet-avion-dakar', name: 'Billet Avion Dakar' },
    },
  ],
};

/** FAQ — ultra-ciblée achat billet avion */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment acheter un billet avion pas cher à Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour acheter un billet avion pas cher à Dakar, contactez Eazy-Visa au +221 76 767 67 38. Nous avons accès aux 3 GDS mondiaux (Amadeus, Sabre, Galileo) qui nous permettent de comparer des millions de tarifs en temps réel et vous garantir le meilleur prix disponible sur le marché.",
      },
    },
    {
      '@type': 'Question',
      name: 'Où acheter un billet avion à Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vous pouvez acheter votre billet avion chez Eazy-Visa, agence située à Keur Gorgui (Cité Keur Gorgui, Immeuble R98, Lot 12). Réservation également possible par WhatsApp au +221 76 767 67 38 avec émission immédiate. Service 24/7.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le prix d\'un billet avion depuis Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les prix varient selon la destination : Casablanca dès 120 000 FCFA, Paris dès 320 000 FCFA, Dubai dès 280 000 FCFA, New York dès 450 000 FCFA. Contactez-nous pour un devis gratuit en temps réel adapté à vos dates.",
      },
    },
    {
      '@type': 'Question',
      name: 'Comment payer mon billet avion à Dakar ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Nous acceptons Wave, Orange Money, carte bancaire Visa/Mastercard, et le paiement en espèces à notre agence de Keur Gorgui. Paiement 100% sécurisé, émission immédiate du billet.",
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je modifier ou annuler mon billet avion ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, les modifications et annulations sont possibles selon les conditions tarifaires de votre billet. Contactez-nous dès que possible pour gérer tout changement. Notre service client 24/7 vous assiste dans toutes vos démarches.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps pour recevoir mon billet avion ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Émission et envoi immédiat par email dès confirmation du paiement. Vous recevez votre e-ticket en moins de 5 minutes. Pour les réservations complexes, délai maximum de 2 heures.",
      },
    },
  ],
};

/** WebPage */
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://eazy-visa.com/billet-avion-dakar/#webpage',
  url: 'https://eazy-visa.com/billet-avion-dakar',
  name: 'Billet Avion Dakar Pas Cher | Meilleur Prix Garanti – Eazy-Visa',
  description:
    'Achetez votre billet avion à Dakar au meilleur prix. Amadeus, Sabre, Galileo. Toutes destinations. Paiement Wave/OM. Réservation immédiate.',
  inLanguage: 'fr-SN',
  isPartOf: { '@id': 'https://eazy-visa.com/#website' },
  about: { '@id': 'https://eazy-visa.com/#organization' },
  datePublished: '2023-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  breadcrumb: { '@id': 'https://eazy-visa.com/billet-avion-dakar/#breadcrumb' },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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

      <BilletAvionPage />
    </>
  );
}