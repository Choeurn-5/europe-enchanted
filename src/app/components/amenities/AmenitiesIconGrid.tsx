'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import {
  Waves, UtensilsCrossed, Sparkles, Compass, Wifi, Ship,
  Wind, Droplets, TreePalm, Camera, MoonStar, Coffee,
  CheckCircle,
  LucideIcon
} from 'lucide-react';

// The fallback static items
const defaultItems = [
  { icon: Waves, label: 'Infinity Pool', sub: 'Open 7am – 9pm' },
  { icon: UtensilsCrossed, label: 'Restaurant & Bar', sub: '3 meals daily' },
  { icon: Sparkles, label: 'Spa & Wellness', sub: 'Treatments available' },
  { icon: Compass, label: 'Island Tours', sub: 'Snorkel, hike & kayak' },
  { icon: Wifi, label: 'Free WiFi', sub: 'Throughout resort' },
  { icon: Ship, label: 'Boat Transfer', sub: 'From Sihanoukville' },
  { icon: Wind, label: 'Air Conditioning', sub: 'All bungalows' },
  { icon: Droplets, label: 'Hot Water Shower', sub: 'All bungalows' },
  { icon: TreePalm, label: 'Private Balcony', sub: 'Select bungalows' },
  { icon: Camera, label: 'Sunset Viewpoint', sub: 'On the hilltop' },
  { icon: MoonStar, label: 'Nightly Bonfires', sub: 'On the beach' },
  { icon: Coffee, label: 'Daily Housekeeping', sub: 'Fresh linens & towels' },
];

// Map string names from WordPress to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Waves, UtensilsCrossed, Sparkles, Compass, Wifi, Ship,
  Wind, Droplets, TreePalm, Camera, MoonStar, Coffee,
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

interface AmenitiesIconGridProps {
  apiAmenities?: any[];
}

export default function AmenitiesIconGrid({ apiAmenities = [] }: AmenitiesIconGridProps) {
  const shouldReduceMotion = useReducedMotion();

  // If API returns data, map it. Otherwise fallback to the hardcoded defaultItems.
  const displayItems = apiAmenities.length > 0
    ? apiAmenities.map((amenity) => {
      const IconComponent = iconMap[amenity.icon_name] || CheckCircle;
      return {
        label: amenity.title,
        sub: amenity.subtitle,
        icon: IconComponent,
      };
    })
    : defaultItems;

  return (
    <section className="bg-[#F9FAFB] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#00A3C4]" />
            <span className="text-[#00A3C4] text-xs font-bold tracking-[0.3em] uppercase">At a Glance</span>
            <span className="h-px w-8 bg-[#00A3C4]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3B73]">Everything You Could Need</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            A complete snapshot of all amenities — resort-wide and in-bungalow — so nothing comes as a surprise.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {displayItems.map(({ icon: Icon, label, sub }, index) => (
            <motion.div
              key={`${label}-${index}`}
              variants={shouldReduceMotion ? undefined : itemVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00A3C4]/30 transition-all duration-300 flex flex-col items-center text-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-[#00A3C4]/10 flex items-center justify-center text-[#00A3C4] group-hover:bg-[#00A3C4] group-hover:text-white transition-all duration-300">
                <Icon className="w-5 h-5" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0C3B73]">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

