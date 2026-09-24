"use client";

import { Users, Compass, BookOpen, Clock, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatBDT, formatDate } from "@/utils/formatters";

export default function AdminOverview({ stats, recentBookings, onApprove, onReject, onSwitchTab }) {
  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      label: "Tour Packages",
      value: stats?.totalTours || 0,
      icon: Compass,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      label: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: BookOpen,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      label: "Pending Bookings",
      value: stats?.pendingBookings || 0,
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      highlight: (stats?.pendingBookings || 0) > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── 4 KPI Stat Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`p-6 rounded-2xl bg-white border ${
              card.highlight ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200"
            } shadow-sm flex items-center justify-between`}
          >
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.label}
              </p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                {card.value}
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Quick Banner ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Deshiyo Backoffice Quick Actions</h3>
          <p className="text-sm text-emerald-100 mt-0.5">
            Add new domestic packages or inspect incoming traveler booking requests.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Button
            variant="outlineWhite"
            size="sm"
            onClick={() => onSwitchTab("tours")}
          >
            Manage Tours
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSwitchTab("bookings")}
          >
            Review Bookings
          </Button>
        </div>
      </div>

      {/* ── Recent Bookings Table ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recent Booking Requests</h3>
            <p className="text-xs text-slate-500">Latest reservations placed by travelers</p>
          </div>
          <button
            onClick={() => onSwitchTab("bookings")}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentBookings && recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Traveler</th>
                  <th className="px-6 py-3">Tour Package</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div>{booking.user?.name || "Traveler"}</div>
                      <div className="text-xs text-slate-400">{booking.user?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {booking.tourPackage?.title || "Tour Package"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {formatDate(booking.travelDate)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-700">
                      {formatBDT(booking.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {booking.status === "pending" ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => onApprove(booking._id)}
                            className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => onReject(booking._id)}
                            className="px-2.5 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 capitalize">{booking.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-sm">
            No booking requests received yet.
          </div>
        )}
      </div>
    </div>
  );
}
