// next.config.js (à la racine du projet)
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
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

  // Optionnel : vide pour éviter le warning Turbopack si tu gardes Turbopack plus tard
   turbopack: {},
};

module.exports = withPWA(nextConfig);