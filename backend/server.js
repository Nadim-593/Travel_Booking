require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(
    `[Server] Running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`
  );
});

// Handle unhandled Promise rejections gracefully
process.on("unhandledRejection", (err) => {
  console.error(`[Server Error] Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
