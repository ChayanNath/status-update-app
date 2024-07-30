import { PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/layout/Menu";
import useSidebar from "@/hooks/useSidebar";
import { SidebarToggle } from "@/components/layout/SidebarToggle";
import { Link } from "react-router-dom";

export function Sidebar() {
  const { isOpen } = useSidebar();
  console.log(isOpen);
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen transition-[width] ease-in-out duration-300",
        isOpen ? "w-72" : "w-[90px]"
      )}
    >
      <SidebarToggle />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            isOpen ? "translate-x-0" : "translate-x-1"
          )}
          variant="link"
          asChild
        >
          <Link to="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0 hidden"
              )}
            >
              Progress Tracker
            </h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
