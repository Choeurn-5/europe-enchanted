'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin, ShieldCheck, X } from 'lucide-react';
import BookingModal from '@/app/components/BookingModal';


export default function FinalCTA({
  eyebrow,
  heading,
  description
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
}) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isBookingOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsBookingOpen(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBookingOpen]);

  return (
    <section className="relative overflow-hidden bg-[#062B55] py-24 md:py-32">
      {/* Lightweight static background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(0,163,196,0.24),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(73,139,198,0.22),transparent_36%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-white/[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/2 h-[25rem] w-[25rem] -translate-y-1/2 rounded-full border border-white/[0.06]"
      />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.75fr] lg:gap-24"
      >
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#55D8E7]" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#55D8E7]">
              Your Island Escape Awaits
            </span>
          </div>

          <h2 className="max-w-xl font-serif text-5xl font-bold leading-[1.02] text-white md:text-7xl">
            Ready to feel
            <span className="block text-[#55D8E7]">enchanted?</span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-8 text-white/60 md:text-lg">
            Leave the ordinary behind. Reserve your private bungalow and let the rhythm of Koh Rong
            take care of the rest.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={() => setIsBookingOpen(true)}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#00A3C4] px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_35px_-12px_rgba(0,163,196,0.8)] transition-colors duration-300 hover:bg-white hover:text-[#0C3B73]"
            >
              Book Your Stay
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            <span className="text-xs text-white/40">Best available rates direct with us</span>
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-white/[0.14] bg-white/[0.07] p-6 backdrop-blur-sm md:p-8">
          <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full border-4 border-[#062B55] bg-[#55D8E7]" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#55D8E7]">
            Your stay, your pace
          </p>
          <h3 className="mt-4 font-serif text-2xl font-bold text-white md:text-3xl">
            Make space for the moments that matter.
          </h3>

          <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#55D8E7]">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Private island setting</p>
                <p className="mt-1 text-xs text-white/45">Quiet shores of Koh Rong</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#55D8E7]">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Flexible island days</p>
                <p className="mt-1 text-xs text-white/45">Stay for a weekend or longer</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#55D8E7]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Direct booking promise</p>
                <p className="mt-1 text-xs text-white/45">Simple, secure reservations</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-[#020F20]/85 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-dialog-title"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 18 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#00A3C4]/20 bg-[#0C3B73] px-5 py-4 text-white sm:px-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#55D8E7]">Direct reservations</p>
                  <h2 id="booking-dialog-title" className="mt-1 font-serif text-base font-bold sm:text-lg">
                    Europe Enchanted Bungalows
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55D8E7]"
                  aria-label="Close reservation window"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative flex-1 bg-white">
                <iframe
                  id="innconnectbookingengine"
                  title="Europe Enchanted Bungalows reservation form"
                  src="https://app.inn-connect.com/book2/?p=Europe%20Enchanted%20Bungalow"
                  className="h-full w-full border-0"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence> */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}


