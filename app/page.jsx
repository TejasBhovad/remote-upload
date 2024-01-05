"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import Scanner from "@/app/components/pages/Scanner";
import Generator from "@/app/components/pages/Generator";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    }
  }, []);

  const handleGetStarted = () => {
    console.log("Get Started");
    if (isMobile) {
      console.log("Mobile");
    } else {
      console.log("PC");
    }
  };

  return (
    <div className="w-full h-full bg-background items-center flex">
      <div className="h-48 sm:h-96 w-full transition-all flex flex-col items-center justify-center text-center gap-2 px-4">
        <h1 className="font-extrabold text-transparent text-4xl sm:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-secondary to-primary transition-all">
          RemoteUpload
        </h1>
        <span className="text-text text-md sm:text-2xl lg:text-3xl transition-all font-medium">
          upload files remotely with ease
        </span>
        <Button
          className="slow-fade text-md sm:text-xl lg:text-2xl lg:px-18 lg:py-6 font-semibold text-white transition-all bg-accent px-10 py-2 mt-4 transition-all hover:text-text bg-opacity-75"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;

{
  /* <div className="hidden sm:flex w-full h-full bg-blue-500 text-white text-4xl flex justify-center items-center">
        <Generator />
      </div>

      <div className="flex sm:hidden w-full h-full bg-green-500 text-white text-4xl flex justify-center items-center">
        <Scanner />
      </div> */
}
