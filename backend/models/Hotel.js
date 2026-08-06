const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
    {
        name:     { type: String, required: true, trim: true },
        category: { type: String, enum: ["luxury", "budget", "resort", "boutique"], required: true },
        location: {
            city:    { type: String, required: true },
            country: { type: String, required: true },
            address: { type: String },
        },
        rating:      { type: Number, min: 1, max: 5, required: true },
        reviewCount: { type: Number, default: 0 },
        images:      [String],
        pricePerNight: { type: Number, required: true },
        amenities:   [String],
        rooms: [
            {
                type:      String,
                price:     Number,
                available: Number,
                maxGuests: Number,
            },
        ],
        description: { type: String },
        isActive:    { type: Boolean, default: true },
    },
    { timestamps: true }
);

HotelSchema.index({ "location.city": 1, category: 1, pricePerNight: 1 });

module.exports = mongoose.model("Hotel", HotelSchema);
