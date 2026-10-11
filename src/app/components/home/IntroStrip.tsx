'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { motion, useReducedMotion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface IntroStripProps {
  subheading?: string;
  heading?: string;
  content?: string;
  image?: string;
}

function IntroStrip({ 
  subheading = 'Welcome',
  heading = 'An Island Retreat, Away From It All',
  content = 'Tucked along the quiet shores of Koh Rong, Europe Enchanted Bungalows offers a private escape where the pace slows and the sea is always close. Every detail — from the open-air bungalows to the warmth of our team — is designed to make you feel like you have the island to yourself.',
  image = '/images/home/about.jpg'
}: IntroStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-28, 28]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [1.04, 1, 1.04]
  );

  const imageUrl = getImageUrl(image);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8FCFD] py-24 md:py-32"
    >
      {/* Lightweight static background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#DDF7FA]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-[#E8F0FA]/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#0C3B73_0.7px,transparent_0.7px)] [background-size:18px_18px]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-20">
        {/* Image */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -45, rotate: -2 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={shouldReduceMotion ? undefined : 'hover'}
          className="group relative h-[420px] w-full md:h-[500px]"
        >
          {/* Offset frame creates a more editorial composition */}
          <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] border border-[#00A3C4]/30" />

          <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#0C3B73] shadow-[0_24px_70px_-25px_rgba(12,59,115,0.45)]">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              variants={{ hover: { scale: 1.08 } }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-[-30px]"
            >
              <Image
                src={imageUrl}
                alt={heading}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-[filter] duration-700 group-hover:brightness-105"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#062b55]/55 via-transparent to-white/5" />

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.65, duration: 0.7 }}
              className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md"
            >
              Koh Rong, Cambodia
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={revealContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <motion.div variants={revealItem} className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#00A3C4]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00A3C4]">
              {subheading}
            </span>
          </motion.div>

          <motion.h2
            variants={revealItem}
            className="max-w-xl font-serif text-4xl font-bold leading-[1.08] text-[#0C3B73] md:text-5xl"
            dangerouslySetInnerHTML={{ __html: heading.replace('Away From It All', '<span class="text-[#00A3C4]">Away From It All</span>') }} 
          />
          
          <motion.div
            variants={revealItem}
            className="mt-6 max-w-lg text-base leading-8 text-gray-500 md:text-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <motion.a
            variants={revealItem}
            href="/about"
            whileHover={shouldReduceMotion ? undefined : { x: 6 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#0C3B73]"
          >
            <span className="relative pb-2">
              Our Story
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-100 bg-[#00A3C4] transition-transform duration-300 group-hover:scale-x-50" />
            </span>
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default IntroStrip;


