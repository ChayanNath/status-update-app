import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Team } from "@/types/team";
import { TeamMember } from "@/types/user";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface TeamDetailsProps {
  team: Team | null;
  users: TeamMember[];
}

const TeamDetailsPage: React.FC<TeamDetailsProps> = ({ team, users }) => {
  return (
    <div className="flex flex-col gap-3 h-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Team Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Team Name</p>
              <p className="border p-2 rounded-md">{team?.name || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Description</p>
              <p className="border p-2 rounded-md">
                {team?.description || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full flex-1 mb-3">
        <CardHeader>
          <CardTitle className="text-xl">Team Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea>
            {users && users.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {users.map((user) => (
                  <li key={user.id}>
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="text-xl flex gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(
                                user.firstName + " " + user.lastName
                              )}&backgroundColor=d1d4f9,c0aede,b6e3f4,ffd5dc,ffdfbf`}
                              alt={`${
                                user.firstName + " " + user.lastName
                              }'s avatar`}
                            />
                            <AvatarFallback>
                              {user.firstName + " " + user.lastName}
                            </AvatarFallback>
                          </Avatar>
                          <p>{user.firstName + " " + user.lastName}</p>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No team members</div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamDetailsPage;
