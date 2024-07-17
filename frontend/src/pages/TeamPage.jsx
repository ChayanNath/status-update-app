import { useState, useEffect } from "react";
import { getTeams } from "../api/teamApi";
import TeamList from "../components/Dashboard/TeamList";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        setTeams(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching teams: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 py-5">
      <h2 className="text-2xl font-bold">Teams</h2>
      <TeamList teams={teams} />
    </div>
  );
};

export default TeamPage;
