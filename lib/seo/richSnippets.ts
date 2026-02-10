/**
 * RICH SNIPPETS & ADVANCED SCHEMA.ORG
 * Pour un meilleur affichage dans les résultats de recherche
 */

/**
 * REVIEW SCHEMA - Pour les avis clients
 */
export function generateReviewSchema(data: {
  authorName: string;
  reviewRating: number;
  reviewBody: string;
  datePublished: string;
  productName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.reviewRating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: data.reviewBody,
    author: {
      '@type': 'Person',
      name: data.authorName,
    },
    datePublished: data.datePublished,
    reviewedProduct: {
      '@type': 'Product',
      name: data.productName,
    },
  };
}

/**
 * AGGREGATE RATING - Note moyenne
 */
export function generateAggregateRatingSchema(data: {
  ratingValue: number;
  ratingCount: number;
  productName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.productName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.ratingValue.toString(),
      ratingCount: data.ratingCount.toString(),
    },
  };
}

/**
 * OFFER SCHEMA - Pour les prix et disponibilité
 */
export function generateOfferSchema(data: {
  productName: string;
  price: string;
  priceCurrency: string;
  availability: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: data.productName,
    price: data.price,
    priceCurrency: data.priceCurrency,
    availability: `https://schema.org/${data.availability}`,
    description: data.description,
    offeredBy: {
      '@type': 'Organization',
      name: 'Eazy-Visa',
    },
  };
}

/**
 * EVENT SCHEMA - Pour les événements (open days, conférences)
 */
export function generateEventSchema(data: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    eventLocation: {
      '@type': 'Place',
      name: data.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dakar',
        addressCountry: 'SN',
      },
    },
    image: data.image,
    organizer: {
      '@type': 'Organization',
      name: 'Eazy-Visa',
    },
  };
}

/**
 * PERSON SCHEMA - Pour les équipes/employés
 */
export function generatePersonSchema(data: {
  name: string;
  jobTitle: string;
  image: string;
  telephone?: string;
  email?: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    image: data.image,
    ...(data.telephone && { telephone: data.telephone }),
    ...(data.email && { email: data.email }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  };
}

/**
 * KNOWLEDGE GRAPH - Informations principales
 */
export function generateKnowledgeGraphSchema() {
  const baseUrl = 'https://eazy-visa.com'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Eazy-Visa',
        description: 'Agence de Voyages Dakar - Billets d\'Avion & Visa Allemagne',
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Eazy-Visa',
        alternateName: 'Eazy',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          '@id': `${baseUrl}/#logo`,
          inLanguage: 'fr_SN',
          url: `${baseUrl}/logo.png`,
          contentUrl: `${baseUrl}/logo.png`,
          width: 250,
          height: 60,
          caption: 'Eazy-Visa',
        },
        image: {
          '@id': `${baseUrl}/#logo`,
        },
        sameAs: [
          'https://twitter.com/EazyVisa',
          'https://facebook.com/eazy.visa',
          'https://instagram.com/eazy.visa',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Cité Keur Gorgui, Immeuble R98, Lot 12',
          addressLocality: 'Dakar',
          addressCountry: 'SN',
          postalCode: '14000',
        },
        areaServed: 'SN',
        priceRange: '$',
      },
    ],
  };
}

