import type { Metadata } from 'next';
import AboutHero from '@/app/components/about/AboutHero';
import AboutStory from '@/app/components/about/AboutStory';
import AboutValues from '@/app/components/about/AboutValues';
import AboutExperience from '@/app/components/about/AboutExperience';
import AboutCTA from '@/app/components/about/AboutCTA';
import { fetchPage } from '@/lib/laravel/api';

export const metadata: Metadata = {
  title: 'About Us & Our Story | Europe Enchanted Koh Rong',
  description:
    'Discover the story of Europe Enchanted Bungalows & Resort on Koh Rong Island, Cambodia. Handcrafted wooden architecture, beachfront tranquility, and authentic Khmer hospitality.',
  openGraph: {
    title: 'About Us & Our Story | Europe Enchanted Koh Rong',
    description:
      'Discover the story of Europe Enchanted Bungalows & Resort on Koh Rong Island, Cambodia. Handcrafted wooden architecture, beachfront tranquility, and authentic Khmer hospitality.',
    url: 'https://europeenchantedkohrong.com/about',
    images: ['/images/common/resort-4.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us & Our Story | Europe Enchanted Koh Rong',
    description:
      'Discover the story of Europe Enchanted Bungalows & Resort on Koh Rong Island, Cambodia.',
    images: ['/images/common/resort-4.jpg'],
  },
};

export default async function AboutPage() {
  const pageData = await fetchPage('about').catch(() => null);
  const content = pageData?.content || [];
  const heroData = content.find((c: any) => c.type === 'hero')?.data;
  const storyData = content.find((c: any) => c.type === 'story')?.data;

  const valuesData = content.find((c: any) => c.type === 'values')?.data;
  const experienceData = content.find((c: any) => c.type === 'experience')?.data;
  const ctaData = content.find((c: any) => c.type === 'cta')?.data;

  return (
    <main className="min-h-screen bg-[#f8f9fc] flex flex-col">
      {/* Hero Section */}
      <AboutHero data={heroData} />

      {/* Story & History Section */}
      <AboutStory data={storyData} />

      {/* Values & Core Pillars */}
      <AboutValues data={valuesData} />

      {/* Guest Experience Steps */}
      <AboutExperience data={experienceData} />

      {/* Bottom CTA */}
      <AboutCTA data={ctaData} />
    </main>
  );
}
