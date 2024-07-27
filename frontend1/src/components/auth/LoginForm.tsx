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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "../ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useUser } from "../../hooks/useUser";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { setUser } = useUser();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Call the login API
      const response = await login(values.username, values.password);

      setUser(response);

      // Show success toast and redirect
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed",
        description: "Incorrect username or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-[350px]">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>to continue to Progress Tracker</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
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
            Continue
          </Button>
          <div className="mt-3 self-start">
            <span>No account?</span>
            <Link className="ml-2 underline" to="/register">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
