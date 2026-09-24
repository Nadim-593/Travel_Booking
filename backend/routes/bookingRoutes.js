const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  approveBooking,
  rejectBooking,
} = require("../controllers/bookingController");
const { protect, authorize } = require("../middleware/authMiddleware");

// All booking routes require authentication
router.use(protect);

// ─── Traveler (User) Routes ──────────────────────────────────────────────────
router.post("/", createBooking);
router.get("/my-bookings", getMyBookings);
router.get("/:id", getBookingById);
router.put("/:id/cancel", cancelBooking);

// ─── Admin-Only Routes ───────────────────────────────────────────────────────
router.get("/", authorize("admin"), getAllBookings);
router.put("/:id/status", authorize("admin"), updateBookingStatus);
router.put("/:id/approve", authorize("admin"), approveBooking);
router.put("/:id/reject", authorize("admin"), rejectBooking);

module.exports = router;
