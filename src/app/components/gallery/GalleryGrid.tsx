'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'bungalows' | 'beach' | 'dining' | 'activities';
  categoryLabel: string;
  span?: 'tall' | 'wide' | 'normal';
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'g1',
    src: '/images/gallery/IMG_1390.jpg',
    alt: 'Beachfront wooden bungalow at Europe Enchanted',
    title: 'Beachfront Wooden Sanctuary',
    category: 'bungalows',
    categoryLabel: 'Bungalows',
    span: 'tall',
  },
  {
    id: 'g2',
    src: '/images/gallery/image8.jpg',
    alt: '',
    title: '',
    category: 'beach',
    categoryLabel: 'Beach & Ocean',
    span: 'normal',
  },
  {
    id: 'g2',
    src: '/images/gallery/image9.jpg',
    alt: '',
    title: '',
    category: 'beach',
    categoryLabel: 'Beach & Ocean',
    span: 'normal',
  },
    {
    id: 'g2',
    src: '/images/gallery/image10.jpg',
    alt: '',
    title: '',
    category: 'beach',
    categoryLabel: 'Beach & Ocean',
    span: 'normal',
  },
    {
    id: 'g2',
    src: '/images/gallery/image11.jpg',
    alt: '',
    title: '',
    category: 'beach',
    categoryLabel: 'Beach & Ocean',
    span: 'normal',
  },
    {
    id: 'g2',
    src: '/images/gallery/image12.jpg',
    alt: '',
    title: '',
    category: 'beach',
    categoryLabel: 'Beach & Ocean',
    span: 'normal',
  },
    {
    id: 'g2',
    src: '/images/gallery/image16.jpg',
    alt: '',
    title: '',
    category: 'beach',
    categoryLabel: 'Beach & Ocean',
    span: 'normal',
  },
    {
    id: 'g2',
    src: '/images/gallery/image15.jpg',
    alt: '',
    title: '',
    category: 'beach',
    categoryLabel: 'Beach & Ocean',
    span: 'normal',
  },
    {
    id: 'g2',
    src: '/images/gallery/image14.jpg',
    alt: '',
    title: '',
    category: 'beach',
    categoryLabel: 'Beach & Ocean',
    span: 'normal',
  },
  {
    id: 'g3',
    src: '/images/gallery/IMG_1396.jpg',
    alt: 'Bungalow veranda with sea views',
    title: 'Private Balcony with Sea Breeze',
    category: 'bungalows',
    categoryLabel: 'Bungalows',
    span: 'normal',
  },
  {
    id: 'g4',
    src: '/images/gallery/image17.jpg',
    alt: 'Restauant',
    title: 'Restauant view with the ocean',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image18.jpg',
    alt: '',
    title: 'ASIAN FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image19.jpg',
    alt: '',
    title: 'EUROPEAN FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image20.jpg',
    alt: '',
    title: 'ASIAN FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },  {
    id: 'g4',
    src: '/images/gallery/image21.jpg',
    alt: '',
    title: 'KHMER FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image22.jpg',
    alt: '',
    title: 'FRANCE FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
  {
    id: 'g4',
    src: '/images/gallery/image23.jpg',
    alt: '',
    title: 'MEXICO FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image24.jpg',
    alt: '',
    title: 'KHMER FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image25.jpg',
    alt: '',
    title: 'SEA FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image26.jpg',
    alt: '',
    title: 'MORNING FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image27.jpg',
    alt: '',
    title: 'AFTERNOON FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
    {
    id: 'g4',
    src: '/images/gallery/image28.jpg',
    alt: '',
    title: 'EVEVING FOOD',
    category: 'dining',
    categoryLabel: 'Restauant',
    span: 'normal',
  },
  {
    id: 'g5',
    src: '/images/gallery/image5.jpg',
    alt: 'Island tour boat on turquoise waters',
    title: 'Island Boat Cruise',
    category: 'activities',
    categoryLabel: 'Island Life',
    span: 'normal',
  },

  {
    id: 'g9',
    src: '/images/gallery/image7.jpg',
    alt: 'Afternoon with the sea view',
    title: 'Afternoon Beach',
    category: 'activities',
    categoryLabel: 'Island Life',
    span: 'normal',
  },

  {
    id: 'g9',
    src: '/images/gallery/image29.jpg',
    alt: 'Evening beach fire under the stars',
    title: 'Nightly Beach',
    category: 'activities',
    categoryLabel: 'Island Life',
    span: 'normal',
  },
];

const categories = [
  { key: 'all', label: 'All Photos' },
  { key: 'bungalows', label: 'Bungalows' },
  { key: 'beach', label: 'Beach & Ocean' },
  { key: 'dining', label: 'Restauant' },
  { key: 'activities', label: 'Island Life' },
];

interface GalleryGridProps {
  dynamicItems?: GalleryItem[];
}

export default function GalleryGrid({ dynamicItems = [] }: GalleryGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine dynamic and static items
  const allItems = dynamicItems.length > 0 ? [...dynamicItems, ...defaultGalleryItems] : defaultGalleryItems;

  const filteredItems =
    activeCategory === 'all'
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  const showPrev = useCallback(() => {
    setLightboxIndex((curr) =>
      curr === null ? 0 : (curr - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((curr) =>
      curr === null ? 0 : (curr + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, showNext, showPrev]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setLightboxIndex(null);
                }}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-md shadow-[#0C3B73]/20'
                    : 'bg-white text-[#0C3B73]/70 hover:text-[#0C3B73] hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0C3B73] to-[#00A3C4] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const isTall = item.span === 'tall';
              const isWide = item.span === 'wide';

              return (
                <motion.div
                  layout
                  key={item.id + index}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative overflow-hidden rounded-3xl bg-[#0C3B73] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/10 ${
                    isTall
                      ? 'sm:row-span-2 h-[380px] sm:h-[580px]'
                      : isWide
                      ? 'sm:col-span-2 h-[280px] sm:h-[340px]'
                      : 'h-[280px]'
                  }`}
                >
                  <Image
                    src={getImageUrl(item.src)}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05182e]/90 via-[#05182e]/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider border border-white/20 shadow-sm">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Center Expand Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Expand className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-serif font-bold text-lg sm:text-xl tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs mt-1 line-clamp-1">
                      {item.alt}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen Gallery Lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030e1c]/95 p-4 sm:p-8 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getImageUrl(filteredItems[lightboxIndex].src)}
                  alt={filteredItems[lightboxIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Caption Bar */}
              <div className="mt-4 text-center">
                <span className="text-xs font-semibold text-[#55D8E7] uppercase tracking-wider block mb-1">
                  {filteredItems[lightboxIndex].categoryLabel}
                </span>
                <h4 className="text-white font-serif font-bold text-lg sm:text-xl">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-white/60 text-xs mt-0.5">
                  {filteredItems[lightboxIndex].alt}
                </p>
              </div>
            </motion.div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium tracking-widest text-white/50">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
