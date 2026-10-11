// src/app/components/home/FeaturedBungalowsHeader.tsx
'use client';

import { motion } from 'framer-motion';

export default function FeaturedBungalowsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="text-center max-w-2xl mx-auto mb-14"
    >
      <span className="text-[#00A3C4] text-xs font-semibold tracking-[0.3em] uppercase">
        Our Accommodations
      </span>
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0C3B73] mt-3">
        Where You&apos;ll Stay
      </h2>
      <p className="text-gray-500 mt-4">
        From garden views to ocean breezes, each bungalow is designed for
        comfort, privacy, and an unmistakable island calm.
      </p>
    </motion.div>
  );
}