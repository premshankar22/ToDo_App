// middleware/authValidation.js

const { body } = require("express-validator");

/* ---------------- REGISTER VALIDATION ---------------- */
exports.registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2–50 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Must include uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Must include a number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Must include special character"),
];

/* ---------------- LOGIN VALIDATION ---------------- */
exports.loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Enter valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];