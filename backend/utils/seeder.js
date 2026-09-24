require("dotenv").config();
const mongoose = require("mongoose");
const TourPackage = require("../models/TourPackage");
const connectDB = require("../config/db");

const tours = [
  {
    title: "Sajek Valley — Kingdom of Clouds",
    slug: "sajek-valley-kingdom-of-clouds",
    destination: "Sajek Valley",
    division: "Chittagong",
    category: "Hill Tracts",
    description:
      "Sajek Valley, nestled 1,800 feet above sea level in the Rangamati district, is Bangladesh's most iconic hill station. Known as the 'Queen of Hills', it offers breathtaking views of clouds rolling through the valleys at sunrise. This 3-day package includes a scenic jeep ride through winding mountain roads, a night by a bonfire at Ruilui Para, and spectacular views from Konglak Para.",
    price: 4500,
    pricePerPerson: 4500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 20,
    availableSeats: 20,
    departureLocation: "Sayedabad, Dhaka",
    featuredImage:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
    averageRating: 4.8,
    totalReviews: 124,
    isFeatured: true,
    status: "active",
    inclusions: [
      "AC Sleeper Bus (Dhaka ↔ Khagrachhari)",
      "Chander Gari (Jeep) Safari",
      "2 Nights Resort Stay at Sajek",
      "All Meals (Day 1 Dinner to Day 3 Lunch)",
      "Certified Local Guide",
      "Bonfire Night at Ruilui Para",
    ],
    exclusions: [
      "Personal expenses & souvenirs",
      "Entry fees to restricted zones (if any)",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dhaka to Khagrachhari to Sajek",
        activities:
          "Depart Dhaka by night bus. Arrive Khagrachhari in the morning. Board Chander Gari for mountain climb to Sajek. Check in, explore Ruilui Para at sunset. Evening bonfire.",
      },
      {
        day: 2,
        title: "Sajek — A Day Among the Clouds",
        activities:
          "Pre-sunrise cloud-sea view from Konglak Para. Visit Helipad viewpoint. Explore local tribal markets and enjoy traditional dinner.",
      },
      {
        day: 3,
        title: "Sajek to Khagrachhari to Dhaka",
        activities:
          "Morning bird-watching. Descend to Khagrachhari. Visit Alutila Cave. Board return bus to Dhaka.",
      },
    ],
  },
  {
    title: "Cox's Bazar — Longest Natural Beach",
    slug: "coxs-bazar-longest-natural-beach",
    destination: "Cox's Bazar",
    division: "Chittagong",
    category: "Beach & Island",
    description:
      "Cox's Bazar is home to the world's longest unbroken natural sandy beach — stretching 120 km along the Bay of Bengal. This package lets you experience the golden sunsets, fresh seafood, the colourful Rakhine village of Jhautola, and the serene Himchhari waterfall.",
    price: 5200,
    pricePerPerson: 5200,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 25,
    availableSeats: 25,
    departureLocation: "Kolabagan, Dhaka",
    featuredImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    ],
    averageRating: 4.7,
    totalReviews: 212,
    isFeatured: true,
    status: "active",
    inclusions: [
      "AC Bus (Dhaka ↔ Cox's Bazar)",
      "2 Nights Hotel Stay (Sea-facing)",
      "Daily Breakfast",
      "Himchhari & Inani Beach Tour",
      "Beach Guide",
    ],
    exclusions: [
      "Lunch and dinner",
      "Beach water sports",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dhaka to Cox's Bazar Arrival",
        activities:
          "Overnight AC bus from Dhaka. Arrive, check in. Evening beach stroll at Laboni Point and fresh seafood dinner.",
      },
      {
        day: 2,
        title: "Himchhari, Inani & Rakhine Village",
        activities:
          "Visit Himchhari waterfall, Inani coral beach, and Rakhine cultural village. Watch sunset at the beach.",
      },
      {
        day: 3,
        title: "Beach Morning & Return",
        activities:
          "Morning beach walk, shopping at Burmese market, and return bus to Dhaka.",
      },
    ],
  },
  {
    title: "Sundarbans — Mangrove Wilderness Adventure",
    slug: "sundarbans-mangrove-wilderness-adventure",
    destination: "Sundarbans",
    division: "Khulna",
    category: "Wildlife & Forest",
    description:
      "The Sundarbans is the world's largest mangrove forest, a UNESCO World Heritage Site, and home to the Royal Bengal Tiger. This 3-day boat safari takes you deep into the delta waterways, where you may spot spotted deer, river dolphins, crocodiles, and the elusive Bengal tiger.",
    price: 6800,
    pricePerPerson: 6800,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 15,
    availableSeats: 15,
    departureLocation: "Mongla Port, Khulna",
    featuredImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
    galleryImages: [],
    averageRating: 4.9,
    totalReviews: 87,
    isFeatured: true,
    status: "active",
    inclusions: [
      "Houseboat accommodation (2 nights)",
      "All Meals on Board",
      "Boat Safari into Deep Forest Canals",
      "Certified Naturalist and Forest Guide",
      "Forest Department Entry Permits",
    ],
    exclusions: ["Transport to Mongla", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Mongla to Deep Forest Entry",
        activities:
          "Board houseboat at Mongla. Cruise through Passur River. Visit Karamjal wildlife station. Sunset on water.",
      },
      {
        day: 2,
        title: "Tiger Territory — Deep Canal Safari",
        activities:
          "Silent rowboat canal cruise, visit Kotka tiger territory, and deer watching at Jamtola beach.",
      },
      {
        day: 3,
        title: "Dawn Watch & Return",
        activities:
          "Early morning bird watching at Hiron Point. Breakfast on board and cruise back to Mongla.",
      },
    ],
  },
  {
    title: "Sreemangal — Tea Garden and Forest Trails",
    slug: "sreemangal-tea-garden-and-forest-trails",
    destination: "Sreemangal",
    division: "Sylhet",
    category: "Tea Garden & Lakes",
    description:
      "Sreemangal, known as the Tea Capital of Bangladesh, is a lush paradise of rolling tea estates, tropical rainforests, and diverse wildlife. Experience the famous seven-layer tea, trekking through Lawachara National Park, and sunrise over endless emerald tea gardens.",
    price: 3800,
    pricePerPerson: 3800,
    durationDays: 2,
    durationNights: 1,
    maxGroupSize: 18,
    availableSeats: 18,
    departureLocation: "Kamalapur, Dhaka",
    featuredImage:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=85",
    galleryImages: [],
    averageRating: 4.6,
    totalReviews: 63,
    isFeatured: true,
    status: "active",
    inclusions: [
      "Train Ticket (Dhaka ↔ Sreemangal)",
      "1 Night Eco-Resort Stay",
      "Tea Garden Sunrise Tour",
      "Lawachara National Park Trek",
      "Famous 7-Layer Tea Experience",
      "Breakfast and Dinner",
    ],
    exclusions: ["Lunch", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Dhaka to Sreemangal — Into the Green",
        activities:
          "Train from Dhaka to Sreemangal. Check into eco-resort. Afternoon Lawachara jungle walk and 7-layer tea.",
      },
      {
        day: 2,
        title: "Tea Garden Sunrise & Return",
        activities:
          "Sunrise at tea estate, visit Tea Research Institute, and afternoon return train to Dhaka.",
      },
    ],
  },
  {
    title: "Saint Martin's Island — Coral and Crystal Waters",
    slug: "saint-martins-island-coral-and-crystal-waters",
    destination: "Saint Martin's Island",
    division: "Chittagong",
    category: "Beach & Island",
    description:
      "Saint Martin's Island is Bangladesh's only coral island, a jewel in the Bay of Bengal. Surrounded by crystal-clear turquoise water and natural coral reefs, it is the most unique destination in the country.",
    price: 7500,
    pricePerPerson: 7500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 20,
    availableSeats: 20,
    departureLocation: "Cox's Bazar Jetty",
    featuredImage:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
    averageRating: 4.8,
    totalReviews: 156,
    isFeatured: false,
    status: "active",
    inclusions: [
      "Ship Ticket (Cox's Bazar ↔ Saint Martin's)",
      "2 Nights Beach Cottage Stay",
      "All Meals",
      "Chera Dwip Excursion",
      "Snorkeling Guide",
    ],
    exclusions: ["Travel to Cox's Bazar", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Cox's Bazar to Saint Martin's Island",
        activities: "Morning ship departure across Bay of Bengal. Check in, explore coral shores, and sunset.",
      },
      {
        day: 2,
        title: "Chera Dwip Excursion & Snorkeling",
        activities: "Boat trip to Chera Dwip reef, snorkeling in crystal lagoon, evening barbecue on the beach.",
      },
      {
        day: 3,
        title: "Sunrise Walk & Return",
        activities: "Final morning on the island, coconut drinks, and return cruise back to mainland.",
      },
    ],
  },
  {
    title: "Bandarban — Hills, Waterfalls and Tribal Culture",
    slug: "bandarban-hills-waterfalls-and-tribal-culture",
    destination: "Bandarban",
    division: "Chittagong",
    category: "Hill Tracts",
    description:
      "Bandarban is Bangladesh's most elevated district, home to the country's highest peaks. Experience thundering waterfalls, ancient Buddhist temples, and the warm hospitality of the Marma, Tripura, Bawm and Murong communities.",
    price: 5500,
    pricePerPerson: 5500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 15,
    availableSeats: 15,
    departureLocation: "Arambagh, Dhaka",
    featuredImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
    ],
    averageRating: 4.7,
    totalReviews: 94,
    isFeatured: false,
    status: "active",
    inclusions: [
      "AC Bus (Dhaka ↔ Bandarban)",
      "2 Nights Hill Resort Stay",
      "All Meals",
      "Jeep Safari to Nilgiri Viewpoint",
      "Shoilo Propat Waterfall Visit",
      "Mountain Guide",
    ],
    exclusions: ["Personal expenses", "Restricted area permits"],
    itinerary: [
      {
        day: 1,
        title: "Dhaka to Bandarban to Nilgiri",
        activities: "Overnight bus. Board 4x4 jeep to Nilgiri viewpoint. Check into hill resort.",
      },
      {
        day: 2,
        title: "Waterfalls & Tribal Villages",
        activities: "Visit Shoilo Propat waterfall, explore Marma tribal village, and taste local cuisine.",
      },
      {
        day: 3,
        title: "Golden Temple & Return",
        activities: "Visit Rajban Bihar Buddhist temple, Golden Temple viewpoint, and return bus to Dhaka.",
      },
    ],
  },
];

async function seedData() {
  try {
    await connectDB();

    console.log("[Seeder] Clearing existing tour packages...");
    await TourPackage.deleteMany({});

    console.log("[Seeder] Inserting 6 authentic Bangladeshi tour packages...");
    const createdTours = await TourPackage.insertMany(tours);

    console.log(`[Seeder] Successfully imported ${createdTours.length} tour packages into MongoDB!`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
}

seedData();
