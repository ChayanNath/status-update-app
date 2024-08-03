import TeamCard from "@/components/team/TeamCard";
import UserList from "@/components/user/user-list";
import UserUpdates from "@/components/user/user-updates";
import { getTeams } from "@/services/teamService";
import { getUserUpdates } from "@/services/userService";

import { Team, Members } from "@/types/team";
import { UserUpdate } from "@/types/user";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [users, setUsers] = useState<Members[]>([]);
  const [selectedUser, setSelectedUser] = useState<Members | null>(null);
  const [userUpdates, setUserUpdates] = useState<UserUpdate[]>([]);

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

  const teamCardClickHandler = async (team: Team) => {
    setSelectedTeam(team);
    setUsers(team.members);

    if (team.members.length > 0) {
      const firstUser = team.members[0];
      setSelectedUser(firstUser);
      try {
        const updatesResponse = await getUserUpdates(firstUser.id);
        setUserUpdates(updatesResponse);
      } catch (error) {
        console.error("Error fetching user updates:", error);
      }
    } else {
      setSelectedUser(null);
      setUserUpdates([]);
    }
  };

  const userClickHandler = async (user: Members) => {
    setSelectedUser(user);
    try {
      const updatesResponse = await getUserUpdates(user.id);
      setUserUpdates(updatesResponse);
    } catch (error) {
      console.error("Error fetching user updates:", error);
    }
  };

  const onBackClickHandler = async () => {
    setSelectedTeam(null);
    setSelectedUser(null);
  };

  return (
    <>
      {!selectedTeam && (
        <>
          <h1 className="text-xl">Teams overview</h1>
          <div className="flex flex-wrap gap-3">
            {teams && teams.length > 0 ? (
              teams.map((team: Team) => (
                <TeamCard
                  team={team}
                  key={team._id}
                  onClickHandler={teamCardClickHandler}
                />
              ))
            ) : (
              <p>No teams available</p>
            )}
          </div>
        </>
      )}
      {selectedTeam && (
        <div className="flex gap-10 h-full">
          <UserList
            users={users}
            onUserClick={userClickHandler}
            onBackClick={onBackClickHandler}
          />
          {selectedUser && <UserUpdates updates={userUpdates} />}
        </div>
      )}
    </>
  );
};

export default Dashboard;
