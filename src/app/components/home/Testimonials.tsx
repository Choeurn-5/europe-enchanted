'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from 'lucide-react';
import type { Review } from '@/lib/reviews/types';

const fallbackReviews: Review[] = [
  {
    id: 'fallback-1',
    source: 'fallback',
    sourceLabel: 'Sample guest story',
    author: 'Sarah M.',
    origin: 'United Kingdom',
    rating: 5,
    text: 'Waking up to the sound of waves every morning was pure magic. The bungalow was private, clean, and the staff made us feel like family.',
    url: '#',
  },
  {
    id: 'fallback-2',
    source: 'fallback',
    sourceLabel: 'Sample guest story',
    author: 'Julien D.',
    origin: 'France',
    rating: 5,
    text: "One of the most peaceful places we've ever stayed. No cars, no noise — just the island, the sea, and genuinely warm hospitality.",
    url: '#',
  },
  {
    id: 'fallback-3',
    source: 'fallback',
    sourceLabel: 'Sample guest story',
    author: 'Mika T.',
    origin: 'Japan',
    rating: 5,
    text: 'The sunset dinner on the beach was unforgettable. Europe Enchanted felt worlds away from anywhere else on Koh Rong.',
    url: '#',
  },
];

const reviewPlatforms = [
  {
    name: 'Booking.com',
    label: 'See our guest reviews',
    href: process.env.NEXT_PUBLIC_BOOKING_REVIEW_URL ?? 'https://www.booking.com/hotel/kh/europe-enchanted-koh-rong.html?aid=356980&label=gog235jc-10CAsoeEIZZXVyb3BlLWVuY2hhbnRlZC1rb2gtcm9uZ0gzWANodYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAagCAbgCr5r-1AbAAgHSAiQwODdhMjg0Yi0xYTYwLTQ2YzctYjg5Yi00ZGUwNmYzY2Y2MDfYAgHgAgE&sid=88f31ec92cf31fd8eb1374de56557315&all_sr_blocks=1384566104_410496394_2_42_0&checkin=2026-09-08&checkout=2026-09-09&dest_id=-1023916&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1384566104_410496394_2_42_0&hpos=1&matching_block_id=1384566104_410496394_2_42_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1384566104_410496394_2_42_0__2580&srepoch=1788842924&srpvid=9da81e98d05b0488&type=total&ucfs=1&',
    icon: 'booking',
    iconBg: 'bg-[#003B95]',
  },
  {
    name: 'Tripadvisor',
    label: 'Read traveler feedback',
    href: process.env.NEXT_PUBLIC_TRIPADVISOR_REVIEW_URL ?? 'https://www.tripadvisor.com/Hotel_Review-g17628635-d31591050-Reviews-Europe_Enchanted_Bungalow_Koh_Rong-Kaoh_Touch_Koh_Rung_Koh_Kong_Province.html',
    icon: 'tripadvisor',
    iconBg: 'bg-[#34A853]',
  },
  {
    name: 'Google Reviews',
    label: 'View our latest reviews',
    href: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? 'https://www.google.com/search?q=Europe+Enchanted+Bungalow+Koh+Rong&rlz=1C1GCEA_enKH1159KH1159&oq=Europe+Enchanted+Bungalow+Koh+Rong&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPdIBCDExNDRqMGo0qAIAsAIB&sourceid=chrome&source=chrome.ob&ie=UTF-8',
    icon: 'google',
    iconBg: 'bg-white',
  },
];

function BrandIcon({ type }: { type: string }) {
  if (type === 'booking') {
    return <span className="font-sans text-lg font-black tracking-[-0.08em] text-white">B<span className="text-xs">.com</span></span>;
  }

  if (type === 'tripadvisor') {
    return (
      <svg viewBox="0 0 40 28" aria-hidden="true" className="h-7 w-8 fill-none stroke-white stroke-[2.8]">
        <path d="M4 14c3.5-6.8 9-10.2 16-10.2S32.5 7.2 36 14" />
        <circle cx="12" cy="15" r="5.2" />
        <circle cx="28" cy="15" r="5.2" />
        <circle cx="12" cy="15" r="1.4" className="fill-white stroke-none" />
        <circle cx="28" cy="15" r="1.4" className="fill-white stroke-none" />
        <path d="M18 18l2 2 2-2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7">
      <path fill="#4285F4" d="M30.2 16.3c0-1-.1-2-.3-2.9H16v5.5h8c-.3 1.8-1.3 3.3-2.8 4.3v3.6h4.6c2.7-2.5 4.4-6.1 4.4-10.5Z" />
      <path fill="#34A853" d="M16 30.5c3.9 0 7.2-1.3 9.7-3.6l-4.6-3.6c-1.3.9-3 1.5-5.1 1.5-3.9 0-7.2-2.6-8.4-6.1H2.8v3.7C5.3 27.2 10.2 30.5 16 30.5Z" />
      <path fill="#FBBC05" d="M7.6 18.7c-.3-.9-.5-1.8-.5-2.7s.2-1.9.5-2.7V9.6H2.8C1.8 11.5 1.3 13.6 1.3 16s.5 4.5 1.5 6.4l4.8-3.7Z" />
      <path fill="#EA4335" d="M16 7.2c2.2 0 4.1.8 5.6 2.2l4.2-4.2C23.2 2.8 19.9 1.5 16 1.5 10.2 1.5 5.3 4.8 2.8 9.6l4.8 3.7c1.2-3.5 4.5-6.1 8.4-6.1Z" />
    </svg>
  );
}

function SourceBadge({ source, label }: { source: Review['source']; label: string }) {
  if (source === 'fallback') {
    return <span className="rounded-full border border-amber-200/30 bg-amber-300/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100">{label}</span>;
  }

  const styles = {
    google: 'border-white/15 bg-white text-[#4285F4]',
    tripadvisor: 'border-white/15 bg-[#34A853] text-white',
    booking: 'border-white/15 bg-[#003B95] text-white',
  } as const;

  const marks = { google: 'G', tripadvisor: 'TA', booking: 'B.' } as const;

  return <span className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] ${styles[source]}`}>{marks[source]} · {label}</span>;
}

function Testimonials({
  eyebrow,
  heading,
  description
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
}) {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [active, setActive] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    fetch('/api/reviews')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.reviews?.length) {
          setReviews(data.reviews);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Keep the local guest stories visible if the provider APIs are unavailable.
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % reviews.length);
  }, [reviews.length]);

  const prev = useCallback(() => {
    setActive((current) => (current - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (shouldReduceMotion || reviews.length < 2) return;
    const timer = window.setInterval(next, 6500);
    return () => window.clearInterval(timer);
  }, [next, reviews.length, shouldReduceMotion]);

  const review = reviews[active] ?? fallbackReviews[0];
  const sourceType = review.source === 'fallback' ? 'fallback' : review.source;
  const sourceName = isLive ? review.sourceLabel : 'Sample guest story';

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-[#DDF7FA]/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 right-0 h-[30rem] w-[30rem] rounded-full bg-[#E9F0FA]/80 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00A3C4]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00A3C4]">Guest Stories</span>
            </div>
            <h2 className="font-serif text-4xl font-bold leading-[1.08] text-[#0C3B73] md:text-5xl">
              Loved by guests,
              <span className="block text-[#00A3C4]">remembered forever.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-gray-500">Every stay has a story. See what guests are saying about their time at Europe Enchanted.</p>

            <div className="mt-9 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0C3B73]">
                <Star className="h-4 w-4 fill-[#55D8E7] text-[#55D8E7]" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#00A3C4]">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {isLoading ? 'Checking connected review sources...' : isLive ? 'Live review data connected' : 'Showing sample stories until APIs are connected'}
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Find us on</p>
              {reviewPlatforms.map((platform) => (
                <a key={platform.name} href={platform.href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-[#0C3B73]/10 bg-white/70 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00A3C4]/50 hover:bg-white hover:shadow-lg">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm ${platform.iconBg}`}><BrandIcon type={platform.icon} /></span>
                  <span className="flex-1"><span className="block text-sm font-semibold text-[#0C3B73]">{platform.name}</span><span className="mt-0.5 block text-xs text-gray-400">{platform.label}</span></span>
                  <ExternalLink className="h-4 w-4 text-gray-300 transition-colors group-hover:text-[#00A3C4]" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.1 }} className="relative">
            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] border border-[#00A3C4]/20" />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0C3B73] p-8 shadow-[0_25px_70px_-30px_rgba(12,59,115,0.55)] md:p-12">
              <div className="relative flex items-center justify-between">
                <Quote className="h-10 w-10 text-[#55D8E7]" strokeWidth={1.4} />
                <SourceBadge source={sourceType} label={sourceName} />
              </div>
              <div className="mt-10 min-h-[210px]">
                <AnimatePresence mode="wait">
                  <motion.div key={review.id} initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }} transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}>
                    <div className="mb-5 flex gap-1 text-[#55D8E7]">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
                    <p className="max-w-2xl font-serif text-2xl leading-relaxed text-white md:text-3xl">&ldquo;{review.text}&rdquo;</p>
                    <div className="mt-8 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#55D8E7] text-sm font-bold text-[#0C3B73]">{review.author.charAt(0)}</div><div><p className="text-sm font-semibold text-white">{review.author}</p><p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-white/45">{review.origin ?? review.sourceLabel}</p></div></div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6"><span className="text-xs text-white/40">{String(active + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span><div className="flex gap-2"><button type="button" onClick={prev} aria-label="Previous review" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-[#55D8E7] hover:bg-[#55D8E7] hover:text-[#0C3B73]"><ChevronLeft className="h-4 w-4" /></button><button type="button" onClick={next} aria-label="Next review" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00A3C4] text-white hover:bg-[#55D8E7] hover:text-[#0C3B73]"><ChevronRight className="h-4 w-4" /></button></div></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
