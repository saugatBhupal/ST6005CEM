const asyncHandler = require("../middlewares/async");
const user = require("../models/user");
const User = require("../models/user");
const Skill = require("../models/skill");
const { saveMediaAndReturnUrl } = require("../utils/imageUtils");
const UserResponseDto = require("../dto/userResonseDto");
const { getSkillByID } = require("./skillController");

exports.getUserByID = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.userID });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  let skills = [];
  if (user.skills && user.skills.length > 0) {
    skills = await Promise.all(user.skills.map((id) => getSkillByID(id)));
  }
  const userResponseDto = new UserResponseDto({
    _id: user._id,
    fullname: user.fullname,
    profileImage: user.profileImage,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    verified: user.verified,
    country: user.country,
    province: user.province,
    city: user.city,
    about: user.about,
    overview: user.overview,
    interests: user.interests,
    skills: skills,
    createdAt: user.createdAt,
  });
  res.status(200).json({
    success: true,
    message: `Fetched user`,
    data: userResponseDto,
  });
});

exports.updateProfileImage = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  console.log(req);
  if (req.files.media) {
    try {
      url = await saveMediaAndReturnUrl(
        req.files.media,
        `${user._id}/profile/`
      );
      user.profileImage = url;
    } catch (mediaError) {
      console.error("Error saving media:", mediaError);
      return res.status(500).send({ message: "Error saving media" });
    }
  } else {
    return res.status(400).send({ message: "No image uploaded" });
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: `Profile Picture Updated`,
    data: {
      profileImage: user.profileImage,
    },
  });
});

exports.addInterests = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  console.log(req);
  if (req.files.media) {
    try {
      url = await saveMediaAndReturnUrl(
        req.files.media,
        `${user._id}/profile/`
      );
      user.profileImage = url;
    } catch (mediaError) {
      console.error("Error saving media:", mediaError);
      return res.status(500).send({ message: "Error saving media" });
    }
  } else {
    return res.status(400).send({ message: "No image uploaded" });
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: `Profile Picture Updated`,
  });
});

exports.updateIntro = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.params.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  if (req.body.about !== undefined) {
    user.about = req.body.about;
  }
  if (req.body.overview !== undefined) {
    user.overview = req.body.overview;
  }
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      about: user.about,
      overview: user.overview,
    },
  });
});

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.params.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  if (req.body.fullname != undefined) {
    user.fullname = req.body.fullname;
  }
  if (req.body.dob != undefined) {
    user.dob = req.body.dob;
  }
  if (req.body.phone != undefined) {
    user.phone = req.body.phone;
  }
  if (req.body.email != undefined) {
    user.email = req.body.email;
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      fullname: user.fullname,
      dob: user.dob,
      phone: user.phone,
      email: user.email,
    },
  });
});
