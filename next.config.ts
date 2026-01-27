import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['mongoose', 'canvas', 'jsdom'],
  turbopack: {},

  // Ajoutez d'autres options Next.js si nécessaire
};

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