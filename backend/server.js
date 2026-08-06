const express = require("express");
const cors    = require("cors");
const path    = require("path");
const dotenv  = require("dotenv");

dotenv.config();

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: "*" }));
app.use(express.json());

// ── Serve frontend ──────────────────────────────────────────
app.use(express.static(path.join(__dirname, "..")));

// ── API Routes ──────────────────────────────────────────────
app.use("/api/auth",     require("./routes/auth"));
app.use("/api/flights",  require("./routes/flights"));
app.use("/api/hotels",   require("./routes/hotels"));
app.use("/api/cabs",     require("./routes/cabs"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/offers",   require("./routes/offers"));

// ── Health check ────────────────────────────────────────────
app.get("/api/health", (req, res) => {
    res.json({
        success:  true,
        status:   "✅ SkyGo API Running",
        database: "📁 JSON File (db.json)",
        time:     new Date().toISOString(),
        endpoints: [
            "POST /api/auth/login",
            "POST /api/auth/register",
            "GET  /api/auth/me",
            "GET  /api/flights",
            "GET  /api/hotels",
            "GET  /api/cabs",
            "GET  /api/offers",
            "POST /api/bookings",
            "GET  /api/bookings/my",
        ]
    });
});

// ── Frontend fallback ───────────────────────────────────────
app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(__dirname, "..", "index.html"));
    } else {
        res.status(404).json({ success: false, message: "API route not found" });
    }
});

// ── Start ───────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("─────────────────────────────────────────");
    console.log(`🚀 SkyGo Server running!`);
    console.log(`🌐 Frontend : http://localhost:${PORT}`);
    console.log(`📡 API Base : http://localhost:${PORT}/api`);
    console.log(`❤️  Health   : http://localhost:${PORT}/api/health`);
    console.log("─────────────────────────────────────────");
    console.log("👤 Login Credentials:");
    console.log("   fiza@skygo.com  / fiza123");
    console.log("   admin@skygo.com / admin123");
    console.log("   demo@skygo.com  / demo123");
    console.log("─────────────────────────────────────────");
});
