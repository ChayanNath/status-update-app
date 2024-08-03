import React, { useEffect, useState } from "react";
import UserCard from "@/components/user/user-card";
import { Members } from "@/types/team";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { IconLeft } from "react-day-picker";

interface UserListProps {
  users: Members[];
  onUserClick: (user: Members) => void;
  onBackClick: () => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
  onBackClick,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (users.length > 0) {
      setSelectedUserId(users[0].id);
    }
  }, [users]);

  const handleUserClick = (user: Members) => {
    setSelectedUserId(user.id);
    onUserClick(user);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg mb-2">Team Members</h2>
        <Button variant="link" onClick={onBackClick}>
          <IconLeft></IconLeft> Back
        </Button>
      </div>
      <ScrollArea className="h-full w-100 rounded-md border p-2">
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClickHandler={handleUserClick}
              className={
                user.id === selectedUserId
                  ? "bg-neutral-100 dark:bg-zinc-800"
                  : ""
              }
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserList;
