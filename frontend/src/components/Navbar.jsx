import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, logout } = useAuth();

  const userName = localStorage.getItem("userName") || "U";

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  if (!token) return null; // 🔒 Navbar never renders if not logged in

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          SkillExchange
        </Link>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm">
            <Link to="/matches" className={isActive("/matches")}>
              Matches
            </Link>
            <Link to="/sessions" className={isActive("/sessions")}>
              Sessions
            </Link>
            <Link to="/messages" className={isActive("/messages")}>
              Messages
            </Link>
            <Link to="/profile" className={isActive("/profile")}>
              Profile
            </Link>
          </div>

          {/* Avatar */}
          <Avatar name={userName} size={34} />

          {/* Logout – Desktop */}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="hidden sm:block text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Logout
          </button>

          {/* Logout – Mobile */}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="sm:hidden text-red-500 text-lg"
            title="Logout"
          >
            ⎋
          </button>
        </div>
      </div>
    </nav>
  );
}
