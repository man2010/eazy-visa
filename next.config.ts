import type { NextConfig } from "next";
import next from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['mongoose', 'canvas', 'jsdom'],
  turbopack: {},

  // ✅ CRITIQUE : Rendre les variables disponibles côté serveur au runtime
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
  
  // Autres configs...
  reactStrictMode: true,

  // Ajoutez d'autres options Next.js si nécessaire
};
module.exports = nextConfig;

export default withPWA({
  dest: "public",  // Dossier où le service worker sera généré (public/sw.js)
  register: true,  // Enregistre automatiquement le service worker
  skipWaiting: true,  // Active le service worker immédiatement
  disable: process.env.NODE_ENV === "development",  // Désactive en dev pour éviter les problèmes de cache
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
})(nextConfig as any);