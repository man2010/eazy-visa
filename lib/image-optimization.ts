/**
 * IMAGE OPTIMIZATION UTILITIES
 * Ultra-performance image loading with Next.js Image component
 */

export const HERO_IMAGES = {
  flights: {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Voyage en avion - Eazy-Visa',
    width: 1920,
    height: 1080,
  },
  hotels: {
    src: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Hôtels luxe réservation - Eazy-Visa',
    width: 1920,
    height: 1080,
  },
  germany: {
    src: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Allemagne tourisme visa - Eazy-Visa',
    width: 1920,
    height: 1080,
  },
  business: {
    src: 'https://images.unsplash.com/photo-1765810655669-dced65717cd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Voyage affaires - Eazy-Visa',
    width: 1920,
    height: 1080,
  },
  travelers: {
    src: 'https://images.unsplash.com/photo-1619717823034-0f5878db088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Voyageurs heureux - Eazy-Visa',
    width: 1920,
    height: 1080,
  },
};

// Image loading strategy: Aggressive lazy loading with blur placeholder
export const IMAGE_LOADER_CONFIG = {
  blurDataURL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4=',
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1920px',
  quality: 75,
};

// SEO-optimized image dimensions
export const IMAGE_DIMENSIONS = {
  og: { width: 1200, height: 630 },
  hero: { width: 1920, height: 1080 },
  card: { width: 400, height: 300 },
  thumbnail: { width: 200, height: 150 },
  avatar: { width: 100, height: 100 },
};

// Preload critical images for better Core Web Vitals
export const PRELOAD_IMAGES = [
  '/Logo.png',
  '/og-image.jpg',
  '/og-image-home.jpg',
];

