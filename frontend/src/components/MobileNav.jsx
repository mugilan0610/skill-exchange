import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
  const { pathname } = useLocation();

  const itemClass = (path) =>
    `flex flex-col items-center text-[11px] sm:text-xs transition-colors ${
      pathname === path
        ? "text-blue-600 font-semibold"
        : "text-gray-500"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-sm lg:hidden">
      <div className="flex justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        <Link to="/matches" className={`${itemClass("/matches")} min-w-[56px] py-1`}>
          <span className="text-lg sm:text-xl">🤝</span>
        </Link>
        <Link to="/sessions" className={`${itemClass("/sessions")} min-w-[56px] py-1`}>
          <span className="text-lg sm:text-xl">📅</span>
        </Link>
        <Link to="/messages" className={`${itemClass("/messages")} min-w-[56px] py-1`}>
          <span className="text-lg sm:text-xl">💬</span>
        </Link>
        <Link to="/profile" className={`${itemClass("/profile")} min-w-[56px] py-1`}>
          <span className="text-lg sm:text-xl">👤</span>
        </Link>
      </div>
    </nav>
  );
}
