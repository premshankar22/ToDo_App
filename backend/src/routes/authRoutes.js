// src/routes/authRoutes.js

const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyOtp,
  loginUser,
} = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
} = require("../middleware/authValidation");

const validate = require("../middleware/validate");

/* ---------------- ROUTES ---------------- */

router.post("/register", registerValidation, validate, registerUser);
router.post("/verify-otp", verifyOtp); // ✅ OTP ONLY
router.post("/login", loginValidation, validate, loginUser);

module.exports = router;