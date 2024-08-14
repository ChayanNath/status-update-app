import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Members } from "@/types/team";

interface UserCardProps {
  user: Members;
  onClickHandler: (user: Members) => void;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onClickHandler,
  className,
}) => {
  return (
    <Card
      className={`w-[300px] cursor-pointer hover:bg-accent ${className}`}
      onClick={() => onClickHandler(user)}
      key={user.id}
    >
      <CardHeader>
        <div className="flex items-center justify-items-center gap-3">
          <Avatar>
            <AvatarImage
              src={
                user.image ||
                `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(
                  user.name
                )}&backgroundColor=d1d4f9,c0aede,b6e3f4,ffd5dc,ffdfbf`
              }
              alt={`${user.name}'s avatar`}
            />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
