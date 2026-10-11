'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sun } from 'lucide-react';

const defaultMoments = [
  {
    label: 'Morning',
    eyebrow: '07:30 — Slow beginnings',
    title: 'Wake to the Sound of Waves',
    description:
      'Start the day with fresh coffee on your private balcony as the island slowly comes alive.',
    image: '/images/home/morning.jpg',
  },
  {
    label: 'Afternoon',
    eyebrow: '14:00 — Island adventures',
    title: 'Explore Beyond the Shore',
    description:
      'Snorkel over coral reefs, hike the jungle trails, or simply drift by the ocean with a book.',
    image: '/images/home/afternoon.jpg',
  },
  {
    label: 'Evening',
    eyebrow: '18:30 — Golden hour',
    title: 'Sunset, Slowed Down',
    description:
      'Watch the sky turn gold over the bay, then unwind over a fresh seafood dinner by the water.',
    image: '/images/home/evening.jpg',
  },
];

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
};

interface DayInTheLifeProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  moments?: {
    label: string;
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  }[];
}

function DayInTheLife({
  eyebrow = 'Island Life',
  heading = 'A day designed to <span className="block text-[#00A3C4]">feel effortless.</span>',
  description = 'There is no schedule here, only moments worth remembering. Discover the rhythm of a perfect island day.',
  moments: initialMoments,
}: DayInTheLifeProps) {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const moments = initialMoments?.length ? initialMoments : defaultMoments;
  const moment = moments[active];

  const previous = () => setActive((current) => (current - 1 + moments.length) % moments.length);
  const next = () => setActive((current) => (current + 1) % moments.length);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#DDF7FA]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#E9F0FA]/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl md:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#00A3C4]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00A3C4]">
              {eyebrow}
            </span>
          </div>
          <h2 
            className="max-w-xl font-serif text-4xl font-bold leading-[1.08] text-[#0C3B73] md:text-6xl"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="mt-5 max-w-lg text-base leading-7 text-gray-500">
            {description}
          </p>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Image panel */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -35 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[430px] md:h-[540px]"
          >
            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] border border-[#00A3C4]/30" />
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#0C3B73] shadow-[0_25px_70px_-30px_rgba(12,59,115,0.5)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={moment.image}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={getImageUrl(moment.image)}
                    alt={moment.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062B55]/70 via-transparent to-black/5" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  <Sun className="h-3.5 w-3.5 text-[#55D8E7]" />
                  Koh Rong, Cambodia
                </div>
                <span className="font-serif text-5xl font-bold text-white/35">0{active + 1}</span>
              </div>
            </div>
          </motion.div>

          {/* Story panel */}
          <div className="lg:py-8">
            <div className="mb-8 flex items-center gap-2 border-b border-[#0C3B73]/10 pb-4">
              {moments.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={active === index ? 'step' : undefined}
                  className="group flex flex-1 flex-col gap-3 text-left"
                >
                  <span
                    className={`h-1 w-full rounded-full transition-colors duration-300 ${
                      active === index ? 'bg-[#00A3C4]' : 'bg-[#0C3B73]/10 group-hover:bg-[#00A3C4]/40'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                      active === index ? 'text-[#0C3B73]' : 'text-gray-400 group-hover:text-[#0C3B73]'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={contentVariants}
                initial={shouldReduceMotion ? false : 'hidden'}
                animate={shouldReduceMotion ? undefined : 'visible'}
                exit={shouldReduceMotion ? undefined : 'exit'}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00A3C4]">
                  {moment.eyebrow}
                </p>
                <h3 className="mt-4 max-w-md font-serif text-3xl font-bold leading-tight text-[#0C3B73] md:text-4xl">
                  {moment.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-8 text-gray-500">
                  {moment.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between border-t border-[#0C3B73]/10 pt-6">
              <span className="text-xs font-medium text-gray-400">
                0{active + 1} <span className="mx-1">/</span> 0{moments.length}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous moment"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0C3B73]/15 text-[#0C3B73] transition-all duration-300 hover:border-[#00A3C4] hover:bg-[#00A3C4] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next moment"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0C3B73] text-white transition-all duration-300 hover:bg-[#00A3C4]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DayInTheLife;
