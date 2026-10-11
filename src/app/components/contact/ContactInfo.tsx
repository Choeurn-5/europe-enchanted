'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Ship,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

export default function ContactInfo({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();

  const title = data?.title || 'Contact Details';
  const description = data?.description || 'Whether you need travel recommendations or assistance booking your ferry ticket, reach out through your preferred channel.';

  const defaultCards = [
    {
      icon: Phone,
      title: 'Phone & Direct Line',
      primary: '+855 92 748 899',
      sub: 'Available daily for urgent requests and calls',
      href: 'tel:+85592748899',
      actionLabel: 'Call Now',
    },
    {
      icon: Mail,
      title: 'Email Inquiries',
      primary: 'info@europeenchantedkohrong.com',
      sub: 'For booking inquiries, special events & groups',
      href: 'mailto:info@europeenchantedkohrong.com',
      actionLabel: 'Send Email',
    },
    {
      icon: Clock,
      title: 'Front Desk Hours',
      primary: '7:00 AM – 10:00 PM',
      sub: 'GMT+7 · Night manager available for late arrivals',
      actionLabel: 'Island Time',
    },
    {
      icon: Ship,
      title: 'Speedboat Transfer',
      primary: 'Sihanoukville ⇄ Koh Rong',
      sub: '45-min scenic boat ride directly to Koh Toch pier',
      href: 'https://wa.me/85592748899?text=Hello%2C%20I%20need%20assistance%20arranging%20a%20boat%20transfer.',
      actionLabel: 'Transfer Info',
    },
  ];

  // Map icon strings to components if coming from backend
  const getIcon = (iconName: string, FallbackIcon: any) => {
    switch (iconName) {
      case 'Phone': return Phone;
      case 'Mail': return Mail;
      case 'Clock': return Clock;
      case 'Ship': return Ship;
      default: return FallbackIcon;
    }
  };

  const contactCards = data?.items?.map((item: any, index: number) => ({
    icon: getIcon(item.icon, defaultCards[index % defaultCards.length].icon),
    title: item.title,
    primary: item.primary,
    sub: item.sub,
    href: item.href,
    actionLabel: item.actionLabel,
  })) || defaultCards;

  return (
    <div className="space-y-8">

      {/* =========================================================
          INTRO
          ========================================================= */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-8 bg-[#00A3C4]" />

          <span className="text-[#00A3C4] text-xs font-bold tracking-[0.25em] uppercase">
            Direct Channels
          </span>
        </div>

        <h2 className="text-3xl font-serif font-bold text-[#0C3B73] mb-3">
          {title}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
          {description}
        </p>
      </div>

      {/* =========================================================
          CONTACT CARDS
          ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {contactCards.map((item: any, index: number) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 16,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: '-50px',
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="
                group
                bg-white
                rounded-2xl
                p-5
                sm:p-6
                border
                border-gray-100
                shadow-sm
                hover:shadow-lg
                hover:border-[#00A3C4]/30
                transition-all
                duration-300
                flex
                flex-col
                min-h-[220px]
              "
            >
              {/* Card content */}
              <div className="flex-1">

                {/* Icon */}
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-[#00A3C4]/10
                    text-[#00A3C4]
                    flex
                    items-center
                    justify-center
                    mb-4
                    group-hover:bg-[#00A3C4]
                    group-hover:text-white
                    transition-colors
                    duration-300
                  "
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Label */}
                <h3
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-gray-400
                    mb-2
                  "
                >
                  {item.title}
                </h3>

                {/* Main value */}
                {item.href ? (
                  <a
                    href={item.href}
                    className="
                      group/link
                      text-sm
                      sm:text-base
                      font-semibold
                      text-[#0C3B73]
                      hover:text-[#00A3C4]
                      transition-colors
                      break-all
                      inline-flex
                      items-start
                      gap-1
                    "
                  >
                    <span>{item.primary}</span>

                    <ArrowUpRight
                      className="
                        w-3.5
                        h-3.5
                        mt-0.5
                        shrink-0
                        opacity-0
                        -translate-x-1
                        group-hover/link:opacity-100
                        group-hover/link:translate-x-0
                        transition-all
                        text-[#00A3C4]
                      "
                    />
                  </a>
                ) : (
                  <p
                    className="
                      text-sm
                      sm:text-base
                      font-semibold
                      text-[#0C3B73]
                    "
                  >
                    {item.primary}
                  </p>
                )}

                {/* Description */}
                <p
                  className="
                    text-xs
                    text-gray-400
                    mt-2
                    leading-relaxed
                    max-w-[280px]
                  "
                >
                  {item.sub}
                </p>
              </div>

              {/* Action */}
              {item.href ? (
                <div
                  className="
                    mt-5
                    pt-3
                    border-t
                    border-gray-100
                    flex
                    items-center
                    justify-between
                  "
                >
                  <a
                    href={item.href}
                    className="
                      text-xs
                      font-semibold
                      text-[#00A3C4]
                      hover:text-[#0C3B73]
                      transition-colors
                      inline-flex
                      items-center
                      gap-1
                    "
                  >
                    <span>{item.actionLabel}</span>
                    <span>→</span>
                  </a>
                </div>
              ) : (
                <div
                  className="
                    mt-5
                    pt-3
                    border-t
                    border-gray-100
                  "
                >
                  <span className="text-xs font-medium text-gray-400">
                    {item.actionLabel}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* =========================================================
          LOCATION & MAP
          ========================================================= */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: '-50px',
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.6,
              }
        }
        className="
          bg-white
          rounded-3xl
          p-5
          sm:p-6
          border
          border-gray-100
          shadow-sm
          overflow-hidden
        "
      >

        {/* Location heading */}
        <div className="flex items-start gap-3.5 mb-5">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-[#0C3B73]/10
              text-[#0C3B73]
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <MapPin className="w-5 h-5" />
          </div>

          <div>
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-[#00A3C4]
              "
            >
              Resort Location
            </span>

            <h3 className="text-base font-serif font-bold text-[#0C3B73]">
              Europe Enchanted Bungalows, Koh Rong Island
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              Sihanoukville Province, Cambodia · Direct beachfront access
            </p>
          </div>
        </div>

        {/* Map */}
        <div
          className="
            relative
            w-full
            h-56
            sm:h-64
            rounded-2xl
            overflow-hidden
            border
            border-gray-100
            shadow-inner
            bg-gray-100
          "
        >
          <iframe
            title="Europe Enchanted Koh Rong Location"
            className="w-full h-full border-0"
            src="https://www.google.com/maps?q=Europe+Enchanted+Bungalow,+Koh+Rong,+Cambodia&output=embed"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Map footer */}
        <div
          className="
            mt-4
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-center
            justify-between
            gap-3
            text-xs
            text-gray-500
            bg-[#F9FAFB]
            p-3.5
            rounded-xl
            border
            border-gray-100
          "
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#00A3C4] shrink-0" />

            <span>
              Need pier pickup? Let us know your arrival boat time in advance.
            </span>
          </div>

          <a
            href="https://maps.google.com?q=Koh+Toch+Beach,+Koh+Rong,+Cambodia"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-[#0C3B73]
              font-semibold
              hover:text-[#00A3C4]
              transition-colors
              shrink-0
              inline-flex
              items-center
              gap-1
            "
          >
            <span>Open in Google Maps</span>

            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}