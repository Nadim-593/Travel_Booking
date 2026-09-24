/*
 * components/home/FeaturedTours.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Displays a curated 3-column grid of featured tour packages on the homepage.
 *
 * Data source: Fetches live featured tours from backend Express API,
 * with fallback to MOCK_FEATURED_TOURS if offline.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { ArrowRight } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import Button from "@/components/ui/Button";
import { MOCK_FEATURED_TOURS } from "@/utils/constants";

export default async function FeaturedTours() {
  let featuredTours = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"}/tours?featured=true`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      if (data && data.tours && data.tours.length > 0) {
        featuredTours = data.tours.slice(0, 3);
      }
    }
  } catch (err) {
    console.warn("[FeaturedTours] Live API fetch fallback:", err.message);
  }

  // Fallback to local mock data if backend not reachable
  if (featuredTours.length === 0) {
    featuredTours = MOCK_FEATURED_TOURS.filter((t) => t.isFeatured).slice(0, 3);
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="section-label">Top Picks</span>
            <h2 className="section-title">Featured Tour Packages</h2>
            <p className="section-subtitle">
              Hand-picked, verified packages to Bangladesh&apos;s most loved
              destinations — all-inclusive and hassle-free.
            </p>
          </div>
          <Button variant="outline" size="md" href="/tours" className="flex-shrink-0">
            View All Tours
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Tour Cards Grid */}
        {featuredTours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500">
            <p>No featured tours available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
