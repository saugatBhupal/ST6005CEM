const express = require("express");
const {
  updateProfileImage,
  addInterests,
} = require("../controllers/userController");

const router = express.Router();

router.post("/profile-image", updateProfileImage);
router.post("/add-interests", addInterests);

module.exports = router;
