/*
 * components/tours/TourCard.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The primary tour package card displayed in grids across the site.
 *
 * Props:
 *   tour  — object matching the Tour schema (see constants.js mock data)
 *
 * Displays:
 *   - Tour image with "Featured" badge overlay if applicable
 *   - Division badge and star rating
 *   - Tour title, destination, departure location
 *   - Duration and group size info
 *   - Price per person in BDT (৳)
 *   - "View Details" CTA link
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { formatBDT, formatDuration } from "@/utils/formatters";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";

export default function TourCard({ tour }) {
  const {
    _id,
    slug,
    title,
    destination,
    division,
    price,
    pricePerPerson,
    durationDays,
    durationNights,
    maxGroupSize,
    featuredImage,
    averageRating,
    totalReviews,
    isFeatured,
    departureLocation,
  } = tour;

  const tourIdentifier = slug || _id;
  const displayPrice = price !== undefined ? price : pricePerPerson || 0;

  return (
    <Link href={`/tours/${tourIdentifier}`} className="group block">
      <article className="card h-full flex flex-col">
        {/* ── Image Container ───────────────────────────────────────── */}
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <Image
            src={featuredImage || PLACEHOLDER_IMAGE}
            alt={`${destination} tour`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Featured badge */}
          {isFeatured && (
            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              ⭐ Featured
            </span>
          )}

          {/* Division badge */}
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {division}
          </span>

          {/* Duration pill at bottom of image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDuration(durationDays, durationNights)}</span>
          </div>
        </div>

        {/* ── Card Body ─────────────────────────────────────────────── */}
        <div className="p-4 flex flex-col flex-1">

          {/* Rating Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-semibold text-slate-700">
                {averageRating > 0 ? averageRating.toFixed(1) : "New"}
              </span>
              {totalReviews > 0 && (
                <span className="text-xs text-slate-400">
                  ({totalReviews})
                </span>
              )}
            </div>

            {/* Group size */}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Users className="w-3.5 h-3.5" />
              <span>Max {maxGroupSize}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {title}
          </h3>

          {/* Destination & Departure */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span>
              {destination}
              {departureLocation && (
                <> · Departs from {departureLocation}</>
              )}
            </span>
          </div>

          {/* Spacer pushes price to bottom */}
          <div className="flex-1" />

          {/* Price Row */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <span className="text-xs text-slate-500">Starting from</span>
              <div className="text-base font-bold text-emerald-700">
                {formatBDT(displayPrice)}
                <span className="text-xs text-slate-500 font-normal ml-1">
                  / person
                </span>
              </div>
            </div>
            <span className="text-xs text-emerald-600 font-semibold group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
