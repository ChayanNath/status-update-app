import LoginForm from "@/components/auth/LoginForm";
import RedLogo from "../assets/tasks-red.svg";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 h-screen">
      <div className="flex gap-2">
        <img src={RedLogo} className="h-10 w-10" />
        <h1 className="text-3xl">Progress Tracker</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
