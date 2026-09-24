/*
 * components/home/HeroSection.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The above-the-fold hero banner on the homepage.
 *
 * Design:
 *   - Full viewport height with a rich background image
 *   - Semi-transparent dark overlay for text contrast
 *   - Headline, sub-headline, CTA buttons
 *   - Quick stats bar (tours available, destinations, travelers) at the bottom
 *
 * WHY no background-image in CSS?
 *   We use inline style for the background image so the URL can be easily
 *   changed or dynamically fetched later without touching CSS files.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { Search, ArrowRight, Star, Users, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

const HERO_STATS = [
  { value: "50+", label: "Tour Packages" },
  { value: "20+", label: "Destinations" },
  { value: "5,000+", label: "Happy Travelers" },
  { value: "4.8★", label: "Average Rating" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1600&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Hero Content */}
      <div className="relative flex-1 flex items-center">
        <div className="container-custom w-full py-20">
          <div className="max-w-2xl">
            {/* Label pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-600/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Bangladesh's Trusted Travel Platform
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Explore the{" "}
              <span className="text-emerald-400">Heart</span>{" "}
              of Bangladesh
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
              From the mist-wrapped hills of Sajek to the coral shores of Saint Martin's —
              discover Bangladesh with verified, all-inclusive tour packages at transparent
              BDT pricing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/tours">
                <Search className="w-4 h-4" />
                Explore Tours
              </Button>
              <Button variant="outlineWhite" size="lg" href="/tours">
                View Destinations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10">
        <div className="container-custom">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-t-2xl px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
