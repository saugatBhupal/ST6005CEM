const { json } = require("express");
const Project = require("../models/project");
const Skill = require("../models/skill");
const User = require("../models/user");
const {
  populateApplicantsWithStatus,
  populateApplicantsWithStatusFromList,
  populateTasksWithStatus,
} = require("../utils/project/projectApiUtils");
const { io, getSocketIdfromUserId } = require("../config/socketConfig");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate({
        path: "postedBy",
        select: "_id name profileImage email phone country city",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id name profileImage email phone country city",
      })
      .populate({
        path: "members",
        select: "_id name profileImage email phone country city",
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
        select: "_id fullname profileImage email phone country city ",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id fullname profileImage email phone country city",
      })
      .populate({
        path: "members",
        select: "_id fullname profileImage email phone country city",
      })
      .populate({
        path: "tasks.members",
        select: "_id fullname profileImage email phone country city",
      });

    if (!project) return res.status(404).json({ message: "Project not found" });

    let projectWithStatus = populateApplicantsWithStatus(project);
    projectWithStatus = populateTasksWithStatus(projectWithStatus);
    res.status(200).json(projectWithStatus);
  } catch (error) {
    console.log(error);
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
        select: "_id name profileImage email phone country city",
      },
      { path: "skills" },
      { path: "likes", select: "_id" },
      {
        path: "applicants.user",
        select: "_id name profileImage email phone country city",
      },
      {
        path: "members",
        select: "_id name profileImage email phone country city",
      },
    ]);

    res.status(200).json(populatedProjects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getProjectsByMember = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "appliedProjects"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({ _id: { $in: user.appliedProjects } })
      .populate({
        path: "postedBy",
        select: "_id name profileImage email phone country city",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id name profileImage email phone country city",
      })
      .populate({
        path: "hired",
        select: "_id name profileImage email phone country city",
      });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProjectsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "createdProjects"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({ _id: { $in: user.createdProjects } })
      .populate({
        path: "postedBy",
        select: "_id name profileImage email phone country city",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id name profileImage email phone country city",
      })
      .populate({
        path: "members",
        select: "_id name profileImage email phone country city",
      });

    const projectsWithStatus = populateApplicantsWithStatusFromList(projects);

    res.status(200).json(projectsWithStatus);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProjectsByPosition = async (req, res) => {
  try {
    const projects = await Project.find({
      position: req.params.position,
    }).populate("postedBy skills likes applicants.user members");
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

    const uniqueProjects = [
      ...new Map(
        projects.map((project) => [project._id.toString(), project])
      ).values(),
    ];

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

    // Populate project fields
    const populatedProjects = await Project.populate(processedProjects, [
      {
        path: "postedBy",
        select: "_id name profileImage email phone country city fullname",
      },
      { path: "skills" },
      { path: "likes", select: "_id" },
      // {
      //   path: "applicants.user",
      //   select: "_id name profileImage email phone country city",
      // },
      // {
      //   path: "members",
      //   select: "_id name profileImage email phone country city",
      // },
    ]);
    const hiringProjects = populatedProjects.filter(
      (project) => project.status === "Hiring"
    );
    res.status(200).json(hiringProjects);
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
      companyName,
      postedBy,
      skills,
      site,
      status,
      from,
      to,
      description,
      salary,
    } = req.body;
    if (
      !projectName ||
      !position ||
      !address ||
      !postedBy ||
      !skills ||
      !site ||
      !description ||
      skills.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const normalizedSkills = skills.map((skill) => skill.toLowerCase());

    const skillIds = await Promise.all(
      normalizedSkills.map(async (skillName) => {
        const skill = await Skill.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${skillName}$`, "i") } },
          { $setOnInsert: { name: skillName } },
          { upsert: true, new: true }
        );
        return skill._id;
      })
    );

    const newProject = new Project({
      projectName,
      position,
      address,
      postedBy,
      companyName,
      description,
      skills: skillIds,
      site,
      status,
      members: [],
      applicants: [],
      salary: salary || { min: 0, max: 0 },
    });
    if (from && to) {
      newProject.duration = { from, to };
    }
    const savedProject = await newProject.save();

    const user = await User.findByIdAndUpdate(
      postedBy,
      { $push: { createdProjects: savedProject._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(savedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.applyToProject = async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    if (!userId || !projectId) {
      return res
        .status(400)
        .json({ message: "User ID and project ID are required." });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Ensure applicants array is initialized
    if (!project.applicants) {
      project.applicants = [];
    }

    // Check if the user already applied
    const alreadyApplied = project.applicants.some(
      (applicant) => applicant.user.toString() === userId
    );
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "User has already applied for this project." });
    }

    // Add the user to the applicants list
    project.applicants.push({ user: userId, status: "Pending" });
    await project.save();

    // Ensure appliedProjects array is initialized
    if (!user.appliedProjects) {
      user.appliedProjects = [];
    }

    // Add the project to the user's applied projects
    user.appliedProjects.push(projectId);
    await user.save();

    res.status(200).json({
      message: "Successfully applied to project.",
      applicantStatus: { userId, status: "Pending" },
      project,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getAppliedProjects = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(userId).populate({
      path: "appliedProjects",
      select:
        "projectName position companyName site applicants postedBy address salary createdAt status",
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

    const appliedProjects = user.appliedProjects.map((project) => {
      const application = project.applicants.find(
        (applicant) => applicant.user._id.toString() === userId
      );
      return {
        _id: project._id,
        postedBy: project.postedBy,
        projectName: project.projectName,
        companyName: project.companyName,
        status: application.status,
        projectStatus: project.status,
        site: project.site,
        address: project.address,
        salary: project.salary,
        createdAt: project.createdAt,
      };
    });
    console.log(appliedProjects);
    res.status(200).json(appliedProjects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getHiringProjectsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "createdProjects"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({
      _id: { $in: user.createdProjects },
      status: "Hiring",
    })
      .populate({
        path: "postedBy",
        select: "_id name profileImage email phone country city",
      })
      .populate("skills")
      .populate({
        path: "applicants.user",
        select: "_id fullname profileImage",
      })
      .populate("likes")
      .populate({
        path: "members",
        select: "_id name profileImage email phone country city",
      });

    const projectsWithStatus = populateApplicantsWithStatusFromList(projects);
    res.status(200).json(projectsWithStatus);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getActiveProjectsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "createdProjects"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({
      _id: { $in: user.createdProjects },
      status: "Active",
    })
      .populate({
        path: "postedBy",
        select: "_id name profileImage email phone country city",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id name profileImage email phone country city",
      })
      .populate({
        path: "members",
        select: "_id name profileImage email phone country city",
      });

    const projectsWithStatus = populateApplicantsWithStatusFromList(projects);

    res.status(200).json(projectsWithStatus);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
exports.getCompletedProjectsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "createdProjects"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({
      _id: { $in: user.createdProjects },
      status: "Completed",
    })
      .populate({
        path: "postedBy",
        select: "_id name profileImage email phone country city",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id name profileImage email phone country city",
      })
      .populate({
        path: "members",
        select: "_id name profileImage email phone country city",
      });

    const projectsWithStatus = populateApplicantsWithStatusFromList(projects);

    res.status(200).json(projectsWithStatus);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.hireUser = async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let hiredApplicant = null;
    project.applicants = project.applicants.map((applicant) => {
      if (applicant.user.toString() === userId) {
        hiredApplicant = { ...applicant.toObject(), status: "Accepted" };
        return hiredApplicant;
      }
      return applicant;
    });

    if (!hiredApplicant) {
      return res
        .status(400)
        .json({ message: "User did not apply to this project" });
    }

    await project.save();
    const socketId = getSocketIdfromUserId(userId);
    if (socketId != "undefined" || socketId != null) {
      io.to(socketId).emit("receiveNotification", `You have a been hired.`);
    }
    res
      .status(200)
      .json({ message: "User hired successfully", applicant: hiredApplicant });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.rejectUser = async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let rejectedApplicant = null;
    project.applicants = project.applicants.map((applicant) => {
      if (applicant.user.toString() === userId) {
        rejectedApplicant = { ...applicant.toObject(), status: "Rejected" };
        return rejectedApplicant;
      }
      return applicant;
    });

    if (!rejectedApplicant) {
      return res
        .status(400)
        .json({ message: "User did not apply to this project" });
    }

    await project.save();

    const socketId = getSocketIdfromUserId(userId);
    if (socketId != "undefined" || socketId != null) {
      io.to(socketId).emit("receiveNotification", `You have a been rejected.`);
    }

    res.status(200).json({
      message: "User rejected successfully",
      applicant: rejectedApplicant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.finishHiring = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const acceptedApplicants = project.applicants
      .filter((applicant) => applicant.status === "Accepted")
      .map((applicant) => applicant.user);

    project.members = [...new Set([...project.members, ...acceptedApplicants])];

    project.status = "Active";
    if (project.members.length < 1) {
      res.status(400).json({
        message: "Cannot finish hiring process without atleast 1 member.",
      });
    } else {
      await project.save();

      res.status(200).json({
        message: "Hiring has completed. Project moved to active",
        members: project.members,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { taskName, taskDescription, deadline, members } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    console.log(members);
    members.map((member) => {
      if (!project.members.includes(member))
        return res.status(400).json({
          message: "Tasks can only be assigned to members of project.",
        });
    });
    const createdAt = new Date();
    const newTask = {
      taskName,
      taskDescription,
      deadline,
      members,
      createdDate: createdAt,
    };

    project.tasks.push(newTask);
    await project.save();

    const createdTask = project.tasks.filter(
      (task) => task.createdDate == createdAt
    );
    console.log(newTask);
    res.status(200).json({
      message: "Task added successfully",
      task: createdTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getTask = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).select("tasks").populate({
      path: "tasks.members",
      select: "_id fullname profileImage city country email phone",
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.completeTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId).select("tasks").populate({
      path: "tasks",
      select:
        "_id taskName taskDescription deadline status completionDate completionType", // Populate the required fields
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = project.tasks.find((task) => task._id.toString() === taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const currentDate = new Date();
    let completionType = "On-Time";

    if (task.deadline < currentDate) {
      completionType = "Delayed";
    }

    task.status = "Completed";
    task.completionDate = currentDate;
    task.completionType = completionType;

    await project.save();

    const savedTask = project.tasks.filter((task) => task._id == taskId);

    res.status(200).json({
      message: "Task completed successfully",
      task: savedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.completeProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { completionType } = req.body;
    if (
      !projectId ||
      !completionType ||
      projectId == null ||
      completionType == null
    ) {
      return res.status(400).json({
        message:
          "Completion type must be specified. Eg. On-Time, Delayed, Early",
      });
    }
    const project = await Project.findById(projectId).select("tasks").populate({
      path: "tasks",
      select:
        "_id taskName taskDescription deadline status completionDate completionType", // Populate the required fields
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const currentDate = new Date();
    project.tasks.forEach((task) => {
      let taskCompletionType = "On-Time";
      if (task.deadline < currentDate) {
        taskCompletionType = "Delayed";
      }

      task.status = "Completed";
      task.completionDate = currentDate;
      task.completionType = taskCompletionType;
    });

    project.status = "Completed";
    project.completionDate = currentDate;
    project.completionType = completionType;

    await project.save();
    console.log(project);
    res.status(200).json({
      message: "Project and all tasks completed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getExploreProjects = async (req, res) => {
  try {
    const userId = req.params.userId;

    const projects = await Project.find({
      postedBy: { $ne: userId },
      "applicants.user": { $ne: userId },
      status: "Hiring",
    })
      .populate({
        path: "postedBy",
        select: "_id fullname profileImage email phone country city",
      })
      .populate("skills")
      .populate("likes")
      .populate({
        path: "applicants.user",
        select: "_id fullname profileImage email phone country city",
      })
      .populate({
        path: "members",
        select: "_id fullname profileImage email phone country city",
      });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
