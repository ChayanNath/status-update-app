import TeamCard from "@/components/team/TeamCard";
import UserList from "@/components/user/user-list";
import UserUpdates from "@/components/user/user-updates";
import { getTeams } from "@/services/teamService";
import { getUserUpdates } from "@/services/userService";

import { Team, Members } from "@/types/team";
import { DateRange, UserUpdate } from "@/types/user";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [users, setUsers] = useState<Members[]>([]);
  const [selectedUser, setSelectedUser] = useState<Members | null>(null);
  const [userUpdates, setUserUpdates] = useState<UserUpdate[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

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
        const now = new Date();
        const startOfWeek = getStartOfWeek(now);
        const endOfWeek = getEndOfWeek(now);
        const dateRange = {
          from: startOfWeek,
          to: endOfWeek,
        };
        const updatesResponse = await getUserUpdates(firstUser.id, dateRange);
        setUserUpdates(updatesResponse);
        setDateRange(dateRange);
      } catch (error) {
        console.error("Error fetching user updates:", error);
      }
    } else {
      setSelectedUser(null);
      setUserUpdates([]);
    }
  };

  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = day === 0 ? 6 : day - 1; // Adjust for Monday as the start of the week
    start.setDate(start.getDate() - diff);
    start.setHours(0, 0, 0, 0); // Set to start of the day
    return start;
  };

  const getEndOfWeek = (date: Date) => {
    const end = new Date(date);
    const day = end.getDay();
    const diff = day === 0 ? 6 : day - 1; // Adjust for Monday as the end of the week
    end.setDate(end.getDate() + (6 - diff)); // Move to the end of the week
    end.setHours(23, 59, 59, 999); // Set to end of the day
    return end;
  };

  const userClickHandler = async (user: Members) => {
    setSelectedUser(user);
    try {
      const now = new Date();
      const startOfWeek = getStartOfWeek(now);
      const endOfWeek = getEndOfWeek(now);
      const dateRange = {
        from: startOfWeek,
        to: endOfWeek,
      };
      const updatesResponse = await getUserUpdates(user.id, dateRange);
      setUserUpdates(updatesResponse);
      setDateRange(dateRange);
    } catch (error) {
      console.error("Error fetching user updates:", error);
    }
  };

  const onBackClickHandler = async () => {
    setSelectedTeam(null);
    setSelectedUser(null);
  };

  const dateUpdateHandler = async (values: {
    range: DateRange;
    rangeCompare?: DateRange;
  }) => {
    if (selectedUser) {
      try {
        const updatesResponse = await getUserUpdates(
          selectedUser.id,
          values.range
        );
        setUserUpdates(updatesResponse);
      } catch (error) {
        console.error("Error fetching user updates:", error);
      }
    }
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
          {selectedUser && (
            <UserUpdates
              key={selectedUser.id}
              user={selectedUser}
              updates={userUpdates}
              initialDateRange={dateRange}
              handleDateUpdate={dateUpdateHandler}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
