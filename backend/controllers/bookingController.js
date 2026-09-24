const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const TourPackage = require("../models/TourPackage");

/**
 * @desc    Create a new tour booking request
 * @route   POST /api/bookings
 * @access  Private (Authenticated Travelers)
 */
const createBooking = async (req, res, next) => {
  try {
    const {
      tourId,
      tourPackage,
      travelDate,
      numberOfGuests,
      contactPhone,
      specialRequests,
    } = req.body;

    const tourIdentifier = tourId || tourPackage;

    // 1. Validation of required inputs
    if (!tourIdentifier || !travelDate || !numberOfGuests || !contactPhone) {
      res.status(400);
      return next(
        new Error(
          "Please provide all required fields: tourId (or tourPackage), travelDate, numberOfGuests, and contactPhone"
        )
      );
    }

    const guests = parseInt(numberOfGuests, 10);
    if (isNaN(guests) || guests < 1) {
      res.status(400);
      return next(new Error("Number of guests must be at least 1"));
    }

    const requestedDate = new Date(travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(requestedDate.getTime()) || requestedDate < today) {
      res.status(400);
      return next(new Error("Travel date must be a valid upcoming date"));
    }

    // 2. Validate Tour Package Existence & Status
    let tour = null;

    if (mongoose.Types.ObjectId.isValid(tourIdentifier)) {
      tour = await TourPackage.findById(tourIdentifier);
    }

    if (!tour && typeof tourIdentifier === "string") {
      tour = await TourPackage.findOne({ slug: tourIdentifier.toLowerCase() });
    }

    // Support numeric/mock id fallback mappings
    if (!tour) {
      const mockSlugMap = {
        "1": "sajek-valley-kingdom-of-clouds",
        "2": "coxs-bazar-longest-natural-beach",
        "3": "sundarbans-mangrove-wilderness-adventure",
        "4": "sreemangal-tea-garden-and-forest-trails",
        "5": "saint-martins-island-coral-and-crystal-waters",
        "6": "bandarban-hills-waterfalls-and-tribal-culture",
      };
      const mappedSlug = mockSlugMap[String(tourIdentifier)];
      if (mappedSlug) {
        tour = await TourPackage.findOne({ slug: mappedSlug });
      }
    }

    if (!tour) {
      res.status(404);
      return next(new Error(`Tour package not found with identifier '${tourIdentifier}'`));
    }

    if (tour.status && tour.status !== "active") {
      res.status(400);
      return next(new Error("This tour package is currently not available for booking"));
    }

    // 3. Check Seat Availability & Atomically Reserve Seats
    const currentSeats = tour.availableSeats !== undefined ? tour.availableSeats : tour.maxGroupSize;
    if (currentSeats < guests) {
      res.status(400);
      return next(
        new Error(
          `Insufficient available seats. Only ${currentSeats} seat(s) remain for this tour package.`
        )
      );
    }

    // Atomically decrement seats to prevent race conditions
    const updatedTour = await TourPackage.findOneAndUpdate(
      { _id: tour._id, availableSeats: { $gte: guests } },
      { $inc: { availableSeats: -guests } },
      { new: true }
    );

    if (!updatedTour) {
      res.status(400);
      return next(new Error("Could not reserve seats. Please check availability and try again."));
    }

    // 4. Calculate Total Amount Server-Side (Cannot be tampered with by client)
    const pricePerPerson = tour.price || tour.pricePerPerson;
    const totalAmount = pricePerPerson * guests;

    // 5. Create Booking Document
    const booking = await Booking.create({
      user: req.user._id,
      tourPackage: tour._id,
      travelDate: requestedDate,
      numberOfGuests: guests,
      pricePerPerson,
      totalAmount,
      contactPhone: contactPhone.trim(),
      specialRequests: specialRequests ? specialRequests.trim() : "",
      status: "pending",
      paymentStatus: "unpaid",
      seatsReserved: true,
    });

    // Populate tour details for response
    await booking.populate([
      {
        path: "tourPackage",
        select: "title slug destination division price durationDays durationNights featuredImage departureLocation",
      },
      {
        path: "user",
        select: "name email phone",
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Booking request placed successfully. It is currently pending confirmation.",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings made by the currently logged-in user
 * @route   GET /api/bookings/my-bookings
 * @access  Private (Authenticated Users)
 */
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: "tourPackage",
        select: "title slug destination division price durationDays durationNights featuredImage departureLocation",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single booking details by ID
 * @route   GET /api/bookings/:id
 * @access  Private (Owner or Admin)
 */
const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error("Invalid booking ID format"));
    }

    const booking = await Booking.findById(id)
      .populate({
        path: "tourPackage",
        select: "title slug destination division price durationDays durationNights featuredImage departureLocation itinerary inclusions exclusions",
      })
      .populate({
        path: "user",
        select: "name email phone",
      });

    if (!booking) {
      res.status(404);
      return next(new Error(`Booking not found with ID '${id}'`));
    }

    // Ensure only the user who made the booking OR an administrator can view it
    const isOwner = booking.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      return next(new Error("Forbidden: You are not authorized to view this booking"));
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel a booking (Traveler can cancel their own booking)
 * @route   PUT /api/bookings/:id/cancel
 * @access  Private (Owner or Admin)
 */
const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error("Invalid booking ID format"));
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      res.status(404);
      return next(new Error(`Booking not found with ID '${id}'`));
    }

    // Authorization check
    const isOwner = booking.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      return next(new Error("Forbidden: You are not authorized to cancel this booking"));
    }

    // Check if already cancelled or rejected
    if (booking.status === "cancelled") {
      res.status(400);
      return next(new Error("This booking has already been cancelled"));
    }

    if (booking.status === "rejected") {
      res.status(400);
      return next(new Error("This booking was already rejected by the administration"));
    }

    if (booking.status === "completed") {
      res.status(400);
      return next(new Error("Completed tours cannot be cancelled"));
    }

    // Safely replenish available seats if they were previously reserved
    if (booking.seatsReserved) {
      await TourPackage.findByIdAndUpdate(booking.tourPackage, {
        $inc: { availableSeats: booking.numberOfGuests },
      });
      booking.seatsReserved = false;
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking has been successfully cancelled and reserved seats have been released.",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings across the platform (Admin dashboard)
 * @route   GET /api/bookings
 * @access  Private/Admin
 */
const getAllBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status && status.trim()) {
      query.status = status.trim().toLowerCase();
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const totalBookings = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate("user", "name email phone")
      .populate("tourPackage", "title slug destination price departureLocation")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total: totalBookings,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalBookings / limitNum),
        limit: limitNum,
        hasNextPage: pageNum * limitNum < totalBookings,
        hasPrevPage: pageNum > 1,
      },
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update booking status (Confirm, Reject, Complete, Cancel)
 * @route   PUT /api/bookings/:id/status
 * @access  Private/Admin
 */
const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error("Invalid booking ID format"));
    }

    if (!status) {
      res.status(400);
      return next(new Error("Please provide a new status in the request body"));
    }

    const newStatus = status.trim().toLowerCase();
    const validStatuses = ["pending", "confirmed", "cancelled", "rejected", "completed"];

    if (!validStatuses.includes(newStatus)) {
      res.status(400);
      return next(
        new Error(`Invalid status '${status}'. Allowed statuses: ${validStatuses.join(", ")}`)
      );
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      res.status(404);
      return next(new Error(`Booking not found with ID '${id}'`));
    }

    const oldStatus = booking.status;

    // Handle inventory adjustment based on transition
    const releasingStatuses = ["cancelled", "rejected"];
    const reservingStatuses = ["pending", "confirmed", "completed"];

    // Case 1: Transitioning from a reserving status to a releasing status (e.g. pending -> rejected/cancelled)
    if (booking.seatsReserved && releasingStatuses.includes(newStatus)) {
      await TourPackage.findByIdAndUpdate(booking.tourPackage, {
        $inc: { availableSeats: booking.numberOfGuests },
      });
      booking.seatsReserved = false;
    }

    // Case 2: Transitioning from a released status back to a reserving status (e.g. rejected -> confirmed)
    if (!booking.seatsReserved && reservingStatuses.includes(newStatus)) {
      await TourPackage.findByIdAndUpdate(booking.tourPackage, {
        $inc: { availableSeats: -booking.numberOfGuests },
      });
      booking.seatsReserved = true;
    }

    booking.status = newStatus;
    await booking.save();

    await booking.populate([
      { path: "user", select: "name email phone" },
      { path: "tourPackage", select: "title destination price" },
    ]);

    res.status(200).json({
      success: true,
      message: `Booking status successfully changed from '${oldStatus}' to '${newStatus}'.`,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Approve booking convenience endpoint
 * @route   PUT /api/bookings/:id/approve
 * @access  Private/Admin
 */
const approveBooking = async (req, res, next) => {
  req.body.status = "confirmed";
  return updateBookingStatus(req, res, next);
};

/**
 * @desc    Reject booking convenience endpoint
 * @route   PUT /api/bookings/:id/reject
 * @access  Private/Admin
 */
const rejectBooking = async (req, res, next) => {
  req.body.status = "rejected";
  return updateBookingStatus(req, res, next);
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  approveBooking,
  rejectBooking,
};
