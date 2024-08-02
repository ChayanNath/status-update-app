import { useState, useEffect } from "react";

const useSidebarToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Load the initial state from localStorage
  useEffect(() => {
    const storedIsOpen = localStorage.getItem("sidebarOpen");
    if (storedIsOpen !== null) {
      setIsOpen(JSON.parse(storedIsOpen));
    }
  }, []);

  // Toggle the sidebar state and save it to localStorage
  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      localStorage.setItem("sidebarOpen", JSON.stringify(newIsOpen));
      return newIsOpen;
    });
  };

  return { isOpen, toggleSidebar };
};

export default useSidebarToggle;
