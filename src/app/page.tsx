// src/app/page.tsx
import Hero from '@/app/components/home/Hero';
import IntroStrip from '@/app/components/home/IntroStrip';
import FeaturedBungalows from '@/app/components/home/FeaturedBungalows';
import AmenitiesStrip from '@/app/components/home/AmenitiesStrip';
import DayInTheLife from '@/app/components/home/DayInTheLife';
import GalleryPreview from '@/app/components/home/GalleryPreview';
import Testimonials from '@/app/components/home/Testimonials';
import LocationMap from '@/app/components/home/LocationMap';
import FinalCTA from '@/app/components/home/FinalCTA';
import { fetchPage, fetchGlobalAmenities } from '@/lib/laravel/api';

export default async function Home() {
  // Fetch data from Laravel backend concurrently
  const [pageData, amenities] = await Promise.all([
    fetchPage('home'),
    fetchGlobalAmenities(),
  ]);

  // Extract blocks from page content
  const heroBlock = pageData?.content?.find((block: any) => block.type === 'hero')?.data || {};
  const introBlock = pageData?.content?.find((block: any) => block.type === 'intro')?.data || {};
  const dayInTheLifeBlock = pageData?.content?.find((block: any) => block.type === 'day_in_the_life')?.data || {};
  const galleryPreviewBlock = pageData?.content?.find((block: any) => block.type === 'gallery_preview')?.data || {};
  const testimonialsBlock = pageData?.content?.find((block: any) => block.type === 'testimonials')?.data || {};
  const locationMapBlock = pageData?.content?.find((block: any) => block.type === 'location_map')?.data || {};
  const finalCtaBlock = pageData?.content?.find((block: any) => block.type === 'final_cta')?.data || {};

  return (
    <main>
      <Hero 
        heading={heroBlock.heading} 
        subheading={heroBlock.subheading} 
        youtubeId={heroBlock.youtube_id} 
      />
      <IntroStrip 
        heading={introBlock.heading}
        subheading={introBlock.subheading}
        content={introBlock.content}
        image={introBlock.image}
      />
      <FeaturedBungalows />
      <AmenitiesStrip amenities={amenities} />
      <DayInTheLife 
        eyebrow={dayInTheLifeBlock.eyebrow}
        heading={dayInTheLifeBlock.heading}
        description={dayInTheLifeBlock.description}
        moments={dayInTheLifeBlock.moments}
      />
      <GalleryPreview 
        eyebrow={galleryPreviewBlock.eyebrow}
        heading={galleryPreviewBlock.heading}
        description={galleryPreviewBlock.description}
      />
      <Testimonials 
        eyebrow={testimonialsBlock.eyebrow}
        heading={testimonialsBlock.heading}
        description={testimonialsBlock.description}
      />
      <LocationMap 
        eyebrow={locationMapBlock.eyebrow}
        heading={locationMapBlock.heading}
        description={locationMapBlock.description}
      />
      <FinalCTA 
        eyebrow={finalCtaBlock.eyebrow}
        heading={finalCtaBlock.heading}
        description={finalCtaBlock.description}
      />
    </main>
  );
}