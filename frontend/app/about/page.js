/*
 * app/about/page.js
 * ─────────────────────────────────────────────────────────────────────────────
 * About Us page (/about).
 *
 * Sections:
 *   1. Hero with mission statement
 *   2. Stats row (years, trips, destinations, rating)
 *   3. Our Story narrative
 *   4. Our Values / pillars
 *   5. Meet the Team
 *   6. CTA strip
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Image from "next/image";
import Link from "next/link";
import { Heart, Shield, Leaf, Users, Star, MapPin } from "lucide-react";
import { MOCK_TEAM_MEMBERS } from "@/utils/constants";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Deshiyo Travels — our mission, story, team, and commitment to responsible domestic tourism in Bangladesh.",
};

const STATS = [
  { value: "6+", label: "Years of Experience" },
  { value: "5,000+", label: "Happy Travelers" },
  { value: "20+", label: "Destinations Covered" },
  { value: "4.8", label: "Average Rating" },
];

const VALUES = [
  {
    icon: Heart,
    title: "Passion for Bangladesh",
    description:
      "We genuinely love our country and believe every Bangladeshi and visitor deserves to experience its full beauty — from the Chittagong Hill Tracts to the Sundarbans delta.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Every operator is vetted. Every itinerary is reviewed. We never compromise on traveler safety, hygiene standards, or emergency preparedness.",
  },
  {
    icon: Leaf,
    title: "Responsible Tourism",
    description:
      "We prioritize eco-conscious stays, local community employment, and low-impact travel practices to preserve Bangladesh's natural heritage.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description:
      "Our tours support local guides, tribal communities, small restaurants, and handcraft artisans — your booking contributes directly to local livelihoods.",
  },
];

function TeamCard({ member }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-56 bg-slate-100">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900">{member.name}</h3>
        <p className="text-xs font-semibold text-emerald-600 mb-2">{member.role}</p>
        <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        className="relative py-24 flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative container-custom text-center">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto leading-tight">
            We Believe Bangladesh Deserves to be Explored
          </h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Deshiyo Travels was born from a simple love for our country — and a frustration
            with how hard it was to plan a safe, transparent, and memorable domestic trip.
          </p>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div className="bg-emerald-600">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-emerald-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom section-padding space-y-16">
        {/* ── Our Story ─────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-label">How We Started</span>
            <h2 className="section-title mb-4">From a Weekend Trip to a Movement</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
              <p>
                It started in 2018, when our founder Mahbub Rahman tried to plan a weekend
                trip to Sajek Valley and couldn't find a single reliable, transparent
                tour operator online. Prices were hidden, itineraries were vague, and
                safety information was non-existent.
              </p>
              <p>
                He made the trip anyway — and fell completely in love with what Bangladesh
                had to offer. He also realized how many people were missing out simply
                because planning a domestic tour felt too complicated.
              </p>
              <p>
                Deshiyo Travels launched in 2019 with 3 packages and a single rule:
                every detail must be transparent, every operator personally vetted,
                and every traveler treated like family.
              </p>
              <p>
                Today, we offer 50+ verified packages, have served 5,000+ travelers,
                and are on a mission to make every corner of Bangladesh accessible
                to everyone.
              </p>
            </div>
          </div>
          <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80"
              alt="Sajek Valley"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* ── Values ────────────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 p-5 border border-slate-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors"
              >
                <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Team ──────────────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <span className="section-label">The People Behind It</span>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle mx-auto text-center">
              A small but passionate team dedicated to making your Bangladesh trip
              unforgettable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_TEAM_MEMBERS.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Explore Bangladesh?
          </h2>
          <p className="text-slate-400 mb-7 max-w-md mx-auto text-sm leading-relaxed">
            Join thousands of travelers who have discovered the beauty of their home country
            through Deshiyo Travels.
          </p>
          <Button variant="primary" size="lg" href="/tours">
            Browse Our Tours
          </Button>
        </section>
      </div>
    </div>
  );
}
