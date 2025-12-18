import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

export default function SkillCard({ user }) {
  const navigate = useNavigate();

  const openChat = async () => {
    const res = await axios.get(
      `/messages/conversation/${user._id}`
    );

    navigate(`/messages?cid=${res.data._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-5 mb-4 sm:mb-5">
      <div className="flex items-center gap-3">
        <Avatar name={user.name} />
        <div className="min-w-0">
          <p className="font-bold text-sm sm:text-base truncate">
            {user.name}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            ⭐ {user.rating || "New"}
          </p>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 text-xs sm:text-sm space-y-1">
        <p>
          <b>Offers:</b>{" "}
          <span className="break-words">
            {user.skillsOffered.join(", ")}
          </span>
        </p>
        <p>
          <b>Wants:</b>{" "}
          <span className="break-words">
            {user.skillsWanted.join(", ")}
          </span>
        </p>
      </div>

      <div className="flex gap-2 sm:gap-3 mt-4">
        <button
          onClick={openChat}
          className="flex-1 bg-gray-200 hover:bg-gray-300 py-2.5 sm:py-2 rounded-lg text-sm"
        >
          Message
        </button>

        <button
          onClick={() => navigate(`/sessions?user=${user._id}`)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-2 rounded-lg text-sm"
        >
          Book Session
        </button>
      </div>
    </div>
  );
}
