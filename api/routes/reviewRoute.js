const express = require("express");

const router = express.Router();

const { addReview, getReviewById } = require("../controllers/reviewController");

router.post("/:projectId", addReview);
router.get("/:reviewId", getReviewById);
module.exports = router;
