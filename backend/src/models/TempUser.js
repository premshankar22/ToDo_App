// models/TempUser.js
const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    /* 🔐 OTP */
    otp: {
      type: String,
      required: true,
    },

    /* ⏳ AUTO DELETE AFTER EXPIRY */
    otpExpiry: {
      type: Date,
      required: true,
      expires: 0, // 🔥 Mongo auto delete
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TempUser", tempUserSchema);