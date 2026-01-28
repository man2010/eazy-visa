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

module.exports = withPWA({
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'canvas', 'jsdom'],  // Remplacé serverExternalPackages par la bonne option
  },

  // ✅ CRITIQUE : Inline les variables pour le serveur au build (disponibles au runtime)
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
  // Ajoute d'autres options si besoin
});