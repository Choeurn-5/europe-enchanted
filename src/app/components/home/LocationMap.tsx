// src/app/components/home/LocationMap.tsx
'use client';

import { motion } from 'framer-motion';
import { Ship, Car, Anchor } from 'lucide-react';

const steps = [
  { icon: Car, label: 'Fly or drive to Sihanoukville' },
  { icon: Ship, label: 'Ferry to Koh Rong Island' },
  { icon: Anchor, label: 'Short boat transfer to the resort' },
];

export default function LocationMap({
  eyebrow,
  heading,
  description
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
}) {
  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#00A3C4] text-xs font-semibold tracking-[0.3em] uppercase">
            Find Us
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0C3B73] mt-3">
            Getting to Koh Rong
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-xl h-[420px]"
          >
            <iframe
              title="Europe Enchanted Bungalows location on Koh Rong"
              src="https://www.google.com/maps?q=Europe+Enchanted+Bungalow,+Koh+Rong,+Cambodia&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-2"
          >
            <p className="text-gray-500 mb-8 leading-relaxed">
              Europe Enchanted Bungalow, Koh Rong, Cambodia a peaceful island reachable in
              just a few easy steps.
            </p>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0C3B73] flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-[#00A3C4]" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">
                      Step {i + 1}
                    </span>
                    <p className="text-sm font-medium text-[#0C3B73]">{step.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
