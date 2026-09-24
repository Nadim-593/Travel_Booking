/*
 * app/dashboard/DashboardContent.js
 * ─────────────────────────────────────────────────────────────────────────────
 * User Dashboard & Booking History client component.
 *
 * Rendered inside a <Suspense> boundary by app/dashboard/page.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatBDT, formatDate } from "@/utils/formatters";
import * as bookingService from "@/services/bookingService";

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingSuccess = searchParams.get("bookingSuccess");

  const { user, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  // Fetch my bookings from backend
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await bookingService.getMyBookings();
      if (response && response.success) {
        setBookings(response.bookings || []);
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching bookings:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Could not load your booking history. Please verify your connection."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Protect route & fetch data on mount
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login?message=Please+sign+in+to+view+your+dashboard.");
      } else {
        fetchBookings();
      }
    }
  }, [user, authLoading, router, fetchBookings]);

  // Cancel booking handler
  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking? Reserved seats will be released."
    );
    if (!confirmCancel) return;

    setCancellingId(bookingId);
    setActionMessage("");

    try {
      const response = await bookingService.cancelBooking(bookingId);
      if (response && response.success) {
        setActionMessage("Booking has been successfully cancelled.");
        fetchBookings();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container-custom">
        {/* ── Success Banner from Booking Redirect ──────────────────────── */}
        {bookingSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <strong>Reservation Placed!</strong> Your booking request is now
              pending administrator confirmation.
            </div>
          </div>
        )}

        {/* ── Feedback Message ──────────────────────────────────────────── */}
        {actionMessage && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 text-blue-800 text-sm">
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* ── User Profile Header Card ──────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xl flex items-center justify-center">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {user?.name}
                  </h1>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize">
                    {user?.role === "admin" ? (
                      <span className="flex items-center gap-1 text-amber-700">
                        <ShieldCheck className="w-3.5 h-3.5" /> Admin
                      </span>
                    ) : (
                      "Traveler"
                    )}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">
                  {user?.email} · {user?.phone || "No phone registered"}
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" href="/tours">
              <Compass className="w-4 h-4" />
              Explore More Tours
            </Button>
          </div>
        </div>

        {/* ── Bookings Section ──────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              My Tour Bookings
            </h2>
            <button
              onClick={fetchBookings}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>

          {/* 1. Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-6">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-red-700 mb-3">{error}</p>
              <Button variant="danger" size="sm" onClick={fetchBookings}>
                Retry
              </Button>
            </div>
          )}

          {/* 2. Loading State */}
          {loading && (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 bg-slate-200 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-slate-200 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Bookings List */}
          {!loading && !error && bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const tour = booking.tourPackage || {};
                const canCancel = ["pending", "confirmed"].includes(booking.status);

                return (
                  <div
                    key={booking._id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    {/* Tour Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                      {tour.featuredImage && (
                        <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <Image
                            src={tour.featuredImage}
                            alt={tour.title || "Tour image"}
                            fill
                            className="object-cover"
                            sizes="150px"
                          />
                        </div>
                      )}

                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge status={booking.status} />
                          <span className="text-xs text-slate-400">
                            Booked on {formatDate(booking.createdAt)}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-lg hover:text-emerald-700 transition-colors">
                          <Link href={`/tours/${tour.slug || tour._id || ""}`}>
                            {tour.title || "Tour Package"}
                          </Link>
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {tour.destination}, {tour.division}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            Travel Date: <strong>{formatDate(booking.travelDate)}</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            {booking.numberOfGuests} guest{booking.numberOfGuests > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-0 border-slate-100">
                      <div className="text-left lg:text-right">
                        <span className="text-xs text-slate-400">Total Amount</span>
                        <div className="text-lg font-bold text-emerald-700">
                          {formatBDT(booking.totalAmount)}
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {formatBDT(booking.pricePerPerson)} / person
                        </span>
                      </div>

                      {canCancel && (
                        <Button
                          variant="danger"
                          size="sm"
                          disabled={cancellingId === booking._id}
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          {cancellingId === booking._id ? "Cancelling..." : "Cancel Booking"}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. Empty State */}
          {!loading && !error && bookings.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                No Tour Bookings Yet
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                You haven&apos;t placed any bookings yet. Explore Bangladesh&apos;s
                magnificent destinations and book your next unforgettable journey!
              </p>
              <Button variant="primary" size="md" href="/tours">
                Browse Tour Packages
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
