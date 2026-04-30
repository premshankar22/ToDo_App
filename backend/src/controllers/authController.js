// src/controllers/authController.js

const TempUser = require("../models/TempUser");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = require("../util/sendEmail");

/* ---------------- USER ID ---------------- */
const generateUserId = () => {
  return "USER-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
};

/* ---------------- REGISTER (SEND OTP) ---------------- */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists =
      (await User.findOne({ email })) ||
      (await TempUser.findOne({ email }));

    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateUserId();

    /* 🔐 GENERATE OTP */
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await TempUser.create({
      userId,
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 1000 * 60 * 10, // 10 min
    });

    /* 📩 SEND EMAIL */
    await sendEmail(
      email,
      "Your OTP Code",
      `
      <h2>Your OTP Code</h2>
      <h1 style="letter-spacing:5px;">${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
      `
    );

    res.json({ message: "OTP sent to email 📩" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- VERIFY OTP ---------------- */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(400).json({ message: "No registration found" });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP ❌" });
    }

    if (tempUser.otpExpiry < Date.now()) {
      await TempUser.deleteOne({ _id: tempUser._id });
      return res.status(400).json({ message: "OTP expired ⏳" });
    }

    /* 🔥 MOVE TO MAIN USER */
    await User.create({
      userId: tempUser.userId,
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true,
    });

    await TempUser.deleteOne({ _id: tempUser._id });

    res.json({ message: "Account verified successfully ✅" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- LOGIN ---------------- */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};