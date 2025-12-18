import { useEffect, useState } from "react";
import axios from "../utils/axios";
import MainLayout from "../layouts/MainLayout";
import Avatar from "../components/Avatar";

const SKILLS = ["React", "Node.js", "MongoDB", "Python", "Java", "C++", "DSA"];
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    rating: 0,
    skillsOffered: [],
    skillsWanted: [],
    availability: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get("/users/me");
        setProfile({
          name: res.data.name || "",
          rating: res.data.rating || 0,
          skillsOffered: res.data.skillsOffered || [],
          skillsWanted: res.data.skillsWanted || [],
          availability: res.data.availability || [],
        });
      } catch {
        setError("Failed to load profile");
      }
    };

    loadProfile();
  }, []);

  /* ---------------- SKILLS ---------------- */
  const toggleSkill = (type, skill) => {
    setProfile((prev) => ({
      ...prev,
      [type]: prev[type].includes(skill)
        ? prev[type].filter((s) => s !== skill)
        : [...prev[type], skill],
    }));
  };

  /* ---------------- AVAILABILITY ---------------- */
  const addAvailability = () => {
    setProfile((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        { day: "Monday", startTime: "18:00", endTime: "19:00" },
      ],
    }));
  };

  const updateAvailability = (index, field, value) => {
    const updated = [...profile.availability];
    updated[index][field] = value;
    setProfile({ ...profile, availability: updated });
  };

  const removeAvailability = (index) => {
    setProfile({
      ...profile,
      availability: profile.availability.filter((_, i) => i !== index),
    });
  };

  /* ---------------- VALIDATION ---------------- */
  const isFormValid =
    profile.skillsOffered.length > 0 &&
    profile.skillsWanted.length > 0 &&
    profile.availability.length > 0;

  /* ---------------- SAVE PROFILE ---------------- */
  const saveProfile = async () => {
    if (!isFormValid || loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.put("/users/me", {
        skillsOffered: profile.skillsOffered,
        skillsWanted: profile.skillsWanted,
        availability: profile.availability,
      });

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
          <Avatar name={profile.name || "U"} size={56} />
          <div>
            <h2 className="text-xl font-bold">
              {profile.name || "User"}
            </h2>
            <p className="text-sm text-gray-500">
              ⭐ {profile.rating.toFixed(1)} Average Rating
            </p>
          </div>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* SKILLS OFFERED */}
        <Section title="Skills You Offer">
          {SKILLS.map((skill) => (
            <Checkbox
              key={skill}
              label={skill}
              checked={profile.skillsOffered.includes(skill)}
              onChange={() => toggleSkill("skillsOffered", skill)}
            />
          ))}
        </Section>

        {/* SKILLS WANTED */}
        <Section title="Skills You Want to Learn">
          {SKILLS.map((skill) => (
            <Checkbox
              key={skill}
              label={skill}
              checked={profile.skillsWanted.includes(skill)}
              onChange={() => toggleSkill("skillsWanted", skill)}
            />
          ))}
        </Section>

        {/* AVAILABILITY */}
        <Section title="Availability">

          {/* LABEL ROW */}
          <div className="hidden sm:grid grid-cols-4 gap-3 text-xs text-gray-500 mb-2">
            <span>Day</span>
            <span>From</span>
            <span>To</span>
            <span></span>
          </div>

          <div className="space-y-3">
            {profile.availability.map((slot, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
              >
                <select
                  value={slot.day}
                  onChange={(e) =>
                    updateAvailability(i, "day", e.target.value)
                  }
                  className="border rounded px-3 py-2"
                >
                  {DAYS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>

                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    updateAvailability(i, "startTime", e.target.value)
                  }
                  className="border rounded px-3 py-2"
                />

                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    updateAvailability(i, "endTime", e.target.value)
                  }
                  className="border rounded px-3 py-2"
                />

                <button
                  onClick={() => removeAvailability(i)}
                  className="text-red-500 text-sm sm:text-right"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={addAvailability}
              className="text-blue-600 text-sm font-medium"
            >
              + Add Availability
            </button>
          </div>
        </Section>

        {/* SAVE BUTTON */}
        <button
          onClick={saveProfile}
          disabled={!isFormValid || loading}
          className={`px-6 py-2 rounded-lg font-medium transition
            ${
              isFormValid && !loading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </MainLayout>
  );
}

/* ---------------- HELPERS ---------------- */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-blue-600"
      />
      {label}
    </label>
  );
}
