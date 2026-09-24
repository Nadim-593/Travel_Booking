/*
 * components/ui/Loader.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable loading indicators:
 *
 *   <Loader />                    — centered spinner (default)
 *   <Loader type="page" />        — full-page centered spinner
 *   <Loader type="inline" />      — small inline spinner
 *   <SkeletonCard />              — animated skeleton placeholder for TourCards
 *   <SkeletonGrid count={6} />    — grid of skeleton cards
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Spinner component (reused internally)
function Spinner({ size = "md" }) {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };
  return (
    <div
      className={`${sizeMap[size] || sizeMap.md} rounded-full border-slate-200 border-t-emerald-600 animate-spin`}
    />
  );
}

// Default export — a centred loading indicator
export default function Loader({ type = "default", text = "Loading..." }) {
  if (type === "page") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    );
  }

  if (type === "inline") {
    return <Spinner size="sm" />;
  }

  // default
  return (
    <div className="flex items-center justify-center py-16 gap-3">
      <Spinner size="md" />
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
// Mimics the shape of TourCard to prevent layout shift while loading
export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      {/* Image placeholder */}
      <div className="h-52 bg-slate-200 rounded-t-xl" />
      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-slate-200 rounded w-20" />
          <div className="h-3 bg-slate-200 rounded w-16" />
        </div>
        <div className="h-4 bg-slate-200 rounded w-4/5" />
        <div className="h-4 bg-slate-200 rounded w-3/5" />
        <div className="h-3 bg-slate-200 rounded w-2/5" />
        <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
          <div className="h-5 bg-slate-200 rounded w-24" />
          <div className="h-4 bg-slate-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton Grid ────────────────────────────────────────────────────────────
export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
