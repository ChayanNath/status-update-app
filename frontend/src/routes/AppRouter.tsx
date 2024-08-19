import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Home from "@/pages/Home";
import Layout from "@/components/layout/Layout";
import TeamManagement from "@/pages/TeamManagement";
import UserManagement from "@/pages/UserManagement";
import StatusUpdate from "@/pages/StatusUpdate";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <PublicRoute />,
    children: [{ path: "", element: <LoginPage /> }],
  },
  {
    path: "/register",
    element: <PublicRoute />,
    children: [{ path: "", element: <RegisterPage /> }],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Layout />, // Use Layout here
        children: [
          { path: "", element: <Home /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "update-status", element: <StatusUpdate /> },
          { path: "team-management", element: <TeamManagement /> },
          { path: "user-management", element: <UserManagement /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
