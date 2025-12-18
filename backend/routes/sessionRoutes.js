import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {
  getMySessions,
  createSession,
  markCompleted,
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/", protect, getMySessions);
router.post("/", protect, createSession);
router.put("/:id/complete", protect, markCompleted);

export default router;
