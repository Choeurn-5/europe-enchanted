export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="w-14 h-14 rounded-full border-2 border-[#00A3C4]/20 border-t-[#00A3C4] animate-spin" />
        <div className="absolute w-8 h-8 rounded-full border-2 border-[#0C3B73]/20 border-b-[#0C3B73] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#0C3B73]/60 animate-pulse">
        Loading Paradise...
      </p>
    </div>
  );
}
