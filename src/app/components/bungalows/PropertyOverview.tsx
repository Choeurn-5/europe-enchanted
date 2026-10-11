// src/app/components/bungalows/PropertyOverview.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Flower2,
  Umbrella,
  ConciergeBell,
  HeartHandshake,
  Trees,
  Bike,
  Activity,
  Utensils,
  Bus,
  Coffee,
  Heart,
  MapPin,
  Bed,
  Sparkles,
  Waves,
  Star,
  Check,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const popularFacilities = [
  { label: 'Spa and wellness center', icon: Flower2 },
  { label: 'Beachfront', icon: Umbrella },
  { label: 'Room service', icon: ConciergeBell },
  { label: 'Massage', icon: HeartHandshake },
  { label: 'Garden', icon: Trees },
  { label: 'Bicycle rental', icon: Bike },
  { label: 'Yoga classes', icon: Activity },
  { label: 'Restaurant', icon: Utensils },
  { label: 'Shuttle service', icon: Bus },
  { label: 'Wonderful Breakfast', icon: Coffee },
];

interface PropertyOverviewProps {
  amenities?: any[];
}

export default function PropertyOverview({ amenities = [] }: PropertyOverviewProps) {
  const displayFacilities = amenities.length > 0
    ? amenities.map(a => ({
        label: a.title,
        icon: (LucideIcons as any)[a.icon_name] || Check
      }))
    : popularFacilities;

  return (
    <section className="mt-16 sm:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative"
      >
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00A3C4]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#0C3B73]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C3B73]/5 border border-[#0C3B73]/10 text-[#0C3B73] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3 h-3 text-[#00A3C4]" />
            Property Overview
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0C3B73] leading-tight">
            Resort Highlights & Stay Details
          </h2>
        </div>

        {/* Highlights Grid (Accommodations, Dining, Attractions + Couples Rating Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left 2 Columns: 3 Highlight Points */}
          <div className="lg:col-span-2 space-y-6">
            {/* Comfortable Accommodations */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-[#00A3C4]/30 hover:bg-slate-50 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#00A3C4]/15 text-[#00A3C4] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0C3B73] mb-1.5 flex items-center gap-2">
                  Comfortable Accommodations
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Rooms feature air conditioning, private bathrooms with walk-in showers, and sea views.
                  Additional amenities include balconies, terraces, and complimentary toiletries.
                </p>
              </div>
            </div>

            {/* Dining and Leisure */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-[#00A3C4]/30 hover:bg-slate-50 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#0C3B73]/10 text-[#0C3B73] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0C3B73] mb-1.5 flex items-center gap-2">
                  Dining and Leisure
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  The hotel serves a variety of cuisines, including seafood and Cambodian, with breakfast
                  options such as continental, Italian, and vegetarian. Facilities include a restaurant, bar,
                  and yoga classes.
                </p>
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-[#00A3C4]/30 hover:bg-slate-50 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0C3B73] mb-1.5 flex items-center gap-2">
                  Nearby Attractions
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Koh Toch Beach is just a few steps away, providing easy beach access.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic pt-1 pl-1">
              Distance in property description is calculated using © OpenStreetMap
            </p>
          </div>

          {/* Right Column: Couples Rating Card */}
          <div className="lg:col-span-1 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0C3B73] via-[#0b3363] to-[#041c38] text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#00A3C4]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00A3C4]/25 text-[#00A3C4] text-xs font-semibold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 fill-[#00A3C4]" />
                  Guest Favorite
                </span>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl sm:text-6xl font-serif font-black text-white tracking-tight">
                  9.6
                </span>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#00A3C4]">
                    Exceptional
                  </span>
                  <span className="text-[11px] text-white/70">Location Score</span>
                </div>
              </div>

              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Couples in particular like the location — they rated it <strong className="font-bold text-white">9.6</strong> for a two-person trip.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-[#00A3C4]" />
                <span>Prime Koh Toch Beachfront location</span>
              </div>
              <div className="flex items-center gap-2">
                <Umbrella className="w-4 h-4 text-[#00A3C4]" />
                <span>Private tropical balconies & terraces</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8" />

        {/* Most Popular Facilities Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0C3B73]">
              Most popular facilities
            </h3>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
              Available to all guests
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
            {displayFacilities.map((facility, idx) => {
              const Icon = facility.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/80 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-900 transition-colors leading-tight">
                    {facility.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
