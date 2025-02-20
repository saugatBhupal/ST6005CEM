const express = require("express");
const {
  getAllProjects,
  getProjectById,
  getProjectsBySkills,
  getProjectsByUser,
  getProjectsByPosition,
  getProjectsByName,
  createProject,
  getProjectsByMember,
  applyToProject,
  getAppliedProjects,
} = require("../controllers/projectController");

const router = express.Router();

router.get("", getAllProjects);
router.get("/:id", getProjectById);
router.post("/search/skills", getProjectsBySkills);
router.get("/user/:userId", getProjectsByUser);
router.get("/member/:userId", getProjectsByMember);
router.get("/position/:position", getProjectsByPosition);
router.get("/name/:projectName", getProjectsByName);
router.post("/apply", applyToProject);
router.get("/applied-projects/:userId", getAppliedProjects);
router.post("", createProject);

module.exports = router;
