/**
 * HERO CAROUSEL - SEO & PERFORMANCE OPTIMIZED (v2 – LCP + mobile friendly)
 * Lazy loading sélectif, preload critique, formats modernes, tailles responsives
 */

'use client';

import React, { useRef } from 'react'; 
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion'; // ← corrigé l'import (c'était motion/react → probablement une typo)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HeroCarouselProps {
  images: string[];           // idéalement : tableau d'objets {src: string, srcSet?: string, sizes?: string}
  height?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaTargetId?: string;
  ariaLabel?: string;
}

export default function HeroCarousel({
  images,
  height = 'h-[500px]',
  title,
  subtitle,
  ctaText = 'En savoir plus',
  ctaTargetId,
  ariaLabel = 'Carrousel d\'images',
}: HeroCarouselProps) {
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    pauseOnHover: true,
    arrows: false,
    // Option utile si tu veux tester plus tard : lazyLoad: 'ondemand' (mais on évite pour LCP sur slide 1)
  };

  function handleCta() {
    if (ctaTargetId) {
      const el = document.getElementById(ctaTargetId);
      if (el) return el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.scrollBy({ top: window.innerHeight - 120, left: 0, behavior: 'smooth' });
  }

  return (
    <section 
      className="relative overflow-hidden rounded-2xl"
      role="region"
      aria-label={ariaLabel}
    >
      {/* Preload critique : ONLY la première image → boost énorme LCP */}
      {images[0] && (
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href={images[0]}
          // Si tu as WebP : image/webp ; sinon supprime cette ligne
          // type="image/webp" 
        />
      )}

      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => {
          // Pour le slide 1 → eager + fetchpriority (LCP)
          // Pour les autres → lazy (évite de charger 3-4 Mo d’images inutiles d’entrée)
          const isFirst = index === 0;
          const loading = isFirst ? 'eager' : 'lazy';
          const fetchPriority = isFirst ? 'high' : undefined;

          return (
            <div key={index} className="relative">
              <div className={`${height} relative`}>
                <img
                  src={image}
                  alt={`Slide ${index + 1} – ${title || 'Image hero'}`}
                  className="w-full h-full object-cover"
                  loading={loading}
                  fetchPriority={fetchPriority}
                  decoding="async"           // ← petit gain gratuit
                  // Si tu peux : ajouter srcset + sizes (exemple ci-dessous)
                  // srcSet={`${image}?w=480 480w, ${image}?w=768 768w, ${image}?w=1200 1200w`}
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          );
        })}
      </Slider>

      {/* Overlay texte – inchangé */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-4 sm:px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full max-w-4xl text-center pointer-events-auto px-2 sm:px-6"
        >
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] leading-tight">
            {title ?? "Osez l'aventure. Le monde vous attend."}
          </h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-3 text-white/90 text-sm sm:text-base md:text-lg max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={handleCta}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#A11C1C] to-[#A11C1C] text-white rounded-lg font-semibold shadow-2xl hover:scale-[1.03] transform transition text-sm sm:text-base"
            >
              {ctaText}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Flèches – inchangées */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800 group-hover:text-[#A11C1C] transition-colors" />
      </button>
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-800 group-hover:text-red-600 transition-colors" />
      </button>
    </section>
  );
}