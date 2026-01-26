/**
 * SYSTÈME SEO ULTRA-COMPÉTITIF EAZY-VISA
 * Configuration centralisée pour TOP 1 ranking
 */

export const SEO_CONFIG = {
  // URLS DE BASE
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://www.eazy-visa.com' 
    : 'http://localhost:3000',

  // DONNÉES LOCALES
  locale: 'fr_SN',
  country: 'SN',
  city: 'Dakar',
  
  // MARQUE
  brandName: 'Eazy-Visa',
  shortBrandName: 'Eazy',
  tagline: 'Agence de Voyages Dakar - Billets d\'Avion & Visa Allemagne',
  
  // CONTACT
  phone: '+221 76 948 60 60',
  email: 'contact@eazy-visa.com',
  
  // LOCALISATION
  address: {
    streetAddress: 'Cité Keur Gorgui, Immeuble R98, Lot 12',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
    postalCode: '14000',
    latitude: 14.7523,
    longitude: -17.3635,
  },

  // HEURES OUVERTURE
  hoursOfOperation: {
    monday: '09:00-18:00',
    tuesday: '09:00-18:00',
    wednesday: '09:00-18:00',
    thursday: '09:00-18:00',
    friday: '09:00-18:00',
    saturday: '09:00-13:00',
    sunday: 'closed',
  },

  // RÉSEAUX SOCIAUX
  socialLinks: {
    twitter: 'https://twitter.com/EazyVisa',
    facebook: 'https://facebook.com/eazy.visa',
    instagram: 'https://instagram.com/eazy.visa',
    linkedin: 'https://linkedin.com/company/eazy-visa',
    youtube: 'https://youtube.com/@eazy-visa',
  },

  // KEYWORDS STRATÉGIQUES AVEC VOLUMES
  keywords: {
    // Primary Keywords (100+ searches/month)
    primary: [
      'agence de voyage dakar',
      'billet avion pas cher dakar',
      'visa allemagne senegal',
      'reservation vol dakar',
      'voyage allemagne dakar',
    ],
    
    // Secondary Keywords (50-100 searches/month)
    secondary: [
      'vol dakar paris pas cher',
      'billet dakar france',
      'visa schengen dakar',
      'agence voyage keur gorgui',
      'tour operateur dakar',
      'voyage europe dakar',
    ],
    
    // Long-tail Keywords (10-50 searches/month)
    longTail: [
      'meilleur prix billet avion dakar',
      'visa allemagne express 48h',
      'réservation vol en ligne dakar',
      'agence voyage paiement wave dakar',
      'billet avion dakar france prix',
      'visa schengen senegal prix',
      'voyage allemagne pas cher dakar',
    ],

    // Location Keywords
    location: [
      'agence voyage dakar',
      'agence voyage senegal',
      'tour operateur senegal',
      'voyage keur gorgui',
    ],
  },

  // PAGES PRIORITAIRES POUR CONTENU
  priorityPages: [
    {
      path: '/',
      title: 'Agence de Voyages Dakar | Billets d\'Avion & Visa Allemagne',
      priority: 1.0,
      changefreq: 'weekly',
    },
    {
      path: '/billets',
      title: 'Billets d\'Avion Pas Cher | Réservation Vol Dakar',
      priority: 0.95,
      changefreq: 'daily',
    },
    {
      path: '/voyager-en-allemagne',
      title: 'Visa Allemagne Dakar | Express 48h | Eazy-Visa',
      priority: 0.95,
      changefreq: 'weekly',
    },
    {
      path: '/hotels',
      title: 'Hôtels & Hébergements | Réservation En Ligne',
      priority: 0.90,
      changefreq: 'daily',
    },
    {
      path: '/services',
      title: 'Services de Voyage | Assurance, Visa, Billets',
      priority: 0.85,
      changefreq: 'weekly',
    },
  ],
};

/**
 * GÉNÉRATEUR DE MÉTADONNÉES SEO OPTIMISÉES
 * À utiliser dans chaque page pour cohérence maximale
 */
export function generatePageMetadata(page: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article' | 'business.business';
}) {
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords || [],
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      type: page.type || 'website',
      url: page.url,
      title: page.title,
      description: page.description,
      images: [
        {
          url: page.image || `${SEO_CONFIG.baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      locale: 'fr_SN',
      siteName: SEO_CONFIG.brandName,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [page.image || `${SEO_CONFIG.baseUrl}/og-image.jpg`],
    },
  };
}

/**
 * GÉNÉRATEUR DE SCHEMA.ORG JSON-LD
 * Pour rich snippets et featured snippets
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SEO_CONFIG.baseUrl}/#organization`,
    name: SEO_CONFIG.brandName,
    alternateName: SEO_CONFIG.shortBrandName,
    url: SEO_CONFIG.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${SEO_CONFIG.baseUrl}/logo.png`,
      width: 250,
      height: 60,
    },
    image: `${SEO_CONFIG.baseUrl}/og-image.jpg`,
    description: SEO_CONFIG.tagline,
    address: {
      '@type': 'PostalAddress',
      ...SEO_CONFIG.address,
    },
    telephone: SEO_CONFIG.phone,
    email: SEO_CONFIG.email,
    sameAs: Object.values(SEO_CONFIG.socialLinks),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: 'closed',
      },
    ],
    priceRange: '$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '350',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.address.latitude,
      longitude: SEO_CONFIG.address.longitude,
    },
  };
}

/**
 * FAQ SCHEMA POUR RICH SNIPPETS
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * BREADCRUMB SCHEMA POUR NAVIGATION
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * ARTICLE SCHEMA POUR BLOG POSTS
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
  content: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Organization',
      name: SEO_CONFIG.brandName,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.brandName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.baseUrl}/logo.png`,
      },
    },
    articleBody: article.content,
  };
}

