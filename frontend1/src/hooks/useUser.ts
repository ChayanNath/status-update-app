import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  team: string;
}

export const useUser = () => {
  const { user, setUser } = useAuth();
  const { setItem, removeItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return { user, addUser, removeUser, setUser };
};
