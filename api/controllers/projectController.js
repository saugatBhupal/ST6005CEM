const Project = require("../models/project");
const Skill = require("../models/skill");
const User = require("../models/user");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate({
        path: "postedBy",
        select: "_id name profilePicture email phone country city",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id name profilePicture email phone country city",
      })
      .populate({
        path: "members",
        select: "_id name profilePicture email phone country city",
      });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate({
        path: "postedBy",
        select: "_id name profilePicture email phone country city",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id name profilePicture email phone country city",
      })
      .populate({
        path: "members",
        select: "_id name profilePicture email phone country city",
      });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProjectsBySkills = async (req, res) => {
  try {
    const { skillNames } = req.body;

    if (!skillNames || !Array.isArray(skillNames) || skillNames.length === 0) {
      return res.status(400).json({ message: "Invalid skillNames array" });
    }

    const normalizedSkillNames = skillNames.map((skill) => skill.toLowerCase());

    const skills = await Skill.find(
      { name: { $in: normalizedSkillNames } },
      "_id"
    );
    const skillIds = skills.map((skill) => skill._id);

    if (skillIds.length === 0) {
      return res.status(404).json({ message: "No matching skills found" });
    }

    const projects = await Project.aggregate([
      {
        $match: { skills: { $in: skillIds } },
      },
      {
        $addFields: {
          matchCount: {
            $size: {
              $setIntersection: ["$skills", skillIds],
            },
          },
        },
      },
      { $sort: { matchCount: -1 } },
    ]);

    const populatedProjects = await Project.populate(projects, [
      {
        path: "postedBy",
        select: "_id name profilePicture email phone country city",
      },
      { path: "skills" },
      { path: "likes", select: "_id" },
      {
        path: "applicants.user",
        select: "_id name profilePicture email phone country city",
      },
      {
        path: "members",
        select: "_id name profilePicture email phone country city",
      },
    ]);

    res.status(200).json(populatedProjects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getProjectsByUser = async (req, res) => {
  try {
    const projects = await Project.find({ postedBy: req.params.userId }).populate(
      "postedBy skills likes applicants.user members"
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProjectsByPosition = async (req, res) => {
  try {
    const projects = await Project.find({ position: req.params.position }).populate(
      "postedBy skills likes applicants.user members"
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProjectsByName = async (req, res) => {
  try {
    const searchQuery = req.params.projectName.trim().toLowerCase();
    const searchWords = searchQuery.split(/\s+/);

    const projects = [];
    const projectPromises = searchWords.map((searchWord) =>
      Project.find({ projectName: { $regex: new RegExp(searchWord, "i") } })
    );
    const results = await Promise.all(projectPromises);

    results.forEach((projectList) => projects.push(...projectList));

    const uniqueProjects = [...new Map(projects.map((project) => [project._id, project])).values()];

    const processedProjects = uniqueProjects
      .map((project) => {
        const projectWords = project.projectName.toLowerCase().split(/\s+/);
        const matchCount = projectWords.filter((word) =>
          searchWords.includes(word)
        ).length;
        const matchPercentage = (matchCount / projectWords.length) * 100;

        return { project, matchPercentage };
      })
      .filter(({ matchPercentage }) => matchPercentage >= 20)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .map(({ project }) => project);

    const populatedProjects = await Project.populate(processedProjects, [
      {
        path: "postedBy",
        select: "_id name profilePicture email phone country city",
      },
      { path: "skills" },
      { path: "likes", select: "_id" },
      {
        path: "applicants.user",
        select: "_id name profilePicture email phone country city",
      },
      {
        path: "members",
        select: "_id name profilePicture email phone country city",
      },
    ]);

    res.status(200).json(populatedProjects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const {
      projectName,
      position,
      address,
      postedBy,
      skills,
      site,
      status,
      salary,
    } = req.body;

    if (
      !projectName ||
      !position ||
      !address ||
      !postedBy ||
      !skills ||
      skills.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const normalizedSkills = skills.map((skill) => skill.toLowerCase());

    const existingSkills = await Skill.find(
      { name: { $in: normalizedSkills } },
      "_id name"
    );
    const existingSkillIds = existingSkills.map((skill) => skill._id);
    const existingSkillNames = existingSkills.map((skill) => skill.name);

    const missingSkills = skills.filter(
      (skill) => !existingSkillNames.includes(skill)
    );

    const createdSkills = [];
    if (missingSkills.length > 0) {
      for (let skillName of missingSkills) {
        const newSkill = new Skill({ name: skillName });
        const savedSkill = await newSkill.save();
        createdSkills.push(savedSkill._id);
      }
    }

    const skillIds = [...existingSkillIds, ...createdSkills];

    const newProject = new Project({
      projectName,
      position,
      address,
      postedBy,
      skills: skillIds,
      site,
      status,
      salary: salary || { min: 0, max: 0 },
    });
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
