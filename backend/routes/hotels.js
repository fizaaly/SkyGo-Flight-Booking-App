const express = require("express");
const fs      = require("fs");
const path    = require("path");
const router  = express.Router();

const DB_PATH = path.join(__dirname, "../db.json");
const readDB  = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

// GET /api/hotels
router.get("/", (req, res) => {
    try {
        const { city, category } = req.query;
        const db = readDB();
        let hotels = db.hotels || [];
        if (city)     hotels = hotels.filter(h => h.city?.toLowerCase().includes(city.toLowerCase()));
        if (category) hotels = hotels.filter(h => h.category === category);
        res.json({ success: true, count: hotels.length, total: hotels.length, data: hotels });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/hotels/featured
router.get("/featured", (req, res) => {
    const db = readDB();
    res.json({ success: true, data: (db.hotels || []).slice(0, 4) });
});

// GET /api/hotels/:id
router.get("/:id", (req, res) => {
    const db    = readDB();
    const hotel = (db.hotels || []).find(h => h.id === req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    res.json({ success: true, data: hotel });
});

module.exports = router;
