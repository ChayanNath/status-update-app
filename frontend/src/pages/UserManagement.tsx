import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { getAllUsers } from "@/services/authService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { makeAdmin } from "@/services/userService";

const UserManagement = () => {
  const [users, setUsers] = useState<{ label: string; value: string }[] | null>(
    null
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        console.log(users);
        setUsers(users);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      }
    };
    fetchUsers();
  }, []);

  const makeAdminHandler = async (userId: string) => {
    try {
      await makeAdmin(userId);
      toast({
        title: "Success",
        description: "User is promoted to admin",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to promote to admin",
        variant: "destructive",
      });
    }
  };
  return (
    <section>
      <Card className="w-full flex-1 mb-3">
        <CardHeader>
          <CardTitle className="text-xl">All Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea>
            {users && users.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {users.map((user) => (
                  <li key={user.value}>
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="text-xl flex justify-between">
                          <div className="flex gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(
                                  user.label
                                )}&backgroundColor=d1d4f9,c0aede,b6e3f4,ffd5dc,ffdfbf`}
                                alt={`${user.label}'s avatar`}
                              />
                              <AvatarFallback>{user.label}</AvatarFallback>
                            </Avatar>
                            <p>{user.label}</p>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => {
                                makeAdminHandler(user.value);
                              }}
                            >
                              Make Admin
                            </Button>
                            <Button variant="destructive">Remove User</Button>
                          </div>
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
    </section>
  );
};

export default UserManagement;
