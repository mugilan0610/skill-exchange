import { Link, useLocation } from "react-router-dom";

const items = [
  { name: "Profile", path: "/profile", icon: "👤" },
  { name: "Matches", path: "/matches", icon: "🤝" },
  { name: "Sessions", path: "/sessions", icon: "📅" },
  { name: "Messages", path: "/messages", icon: "💬" },
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow
        p-3 sm:p-4
        w-full
      "
    >
      {/* Title */}
      <h3 className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase mb-2 sm:mb-3">
        Navigation
      </h3>

      {/* Links */}
      <div className="space-y-0.5 sm:space-y-1">
        {items.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3
                px-3 sm:px-4 py-2 sm:py-2.5
                rounded-xl
                text-xs sm:text-sm font-medium
                transition-all
                ${
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span className="text-base sm:text-lg leading-none">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
