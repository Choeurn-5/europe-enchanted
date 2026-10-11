// src/app/components/StickyBookButton.tsx
'use client';

import { useState } from 'react';
import BookingModal from '@/app/components/BookingModal';

export default function StickyBookButton({ settings }: { settings?: Record<string, string> }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-3">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="w-full bg-[#00A3C4] hover:bg-[#0C3B73] text-white py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest transition-colors duration-300"
        >
          Book Your Stay
        </button>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}