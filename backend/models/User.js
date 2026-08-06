const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: [true, "First name is required"], trim: true, maxlength: 50 },
        lastName:  { type: String, required: [true, "Last name is required"],  trim: true, maxlength: 50 },
        email:     { type: String, required: [true, "Email is required"], unique: true, lowercase: true,
                     match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] },
        phone:     { type: String, required: [true, "Phone is required"], match: [/^[0-9+\s-]{7,15}$/, "Invalid phone number"] },
        password:  { type: String, required: [true, "Password is required"], minlength: 8, select: false },
        avatar:    { type: String, default: "" },
        role:      { type: String, enum: ["user", "admin"], default: "user" },
        isVerified:{ type: Boolean, default: false },
        wishlist:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
    },
    { timestamps: true }
);

// Hash password before save
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
UserSchema.methods.matchPassword = async function (entered) {
    return await bcrypt.compare(entered, this.password);
};

// Generate JWT
UserSchema.methods.getSignedJwt = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "7d",
    });
};

// Virtual full name
UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("User", UserSchema);
