import React, { useState, useEffect, ReactNode } from "react";
import { SidebarContext } from "./SidebarContext";

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const storedIsOpen = localStorage.getItem("sidebarOpen");
    if (storedIsOpen !== null) {
      setIsOpen(JSON.parse(storedIsOpen));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      localStorage.setItem("sidebarOpen", JSON.stringify(newIsOpen));
      return newIsOpen;
    });
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
