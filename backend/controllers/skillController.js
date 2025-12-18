import User from "../models/User.js";

/* ---------- Helper: time overlap ---------- */
const isTimeOverlap = (aStart, aEnd, bStart, bEnd) => {
  return aStart < bEnd && bStart < aEnd;
};

/* ---------- Get all users ---------- */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id }, // ✅ FIXED
    }).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to load users" });
  }
};


/* ---------------- TIME OVERLAP HELPER ---------------- */
const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const hasTimeOverlap = (a, b) => {
  const startA = timeToMinutes(a.startTime);
  const endA = timeToMinutes(a.endTime);
  const startB = timeToMinutes(b.startTime);
  const endB = timeToMinutes(b.endTime);

  return startA < endB && startB < endA;
};

/* ---------------- GET MATCHES ---------------- */
export const getMatches = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const users = await User.find({
      _id: { $ne: currentUser._id },
      skillsOffered: { $in: currentUser.skillsWanted },
      skillsWanted: { $in: currentUser.skillsOffered },
    }).select("-password");

    const matches = users.filter((otherUser) => {
      return currentUser.availability.some((mySlot) =>
        otherUser.availability.some(
          (theirSlot) =>
            mySlot.day === theirSlot.day &&
            hasTimeOverlap(mySlot, theirSlot)
        )
      );
    });

    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to find matches" });
  }
};
