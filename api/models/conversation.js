const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        content: {
          type: String,
          required: true,
        },
        sender: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        sent: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
