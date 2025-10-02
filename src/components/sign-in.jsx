import React from "react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
const SignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/error",
        newUserCallbackURL: "/",
        disableRedirect: false,
      });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <Button className={"font-semibold"} onClick={handleGoogleSignIn}>
      Sign in
    </Button>
  );
};

export default SignIn;
