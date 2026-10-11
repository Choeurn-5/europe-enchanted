'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import BookingModal from '@/app/components/BookingModal';

export default function AboutCTA({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const heading = data?.heading || "Begin Your Enchanted Island Story";
  const description = data?.description || "We look forward to welcoming you to our beachfront haven. Secure your bungalow now for direct booking perks and guaranteed sea views.";
  const primaryCtaText = data?.primary_cta_text || "Reserve a Bungalow";
  const secondaryCtaText = data?.secondary_cta_text || "Get in Touch";
  const secondaryCtaLink = data?.secondary_cta_link || "/contact";

  return (
    <section className="bg-white py-20 lg:py-28 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#05182e] via-[#0C3B73] to-[#00A3C4] text-white p-8 sm:p-12 lg:p-16 shadow-2xl shadow-[#0C3B73]/15 text-center"
        >
          {/* Ambient Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0C3B73]/40 blur-3xl"
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-cyan-200 text-xs font-semibold tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#55D8E7]" />
              <span>Escape to Koh Rong</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide leading-tight">
              {heading}
            </h2>

            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-[#00A3C4] hover:bg-[#0089a4] text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-cyan-900/40 hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{primaryCtaText}</span>
              </button>

              <Link
                href={secondaryCtaLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs uppercase tracking-widest backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>{secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}
