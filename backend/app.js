const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Route imports
const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const tourRoutes = require("./routes/tourRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Deshiyo Travels API Server",
    documentation: "/api/health",
  });
});

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler for undefined endpoints
app.use(notFound);

// Global centralized error handler
app.use(errorHandler);

module.exports = app;
