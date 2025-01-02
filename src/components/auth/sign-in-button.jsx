"use client";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      className="bg-accent text-lg font-semibold hover:bg-accent/90"
      onClick={() => signIn("google")}
    >
      Sign in
    </Button>
  );
}
