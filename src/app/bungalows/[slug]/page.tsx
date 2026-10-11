import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchBungalows, fetchBungalow } from '@/lib/laravel/api'
import { getImageUrl } from '@/lib/utils'
import BungalowGallery from '@/app/components/BungalowGallery'

export const revalidate = 3600 // ISR: revalidate once per hour

export async function generateStaticParams() {
  try {
    const bungalows = await fetchBungalows()
    return (bungalows ?? []).map((bungalow: any) => ({
      slug: bungalow.slug,
    }))
  } catch (error) {
    console.error('Error in generateStaticParams for bungalows:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const bungalow = await fetchBungalow(slug)
    if (!bungalow) return { title: 'Bungalow Not Found' }

    const imageUrl = getImageUrl(bungalow.featured_image) || '/images/common/resort-4.jpg'

    return {
      title: `${bungalow.title} | Europe Enchanted Koh Rong`,
      description:
        bungalow.short_description ||
        bungalow.subtitle ||
        `Book your stay at ${bungalow.title} on Koh Rong Island, Cambodia. Handcrafted wooden architecture, beachfront serenity, and modern amenities.`,
      alternates: {
        canonical: `https://europeenchantedkohrong.com/bungalows/${slug}`,
      },
      openGraph: {
        title: `${bungalow.title} | Europe Enchanted Koh Rong`,
        description:
          bungalow.short_description ||
          bungalow.subtitle ||
          `Book your stay at ${bungalow.title} on Koh Rong Island, Cambodia.`,
        url: `https://europeenchantedkohrong.com/bungalows/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: bungalow.title,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${bungalow.title} | Europe Enchanted Koh Rong`,
        description:
          bungalow.short_description ||
          bungalow.subtitle ||
          `Book your stay at ${bungalow.title} on Koh Rong Island, Cambodia.`,
        images: [imageUrl],
      },
    }
  } catch {
    return {
      title: 'Bungalow | Europe Enchanted Koh Rong',
    }
  }
}

export default async function BungalowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let bungalow = null
  try {
    bungalow = await fetchBungalow(slug)
  } catch (error) {
    console.error(`Error fetching bungalow with slug ${slug}:`, error)
  }

  if (!bungalow) {
    notFound()
  }

  const {
    title,
    subtitle,
    description,
    max_guests: maxGuests,
    bed_type: bedType,
    size_sqm: sizeSqm,
    amenities,
    booking_url: bookingUrl,
    featured_image,
    gallery_images,
  } = bungalow

  // Collect all gallery images (filter nulls)
  const rawUrls = [
    featured_image,
    ...(gallery_images || []),
  ].filter(Boolean) as string[]

  const galleryImages = Array.from(new Set(rawUrls)).map((img) => getImageUrl(img))

  const amenityIconMap: Record<string, { icon: string; label: string }> = {
    wifi: { icon: '📶', label: 'Free WiFi' },
    pool: { icon: '🏊', label: 'Private Pool' },
    ac: { icon: '❄️', label: 'Air Conditioning' },
    breakfast: { icon: '🍳', label: 'Breakfast Included' },
    sea_view: { icon: '🌊', label: 'Sea View' },
    parking: { icon: '🅿️', label: 'Free Parking' },
    kitchen: { icon: '🍽️', label: 'Kitchen' },
  }

  const roomJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: title,
    description: bungalow.short_description || subtitle || description,
    image: galleryImages,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: maxGuests || 2,
    },
    bed: bedType || 'King Bed',
    ...(sizeSqm
      ? {
          floorSize: {
            '@type': 'QuantitativeValue',
            value: sizeSqm,
            unitCode: 'MTK',
          },
        }
      : {}),
    containedInPlace: {
      '@type': 'Resort',
      name: 'Europe Enchanted Bungalows & Resort',
      url: 'https://europeenchantedkohrong.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Koh Toch Beach',
        addressLocality: 'Koh Rong',
        addressRegion: 'Sihanoukville',
        addressCountry: 'KH',
      },
    },
    ...(bungalow.price_per_night
      ? {
          offers: {
            '@type': 'Offer',
            price: bungalow.price_per_night,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `https://europeenchantedkohrong.com/bungalows/${slug}`,
          },
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://europeenchantedkohrong.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bungalows',
        item: 'https://europeenchantedkohrong.com/bungalows',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `https://europeenchantedkohrong.com/bungalows/${slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-4">
        <Link
          href="/bungalows"
          className="inline-flex items-center gap-2 text-[#0C3B73]/60 hover:text-[#0C3B73] text-sm font-medium transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Bungalows
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Gallery */}
        <BungalowGallery images={galleryImages} title={title} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <span className="text-[#00A3C4] text-xs font-bold tracking-[0.3em] uppercase">
                Bungalow
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0C3B73] mt-2 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-500 text-lg mt-2">{subtitle}</p>
              )}
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3 mb-8">
              {maxGuests && (
                <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100">
                  <svg className="w-4 h-4 text-[#00A3C4]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#0C3B73]">{maxGuests} Guests</span>
                </div>
              )}
              {bedType && (
                <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100">
                  <svg className="w-4 h-4 text-[#00A3C4]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM2 9a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V9zM11 9a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V9zM11 14a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#0C3B73]">{bedType}</span>
                </div>
              )}
              {sizeSqm && (
                <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100">
                  <svg className="w-4 h-4 text-[#00A3C4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                  <span className="text-sm font-semibold text-[#0C3B73]">{sizeSqm} m²</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#0C3B73]/20 via-[#00A3C4]/30 to-transparent mb-8" />

            {/* Description */}
            {description && (
              <div className="mb-10">
                <h2 className="text-xl font-serif font-bold text-[#0C3B73] mb-4">About this Bungalow</h2>
                <div
                  className="prose prose-lg max-w-none text-gray-600 prose-headings:text-[#0C3B73] prose-a:text-[#00A3C4]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}

            {/* Amenities */}
            {amenities && amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-bold text-[#0C3B73] mb-5">What&apos;s Included</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((item: string) => {
                    const mapped = amenityIconMap[item]
                    return (
                      <div
                        key={item}
                        className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100"
                      >
                        <span className="text-xl">{mapped?.icon ?? '✦'}</span>
                        <span className="text-sm font-medium text-[#0C3B73]">
                          {mapped?.label ?? item.replace(/_/g, ' ')}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Card header */}
              <div className="bg-gradient-to-br from-[#0C3B73] to-[#00A3C4] px-6 py-6 text-white">
                <h3 className="text-xl font-serif font-bold mb-1">Reservation</h3>
                <p className="text-white/80 text-xs font-light tracking-wide">
                  Check availability &amp; rates online
                </p>
              </div>

              {/* Booking content */}
              <div className="px-6 py-6">
                <ul className="space-y-3 mb-6">
                  {maxGuests && (
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Guests</span>
                      <span className="font-semibold text-[#0C3B73]">Up to {maxGuests}</span>
                    </li>
                  )}
                  {bedType && (
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Bed Type</span>
                      <span className="font-semibold text-[#0C3B73]">{bedType}</span>
                    </li>
                  )}
                  {sizeSqm && (
                    <li className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Room Size</span>
                      <span className="font-semibold text-[#0C3B73]">{sizeSqm} m²</span>
                    </li>
                  )}
                </ul>

                <div className="h-px bg-gray-100 mb-6" />

                {bookingUrl ? (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-gradient-to-r from-[#00A3C4] to-[#0C3B73] text-white rounded-2xl py-4 font-bold text-sm uppercase tracking-widest hover:opacity-90 hover:shadow-lg transition-all duration-300"
                  >
                    Reserve Now
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full block text-center bg-gray-200 text-gray-400 rounded-2xl py-4 font-bold text-sm uppercase tracking-widest cursor-not-allowed"
                  >
                    Not Available
                  </button>
                )}

                <p className="text-center text-xs text-gray-400 mt-3">
                  No charge until you confirm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}