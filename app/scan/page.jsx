"use client";
import React from "react";
import { useState, useEffect } from "react";
import Scanner from "@/app/components/pages/Scanner";
import Signin from "../components/Signin";
import Signout from "../components/Signout";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  const [userEmail, setUserEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (status === "authenticated") {
      setUserEmail(session.user.email);
      setUsername(session.user.name);
      setImage(session.user.image);
    }
  }, [status]);
  return (
    <div className="h-full w-full flex gap-8 flex-col">
      <div className="w-full h-16 sm:h-24  border-2 transition-all flex items-center justify-between px-4">
        <h1 className="font-extrabold text-transparent text-2xl sm:text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r from-secondary to-primary transition-all">
          RemoteUpload
        </h1>
        {session ? <Signout /> : <Signin />}
      </div>
      {session ? (
        <div className="w-full h-full">
          <Scanner userEmail={userEmail} name={username} image={image} />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="font-semibold text-transparent text-3xl sm:text-4xl lg:text-4xl bg-clip-text bg-gradient-to-r from-secondary to-primary transition-all pb-24">
            Sign in to Scan Files
          </h1>
        </div>
      )}
    </div>
  );
};

export default page;
