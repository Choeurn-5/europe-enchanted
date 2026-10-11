'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

const galleryImages = [
  { src: '/images/home/IMG_1393.jpg', alt: '', tall: true },
  { src: '/images/home/IMG_1378.jpg', alt: '' },
  { src: '/images/home/IMG_1360.jpg', alt: '' },
  { src: '/images/home/IMG_1349.jpg', alt: '', tall: true },
  { src: '/images/home/IMG_1328.jpg', alt: '' },
  { src: '/images/home/IMG_1325.jpg', alt: '' },
  { src: '/images/home/IMG_1381.jpg', alt: '' },
  { src: '/images/home/IMG_1390.jpg', alt: '' },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

interface GalleryPreviewProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
}

function GalleryPreview({
  eyebrow = 'Gallery',
  heading = 'A glimpse of <span className="block text-[#00A3C4]">paradise.</span>',
  description = 'Quiet mornings, turquoise waters, and the little details that make an island escape unforgettable.',
}: GalleryPreviewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const showPrev = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((current) =>
      current === null ? 0 : (current + 1) % galleryImages.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
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
    <section className="relative overflow-hidden bg-[#F7FBFC] py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#DDF7FA]/65 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#E8F0FA]/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00A3C4]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00A3C4]">
                {eyebrow}
              </span>
            </div>
            <h2 
              className="font-serif text-4xl font-bold leading-[1.08] text-[#0C3B73] md:text-6xl"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          </div>
          <p className="max-w-xs text-sm leading-7 text-gray-500 md:pb-1">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              variants={item}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open image: ${image.alt}`}
              className={`group relative block overflow-hidden rounded-2xl bg-[#0C3B73] text-left shadow-[0_15px_35px_-24px_rgba(12,59,115,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3C4] focus-visible:ring-offset-4 ${
                index === 0
                  ? 'col-span-2 row-span-2 h-[330px] md:h-[520px]'
                  : index === 3
                    ? 'col-span-2 h-[230px] md:col-span-1 md:row-span-2 md:h-[520px]'
                    : 'h-[160px] md:h-[250px]'
              }`}
            >
              <Image
                src={getImageUrl(image.src)}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062B55]/60 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center bg-[#062B55]/10 transition-colors duration-300 group-hover:bg-[#062B55]/25">
                <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </div>
              <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View photo
              </span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.35, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#0C3B73]/10 pt-7 sm:flex-row"
        >
          <span className="text-xs uppercase tracking-[0.18em] text-gray-400">
            08 moments from the island
          </span>
          <a
            href="/gallery"
            className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0C3B73]"
          >
            <span className="relative pb-2">
              View Full Gallery
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#00A3C4] transition-transform duration-300 group-hover:scale-x-50" />
            </span>
            <ArrowRightIcon />
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#03182F]/95 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55D8E7]"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[72vh] w-full max-w-5xl"
            >
              <Image
                src={getImageUrl(galleryImages[lightboxIndex].src)}
                alt={galleryImages[lightboxIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <p className="absolute -bottom-8 left-0 right-0 text-center text-xs uppercase tracking-[0.18em] text-white/60">
                {galleryImages[lightboxIndex].alt}
              </p>
            </motion.div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium tracking-[0.2em] text-white/50">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ArrowRightIcon() {
  return <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>;
}

export default GalleryPreview;
