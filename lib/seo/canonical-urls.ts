/**
 * CANONICAL URL MANAGEMENT
 * Prevent duplicate content issues with proper canonical tags
 */

const SITE_URL = 'https://eazy-visa.com'

export const CANONICAL_URLS = {
  home: `${SITE_URL}/`,
  acceuil: `${SITE_URL}/acceuil`,
  billets: `${SITE_URL}/billets`,
  billeterie: `${SITE_URL}/billeterie`,
  billetAvionDakar: `${SITE_URL}/billet-avion-dakar`,
  agenceVoyage: `${SITE_URL}/agence-voyage-dakar-senegal`,
  hotels: `${SITE_URL}/hotels`,
  services: `${SITE_URL}/services`,
  visaAllemagne: `${SITE_URL}/voyager-en-allemagne`,
  aboutUs: `${SITE_URL}/a-propos`,
  montreal : `${SITE_URL}/destinations/dakar-montreal`,
  rome : `${SITE_URL}/destinations/dakar-rome`,
  careers: `${SITE_URL}/carrieres`,
  partnership: `${SITE_URL}/partenariat`,
  investment: `${SITE_URL}/investissement`,
  cgu: `${SITE_URL}/cgu`,
  destinations : `${SITE_URL}/destinations`,
  paris : `${SITE_URL}/destinations/dakar-paris`,
  madrid : `${SITE_URL}/destinations/dakar-madrid`,
  casablanca : `${SITE_URL}/destinations/dakar-casablanca`,
  bruxelles : `${SITE_URL}/destinations/dakar-bruxelles`,
  dubai : `${SITE_URL}/destinations/dakar-dubai`,
  istanbul : `${SITE_URL}/destinations/dakar-istanbul`,
  newyork : `${SITE_URL}/destinations/dakar-new-york`,
} as const;

/**
 * Generate canonical URL for a given path
 */
export function generateCanonicalUrl(path: string): string {
  // Remove trailing slashes except for root
  const cleanPath = path === '/' ? '/' : path.replace(/\/$/, '');
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Get canonical URL from route
 */
export function getCanonicalUrl(route: keyof typeof CANONICAL_URLS): string {
  return CANONICAL_URLS[route];
}

/**
 * Validate URL format
 */
export function isValidCanonicalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'www.eazy-visa.com' || urlObj.hostname === 'localhost';
  } catch {
    return false;
  }
}

/**
 * Get alternate URLs for hreflang tags
 */
export const ALTERNATE_URLS = {
  'fr-SN': SITE_URL,
  'fr-FR': SITE_URL,
  'x-default': SITE_URL,
} as const;

/**
 * Generate metadata with canonical URL
 */
export function generateMetadataWithCanonical(
  path: string,
  baseMetadata: Record<string, any>
) {
  return {
    ...baseMetadata,
    alternates: {
      canonical: generateCanonicalUrl(path),
      languages: ALTERNATE_URLS,
    },
  };
}

