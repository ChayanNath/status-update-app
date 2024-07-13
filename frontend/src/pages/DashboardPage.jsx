import { useState, useEffect } from "react";
import TeamList from "../components/Dashboard/TeamList";
import { getTeams } from "../api/teamApi";

const DashboardPage = () => {
  const [teams, setTeams] = useState([]);

  // Fetch teams data from API (use actual API endpoint)
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Replace with your API call
        const response = await getTeams();
        setTeams(response);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <TeamList teams={teams} />
    </div>
  );
};

export default DashboardPage;
