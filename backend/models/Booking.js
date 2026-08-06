const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            unique: true,
            default: () => "SKY" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000),
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        type: { type: String, enum: ["flight", "hotel", "cab"], required: true },

        // ── Flight specific ──
        flight:     { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
        seat:       { type: String },
        cabinClass: { type: String, enum: ["economy", "premiumEconomy", "business", "firstClass"], default: "economy" },
        passengers: [
            {
                firstName: String,
                lastName:  String,
                age:       Number,
                passport:  String,
            },
        ],

        // ── Hotel specific ──
        hotel:     { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
        checkIn:   { type: Date },
        checkOut:  { type: Date },
        rooms:     { type: Number, default: 1 },
        guests:    { type: Number, default: 1 },

        // ── Cab specific ──
        cab:          { type: mongoose.Schema.Types.ObjectId, ref: "Cab" },
        pickupLocation: { type: String },
        dropLocation:   { type: String },
        cabDate:        { type: Date },

        // ── Common ──
        addons: [
            {
                name:  String,
                price: Number,
            },
        ],
        couponCode:    { type: String },
        discount:      { type: Number, default: 0 },
        baseFare:      { type: Number, required: true },
        taxes:         { type: Number, default: 0 },
        totalAmount:   { type: Number, required: true },

        paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
        paymentMethod: { type: String, enum: ["card", "upi", "netbanking", "wallet"], default: "card" },
        paymentId:     { type: String, default: "" },

        status: { type: String, enum: ["upcoming", "completed", "cancelled"], default: "upcoming" },

        cancellationReason: { type: String },
        cancelledAt:        { type: Date },
        refundAmount:       { type: Number, default: 0 },
    },
    { timestamps: true }
);

BookingSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model("Booking", BookingSchema);
