import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { getAllUsers } from "@/services/authService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { makeAdmin, removeUser } from "@/services/userService";

const UserManagement = () => {
  const [users, setUsers] = useState<
    | { label: string; value: string; isAdmin: boolean; isSuperUser: boolean }[]
    | null
  >(null);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
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
  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdminHandler = async (userId: string) => {
    try {
      await makeAdmin(userId);
      fetchUsers();
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

  const removeUserHandler = async (userId: string) => {
    try {
      await removeUser(userId);
      fetchUsers();
      toast({
        title: "Success",
        description: "User removed successfully",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to remove user",
        variant: "destructive",
      });
    }
  };
  return (
    <section className="h-full">
      <Card className="w-full flex-1 mb-3">
        <CardHeader>
          <CardTitle className="text-xl">All Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[calc(100vh-206px)] w-full">
            {users && users.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {users.map((user) => (
                  <li key={user.value}>
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="text-xl flex justify-between">
                          <div className="flex gap-3 items-center">
                            <Avatar>
                              <AvatarImage
                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                                  user.label
                                )}&backgroundColor=d1d4f9,c0aede,b6e3f4,ffd5dc,ffdfbf`}
                                alt={`${user.label}'s avatar`}
                              />
                              <AvatarFallback>{user.label}</AvatarFallback>
                            </Avatar>
                            <p>{user.label}</p>
                          </div>
                          <div className="flex gap-3">
                            {!user.isAdmin && (
                              <Button
                                onClick={() => {
                                  makeAdminHandler(user.value);
                                }}
                              >
                                Make Admin
                              </Button>
                            )}
                            {!user.isSuperUser && (
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  removeUserHandler(user.value);
                                }}
                              >
                                Remove User
                              </Button>
                            )}
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
