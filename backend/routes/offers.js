const express = require("express");
const fs      = require("fs");
const path    = require("path");
const router  = express.Router();

const DB_PATH = path.join(__dirname, "../db.json");
const readDB  = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

// GET /api/offers
router.get("/", (req, res) => {
    try {
        const { category } = req.query;
        const db = readDB();
        let offers = db.offers || [];
        if (category && category !== "all") offers = offers.filter(o => o.category === category);
        res.json({ success: true, count: offers.length, data: offers });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/offers/validate
router.post("/validate", (req, res) => {
    try {
        const { couponCode, amount } = req.body;
        const db    = readDB();
        const offer = (db.offers || []).find(o => o.couponCode === couponCode?.toUpperCase());
        if (!offer) return res.status(404).json({ success: false, message: "Invalid coupon code" });

        let discount = offer.discountType === "percent"
            ? Math.round((amount * offer.discountValue) / 100)
            : offer.discountValue;
        if (offer.maxDiscount) discount = Math.min(discount, offer.maxDiscount);

        res.json({ success: true, message: `Coupon applied! You save ₹${discount}`, data: { offer, discount, finalAmount: amount - discount } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/offers/:id
router.get("/:id", (req, res) => {
    const db    = readDB();
    const offer = (db.offers || []).find(o => o.id === req.params.id);
    if (!offer) return res.status(404).json({ success: false, message: "Offer not found" });
    res.json({ success: true, data: offer });
});

module.exports = router;
