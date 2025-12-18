import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

/* ================= GET OR CREATE CONVERSATION ================= */
export const getOrCreateConversation = async (req, res) => {
  try {
    const myId = req.user.id;
    const otherUserId = req.params.userId;

    if (!otherUserId) {
      return res.status(400).json({ message: "User ID required" });
    }

    if (myId === otherUserId) {
      return res.status(400).json({ message: "You cannot message yourself" });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [myId, otherUserId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [myId, otherUserId],
      });
    }

    res.json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to open chat" });
  }
};

/* ================= GET ALL CONVERSATIONS ================= */
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: req.user.id,
    }).populate("members", "name");

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: "Failed to load conversations" });
  }
};

/* ================= GET MESSAGES ================= */
export const getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(
      req.params.conversationId
    );

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // 🔐 Only members can read messages
    if (!conversation.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to load messages" });
  }
};

/* ================= SEND MESSAGE ================= */
export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    const conversation = await Conversation.findById(
      req.params.conversationId
    );

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // 🔐 Only members can send messages
    if (!conversation.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const message = await Message.create({
      conversationId: req.params.conversationId,
      sender: req.user.id,
      content,
    });

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message" });
  }
};
