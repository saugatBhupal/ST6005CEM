const User = require("../models/user");
const Project = require("../models/project");
const Review = require("../models/review");
const project = require("../models/project");

exports.addReview = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { reviews } = req.body;

    if (!projectId || !Array.isArray(reviews)) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const project = await Project.findById(projectId);
    if (project == null) {
      return res.status(404).json({ message: "Project does not exist" });
    }
    const reviewDocs = await Review.insertMany(
      reviews.map((review) => ({
        projectId,
        reviewedBy: project.postedBy._id.toString(),
        user: review._id,
        review: review.review,
        rating: review.rating,
      }))
    );

    for (const review of reviews) {
      await User.findByIdAndUpdate(review._id, { $push: { reviews: review } });
    }

    await Project.findByIdAndUpdate(projectId, {
      $push: { reviews: { $each: reviewDocs } },
    });

    res
      .status(200)
      .json({ message: "Reviews saved successfully", reviews: reviewDocs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
exports.getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId || reviewId === null) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const review = await Review.findById(reviewId)
      .populate({
        path: "user",
        select: "_id fullname profileImage",
      })
      .populate({
        path: "reviewedBy",
        select: "_id fullname profileImage",
      });
    if (review == null || !review) {
      return res.status(404).json({ message: "Review does not exist" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
