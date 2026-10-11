'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import {
  Compass,
  Sparkles,
  UtensilsCrossed,
  Waves,
  Wifi,
  Ship,
} from 'lucide-react';

// Removed hardcoded amenities array

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// Map Lucide string names to actual components
const IconMap: Record<string, any> = {
  Waves, UtensilsCrossed, Sparkles, Compass, Wifi, Ship
};

interface AmenityProps {
  title: string;
  subtitle: string;
  icon_name: string;
}

function AmenitiesStrip({ amenities = [] }: { amenities: AmenityProps[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#082D59] py-24 text-white md:py-32">
      {/* Static ocean-inspired background layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(0,163,196,0.2),transparent_32%),radial-gradient(circle_at_90%_90%,rgba(44,112,173,0.3),transparent_38%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/[0.05]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#00A3C4]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#55D8E7]">
              What&apos;s Included
            </span>
            <span className="h-px w-10 bg-[#00A3C4]" />
          </div>

          <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            Everything for an
            <span className="block text-[#55D8E7]">effortless island stay</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base">
            From slow mornings by the water to unforgettable adventures beyond the shore,
            everything you need is close at hand.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {amenities.map(({ icon_name, title, subtitle }, index) => {
            const Icon = IconMap[icon_name] || Waves;
            return (
            <motion.div
              key={title}
              variants={item}
              whileHover={shouldReduceMotion ? undefined : { y: -7 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.055] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#00A3C4]/60 hover:bg-white/[0.1] md:p-7"
            >
              <div className="absolute right-5 top-4 font-serif text-4xl font-bold text-white/[0.06]">
                0{index + 1}
              </div>

              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00A3C4]/30 bg-[#00A3C4]/10 text-[#55D8E7] transition-all duration-300 group-hover:border-[#00A3C4] group-hover:bg-[#00A3C4] group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#00A3C4] opacity-50 transition-all duration-300 group-hover:scale-150 group-hover:opacity-100" />
              </div>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/50 transition-colors duration-300 group-hover:text-white/75">
                {subtitle}
              </p>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#00A3C4] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          )})}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35"
        >
          <span className="h-px w-8 bg-white/20" />
          Stay a little longer
          <span className="h-px w-8 bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}

export default AmenitiesStrip;
