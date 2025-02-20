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

    const normalizedSkillNames = skillNames.map((skill) => skill.toLowerCase());

    const skills = await Skill.find(
      { name: { $in: normalizedSkillNames } },
      "_id"
    );
    const skillIds = skills.map((skill) => skill._id);

    if (skillIds.length === 0) {
      return res.status(404).json({ message: "No matching skills found" });
    }

    const jobs = await Job.aggregate([
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

    const populatedJobs = await Job.populate(jobs, [
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
        path: "hired",
        select: "_id name profilePicture email phone country city",
      },
    ]);

    res.status(200).json(populatedJobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getJobsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("createdJobs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await Job.find({ _id: { $in: user.createdJobs } })
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

exports.getJobsByMember = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("appliedJobs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await Job.find({ _id: { $in: user.appliedJobs } })
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
    const searchQuery = req.params.jobName.trim().toLowerCase();
    const searchWords = searchQuery.split(/\s+/);

    const jobs = [];
    const jobPromises = searchWords.map((searchWord) =>
      Job.find({ jobName: { $regex: new RegExp(searchWord, "i") } })
    );
    const results = await Promise.all(jobPromises);

    results.forEach((jobList) => jobs.push(...jobList));

    const uniqueJobs = [
      ...new Map(jobs.map((job) => [job._id.toString(), job])).values(),
    ];

    // const jobs = await Job.find({
    //   jobName: { $regex: new RegExp(searchQuery, "i") },
    // });

    const processedJobs = uniqueJobs
      .map((job) => {
        const jobWords = job.jobName.toLowerCase().split(/\s+/);
        const matchCount = jobWords.filter((word) =>
          searchWords.includes(word)
        ).length;
        const matchPercentage = (matchCount / jobWords.length) * 100;

        return { job, matchPercentage };
      })
      .filter(({ matchPercentage }) => matchPercentage >= 20)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)

      .map(({ job }) => job);

    const populatedJobs = await Job.populate(processedJobs, [
      {
        path: "postedBy",
        select: "_id fullname profileImage email phone country city ",
      },
      { path: "skills" },
      { path: "likes", select: "_id" },
    ]);

    res.status(200).json(populatedJobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
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
      companyName,
      site,
      status,
      salary,
    } = req.body;

    // Validate required fields
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

    // Normalize skill names to lowercase
    const normalizedSkills = skills.map((skill) => skill.toLowerCase());

    // Find or create skills in a single query using upsert
    const skillIds = await Promise.all(
      normalizedSkills.map(async (skillName) => {
        // Use findOneAndUpdate with upsert to avoid duplicates
        const skill = await Skill.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${skillName}$`, "i") } }, // Case-insensitive search
          { $setOnInsert: { name: skillName } }, // Insert only if not found
          { upsert: true, new: true } // Return the document after update/insert
        );
        return skill._id;
      })
    );

    // Create the new job
    const newJob = new Job({
      jobName,
      position,
      address,
      postedBy,
      companyName,
      skills: skillIds,
      site,
      status,
      salary: salary || { min: 0, max: 0 },
    });

    // Save the job
    const savedJob = await newJob.save();

    // Update the user's createdJobs array
    const user = await User.findByIdAndUpdate(
      postedBy,
      { $push: { createdJobs: savedJob._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the saved job
    res.status(200).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res
        .status(400)
        .json({ message: "User ID and Job ID are required." });
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user has already applied
    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.user.toString() === userId
    );
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "User has already applied for this job." });
    }

    // Add user to applicants
    job.applicants.push({ user: userId, status: "Pending" });
    await job.save();

    // Add job to user's applied jobs
    user.appliedJobs.push(jobId);
    await user.save();

    res.status(200).json({ message: "Successfully applied to job." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(userId).populate({
      path: "appliedJobs",
      select: "jobName position companyName site applicants postedBy address",
      populate: [
        {
          path: "postedBy",
          select: "_id fullname profileImage country city",
        },
        {
          path: "applicants.user",
          select: "_id",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const appliedJobs = user.appliedJobs.map((job) => {
      const application = job.applicants.find(
        (applicant) => applicant.user._id.toString() === userId
      );
      console.log(job);
      return {
        _id: job._id,
        postedBy: job.postedBy,
        jobName: job.jobName,
        companyName: job.companyName,
        status: application.status,
        site: job.site,
        address: job.address,
      };
    });

    res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
