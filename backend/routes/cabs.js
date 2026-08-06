const express = require("express");
const fs      = require("fs");
const path    = require("path");
const router  = express.Router();

const DB_PATH = path.join(__dirname, "../db.json");
const readDB  = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

// GET /api/cabs
router.get("/", (req, res) => {
    try {
        const db   = readDB();
        const cabs = db.cabs || [
            { id:"c1", type:"micro",   name:"Micro",   capacity:3, baggage:1, basePrice:599,  pricePerKm:12 },
            { id:"c2", type:"sedan",   name:"Sedan",   capacity:4, baggage:2, basePrice:899,  pricePerKm:15, popular:true },
            { id:"c3", type:"suv",     name:"SUV",     capacity:6, baggage:4, basePrice:1299, pricePerKm:20 },
            { id:"c4", type:"premium", name:"Premium", capacity:4, baggage:3, basePrice:1999, pricePerKm:28 },
        ];
        res.json({ success: true, count: cabs.length, data: cabs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/cabs/estimate
router.post("/estimate", (req, res) => {
    const { cabId, distance } = req.body;
    if (!distance) return res.status(400).json({ success: false, message: "Distance required" });
    const fare   = 899 + 15 * Number(distance);
    const taxes  = Math.round(fare * 0.05);
    res.json({ success: true, data: { baseFare: fare, taxes, totalFare: fare + taxes, distance } });
});

module.exports = router;
