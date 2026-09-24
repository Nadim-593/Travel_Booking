/*
 * components/home/PopularDestinations.js
 * ─────────────────────────────────────────────────────────────────────────────
 * A visual image-grid showcasing Bangladesh's iconic destinations.
 *
 * Design:
 *   - Slate-50 background to visually separate from white FeaturedTours section
 *   - Large hero-style tiles in a magazine-layout grid
 *   - Each tile has an image, gradient overlay, destination name, and tour count
 *   - Hover lifts the card slightly (via .card CSS class)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { MOCK_DESTINATIONS } from "@/utils/constants";

export default function PopularDestinations() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="section-label">Explore Bangladesh</span>
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle mx-auto text-center">
            Bangladesh holds wonders in every direction — from Himalayan foothills
            to mangrove coastlines. Where will you go next?
          </p>
        </div>

        {/*
         * Magazine-style grid:
         *   Mobile:  2-column equal tiles
         *   Tablet:  3-column equal tiles
         *   Desktop: 3-column with first tile taking up 2 rows (double height)
         *
         * CSS Grid area trick: first item spans 2 rows on desktop for visual hierarchy
         */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {MOCK_DESTINATIONS.map((dest, index) => (
            <Link
              key={dest.name}
              href="/tours"
              className={`group relative overflow-hidden rounded-xl ${
                index === 0 ? "md:row-span-2" : ""
              }`}
            >
              {/* Destination Image */}
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Destination Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1 text-white/80 text-xs mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{dest.division} Division</span>
                </div>
                <h3 className="text-white font-bold text-base leading-tight">
                  {dest.name}
                </h3>
                <span className="inline-block mt-1.5 text-xs text-white/70 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {dest.tourCount} tour{dest.tourCount !== 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
