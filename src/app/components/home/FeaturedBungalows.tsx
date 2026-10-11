// src/app/components/home/FeaturedBungalows.tsx
import Link from 'next/link';
import { fetchBungalows } from '@/lib/laravel/api';
import BungalowsGrid from '@/app/components/BungalowsGrid';
import FeaturedBungalowsHeader from '@/app/components/home/FeaturedBungalowsHeader';

export default async function FeaturedBungalows() {
  let featured: any[] = [];
  try {
    const bungalows = await fetchBungalows();
    featured = (bungalows || []).slice(0, 3);
  } catch (error) {
    console.error('Failed to fetch featured bungalows:', error);
  }

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FeaturedBungalowsHeader />

        <BungalowsGrid bungalows={featured} />

        <div className="mt-14 flex justify-center">
          <Link
            href="/bungalows"
            className="rounded-full border border-[#0C3B73]/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0C3B73] transition-colors duration-300 hover:border-[#0C3B73] hover:bg-[#0C3B73] hover:text-white"
          >
            View All Bungalows
          </Link>
        </div>
      </div>
    </section>
  );
}
