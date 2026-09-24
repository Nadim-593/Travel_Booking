const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

// All admin routes require authentication and the 'admin' role
router.use(protect, authorize("admin"));

router.get("/stats", getDashboardStats);

module.exports = router;
