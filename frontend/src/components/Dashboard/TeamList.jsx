const TeamList = ({ teams }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Teams</h2>
      {teams.length > 0 ? (
        <ul className="list-disc list-inside">
          {teams.map((team) => (
            <li key={team._id} className="mb-2">
              {team.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No teams available.</p>
      )}
    </div>
  );
};

export default TeamList;
