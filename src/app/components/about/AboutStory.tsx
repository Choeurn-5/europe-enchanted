'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutStory({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();

  const heading = data?.heading || "An Enchanted Sanctuary on the Cambodian Coast";
  const contentHTML = data?.content || `
    <p>
      Nestled on the serene stretch of Europe Enchanted Bunglow & Resort Beach, <strong>Europe Enchanted Bungalows</strong> was created to offer travelers an authentic island escape without sacrificing comfort and warmth.
    </p>
    <p>
      Our philosophy centers around simple elegance: waking up to gentle sea breezes, walking barefoot on powdery white sand, and letting the natural rhythm of Koh Rong wash away everyday stress.
    </p>
    <p>
      Every wooden bungalow is intentionally situated to maximize ocean views and tropical privacy, allowing guests to immerse themselves in Cambodia’s lush natural beauty.
    </p>
  `;
  const highlights = data?.highlights || [
    'Private beachfront setting nestled along Europe Enchanted Bunglow & Resort',
    'Handcrafted wooden bungalows built in harmony with nature',
    'Locally sourced organic ingredients and fresh Gulf seafood',
    'Dedicated team providing authentic, attentive Khmer hospitality',
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#f8f9fc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image / Visual Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-[#0C3B73]/15 border border-white bg-slate-900">
              <Image
                src={getImageUrl(data?.image || '/images/about/IMG_1396.jpg')}
                alt="Europe Enchanted Koh Rong resort grounds"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05182e]/80 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#55D8E7] mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Koh Rong Island</span>
                </div>
                <p className="font-serif text-lg font-bold">
                  Europe Enchanted Bungalows
                </p>
              </div>
            </div>

            {/* Decorative accent shape behind image */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-6 w-full h-full rounded-3xl border-2 border-[#00A3C4]/20 -z-10 hidden sm:block"
            />
          </motion.div>

          {/* Right Column: Text & Narrative */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#00A3C4]" />
              <span className="text-[#00A3C4] text-xs font-bold tracking-[0.25em] uppercase">
                The Origin
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0C3B73] leading-tight">
              {heading}
            </h2>

            <div 
              className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />

            {/* Highlights Checklist */}
            <div className="pt-4 border-t border-gray-200/80">
              <h3 className="text-xs font-semibold text-[#0C3B73] uppercase tracking-wider mb-4">
                What Defines Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((text: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A3C4] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
