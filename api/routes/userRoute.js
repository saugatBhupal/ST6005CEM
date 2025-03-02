const express = require("express");
const {
  updateProfileImage,
  addInterests,
  updateIntro,
  updateDetails,
  getUserByID,
  addSearchHistory,
  getSearchHistory,
  getUsersByName,
  getReviewsByUser,
  getHistoryByUserId,
  updateAbout,
  getActiveTasksByUserId,
  getNotificationsByUserId,
  deleteAllNotificationsByUserId,
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
router.get("/name/:name", getUsersByName);
router.post("/profile-image", updateProfileImage);
router.post("/add-interests", addInterests);
router.post("/education", addEducation);
router.get("/education/:userID", getEducationByUserID);
router.post("/experience", addExperience);
router.get("/experience/:userID", getExperienceByUserID);
router.post("/skill/:userID", addSkillByUserID);
router.put("/update-intro/:userID", updateIntro);
router.put("/update-details/:userID", updateDetails);
router.get("/search-history/:userID", getSearchHistory);
router.post("/search-history", addSearchHistory);
router.get("/:userId/reviews", getReviewsByUser);
router.get("/:userId/history", getHistoryByUserId);
router.get("/:userId/task", getActiveTasksByUserId);
router.get("/:userId/notification", getNotificationsByUserId);
router.delete("/:userId/notification", deleteAllNotificationsByUserId);

module.exports = router;
