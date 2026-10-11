'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Trees,
  HeartHandshake,
  Utensils,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react';

export default function AboutValues({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();

  const defaultValues = [
    {
      icon: Trees,
      title: 'Eco-Harmonious Architecture',
      desc: 'Our bungalows are crafted from sustainably treated natural timber, designed with open air flow to honor the island’s pristine coastline.',
    },
    {
      icon: HeartHandshake,
      title: 'Genuine Khmer Hospitality',
      desc: 'Our local Cambodian team greets every guest with heartfelt warmth, ensuring your island stay is seamless, personal, and unforgettable.',
    },
    {
      icon: Utensils,
      title: 'Fresh Coastal Dining',
      desc: 'We partner directly with local fishermen to bring you the freshest seafood, paired with organic ingredients and authentic Cambodian flavors.',
    },
    {
      icon: Waves,
      title: 'Seclusion & Serenity',
      desc: 'Situated away from noisy party zones, our resort provides a restful atmosphere where the ocean surf and starry skies take center stage.',
    },
  ];

  const heading = data?.heading || "What We Believe In";
  const subheading = data?.subheading || "Every aspect of Europe Enchanted is guided by respect for the environment, love for our island home, and a commitment to our guests’ peace of mind.";
  
  // Map dynamic values to icons based on index
  const icons = [Trees, HeartHandshake, Utensils, Waves];
  const values = data?.values 
    ? data.values.map((v: any, i: number) => ({ ...v, icon: icons[i % icons.length] })) 
    : defaultValues;

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A3C4]/10 text-[#00A3C4] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0C3B73]">
            {heading}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-3 leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v: any, index: number) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
                }
                className="group bg-[#F9FAFB] rounded-3xl p-7 border border-gray-100 hover:border-[#00A3C4]/40 hover:bg-white hover:shadow-xl hover:shadow-[#0C3B73]/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00A3C4]/10 text-[#00A3C4] flex items-center justify-center mb-6 group-hover:bg-[#00A3C4] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#0C3B73] mb-2.5">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
