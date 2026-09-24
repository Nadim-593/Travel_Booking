"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { formatBDT, formatDate } from "@/utils/formatters";
import { CheckCircle2, XCircle, Filter, AlertCircle } from "lucide-react";

const STATUS_FILTERS = ["all", "pending", "confirmed", "cancelled", "rejected", "completed"];

export default function AdminBookings({
  bookings,
  statusFilter,
  onFilterChange,
  onUpdateStatus,
  loading,
}) {
  return (
    <div className="space-y-6">
      {/* ── Status Tabs / Filter ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => onFilterChange(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                statusFilter === s
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500">
          Showing <strong>{bookings.length}</strong> reservation{bookings.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Bookings Table ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">
            Platform Reservations ({bookings.length})
          </h3>
          <p className="text-xs text-slate-500">
            Review, confirm, or modify traveler bookings across Bangladesh
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Loading reservations...
          </div>
        ) : bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Traveler</th>
                  <th className="px-6 py-3">Tour Package</th>
                  <th className="px-6 py-3">Travel Date</th>
                  <th className="px-6 py-3">Guests</th>
                  <th className="px-6 py-3">Total Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Traveler */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{b.user?.name || "Traveler"}</div>
                      <div className="text-xs text-slate-500">{b.user?.email}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{b.contactPhone || b.user?.phone}</div>
                    </td>

                    {/* Tour Package */}
                    <td className="px-6 py-4 font-medium text-slate-800">
                      <div>{b.tourPackage?.title || "Tour Package"}</div>
                      <div className="text-xs text-slate-400">{b.tourPackage?.destination}</div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                      {formatDate(b.travelDate)}
                    </td>

                    {/* Guests */}
                    <td className="px-6 py-4 text-slate-800">
                      {b.numberOfGuests} guest{b.numberOfGuests > 1 ? "s" : ""}
                    </td>

                    {/* Total Amount */}
                    <td className="px-6 py-4 font-bold text-emerald-700">
                      {formatBDT(b.totalAmount)}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <Badge status={b.status} />
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      {b.status === "pending" ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateStatus(b._id, "confirmed")}
                            className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Approve booking"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => onUpdateStatus(b._id, "rejected")}
                            className="px-2.5 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Reject booking and release seats"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      ) : (
                        <select
                          value={b.status}
                          onChange={(e) => onUpdateStatus(b._id, e.target.value)}
                          className="text-xs border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-sm">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            No bookings found for the &ldquo;{statusFilter}&rdquo; status filter.
          </div>
        )}
      </div>
    </div>
  );
}
