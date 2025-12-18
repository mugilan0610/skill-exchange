import { useEffect, useState } from "react";
import axios from "../utils/axios";
import SkillCard from "../components/SkillCard";
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/skills/matches");
        setMatches(res.data || []);
      } catch {
        setError("Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  return (
    <MainLayout>
      <h2 className="text-lg sm:text-xl font-bold mb-4">
        Matches
      </h2>

      {loading && <Loading text="Finding matches..." />}

      {!loading && error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {!loading && !error && matches.length === 0 && (
        <EmptyState
          title="No matches found"
          subtitle="Try updating your skills or profile"
        />
      )}

      {!loading &&
        !error &&
        matches.map((user) => (
          <SkillCard key={user._id} user={user} />
        ))}
    </MainLayout>
  );
}
