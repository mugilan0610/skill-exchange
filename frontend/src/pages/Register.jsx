import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim().length >= 6;

  const submit = async () => {
    if (!isFormValid || loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-3 bg-gradient-to-b from-[#f0f2f5] to-[#e4e6eb]">
      <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-md">

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-1 text-gray-900">
          Create Account
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-5">
          Join SkillExchange and start learning.
        </p>

        {/* Toasts */}
        {error && (
          <div className="mb-4 text-xs sm:text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-xs sm:text-sm text-green-600 bg-green-50 px-3 py-2 rounded">
            {success}
          </div>
        )}

        {/* Name */}
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button
          onClick={submit}
          disabled={!isFormValid || loading}
          className={`
            w-full py-2.5 rounded-lg font-medium text-sm transition
            ${
              isFormValid && !loading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-xs sm:text-sm mt-5 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
