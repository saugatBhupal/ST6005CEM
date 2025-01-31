const express = require("express");
const {
  updateProfileImage,
  addInterests,
  addEducation,
  getEducation,
  addExperience,
  getExperience,
  addSkill,
} = require("../controllers/userController");

const router = express.Router();

router.post("/profile-image", updateProfileImage);
router.post("/add-interests", addInterests);
router.post("/add-education", addEducation);
router.get("/get-education/:userID",getEducation);
router.post("/add-experience", addExperience);
router.get("/get-experience/:userID",getExperience);
router.post("/add-skill/:userID",addSkill);

module.exports = router;
