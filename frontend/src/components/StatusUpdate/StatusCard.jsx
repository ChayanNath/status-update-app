//TODO: This is repeatetive in multiple places
const generateAvatarUrl = (firstName, lastName) => {
  if (!firstName || !lastName) return;
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=random`;
};

const StatusCard = ({ status }) => {
  const { firstName, lastName } = status.user;
  const avatarUrl = generateAvatarUrl(firstName, lastName);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <img
          src={avatarUrl}
          alt={`${firstName} ${lastName}`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{status.title}</h3>
          <p className="text-gray-600">{status.description}</p>
          <div className="mt-2 text-gray-500">
            <p>
              <strong>User:</strong> {firstName} {lastName}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(status.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
