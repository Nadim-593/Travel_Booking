"use client";

import { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { BANGLADESH_DIVISIONS } from "@/utils/constants";

const CATEGORIES = [
  "Hill Tracts",
  "Beach & Island",
  "Wildlife & Forest",
  "Tea Garden & Lakes",
  "Heritage & Culture",
  "Adventure",
];

export default function TourFormModal({ isOpen, onClose, tour, onSaved }) {
  const isEditing = !!tour;

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    division: "Chittagong",
    category: "Adventure",
    price: "",
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 20,
    availableSeats: 20,
    departureLocation: "Dhaka",
    featuredImage: "",
    description: "",
    isFeatured: false,
    inclusions: "",
    exclusions: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title || "",
        destination: tour.destination || "",
        division: tour.division || "Chittagong",
        category: tour.category || "Adventure",
        price: tour.price !== undefined ? tour.price : tour.pricePerPerson || "",
        durationDays: tour.durationDays || 1,
        durationNights: tour.durationNights || 0,
        maxGroupSize: tour.maxGroupSize || 20,
        availableSeats: tour.availableSeats !== undefined ? tour.availableSeats : tour.maxGroupSize || 20,
        departureLocation: tour.departureLocation || "Dhaka",
        featuredImage: tour.featuredImage || "",
        description: tour.description || "",
        isFeatured: !!tour.isFeatured,
        inclusions: Array.isArray(tour.inclusions) ? tour.inclusions.join("\n") : "",
        exclusions: Array.isArray(tour.exclusions) ? tour.exclusions.join("\n") : "",
      });
    } else {
      setFormData({
        title: "",
        destination: "",
        division: "Chittagong",
        category: "Adventure",
        price: "",
        durationDays: 3,
        durationNights: 2,
        maxGroupSize: 20,
        availableSeats: 20,
        departureLocation: "Dhaka",
        featuredImage: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&q=85",
        description: "",
        isFeatured: false,
        inclusions: "AC Bus\nResort Stay\nBreakfast",
        exclusions: "Personal shopping\nExtra activities",
      });
    }
    setError("");
  }, [tour, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client validation
    if (
      !formData.title.trim() ||
      !formData.destination.trim() ||
      !formData.price ||
      !formData.description.trim() ||
      !formData.featuredImage.trim()
    ) {
      setError("Please fill in all required fields: Title, Destination, Price, Description, and Image.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        durationDays: Number(formData.durationDays),
        durationNights: Number(formData.durationNights),
        maxGroupSize: Number(formData.maxGroupSize),
        availableSeats: Number(formData.availableSeats),
        inclusions: formData.inclusions
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        exclusions: formData.exclusions
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      await onSaved(payload, tour?._id);
      onClose();
    } catch (err) {
      console.error("[TourFormModal] Error:", err);
      setError(err.response?.data?.message || err.message || "Failed to save tour package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <h3 className="font-bold text-lg">
            {isEditing ? `Edit: ${tour.title}` : "Add New Tour Package"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Tour Title"
            placeholder="e.g. Sajek Valley — Kingdom of Clouds"
            value={formData.title}
            onChange={handleChange("title")}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Destination"
              placeholder="e.g. Sajek Valley"
              value={formData.destination}
              onChange={handleChange("destination")}
              required
            />

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.division}
                onChange={handleChange("division")}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-white"
              >
                {BANGLADESH_DIVISIONS.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={handleChange("category")}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Price per Person (৳ BDT)"
              type="number"
              placeholder="4500"
              value={formData.price}
              onChange={handleChange("price")}
              required
            />

            <Input
              label="Departure Location"
              placeholder="e.g. Dhaka"
              value={formData.departureLocation}
              onChange={handleChange("departureLocation")}
              required
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input
              label="Days"
              type="number"
              min="1"
              value={formData.durationDays}
              onChange={handleChange("durationDays")}
              required
            />
            <Input
              label="Nights"
              type="number"
              min="0"
              value={formData.durationNights}
              onChange={handleChange("durationNights")}
            />
            <Input
              label="Max Group"
              type="number"
              min="1"
              value={formData.maxGroupSize}
              onChange={handleChange("maxGroupSize")}
              required
            />
            <Input
              label="Available Seats"
              type="number"
              min="0"
              value={formData.availableSeats}
              onChange={handleChange("availableSeats")}
              required
            />
          </div>

          <Input
            label="Featured Image URL"
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={formData.featuredImage}
            onChange={handleChange("featuredImage")}
            hint="Use an Unsplash URL for high quality pictures"
            required
          />

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={handleChange("description")}
              placeholder="Write a compelling overview of this tour..."
              className="w-full px-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                Inclusions (1 per line)
              </label>
              <textarea
                rows={3}
                value={formData.inclusions}
                onChange={handleChange("inclusions")}
                placeholder="AC Bus&#10;Resort Stay&#10;All Meals"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">
                Exclusions (1 per line)
              </label>
              <textarea
                rows={3}
                value={formData.exclusions}
                onChange={handleChange("exclusions")}
                placeholder="Personal shopping&#10;Water sports"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange("isFeatured")}
              className="w-4 h-4 accent-emerald-600 rounded"
            />
            <label htmlFor="isFeatured" className="text-sm text-slate-700 font-medium cursor-pointer">
              Mark as Featured Tour on Homepage
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="md" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={loading}>
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditing ? "Save Changes" : "Create Tour Package"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
