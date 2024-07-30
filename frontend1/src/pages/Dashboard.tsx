import TeamCard from "@/components/team/TeamCard";
import { getTeams } from "@/services/teamService";
import { Team } from "@/types/team";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        setTeams(response);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl">Team Overview</h1>
      <div className="flex flex-wrap gap-3">
        {teams && teams.length > 0 ? (
          teams.map((team: Team) => <TeamCard team={team} key={team._id} />)
        ) : (
          <p>No teams available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
