import { ModeToggle } from "../mode-toggle";
import RedLogo from "@/assets/tasks-red.svg";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/authService";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Header = () => {
  const { user, setUser } = useAuth();
  const { removeItem } = useLocalStorage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    removeItem("user");
    navigate("/login");
  };

  return (
    <header>
      <nav className="mx-3 p-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img src={RedLogo} className="h-10 w-10" />
            <h1 className="text-3xl">Progress Tracker</h1>
          </div>
          <div className="flex gap-2">
            <h2 className="text-lg text-nowrap">Welcome, {user?.firstName}</h2>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full uppercase"
            >
              Logout
            </Button>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
