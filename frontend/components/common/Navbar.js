/*
 * components/common/Navbar.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Responsive top navigation bar.
 *
 * Features:
 *   - Desktop horizontal nav with links
 *   - Hamburger-toggled mobile menu (no extra libraries needed)
 *   - Sticky with a white background on scroll (via scroll event listener)
 *   - Auth-aware: shows Login/Register OR user name + logout (Phase 2)
 *   - Uses "use client" because it manages state (mobile menu, scroll)
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Add shadow and background when user scrolls down
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "shadow-sm border-b border-slate-100"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* ── Brand Logo ───────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Deshiyo
              </span>
              <span className="text-lg font-bold text-emerald-600 tracking-tight">
                {" "}Travels
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation Links ──────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Auth Buttons ─────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {user.name.split(" ")[0]}
                  {isAdmin && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </Link>
                {isAdmin && (
                  <Button variant="secondary" size="sm" href="/admin">
                    Admin Panel
                  </Button>
                )}
                <Button variant="outline" size="sm" href="/dashboard">
                  My Bookings
                </Button>
                <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:bg-red-50">
                  Log Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" href="/login">
                  Sign In
                </Button>
                <Button variant="primary" size="sm" href="/register">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* ── Mobile Menu Toggle ────────────────────────────────────── */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Panel ──────────────────────────────────────────── */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="container-custom py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-slate-600 font-medium flex items-center justify-between">
                    <span>Signed in as <strong>{user.name}</strong></span>
                    {isAdmin && (
                      <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  {isAdmin && (
                    <Button variant="secondary" size="md" href="/admin" fullWidth>
                      Admin Control Center
                    </Button>
                  )}
                  <Button variant="outline" size="md" href="/dashboard" fullWidth>
                    My Bookings
                  </Button>
                  <Button variant="danger" size="md" onClick={logout} fullWidth>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="md" href="/login" fullWidth>
                    Sign In
                  </Button>
                  <Button variant="primary" size="md" href="/register" fullWidth>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
