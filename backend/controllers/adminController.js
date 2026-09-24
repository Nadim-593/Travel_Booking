const User = require("../models/User");
const TourPackage = require("../models/TourPackage");
const Booking = require("../models/Booking");

/**
 * @desc    Get aggregated dashboard statistics for admin overview
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const [totalUsers, totalTours, totalBookings, pendingBookings, recentBookings] =
      await Promise.all([
        User.countDocuments(),
        TourPackage.countDocuments(),
        Booking.countDocuments(),
        Booking.countDocuments({ status: "pending" }),
        Booking.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .populate("user", "name email phone")
          .populate("tourPackage", "title destination price"),
      ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalTours,
        totalBookings,
        pendingBookings,
      },
      recentBookings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
