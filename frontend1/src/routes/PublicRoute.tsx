import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute: React.FC = () => {
  const { user } = useAuth();

  // Redirect to the home page if user is authenticated
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
