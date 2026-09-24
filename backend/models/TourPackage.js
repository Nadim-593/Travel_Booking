const mongoose = require("mongoose");

const itineraryItemSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Please specify the itinerary day number"],
    },
    title: {
      type: String,
      required: [true, "Please provide an itinerary day title"],
      trim: true,
    },
    activities: {
      type: String,
      required: [true, "Please describe the activities for this day"],
    },
  },
  { _id: false }
);

const tourPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a tour package title"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Please specify the primary destination"],
      trim: true,
    },
    division: {
      type: String,
      required: [true, "Please select the division of Bangladesh"],
      enum: [
        "Dhaka",
        "Chittagong",
        "Sylhet",
        "Khulna",
        "Barisal",
        "Rajshahi",
        "Rangpur",
        "Mymensingh",
      ],
    },
    category: {
      type: String,
      enum: [
        "Hill Tracts",
        "Beach & Island",
        "Wildlife & Forest",
        "Tea Garden & Lakes",
        "Heritage & Culture",
        "Adventure",
      ],
      default: "Adventure",
    },
    description: {
      type: String,
      required: [true, "Please provide a tour description"],
    },
    price: {
      type: Number,
      required: [true, "Please specify the price per person in BDT"],
      min: [0, "Price cannot be negative"],
    },
    pricePerPerson: {
      type: Number,
      min: [0, "Price cannot be negative"],
    },
    durationDays: {
      type: Number,
      required: [true, "Please specify the total duration in days"],
      min: [1, "Duration must be at least 1 day"],
    },
    durationNights: {
      type: Number,
      default: 0,
      min: [0, "Nights cannot be negative"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Please specify the maximum group size"],
      min: [1, "Group size must be at least 1"],
    },
    availableSeats: {
      type: Number,
      min: [0, "Available seats cannot be negative"],
    },
    departureLocation: {
      type: String,
      required: [true, "Please specify the departure location in Bangladesh"],
      trim: true,
    },
    featuredImage: {
      type: String,
      required: [true, "Please provide a featured image URL"],
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    itinerary: {
      type: [itineraryItemSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: [0, "Reviews count cannot be negative"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-populate pricePerPerson and availableSeats if not explicitly provided
tourPackageSchema.pre("save", function (next) {
  if (this.price && !this.pricePerPerson) {
    this.pricePerPerson = this.price;
  }
  if (!this.price && this.pricePerPerson) {
    this.price = this.pricePerPerson;
  }
  if (this.maxGroupSize && this.availableSeats === undefined) {
    this.availableSeats = this.maxGroupSize;
  }
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

// Indexes for text search and filtering
tourPackageSchema.index({ title: "text", destination: "text", description: "text" });
tourPackageSchema.index({ division: 1, category: 1, price: 1 });

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);

module.exports = TourPackage;
