import AdminTeamCard from "@/components/team/AdminTeamCard";
import { getTeams } from "@/services/teamService";
import { Team } from "@/types/team";
import { useEffect, useState } from "react";

const TeamManagement = () => {
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

  const adminCardClickHandler = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="">
          <h1 className="text-2xl mb-3">All Teams</h1>
          <div className="flex flex-wrap gap-3 flex-col">
            {teams && teams.length > 0 ? (
              teams.map((team: Team) => (
                <AdminTeamCard
                  team={team}
                  key={team._id}
                  onClickHandler={adminCardClickHandler}
                />
              ))
            ) : (
              <p>No teams available</p>
            )}
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl">Team Details</h1>
        </div>
        <div className="">
          <h1 className="text-2xl">Add Team</h1>
        </div>
      </div>
    </>
  );
};

export default TeamManagement;
