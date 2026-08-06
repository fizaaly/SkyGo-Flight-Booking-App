const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
    {
        title:       { type: String, required: true },
        description: { type: String, required: true },
        category:    { type: String, enum: ["flight", "hotel", "cab", "package"], required: true },
        couponCode:  { type: String, required: true, uppercase: true, unique: true },
        discountType:{ type: String, enum: ["percent", "flat"], required: true },
        discountValue:{ type: Number, required: true },
        maxDiscount: { type: Number },
        minBookingAmount: { type: Number, default: 0 },
        image:       { type: String, default: "" },
        expiresAt:   { type: Date, required: true },
        isActive:    { type: Boolean, default: true },
        usageLimit:  { type: Number, default: 100 },
        usedCount:   { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Offer", OfferSchema);
