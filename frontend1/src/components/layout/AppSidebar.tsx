"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconEdit,
  IconUsersGroup,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import RedLogo from "../../assets/tasks-red.svg";
import { logout } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Update Status",
      href: "/update-status",
      icon: (
        <IconEdit className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Team Management",
      href: "/team-management",
      icon: (
        <IconUsersGroup className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  const { user, setUser } = useAuth();
  const { removeItem } = useLocalStorage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    removeItem("user");
    navigate("/login");
  };

  // const extractInitials = (
  //   firstName: string | undefined,
  //   lastName: string | undefined
  // ) => {
  //   const firstInitial = firstName ? firstName.substring(0, 1) : "";
  //   const lastInitial = lastName ? lastName.substring(0, 1) : "";
  //   return `${firstInitial}${lastInitial}`;
  // };

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <SidebarLink
            link={{
              label: `${user?.firstName} ${user?.lastName}`,
              href: "#",
              icon: (
                <img
                  src={`https://api.dicebear.com/9.x/personas/svg?seed=${user?.firstName}`}
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
          <Button
            onClick={() => {
              handleLogout();
            }}
            variant="outline"
            className="w-full justify-center h-10 mt-5"
          >
            <span className={cn(open === false ? "" : "mr-4")}>
              <LogOut size={18} />
            </span>
            <p
              className={cn(
                "whitespace-nowrap",
                open === false ? "opacity-0 hidden" : "opacity-100"
              )}
            >
              Sign out
            </p>
          </Button>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img src={RedLogo} className="h-6 w-6" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Progress Tracker
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img src={RedLogo} className="h-6 w-6" />
    </Link>
  );
};
