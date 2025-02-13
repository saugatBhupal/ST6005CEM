const express = require("express");
const {
  updateProfileImage,
  addInterests,
  updateIntro,
  updateDetails,
  getUserByID,
} = require("../controllers/userController");

const { addSkillByUserID } = require("../controllers/skillController");

const {
  addEducation,
  getEducationByUserID,
} = require("../controllers/educationController");
const {
  addExperience,
  getExperienceByUserID,
} = require("../controllers/experienceController");
const router = express.Router();

router.get("/:userID", getUserByID);
router.post("/profile-image", updateProfileImage);
router.post("/add-interests", addInterests);
router.post("/education", addEducation);
router.get("/education/:userID", getEducationByUserID);
router.post("/experience", addExperience);
router.get("/experience/:userID", getExperienceByUserID);
router.post("/skill/:userID", addSkillByUserID);
router.put("/update-intro/:userID", updateIntro);
router.put("/update-details/:userID", updateDetails);

module.exports = router;
