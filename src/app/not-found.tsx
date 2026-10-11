import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center px-6 py-32 text-center">
      <div className="max-w-md mx-auto">
        <span className="text-[#00A3C4] text-xs font-bold tracking-[0.3em] uppercase">
          404 Error
        </span>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0C3B73] mt-3 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          The island path you were looking for seems to have drifted with the tide. Let’s get you back to paradise.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#00A3C4] hover:bg-[#0C3B73] text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-lg transition-all duration-300"
          >
            Return Home
          </Link>
          <Link
            href="/bungalows"
            className="border border-[#0C3B73]/30 text-[#0C3B73] hover:bg-[#0C3B73] hover:text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300"
          >
            Explore Bungalows
          </Link>
        </div>
      </div>
    </main>
  );
}
