import type { Metadata } from 'next';
import AmenitiesHeader from '../components/amenities/AmenitiesHeader';
import AmenitySection from '../components/amenities/AmenitySection';
import AmenitiesIconGrid from '../components/amenities/AmenitiesIconGrid';
import AmenitiesCTA from '../components/amenities/AmenitiesCTA';
import { fetchGlobalAmenities, fetchPage } from '@/lib/laravel/api';

export const metadata: Metadata = {
  title: 'Resort Amenities & Facilities | Europe Enchanted Koh Rong',
  description:
    'Discover the world-class amenities at Europe Enchanted Koh Rong, including our beachfront infinity pool, tropical cocktail bar, seaside dining, island excursions, and high-speed WiFi.',
  alternates: {
    canonical: 'https://europeenchantedkohrong.com/amenities',
  },
  openGraph: {
    title: 'Resort Amenities & Facilities | Europe Enchanted Koh Rong',
    description:
      'Discover the world-class amenities at Europe Enchanted Koh Rong, including our beachfront infinity pool, tropical cocktail bar, seaside dining, and island excursions.',
    url: 'https://europeenchantedkohrong.com/amenities',
    images: [
      {
        url: '/images/common/resort-4.jpg',
        width: 1200,
        height: 630,
        alt: 'Amenities at Europe Enchanted Resort',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resort Amenities & Facilities | Europe Enchanted Koh Rong',
    description:
      'Discover beachfront infinity pool, tropical cocktail bar, seaside dining, and island excursions.',
    images: ['/images/common/resort-4.jpg'],
  },
};

export default async function AmenitiesPage() {
  const [globalAmenities, pageData] = await Promise.all([
    fetchGlobalAmenities(),
    fetchPage('amenities').catch(() => null)
  ]);

  const content = pageData?.content || [];
  const headerData = content.find((c: any) => c.type === 'header')?.data;
  const sections = content.filter((c: any) => c.type === 'amenity_section');
  const ctaData = content.find((c: any) => c.type === 'cta')?.data;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <AmenitiesHeader data={headerData} />

      {sections.map((section: any, index: number) => (
        <AmenitySection
          key={index}
          eyebrow={section.data.eyebrow}
          heading={section.data.heading}
          description={section.data.description}
          details={section.data.details}
          image={section.data.image}
          imageAlt={section.data.imageAlt}
          reverse={section.data.reverse}
          bg={section.data.bg}
        />
      ))}

      <AmenitiesIconGrid apiAmenities={globalAmenities} />
      <AmenitiesCTA data={ctaData} />
    </main>
  );
}
