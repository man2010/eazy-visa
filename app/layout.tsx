/* app/layout.tsx - ULTRA SEO OPTIMISÉ + PWA MULTI-NAVIGATEURS COMPLET */
import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

const siteUrl = 'https://eazy-visa.com'; // URL de production pour les métadonnées

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
    title: 'EazyVisa',
  },

  // ✅ Configuration PWA dans les metadata
  manifest: '/manifest.json',
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
    <html lang="fr-SN" className="light" suppressHydrationWarning={true}>
      <head>
        {/* Preconnect to optimize resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for external services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* ✅ PWA - Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ PWA - Theme colors pour tous les navigateurs */}
        <meta name="theme-color" content="#A11C1C" />
        <meta name="theme-color" content="#A11C1C" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#8B0000" media="(prefers-color-scheme: dark)" />
        
        {/* ✅ PWA - Apple iOS Configuration */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="EazyVisa" />
        
        {/* ✅ PWA - Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/apple-icon-180.png" />
        
        {/* ✅ PWA - Favicons */}
        <link rel="icon" type="image/png" sizes="196x196" href="/favicon-196.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* ✅ PWA - Apple Splash Screens - TOUTES LES TAILLES GÉNÉRÉES */}
        {/* iPad Pro 12.9" */}
        <link rel="apple-touch-startup-image" href="/apple-splash-2048-2732.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2732-2048.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPad Pro 11" */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1668-2388.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2388-1668.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPad 9.7" */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1536-2048.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2048-1536.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPad Air 10.9" */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1640-2360.jpg" media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2360-1640.jpg" media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPad Pro 10.5" */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1668-2224.jpg" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2224-1668.jpg" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPad 10.2" */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1620-2160.jpg" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2160-1620.jpg" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPad mini 8.3" */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1488-2266.jpg" media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2266-1488.jpg" media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPhone 16 Pro Max */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1320-2868.jpg" media="(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2868-1320.jpg" media="(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 16 Pro */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1206-2622.jpg" media="(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2622-1206.jpg" media="(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 16 Plus / 15 Plus / 14 Plus */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1260-2736.jpg" media="(device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2736-1260.jpg" media="(device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 16 / 15 Pro Max / 14 Pro Max */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1290-2796.jpg" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2796-1290.jpg" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 15 Pro / 15 / 14 Pro */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1179-2556.jpg" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2556-1179.jpg" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 14 / 13 / 12 */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1170-2532.jpg" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2532-1170.jpg" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 13 Pro Max / 12 Pro Max */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1284-2778.jpg" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2778-1284.jpg" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 11 Pro Max / XS Max */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1242-2688.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2688-1242.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 11 / XR */}
        <link rel="apple-touch-startup-image" href="/apple-splash-828-1792.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-1792-828.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPhone 11 Pro / X / XS */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1125-2436.jpg" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2436-1125.jpg" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 8 Plus / 7 Plus / 6s Plus / 6 Plus */}
        <link rel="apple-touch-startup-image" href="/apple-splash-1242-2208.jpg" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-2208-1242.jpg" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
        
        {/* iPhone 8 / 7 / 6s / 6 */}
        <link rel="apple-touch-startup-image" href="/apple-splash-750-1334.jpg" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-1334-750.jpg" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* iPhone SE / 5s / 5 */}
        <link rel="apple-touch-startup-image" href="/apple-splash-640-1136.jpg" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/apple-splash-1136-640.jpg" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        
        {/* ✅ PWA - Microsoft Windows/Edge */}
        <meta name="msapplication-TileColor" content="#A11C1C" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* ✅ PWA - Format detection */}
        <meta name="format-detection" content="telephone=+221769486060" />
        
        {/* ✅ Mobile viewport optimisé */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        
        {/* ✅ Mobile web app meta */}
        <meta name="mobile-web-app-capable" content="yes" />
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
        
        {/* ✅ PWA Install Prompt Component */}
        <PWAInstallPrompt />
        
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