import React from "react";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { ModeToggle } from "../mode-toggle";

const Layout: React.FC = () => {
  return (
    <>
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "h-screen"
        )}
      >
        <AppSidebar />
        <div className="flex flex-1">
          <div className="p-2 md:pb-10 md:pl-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
            <div className="flex justify-end">
              <ModeToggle />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
