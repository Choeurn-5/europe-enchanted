// src/app/components/bungalows/BungalowsHero.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BedDouble } from 'lucide-react';

export interface HeroSlide {
  url: string;
  roomTitle?: string;
}

interface BungalowsHeroProps {
  slides: HeroSlide[];
}

export default function BungalowsHero({ slides }: BungalowsHeroProps) {
  // Fallback if no images provided
  const activeSlides = slides && slides.length > 0
    ? slides
    : [{ url: '/images/common/resort-4.jpg', roomTitle: 'Europe Enchanted Resort' }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  // Autoplay slideshow every 5.5s
  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [activeSlides.length, isPaused, nextSlide]);

  return (
    <section
      className="relative w-full min-h-[560px] md:min-h-[640px] flex items-center justify-center overflow-hidden pt-28 pb-16 px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Slideshow with smooth crossfade & gentle Ken Burns zoom */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={getImageUrl(activeSlides[currentIndex].url)}
              alt={activeSlides[currentIndex].roomTitle || 'Europe Enchanted Bungalows'}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Light subtle overlay - room imagery shines through clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-4 border border-white/30 bg-black/25 rounded-full px-4 py-1.5 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3C4] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A3C4]" />
          </span>
          <span className="text-white/90 text-xs font-semibold tracking-[0.3em] uppercase">
            Accommodations • Koh Toch Beach
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-wide leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        >
          Our Bungalows
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white/90 text-base sm:text-lg md:text-xl mt-5 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          Each bungalow is thoughtfully designed for comfort, privacy, and an
          unmistakable island calm — your sanctuary on Koh Rong awaits.
        </motion.p>

        {/* Current Room Caption Tag */}
        {activeSlides[currentIndex]?.roomTitle && (
          <motion.div
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium text-white/90 shadow-sm transition-colors"
          >
            <BedDouble className="w-3.5 h-3.5 text-[#00A3C4]" />
            <span>Featured: {activeSlides[currentIndex].roomTitle}</span>
          </motion.div>
        )}
      </div>

      {/* Manual Navigation Arrows (Desktop & Tablet) */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 backdrop-blur-md text-white items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 backdrop-blur-md text-white items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Indicators / Dots */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full shadow-md">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                idx === currentIndex
                  ? 'w-7 bg-[#00A3C4] shadow-sm'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
