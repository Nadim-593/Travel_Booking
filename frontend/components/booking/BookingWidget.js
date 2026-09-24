/*
 * components/booking/BookingWidget.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The sticky booking card shown on the tour detail page.
 *
 * Connected to live backend: POST /api/bookings
 * Features:
 *   - Live guest count selection and price calculation
 *   - Auto-checks authentication via AuthContext
 *   - Collects contact phone and optional special requests
 *   - Atomic seat availability awareness
 *   - Redirects to /dashboard on successful booking
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Users, Star, MapPin, AlertCircle, Phone, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatBDT, formatDuration } from "@/utils/formatters";
import { useAuth } from "@/context/AuthContext";
import * as bookingService from "@/services/bookingService";

export default function BookingWidget({ tour }) {
  const router = useRouter();
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  const price = tour.price || tour.pricePerPerson || 0;
  const maxSeats = tour.availableSeats !== undefined ? tour.availableSeats : tour.maxGroupSize || 20;

  const [guests, setGuests] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalPrice = price * guests;

  const handleBook = async () => {
    // 1. Validation
    if (!travelDate) {
      setError("Please select a travel departure date.");
      return;
    }

    if (new Date(travelDate) < new Date().setHours(0, 0, 0, 0)) {
      setError("Please select a future date.");
      return;
    }

    if (maxSeats <= 0) {
      setError("Sorry, this tour package is currently sold out.");
      return;
    }

    const contactPhone = (phone || user?.phone || "").trim();
    if (!contactPhone) {
      setError("Please provide a contact phone number for booking confirmations.");
      return;
    }

    // 2. Auth Check: If not logged in, redirect to login with query return
    if (!user) {
      const redirectPath = `/tours/${tour.slug || tour._id}`;
      router.push(
        `/login?redirect=${encodeURIComponent(redirectPath)}&message=${encodeURIComponent(
          "Please sign in to place your booking reservation."
        )}`
      );
      return;
    }

    // 3. Submit Booking to Backend
    setError("");
    setLoading(true);

    try {
      const targetTourId =
        tour._id && tour._id.length === 24
          ? tour._id
          : tour.slug || tour._id;

      await bookingService.createBooking({
        tourId: targetTourId,
        travelDate,
        numberOfGuests: guests,
        contactPhone,
        specialRequests,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard?bookingSuccess=true");
      }, 1500);
    } catch (err) {
      console.error("[BookingWidget] Error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Could not place booking. Please check availability and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Price Header */}
      <div className="bg-emerald-600 px-5 py-4">
        <p className="text-emerald-100 text-xs font-medium uppercase tracking-wide mb-1">
          Starting From
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">
            {formatBDT(price)}
          </span>
          <span className="text-emerald-200 text-sm">/ person</span>
        </div>
        {/* Quick facts */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-emerald-100 text-xs">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {tour.averageRating || 4.8} rating
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {tour.departureLocation}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="p-5 space-y-4">
        {/* Success Feedback */}
        {success ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900">Booking Placed!</h4>
            <p className="text-xs text-slate-600">
              Redirecting you to your booking history dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Travel Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Travel Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  min={today}
                  value={travelDate}
                  onChange={(e) => {
                    setTravelDate(e.target.value);
                    setError("");
                  }}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 text-slate-700"
                />
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Guests
                </label>
                <span className="text-[11px] text-slate-400">
                  {maxSeats} seat{maxSeats !== 1 ? "s" : ""} available
                </span>
              </div>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 font-bold text-lg transition-colors disabled:opacity-40"
                  disabled={guests <= 1}
                >
                  −
                </button>
                <div className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border-x border-slate-300">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-800">{guests}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(maxSeats, g + 1))}
                  className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 font-bold text-lg transition-colors disabled:opacity-40"
                  disabled={guests >= maxSeats}
                >
                  +
                </button>
              </div>
            </div>

            {/* Contact Phone (Prefilled if user has phone) */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="tel"
                  placeholder={user?.phone || "+880 1700-000000"}
                  value={phone || (user?.phone ? user.phone : "")}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError("");
                  }}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 text-slate-700"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-50 rounded-lg p-3 space-y-1.5 border border-slate-100">
              <div className="flex justify-between text-sm text-slate-600">
                <span>
                  {formatBDT(price)} × {guests} guest
                  {guests > 1 ? "s" : ""}
                </span>
                <span>{formatBDT(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Duration</span>
                <span>{formatDuration(tour.durationDays, tour.durationNights)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                <span>Total Amount</span>
                <span className="text-emerald-700">{formatBDT(totalPrice)}</span>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Book Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading || maxSeats <= 0}
              onClick={handleBook}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Processing Reservation...
                </>
              ) : maxSeats <= 0 ? (
                "Sold Out"
              ) : user ? (
                "Confirm & Reserve Seat"
              ) : (
                "Sign In to Book This Tour"
              )}
            </Button>

            {!user && (
              <p className="text-center text-xs text-slate-500">
                New to Deshiyo Travels?{" "}
                <Link href="/register" className="text-emerald-600 font-medium hover:underline">
                  Create an account
                </Link>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
