const asyncHandler = require("../middlewares/async");
const Interest = require("../models/skill");
const User = require("../models/user");
const emailTemplates = require("../utils/emailTemplate");
const { getSignedJwtToken } = require("../utils/jwtUtils");
const sendMail = require("../utils/mailUtil");
const {
  generateDefaultPassword,
  generateOtp,
  generateOtpExpiry,
  encrypt,
  comparePasswords,
} = require("../utils/utils");

exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }

  req.body.password = await generateDefaultPassword();
  const otp = generateOtp();
  req.body.verificationOtp = otp;
  req.body.verificationOtpExpire = generateOtpExpiry();

  try {
    const emailTemplate = emailTemplates.verificationEmailMessage(
      req.body.fullname,
      otp
    );

    await sendMail(
      req.body.email,
      "Co-Sphere : Verification OTP",
      emailTemplate
    );
  } catch (e) {
    console.error("Error sending email:", e.message);

    return res.status(550).send({
      message:
        "Internal Server Error while sending mail. Please re-check your E-mail address.",
    });
  }

  await User.create(req.body);

  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: {
      email: req.email,
    },
  });
});

exports.verifyOtp = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User doesnt exist" });
  }
  if (req.body.type === "verify-user") {
    if (!(req.body.otp === user.verificationOtp)) {
      return res.status(401).send({ message: "Otp is incorrect" });
    }
    if (user.verificationOtpExpire < Date.now()) {
      return res.status(400).send({ message: "OTP has expired" });
    }
    user.verificationOtp = null;
  } else if (req.body.type === "reset-password") {
    if (!(req.body.otp === user.resetPasswordOtp)) {
      return res.status(401).send({ message: "Otp is incorrect" });
    }
    if (user.resetPasswordOtpExpire < Date.now()) {
      return res.status(400).send({ message: "OTP has expired" });
    }
    user.resetPasswordOtp = null;
  } else {
    return res.status(400).send({
      message: "Invalid type, must be 'verify-user' or 'reset-password'",
    });
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "OTP is correct",
  });
});

exports.createPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User doesnt exist" });
  }
  if (user.verified) {
    return res.status(400).send({ message: "User already verified" });
  }
  if (user.verificationOtp !== null) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  user.password = await encrypt(req.body.password);
  user.verified = true;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User has been verified",
  });
});

exports.resendOtp = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }],
  });
  if (!user) {
    return res.status(400).send({ message: "User doesnt exist" });
  }
  if (req.body.type === "verify-user") {
    const otp = generateOtp();
    user.verificationOtp = otp;
    user.verificationOtpExpire = generateOtpExpiry();

    try {
      const emailTemplate = emailTemplates.verificationEmailMessage(
        user.fullname,
        otp
      );

      await sendMail(
        req.body.email,
        "Co-Sphere : Verification OTP",
        emailTemplate
      );
    } catch (e) {
      console.error("Error sending email:", e.message);

      return res.status(550).send({
        message:
          "Internal Server Error while sending mail. Please re-check your E-mail address.",
      });
    }
  } else if (req.body.type === "reset-password") {
    const otp = generateOtp();
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpire = generateOtpExpiry();

    try {
      const emailTemplate = emailTemplates.resetPasswordEmailMessage(
        user.fullname,
        otp
      );

      await sendMail(
        req.body.email,
        "Co-Sphere : Reset Password OTP",
        emailTemplate
      );
    } catch (e) {
      console.error("Error sending email:", e.message);

      return res.status(550).send({
        message:
          "Internal Server Error while sending mail. Please re-check your E-mail address.",
      });
    }
  } else {
    return res.status(400).send({
      message: "Invalid type, must be 'verify-user' or 'reset-password'",
    });
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: `${req.body.type} otp sent`,
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User doesnt exist" });
  }
  if (user.resetPasswordOtp !== null) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  user.password = await encrypt(req.body.password);
  user.verified = true;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password has been reset",
  });
});
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User doesnt exist" });
  }
  if (!(await comparePasswords(req.body.password, user.password))) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profileImage: user.profileImage,
      jwt: getSignedJwtToken(user._id),
    },
  });
});
