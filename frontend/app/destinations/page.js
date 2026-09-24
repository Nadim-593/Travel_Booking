/*
 * app/destinations/page.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Full destinations browse page (/destinations).
 *
 * Shows all Bangladesh destinations in a rich photo grid with tour counts.
 * Also lists tours grouped by division for a catalog-style browsing experience.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { MOCK_DESTINATIONS, MOCK_ALL_TOURS, BANGLADESH_DIVISIONS } from "@/utils/constants";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Destinations",
  description:
    "Explore all of Bangladesh's iconic travel destinations — Sajek, Cox's Bazar, Sundarbans, Saint Martin's Island, Sreemangal and beyond.",
};

// Card for each destination
function DestinationCard({ dest }) {
  return (
    <Link href="/tours" className="group relative block overflow-hidden rounded-2xl h-64 bg-slate-200">
      <Image
        src={dest.image}
        alt={dest.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-1 text-white/70 text-xs mb-1">
          <MapPin className="w-3 h-3" />
          {dest.division} Division
        </div>
        <h3 className="text-white font-bold text-lg leading-tight">{dest.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-white/70 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
            {dest.tourCount} packages
          </span>
          <span className="text-xs text-white font-medium group-hover:underline flex items-center gap-1">
            View Tours <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Division stats
function DivisionStat({ division }) {
  const count = MOCK_ALL_TOURS.filter((t) => t.division === division).length;
  return (
    <Link
      href="/tours"
      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
          <MapPin className="w-4 h-4 text-emerald-600" />
        </div>
        <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
          {division}
        </span>
      </div>
      <span className="text-xs font-semibold text-slate-500 bg-slate-100 group-hover:bg-emerald-100 group-hover:text-emerald-700 px-2 py-0.5 rounded-full transition-colors">
        {count} tour{count !== 1 ? "s" : ""}
      </span>
    </Link>
  );
}

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-slate-900 py-16">
        <div className="container-custom text-center">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Explore Bangladesh
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Popular Destinations
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            From the cloud-kissed hills of Rangamati to the turquoise shores of the Bay of Bengal —
            Bangladesh has a destination for every kind of traveler.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Photo Grid */}
        <div className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="section-label">Top Picks</span>
              <h2 className="section-title">Iconic Destinations</h2>
            </div>
            <Button variant="outline" size="sm" href="/tours">
              Browse All Tours <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_DESTINATIONS.map((dest) => (
              <DestinationCard key={dest.name} dest={dest} />
            ))}
          </div>
        </div>

        {/* Divisions section */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <span className="section-label">All of Bangladesh</span>
            <h2 className="section-title">Browse by Division</h2>
            <p className="section-subtitle">
              Find tours across all 8 administrative divisions of Bangladesh.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BANGLADESH_DIVISIONS.map((div) => (
              <DivisionStat key={div} division={div} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
