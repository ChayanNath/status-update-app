import React from "react";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import useSidebar from "@/hooks/useSidebar";

const Layout: React.FC = () => {
  const { isOpen } = useSidebar();

  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main
          className={cn(
            "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 p-4",
            isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
