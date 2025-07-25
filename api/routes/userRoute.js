const express = require("express");
const { body, param, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const { auth } = require("../middlewares/auth");

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

// Rate limiters
const updateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 updates per 15 minutes
  message: "Too many profile updates, please try again later",
});

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ID validation
const validateUserId = param("userID").isMongoId();
const validateUserId2 = param("userId").isMongoId();

// Input validation rules
const interestsValidation = [
  body("interests").isArray().withMessage("Interests must be an array"),
  body("interests.*").trim().isLength({ min: 1 }).escape(),
];

const educationValidation = [
  body("institution").trim().isLength({ min: 2 }).escape(),
  body("degree").trim().isLength({ min: 2 }).escape(),
  body("field").trim().isLength({ min: 2 }).escape(),
  body("startDate").isISO8601(),
  body("endDate").optional().isISO8601(),
];

const experienceValidation = [
  body("company").trim().isLength({ min: 2 }).escape(),
  body("position").trim().isLength({ min: 2 }).escape(),
  body("startDate").isISO8601(),
  body("endDate").optional().isISO8601(),
  body("description").trim().escape(),
];

const detailsValidation = [
  body("fullName").optional().trim().isLength({ min: 2 }).escape(),
  body("phone").optional().isMobilePhone(),
  body("location").optional().trim().escape(),
];

// Protected routes with validation
router.get("/:userID", validateUserId, validateRequest, auth, getUserByID);
router.get(
  "/name/:name",
  [param("name").trim().escape()],
  validateRequest,
  getUsersByName
);
router.post("/profile-image", updateLimiter, auth, updateProfileImage);
router.post(
  "/add-interests",
  interestsValidation,
  validateRequest,
  auth,
  addInterests
);
router.post(
  "/education",
  educationValidation,
  validateRequest,
  auth,
  addEducation
);
router.get(
  "/education/:userID",
  validateUserId,
  validateRequest,
  auth,
  getEducationByUserID
);
router.post(
  "/experience",
  experienceValidation,
  validateRequest,
  auth,
  addExperience
);
router.get(
  "/experience/:userID",
  validateUserId,
  validateRequest,
  auth,
  getExperienceByUserID
);
router.post(
  "/skill/:userID",
  [
    validateUserId,
    body("skills").isArray(),
    body("skills.*.name").trim().isLength({ min: 1 }).escape(),
    body("skills.*.level").isInt({ min: 1, max: 5 }),
  ],
  validateRequest,
  auth,
  addSkillByUserID
);
router.put(
  "/update-intro/:userID",
  [
    validateUserId,
    body("intro").trim().isLength({ min: 10, max: 500 }).escape(),
  ],
  validateRequest,
  updateLimiter,
  auth,
  updateIntro
);
router.put(
  "/update-details/:userID",
  [validateUserId, ...detailsValidation],
  validateRequest,
  updateLimiter,
  auth,
  updateDetails
);
router.get(
  "/search-history/:userID",
  validateUserId,
  validateRequest,
  auth,
  getSearchHistory
);
router.post(
  "/search-history",
  [body("searchTerm").trim().escape(), body("userID").isMongoId()],
  validateRequest,
  auth,
  addSearchHistory
);
router.get(
  "/:userId/reviews",
  validateUserId2,
  validateRequest,
  getReviewsByUser
);
router.get(
  "/:userId/history",
  validateUserId2,
  validateRequest,
  auth,
  getHistoryByUserId
);
router.get(
  "/:userId/task",
  validateUserId2,
  validateRequest,
  auth,
  getActiveTasksByUserId
);
router.get(
  "/:userId/notification",
  validateUserId2,
  validateRequest,
  auth,
  getNotificationsByUserId
);
router.delete(
  "/:userId/notification",
  validateUserId2,
  validateRequest,
  auth,
  deleteAllNotificationsByUserId
);

module.exports = router;
