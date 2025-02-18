const Job = require("../models/job");
const Skill = require("../models/skill");
const User = require("../models/user");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
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
        path: "hired",
        select: "_id name profilePicture email phone country city",
      });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
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
        path: "hired",
        select: "_id name profilePicture email phone country city",
      });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getJobsBySkills = async (req, res) => {
  try {
    const { skillNames } = req.body;

    if (!skillNames || !Array.isArray(skillNames) || skillNames.length === 0) {
      return res.status(400).json({ message: "Invalid skillNames array" });
    }

    const skills = await Skill.find({ name: { $in: skillNames } }, "_id");
    const skillIds = skills.map((skill) => skill._id);

    if (skillIds.length === 0) {
      return res.status(404).json({ message: "No matching skills found" });
    }

    const jobs = await Job.find({ skills: { $in: skillIds } }).populate(
      "postedBy skills likes applicants.user hired"
    );

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getJobsByUser = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.userId }).populate(
      "postedBy skills likes applicants.user hired"
    );
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getJobsByPosition = async (req, res) => {
  try {
    const jobs = await Job.find({ position: req.params.position }).populate(
      "postedBy skills likes applicants.user hired"
    );
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getJobsByName = async (req, res) => {
  try {
    const jobs = await Job.find({
      jobName: { $regex: new RegExp(req.params.jobName, "i") },
    }).populate("postedBy skills likes applicants.user hired");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getJobsByCompany = async (req, res) => {
  try {
    const jobs = await Job.find({
      companyName: { $regex: new RegExp(req.params.companyName, "i") },
    }).populate("postedBy skills likes applicants.user hired");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.createJob = async (req, res) => {
  try {
    const {
      jobName,
      position,
      address,
      postedBy,
      skills,
      site,
      status,
      salary,
    } = req.body;

    if (
      !jobName ||
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

    // const skillIds = [];
    const skillIds = [...existingSkillIds, ...createdSkills];

    const newJob = new Job({
      jobName,
      position,
      address,
      postedBy,
      skills: skillIds,
      site,
      status,
      salary: salary || { min: 0, max: 0 },
    });
    const savedJob = await newJob.save();
    res.status(200).json(skillIds);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
