const express = require("express");
const { updateProfileImage } = require("../controllers/userController");

const router = express.Router();

router.post("/profile-image", updateProfileImage);

module.exports = router;
