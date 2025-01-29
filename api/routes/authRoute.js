const express = require("express");
const {
  register,
  verifyOtp,
  createPassword,
  resendOtp,
  resetPassword,
  login,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/create-password", createPassword);
router.post("/resend-otp", resendOtp);
router.post("/reset-password", resetPassword);
router.post("/login", login);
module.exports = router;
