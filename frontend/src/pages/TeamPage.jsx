import { useState, useEffect } from "react";
import { getTeams, addTeam, updateTeam, deleteTeam } from "../api/teamApi";
import TeamList from "../components/Dashboard/TeamList";
import Button from "../components/ui/Button";
import AddTeamForm from "../components/Team/AddTeamForm";
import { getUsersWithoutTeam, getAllUsers } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addTeamForm, setAddTeamForm] = useState(false);
  const [editTeam, setEditTeam] = useState(null); // State to hold the team being edited
  const [usersWithoutTeam, setUsersWithoutTeam] = useState([]); // State to hold users without a team
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [users, allUsers] = await Promise.all([
          getUsersWithoutTeam(),
          getAllUsers(),
        ]);
        setUsersWithoutTeam(users);
        setAllUsers(allUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  });

  const addTeamHandler = async (teamData) => {
    try {
      const newTeam = await addTeam(teamData);
      setTeams((prevTeams) => [...prevTeams, newTeam]);
      setAddTeamForm(false); // Hide form after successful submission
    } catch (error) {
      console.error("Error adding team:", error);
      setError(error);
    }
  };

  const editTeamHandler = async (teamData) => {
    try {
      const updatedTeam = await updateTeam(editTeam._id, teamData);
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === updatedTeam._id ? updatedTeam : team
        )
      );
      setEditTeam(null); // Clear edit team after successful update
      setAddTeamForm(false); // Hide form after successful submission
    } catch (error) {
      console.error("Error updating team:", error);
      setError(error);
    }
  };

  const deleteTeamHandler = async (teamId) => {
    try {
      await deleteTeam(teamId);
      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== teamId));
    } catch (error) {
      console.error("Error deleting team:", error);
      setError(error);
    }
  };

  const openAddTeamForm = () => {
    setEditTeam(null);
    setAddTeamForm(true);
  };

  const handleCardClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching teams: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Teams</h2>
        <Button label="Add team" onClick={openAddTeamForm} />
      </div>
      {addTeamForm && (
        <AddTeamForm
          onSubmit={editTeam ? editTeamHandler : addTeamHandler}
          initialValues={
            editTeam
              ? { name: editTeam.name, teamMembers: editTeam.members }
              : {
                  name: "",
                  teamMembers: [],
                }
          }
          // TODO: Fix the bug here, it will show all users in case of edit even
          // if they are already on a team
          users={editTeam ? allUsers : usersWithoutTeam}
          loading={loading}
          error={error}
        />
      )}
      <TeamList
        teams={teams}
        onDelete={deleteTeamHandler}
        onEdit={(team) => {
          setEditTeam(team);
          setAddTeamForm(true);
        }}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default TeamPage;
