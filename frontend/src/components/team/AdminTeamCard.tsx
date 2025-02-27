import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/types/team";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamCardProps {
  team: Team;
  onClickHandler: (team: Team) => void;
}

const AdminTeamCard: React.FC<TeamCardProps> = ({ team, onClickHandler }) => {
  return (
    <Card
      className="w-full cursor-pointer hover:bg-accent"
      onClick={() => onClickHandler(team)}
    >
      <CardHeader>
        <div className="flex items-center justify-items-center gap-3">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${team.name}`}
              alt="Team Image"
            />
            <AvatarFallback>{team.name}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{team.name}</CardTitle>
        </div>
        <CardDescription>Members: {team.members.length}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AdminTeamCard;
