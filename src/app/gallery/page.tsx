import type { Metadata } from 'next';
import GalleryHeader from '@/app/components/gallery/GalleryHeader';
import GalleryGrid, { GalleryItem } from '@/app/components/gallery/GalleryGrid';
import GalleryCTA from '@/app/components/gallery/GalleryCTA';
import { fetchGalleryItems, fetchBungalows, fetchPage } from '@/lib/laravel/api';
import { getImageUrl } from '@/lib/utils';

export const revalidate = 3600; // ISR: Revalidate once per hour

export const metadata: Metadata = {
  title: 'Resort Photo Gallery | Europe Enchanted Koh Rong',
  description:
    'Browse photos of Europe Enchanted Resort on Koh Rong Island, Cambodia. View our beachfront bungalows, private pool, tropical dining, and crystal-clear ocean views.',
  alternates: {
    canonical: 'https://europeenchantedkohrong.com/gallery',
  },
  openGraph: {
    title: 'Resort Photo Gallery | Europe Enchanted Koh Rong',
    description:
      'Browse photos of Europe Enchanted Resort on Koh Rong Island, Cambodia. Beachfront wooden bungalows, turquoise waters, and tropical serenity.',
    url: 'https://europeenchantedkohrong.com/gallery',
    images: [
      {
        url: '/images/common/resort-4.jpg',
        width: 1200,
        height: 630,
        alt: 'Photo Gallery of Europe Enchanted Resort',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resort Photo Gallery | Europe Enchanted Koh Rong',
    description:
      'Browse photos of Europe Enchanted Resort on Koh Rong Island, Cambodia.',
    images: ['/images/common/resort-4.jpg'],
  },
};

const categoryLabelMap: Record<string, string> = {
  bungalows: 'Bungalows',
  beach: 'Beach & Ocean',
  dining: 'Dining & Leisure',
  activities: 'Island Life',
};

export default async function GalleryPage() {
  const pageData = await fetchPage('gallery').catch(() => null);
  const content = pageData?.content || [];
  const headerData = content.find((c: any) => c.type === 'header')?.data;
  const ctaData = content.find((c: any) => c.type === 'cta')?.data;

  let dynamicItems: GalleryItem[] = [];

  try {
    const galleryItems = await fetchGalleryItems();
    
    // 1. If Laravel API has gallery items, prioritize them
    if (galleryItems && galleryItems.length > 0) {
      dynamicItems = galleryItems
        .filter((item: any) => Boolean(item.featured_image))
        .map((item: any) => {
          const catKey = (item.category?.toLowerCase() || 'bungalows') as GalleryItem['category'];
          const validCategory = ['bungalows', 'beach', 'dining', 'activities'].includes(catKey)
            ? catKey
            : 'bungalows';

          let spanChoice: GalleryItem['span'] = 'normal';
          if (item.span === 'col-span-1 md:col-span-2 row-span-2') spanChoice = 'tall';
          else if (item.span === 'col-span-1 md:col-span-2 row-span-1') spanChoice = 'wide';
          else if (item.span === 'tall' || item.span === 'wide' || item.span === 'normal') spanChoice = item.span as GalleryItem['span'];

          return {
            id: item.id.toString(),
            src: getImageUrl(item.featured_image),
            alt: item.caption || item.title,
            title: item.title,
            category: validCategory,
            categoryLabel: categoryLabelMap[validCategory] || 'Resort',
            span: spanChoice,
          };
        });
    } else {
      // 2. Fallback: Pull images from Bungalows if Gallery is empty
      const bungalows = await fetchBungalows();

      bungalows.forEach((bungalow: any) => {
        if (bungalow.featured_image) {
          dynamicItems.push({
            id: `b-${bungalow.id}-featured`,
            src: getImageUrl(bungalow.featured_image),
            alt: bungalow.title,
            title: bungalow.title,
            category: 'bungalows',
            categoryLabel: 'Bungalows',
            span: 'tall',
          });
        }

        if (bungalow.gallery_images && bungalow.gallery_images.length > 0) {
          dynamicItems.push({
            id: `b-${bungalow.id}-g1`,
            src: getImageUrl(bungalow.gallery_images[0]),
            alt: `${bungalow.title} Gallery View`,
            title: `${bungalow.title} Interior`,
            category: 'bungalows',
            categoryLabel: 'Bungalows',
            span: 'normal',
          });
        }
      });
    }
  } catch (err) {
    console.error('Error fetching gallery items:', err);
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] flex flex-col">
      {/* Hero Header */}
      <GalleryHeader data={headerData} />

      {/* Main Gallery Grid with Category Filters & Lightbox */}
      <GalleryGrid dynamicItems={dynamicItems} />

      {/* Booking & Experience CTA */}
      <GalleryCTA data={ctaData} />
    </main>
  );
}
