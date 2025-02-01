const asyncHandler = require("../middlewares/async");
const Skill = require("../models/skill");

exports.getSkillByID = async (id) => {
  const skill = Skill.findById({ id: id });
  if (!skill) {
    //
  }
  return skill;
};
