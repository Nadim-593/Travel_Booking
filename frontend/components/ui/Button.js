/*
 * components/ui/Button.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable Button component.
 *
 * WHY: Instead of typing Tailwind class strings in every component, we
 * define ALL button variants once here. This keeps styling consistent and
 * makes global design changes a one-line fix.
 *
 * VARIANTS:
 *   primary   → solid green button (main CTAs — "Book Now", "View Tour")
 *   secondary → solid amber button (secondary actions — "View All")
 *   outline   → bordered green button (less prominent actions)
 *   ghost     → no background (navigation links, icons)
 *   danger    → red button (destructive actions — "Cancel Booking")
 *
 * SIZES:
 *   sm  → small (badge-level)
 *   md  → default
 *   lg  → prominent CTA
 *
 * USAGE:
 *   <Button variant="primary" size="lg" onClick={handleBook}>Book Now</Button>
 *   <Button variant="outline" href="/tours" as="link">Explore Tours</Button>
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from "next/link";

const variantClasses = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-600 hover:border-emerald-700 shadow-sm",
  secondary:
    "bg-amber-500 text-white hover:bg-amber-600 border border-amber-500 hover:border-amber-600 shadow-sm",
  outline:
    "bg-transparent text-emerald-600 hover:bg-emerald-50 border border-emerald-600",
  outlineWhite:
    "bg-transparent text-white hover:bg-white hover:text-emerald-700 border border-white",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 border border-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 border border-red-600 hover:border-red-700 shadow-sm",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-7 py-3.5 text-base rounded-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,       // If provided, renders as <Link> instead of <button>
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
  ...rest
}) {
  const baseClasses = [
    "inline-flex items-center justify-center gap-2",
    "font-semibold",
    "transition-all duration-150",
    "cursor-pointer select-none",
    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...rest}
    >
      {children}
    </button>
  );
}
