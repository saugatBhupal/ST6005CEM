const { io, getSocketIdfromUserId } = require("../config/socketConfig");
const Conversation = require("../models/conversation");
const { addNotification } = require("./userController");

exports.getMessagesFromConversation = async (req, res) => {
  try {
    const { conversationID } = req.params;
    const conversation = await Conversation.findById(conversationID);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ message: "Internal Servor Error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationID } = req.params;
    const { content, senderID } = req.body;

    if (!content || !senderID) {
      return res
        .status(400)
        .json({ message: "Message content and sender ID are required." });
    }

    const conversation = await Conversation.findById(conversationID);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const members = [];
    conversation.members.map((member) => members.push(member._id.toString()));

    const newMessage = {
      content,
      sender: senderID,
      sent: new Date(),
      conversationId: conversationID,
    };
    conversation.messages.push(newMessage);
    await conversation.save();

    const notification = {
      notificationType: "Chat",
      data: "You have a new message!",
      chatData: content,
      reciever: members.filter((member) => member != senderID),
    };

    const savedNotification = await addNotification(notification);

    members.forEach((member) => {
      const socketId = getSocketIdfromUserId(member);

      if (socketId && socketId !== "undefined") {
        io.to(socketId).emit("receiveMessage", newMessage);

        if (member !== senderID) {
          io.to(socketId).emit("receiveNotification", notification);
        }
      }
    });
    
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal Servor Error" });
  }
};
