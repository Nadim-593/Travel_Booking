const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protect middleware: Ensures the incoming request has a valid JWT
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the environment secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB and attach to req (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        return next(new Error("User belonging to this token no longer exists"));
      }

      return next();
    } catch (error) {
      res.status(401);
      return next(new Error("Not authorized, token failed or expired"));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, no Bearer token provided"));
  }
};

/**
 * Role-based authorization middleware
 * @param  {...string} roles - Allowed roles (e.g. 'admin', 'user')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(
          `Forbidden: User role '${req.user ? req.user.role : "none"}' is not authorized to access this route`
        )
      );
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
