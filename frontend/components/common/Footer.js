/*
 * components/common/Footer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Site-wide footer component.
 *
 * Structure:
 *   - 4-column grid on desktop (collapses to 2 on tablet, 1 on mobile)
 *   - Column 1: Brand description and social links
 *   - Column 2: Quick links to main pages
 *   - Column 3: Popular destinations
 *   - Column 4: Contact info
 *   - Bottom bar: Copyright
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { MapPin, Phone, Mail, Globe, MessageCircle, Share2 } from "lucide-react";

const quickLinks = [
  { label: "Browse All Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "About Deshiyo", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
];

const popularDestinations = [
  { label: "Sajek Valley", href: "/tours" },
  { label: "Cox's Bazar", href: "/tours" },
  { label: "Sundarbans", href: "/tours" },
  { label: "Saint Martin's Island", href: "/tours" },
  { label: "Sreemangal", href: "/tours" },
  { label: "Bandarban", href: "/tours" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* ── Main Footer Content ─────────────────────────────────────────── */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand ───────────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Deshiyo</span>
                <span className="text-lg font-bold text-emerald-400"> Travels</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Your trusted partner for discovering the breathtaking beauty of Bangladesh.
              Verified tour packages, transparent pricing, and unforgettable experiences.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-md bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-md bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-md bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links ─────────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Destinations ───────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Popular Destinations
            </h3>
            <ul className="space-y-2.5">
              {popularDestinations.map((dest) => (
                <li key={dest.label}>
                  <Link
                    href={dest.href}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact ─────────────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">
                  Dhanmondi 15, Dhaka 1209, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:hello@deshiyotravels.com"
                  className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  hello@deshiyotravels.com
                </a>
              </li>
            </ul>
            {/* Office Hours */}
            <div className="mt-5 p-3 bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-400 font-medium">Office Hours</p>
              <p className="text-xs text-slate-300 mt-1">
                Sun – Thu: 9:00 AM – 6:00 PM
              </p>
              <p className="text-xs text-slate-300">
                Fri – Sat: 10:00 AM – 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ──────────────────────────────────────────────────── */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              &copy; {currentYear} Deshiyo Travels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
