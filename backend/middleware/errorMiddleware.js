/**
 * 404 Middleware: Catches any requests that don't match registered routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Error Handler Middleware: Standardizes error responses
 */
const errorHandler = (err, req, res, next) => {
  // If statusCode is still 200 (default), set to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected error occurred",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
