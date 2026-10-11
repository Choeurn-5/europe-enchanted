'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export default function AmenitiesHeader({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const eyebrow = data?.eyebrow || "What's Included";
  const heading = data?.heading || "Resort Amenities";
  const description = data?.subheading || "From sunrise swims to candlelit dinners and island adventures — every detail is here to make your stay feel effortless and extraordinary.";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* =========================================================
          VIDEO BACKGROUND
          ========================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          className="
            absolute
            top-1/2
            left-1/2
            w-[177.77vh]
            min-w-full
            h-[56.25vw]
            min-h-full
            -translate-x-1/2
            -translate-y-1/2
            pointer-events-none
          "
          src="https://www.youtube.com/embed/RjGYlmhO6Rw?autoplay=1&mute=1&loop=1&playlist=RjGYlmhO6Rw&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&playsinline=1"
          title="Europe Enchanted Resort Amenities"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />

        {/* =======================================================
            VIDEO OVERLAY
            ======================================================= */}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Blue gradient overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#062B55]/80
            via-[#062B55]/45
            to-[#f8f9fc]
          "
        />
      </div>

      {/* =========================================================
          CONTENT
          ========================================================= */}
      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-6
        "
      >
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={
            shouldReduceMotion
              ? {
                  duration: 0,
                }
              : {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="max-w-4xl mx-auto text-center"
        >
          {/* =====================================================
              EYEBROW
              ===================================================== */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#55D8E7]" />

            <span
              className="
                text-[#55D8E7]
                text-xs
                font-bold
                tracking-[0.35em]
                uppercase
              "
            >
              {eyebrow}
            </span>

            <span className="h-px w-10 bg-[#55D8E7]" />
          </div>

          {/* =====================================================
              TITLE
              ===================================================== */}
          <h1
            className="
              text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              text-white
              leading-tight
              mb-5
            "
          >
            {heading}
          </h1>

          {/* =====================================================
              DESCRIPTION
              ===================================================== */}
          <p
            className="
              text-white/80
              text-lg
              md:text-xl
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            {description}
          </p>
        </motion.div>
      </div>

      {/* =========================================================
          OPTIONAL BOTTOM FADE
          Helps transition smoothly into the next section
          ========================================================= */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-24
          bg-gradient-to-t
          from-[#f8f9fc]
          to-transparent
          z-10
          pointer-events-none
        "
      />
    </section>
  );
}