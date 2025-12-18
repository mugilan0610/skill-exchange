import mongoose from "mongoose";
import Review from "../models/Review.js";
import User from "../models/User.js";
import Session from "../models/Session.js";

/* ================= ADD REVIEW ================= */
export const addReview = async (req, res) => {
  try {
    const { sessionId, rating, comment } = req.body;

    if (!sessionId || !rating) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 1️⃣ Get session
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // 2️⃣ Session must be completed
    if (session.status !== "completed") {
      return res
        .status(400)
        .json({ message: "Session not completed yet" });
    }

    // 3️⃣ ONLY learner can review
    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only the learner can review the teacher",
      });
    }

    const reviewedUser = session.partner.toString(); // teacher

    // ❌ Prevent duplicate review
    const existing = await Review.findOne({
      reviewer: req.user.id,
      reviewedUser,
      session: sessionId,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You already reviewed this session" });
    }

    // 4️⃣ Save review
    await Review.create({
      reviewer: req.user.id,       // learner
      reviewedUser,                // teacher
      session: sessionId,
      rating,
      comment,
    });

    // 5️⃣ Recalculate average rating
    const stats = await Review.aggregate([
      {
        $match: {
          reviewedUser: new mongoose.Types.ObjectId(reviewedUser),
        },
      },
      {
        $group: {
          _id: "$reviewedUser",
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    const avgRating =
      stats.length > 0 ? Number(stats[0].avgRating.toFixed(1)) : 0;

    // 6️⃣ Update teacher rating
    await User.findByIdAndUpdate(reviewedUser, {
      rating: avgRating,
    });

    res.status(201).json({
      message: "Review submitted successfully",
      rating: avgRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Review failed" });
  }
};

/* ================= GET REVIEWS FOR A USER ================= */
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewedUser: req.params.userId,
    })
      .populate("reviewer", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
