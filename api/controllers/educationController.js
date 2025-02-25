const User = require("../models/user");
const asyncHandler = require("../middlewares/async");

exports.addEducation = asyncHandler(async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
