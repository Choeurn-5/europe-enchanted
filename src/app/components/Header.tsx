'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Menu, X, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Accommodations', href: '/bungalows' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function Header({ settings }: { settings?: Record<string, string> }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans">
      <div
        className={`bg-[#0C3B73] text-white/90 text-xs py-2 transition-all duration-300 ${
          isScrolled ? '-translate-y-full opacity-0 absolute h-0 overflow-hidden' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href={`tel:${settings?.site_phone?.replace(/\s/g, '') || '+85592748899'}`} className="flex items-center space-x-2 hover:text-[#00A3C4] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#00A3C4]" />
              <span>{settings?.site_phone || '+855 92 748 899'}</span>
            </a>
            <div className="hidden sm:flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#00A3C4]" />
              <span>{settings?.site_address || 'Koh Toch Beach, Koh Rong, Cambodia'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-[#00A3C4]/20 text-[#00A3C4] border border-[#00A3C4]/30 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase">
              Island Luxury
            </span>
          </div>
        </div>
      </div>

      <nav
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-gray-100 py-3'
            : 'bg-gradient-to-b from-black/40 to-transparent border-white/10 py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#00A3C4] shadow-md group-hover:scale-105 transition-transform duration-300">
              <Image
                src={getImageUrl(settings?.site_logo || '/images/common/logo.png')}
                alt="Europe Enchanted Logo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-serif font-bold tracking-wider transition-colors ${isScrolled ? 'text-[#0C3B73]' : 'text-white'}`}>
                EUROPE ENCHANTED
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-[#00A3C4]">
                Bungalows & Resort
              </span>
            </div>
          </Link>

          <div className={`hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-1 hover:text-[#00A3C4] transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00A3C4] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={settings?.booking_link || "https://app.inn-connect.com/book2/?p=Europe%20Enchanted%20Bungalow"}
              
              className="relative group overflow-hidden rounded-full bg-[#0C3B73] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:shadow-xl transition-all"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00A3C4] to-[#0C3B73] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>Book Now</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#00A3C4] group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-[#0C3B73]' : 'text-white'}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#0C3B73] text-white border-b border-[#00A3C4]/20 shadow-2xl"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-white/90 hover:text-[#00A3C4] transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                <a
                  href={settings?.booking_link || "https://app.inn-connect.com/book2/?p=Europe%20Enchanted%20Bungalow"}
                                  

                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-[#00A3C4] text-white py-3 rounded-full text-sm font-semibold tracking-wider uppercase"
                >
                  Book Your Stay
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;