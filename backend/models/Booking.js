const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A booking must belong to a user"],
    },
    tourPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      required: [true, "A booking must belong to a tour package"],
    },
    travelDate: {
      type: Date,
      required: [true, "Please select a travel departure date"],
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Please provide the number of guests"],
      min: [1, "At least 1 guest is required for a booking"],
    },
    pricePerPerson: {
      type: Number,
      required: [true, "Price per person at time of booking is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total booking amount is required"],
    },
    contactPhone: {
      type: String,
      required: [true, "Please provide an emergency contact phone number"],
      trim: true,
    },
    specialRequests: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["pending", "confirmed", "cancelled", "rejected", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      lowercase: true,
      trim: true,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    seatsReserved: {
      type: Boolean,
      default: true, // Tracks whether seats were decremented from tour's availableSeats
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to quickly fetch a traveler's bookings ordered by newest
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ status: 1, createdAt: -1 });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
