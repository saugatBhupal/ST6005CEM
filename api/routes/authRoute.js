const express = require("express");
const {
  register,
  verifyOtp,
  createPassword,
  resendOtp,
  resetPassword,
  login,
} = require("../controllers/authController");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// Rate limit for login attempts - 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again after 15 minutes",
});

// Rate limit for password reset - 3 attempts per hour
const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many password reset attempts, please try again after an hour",
});

// Validation middleware
const registerValidation = [
  body("email").isEmail().normalizeEmail(),
  body("fullName").trim().isLength({ min: 2, max: 50 }).escape(),
  body("phone").optional().isMobilePhone().trim(),
];

const passwordValidation = [
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes with validation and rate limiting
router.post("/register", registerValidation, validateRequest, register);
router.post(
  "/verify-otp",
  [
    body("otp").isNumeric().isLength({ min: 6, max: 6 }),
    body("email").isEmail().normalizeEmail(),
  ],
  validateRequest,
  verifyOtp
);
router.post(
  "/create-password",
  passwordValidation,
  validateRequest,
  createPassword
);
router.post(
  "/resend-otp",
  [body("email").isEmail().normalizeEmail()],
  validateRequest,
  resendOtp
);
router.post(
  "/reset-password",
  resetLimiter,
  [body("email").isEmail().normalizeEmail()],
  validateRequest,
  resetPassword
);
router.post(
  "/login",
  loginLimiter,
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  validateRequest,
  login
);

module.exports = router;
