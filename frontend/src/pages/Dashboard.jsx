import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FbCard from "../components/FbCard";

export default function Dashboard() {
  // Safe fallback (can later come from API / context)
  const userName =
    localStorage.getItem("userName") ||
    localStorage.getItem("email")?.split("@")[0] ||
    "Learner";

  return (
    <MainLayout>
      <div className="space-y-4 sm:space-y-6">

        {/* Greeting */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Ready to learn something new or share your skills today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          
          <FbCard>
            <h3 className="font-semibold text-base sm:text-lg mb-1">
              🤝 Find Matches
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">
              Discover users who want to learn what you offer.
            </p>
            <Link
              to="/matches"
              className="text-blue-600 font-medium text-xs sm:text-sm hover:underline"
            >
              Explore Matches →
            </Link>
          </FbCard>

          <FbCard>
            <h3 className="font-semibold text-base sm:text-lg mb-1">
              💬 Messages
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">
              Continue conversations with your skill partners.
            </p>
            <Link
              to="/messages"
              className="text-blue-600 font-medium text-xs sm:text-sm hover:underline"
            >
              Open Messages →
            </Link>
          </FbCard>

          <FbCard>
            <h3 className="font-semibold text-base sm:text-lg mb-1">
              👤 Your Profile
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">
              Update your skills, availability, and preferences.
            </p>
            <Link
              to="/profile"
              className="text-blue-600 font-medium text-xs sm:text-sm hover:underline"
            >
              View Profile →
            </Link>
          </FbCard>

        </div>

        {/* Info Section */}
        <FbCard hover={false}>
          <h3 className="font-semibold mb-2 text-sm sm:text-base">
            How Skill Exchange works
          </h3>
          <ul className="text-xs sm:text-sm text-gray-600 list-disc ml-4 sm:ml-5 space-y-1">
            <li>Add skills you can teach and skills you want to learn</li>
            <li>Get matched with users who complement your skills</li>
            <li>Chat, schedule sessions, and exchange knowledge</li>
            <li>Rate each other after sessions to build trust</li>
          </ul>
        </FbCard>

      </div>
    </MainLayout>
  );
}
