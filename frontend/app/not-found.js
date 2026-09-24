/*
 * app/not-found.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom 404 page — shown automatically by Next.js when a route doesn't exist.
 *
 * Next.js App Router convention: name the file `not-found.js` and place it
 * in the `app/` directory. No extra configuration needed.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="text-center max-w-md px-4">
        {/* Icon */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-9 h-9 text-emerald-500" />
        </div>

        {/* 404 Number */}
        <h1 className="text-7xl font-extrabold text-slate-200 mb-2 leading-none">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Destination Not Found
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Looks like you've wandered off the map. The page you're looking for
          doesn't exist or has been moved to a new location.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="lg" href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <Button variant="outline" size="lg" href="/tours">
            Browse Tours
          </Button>
        </div>
      </div>
    </div>
  );
}
