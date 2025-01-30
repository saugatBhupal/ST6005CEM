const asyncHandler = require("../middlewares/async");
const User = require("../models/user");
const { saveMediaAndReturnUrl } = require("../utils/imageUtils");

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
    message: `ProfilePicture Updated`,
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
    message: `ProfilePicture Updated`,
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
    message: `ProfilePicture Updated`,
  });
});
