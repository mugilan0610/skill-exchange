import { useEffect, useState } from "react";
import axios from "../utils/axios";
import MainLayout from "../layouts/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

export default function Sessions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const partnerId = searchParams.get("user");

  const [sessions, setSessions] = useState([]);
  const [skill, setSkill] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentUserId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  /* ================= LOAD SESSIONS ================= */
  const loadSessions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/sessions");
      setSessions(res.data);
    } catch {
      setError("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  /* ================= CHECK OVERLAP ================= */
  const hasOverlap = () => {
    return sessions.some(
      (s) =>
        s.date === date &&
        s.time === time &&
        s.status !== "completed"
    );
  };

  /* ================= CREATE SESSION ================= */
  const createSession = async () => {
    if (!partnerId || !skill || !date || !time || loading) return;

    if (hasOverlap()) {
      setError("You already have a session at this time");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("/sessions", {
        partnerId,
        skill,
        date,
        time,
      });

      setSuccess("Session booked successfully 🎉");
      setSkill("");
      setDate("");
      setTime("");
      loadSessions();
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= COMPLETE SESSION ================= */
  const markCompleted = async (id) => {
    try {
      await axios.put(`/sessions/${id}/complete`);
      loadSessions();
    } catch {
      alert("Failed to update session");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ================= BOOK SESSION ================= */}
        {partnerId && (
          <div className="bg-white rounded-2xl shadow p-6 space-y-5">
            <h2 className="text-lg font-bold">
              📅 Book a New Session
            </h2>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Skill (e.g. React)"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />

              <input
                type="date"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <input
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Time (e.g. 17 : 00)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <button
              onClick={createSession}
              disabled={loading || !skill || !date || !time}
              className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition
                ${
                  !loading && skill && date && time
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {loading ? "Booking..." : "Book Session"}
            </button>
          </div>
        )}

        {/* ================= MY SESSIONS ================= */}
        <h2 className="text-xl font-bold">
          📚 My Sessions
        </h2>

        {loading && <Loading text="Loading sessions..." />}

        {!loading && sessions.length === 0 && (
          <EmptyState
            title="No sessions yet"
            subtitle="Book a session to start learning or teaching"
          />
        )}

        <div className="space-y-4">
          {sessions.map((s) => {
            const isLearner = s.user._id === currentUserId;
            const teacher = s.partner;

            return (
              <div
                key={s._id}
                className="bg-white rounded-2xl shadow p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg">
                    {s.skill}
                  </p>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full
                      ${
                        s.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {s.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  📅 {s.date} &nbsp; ⏰ {s.time}
                </p>

                <p className="text-sm">
                  Teacher: <b>{teacher.name}</b>
                </p>

                <div className="flex gap-4 pt-2">
                  {s.status === "upcoming" && isLearner && (
                    <button
                      onClick={() => markCompleted(s._id)}
                      className="text-sm text-blue-600 font-medium hover:underline"
                    >
                      Mark Completed
                    </button>
                  )}

                  {s.status === "completed" && isLearner && !s.reviewed && (
                    <button
                      onClick={() => navigate(`/reviews/${s._id}`)}
                      className="text-sm text-green-600 font-medium hover:underline"
                    >
                      Review Teacher
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
