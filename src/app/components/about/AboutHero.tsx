'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AboutHero({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();

  const heading = data?.heading || "Handcrafted with Heart, Surrounded by Nature";
  const subheading = data?.subheading || "Europe Enchanted was born from a passion for Koh Rong's pristine coastline — blending boutique European comfort with the warm soul of Cambodian island life.";

  return (
    <section className="relative min-h-[650px] lg:min-h-[700px] overflow-hidden">
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
          title="Europe Enchanted Koh Rong"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />

        {/* Light subtle overlay - video shines through clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25 pointer-events-none" />

        {/* Subtle bottom blend */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-16
            bg-gradient-to-t
            from-[#f8f9fc]
            to-transparent
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
          min-h-[650px]
          lg:min-h-[700px]
          flex
          items-center
          justify-center
          px-6
          pt-28
          pb-32
          lg:pt-32
        "
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
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
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {/* ===================================================
                EYEBROW BADGE
                =================================================== */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-1.5
                rounded-full
                bg-white/10
                border
                border-white/20
                backdrop-blur-md
                text-cyan-200
                text-xs
                font-semibold
                tracking-[0.25em]
                uppercase
                mb-6
              "
            >
              <Sparkles className="w-3.5 h-3.5 text-[#55D8E7]" />

              <span>Our Story &amp; Philosophy</span>
            </div>

            {/* ===================================================
                TITLE
                =================================================== */}
            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                font-serif
                font-bold
                text-white
                tracking-wide
                leading-tight
                mb-6
              "
            >
              {heading}
            </h1>

            {/* ===================================================
                DESCRIPTION
                =================================================== */}
            <p
              className="
                text-white/80
                text-base
                sm:text-lg
                md:text-xl
                max-w-2xl
                mx-auto
                leading-relaxed
              "
            >
              {subheading}
            </p>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          WAVE BOTTOM TRANSITION
          ========================================================= */}
      <div
        className="
          absolute
          -bottom-1
          left-0
          right-0
          w-full
          overflow-hidden
          leading-none
          pointer-events-none
          z-20
        "
      >
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12"
          preserveAspectRatio="none"
        >
          <path
            d="
              M0 60
              L60 50
              C120 40 240 20 360 15
              C480 10 600 20 720 28
              C840 36 960 42 1080 40
              C1200 38 1320 28 1380 23
              L1440 18
              V60
              H1380
              C1320 60 1200 60 1080 60
              C960 60 840 60 720 60
              C600 60 480 60 360 60
              C240 60 120 60 60 60
              H0
              Z
            "
            fill="#f8f9fc"
          />
        </svg>
      </div>
    </section>
  );
}