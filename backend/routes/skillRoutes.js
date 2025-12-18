import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getMatches,
} from "../controllers/skillController.js";

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/matches", protect, getMatches);

export default router;
