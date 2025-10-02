import React from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            // router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <Button className={"font-semibold"} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOut;
