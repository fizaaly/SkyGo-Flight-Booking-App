const express = require("express");
const fs      = require("fs");
const path    = require("path");
const router  = express.Router();

const DB_PATH = path.join(__dirname, "../db.json");
const readDB  = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

// GET /api/flights
router.get("/", (req, res) => {
    try {
        const { from, to } = req.query;
        const db = readDB();
        let flights = db.flights || [];
        if (from) flights = flights.filter(f => f.from.code?.toUpperCase() === from.toUpperCase());
        if (to)   flights = flights.filter(f => f.to.code?.toUpperCase()   === to.toUpperCase());
        res.json({ success: true, count: flights.length, total: flights.length, data: flights });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/flights/popular
router.get("/popular", (req, res) => {
    const db = readDB();
    res.json({ success: true, data: (db.flights || []).slice(0, 4) });
});

// GET /api/flights/:id
router.get("/:id", (req, res) => {
    const db     = readDB();
    const flight = (db.flights || []).find(f => f.id === req.params.id);
    if (!flight) return res.status(404).json({ success: false, message: "Flight not found" });
    res.json({ success: true, data: flight });
});

module.exports = router;
