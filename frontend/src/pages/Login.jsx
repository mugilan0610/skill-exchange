import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  // 🔁 Redirect back to intended page
  const redirectTo = location.state?.from || "/";

  const submit = async () => {
    if (!isFormValid || loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "userName",
        res.data.user?.name || "Learner"
      );

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate(redirectTo, { replace: true }), 800);
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
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
          Login
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-5">
          Welcome back! Please login to continue.
        </p>

        {/* Toast Messages */}
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

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs sm:text-sm mt-5 text-center text-gray-600">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
