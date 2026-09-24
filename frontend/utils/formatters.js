/*
 * formatters.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable formatter functions for displaying data correctly in the UI.
 *
 * WHY: Instead of scattering "৳" and date logic throughout components,
 * we centralise it here. This means consistent formatting everywhere.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Format a number as Bangladeshi Taka (BDT).
 *
 * formatBDT(4500)        → "৳4,500"
 * formatBDT(12000)       → "৳12,000"
 *
 * @param {number} amount
 * @returns {string}
 */
export function formatBDT(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return "৳0";

  return (
    "৳" +
    Number(amount).toLocaleString("en-BD", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

/**
 * Format a JavaScript Date (or ISO string) to a readable date.
 *
 * formatDate("2024-12-25")  → "25 December 2024"
 *
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a date to a short form.
 *
 * formatDateShort("2024-12-25")  → "25 Dec 2024"
 *
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDateShort(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format tour duration into a human-friendly string.
 *
 * formatDuration(3, 2)  → "3 Days / 2 Nights"
 * formatDuration(1, 0)  → "1 Day Trip"
 *
 * @param {number} days
 * @param {number} nights
 * @returns {string}
 */
export function formatDuration(days, nights) {
  if (nights === 0) return `${days} Day Trip`;
  return `${days} Days / ${nights} Nights`;
}

/**
 * Truncate a long string to a given character limit with an ellipsis.
 *
 * truncateText("Very long description...", 60)  → "Very long des..."
 *
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}
