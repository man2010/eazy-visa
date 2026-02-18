/**
 * PERFORMANCE OPTIMIZATION - CORE WEB VITALS
 * Strategies for LCP, FID, CLS optimization
 */

// Preload resources that are critical for first render
export const PRELOAD_RESOURCES = [
  {
    rel: 'preload',
    href: '/Logo.png',
    as: 'image',
    type: 'image/png',
  },
  {
    rel: 'preload',
    href: '/og-image.jpg',
    as: 'image',
    type: 'image/jpeg',
  },
];

// DNS prefetch for external services
export const DNS_PREFETCH = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://fonts.googleapis.com',
];

// Font optimization strategy
export const FONT_STRATEGY = {
  display: 'swap', // Font display strategy for better LCP
  preload: true,
  weights: [400, 500, 600, 700],
};

// Image optimization for Core Web Vitals
export const IMAGE_OPTIMIZATION = {
  // Lazy loading strategy
  loading: 'lazy' as const,
  
  // Image quality for different devices
  quality: {
    mobile: 60,
    tablet: 75,
    desktop: 85,
  },
  
  // Size optimization
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1920px',
  
  // Format priority (WebP with fallback)
  formats: ['image/webp', 'image/jpeg'],
};

// Animation performance optimization
export const ANIMATION_OPTIMIZATION = {
  // Use CSS transforms for better performance
  useTransform: true,
  
  // Reduce motion for accessibility
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  
  // GPU acceleration
  backfaceVisibility: 'hidden',
  perspective: '1000px',
};

// Script optimization strategy
export const SCRIPT_STRATEGY = {
  // Defer non-critical scripts
  defer: true,
  
  // Async for analytics
  async: true,
  
  // Priority hints
  priority: {
    critical: 'high',
    important: 'medium',
    analytical: 'low',
  },
};

// Critical CSS paths
export const CRITICAL_CSS = [
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'color',
  'background',
  'display',
  'position',
  'width',
  'height',
  'padding',
  'margin',
];

// CSS-in-JS optimization
export const CSS_OPTIMIZATION = {
  // Minimize CSS-in-JS payload
  minify: true,
  // Avoid runtime CSS generation
  staticExtraction: true,
  // Use CSS custom properties for theming
  useCSSVariables: true, // ✅ CORRECTION : Pas d'espace dans le nom de propriété
};

// Code splitting strategy
export const CODE_SPLITTING = {
  // Routes that should be code-split
  routes: [
    
    '/acceuil',
    '/billets',
    '/billeterie',
    '/billet-avion-dakar',
    '/agence-voyage-dakar-senegal',
    '/hotels',
    '/voyager-en-allemagne',
    '/services',
    '/a-propos',
    'destinations',
    'destinations/dakar-paris',
    'destinations/dakar-rome',
    'destinations/dakar-new-york',
    'destinations/dakar-casablanca',
    'destinations/dakar-istanbul',
    'destinations/dakar-dubai',
    'destinations/dakar-bruxelles',
    'destinations/dakar-madrid',
    'destinations/dakar-montreal',
  ],
  
  // Components that should be lazy-loaded
  components: [
    'BookingModal',
    'FlightResultsModal',
    'SearchFilters',
  ],
};

// Performance monitoring thresholds
export const PERFORMANCE_THRESHOLDS = {
  // Largest Contentful Paint (LCP)
  lcp: 2500, // ms (good: < 2.5s)
  
  // First Input Delay (FID)
  fid: 100, // ms (good: < 100ms)
  
  // Cumulative Layout Shift (CLS)
  cls: 0.1, // (good: < 0.1)
  
  // First Contentful Paint (FCP)
  fcp: 1800, // ms (good: < 1.8s)
  
  // Time to Interactive (TTI)
  tti: 3500, // ms (good: < 3.5s)
};

// Caching strategy
export const CACHE_STRATEGY = {
  // Static assets cache duration
  static: '31536000', // 1 year
  
  // API responses cache duration
  api: '300', // 5 minutes
  
  // HTML cache duration
  html: '3600', // 1 hour
  
  // Images cache duration
  images: '2592000', // 30 days
};

// Network optimization
export const NETWORK_OPTIMIZATION = {
  // Preconnect to important origins
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  
  // DNS prefetch for external resources
  dnsPrefetch: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ],
  
  // Resource hints
  resourceHints: {
    prefetch: ['fonts', 'stylesheets'],
    prerender: ['/billets', '/hotels'],
  },
};