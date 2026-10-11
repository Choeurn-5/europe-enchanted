'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function WhatsAppCTA({ data }: { data?: any }) {
  const shouldReduceMotion = useReducedMotion();
  
  const heading = data?.heading || 'Need a Fast Answer on the Island?';
  const description = data?.description || 'Connect directly with our on-site team for immediate ferry schedules, last-minute room inquiries, or customized island transfers.';
  const whatsAppNumber = data?.whatsapp_number || '85592748899';
  const defaultText = encodeURIComponent(
    data?.default_text || 'Hello Europe Enchanted Koh Rong! I would like to inquire about bungalow availability and speedboat transfers.'
  );
  const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${defaultText}`;

  return (
    <section className="bg-white py-16 lg:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#072448] via-[#0C3B73] to-[#00A3C4] text-white p-8 sm:p-12 lg:p-14 shadow-2xl shadow-[#0C3B73]/15"
        >
          {/* Ambient background glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#25D366]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#00A3C4]/20 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#4EFA8B] text-xs font-semibold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
                </span>
                <span>Instant WhatsApp Support</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                {heading}
              </h2>

              <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-cyan-100/80">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#55D8E7]" />
                  <span>Replies typically within 15 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#55D8E7]" />
                  <span>Official Resort Guest Concierge</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-3">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold text-sm uppercase tracking-widest shadow-xl shadow-green-950/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <MessageCircle className="w-5 h-5 text-slate-950 fill-current" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="tel:+85592748899"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors text-center"
              >
                <span>Or Call +855 92 748 899</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
