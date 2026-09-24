const jwt = require("jsonwebtoken");

/**
 * Generate a signed JSON Web Token (JWT)
 * @param {string} id - User's MongoDB ObjectId
 * @param {string} role - User's role ('user' | 'admin')
 * @returns {string} - Signed JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

module.exports = generateToken;
