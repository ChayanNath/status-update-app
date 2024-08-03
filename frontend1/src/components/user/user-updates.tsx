import { UserUpdate } from "@/types/user";
import React from "react";
import { DateRangePicker } from "../ui/date-range-picker";

// Update this type
interface UserUpdatesProps {
  updates: UserUpdate[];
}

const UserUpdates: React.FC<UserUpdatesProps> = ({ updates }) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  return (
    <div className="w-full p-2">
      <h2 className="text-lg">Filter By Date</h2>
      <DateRangePicker
        align="start"
        showCompare={false}
        initialDateFrom={startDate.toISOString().split("T")[0]}
        initialDateTo={endDate.toISOString().split("T")[0]}
        onUpdate={(values) => console.log(values)}
      />
      <ul>
        {updates.map((update) => (
          <li key={update._id}>
            <p>{update.title}</p>
            <p>{update.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserUpdates;
