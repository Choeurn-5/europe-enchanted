// src/app/components/BookingModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            <div className="flex justify-between items-center bg-[#0C3B73] text-white px-6 py-4 border-b border-[#00A3C4]/30">
              <span className="text-sm font-serif font-bold tracking-wider">
                Europe Enchanted Resort — Direct Reservations
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 w-full bg-white relative">
              <iframe
                id="innconnectbookingengine"
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://app.inn-connect.com/book2/?p=Europe%20Enchanted%20Bungalow"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}