const express  = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const fs       = require("fs");
const path     = require("path");
const router   = express.Router();

const DB_PATH = path.join(__dirname, "../db.json");

// ── Helpers ────────────────────────────────────────────────
function readDB() {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}
function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
function makeToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "skygo_secret_2026",
        { expiresIn: "7d" }
    );
}
function safeUser(u) {
    const { password, ...rest } = u;
    return rest;
}

// ── POST /api/auth/login ───────────────────────────────────
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const db   = readDB();
        const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return res.status(401).json({ success: false, message: "No account found with this email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Wrong password. Try again." });
        }

        const token = makeToken(user);
        res.json({ success: true, token, user: safeUser(user) });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── POST /api/auth/register ────────────────────────────────
router.post("/register", async (req, res) => {
    try {
        const { fname, firstName, lastName, lname, email, phone, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const db = readDB();
        if (db.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashed  = await bcrypt.hash(password, 10);
        const newUser = {
            id:        Date.now().toString(),
            fname:     fname || firstName || email.split("@")[0],
            lname:     lname || lastName  || "",
            email:     email.toLowerCase(),
            phone:     phone || "",
            password:  hashed,
            role:      "user",
            createdAt: new Date().toISOString(),
        };

        db.users.push(newUser);
        writeDB(db);

        const token = makeToken(newUser);
        res.status(201).json({ success: true, token, user: safeUser(newUser) });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── GET /api/auth/me ───────────────────────────────────────
router.get("/me", (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        const token   = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "skygo_secret_2026");
        const db      = readDB();
        const user    = db.users.find(u => u.id === decoded.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, user: safeUser(user) });
    } catch {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
});

// ── POST /api/auth/logout ──────────────────────────────────
router.post("/logout", (req, res) => {
    res.json({ success: true, message: "Logged out successfully" });
});

// ── GET /api/auth/users — Admin: list users ────────────────
router.get("/users", (req, res) => {
    try {
        const db = readDB();
        res.json({ success: true, count: db.users.length, data: db.users.map(safeUser) });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
