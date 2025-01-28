const express = require("express");
const { getStudents } = require("../controllers/userController");
const router = express.Router();

router.get("/", getStudents);
module.exports = router;
