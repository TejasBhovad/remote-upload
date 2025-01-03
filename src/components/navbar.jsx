"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInButton from "./auth/sign-in-button";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return "tablet";
      }
      if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          userAgent,
        )
      ) {
        return "mobile";
      }
      return "desktop";
    };

    setDeviceType(detectDevice());
  }, []);

  return deviceType;
};

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const deviceType = useDeviceType();
  const alignmentClass = pathname === "/" ? "justify-start" : "justify-center";

  return (
    <nav className="absolute flex h-16 w-full items-center justify-between px-6">
      <Link className={`flex ${alignmentClass} cursor-pointer`} href="/">
        <span className="cursor-pointer text-2xl font-bold text-foreground sm:text-3xl">
          Remote
        </span>
        <span className="cursor-pointer text-2xl font-bold text-accent sm:text-3xl">
          Upload
        </span>
      </Link>

      <>
        {session ? (
          <Avatar>
            <AvatarImage src={session.user.image} alt={session.user.name} />
            <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <SignInButton />
        )}
      </>
    </nav>
  );
};

const NavbarWrapper = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <Navbar />
      <main className="h-full w-full pt-16">{children}</main>
    </div>
  );
};

export default NavbarWrapper;
