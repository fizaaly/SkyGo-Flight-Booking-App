const express = require("express");
const jwt     = require("jsonwebtoken");
const fs      = require("fs");
const path    = require("path");
const router  = express.Router();

const DB_PATH = path.join(__dirname, "../db.json");
const readDB  = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

function getUser(req) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return null;
        return jwt.verify(token, process.env.JWT_SECRET || "skygo_secret_2026");
    } catch { return null; }
}

// POST /api/bookings — Create booking
router.post("/", (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ success: false, message: "Please login first" });

        const db = readDB();
        const booking = {
            id:        "SKY" + Date.now().toString().slice(-6),
            userId:    user.id,
            ...req.body,
            status:        "upcoming",
            paymentStatus: "paid",
            createdAt:     new Date().toISOString(),
        };
        db.bookings.push(booking);
        writeDB(db);
        res.status(201).json({ success: true, data: booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/bookings/my — User's bookings
router.get("/my", (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ success: false, message: "Please login first" });
        const db       = readDB();
        const bookings = (db.bookings || []).filter(b => b.userId === user.id);
        res.json({ success: true, count: bookings.length, data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT /api/bookings/:id/cancel
router.put("/:id/cancel", (req, res) => {
    try {
        const user = getUser(req);
        if (!user) return res.status(401).json({ success: false, message: "Please login first" });
        const db      = readDB();
        const booking = db.bookings.find(b => b.id === req.params.id && b.userId === user.id);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
        booking.status      = "cancelled";
        booking.cancelledAt = new Date().toISOString();
        writeDB(db);
        res.json({ success: true, message: "Booking cancelled", data: booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/bookings — Admin: all bookings
router.get("/", (req, res) => {
    try {
        const db = readDB();
        res.json({ success: true, count: db.bookings.length, data: db.bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
