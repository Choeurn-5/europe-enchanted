// src/app/components/bungalows/BungalowRoomGallery.tsx
'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Images,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Bed,
  Users,
  Compass,
} from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

interface GalleryPhoto {
  url: string;
  roomTitle: string;
  roomSlug: string;
  bookingUrl: string | null;
  bedType: string | null;
  maxGuests: number | null;
}

interface BungalowRoomGalleryProps {
  bungalows: any[];
}

export default function BungalowRoomGallery({ bungalows }: BungalowRoomGalleryProps) {
  // Extract all photos with room metadata
  const { categories, allPhotos, photosBySlug } = useMemo(() => {
    const photosMap: Record<string, GalleryPhoto[]> = {};
    const all: GalleryPhoto[] = [];

    bungalows.forEach((b) => {
      const rawUrls = [
        b.featured_image,
        ...(b.gallery_images || []),
      ].filter(Boolean) as string[];

      // Deduplicate identical URLs
      const uniqueUrls = Array.from(new Set(rawUrls)).map((img) => getImageUrl(img));

      const roomPhotos: GalleryPhoto[] = uniqueUrls.map((url) => ({
        url,
        roomTitle: b.title,
        roomSlug: b.slug,
        bookingUrl: b.booking_url || null,
        bedType: b.bed_type || null,
        maxGuests: b.max_guests || null,
      }));

      photosMap[b.slug] = roomPhotos;
      all.push(...roomPhotos);
    });

    const cats = [
      { id: 'all', label: 'All Rooms', count: all.length },
      ...bungalows.map((b) => ({
        id: b.slug,
        label: b.title,
        count: photosMap[b.slug]?.length || 0,
      })),
    ];

    return { categories: cats, allPhotos: all, photosBySlug: photosMap };
  }, [bungalows]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Photos to display based on category
  const displayedPhotos = useMemo(() => {
    if (activeCategory === 'all') return allPhotos;
    return photosBySlug[activeCategory] || [];
  }, [activeCategory, allPhotos, photosBySlug]);

  const activeRoom = useMemo(() => {
    if (activeCategory === 'all') return null;
    return bungalows.find((b) => b.slug === activeCategory) || null;
  }, [activeCategory, bungalows]);

  // Lightbox navigation
  const openLightbox = (index: number) => setActivePhotoIndex(index);
  const closeLightbox = () => setActivePhotoIndex(null);

  const prevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev! === 0 ? displayedPhotos.length - 1 : prev! - 1
    );
  }, [activePhotoIndex, displayedPhotos.length]);

  const nextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev! === displayedPhotos.length - 1 ? 0 : prev! + 1
    );
  }, [activePhotoIndex, displayedPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhotoIndex, prevPhoto, nextPhoto]);

  return (
    <section className="mt-20 sm:mt-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C3B73]/5 border border-[#0C3B73]/10 text-[#0C3B73] text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
          <Images className="w-3.5 h-3.5 text-[#00A3C4]" />
          Visual Tour
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0C3B73] leading-tight">
          Bungalow Photo Gallery
        </h2>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 font-light leading-relaxed">
          Select any room type below to explore detailed photographs of private terraces,
          panoramic sea views, cozy interiors, and tropical surroundings.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-2 no-scrollbar justify-start md:justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm ${
                  isActive
                    ? 'bg-[#0C3B73] text-white shadow-[#0C3B73]/25 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 hover:text-[#0C3B73] hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isActive
                      ? 'bg-[#00A3C4] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Room Information Strip (when a specific room category is selected) */}
      {activeRoom && (
        <motion.div
          key={activeRoom.slug}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00A3C4]/15 text-[#00A3C4] flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-[#0C3B73]">
                  {activeRoom.title}
                </h3>
                {activeRoom.subtitle && (
                  <span className="text-xs text-slate-500 font-light">
                    • {activeRoom.subtitle}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                {activeRoom.bed_type && (
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-[#00A3C4]" />
                    {activeRoom.bed_type}
                  </span>
                )}
                {activeRoom.max_guests && (
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#00A3C4]" />
                    Up to {activeRoom.max_guests} guests
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href={`/bungalows/${activeRoom.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0C3B73] hover:text-[#00A3C4] px-4 py-2 rounded-xl border border-slate-200 hover:border-[#00A3C4]/40 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {activeRoom.booking_url && (
              <a
                href={activeRoom.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#00A3C4] to-[#0C3B73] hover:opacity-90 px-4 py-2 rounded-xl shadow-md transition-opacity"
              >
                Book Now
              </a>
            )}
          </div>
        </motion.div>
      )}

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {displayedPhotos.map((photo, idx) => (
            <motion.div
              layout
              key={`${photo.roomSlug}-${idx}-${photo.url}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, delay: (idx % 12) * 0.03 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm hover:shadow-xl cursor-pointer border border-slate-100/80"
              onClick={() => openLightbox(idx)}
            >
              <Image
                src={photo.url}
                alt={`${photo.roomTitle} photo ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Expand Icon in Center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Expand className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <p className="text-white text-xs font-semibold drop-shadow line-clamp-1">
                  {photo.roomTitle}
                </p>
                <span className="text-[10px] text-[#7dd8ed] font-medium tracking-wider uppercase">
                  Click to enlarge
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && displayedPhotos[activePhotoIndex] && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-10">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-6xl max-h-[92vh] flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between text-white pb-3 px-2">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#00A3C4]">
                    {displayedPhotos[activePhotoIndex].roomTitle}
                  </span>
                  <span className="text-[11px] text-white/60">
                    Photo {activePhotoIndex + 1} of {displayedPhotos.length}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/bungalows/${displayedPhotos[activePhotoIndex].roomSlug}`}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <span>View Room Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={closeLightbox}
                    aria-label="Close photo"
                    className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl flex items-center justify-center">
                <Image
                  key={displayedPhotos[activePhotoIndex].url}
                  src={displayedPhotos[activePhotoIndex].url}
                  alt={`${displayedPhotos[activePhotoIndex].roomTitle} enlarged`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />

                {/* Left / Right Nav Buttons */}
                {displayedPhotos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevPhoto();
                      }}
                      aria-label="Previous photo"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextPhoto();
                      }}
                      aria-label="Next photo"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {displayedPhotos.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
                  {displayedPhotos.map((p, i) => (
                    <button
                      key={`thumb-${i}`}
                      onClick={() => setActivePhotoIndex(i)}
                      className={`relative w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                        i === activePhotoIndex
                          ? 'border-[#00A3C4] scale-110 shadow-md'
                          : 'border-white/20 opacity-50 hover:opacity-90'
                      }`}
                    >
                      <Image
                        src={p.url}
                        alt="thumbnail"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
