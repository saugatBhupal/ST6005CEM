const { io, getSocketIdfromUserId } = require("../config/socketConfig");
const Conversation = require("../models/conversation");

exports.getMessagesFromConversation = async (req, res) => {
  try {
    const { conversationID } = req.params;
    const conversation = await Conversation.findById(conversationID);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationID } = req.params;
    const { content, senderID } = req.body;

    if (!content || !senderID) {
      return res
        .status(400)
        .json({ error: "Message content and sender ID are required." });
    }

    const conversation = await Conversation.findById(conversationID);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const members = [];
    conversation.members.map((member) => members.push(member._id.toString()));

    const newMessage = { content, sender: senderID, sent: new Date() };
    conversation.messages.push(newMessage);
    await conversation.save();

    members.map((member) => {
      const socketId = getSocketIdfromUserId(member);
      if (socketId != "undefined" || socketId != null) {
        io.to(socketId).emit("receiveMessage", newMessage);
      }
    });
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
