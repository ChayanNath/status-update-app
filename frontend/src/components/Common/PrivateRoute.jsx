import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Replace this with your actual auth check
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
