'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Ship, Home, Compass, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function AboutExperience({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();

  const defaultSteps = [
    {
      num: '01',
      icon: Ship,
      title: 'Scenic Speedboat Transfer',
      desc: 'Your escape starts with a 45-minute speedboat ride across the Gulf of Cambodian, greeted by our team upon arrival at Europe Enchanted Bunglow & Resort pier.',
    },
    {
      num: '02',
      icon: Home,
      title: 'Private Bungalow Sanctuary',
      desc: 'Settle into your handcrafted wooden bungalow. Enjoy comfortable king bedding, private balconies, hot showers, and panoramic sea vistas.',
    },
    {
      num: '03',
      icon: Compass,
      title: 'Curated Island Adventures',
      desc: 'Explore hidden coves, snorkel vibrant coral reefs, paddle clear kayaks, or experience the magical glowing bioluminescent plankton by night.',
    },
    {
      num: '04',
      icon: UtensilsCrossed,
      title: 'Sunset Dining & Beach Drinks',
      desc: 'Unwind at our open-air restaurant with fresh grilled seafood, tropical cocktails, and spectacular crimson sunsets over the horizon.',
    },
  ];

  const heading = data?.heading || "What to Expect at Europe Enchanted";
  const subheading = data?.subheading || "From the moment you step aboard your transfer boat to your final island morning, your comfort and relaxation come first.";
  
  const icons = [Ship, Home, Compass, UtensilsCrossed];
  const steps = data?.steps
    ? data.steps.map((s: any, i: number) => ({ ...s, icon: icons[i % icons.length] }))
    : defaultSteps;

  return (
    <section className="py-20 lg:py-28 bg-[#F9FAFB] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C3B73]/10 text-[#0C3B73] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00A3C4]" />
            <span>The Guest Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0C3B73]">
            {heading}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-3 leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step: any, index: number) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
                }
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#00A3C4]/30 transition-all duration-300 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#00A3C4]/10 text-[#00A3C4] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-gray-200">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#0C3B73] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {step.desc}
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
