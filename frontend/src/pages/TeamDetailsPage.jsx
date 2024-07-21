import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamStatus } from "../api/statusApi";
import StatusCard from "../components/StatusUpdate/StatusCard";

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const updates = await getTeamStatus(id);
        setUpdates(updates);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchTeamDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Statuses</h1>
      <div>
        {updates.map((status) => (
          <StatusCard key={status._id} status={status} />
        ))}
      </div>
    </div>
  );
};

export default TeamDetailsPage;
