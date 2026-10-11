// src/app/components/WhatsAppButton.tsx
'use client';

import { MessageCircle } from 'lucide-react';

// Replace with your real WhatsApp number, digits only, country code, no + or spaces
const WHATSAPP_NUMBER = '85592748899';

export default function WhatsAppButton({ settings }: { settings?: Record<string, string> }) {
  return (
    <a
      href={settings?.social_whatsapp || `https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 md:bottom-6 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </a>
  );
}