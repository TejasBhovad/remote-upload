import React from "react";
import Link from "next/link";
import Home from "@/app/components/logos/Home";
import Scanner from "@/app/components/logos/Scanner";
import Upload from "@/app/components/logos/Upload";
import "../styles/utils.css";

const Sidebar = () => {
  return (
    <div className="hidden md:flex absolute h-full w-full top-[40%] mx-4 w-12 h-44   rounded-md bg-opacity-25 flex-col items-center justify-center gap-2 px-0.5">
      <Link
        href="/"
        className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent hover:bg-opacity-25 circle-transform"
      >
        <Home />
      </Link>
      <Link
        href="/scanner"
        className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent hover:bg-opacity-25 circle-transform"
      >
        <Scanner />
      </Link>
      <Link
        href="/generator"
        className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent transition-all hover:bg-opacity-25 circle-transform"
      >
        <Upload />
      </Link>
    </div>
  );
};

export default Sidebar;
