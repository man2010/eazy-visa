/**
 * ROBOTS.TS - Robots.txt dynamique pour Next.js
 * Génère automatiquement le fichier robots.txt
 */

import { MetadataRoute } from 'next';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://www.app.eazy-visa.com'
  : 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/*.json$', '/*.xml$', '/checkout/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: 'www.app.eazy-visa.com',
  };
}

