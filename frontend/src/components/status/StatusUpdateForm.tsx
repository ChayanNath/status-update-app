"use client";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { updateStatus, getStatus } from "@/services/statusService";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  date: z.date({ invalid_type_error: "Invalid date" }),
});

const StatusUpdateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await updateStatus(values);
      console.log(response);
      toast({
        title: "Update Submitted",
        description: "Your status update has been submitted successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your status update.",
        variant: "destructive",
      });
    }
  };

  const handleDateSelect = async (date: Date | undefined) => {
    if (date) {
      form.setValue("date", date);
      try {
        const status = await getStatus(date);
        if (status) {
          form.reset({
            title: status.title,
            description: status.description,
            date: new Date(status.date),
          });
        } else {
          form.reset({
            title: "",
            description: "",
            date,
          });
        }
      } catch (error) {
        form.reset({
          title: "",
          description: "",
          date,
        });
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    handleDateSelect(currentDate);
  }, []);

  return (
    <Card className="w-[550px]">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-xl">Daily Progress Update</CardTitle>
          <CardDescription>
            Share the highlights of your day and what you've achieved!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        toDate={new Date()}
                        mode="single"
                        selected={field.value}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
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
                    <Textarea
                      rows={8}
                      placeholder="Enter your update here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <Button type="submit" className="w-full uppercase">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default StatusUpdateForm;
