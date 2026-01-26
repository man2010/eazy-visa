/**
 * COMPOSANT SEOHead
 * Injecte tous les tags meta & schemas automatiquement
 * À utiliser dans le layout pour assurer la cohérence
 */

import { generateKnowledgeGraphSchema } from '@/lib/seo/richSnippets';

export function SEOHead() {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.eazy-visa.com'
    : 'http://localhost:3000';

  const knowledgeGraph = generateKnowledgeGraphSchema();

  return (
    <>
      {/* Preconnect to external services (Performance) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Alternate Languages */}
      <link rel="alternate" href={baseUrl} hrefLang="fr-SN" />
      <link rel="alternate" href={baseUrl} hrefLang="fr" />
      <link rel="alternate" href={baseUrl} hrefLang="x-default" />

      {/* Knowledge Graph Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgeGraph) }}
      />

      {/* JSON-LD: Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: baseUrl,
            name: 'Eazy-Visa',
            description: 'Agence de Voyages Dakar - Billets d\'Avion & Visa Allemagne',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Favicon & Web App Icons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Theme Color */}
      <meta name="theme-color" content="#A11C1C" />

      {/* Microsoft Tags */}
      <meta name="msapplication-TileColor" content="#A11C1C" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Additional Meta Tags for Social */}
      <meta property="og:type" content="business.business" />
      <meta property="og:locale" content="fr_SN" />
      <meta name="format-detection" content="telephone=+221769486060" />
      <meta name="format-detection" content="email=contact@eazy-visa.com" />

      {/* Verification Tags (À compléter) */}
      {/* <meta name="google-site-verification" content="..." /> */}
      {/* <meta name="msvalidate.01" content="..." /> */}

      {/* Performance & Security */}
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </>
  );
}

export default SEOHead;

