import { useState } from "react";
import axios from "../utils/axios";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function Reviews() {
  const { id: sessionId } = useParams(); // sessionId
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = rating >= 1 && rating <= 5;

  const submitReview = async () => {
    if (!isFormValid || loading || !sessionId) return;

    setLoading(true);
    setError("");

    try {
      await axios.post("/reviews", {
        sessionId,
        rating,
        comment,
      });

      navigate("/sessions");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-4 sm:p-6 px-3 sm:px-6">

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold mb-2">
          Rate Your Session
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          Share your experience with the teacher
        </p>

        {/* Error */}
        {error && (
          <div className="mb-3 text-xs sm:text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* ⭐ STAR RATING */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl sm:text-3xl transition ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {!isFormValid && (
          <p className="text-xs text-red-500 text-center mb-2">
            Please select a rating
          </p>
        )}

        {/* Comment */}
        <textarea
          className="w-full border rounded-lg p-3 mb-4 text-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Write your feedback (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Submit */}
        <button
          onClick={submitReview}
          disabled={!isFormValid || loading}
          className={`w-full py-2.5 rounded-lg font-medium text-sm transition
            ${
              isFormValid && !loading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </MainLayout>
  );
}
