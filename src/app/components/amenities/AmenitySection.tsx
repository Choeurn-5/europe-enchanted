'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface Detail {
  label: string;
  value: string;
}

interface AmenitySectionProps {
  eyebrow: string;
  heading: string;
  description: string;
  details?: Detail[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  bg?: 'white' | 'soft';
}

export default function AmenitySection({
  eyebrow,
  heading,
  description,
  details,
  image,
  imageAlt,
  reverse = false,
  bg = 'white',
}: AmenitySectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const bgClass = bg === 'soft' ? 'bg-[#F9FAFB]' : 'bg-white';

  const imgVariants = {
    hidden: { opacity: 0, x: reverse ? 40 : -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: reverse ? -40 : 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay: 0.12 } },
  };

  return (
    <section className={`${bgClass} py-20 md:py-28 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>

          {/* Image */}
          <motion.div
            variants={shouldReduceMotion ? undefined : imgVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className={`relative ${reverse ? 'lg:col-start-2' : ''}`}
          >
            <div className={`absolute ${reverse ? '-bottom-4 -left-4' : '-bottom-4 -right-4'} w-full h-full rounded-[2rem] border-2 border-[#00A3C4]/20 pointer-events-none`} />
            <div className="relative h-[340px] md:h-[480px] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#0C3B73]/10 bg-[#e8eef5]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062B55]/25 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={shouldReduceMotion ? undefined : textVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className={`flex flex-col justify-center ${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#00A3C4]" />
              <span className="text-[#00A3C4] text-xs font-bold tracking-[0.3em] uppercase">
                {eyebrow}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#0C3B73] leading-tight mb-5">
              {heading}
            </h2>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8">
              {description}
            </p>

            {details && details.length > 0 && (
              <ul className="space-y-3 border-t border-gray-100 pt-6">
                {details.map((d) => (
                  <li key={d.label} className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3C4] flex-shrink-0" />
                    <span className="text-sm text-[#0C3B73]/50 font-medium w-28 flex-shrink-0">{d.label}</span>
                    <span className="text-sm text-[#0C3B73] font-semibold">{d.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

