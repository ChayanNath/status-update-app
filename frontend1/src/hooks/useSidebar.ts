import { useContext } from "react";
import { SidebarContext, SidebarContextType } from "../context/SidebarContext";

const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export default useSidebar;
