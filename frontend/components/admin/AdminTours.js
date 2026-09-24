"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Search, Star, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatBDT } from "@/utils/formatters";

export default function AdminTours({ tours, onOpenAdd, onOpenEdit, onDeleteTour, loading }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTours = tours.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.division.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ── Top Bar: Search & Add Button ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tours by name, destination, division..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-white"
          />
        </div>

        <Button variant="primary" size="md" onClick={onOpenAdd}>
          <Plus className="w-4 h-4" />
          Add New Tour
        </Button>
      </div>

      {/* ── Tours Table ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            All Tour Packages ({filteredTours.length})
          </h3>
          <span className="text-xs text-slate-400">Total catalog packages in database</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Loading tour packages from database...
          </div>
        ) : filteredTours.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Package</th>
                  <th className="px-6 py-3">Destination</th>
                  <th className="px-6 py-3">Price (BDT)</th>
                  <th className="px-6 py-3">Seats</th>
                  <th className="px-6 py-3">Featured</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredTours.map((tour) => (
                  <tr key={tour._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Package Title & Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <Image
                            src={tour.featuredImage}
                            alt={tour.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate max-w-xs">
                            {tour.title}
                          </div>
                          <div className="text-xs text-slate-400">
                            {tour.durationDays}D / {tour.durationNights}N · {tour.category || "Adventure"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Destination & Division */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{tour.destination}</div>
                      <div className="text-xs text-slate-400">{tour.division} Division</div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-bold text-emerald-700">
                      {formatBDT(tour.price !== undefined ? tour.price : tour.pricePerPerson)}
                    </td>

                    {/* Available Seats */}
                    <td className="px-6 py-4 text-xs font-semibold">
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          (tour.availableSeats || 0) > 5
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {tour.availableSeats !== undefined ? tour.availableSeats : tour.maxGroupSize} left
                      </span>
                    </td>

                    {/* Featured */}
                    <td className="px-6 py-4">
                      {tour.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => onOpenEdit(tour)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="Edit Tour Package"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteTour(tour._id, tour.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete Tour Package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-sm">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            No tour packages found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
