/*
 * components/ui/Badge.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Small status/label pill badges.
 *
 * Used for:
 *  - Booking status ("pending", "confirmed", "cancelled", "rejected", "completed")
 *  - Tour duration labels
 *  - Division tags on tour cards
 * ─────────────────────────────────────────────────────────────────────────────
 */

const variantClasses = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  green: "bg-emerald-600 text-white",
};

const statusVariantMap = {
  pending: "warning",
  Pending: "warning",
  confirmed: "success",
  Confirmed: "success",
  cancelled: "danger",
  Cancelled: "danger",
  rejected: "danger",
  Rejected: "danger",
  completed: "info",
  Completed: "info",
};

export default function Badge({
  children,
  variant,
  status,
  className = "",
}) {
  const normalizedStatus = status ? status.toLowerCase() : "";
  const resolvedVariant =
    (normalizedStatus && statusVariantMap[normalizedStatus]) ||
    variant ||
    "default";

  const displayContent =
    children ||
    (status ? status.charAt(0).toUpperCase() + status.slice(1) : "");

  const classes = [
    "inline-flex items-center gap-1",
    "px-2.5 py-0.5",
    "text-xs font-semibold",
    "rounded-full",
    "whitespace-nowrap",
    variantClasses[resolvedVariant] || variantClasses.default,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{displayContent}</span>;
}
