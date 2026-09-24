const mongoose = require("mongoose");
const dns = require("dns");

/**
 * Fix: Some home routers do not support SRV DNS records needed by
 * mongodb+srv:// URIs. Forcing Google Public DNS resolves this.
 */
dns.setServers(["8.8.8.8", "8.8.4.4"]);

/**
 * Connect to MongoDB database via Mongoose
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern mongoose options are set by default in Mongoose 8+
    });

    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
