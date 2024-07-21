import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const TeamList = ({ teams, onDelete, onEdit, onCardClick }) => {
  const { user } = useSelector((state) => state.auth);

  const generateAvatarUrl = (teamName) => {
    if (!teamName) return;
    const initials = teamName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  };

  const handleDeleteClick = (event, teamId) => {
    event.stopPropagation(); // Prevents the click event from bubbling up to the card
    onDelete(teamId);
  };

  const handleEditClick = (event, team) => {
    event.stopPropagation(); // Prevents the click event from bubbling up to the card
    onEdit(team);
  };

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <div
          key={team._id}
          className="flex items-center p-4 bg-white shadow rounded-md cursor-pointer"
          onClick={() => onCardClick(team._id)}
        >
          <img
            src={team.logoUrl || generateAvatarUrl(team.name)}
            alt={team.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{team.name}</h3>
            <p className="text-gray-500">{team?.members?.length} members</p>
          </div>
          {user && user.isAdmin && (
            <div className="flex gap-2">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={(event) => handleDeleteClick(event, team._id)}
              >
                <FaTrash />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={(event) => handleEditClick(event, team)}
              >
                <MdEdit />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamList;
