const User = require("../models/user");
const asyncHandler = require("../middlewares/async");

exports.addEducation = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  const educationInfo = {
    organization: req.body.organization,
    degree: req.body.degree,
    from: req.body.from,
    to: req.body.to,
  };
  user.education.push(educationInfo);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Education added",
    data: { education: educationInfo },
  });
});

exports.getEducationByUserID = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.params.userID },
      { _id: req.body.email },
      { _id: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  return res.status(200).json({
    success: true,
    message: "User Education Data",
    data: { education: user.education },
  });
});

exports.addExperience = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  const experienceInfo = {
    position: req.body.position,
    organization: req.body.organization,
    status: req.body.status,
    from: req.body.from,
    to: req.body.to,
  };
  user.experience.push(experienceInfo);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Experience added",
    data: { experience: experienceInfo },
  });
});

exports.getExperienceByUserID = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.params.userID },
      { _id: req.body.email },
      { _id: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  return res.status(200).json({ data: {overview: user.overview, experience: user.experience} });
});
