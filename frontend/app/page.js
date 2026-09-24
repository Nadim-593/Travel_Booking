/*
 * app/page.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The homepage (route: "/").
 *
 * WHY is this a Server Component (no "use client")?
 *   In Next.js App Router, files are Server Components by default.
 *   This page only composes section components — it does no client-side
 *   event handling or useState, so there's no need to opt into "use client".
 *   Server Components render faster and ship less JavaScript to the browser.
 *
 * Structure:
 *   1. HeroSection        — Above-the-fold banner with background image and CTA
 *   2. FeaturedTours      — Grid of top 3 featured tour packages
 *   3. PopularDestinations — Photo grid of iconic Bangladeshi destinations
 *   4. WhyChooseUs        — 6 trust-building feature cards
 *   5. CTASection         — Closing call-to-action banner
 *
 * Navbar and Footer are rendered by the root layout (app/layout.js)
 * and are NOT imported here — they appear automatically on every page.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import HeroSection from "@/components/home/HeroSection";
import FeaturedTours from "@/components/home/FeaturedTours";
import PopularDestinations from "@/components/home/PopularDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";

export const metadata = {
  title: "Deshiyo Travels — Discover Bangladesh",
  description:
    "Explore the beauty of Bangladesh with Deshiyo Travels. Book verified tour packages to Sajek, Cox's Bazar, Sundarbans, Saint Martin's Island, Sreemangal, and more.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTours />
      <PopularDestinations />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
