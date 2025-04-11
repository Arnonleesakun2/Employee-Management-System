import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="maincontainer">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
