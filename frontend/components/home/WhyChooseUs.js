/*
 * components/home/WhyChooseUs.js
 * ─────────────────────────────────────────────────────────────────────────────
 * "Why Choose Deshiyo Travels?" feature section — builds trust and credibility.
 *
 * Design:
 *   - White background
 *   - 6 feature cards in a 3-column grid
 *   - Each card: icon (in emerald circle), title, description
 *   - Clean, minimal — no animations, just solid typography and iconography
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  Shield,
  Tag,
  MapPin,
  Headphones,
  Users,
  Leaf,
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/utils/constants";

// Maps the icon string from constants.js → actual Lucide icon component
const ICON_MAP = {
  shield: Shield,
  tag: Tag,
  "map-pin": MapPin,
  headphones: Headphones,
  users: Users,
  leaf: Leaf,
};

function FeatureCard({ title, description, icon }) {
  const IconComponent = ICON_MAP[icon] || Shield;

  return (
    <div className="p-6 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-200">
      {/* Icon */}
      <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
        <IconComponent className="w-5 h-5 text-emerald-600" />
      </div>

      {/* Text */}
      <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="section-label">Why Us?</span>
          <h2 className="section-title">Why Travelers Choose Deshiyo</h2>
          <p className="section-subtitle mx-auto text-center">
            We are not just a booking platform — we are your local travel partner,
            committed to safe, enriching, and transparent journeys across Bangladesh.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_CHOOSE_US.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
