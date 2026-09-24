const mongoose = require("mongoose");
const TourPackage = require("../models/TourPackage");

/**
 * @desc    Get all tour packages with search, filtering, sorting & pagination
 * @route   GET /api/tours
 * @access  Public
 */
const getTours = async (req, res, next) => {
  try {
    const {
      search,
      destination,
      division,
      category,
      minPrice,
      maxPrice,
      featured,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // 1. Build Query Filter
    const query = {};

    // Search by keyword in title, destination, or description
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { destination: searchRegex },
        { description: searchRegex },
      ];
    }

    // Exact or regex match for destination
    if (destination && destination.trim()) {
      query.destination = new RegExp(destination.trim(), "i");
    }

    // Filter by Bangladesh administrative division
    if (division && division.trim()) {
      query.division = division.trim();
    }

    // Filter by travel category (e.g. Hill Tracts, Beach, Adventure)
    if (category && category.trim()) {
      query.category = category.trim();
    }

    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined && minPrice !== "") {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== "") {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Filter by featured status
    if (featured !== undefined) {
      query.isFeatured = featured === "true";
    }

    // Default to active tours unless explicitly requested
    if (!req.query.status) {
      query.status = "active";
    } else {
      query.status = req.query.status;
    }

    // 2. Sorting
    let sortOption = { isFeatured: -1, createdAt: -1 }; // default: featured first, then newest
    if (sort === "price_asc") {
      sortOption = { price: 1 };
    } else if (sort === "price_desc") {
      sortOption = { price: -1 };
    } else if (sort === "rating_desc") {
      sortOption = { averageRating: -1 };
    } else if (sort === "newest") {
      sortOption = { createdAt: -1 };
    }

    // 3. Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Execute queries
    const totalTours = await TourPackage.countDocuments(query);
    const tours = await TourPackage.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: tours.length,
      total: totalTours,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalTours / limitNum),
        limit: limitNum,
        hasNextPage: pageNum * limitNum < totalTours,
        hasPrevPage: pageNum > 1,
      },
      tours,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single tour package by MongoDB ID or slug
 * @route   GET /api/tours/:id
 * @access  Public
 */
const getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if :id is a valid 24-character ObjectId or a slug string
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id.toLowerCase() };

    const tour = await TourPackage.findOne(query);

    if (!tour) {
      res.status(404);
      return next(new Error(`Tour package not found with identifier '${id}'`));
    }

    res.status(200).json({
      success: true,
      tour,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new tour package
 * @route   POST /api/tours
 * @access  Private/Admin
 */
const createTour = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      destination,
      division,
      category,
      description,
      price,
      pricePerPerson,
      durationDays,
      durationNights,
      maxGroupSize,
      availableSeats,
      departureLocation,
      featuredImage,
      galleryImages,
      inclusions,
      exclusions,
      itinerary,
      isFeatured,
      status,
    } = req.body;

    // Required fields validation
    const tourPrice = price !== undefined ? price : pricePerPerson;
    if (
      !title ||
      !destination ||
      !division ||
      tourPrice === undefined ||
      !durationDays ||
      !maxGroupSize ||
      !departureLocation ||
      !featuredImage ||
      !description
    ) {
      res.status(400);
      return next(
        new Error(
          "Please provide all required fields: title, destination, division, price, durationDays, maxGroupSize, departureLocation, featuredImage, and description"
        )
      );
    }

    // Auto-generate slug if not provided
    const tourSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    // Check for duplicate slug
    const existingTour = await TourPackage.findOne({ slug: tourSlug });
    if (existingTour) {
      res.status(400);
      return next(new Error(`A tour with slug '${tourSlug}' already exists`));
    }

    const tour = await TourPackage.create({
      title,
      slug: tourSlug,
      destination,
      division,
      category: category || "Adventure",
      description,
      price: tourPrice,
      pricePerPerson: tourPrice,
      durationDays,
      durationNights: durationNights || 0,
      maxGroupSize,
      availableSeats: availableSeats !== undefined ? availableSeats : maxGroupSize,
      departureLocation,
      featuredImage,
      galleryImages: galleryImages || [],
      inclusions: inclusions || [],
      exclusions: exclusions || [],
      itinerary: itinerary || [],
      isFeatured: isFeatured || false,
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "Tour package created successfully",
      tour,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing tour package
 * @route   PUT /api/tours/:id
 * @access  Private/Admin
 */
const updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id.toLowerCase() };

    let tour = await TourPackage.findOne(query);

    if (!tour) {
      res.status(404);
      return next(new Error(`Tour package not found with identifier '${id}'`));
    }

    // Sync price if updated
    if (req.body.price !== undefined && req.body.pricePerPerson === undefined) {
      req.body.pricePerPerson = req.body.price;
    }

    tour = await TourPackage.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Tour package updated successfully",
      tour,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a tour package
 * @route   DELETE /api/tours/:id
 * @access  Private/Admin
 */
const deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id.toLowerCase() };

    const tour = await TourPackage.findOneAndDelete(query);

    if (!tour) {
      res.status(404);
      return next(new Error(`Tour package not found with identifier '${id}'`));
    }

    res.status(200).json({
      success: true,
      message: `Tour package '${tour.title}' deleted successfully`,
      deletedTourId: tour._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
