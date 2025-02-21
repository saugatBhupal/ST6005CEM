const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    companyName: {
      type: String,
      required: false,
    },
    site: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Hiring", "Active", "Pending"],
      default: "Hiring",
    },
    salary: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
    duration: {
      from: {
        type: Number,
      },
      to: {
        type: Number,
      },
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tasks: [
      {
        taskName: {
          type: String,
          required: true,
        },
        taskDescription: {
          type: String,
          required: true,
        },
        deadline: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ["Active", "Completed"],
          default: "Active",
        },
        createdDate: {
          type: Date,
          default: Date.now(),
        },
        completionDate: {
          type: Date,
        },
        completionType: {
          type: String,
          enum: ["Delayed", "On-Time", "Early"],
        },
        members: [
          {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            sparse: true,
            required: true,
          },
        ],
      },
    ],
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          sparse: true,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        timestamps: true,
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
