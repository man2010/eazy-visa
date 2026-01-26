/* app/layout.tsx - ULTRA SEO OPTIMISÉ */
import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const isProduction = process.env.NODE_ENV === 'production';
const siteUrl = isProduction ? 'https://www.eazy-visa.com' : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  
  title: {
    default: 'Eazy-Visa | Agence de Voyages Dakar - Billets Avion Pas Cher, Visa Allemagne Express 48h',
    template: '%s | Eazy-Visa Sénégal - Agence Voyage Dakar'
  },

  description: 'Agence voyage #1 Dakar - Réservez billets avion (meilleur prix), visa Allemagne (48h express), hôtels. Service 24/7. Paiement Wave/OM. Devis gratuit: +221 76 948 60 60. 10,000+ clients satisfaits.',

  keywords: [
    'agence voyage dakar',
    'billet avion pas cher dakar', 
    'visa allemagne senegal',
    'visa allemagne dakar',
    'reservation vol dakar',
    'voyage allemagne',
    'tour operateur dakar',
    'agence voyage keur gorgui',
    'billets d\'avion dakar',
    'visa schengen dakar'
  ],

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

  alternates: {
    canonical: siteUrl,
    languages: {
      'fr-SN': siteUrl,
      'fr-FR': siteUrl,
      'x-default': siteUrl,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: siteUrl,
    siteName: 'Eazy-Visa - Agence de Voyages Dakar',
    title: 'Eazy-Visa | Billets Avion Pas Cher & Visa Allemagne | Dakar',
    description: 'Meilleur prix garanti. Visa Allemagne express 48h. Service 24/7. 10,000+ clients satisfaits. Réservez maintenant!',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Eazy-Visa - Agence de Voyages Dakar Sénégal',
        type: 'image/jpeg',
      },
      {
        url: `${siteUrl}/og-image-home.jpg`,
        width: 1200,
        height: 630,
        alt: 'Agence de Voyages Eazy-Visa',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@EazyVisa',
    creator: '@EazyVisa',
    title: 'Eazy-Visa | Agence Voyages Dakar',
    description: 'Billets avion pas cher. Visa Allemagne express. Service 24/7. +221 76 948 60 60',
    images: [`${siteUrl}/og-image.jpg`],
  },

  other: {
    'geo.region': 'SN-DK',
    'geo.placename': 'Dakar, Sénégal',
    'geo.position': '14.7523;-17.3635',
    'ICBM': '14.7523,-17.3635',
    'og:type': 'business.business',
    'og:business:contact_data:street_address': 'Cité Keur Gorgui, Immeuble R98, Lot 12',
    'og:business:contact_data:locality': 'Dakar',
    'og:business:contact_data:country_name': 'Senegal',
    'og:business:contact_data:postal_code': '14000',
    'og:business:contact_data:phone_number': '+221769486060',
  },

  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE',
  },

  category: 'travel',
  applicationName: 'Eazy-Visa',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Eazy-Visa',
  },
};

const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${siteUrl}/#organization`,
  name: "Eazy-Visa",
  alternateName: "Eazy Visa",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/Logo.png`,
    width: 250,
    height: 60,
  },
  image: `${siteUrl}/og-image.jpg`,
  description: "Agence voyage #1 Dakar - Billets avion pas cher, visa Allemagne express, réservation hôtels",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cité Keur Gorgui, Immeuble R98, Lot 12",
    addressLocality: "Dakar",
    postalCode: "14000",
    addressCountry: "SN",
  },
  telephone: "+221769486060",
  email: "contact@eazy-visa.com",
  founder: {
    "@type": "Person",
    name: "Bertrand Gopele",
  },
  foundingDate: "2019",
  areaServed: ["SN", "FR", "DE"],
  priceRange: "$",
  sameAs: [
    "https://www.facebook.com/eazy.visa",
    "https://www.twitter.com/EazyVisa",
    "https://www.instagram.com/eazy.visa",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "350",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "closed",
    },
  ],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr-SN" suppressHydrationWarning={true}>
      <head>
        {/* Preconnect to optimize resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for external services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Additional meta tags for optimization */}
        <meta name="format-detection" content="telephone=+221769486060" />
        <meta name="theme-color" content="#A11C1C" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      
      <body className="font-sans antialiased bg-background text-foreground">
        {/* Skip Link for Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#A11C1C] focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Aller au contenu principal
        </a>

        <Navbar />

        <main id="main-content" role="main">
          {children}
        </main>

        <Footer />
        
        <Toaster position="top-center" richColors />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(generateOrganizationSchema()) 
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: siteUrl,
              name: "Eazy-Visa",
              description: "Agence voyage Dakar - Billets avion, visa Allemagne",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            })
          }}
        />
      </body>
    </html>
  );
}