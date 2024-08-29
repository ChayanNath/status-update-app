import AdminTeamCard from "@/components/team/AdminTeamCard";
import { getTeams } from "@/services/teamService";
import { fetchUserWithIds } from "@/services/userService";
import { Team } from "@/types/team";
import { useEffect, useState } from "react";
import TeamDetailsPage from "./TeamDetailsPage";
import TeamForm from "@/components/team/TeamForm";

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamUsers, selectedTeamUserDetails] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const fetchTeams = async () => {
    try {
      const response = await getTeams();
      setTeams(response);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const adminCardClickHandler = async (team: Team) => {
    try {
      setSelectedTeam(team);
      const extractedIds = team.members.map((user) => user.id);
      const response = await fetchUserWithIds(extractedIds);
      selectedTeamUserDetails(response);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const onFormSubmitHandler = () => {
    fetchTeams();
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-3 h-full">
        <div className="col-span-1">
          <div className="mb-3">
            <h1 className="text-2xl">Teams</h1>
          </div>
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
        <div className="col-span-3">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl">Team Details</h1>
            <div>
              <TeamForm team={null} onFormSubmit={onFormSubmitHandler} />
              {selectedTeam && (
                <TeamForm
                  team={selectedTeam}
                  onFormSubmit={onFormSubmitHandler}
                />
              )}
            </div>
          </div>
          {selectedTeamUsers && selectedTeamUsers.length > 0 ? (
            <TeamDetailsPage users={selectedTeamUsers} team={selectedTeam} />
          ) : (
            <p>Select a team to view details</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamManagement;
