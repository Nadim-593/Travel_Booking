const mongoose = require("mongoose");

/**
 * @desc    Get API health status & database connectivity
 * @route   GET /api/health
 * @access  Public
 */
const getHealthStatus = (req, res) => {
  const dbStateMap = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  const dbState = mongoose.connection.readyState;

  res.status(200).json({
    success: true,
    message: "Deshiyo Travels API is operational",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || "development",
    database: {
      status: dbStateMap[dbState] || "Unknown",
      readyState: dbState,
    },
  });
};

module.exports = {
  getHealthStatus,
};
