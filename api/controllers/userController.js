const asyncHandler = require("../middlewares/async");
const user = require("../models/user");
const User = require("../models/user");
const Skill = require("../models/skill")
const { saveMediaAndReturnUrl } = require("../utils/imageUtils");

exports.getUserByID = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.userID });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.status(200).json({
    success: true,
    message: `User`,
    data: user
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
    data: {
      profileImage: user.profileImage,
    }
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

exports.addEducation = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      {_id: req.body.userID},
      {email: req.body.email},
      {phone: req.body.phone},
    ],
  });
  if(!user){
    return res.status(400).send({message: "User does not exist"});
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
    data: educationInfo,
  })
});

exports.getEducation = asyncHandler(async(req, res, next) =>{
  const user = await User.findOne({
    $or: [
      {_id: req.params.userID},
      {_id: req.body.email},
      {_id: req.body.phone},
    ],
  });
  if(!user){
    return res.status(400).send({message: "User does not exist"});
  }
  return res.status(200).json({ data: user.education });
});

exports.addExperience = asyncHandler(async(req, res, next) => {
  const user = await User.findOne({
    $or: [
      {_id: req.body.userID},
      {email: req.body.email},
      {phone: req.body.phone},
    ],
  });
  if(!user){
    return res.status(400).send({message: "User does not exist"});
  }
  const experienceInfo = {
    position: req.body.position,
    organization: req.body.organization,
    status: req.body.status,
    from: req.body.from,
    to: req.body.to
  };
  user.experience.push(experienceInfo);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Experience added",
    data: experienceInfo,
  })
});

exports.getExperience = asyncHandler(async(req, res, next) =>{
  const user = await User.findOne({
    $or: [
      {_id: req.params.userID},
      {_id: req.body.email},
      {_id: req.body.phone},
    ],
  });
  if(!user){
    return res.status(400).send({message: "User does not exist"});
  }
  return res.status(200).json({ data: user.experience });
});

exports.addSkill = asyncHandler(async (req, res, next) => {
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
  let skill = await Skill.findOne({ name: req.body.skillName });
  if (!skill) {
    skill = new Skill({
      name: req.body.skillName,
    });
    await skill.save();
  }
  const userSkillLst = user.skills.some(
    (userSkills) => userSkills.toString() === skill._id.toString()
  );
  if (userSkillLst) {
    return res.status(400).send({ message: "Skill already exists" });
  }
  user.skills.push(skill._id);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Skill added",
    data: user.skills,
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
  if(req.body.fullname != undefined){
    user.fullname = req.body.fullname;
  }
  if(req.body.dob != undefined){
    user.dob = req.body.dob;
  }
  if(req.body.phone != undefined){
    user.phone = req.body.phone;
  }
  if(req.body.email != undefined){
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