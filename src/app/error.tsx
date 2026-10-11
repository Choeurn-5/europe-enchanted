'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center px-6 py-32 text-center">
      <div className="max-w-md mx-auto">
        <span className="text-amber-600 text-xs font-bold tracking-[0.3em] uppercase">
          Something went wrong
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0C3B73] mt-3 mb-4">
          Island Hiccup
        </h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          We encountered an unexpected error while loading this page. Please try refreshing or return to the main grounds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-[#00A3C4] hover:bg-[#0C3B73] text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-[#0C3B73]/30 text-[#0C3B73] hover:bg-[#0C3B73] hover:text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
