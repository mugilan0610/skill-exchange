import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateMyProfile = async (req, res) => {
  try {
    const { skillsOffered, skillsWanted, availability } = req.body;

    const user = await User.findById(req.user.id);
    user.skillsOffered = skillsOffered;
    user.skillsWanted = skillsWanted;
    user.availability = availability;

    await user.save();
    res.json({ message: "Profile updated" });
  } catch {
    res.status(500).json({ message: "Profile update failed" });
  }
};
