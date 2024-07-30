import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/types/team";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Card className="w-[300px] cursor-pointer hover:bg-accent">
      <CardHeader>
        <div className="flex items-center justify-items-center flex-col gap-3 mb-3">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${team.name}`}
              alt="Team Image"
            />
            <AvatarFallback>{team.name}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{team.name}</CardTitle>
        </div>
        <CardDescription>{team.description}</CardDescription>
      </CardHeader>
      <CardContent>Members: {team.members.length}</CardContent>
    </Card>
  );
};

export default TeamCard;
