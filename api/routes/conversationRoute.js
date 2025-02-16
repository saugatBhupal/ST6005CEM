const express = require("express");
const {
  createConversation,
  getAllConversations,
  getConversationById,
} = require("../controllers/conversationController");
const router = express.Router();

router.post("/", createConversation);
router.get("/user/:userId", getAllConversations);
router.get("/id/:conversationID", getConversationById);
module.exports = router;
