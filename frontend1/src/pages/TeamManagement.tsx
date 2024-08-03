import AdminTeamCard from "@/components/team/AdminTeamCard";
import { getTeams } from "@/services/teamService";
import { fetchUserWithIds } from "@/services/userService";
import { Team } from "@/types/team";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamDetails, setSelectedTeamDetails] = useState([]);

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

  const adminCardClickHandler = async (team: Team) => {
    try {
      const response = await fetchUserWithIds(team.members);
      setSelectedTeamDetails(response);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="">
          <h1 className="text-2xl mb-3">Teams</h1>
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
          {selectedTeamDetails && selectedTeamDetails.length > 0 ? (
            selectedTeamDetails.map((user: User) => (
              <div key={user.id}>{user.firstName}</div>
            ))
          ) : (
            <p>Select a team to view details</p>
          )}
        </div>
        <div className="">
          <h1 className="text-2xl">Add Team</h1>
        </div>
      </div>
    </>
  );
};

export default TeamManagement;
