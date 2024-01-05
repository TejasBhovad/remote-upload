"use client";

import { signIn } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Google from "@/app/components/logos/Google";
import Github from "@/app/components/logos/Github";
const Signin = () => {
  return (
    <Dialog>
      <DialogTrigger className="slow-fade text-md sm:text-md lg:text-lg font-semibold text-white transition-all bg-accent px-4 py-2 transition-all hover:text-text bg-opacity-75 rounded-sm hover:bg-primary">
        Sign in
      </DialogTrigger>
      <DialogContent className="w-80 sm:w-96 flex justify-center px-10 py-16 rounded-sm">
        <div className="flex flex-col gap-2">
          <DialogTitle className="flex flex-col gap-2">
            <span className="text-accent text-3xl sm:text-4xl sm:px-1 gradient-text">
              Let's Get Started
            </span>
            <span className="text-utility text-secondary font-normal text-sm px-1.5">
              Sign in to Receive your files on your email
            </span>
          </DialogTitle>
          <div className="text-text py-4 gap-6 flex-col flex items-center">
            {Object.values(authOptions.providers).map((provider) => (
              <div key={provider.id} className="w-full">
                <button
                  className=" hidden sm:flex text-lg px-4 py-2 bg-secondary bg-opacity-35 border-[1px] border-utility flex gap-4 font-medium w-full rounded-sm hover:bg-accent transition-all justify-center items-center hover:bg-opacity-50"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/scan",
                    })
                  }
                >
                  {provider.name === "GitHub" ? <Github /> : <Google />}
                  Sign in with {provider.name}
                </button>
                <button
                  className=" flex sm:hidden text-lg px-4 py-2 bg-secondary bg-opacity-35 border-[1px] border-utility flex gap-4 font-medium w-full rounded-sm hover:bg-accent transition-all px-4 items-center hover:bg-opacity-50"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/scan",
                    })
                  }
                >
                  {provider.name === "GitHub" ? <Github /> : <Google />}
                  {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Signin;
