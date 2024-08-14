import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Members, Team } from "@/types/team";
import { toast } from "@/components/ui/use-toast";
import { addTeam, updateTeam } from "@/services/teamService";
import { getUsersWithoutTeam } from "@/services/userService";
import { MultiSelect } from "@/components/ui/multi-select";
import { AxiosError } from "axios";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Team name must be at least 2 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  members: z
    .array(z.string())
    .min(1, { message: "Select at least one team member" }),
});

interface TeamFormProps {
  team: Team | null;
}

const TeamForm: React.FC<TeamFormProps> = ({ team }) => {
  const [usersWithoutTeam, setUsersWithoutTeam] = useState<Members[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: team?.name || "",
      description: team?.description || "",
      members: team?.members.map((member) => member.id) || [],
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsersWithoutTeam();
        setUsersWithoutTeam(users);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      }
    };

    fetchUsers();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (team) {
        await updateTeam(team._id, values);
        toast({
          title: "Success",
          description: "Team updated successfully",
          variant: "default",
        });
      } else {
        await addTeam(values);
        toast({
          title: "Success",
          description: "Team created successfully",
          variant: "default",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "An unknown error occurred";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={team ? "secondary" : "default"}
          className={team ? "ml-2" : ""}
        >
          {team ? "Edit Team" : "Add Team"}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{team ? "Edit Team" : "Add Team"}</SheetTitle>
          <SheetDescription>
            Fill out the form below and click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter team name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter team description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Members</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={usersWithoutTeam.map((user) => ({
                          id: user.id,
                          name: user.name,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select team members"
                        variant="default"
                        maxCount={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">
                {team ? "Save Changes" : "Create Team"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TeamForm;
