const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema(
    {
        flightNumber: { type: String, required: true, unique: true, uppercase: true },
        airline:      { type: String, required: true },
        airlineLogo:  { type: String, default: "" },
        from: {
            city:    { type: String, required: true },
            airport: { type: String, required: true },
            code:    { type: String, required: true, uppercase: true, minlength: 3, maxlength: 3 },
        },
        to: {
            city:    { type: String, required: true },
            airport: { type: String, required: true },
            code:    { type: String, required: true, uppercase: true, minlength: 3, maxlength: 3 },
        },
        departureTime: { type: String, required: true },
        arrivalTime:   { type: String, required: true },
        duration:      { type: String, required: true },
        date:          { type: Date,   required: true },
        stops:         { type: Number, default: 0 },
        price: {
            economy:        { type: Number, required: true },
            premiumEconomy: { type: Number },
            business:       { type: Number },
            firstClass:     { type: Number },
        },
        seats: {
            economy:        { total: Number, available: Number },
            premiumEconomy: { total: Number, available: Number },
            business:       { total: Number, available: Number },
            firstClass:     { total: Number, available: Number },
        },
        amenities:  [String],
        baggage:    { cabin: String, checked: String },
        status:     { type: String, enum: ["scheduled", "delayed", "cancelled", "completed"], default: "scheduled" },
        isActive:   { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Index for fast search
FlightSchema.index({ "from.code": 1, "to.code": 1, date: 1 });
FlightSchema.index({ airline: 1 });

module.exports = mongoose.model("Flight", FlightSchema);
