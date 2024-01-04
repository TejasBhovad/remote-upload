import React from "react";
import Link from "next/link";
import Home from "@/app/components/logos/Home";
import Scanner from "@/app/components/logos/Scanner";
import Upload from "@/app/components/logos/Upload";
import "../styles/utils.css";

const Sidebar = () => {
  return (
    <section>
      <div className="hidden md:flex absolute top-[40%] mx-4 w-12 h-44   rounded-md bg-opacity-25 flex-col items-center justify-center gap-2 px-0.5">
        <Link
          href="/"
          className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent hover:bg-opacity-25 circle-transform"
        >
          <Home />
        </Link>
        <Link
          href="/scan"
          className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent hover:bg-opacity-25 circle-transform"
        >
          <Scanner />
        </Link>
        <Link
          href="/upload"
          className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent transition-all hover:bg-opacity-25 circle-transform"
        >
          <Upload />
        </Link>
      </div>
      {/* for mobile devices sidebar should be at bottom center */}
      <div className="w-full items-center flex justify-center">
        {" "}
        <div className="flex md:hidden absolute  bottom-8 mx-4 h-12 w-48 rounded-md bg-opacity-25 items-center justify-center gap-4 px-0.5">
          <Link
            href="/"
            className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent hover:bg-opacity-25 circle-transform"
          >
            <Home />
          </Link>
          <Link
            href="/scan"
            className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent hover:bg-opacity-25 circle-transform"
          >
            <Scanner />
          </Link>
          <Link
            href="/upload"
            className="w-full bg-secondary bg-opacity-30 aspect-square rounded-lg flex items-center justify-center hover:bg-accent transition-all hover:bg-opacity-25 circle-transform"
          >
            <Upload />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
