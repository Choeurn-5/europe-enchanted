'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function AmenitiesCTA({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();

  const heading = data?.heading || "Ready to feel enchanted?";
  const description = data?.description || "Experience the ultimate island getaway with our world-class amenities and breathtaking views.";
  const primaryCtaText = data?.primary_cta_text || "Book Your Stay";
  const primaryCtaLink = data?.primary_cta_link || "/booking";

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#0C3B73]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#00A3C4]/10 blur-[100px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#00A3C4]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {heading}
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {description}
          </p>
          <Link
            href={primaryCtaLink}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#00A3C4] text-white font-semibold rounded-full hover:bg-[#0089a4] transition-colors duration-300 shadow-lg shadow-[#00A3C4]/25"
          >
            {primaryCtaText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

