// src/app/components/BungalowGallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BungalowGalleryProps {
  images: string[]
  title: string
}

export default function BungalowGallery({ images, title }: BungalowGalleryProps) {
  const [active, setActive] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 rounded-3xl bg-gradient-to-br from-[#0C3B73]/10 to-[#00A3C4]/10 flex items-center justify-center text-gray-400 text-sm">
        No images available
      </div>
    )
  }

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative w-full h-[480px] md:h-[560px] rounded-3xl overflow-hidden bg-gray-100 shadow-xl group">
        <Image
          key={active}
          src={images[active]}
          alt={`${title} - image ${active + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover transition-opacity duration-500"
        />

        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {active + 1} / {images.length}
        </div>

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg flex items-center justify-center text-[#0C3B73] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg flex items-center justify-center text-[#0C3B73] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === active
                  ? 'border-[#00A3C4] shadow-md scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#0C3B73]/30'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
