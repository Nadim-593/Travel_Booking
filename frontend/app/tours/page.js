/*
 * app/tours/page.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The full tour catalog page (/tours).
 *
 * Connected to live backend: GET /api/tours
 * Features:
 *   - Live search, division filter, price range bucket filter, and sort
 *   - Loading state with SkeletonGrid
 *   - Graceful error state with Retry button
 *   - Empty state with Clear Filters button
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { Filter, X, RefreshCw, AlertCircle } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import TourFilter from "@/components/tours/TourFilter";
import { SkeletonGrid } from "@/components/ui/Loader";
import { PRICE_RANGES } from "@/utils/constants";
import * as tourService from "@/services/tourService";

const DEFAULT_FILTERS = {
  search: "",
  division: "",
  priceRange: 0,
  sort: "",
};

export default function ToursPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  // Fetch tours from backend
  const fetchTours = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = {};

      if (filters.search.trim()) {
        params.search = filters.search.trim();
      }
      if (filters.division) {
        params.division = filters.division;
      }

      const priceRange = PRICE_RANGES[filters.priceRange];
      if (priceRange && filters.priceRange !== 0) {
        if (priceRange.min > 0) params.minPrice = priceRange.min;
        if (priceRange.max < Infinity) params.maxPrice = priceRange.max;
      }

      if (filters.sort) {
        params.sort = filters.sort;
      }

      const response = await tourService.getTours(params);
      if (response && response.success) {
        setTours(response.tours || []);
        setTotal(response.total || response.count || 0);
      }
    } catch (err) {
      console.error("[ToursPage] Error fetching tours:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load tour packages from the server. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleClearFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-custom py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            All Tour Packages
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            {loading ? (
              "Loading packages..."
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-emerald-700">
                  {tours.length}
                </span>{" "}
                of {total} packages
              </>
            )}
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* ── Mobile Filter Toggle ──────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <button
            onClick={() => setShowMobileFilter((p) => !p)}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 px-4 py-2 rounded-lg hover:border-emerald-500 transition-colors"
          >
            {showMobileFilter ? (
              <X className="w-4 h-4" />
            ) : (
              <Filter className="w-4 h-4" />
            )}
            {showMobileFilter ? "Hide Filters" : "Show Filters"}
          </button>
          <span className="text-xs text-slate-500">
            {tours.length} result{tours.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Mobile Filter Panel ───────────────────────────────────────── */}
        {showMobileFilter && (
          <div className="mb-6 lg:hidden">
            <TourFilter
              filters={filters}
              onChange={setFilters}
              onClear={handleClearFilters}
            />
          </div>
        )}

        {/* ── Two-Column Layout ─────────────────────────────────────────── */}
        <div className="flex gap-7">
          {/* Sidebar — hidden on mobile, sticky on desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <TourFilter
              filters={filters}
              onChange={setFilters}
              onClear={handleClearFilters}
            />
          </div>

          {/* Tour Grid / Loading / Error / Empty states */}
          <div className="flex-1 min-w-0">
            {/* 1. Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="text-base font-bold text-red-800 mb-1">
                  Failed to Load Tours
                </h3>
                <p className="text-sm text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchTours}
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            )}

            {/* 2. Loading Skeleton State */}
            {loading && <SkeletonGrid count={6} />}

            {/* 3. Success with Tours */}
            {!loading && !error && tours.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {tours.map((tour) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
            )}

            {/* 4. Empty State */}
            {!loading && !error && tours.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-xl border border-slate-200">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  No tours found
                </h3>
                <p className="text-slate-500 text-sm mb-5 max-w-xs">
                  No tour packages match your current filters. Try adjusting your
                  search or selecting a different division.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 underline underline-offset-2 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
