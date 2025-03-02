const asyncHandler = require("../middlewares/async");
const user = require("../models/user");
const User = require("../models/user");
const Skill = require("../models/skill");
const { saveMediaAndReturnUrl } = require("../utils/imageUtils");
const UserResponseDto = require("../dto/userResonseDto");
const { getSkillByID } = require("./skillController");

exports.getUserByID = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userID });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    let skills = [];
    if (user.skills && user.skills.length > 0) {
      skills = await Promise.all(user.skills.map((id) => getSkillByID(id)));
    }
    const userResponseDto = new UserResponseDto({
      _id: user._id,
      fullname: user.fullname,
      profileImage: user.profileImage,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      verified: user.verified,
      country: user.country,
      province: user.province,
      city: user.city,
      about: user.about,
      overview: user.overview,
      interests: user.interests,
      skills: skills,
      createdAt: user.createdAt,
    });
    res.status(200).json({
      success: true,
      message: `Fetched user`,
      data: userResponseDto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error`,
    });
  }
});

exports.updateProfileImage = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  console.log(req);
  if (req.files.media) {
    try {
      url = await saveMediaAndReturnUrl(
        req.files.media,
        `${user._id}/profile/`
      );
      user.profileImage = url;
    } catch (mediaError) {
      console.error("Error saving media:", mediaError);
      return res.status(500).send({ message: "Error saving media" });
    }
  } else {
    return res.status(400).send({ message: "No image uploaded" });
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: `Profile Picture Updated`,
    data: {
      profileImage: user.profileImage,
    },
  });
});

exports.addInterests = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.body.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  console.log(req);
  if (req.files.media) {
    try {
      url = await saveMediaAndReturnUrl(
        req.files.media,
        `${user._id}/profile/`
      );
      user.profileImage = url;
    } catch (mediaError) {
      console.error("Error saving media:", mediaError);
      return res.status(500).send({ message: "Error saving media" });
    }
  } else {
    return res.status(400).send({ message: "No image uploaded" });
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: `Profile Picture Updated`,
  });
});

exports.updateIntro = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.params.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  if (req.body.about !== undefined) {
    user.about = req.body.about;
  }
  if (req.body.overview !== undefined) {
    user.overview = req.body.overview;
  }
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      about: user.about,
      overview: user.overview,
    },
  });
});

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [
      { _id: req.params.userID },
      { email: req.body.email },
      { phone: req.body.phone },
    ],
  });
  if (!user) {
    return res.status(400).send({ message: "User does not exist" });
  }
  if (req.body.fullname != undefined) {
    user.fullname = req.body.fullname;
  }
  if (req.body.dob != undefined) {
    user.dob = req.body.dob;
  }
  if (req.body.phone != undefined) {
    user.phone = req.body.phone;
  }
  if (req.body.email != undefined) {
    user.email = req.body.email;
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      fullname: user.fullname,
      dob: user.dob,
      phone: user.phone,
      email: user.email,
    },
  });
});

exports.addSearchHistory = async (req, res) => {
  try {
    const { userId, query } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.recentSearches.push({ query });

    await user.save();

    res.status(200).json({
      message: "Search history updated",
      data: user.recentSearches,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const userId = req.params.userID;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recentSearches = user.recentSearches.slice(-5).reverse();

    res.status(200).json({
      message: "Search history fetched",
      data: recentSearches,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getUsersByName = async (req, res) => {
  try {
    const searchQuery = req.params.name.trim().toLowerCase();
    const searchWords = searchQuery.split(/\s+/);

    const Users = [];
    const userPromises = searchWords.map((searchWord) =>
      User.find({ fullname: { $regex: new RegExp(searchWord, "i") } }).select(
        "_id fullname profileImage city country skills about"
      )
    );
    const results = await Promise.all(userPromises);

    results.forEach((userList) => Users.push(...userList));

    const uniqueUsers = [
      ...new Map(Users.map((user) => [user._id, user])).values(),
    ];

    // const Users = await user.find({
    //   userName: { $regex: new RegExp(searchQuery, "i") },
    // });

    const processedUsers = uniqueUsers
      .map((user) => {
        const userWords = user.fullname.toLowerCase().split(/\s+/);
        const matchCount = userWords.filter((word) =>
          searchWords.includes(word)
        ).length;
        const matchPercentage = (matchCount / userWords.length) * 100;

        return { user, matchPercentage };
      })
      .filter(({ matchPercentage }) => matchPercentage >= 20)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)

      .map(({ user }) => user);

    const populatedUsers = await user.populate(processedUsers, [
      {
        path: "skills",
        select: "_id name",
      },
    ]);

    res.status(200).json(populatedUsers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("reviews").populate({
      path: "reviews",
      select: "*",
    });
    if (!user || user == null) {
      res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getHistoryByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const userWithAppliedProjects = await User.findById(userId)
      .select("appliedProjects")
      .populate({
        path: "appliedProjects",
        select:
          "_id status completionType createdAt completionDate projectName position postedBy companyName completionType",
        populate: {
          path: "postedBy",
          select: "_id fullname profileImage",
        },
      });
    const completedProjects = userWithAppliedProjects.appliedProjects.filter(
      (project) => project.status === "Completed"
    );
    if (!user || user == null) {
      res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(completedProjects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getActiveTasksByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const userWithProjects = await User.findById(userId)
      .select("appliedProjects")
      .populate({
        path: "appliedProjects",
        match: { status: "Active" },
        select: "_id projectName tasks postedBy createdAt",
        populate: [
          {
            path: "postedBy",
            select: "fullname profileImage",
          },
          {
            path: "tasks",
            match: { status: "Active" },
            select: "taskName taskDescription deadline status",
          },
        ],
      });

    if (!userWithProjects) {
      return res.status(404).json({ message: "User not found." });
    }

    // Extract active tasks from active projects
    const activeTasks = userWithProjects.appliedProjects.flatMap((project) =>
      project.tasks.map((task) => ({
        postedBy: project.postedBy,
        createdAt: project.createdAt,
        projectId: project._id,
        projectName: project.projectName,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        deadline: task.deadline,
        status: task.status,
      }))
    );

    res.status(200).json(activeTasks);
  } catch (error) {
    console.error("Error fetching active tasks:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.addNotification = async (notificationData) => {
  try {
    const { notificationType, data, chatData, reciever } = notificationData;

    const notification = {
      notificationType,
      data,
      chatData: chatData || null,
      date: new Date(),
    };

    const user = await User.findByIdAndUpdate(
      reciever,
      { $push: { notification } },
      { new: true, runValidators: true }
    );
    console.log("Notification added");
  } catch (error) {
    console.error("Error adding notification:", error);
  }
};

exports.deleteAllNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { notification: [] } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "All notifications deleted successfully." });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.getNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("notification");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ notifications: user.notification });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
