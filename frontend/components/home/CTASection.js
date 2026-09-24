/*
 * components/home/CTASection.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Call-to-Action banner at the bottom of the homepage.
 *
 * Design:
 *   - Deep emerald gradient background
 *   - Compelling headline + subtext
 *   - Two buttons: "Browse Tours" (white solid) + "Contact Us" (white outline)
 *   - Responsive layout: stacked on mobile, side-by-side on desktop
 *
 * Purpose:
 *   Captures undecided visitors who have scrolled through the full page.
 *   The visual contrast (green on white → white on green) creates a memorable
 *   closing moment.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { ArrowRight, Phone } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section
      className="section-padding"
      style={{
        background: "linear-gradient(135deg, #065f46 0%, #16a34a 60%, #15803d 100%)",
      }}
    >
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left: Text Content */}
          <div className="text-center lg:text-left max-w-xl">
            {/* Label */}
            <div className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Start Your Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Ready to Discover Bangladesh?
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              Join thousands of travelers who have explored Bangladesh with Deshiyo Travels.
              Browse verified packages, book your seat, and leave the rest to us.
            </p>

            {/* Trust markers */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-5 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                ✓ No Hidden Fees
              </span>
              <span className="flex items-center gap-1.5">
                ✓ Verified Operators
              </span>
              <span className="flex items-center gap-1.5">
                ✓ 24/7 Support
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="/tours"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-7 py-3.5 rounded-lg font-semibold text-base transition-colors shadow-lg"
            >
              Browse All Tours
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+8801700000000"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white hover:bg-white/10 border-2 border-white/70 hover:border-white px-7 py-3.5 rounded-lg font-semibold text-base transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
