const mongoose = require("mongoose");

const CabSchema = new mongoose.Schema(
    {
        type:        { type: String, enum: ["micro", "sedan", "suv", "premium"], required: true },
        name:        { type: String, required: true },
        description: { type: String },
        capacity:    { type: Number, required: true },
        baggage:     { type: Number, required: true },
        pricePerKm:  { type: Number, required: true },
        basePrice:   { type: Number, required: true },
        amenities:   [String],
        image:       { type: String, default: "" },
        isAvailable: { type: Boolean, default: true },
        popular:     { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cab", CabSchema);
