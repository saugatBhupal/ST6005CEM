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
      enum: ["Active", "Pending"],
      default: "Active",
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
    likes_count: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
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
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
