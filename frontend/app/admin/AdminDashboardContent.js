"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminTours from "@/components/admin/AdminTours";
import AdminBookings from "@/components/admin/AdminBookings";
import TourFormModal from "@/components/admin/TourFormModal";
import * as adminService from "@/services/adminService";

export default function AdminDashboardContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "tours" | "bookings"

  // Data states
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  // Loading & Feedback states
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);

  // Load all overview data
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const statsRes = await adminService.getDashboardStats();
      if (statsRes && statsRes.success) {
        setStats(statsRes.stats);
        setRecentBookings(statsRes.recentBookings || []);
      }

      const toursRes = await adminService.getAllTours();
      if (toursRes && toursRes.success) {
        setTours(toursRes.tours || []);
      }

      const bookingsRes = await adminService.getAllBookings();
      if (bookingsRes && bookingsRes.success) {
        setBookings(bookingsRes.bookings || []);
      }
    } catch (err) {
      console.error("[AdminDashboard] Error loading data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtered bookings fetch
  const loadBookingsWithFilter = useCallback(async (filter) => {
    try {
      const params = filter && filter !== "all" ? { status: filter } : {};
      const res = await adminService.getAllBookings(params);
      if (res && res.success) {
        setBookings(res.bookings || []);
      }
    } catch (err) {
      console.error("[AdminDashboard] Error filtering bookings:", err);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user && user.role === "admin") {
      loadDashboardData();
    }
  }, [authLoading, user, loadDashboardData]);

  // Handle tour save (create or edit)
  const handleSaveTour = async (payload, tourId) => {
    if (tourId) {
      await adminService.updateTour(tourId, payload);
      setMessage("Tour package successfully updated!");
    } else {
      await adminService.createTour(payload);
      setMessage("New tour package successfully added to catalog!");
    }
    loadDashboardData();
    setTimeout(() => setMessage(""), 4000);
  };

  // Handle tour delete
  const handleDeleteTour = async (tourId, title) => {
    const confirm = window.confirm(`Are you sure you want to permanently delete '${title}'?`);
    if (!confirm) return;

    try {
      await adminService.deleteTour(tourId);
      setMessage(`Tour package '${title}' deleted successfully.`);
      loadDashboardData();
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete tour package.");
    }
  };

  // Handle booking status update
  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await adminService.updateBookingStatus(bookingId, newStatus);
      setMessage(`Booking status updated to '${newStatus}'.`);
      loadDashboardData();
      if (statusFilter !== "all") {
        loadBookingsWithFilter(statusFilter);
      }
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update booking status.");
    }
  };

  // Status filter change
  const handleFilterChange = (newFilter) => {
    setStatusFilter(newFilter);
    loadBookingsWithFilter(newFilter);
  };

  // ── Access Control Guards ──────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md shadow-sm">
          <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Sign In Required</h2>
          <p className="text-sm text-slate-500 mb-6">
            You must be logged in as an administrator to access the Deshiyo backoffice.
          </p>
          <Button variant="primary" size="md" href="/login?redirect=/admin" fullWidth>
            Sign In as Admin
          </Button>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-red-200 text-center max-w-md shadow-sm">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-red-900 mb-2">Access Denied (403)</h2>
          <p className="text-sm text-slate-500 mb-6">
            Your account (<strong>{user.email}</strong>) has the <code>user</code> role. Only registered administrators can access this backoffice.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" href="/">
              Back to Home
            </Button>
            <Button variant="primary" size="sm" href="/dashboard">
              My Bookings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container-custom">
        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                Admin Backoffice
              </span>
              <span className="text-xs text-slate-400">Logged in as {user.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Deshiyo Travels Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors shadow-sm"
              title="Refresh all metrics"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> View Public Site
            </Link>
          </div>
        </div>

        {/* ── Action Success Message Banner ────────────────────────────────── */}
        {message && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm animate-fade-in shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* ── Navigation Tabs ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>

          <button
            onClick={() => setActiveTab("tours")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "tours"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Compass className="w-4 h-4" /> Manage Tours ({tours.length})
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "bookings"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Manage Bookings ({bookings.length})
            {(stats?.pendingBookings || 0) > 0 && (
              <span className="text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded-full">
                {stats.pendingBookings}
              </span>
            )}
          </button>
        </div>

        {/* ── Tab Views ────────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <AdminOverview
            stats={stats}
            recentBookings={recentBookings}
            onApprove={(id) => handleUpdateStatus(id, "confirmed")}
            onReject={(id) => handleUpdateStatus(id, "rejected")}
            onSwitchTab={setActiveTab}
          />
        )}

        {activeTab === "tours" && (
          <AdminTours
            tours={tours}
            loading={loading}
            onOpenAdd={() => {
              setEditingTour(null);
              setIsModalOpen(true);
            }}
            onOpenEdit={(tour) => {
              setEditingTour(tour);
              setIsModalOpen(true);
            }}
            onDeleteTour={handleDeleteTour}
          />
        )}

        {activeTab === "bookings" && (
          <AdminBookings
            bookings={bookings}
            loading={loading}
            statusFilter={statusFilter}
            onFilterChange={handleFilterChange}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>

      {/* ── Add / Edit Tour Modal ────────────────────────────────────────── */}
      <TourFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tour={editingTour}
        onSaved={handleSaveTour}
      />
    </div>
  );
}
