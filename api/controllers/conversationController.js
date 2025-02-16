const Conversation = require("../models/conversation");
const User = require("../models/user");

exports.createConversation = async (req, res) => {
  try {
    const { members } = req.body;
    if (!members || members.length < 2) {
      return res
        .status(400)
        .json({ error: "A conversation must have at least two members." });
    }

    const conversation = new Conversation({ members });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({ members: userId })
      .populate({
        path: "members",
        select: "fullname profileImage",
      })
      .sort({ updatedAt: -1 });

    const result = conversations.map((convo) => {
      return {
        conversationId: convo._id,
        members: convo.members,
        messages: convo.messages.at(-1),
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const { conversationID } = req.params;
    const conversation = await Conversation.findById(conversationID);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    console.log("conversation");
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
