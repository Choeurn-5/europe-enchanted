import type { Metadata } from 'next';
import AmenitiesHeader from '../components/amenities/AmenitiesHeader';
import AmenitySection from '../components/amenities/AmenitySection';
import AmenitiesIconGrid from '../components/amenities/AmenitiesIconGrid';
import AmenitiesCTA from '../components/amenities/AmenitiesCTA';
import { fetchGlobalAmenities, fetchPage } from '@/lib/laravel/api';

export const metadata: Metadata = {
  title: 'Resort Amenities | Europe Enchanted Koh Rong',
  description: 'Discover the world-class amenities at Europe Enchanted Koh Rong, from our infinity pool and spa to island tours and fine dining.',
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
