'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getImageUrl } from '@/lib/utils';
import {
  Phone,
  MapPin,
  Mail,
  Send,
  Sparkles,
  ArrowUpRight,
  Clock,
  Compass,
  CheckCircle2,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Accommodations', href: '/bungalows' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const highlights = [
  { label: 'Beachfront Bungalows', desc: 'Direct white sand access' },
  { label: 'Tropical Bar & Dining', desc: 'Fresh seafood & sunset cocktails' },
  { label: 'Island Adventures', desc: 'Snorkeling, boat tours & kayaking' },
];

export default function Footer({ settings }: { settings?: Record<string, string> }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#05182e] text-slate-300 overflow-hidden font-sans border-t border-white/10">
      {/* Ambient background glow & grid highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(0,163,196,0.18),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(12,59,115,0.45),transparent_45%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
      />

      {/* Top Banner / Newsletter Strip */}
      <div className="relative border-b border-white/10 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3C4]/15 border border-[#00A3C4]/30 text-[#00A3C4] text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exclusive Island Offers</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white tracking-wide">
                Stay enchanted with our seasonal specials
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-lg">
                Receive handpicked retreat offers, island travel guides, and early access to beachfront bungalow rates.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#00A3C4]/20 border border-[#00A3C4]/40 text-cyan-200">
                  <CheckCircle2 className="w-5 h-5 text-[#55D8E7] shrink-0" />
                  <p className="text-sm font-medium">Thank you! You have been added to our private island guest list.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full h-12 pl-4 pr-4 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00A3C4] focus:ring-2 focus:ring-[#00A3C4]/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#00A3C4] to-[#0C3B73] hover:from-[#00bfe6] hover:to-[#124d94] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/40 hover:shadow-cyan-500/25 transition-all shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center space-x-3.5 group">
              <div className="relative w-13 h-13 rounded-2xl overflow-hidden border border-[#00A3C4]/40 bg-white/5 p-1 shadow-md shadow-cyan-950/50 group-hover:border-[#00A3C4] transition-all">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src={getImageUrl(settings?.site_logo || '/images/common/logo.png')} alt="Europe Enchanted Logo" fill className="object-cover" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold tracking-wider text-white group-hover:text-cyan-200 transition-colors">
                  EUROPE ENCHANTED
                </span>
                <span className="text-[10px] tracking-[0.28em] uppercase font-semibold text-[#00A3C4]">
                  Bungalows & Resort
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300/80 leading-relaxed max-w-sm">
              An intimate sanctuary nestled directly along Europe Enchanted Bungalow. Experience the pure tranquility of Koh Rong with rustic island charm, warm Cambodian hospitality, and stunning sunsets over turquoise waters.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={settings?.social_facebook || "https://www.facebook.com/europeenchanted/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#00A3C4] hover:border-[#00A3C4] transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={settings?.social_instagram || "https://www.instagram.com/europeenchantedbungalow/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#00A3C4] hover:border-[#00A3C4] transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={settings?.social_whatsapp || "https://wa.me/+85592748899"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3C4]" />
              Navigation
            </h4>
            <ul className="space-y-3.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-slate-300/85 hover:text-[#55D8E7] transition-all duration-200 group gap-1 hover:translate-x-1"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00A3C4]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Highlights */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3C4]" />
              The Experience
            </h4>
            <div className="space-y-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00A3C4]/40 hover:bg-white/[0.06] transition-all"
                >
                  <p className="text-xs font-semibold text-white tracking-wide">{item.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Location Info */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3C4]" />
              Connect With Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`tel:${settings?.site_phone?.replace(/\s/g, '') || '+85592748899'}`}
                  className="group flex items-start gap-3.5 p-2.5 -mx-2.5 rounded-xl hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#00A3C4]/15 border border-[#00A3C4]/30 flex items-center justify-center shrink-0 group-hover:bg-[#00A3C4] group-hover:text-white text-[#00A3C4] transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Direct Line / WhatsApp</span>
                    <span className="text-white font-medium group-hover:text-[#55D8E7] transition-colors">{settings?.site_phone || '+855 92 748 899'}</span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${settings?.site_email || 'info@europeenchantedkohrong.com'}`}
                  className="group flex items-start gap-3.5 p-2.5 -mx-2.5 rounded-xl hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#00A3C4]/15 border border-[#00A3C4]/30 flex items-center justify-center shrink-0 group-hover:bg-[#00A3C4] group-hover:text-white text-[#00A3C4] transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Reservations & Inquiries</span>
                    <span className="text-white font-medium text-xs sm:text-sm truncate block group-hover:text-[#55D8E7] transition-colors">
                      {settings?.site_email || 'info@europeenchantedkohrong.com'}
                    </span>
                  </div>
                </a>
              </li>

              <li className="flex items-start gap-3.5 p-2.5 -mx-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#00A3C4]/15 border border-[#00A3C4]/30 flex items-center justify-center shrink-0 text-[#00A3C4]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Location</span>
                  <span className="text-slate-200 text-xs sm:text-sm leading-snug">
                    {settings?.site_address || 'Europe Enchanted Bungalow, Koh Rong Island, Sihanoukville, Cambodia'}
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-3 pt-2 text-xs text-slate-400 border-t border-white/[0.08]">
                <Clock className="w-4 h-4 text-[#00A3C4] shrink-0" />
                <span>{settings?.front_desk_hours || 'Front Desk: 7:00 AM – 10:00 PM (GMT+7)'}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="relative border-t border-white/10 bg-[#030e1c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Europe Enchanted Bungalows & Resort.</span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/bungalows" className="hover:text-white transition-colors">
              Bookings
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Getting Here
            </Link>
            <span className="text-white/20">•</span>
            <span className="text-cyan-400/90 font-medium">Koh Rong Island</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
