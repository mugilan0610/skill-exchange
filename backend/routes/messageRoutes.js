import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {
  getOrCreateConversation,
  getConversations,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversation/:userId", protect, getOrCreateConversation);
router.get("/conversations", protect, getConversations);
router.get("/:conversationId", protect, getMessages);
router.post("/:conversationId", protect, sendMessage);

export default router;
