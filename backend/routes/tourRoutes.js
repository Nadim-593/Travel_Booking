const express = require("express");
const router = express.Router();
const {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public routes: Anyone can browse and view tour packages
router.get("/", getTours);
router.get("/:id", getTourById);

// Admin-protected routes: Only administrators can create, modify, or delete tour packages
router.post("/", protect, authorize("admin"), createTour);
router.put("/:id", protect, authorize("admin"), updateTour);
router.delete("/:id", protect, authorize("admin"), deleteTour);

module.exports = router;
