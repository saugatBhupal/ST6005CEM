const express = require("express");
const {
  getMessagesFromConversation,
  sendMessage,
} = require("../controllers/messageController");
const router = express.Router();

router.get("/:conversationID", getMessagesFromConversation);
router.post("/:conversationID", sendMessage);
module.exports = router;
