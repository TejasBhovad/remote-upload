"use client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      className="cursor-pointer bg-accent text-lg font-semibold hover:bg-accent/90"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
