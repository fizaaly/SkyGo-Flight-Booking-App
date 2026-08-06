const mongoose = require("mongoose");
const dotenv   = require("dotenv");
dotenv.config();

const User    = require("./models/User");
const Flight  = require("./models/Flight");
const Hotel   = require("./models/Hotel");
const Cab     = require("./models/Cab");
const Offer   = require("./models/Offer");

// ── Sample Data ────────────────────────────────────────────────

const users = [
    {
        firstName: "Admin",
        lastName:  "SkyGo",
        email:     "admin@skygo.com",
        phone:     "+91 9000000000",
        password:  "Admin@1234",
        role:      "admin",
    },
    {
        firstName: "Fiza",
        lastName:  "Khan",
        email:     "fiza@example.com",
        phone:     "+91 9876543210",
        password:  "Fiza@1234",
        role:      "user",
    },
];

const flights = [
    {
        flightNumber: "6E-201",
        airline:      "IndiGo",
        from:         { city: "New Delhi",  airport: "Indira Gandhi International", code: "DEL" },
        to:           { city: "Mumbai",     airport: "Chhatrapati Shivaji Maharaj", code: "BOM" },
        departureTime:"06:30",
        arrivalTime:  "08:40",
        duration:     "2h 10m",
        date:         new Date("2026-08-10"),
        stops:        0,
        price:        { economy: 3499, premiumEconomy: 5999, business: 12999 },
        seats:        { economy: { total: 180, available: 120 }, business: { total: 20, available: 14 } },
        amenities:    ["WiFi", "USB Charging", "Snacks"],
        baggage:      { cabin: "7 kg", checked: "15 kg" },
    },
    {
        flightNumber: "AI-302",
        airline:      "Air India",
        from:         { city: "Mumbai",     airport: "Chhatrapati Shivaji Maharaj", code: "BOM" },
        to:           { city: "Dubai",      airport: "Dubai International", code: "DXB" },
        departureTime:"14:00",
        arrivalTime:  "17:40",
        duration:     "3h 40m",
        date:         new Date("2026-08-12"),
        stops:        0,
        price:        { economy: 18999, business: 49999, firstClass: 95000 },
        seats:        { economy: { total: 200, available: 85 }, business: { total: 30, available: 18 } },
        amenities:    ["WiFi", "Meal", "Entertainment", "USB Charging"],
        baggage:      { cabin: "7 kg", checked: "25 kg" },
    },
    {
        flightNumber: "QP-405",
        airline:      "Akasa Air",
        from:         { city: "Delhi",      airport: "Indira Gandhi International", code: "DEL" },
        to:           { city: "Goa",        airport: "Goa International", code: "GOI" },
        departureTime:"10:15",
        arrivalTime:  "12:50",
        duration:     "2h 35m",
        date:         new Date("2026-08-15"),
        stops:        0,
        price:        { economy: 3899, premiumEconomy: 6499 },
        seats:        { economy: { total: 180, available: 95 } },
        amenities:    ["Snacks", "USB Charging"],
        baggage:      { cabin: "7 kg", checked: "15 kg" },
    },
    {
        flightNumber: "EK-503",
        airline:      "Emirates",
        from:         { city: "Dubai",      airport: "Dubai International", code: "DXB" },
        to:           { city: "London",     airport: "Heathrow Airport", code: "LHR" },
        departureTime:"22:00",
        arrivalTime:  "02:15",
        duration:     "7h 15m",
        date:         new Date("2026-08-20"),
        stops:        0,
        price:        { economy: 42999, business: 120000, firstClass: 220000 },
        seats:        { economy: { total: 300, available: 210 }, business: { total: 48, available: 32 } },
        amenities:    ["WiFi", "Gourmet Meals", "Entertainment", "Flat Bed (Business)", "Bar"],
        baggage:      { cabin: "7 kg", checked: "30 kg" },
    },
    {
        flightNumber: "6E-789",
        airline:      "IndiGo",
        from:         { city: "Bengaluru",  airport: "Kempegowda International", code: "BLR" },
        to:           { city: "New Delhi",  airport: "Indira Gandhi International", code: "DEL" },
        departureTime:"07:00",
        arrivalTime:  "09:15",
        duration:     "2h 15m",
        date:         new Date("2026-08-10"),
        stops:        0,
        price:        { economy: 4299, premiumEconomy: 7499 },
        seats:        { economy: { total: 180, available: 65 } },
        amenities:    ["USB Charging", "Snacks"],
        baggage:      { cabin: "7 kg", checked: "15 kg" },
    },
];

const hotels = [
    {
        name:     "Royal Palace Hotel",
        category: "luxury",
        location: { city: "New Delhi", country: "India", address: "Connaught Place, New Delhi" },
        rating:   4.9, reviewCount: 312,
        images:   ["images/hotels/hotel 1.jpg"],
        pricePerNight: 6999,
        amenities: ["WiFi", "Pool", "Spa", "Gym", "Fine Dining", "Valet Parking"],
        description: "A 5-star luxury hotel in the heart of New Delhi with world-class amenities.",
    },
    {
        name:     "Grand Resort Dubai",
        category: "luxury",
        location: { city: "Dubai", country: "UAE", address: "Downtown Dubai" },
        rating:   4.8, reviewCount: 284,
        images:   ["images/hotels/hotel 2.jpg"],
        pricePerNight: 9499,
        amenities: ["WiFi", "Infinity Pool", "Beach Access", "Gym", "Spa", "Multiple Restaurants"],
        description: "Iconic luxury resort with stunning views of the Burj Khalifa.",
    },
    {
        name:     "Sky Suites Paris",
        category: "boutique",
        location: { city: "Paris", country: "France", address: "Champs-Élysées, Paris" },
        rating:   4.9, reviewCount: 198,
        images:   ["images/hotels/hotel 3.jpg"],
        pricePerNight: 11999,
        amenities: ["WiFi", "Butler Service", "Rooftop Dining", "Spa", "Concierge"],
        description: "Exclusive boutique hotel with Eiffel Tower views.",
    },
    {
        name:     "Ocean View Maldives",
        category: "resort",
        location: { city: "Malé", country: "Maldives", address: "North Malé Atoll" },
        rating:   5.0, reviewCount: 421,
        images:   ["images/hotels/hotel 4.jpg"],
        pricePerNight: 14999,
        amenities: ["WiFi", "Overwater Bungalows", "Snorkeling", "Spa", "Private Beach", "Scuba Diving"],
        description: "World's most exclusive overwater resort experience.",
    },
    {
        name:     "Mountain Inn Kashmir",
        category: "budget",
        location: { city: "Srinagar", country: "India", address: "Dal Lake, Srinagar" },
        rating:   4.6, reviewCount: 156,
        images:   ["images/hotels/hotel 5.jpg"],
        pricePerNight: 5999,
        amenities: ["WiFi", "Bonfire", "Trekking", "Dal Lake View", "Local Cuisine"],
        description: "Cozy mountain retreat with breathtaking views of Dal Lake.",
    },
];

const cabs = [
    {
        type: "micro", name: "Micro", description: "Compact & affordable for solo travellers",
        capacity: 3, baggage: 1, pricePerKm: 12, basePrice: 599,
        amenities: ["AC", "Music"], popular: false,
    },
    {
        type: "sedan", name: "Sedan", description: "Comfortable ride for families & groups",
        capacity: 4, baggage: 2, pricePerKm: 15, basePrice: 899,
        amenities: ["AC", "Music", "Bottle Water"], popular: true,
    },
    {
        type: "suv", name: "SUV", description: "Spacious SUV for large groups & luggage",
        capacity: 6, baggage: 4, pricePerKm: 20, basePrice: 1299,
        amenities: ["AC", "Music", "Bottle Water", "Extra Leg Room"], popular: false,
    },
    {
        type: "premium", name: "Premium", description: "Luxury sedan for a premium experience",
        capacity: 4, baggage: 3, pricePerKm: 28, basePrice: 1999,
        amenities: ["AC", "WiFi", "Refreshments", "Newspaper", "Phone Charger"], popular: false,
    },
];

const offers = [
    {
        title:        "Domestic Flight Sale",
        description:  "Flat 25% off on all domestic routes. Book now!",
        category:     "flight",
        couponCode:   "SKYDOM25",
        discountType: "percent",
        discountValue: 25,
        maxDiscount:  2500,
        minBookingAmount: 1500,
        expiresAt:    new Date("2026-08-31"),
    },
    {
        title:        "International Flights Deal",
        description:  "Save up to ₹10,000 instantly on international bookings.",
        category:     "flight",
        couponCode:   "SKYINTL10K",
        discountType: "flat",
        discountValue: 10000,
        minBookingAmount: 20000,
        expiresAt:    new Date("2026-09-15"),
    },
    {
        title:        "Luxury Hotel Stays",
        description:  "Up to 40% off on premium hotel stays.",
        category:     "hotel",
        couponCode:   "SKYLUX40",
        discountType: "percent",
        discountValue: 40,
        maxDiscount:  5000,
        minBookingAmount: 5000,
        expiresAt:    new Date("2026-09-10"),
    },
    {
        title:        "Summer Holiday Packages",
        description:  "Book flight + hotel and save 30%.",
        category:     "package",
        couponCode:   "SKYSUMMER30",
        discountType: "percent",
        discountValue: 30,
        maxDiscount:  4000,
        minBookingAmount: 8000,
        expiresAt:    new Date("2026-08-20"),
    },
    {
        title:        "Airport Cab Deal",
        description:  "20% off on your first airport cab booking.",
        category:     "cab",
        couponCode:   "SKYCAB20",
        discountType: "percent",
        discountValue: 20,
        maxDiscount:  300,
        minBookingAmount: 500,
        expiresAt:    new Date("2026-09-30"),
    },
    {
        title:        "Honeymoon Special",
        description:  "35% off on couple packages to Maldives, Bali & Paris.",
        category:     "package",
        couponCode:   "SKYHONEY35",
        discountType: "percent",
        discountValue: 35,
        maxDiscount:  7000,
        minBookingAmount: 15000,
        expiresAt:    new Date("2026-08-25"),
    },
];

// ── Seed function ──────────────────────────────────────────────
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected for seeding...");

        // Clear existing data
        await Promise.all([
            User.deleteMany(),
            Flight.deleteMany(),
            Hotel.deleteMany(),
            Cab.deleteMany(),
            Offer.deleteMany(),
        ]);
        console.log("🗑️  Cleared existing data");

        // Insert new data
        await User.insertMany(users);
        await Flight.insertMany(flights);
        await Hotel.insertMany(hotels);
        await Cab.insertMany(cabs);
        await Offer.insertMany(offers);

        console.log("✅ Seeded: 2 Users, 5 Flights, 5 Hotels, 4 Cabs, 6 Offers");
        console.log("─────────────────────────────────────────");
        console.log("👤 Admin:  admin@skygo.com   / Admin@1234");
        console.log("👤 User:   fiza@example.com  / Fiza@1234");
        console.log("─────────────────────────────────────────");

        process.exit(0);
    } catch (err) {
        console.error("❌ Seed error:", err.message);
        process.exit(1);
    }
};

seedDB();
