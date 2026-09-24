/*
 * app/tours/[id]/page.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Individual tour detail page (/tours/1, /tours/2, etc.)
 *
 * This is a SERVER Component — data is read from mock constants at build/render
 * time. No useState needed; the booking widget is a separate Client Component.
 *
 * Sections:
 *   1. Hero image with key stats overlay
 *   2. Breadcrumb navigation
 *   3. Left column: Description, Inclusions/Exclusions, Itinerary, Reviews
 *   4. Right sticky column: Booking Widget (price card + CTA)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Clock, Users, Star, CheckCircle, XCircle,
  ChevronRight, Calendar, ArrowLeft,
} from "lucide-react";
import { MOCK_ALL_TOURS, MOCK_REVIEWS } from "@/utils/constants";
import { formatBDT, formatDuration, formatDate } from "@/utils/formatters";
import BookingWidget from "@/components/booking/BookingWidget";

// ── Helper: Star rating display ────────────────────────────────────────────
function StarRating({ rating, size = "sm" }) {
  const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-slate-200 fill-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

// ── Itinerary Accordion ────────────────────────────────────────────────────
// "use client" kept in a separate component file is cleaner;
// but for a single page we inline a simple non-animated version to avoid
// adding an extra file for now.
function ItineraryItem({ day, title, activities }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-4 p-4 bg-slate-50">
        <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
          D{day}
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
            Day {day}
          </p>
          <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-slate-100">
        <p className="text-sm text-slate-600 leading-relaxed">{activities}</p>
      </div>
    </div>
  );
}

// ── Review Card ─────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  const initials = review.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="p-4 border border-slate-200 rounded-xl">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar circle */}
        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-semibold text-slate-800 text-sm">
              {review.user.name}
            </span>
            <span className="text-xs text-slate-400">
              {formatDate(review.createdAt)}
            </span>
          </div>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
    </div>
  );
}

// ── Page Component (Server Component) ────────────────────────────────────────
export default async function TourDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let tour = null;

  // Try fetching live tour package from backend Express API
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"}/tours/${id}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      tour = data.tour;
    }
  } catch (err) {
    console.warn("[TourDetail] API fetch note:", err.message);
  }

  // Fallback to local catalog if offline or during static compilation
  if (!tour) {
    tour = MOCK_ALL_TOURS.find((t) => t._id === id || t.slug === id);
  }

  // If still not found, render Next.js 404 page
  if (!tour) notFound();

  const tourReviews = MOCK_REVIEWS.filter((r) => r.tour === tour._id);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero Image ───────────────────────────────────────────────────── */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-200">
        <Image
          src={tour.featuredImage}
          alt={tour.destination}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Stats overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="container-custom">
            {/* Featured badge */}
            {tour.isFeatured && (
              <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                ⭐ Featured Package
              </span>
            )}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              {tour.title}
            </h1>
            {/* Quick stats row */}
            <div className="flex flex-wrap items-center gap-4 mt-2 text-white/90 text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {tour.destination}, {tour.division}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {formatDuration(tour.durationDays, tour.durationNights)}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Max {tour.maxGroupSize} guests
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {tour.averageRating} ({tour.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/tours" className="hover:text-emerald-600 transition-colors">
              Tours
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-medium truncate max-w-[200px]">
              {tour.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left Column (main content) ─────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Tour Overview
              </h2>
              <p className="text-slate-600 leading-relaxed">{tour.description}</p>

              {/* Departure info */}
              <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4" />
                <span>
                  <strong>Departure:</strong> {tour.departureLocation}
                </span>
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div>
                  <h3 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Exclusions */}
                <div>
                  <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-3">
                {tour.itinerary.map((day) => (
                  <ItineraryItem
                    key={day.day}
                    day={day.day}
                    title={day.title}
                    activities={day.activities}
                  />
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Traveler Reviews
                </h2>
                {/* Overall rating summary */}
                {tour.totalReviews > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      {tour.averageRating.toFixed(1)}
                    </span>
                    <div>
                      <StarRating rating={tour.averageRating} size="lg" />
                      <p className="text-xs text-slate-500 mt-0.5">
                        {tour.totalReviews} reviews
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {tourReviews.length > 0 ? (
                <div className="space-y-4">
                  {tourReviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border border-slate-200 rounded-xl text-slate-500">
                  <Star className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm">
                    No reviews yet. Be the first to explore and review this tour!
                  </p>
                </div>
              )}

              {/* Sign in to review CTA */}
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm text-emerald-800 font-medium">
                  Traveled with us?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-2 hover:text-emerald-600"
                  >
                    Sign in
                  </Link>{" "}
                  to share your experience.
                </p>
              </div>
            </section>

            {/* Back link */}
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all tours
            </Link>
          </div>

          {/* ── Right Column (Booking Widget) ──────────────────────────── */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-20">
              <BookingWidget tour={tour} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO per tour
export function generateMetadata({ params }) {
  const tour = MOCK_ALL_TOURS.find((t) => t._id === params.id);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: tour.title,
    description: tour.description.slice(0, 160),
  };
}
