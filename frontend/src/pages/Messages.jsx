import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../utils/axios";
import MainLayout from "../layouts/MainLayout";
import Avatar from "../components/Avatar";
import Loading from "../components/Loading";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const conversationIdFromUrl = searchParams.get("cid");

  const currentUserId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  /* ================= LOAD CONVERSATIONS ================= */
  const loadConversations = async () => {
    const res = await axios.get("/messages/conversations");
    setConversations(res.data || []);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadConversations();

      if (conversationIdFromUrl) {
        openConversation(conversationIdFromUrl);
      }

      setLoading(false);
    };

    init();
  }, [conversationIdFromUrl]);

  /* ================= OPEN CONVERSATION ================= */
  const openConversation = async (conversationId) => {
    setActiveConversation(conversationId);

    const res = await axios.get(`/messages/${conversationId}`);
    setMessages(res.data || []);

    const conv = conversations.find((c) => c._id === conversationId);
    if (conv) {
      const other = conv.members.find((m) => m._id !== currentUserId);
      setActiveUser(other);
    }
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!text.trim() || !activeConversation) return;

    const res = await axios.post(`/messages/${activeConversation}`, {
      content: text,
    });

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  /* ================= UI ================= */
  return (
    <MainLayout>
      <div className="h-[calc(100vh-140px)] bg-white rounded-xl shadow flex overflow-hidden">

        {/* ================= CHAT LIST ================= */}
        <aside
          className={`border-r flex-col w-full md:w-72
          ${activeConversation ? "hidden md:flex" : "flex"}`}
        >
          <div className="p-4 border-b font-bold text-lg">Chats</div>

          <div className="flex-1 overflow-y-auto">
            {loading && <Loading text="Loading chats..." />}

            {!loading && conversations.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <p className="font-semibold text-gray-700">
                  No conversations yet
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Match with users to start chatting
                </p>
              </div>
            )}

            {conversations.map((c) => {
              const user = c.members.find((m) => m._id !== currentUserId);

              return (
                <div
                  key={c._id}
                  onClick={() => openConversation(c._id)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer
                    hover:bg-gray-100
                    ${activeConversation === c._id ? "bg-gray-100" : ""}`}
                >
                  <Avatar name={user?.name} size={40} />
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">Tap to chat</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ================= CHAT WINDOW ================= */}
        <section
          className={`flex-1 flex flex-col
          ${!activeConversation ? "hidden md:flex" : "flex"}`}
        >
          {!activeConversation ? (
            <div className="flex-1 flex items-center justify-center text-center px-4">
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Select a person to start chatting
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Your messages will appear here
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ================= HEADER ================= */}
              <div className="border-b px-3 py-2 flex items-center gap-3 bg-white sticky top-0 z-10">
                {/* Back Button (Mobile Only) */}
                <button
                  onClick={() => {
                    setActiveConversation(null);
                    setActiveUser(null);
                    setMessages([]);
                  }}
                  className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition"
                  aria-label="Back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <Avatar name={activeUser?.name} size={36} />
                <div className="flex flex-col">
                  <p className="font-semibold leading-tight">
                    {activeUser?.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    Tap to view profile
                  </span>
                </div>
              </div>

              {/* ================= MESSAGES ================= */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-white">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm
                      ${
                        msg.sender === currentUserId
                          ? "bg-blue-600 text-white ml-auto"
                          : "bg-gray-100"
                      }`}
                  >
                    <p className="break-words">{msg.content}</p>
                    <span className="block text-[10px] mt-1 opacity-70 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>

              {/* ================= INPUT ================= */}
              <div className="border-t p-3 flex items-center gap-2 bg-white">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
