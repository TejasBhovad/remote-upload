import React from "react";
import Navbar from "./navbar";
const NavbarWrapper = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <Navbar />
      <main className="h-full w-full pt-16">{children}</main>
    </div>
  );
};

export default NavbarWrapper;
