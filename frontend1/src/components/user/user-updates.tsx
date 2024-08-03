import { DateRange, UserUpdate } from "@/types/user";
import React from "react";
import { DateRangePicker } from "../ui/date-range-picker";
import { Members } from "@/types/team";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface UserUpdatesProps {
  user: Members;
  updates: UserUpdate[];
  handleDateUpdate: (values: {
    range: DateRange;
    rangeCompare?: DateRange;
  }) => void;
}

const UserUpdates: React.FC<UserUpdatesProps> = ({
  user,
  updates,
  handleDateUpdate,
}) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  return (
    <div className="w-full p-2 flex flex-col gap-3">
      <div>
        <h2 className="text-lg">Filter By Date</h2>
        <DateRangePicker
          align="start"
          showCompare={false}
          initialDateFrom={startDate.toISOString().split("T")[0]}
          initialDateTo={endDate.toISOString().split("T")[0]}
          onUpdate={(values) => handleDateUpdate(values)}
        />
      </div>
      <h2 className="text-lg">
        Updates of <span className="text-">{user.name}</span>
      </h2>
      <ScrollArea>
        <ul className="flex flex-col gap-2">
          {updates.map((update) => (
            <li key={update._id}>
              <Card className={`w-full hover:bg-accent`} key={user.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{update.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <p>{update.description}</p>
                    <div className="text-sm self-end">
                      Updated on: {update.day} {update.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default UserUpdates;
