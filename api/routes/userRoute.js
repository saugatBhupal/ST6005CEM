const express = require("express");
const {
  updateProfileImage,
  addInterests,
  addEducation,
  getEducation,
} = require("../controllers/userController");

const router = express.Router();

router.post("/profile-image", updateProfileImage);
router.post("/add-interests", addInterests);
router.post("/add-education", addEducation);
router.get("/get-education/:userID",getEducation);

module.exports = router;
