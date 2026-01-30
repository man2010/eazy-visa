// next.config.js (à la racine du projet)
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // ✅ Configuration améliorée pour compatibilité multi-navigateurs
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: ['!robots.txt', '!sitemap.xml'],
  
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 heures
        },
        networkTimeoutSeconds: 10,
      },
    },
    // Cache pour les images
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
        },
      },
    },
    // Cache pour les polices
    {
      urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'font-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 an
        },
      },
    },
    // Cache pour les APIs
    {
      urlPattern: /^https:\/\/api\..*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
  
  // ✅ Configuration pour iOS
  fallbacks: {
    document: '/offline',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Important pour Amplify/SSR Lambdas

  // ✅ Packages externes (mongoose, canvas, jsdom) – clé corrigée pour Next 16+
  serverExternalPackages: ['mongoose', 'canvas', 'jsdom'],

  // Variables d'environnement inlinées pour le serveur (SSR/Lambda)
  env: {
    AMADEUS_API_URL: process.env.AMADEUS_API_URL,
    AMADEUS_CLIENT_ID: process.env.AMADEUS_CLIENT_ID,
    AMADEUS_CLIENT_SECRET: process.env.AMADEUS_CLIENT_SECRET,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    MONGODB_URI: process.env.MONGODB_URI,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },

  reactStrictMode: true,

  // ✅ Headers pour PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ];
  },

  // Optionnel : vide pour éviter le warning Turbopack si tu gardes Turbopack plus tard
  turbopack: {},
};

module.exports = withPWA(nextConfig);