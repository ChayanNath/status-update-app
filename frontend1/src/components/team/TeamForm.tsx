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
import { Team } from "@/types/team";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { addTeam, updateTeam } from "@/services/teamService";
import { useNavigate } from "react-router-dom";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: team?.name || "",
      description: team?.description || "",
      members: team?.members.map((member) => member.id) || [],
    },
  });

  const navigate = useNavigate();

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
      navigate("/teams"); // Redirect to teams page
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the team",
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select team members"
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
