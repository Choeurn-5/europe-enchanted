'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Play } from 'lucide-react';
import BookingModal from '@/app/components/BookingModal';

const YOUTUBE_VIDEO_ID = "RjGYlmhO6Rw";

interface HeroProps {
  heading?: string;
  subheading?: string;
  youtubeId?: string;
}

function Hero({ heading = "Europe Enchanted Bungalows", subheading = "A private island escape — enchanted bungalows, warm hospitality, and the Cambodian coast at its most peaceful.", youtubeId = YOUTUBE_VIDEO_ID }: HeroProps) {
  const headline = heading.split(' ');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // As the user scrolls past the hero, content fades out and scales/moves slightly
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Video Background with subtle parallax zoom on scroll */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&playsinline=1`}
          title="Europe Enchanted Bungalows"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />

        {/* Enhanced Multi-Layer Cinematic Overlay */}
        {/* Layer 1: Deep ocean & charcoal top/bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#0C3B73]/35 to-black/80" />
        {/* Layer 2: Radial vignette to focus eyes on central typography */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.55)_100%)] pointer-events-none" />
        {/* Layer 3: Subtle warm darkness for crystal clear text readability */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 mb-6 border border-white/30 bg-black/20 rounded-full px-4 py-1.5 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3C4] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A3C4]" />
          </span>
          <span className="text-white/95 text-xs font-semibold tracking-[0.25em] uppercase">
            Koh Rong, Cambodia
          </span>
        </motion.div>

        <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-wide max-w-4xl flex flex-wrap justify-center gap-x-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          {headline.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/90 text-base sm:text-lg mt-6 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-light leading-relaxed"
        >
          {subheading}
        </motion.p>

        {/* Action Buttons: Book Stay | View Bungalows | Watch Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-10 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsBookingOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-[#00A3C4] to-[#0C3B73] hover:from-[#0C3B73] hover:to-[#00A3C4] text-white px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-xl shadow-[#00A3C4]/20 hover:shadow-2xl transition-all duration-300"
          >
            Book Your Stay
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="/bungalows"
            className="w-full sm:w-auto border border-white/50 text-white px-7 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-md text-center"
          >
            View Bungalows
          </motion.a>

          {/* Watch Video Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsVideoOpen(true)}
            className="w-full sm:w-auto group flex items-center justify-center gap-2.5 bg-white/15 hover:bg-white/25 border border-white/40 hover:border-[#00A3C4] text-white px-7 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest backdrop-blur-md shadow-lg transition-all duration-300"
          >
            <span className="w-6 h-6 rounded-full bg-[#00A3C4] text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#00A3C4] transition-transform">
              <Play className="w-3 h-3 fill-white text-white ml-0.5" />
            </span>
            <span>Watch Video</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — mouse shape with animated scroll dot */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        </div>
        <span className="text-white/70 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
      </motion.div>

      {/* Video Popup Lightbox Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-neutral-950 rounded-3xl shadow-2xl overflow-hidden z-10 border border-white/15 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center bg-[#0C3B73]/90 backdrop-blur-md text-white px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A3C4] animate-pulse" />
                  <span className="text-sm sm:text-base font-serif font-bold tracking-wider">
                    Europe Enchanted Bungalows & Resort
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  aria-label="Close video modal"
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player (16:9 Aspect Ratio) */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
                  title="Europe Enchanted Bungalows Full Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}

export default Hero;