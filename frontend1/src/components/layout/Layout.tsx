import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
