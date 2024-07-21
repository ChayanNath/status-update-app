import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth"; // Adjust the path to your useAuth hook

const PrivateRoute = ({ children }) => {
  useAuth(); // Initialize authentication check

  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
