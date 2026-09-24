/*
 * constants.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared constant values across the entire frontend.
 *
 * WHY: Putting these here means if a value changes (e.g. a division name),
 * you change it in ONE place and it updates everywhere automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Bangladesh's 8 administrative divisions
export const BANGLADESH_DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Barisal",
  "Rajshahi",
  "Rangpur",
  "Mymensingh",
];

// Booking status values — must match backend enum exactly
export const BOOKING_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

// Fallback image if a tour has no photo
export const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80";

// ─── Mock Featured Tour Packages ─────────────────────────────────────────────
// These represent real, iconic Bangladeshi destinations.
// Will be replaced by real API calls in Phase 3.
export const MOCK_FEATURED_TOURS = [
  {
    _id: "1",
    title: "Sajek Valley — Kingdom of Clouds",
    destination: "Sajek Valley",
    division: "Chittagong",
    pricePerPerson: 4500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 20,
    featuredImage:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
    averageRating: 4.8,
    totalReviews: 124,
    isFeatured: true,
    departureLocation: "Dhaka",
    inclusions: ["AC Bus", "Resort Stay", "All Meals", "Chander Gari"],
  },
  {
    _id: "2",
    title: "Cox's Bazar — Longest Natural Beach",
    destination: "Cox's Bazar",
    division: "Chittagong",
    pricePerPerson: 5200,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 25,
    featuredImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    averageRating: 4.7,
    totalReviews: 212,
    isFeatured: true,
    departureLocation: "Dhaka",
    inclusions: ["AC Bus", "Hotel Stay", "Breakfast", "Beach Guide"],
  },
  {
    _id: "3",
    title: "Sundarbans — Mangrove Wilderness",
    destination: "Sundarbans",
    division: "Khulna",
    pricePerPerson: 6800,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 15,
    featuredImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    averageRating: 4.9,
    totalReviews: 87,
    isFeatured: true,
    departureLocation: "Khulna",
    inclusions: ["Boat Journey", "Forest Lodge", "3 Meals", "Naturalist Guide"],
  },
  {
    _id: "4",
    title: "Sreemangal — Tea Capital of Bangladesh",
    destination: "Sreemangal",
    division: "Sylhet",
    pricePerPerson: 3800,
    durationDays: 2,
    durationNights: 1,
    maxGroupSize: 18,
    featuredImage:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    averageRating: 4.6,
    totalReviews: 63,
    isFeatured: true,
    departureLocation: "Dhaka",
    inclusions: ["AC Bus", "Resort Stay", "Tea Garden Tour", "Breakfast"],
  },
  {
    _id: "5",
    title: "Saint Martin's Island — Coral Paradise",
    destination: "Saint Martin's Island",
    division: "Chittagong",
    pricePerPerson: 7500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 20,
    featuredImage:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    averageRating: 4.8,
    totalReviews: 156,
    isFeatured: false,
    departureLocation: "Cox's Bazar",
    inclusions: [
      "Ship Ticket",
      "Cottage Stay",
      "All Meals",
      "Island Exploration",
    ],
  },
  {
    _id: "6",
    title: "Bandarban — Hills & Waterfalls",
    destination: "Bandarban",
    division: "Chittagong",
    pricePerPerson: 5500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 15,
    featuredImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    averageRating: 4.7,
    totalReviews: 94,
    isFeatured: false,
    departureLocation: "Dhaka",
    inclusions: [
      "AC Bus",
      "Resort Stay",
      "3 Meals",
      "Trekking Guide",
      "Jeep Safari",
    ],
  },
];

// ─── Mock Popular Destinations ────────────────────────────────────────────────
export const MOCK_DESTINATIONS = [
  {
    name: "Sajek Valley",
    division: "Chittagong",
    tourCount: 8,
    image:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80",
  },
  {
    name: "Cox's Bazar",
    division: "Chittagong",
    tourCount: 15,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  },
  {
    name: "Sundarbans",
    division: "Khulna",
    tourCount: 6,
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
  },
  {
    name: "Saint Martin's",
    division: "Chittagong",
    tourCount: 5,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
  {
    name: "Sreemangal",
    division: "Sylhet",
    tourCount: 9,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
  },
  {
    name: "Bandarban",
    division: "Chittagong",
    tourCount: 11,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
];

// ─── Why Choose Us Data ───────────────────────────────────────────────────────
export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "Verified Local Operators",
    description:
      "Every tour partner is personally vetted by our team. We work only with licensed, responsible operators who know Bangladesh inside out.",
    icon: "shield",
  },
  {
    id: 2,
    title: "Transparent Pricing in BDT",
    description:
      "No hidden charges, no surprise fees. The price you see in Bangladeshi Taka (৳) is the price you pay — inclusions clearly listed.",
    icon: "tag",
  },
  {
    id: 3,
    title: "Expert Local Guides",
    description:
      "Our certified guides speak Bangla, English and local dialects. They bring destinations to life with stories, history, and insider access.",
    icon: "map-pin",
  },
  {
    id: 4,
    title: "24/7 Trip Support",
    description:
      "Our on-ground support team is available around the clock during your trip. Whether it's a missed connection or a last-minute question — we've got you.",
    icon: "headphones",
  },
  {
    id: 5,
    title: "Small Group Experiences",
    description:
      "We cap group sizes to ensure a personal, immersive experience. No crowded buses — just you, the landscape, and like-minded travelers.",
    icon: "users",
  },
  {
    id: 6,
    title: "Responsible Tourism",
    description:
      "We partner with eco-conscious accommodations and local communities, ensuring your journey benefits the people and nature of Bangladesh.",
    icon: "leaf",
  },
];
// ─── Full Tour Catalog (with itinerary + reviews + exclusions) ────────────────
// MOCK_FEATURED_TOURS has basic data. MOCK_ALL_TOURS is the enriched master set
// used on /tours and /tours/[id].
export const MOCK_ALL_TOURS = [
  {
    _id: "1",
    title: "Sajek Valley — Kingdom of Clouds",
    slug: "sajek-valley-kingdom-of-clouds",
    destination: "Sajek Valley",
    division: "Chittagong",
    description:
      "Sajek Valley, nestled 1,800 feet above sea level in the Rangamati district, is Bangladesh's most iconic hill station. Known as the 'Queen of Hills', it offers breathtaking views of clouds rolling through the valleys at sunrise. This 3-day package includes a scenic jeep ride through winding mountain roads, a night by a bonfire at Ruilui Para, and spectacular views from Konglak Para.",
    pricePerPerson: 4500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 20,
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
    inclusions: [
      "AC Sleeper Bus (Dhaka to Khagrachhari)",
      "Chander Gari (Jeep) Safari",
      "2 Nights Resort Stay at Sajek",
      "All Meals (Day 1 Dinner to Day 3 Lunch)",
      "Certified Local Guide",
      "Bonfire Night at Ruilui Para",
    ],
    exclusions: [
      "Personal expenses and souvenirs",
      "Entry fees to restricted zones (if any)",
      "Travel insurance",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dhaka to Khagrachhari to Sajek",
        activities:
          "Depart Dhaka by night bus. Arrive Khagrachhari in the morning. Board Chander Gari (local jeep) for the 2.5-hour mountain climb to Sajek. Check into resort, freshen up. Explore Ruilui Para viewpoint at sunset. Bonfire and local cultural experience in the evening.",
      },
      {
        day: 2,
        title: "Sajek — A Day Among the Clouds",
        activities:
          "Wake up before sunrise for the magical cloud-sea view from Konglak Para. After breakfast, visit the Helipad viewpoint — the highest point in Sajek. Explore the local tribal market, interact with Chakma and Tripura communities. Afternoon at leisure. Enjoy a traditional Bangladeshi dinner at the resort.",
      },
      {
        day: 3,
        title: "Sajek to Khagrachhari to Dhaka",
        activities:
          "Early morning bird-watching walk. Enjoy the last sunrise view. Check out after breakfast. Descend by Chander Gari to Khagrachhari. Optional stop at Alutila Cave (own cost). Board bus back to Dhaka. Arrive Dhaka by evening.",
      },
    ],
  },
  {
    _id: "2",
    title: "Cox's Bazar — Longest Natural Sea Beach",
    slug: "coxs-bazar-longest-sea-beach",
    destination: "Cox's Bazar",
    division: "Chittagong",
    description:
      "Cox's Bazar is home to the world's longest unbroken natural sandy beach — stretching 120 km along the Bay of Bengal. This package lets you experience the golden sunsets, fresh seafood, the colourful Rakhine village of Jhautola, and the serene Himchhari waterfall — all while staying at a comfortable beach-front hotel.",
    pricePerPerson: 5200,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 25,
    departureLocation: "Kolabagan, Dhaka",
    featuredImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    ],
    averageRating: 4.7,
    totalReviews: 212,
    isFeatured: true,
    inclusions: [
      "AC Bus (Dhaka to Cox's Bazar)",
      "2 Nights Hotel Stay (Sea-facing room)",
      "Daily Breakfast",
      "Himchhari and Inani Beach Visit",
      "Rakhine Village Cultural Tour",
      "Experienced Beach Guide",
    ],
    exclusions: [
      "Lunch and dinner (except breakfast)",
      "Beach activity charges (surfing, jet ski)",
      "Personal expenses",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dhaka to Cox's Bazar Beach Arrival",
        activities:
          "Overnight AC bus from Dhaka. Arrive Cox's Bazar in the morning. Check into hotel. Rest and freshen up. Evening walk on the main beach at Laboni Point. Explore local seafood stalls for dinner.",
      },
      {
        day: 2,
        title: "Himchhari, Inani and Rakhine Village",
        activities:
          "After breakfast, depart for Himchhari — enjoy the waterfall and panoramic hilltop sea view. Continue south to Inani Beach — famous for its natural coral stones. Visit the Rakhine cultural village at Jhautola. Return to hotel. Sunset at the beach.",
      },
      {
        day: 3,
        title: "Cox's Bazar to Dhaka",
        activities:
          "Final morning beach walk. Breakfast at hotel. Check out and board bus to Dhaka. Arrive Dhaka by evening.",
      },
    ],
  },
  {
    _id: "3",
    title: "Sundarbans — Mangrove Wilderness Adventure",
    slug: "sundarbans-mangrove-wilderness",
    destination: "Sundarbans",
    division: "Khulna",
    description:
      "The Sundarbans is the world's largest mangrove forest, a UNESCO World Heritage Site, and home to the Royal Bengal Tiger. This 3-day boat safari takes you deep into the delta waterways, where you may spot spotted deer, river dolphins, crocodiles, and the elusive Bengal tiger.",
    pricePerPerson: 6800,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 15,
    departureLocation: "Mongla Port, Khulna",
    featuredImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
    galleryImages: [],
    averageRating: 4.9,
    totalReviews: 87,
    isFeatured: true,
    inclusions: [
      "Houseboat accommodation (2 nights)",
      "All Meals on Board",
      "Boat Safari into Deep Forest Canals",
      "Certified Naturalist and Forest Guide",
      "Forest Department Entry Permits",
    ],
    exclusions: [
      "Transport to Mongla from your city",
      "Personal expenses",
      "Travel and medical insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Mongla to Deep Forest Entry",
        activities:
          "Board the houseboat at Mongla Port at 8 AM. Cruise through the Passur River into the Sundarbans. Stop at Karamjal — a forest station with deer and crocodiles. Sunset cruise along tidal channels. Dinner on board.",
      },
      {
        day: 2,
        title: "Tiger Territory — Deep Canal Safari",
        activities:
          "Early morning bird-watching session from the boat deck. Enter deep forest canals by small rowboat for silent wildlife observation. Visit Kotka — the best tiger territory in the Sundarbans. Deer spotted at Jamtola Beach.",
      },
      {
        day: 3,
        title: "Return to Mongla",
        activities:
          "Final dawn cruise at Hiron Point. Watch migratory birds take flight at sunrise. Breakfast on board. Begin return journey to Mongla. Arrive by early afternoon.",
      },
    ],
  },
  {
    _id: "4",
    title: "Sreemangal — Tea Garden and Forest Trails",
    slug: "sreemangal-tea-garden-trails",
    destination: "Sreemangal",
    division: "Sylhet",
    description:
      "Sreemangal, known as the Tea Capital of Bangladesh, is a lush paradise of rolling tea estates, tropical rainforests, and diverse wildlife. Experience the famous seven-layer tea, trekking through Lawachara National Park, and sunrise over endless emerald tea gardens.",
    pricePerPerson: 3800,
    durationDays: 2,
    durationNights: 1,
    maxGroupSize: 18,
    departureLocation: "Kamalapur, Dhaka",
    featuredImage:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=85",
    galleryImages: [],
    averageRating: 4.6,
    totalReviews: 63,
    isFeatured: true,
    inclusions: [
      "Train Ticket (Dhaka to Sreemangal)",
      "1 Night Eco-Resort Stay",
      "Tea Garden Sunrise Tour",
      "Lawachara National Park Trek",
      "Famous 7-Layer Tea Experience",
      "Breakfast and Dinner",
    ],
    exclusions: [
      "Lunch",
      "Personal expenses",
      "Camera fees at tea gardens",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dhaka to Sreemangal — Into the Green",
        activities:
          "Board the Upaban Express from Dhaka. Arrive Sreemangal. Check into eco-resort. Afternoon visit to Lawachara National Park. Visit Nilkantha Tea Cabin for the legendary 7-layer tea. Dinner at resort.",
      },
      {
        day: 2,
        title: "Tea Garden Sunrise and Return",
        activities:
          "Pre-dawn drive to the tea estate for a golden sunrise. Breakfast at resort. Visit the Tea Research Institute Museum. Check out and board train back to Dhaka.",
      },
    ],
  },
  {
    _id: "5",
    title: "Saint Martin's Island — Coral and Crystal Waters",
    slug: "saint-martins-island-coral-paradise",
    destination: "Saint Martin's Island",
    division: "Chittagong",
    description:
      "Saint Martin's Island is Bangladesh's only coral island, a jewel in the Bay of Bengal. Surrounded by crystal-clear turquoise water and natural coral reefs, it is the most unique destination in the country.",
    pricePerPerson: 7500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 20,
    departureLocation: "Cox's Bazar Jetty",
    featuredImage:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
    averageRating: 4.8,
    totalReviews: 156,
    isFeatured: false,
    inclusions: [
      "Ship Ticket (Cox's Bazar to Saint Martin's)",
      "2 Nights Cottage Stay",
      "All Meals",
      "Chera Dwip Day Excursion",
      "Snorkeling Equipment",
      "Island Guide",
    ],
    exclusions: [
      "Transport to Cox's Bazar",
      "Personal expenses",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Cox's Bazar to Saint Martin's Island",
        activities:
          "Board the morning ship from Cox's Bazar jetty. Arrive Saint Martin's. Check in, rest. Afternoon exploration of the coral beach. Stunning sunset on the west shore.",
      },
      {
        day: 2,
        title: "Chera Dwip Excursion and Snorkeling",
        activities:
          "Boat trip to Chera Dwip — best coral reefs. Snorkeling in the turquoise lagoon. Return to main island for afternoon. Evening bonfire on the beach.",
      },
      {
        day: 3,
        title: "Island Morning and Return Journey",
        activities:
          "Final sunrise walk along the shore. Breakfast at cottage. Check out. Board ship back to Cox's Bazar.",
      },
    ],
  },
  {
    _id: "6",
    title: "Bandarban — Hills, Waterfalls and Tribal Culture",
    slug: "bandarban-hills-waterfalls",
    destination: "Bandarban",
    division: "Chittagong",
    description:
      "Bandarban is Bangladesh's most elevated district, home to the country's highest peaks. Experience thundering waterfalls, ancient Buddhist temples, and the warm hospitality of the Marma, Tripura, Bawm and Murong communities.",
    pricePerPerson: 5500,
    durationDays: 3,
    durationNights: 2,
    maxGroupSize: 15,
    departureLocation: "Arambagh, Dhaka",
    featuredImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80",
    ],
    averageRating: 4.7,
    totalReviews: 94,
    isFeatured: false,
    inclusions: [
      "AC Bus (Dhaka to Bandarban)",
      "2 Nights Hill Resort Stay",
      "All Meals",
      "Jeep Safari to Nilgiri",
      "Shoilo Propat Waterfall Visit",
      "Tribal Cultural Village Tour",
      "Experienced Mountain Guide",
    ],
    exclusions: [
      "Personal expenses",
      "Restricted area permits (if applicable)",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dhaka to Bandarban to Nilgiri",
        activities:
          "Night bus from Dhaka. Arrive Bandarban. Board jeep to Nilgiri. Check into hill resort. Enjoy lunch with valley views. Explore Meghla Park in the evening.",
      },
      {
        day: 2,
        title: "Waterfalls and Tribal Villages",
        activities:
          "Visit Shoilo Propat waterfall. Continue to Nafakhum (trekking option). Visit a Marma or Tripura tribal village. Experience local crafts, weaving and cuisine.",
      },
      {
        day: 3,
        title: "Buddhist Temples and Return",
        activities:
          "Morning visit to Rajban Bihar — the largest Buddhist temple in Bangladesh. Golden Temple viewpoint. Breakfast, check out, and board bus back to Dhaka.",
      },
    ],
  },
];

// ─── Mock Reviews ─────────────────────────────────────────────────────────────
export const MOCK_REVIEWS = [
  {
    _id: "r1",
    tour: "1",
    user: { name: "Rafiqul Islam", avatar: "" },
    rating: 5,
    comment:
      "Absolutely magical experience! Woke up to clouds floating below us. The Chander Gari ride is thrilling. Everything was perfectly organized by the Deshiyo team.",
    createdAt: "2024-11-15T00:00:00Z",
  },
  {
    _id: "r2",
    tour: "1",
    user: { name: "Nusrat Jahan", avatar: "" },
    rating: 5,
    comment:
      "Best trip of my life. The bonfire night was so cozy and the views at sunrise from Konglak Para left me speechless. Will definitely go again!",
    createdAt: "2024-10-20T00:00:00Z",
  },
  {
    _id: "r3",
    tour: "1",
    user: { name: "Tanvir Ahmed", avatar: "" },
    rating: 4,
    comment:
      "Great package overall. The resort was comfortable. The road to Sajek is bumpy but that is part of the adventure. Guide was very knowledgeable.",
    createdAt: "2024-09-05T00:00:00Z",
  },
  {
    _id: "r4",
    tour: "2",
    user: { name: "Sumaiya Begum", avatar: "" },
    rating: 5,
    comment:
      "Cox's Bazar at sunset is something you have to experience. The hotel was right on the beach. The Inani beach excursion was an added bonus!",
    createdAt: "2024-12-01T00:00:00Z",
  },
  {
    _id: "r5",
    tour: "3",
    user: { name: "Dr. Kamal Hossain", avatar: "" },
    rating: 5,
    comment:
      "Saw a Bengal Tiger on Day 2! I could not believe it. The houseboat was comfortable and the food was excellent. The naturalist guide was exceptional.",
    createdAt: "2024-08-18T00:00:00Z",
  },
];

// ─── Team Members (for /about page) ──────────────────────────────────────────
export const MOCK_TEAM_MEMBERS = [
  {
    name: "Mahbub Rahman",
    role: "Founder and CEO",
    bio: "15 years of travel industry experience. Passionate about promoting sustainable domestic tourism in Bangladesh.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Sabrina Haque",
    role: "Head of Operations",
    bio: "Ensures every tour runs like clockwork. Personally oversees partner vetting and quality assurance.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Arif Chowdhury",
    role: "Lead Tour Designer",
    bio: "Has explored every corner of Bangladesh. Designs itineraries that balance adventure, culture, and comfort.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Tasnia Akter",
    role: "Customer Experience Manager",
    bio: "Our 24/7 support anchor. She ensures every traveler feels supported from first inquiry to safe return.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

// ─── Sort Options ─────────────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating_desc" },
  { label: "Most Reviewed", value: "reviews_desc" },
];

// ─── Price Range Filters ──────────────────────────────────────────────────────
export const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under 4,000", min: 0, max: 4000 },
  { label: "4,000 to 6,000", min: 4000, max: 6000 },
  { label: "6,000 to 8,000", min: 6000, max: 8000 },
  { label: "Above 8,000", min: 8000, max: Infinity },
];
