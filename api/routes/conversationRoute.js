const express = require("express");
const {
  getConversation,
  getAllConversations,
  getConversationById,
} = require("../controllers/conversationController");
const router = express.Router();

router.get("/", getConversation);
router.get("/user/:userId", getAllConversations);
router.get("/id/:conversationID", getConversationById);
module.exports = router;
