const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
      res.status(400);
      return next(new Error("Please provide all required fields: name, email, password, and phone"));
    }

    // Check if user with given email already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      res.status(400);
      return next(new Error("A user with this email address already exists"));
    }

    // Create user in database (password is automatically hashed by UserSchema pre-save hook)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: role && ["user", "admin"].includes(role) ? role : "user",
    });

    // Generate JWT
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input presence
    if (!email || !password) {
      res.status(400);
      return next(new Error("Please provide both email and password"));
    }

    // Check for user by email (explicitly select password because schema has select: false)
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      res.status(401);
      return next(new Error("Invalid email or password"));
    }

    // Verify password match using model helper
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      return next(new Error("Invalid email or password"));
    }

    // Generate JWT
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get profile of currently logged-in user
 * @route   GET /api/auth/me
 * @access  Private (Authenticated users)
 */
const getMe = async (req, res, next) => {
  try {
    // req.user was already fetched and populated by the 'protect' middleware
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
