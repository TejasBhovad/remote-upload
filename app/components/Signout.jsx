"use client";
import { signOut } from "next-auth/react";
const Signout = () => {
  return (
    <div
      className="cursor-pointer slow-fade text-md sm:text-md lg:text-lg font-semibold text-white transition-all bg-accent px-4 py-2 transition-all hover:text-text bg-opacity-75 rounded-sm hover:bg-primary"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Logout
    </div>
  );
};
export default Signout;
