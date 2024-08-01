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
  onClickHandler: (id: string) => void;
}

const AdminTeamCard: React.FC<TeamCardProps> = ({ team, onClickHandler }) => {
  return (
    <Card
      className="w-[300px] cursor-pointer hover:bg-accent"
      onClick={() => onClickHandler(team._id)}
    >
      <CardHeader>
        <div className="flex items-center justify-items-center gap-3">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${team.name}`}
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
