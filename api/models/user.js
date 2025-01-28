const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");
const address = require("./address");
const interest = require("./interest");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    default: null,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  province: {
    type: String,
    default: null,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  verificationOtp: {
    type: String,
    required: false,
    default: null,
  },
  verificationOtpExpire: {
    type: Date,
    required: false,
    default: null,
  },
  resetPasswordOtp: {
    type: String,
    required: false,
    default: null,
  },
  resetPasswordOtpExpire: {
    type: Date,
    required: false,
    default: null,
  },
  interest: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Interest",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("modified")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
