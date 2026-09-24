/*
 * components/tours/TourFilter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Filter sidebar for the /tours catalog page.
 *
 * This is a CLIENT component because it manages interactive filter state.
 * It receives current filters and an onChange callback from the parent page.
 *
 * Filters:
 *   - Search text (destination or title)
 *   - Division (Bangladesh's 8 divisions)
 *   - Price range bucket
 *   - Sort order
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import {
  BANGLADESH_DIVISIONS,
  PRICE_RANGES,
  SORT_OPTIONS,
} from "@/utils/constants";

// A single filter section with a title and children
function FilterSection({ title, children }) {
  return (
    <div className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function TourFilter({ filters, onChange, onClear }) {
  const hasActiveFilters =
    filters.search ||
    filters.division ||
    filters.priceRange !== 0 ||
    filters.sort;

  return (
    <aside className="bg-white rounded-xl border border-slate-200 p-5 space-y-5 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          Filter Tours
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <FilterSection title="Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Destination or tour name..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 placeholder:text-slate-400"
          />
        </div>
      </FilterSection>

      {/* Division */}
      <FilterSection title="Division">
        <div className="space-y-1.5">
          {/* "All Divisions" option */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="division"
              value=""
              checked={!filters.division}
              onChange={() => onChange({ ...filters, division: "" })}
              className="accent-emerald-600"
            />
            <span className="text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">
              All Divisions
            </span>
          </label>
          {BANGLADESH_DIVISIONS.map((div) => (
            <label key={div} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="division"
                value={div}
                checked={filters.division === div}
                onChange={() => onChange({ ...filters, division: div })}
                className="accent-emerald-600"
              />
              <span className="text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">
                {div}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range (BDT)">
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range, idx) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="priceRange"
                value={idx}
                checked={filters.priceRange === idx}
                onChange={() => onChange({ ...filters, priceRange: idx })}
                className="accent-emerald-600"
              />
              <span className="text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Sort */}
      <FilterSection title="Sort By">
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-white text-slate-700"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FilterSection>
    </aside>
  );
}
