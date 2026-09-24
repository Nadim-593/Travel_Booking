/*
 * app/(auth)/layout.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout for the authentication route group: /login and /register.
 *
 * WHY a route group (auth)?
 *   The parentheses in (auth) create a "route group" — it groups related pages
 *   without affecting the URL. /login stays /login (not /auth/login).
 *   But they share this dedicated layout that:
 *     - Removes the standard Navbar and Footer (not needed on auth pages)
 *     - Centers the form card on a soft background
 *     - Adds a top-left brand link back to home
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { MapPin } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Minimal top bar */}
      <div className="p-4 sm:p-6">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-bold text-slate-800">
            Deshiyo<span className="text-emerald-600"> Travels</span>
          </span>
        </Link>
      </div>

      {/* Centered form area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer note */}
      <div className="text-center py-4 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Deshiyo Travels. All rights reserved.
      </div>
    </div>
  );
}
