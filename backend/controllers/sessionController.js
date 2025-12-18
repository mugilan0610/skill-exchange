import Session from "../models/Session.js";
import User from "../models/User.js";

/* ================= GET MY SESSIONS ================= */
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ user: req.user.id }, { partner: req.user.id }],
    })
      .populate("user", "name")
      .populate("partner", "name")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

/* ================= CREATE SESSION ================= */
export const createSession = async (req, res) => {
  try {
    const { partnerId, skill, date, time } = req.body;

    if (!partnerId || !skill || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (partnerId === req.user.id) {
      return res
        .status(400)
        .json({ message: "You cannot book a session with yourself" });
    }

    /* ================= LOAD TEACHER ================= */
    const teacher = await User.findById(partnerId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    /* ================= SKILL MATCHING ================= */
    if (!teacher.skillsOffered.includes(skill)) {
      return res.status(400).json({
        message: "Teacher does not offer this skill",
      });
    }

    /* ================= AVAILABILITY MATCHING ================= */
    const bookingDay = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    const toMinutes = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const bookingTime = toMinutes(time);

    const available = teacher.availability.some((slot) => {
      if (slot.day !== bookingDay) return false;

      return (
        bookingTime >= toMinutes(slot.startTime) &&
        bookingTime <= toMinutes(slot.endTime)
      );
    });

    if (!available) {
      return res.status(400).json({
        message: "Teacher is not available at this time",
      });
    }

    /* ================= OVERLAP CHECK ================= */
    const conflict = await Session.findOne({
      partner: partnerId,
      date,
      time,
      status: "upcoming",
    });

    if (conflict) {
      return res.status(400).json({
        message: "Teacher already has a session at this time",
      });
    }

    /* ================= CREATE SESSION ================= */
    const session = await Session.create({
      user: req.user.id,
      partner: partnerId,
      skill,
      date,
      time,
      status: "upcoming",
    });

    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create session" });
  }
};

/* ================= MARK SESSION COMPLETED ================= */
export const markCompleted = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (
      session.user.toString() !== req.user.id &&
      session.partner.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    session.status = "completed";
    await session.save();

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to update session" });
  }
};
