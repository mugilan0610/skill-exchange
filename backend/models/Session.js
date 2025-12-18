import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // learner
      required: true,
    },

    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // teacher
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    date: {
      type: String, // yyyy-mm-dd
      required: true,
    },

    time: {
      type: String, // HH:mm (24h format)
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
