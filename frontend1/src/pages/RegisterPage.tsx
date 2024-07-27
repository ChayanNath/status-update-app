import RegisterForm from "@/components/auth/RegisterForm";
import RedLogo from "../assets/tasks-red.svg";

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center h-full items-center gap-3">
      <div className="flex gap-2">
        <img src={RedLogo} className="h-10 w-10" />
        <h1 className="text-3xl">Progress Tracker</h1>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
