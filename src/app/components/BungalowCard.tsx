// src/app/components/BungalowCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/utils'

const amenityIcons: Record<string, string> = {
  wifi: '📶',
  pool: '🏊',
  ac: '❄️',
  breakfast: '🍳',
  sea_view: '🌊',
  parking: '🅿️',
  kitchen: '🍽️',
}

export default function BungalowCard({ bungalow }: { bungalow: any }) {
  const { title, slug, featured_image, subtitle, max_guests, size_sqm, bed_type, amenities, booking_url, short_description } = bungalow

  const imageUrl = getImageUrl(featured_image)

  const topAmenities = (amenities ?? []).slice(0, 3)

  return (
    <div className="group relative flex flex-col rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/60">
      {/* Image area */}
      <div className="relative w-full h-72 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0C3B73]/20 to-[#00A3C4]/20 flex items-center justify-center text-gray-400 text-sm">
            No image available
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Amenity pills */}
        {topAmenities.length > 0 && (
          <div className="absolute top-4 right-4 flex flex-col gap-1.5">
            {topAmenities.map((a: string) => (
              <span
                key={a}
                className="bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full capitalize"
              >
                {amenityIcons[a] ?? '✦'} {a.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        )}

        {/* Bottom title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h3 className="text-white text-xl font-serif font-bold drop-shadow-lg leading-snug">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/80 text-xs mt-0.5 font-light tracking-wide">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 bg-white">
        {/* Short description */}
        {short_description && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
            {short_description}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs font-semibold text-[#0C3B73]/70 mb-4">
          {max_guests && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#00A3C4]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>{max_guests} Guests</span>
            </div>
          )}
          {bed_type && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#00A3C4]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 4a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM2 9a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V9zM11 9a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V9zM11 14a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" />
              </svg>
              <span>{bed_type}</span>
            </div>
          )}
          {size_sqm && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#00A3C4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <span>{size_sqm} m²</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

        {/* CTAs */}
        <div className="flex gap-2.5 mt-auto">
          <Link
            href={`/bungalows/${slug}`}
            className="flex-1 text-center border-2 border-[#0C3B73]/20 text-[#0C3B73] rounded-2xl py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#0C3B73] hover:text-white hover:border-[#0C3B73] transition-all duration-300"
          >
            View Details
          </Link>
          {booking_url && (
            <a
              href={booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-gradient-to-r from-[#00A3C4] to-[#0C3B73] text-white rounded-2xl py-2.5 text-xs font-bold uppercase tracking-wider hover:opacity-90 hover:shadow-lg transition-all duration-300"
            >
              Book Now
            </a>
          )}
        </div>
      </div>
    </div>
  )
}