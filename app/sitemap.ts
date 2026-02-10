/**
 * SITEMAP DYNAMIQUE - Généré automatiquement par Next.js
 * Important pour les sitemaps volumineuses avec données dynamiques
 */

import { MetadataRoute } from 'next';

const baseUrl = 'https://eazy-visa.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // HOME
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    
    // PAGES PRINCIPALES
    {
      url: `${baseUrl}/acceuil`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },

    {
      url: `${baseUrl}/billets`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/voyager-en-allemagne`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations/dakar-paris`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations/dakar-rome`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/destinations/dakar-new-york`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations/dakar-casablanca`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations/dakar-montreal`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations/dakar-madrid`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations/dakar-bruxelles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations/dakar-dubai`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/destinations/dakar-istanbul`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },

    // PAGES LÉGALES
    {
      url: `${baseUrl}/a-propos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cgu`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.30,
    },
    {
      url: `${baseUrl}/partenariat`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/carrieres`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/investissement`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];
}

