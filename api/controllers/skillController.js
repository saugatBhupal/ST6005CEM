const asyncHandler = require("../middlewares/async");
const Skill = require("../models/skill");
const User = require("../models/user");
exports.getSkillByID = async (id) => {
  const skill = Skill.findById({ _id: id });
  if (!skill) {
    //
  }
  return skill;
};

exports.addSkillByUserID = asyncHandler(async (req, res, next) => {
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
  let skill = await Skill.findOne({ name: req.body.name });
  if (!skill) {
    skill = new Skill({
      name: req.body.name,
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

  let skills = [];
  if (user.skills && user.skills.length > 0) {
    skills = await Promise.all(user.skills.map((id) => exports.getSkillByID(id))); 
  }
  res.status(200).json({
    success: true,
    message: "Skill added",
    data: {skills: skills},
  });
});