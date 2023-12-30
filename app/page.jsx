"use client";
import React, { useState, useEffect } from "react";
import Scanner from "@/app/components/pages/Scanner";
import Generator from "@/app/components/pages/Generator";

const Home = () => {
  return (
    <div className="w-full h-full">
      <div className="hidden sm:flex w-full h-full bg-blue-500 text-white text-4xl flex justify-center items-center">
        <Generator />
      </div>

      <div className="flex sm:hidden w-full h-full bg-green-500 text-white text-4xl flex justify-center items-center">
        <Scanner />
      </div>
    </div>
  );
};

export default Home;
