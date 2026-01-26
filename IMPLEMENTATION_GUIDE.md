# 🛠️ GUIDE D'IMPLÉMENTATION SEO - EAZY-VISA

## Utiliser les Outils SEO Créés

### 1. Configuration Centralisée

#### Fichier: `/lib/seo/generateSeoConfig.ts`

Ce fichier centralise TOUTE la configuration SEO. À utiliser dans chaque page:

```typescript
import { SEO_CONFIG, generatePageMetadata, generateLocalBusinessSchema } from '@/lib/seo/generateSeoConfig';

export const metadata: Metadata = generatePageMetadata({
  title: 'Votre Titre SEO',
  description: 'Votre description meta',
  keywords: ['keyword1', 'keyword2'],
  image: '/og-image.jpg',
  url: `${SEO_CONFIG.baseUrl}/votre-page`,
});
```

---

### 2. Breadcrumbs & Navigation

#### Fichier: `/components/BreadcrumbSchema.tsx`

Ajoute les breadcrumbs visuels + Schema.org JSON-LD automatiquement:

```typescript
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

export default function Page() {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Billets d\'Avion', url: '/billets' },
        ]}
      />
      {/* Votre contenu */}
    </>
  );
}
```

---

### 3. Rich Snippets Avancés

#### Fichier: `/lib/seo/richSnippets.ts`

Pour les avis, offres, événements:

```typescript
import { 
  generateReviewSchema, 
  generateOfferSchema,
  generateEventSchema 
} from '@/lib/seo/richSnippets';

// Avis clients
const reviewSchema = generateReviewSchema({
  authorName: 'Jean Dupont',
  reviewRating: 5,
  reviewBody: 'Excellent service!',
  datePublished: '2026-01-24',
  productName: 'Service Visa Allemagne',
});

// Offres/Tarifs
const offerSchema = generateOfferSchema({
  productName: 'Visa Allemagne Express 48h',
  price: '85000',
  priceCurrency: 'XOF',
  availability: 'InStock',
  description: 'Visa Allemagne avec traitement express',
});

// Événements
const eventSchema = generateEventSchema({
  name: 'Journée Portes Ouvertes Visa',
  description: 'Découvrez notre service',
  startDate: '2026-02-15T09:00',
  endDate: '2026-02-15T18:00',
  location: 'Keur Gorgui, Dakar',
  image: '/event-visa.jpg',
});
```

---

### 4. Optimiser une Nouvelle Page

#### Template pour Nouvelle Page

```typescript
/**
 * PAGE TITRE
 * SEO-Optimisée pour Keyword: "votre keyword"
 */

import { Metadata } from 'next';
import { generatePageMetadata, generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo/generateSeoConfig';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://www.eazy-visa.com' 
  : 'http://localhost:3000';

// ✅ METADATA COMPLÈTE
export const metadata: Metadata = {
  title: 'Votre Titre (50-60 car) | Eazy-Visa',
  description: 'Votre description (150-160 caractères). Inclure CTA et téléphone.',
  
  keywords: [
    'keyword1',
    'keyword2', 
    'keyword3',
  ],

  alternates: {
    canonical: `${baseUrl}/votre-page`,
  },

  openGraph: {
    type: 'website',
    url: `${baseUrl}/votre-page`,
    title: 'Votre Titre OG',
    description: 'Description OG',
    images: [{
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    }],
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ✅ SCHEMAS
const faqSchema = generateFAQSchema([
  { question: 'Q1?', answer: 'A1' },
  { question: 'Q2?', answer: 'A2' },
]);

export default function Page() {
  return (
    <>
      {/* Schemas JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <BreadcrumbSchema 
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Votre Page', url: '/votre-page' },
        ]}
      />

      <main>
        <h1>Votre H1 Principal</h1>
        {/* Contenu */}
      </main>
    </>
  );
}
```

---

## Best Practices SEO

### Titres & Descriptions

✅ **BON:**
```
Title: "Billets d'Avion Pas Cher Dakar | Réservation Express | Eazy-Visa"
Description: "Réservez vos billets au meilleur prix. Service 24/7. Paiement Wave/OM. +221 76 948 60 60"
```

❌ **MAUVAIS:**
```
Title: "Page d'accueil"
Description: "Bienvenue sur notre site"
```

### Headings Hierarchy

✅ **BON:**
```
<h1>Billets d'Avion Pas Cher Dakar</h1>
  <h2>Pourquoi Choisir Eazy-Visa?</h2>
    <h3>Meilleur Prix</h3>
    <h3>Service 24/7</h3>
  <h2>Destinations Populaires</h2>
    <h3>Dakar - Paris</h3>
    <h3>Dakar - Berlin</h3>
```

❌ **MAUVAIS:**
```
<h1>Bienvenue</h1>
  <h3>Services</h3> <!-- Saute h2! -->
  <h1>Billets</h1>   <!-- Deux h1! -->
```

### Images SEO

```html
<!-- ✅ BON -->
<img 
  src="/billets-avion-dakar.jpg" 
  alt="Billets d'avion pas cher Dakar | Eazy-Visa"
  title="Réservation billets avion"
/>

<!-- ❌ MAUVAIS -->
<img src="/img1.jpg" alt="image" />
```

### URLs

✅ **BON:**
- `/billets` ← descriptif
- `/visa-allemagne` ← avec hyphens
- `/services/visa` ← structure logique

❌ **MAUVAIS:**
- `/page1` ← pas descriptif
- `/visa_allemagne` ← underscore
- `/index.php?id=5` ← URL dynamique

---

## Monitoring & Tracking

### Google Search Console

1. Aller sur https://search.google.com/search-console
2. Ajouter propriété: `https://www.eazy-visa.com`
3. Vérifier propriété
4. Soumettre sitemap: `/sitemap.xml`

**À Suivre Régulièrement:**
- Impressions (how often you appear)
- CTR (Click-through rate)
- Position moyenne
- Top pages
- Top queries
- Mobile usability

### Google Analytics 4

1. Créer GA4 property
2. Ajouter tag de tracking
3. Créer conversions personnalisées

**Événements à Tracker:**
- Contact form submissions
- Phone calls
- Email opens
- Booking completions

### Rank Tracking

**Gratuit:**
- Google Search Console (données Google)
- Moz Free Tools

**Payant (Recommandé):**
- Semrush (€120/mois)
- Ahrefs (€99/mois)
- SE Ranking (€55/mois)

---

## Calendrier de Publication

### Blog Content Calendar

```
Week 1: "Guide Complet Visa Allemagne"
  - Tuesday: Publish
  - Wednesday: Social share (FB, Insta, Twitter)
  - Thursday: Email newsletter
  - Friday: Guest post outreach

Week 2: "10 Astuces Billets Pas Cher"
  - Same pattern

Week 3: "Budget Voyage Europe"
  - Same pattern

Week 4: "Aéroports Dakar: Guide Complet"
  - Same pattern
```

---

## Checklist Mensuelle

- [ ] GSC: Review search analytics
- [ ] GA4: Check traffic & conversions
- [ ] Publish 4 articles blog (1/week)
- [ ] Acquire 10+ backlinks
- [ ] Collect 10+ client reviews
- [ ] Update 2 existing pages with fresh content
- [ ] Fix any 404 errors
- [ ] Check Core Web Vitals
- [ ] Analyze competitor strategies
- [ ] Submit update to GSC

---

## Questions Fréquentes

### Q: Combien de temps avant de voir des résultats?
**A:** 3-6 mois pour des résultats significatifs. Mois 1-2 = base, Mois 3+ = visibilité croissante.

### Q: Faut-il payer pour Google ranking?
**A:** Non. Google n'accepte pas de paiement pour les rankings. Focus sur contenu de qualité.

### Q: Qu'est-ce que c'est le "crawl budget"?
**A:** Nombre de pages que Google crawle. Avec robots.txt/sitemap, on optimise ce budget.

### Q: Alt text, c'est important?
**A:** Très! Alt text aide les moteurs de recherche à comprendre les images. +accessibilité.

### Q: Peut-on avoir des liens internes vers soi-même?
**A:** Oui! C'est même recommandé (internal linking). Aide au ranking et navigation.

### Q: Social media = ranking?
**A:** Non direct. Mais social signals = plus de trafic = plus de backlinks potentiels.

---

## Resources Externes

### Apprendre le SEO
- https://moz.com/beginners-guide-to-seo
- https://backlinko.com/seo-blog
- https://www.searchenginejournal.com/

### Outils Gratuits
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com/
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- PageSpeed Insights: https://pagespeed.web.dev/

### Schema.org Documentation
- https://schema.org/
- https://developers.google.com/search/docs/appearance/structured-data

---

**Dernière mise à jour:** 24 Janvier 2026
**Questions?** Contactez votre SEO specialist

