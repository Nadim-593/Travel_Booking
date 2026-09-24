const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private authenticated user route
router.get("/me", protect, getMe);

// Protected admin-only verification route
router.get("/admin-test", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: `Access granted! Hello Admin ${req.user.name}.`,
    user: req.user,
  });
});

module.exports = router;
