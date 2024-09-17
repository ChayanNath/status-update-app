import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/types/team";
import { AnimatedTooltip } from "../ui/animated-tooltip";

interface TeamCardProps {
  team: Team;
  onClickHandler: (team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClickHandler }) => {
  return (
    <Card
      className="w-72 cursor-pointer hover:bg-accent"
      onClick={() => onClickHandler(team)}
    >
      <CardHeader>
        <div className="flex items-center justify-items-center flex-col gap-3 mb-3">
          <CardTitle className="text-2xl">{team.name}</CardTitle>
        </div>
        <CardDescription>{team.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={team.members} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
