"use client";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, Loader2, Mail, LogOut } from "lucide-react";

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
          userAgent
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
  const { data: session, isPending, error } = useSession();
  const pathname = usePathname();
  const deviceType = useDeviceType();
  const alignmentClass = pathname === "/" ? "justify-start" : "justify-center";

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute flex h-16 w-full items-center justify-between px-6"
    >
      <Link
        className={`flex ${alignmentClass} w-fit cursor-pointer items-center`}
        href="/"
      >
        <span className="cursor-pointer text-2xl font-bold text-foreground sm:text-3xl">
          Remote
        </span>
        <span className="cursor-pointer text-2xl font-bold text-primary sm:text-3xl">
          Upload
        </span>
      </Link>
      <>
        {isPending ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <User className="h-6 w-6 text-destructive" />
          </div>
        ) : session?.user ? (
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-full transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-8 h-8">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0 mr-0 mt-1.5" align="end">
              <div className="flex flex-col">
                {/* Header Section */}
                <div className="flex items-center gap-2.5 px-4 py-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-md font-semibold text-foreground truncate">
                      {session.user.name}
                    </span>
                    <span className="text-sm text-muted-foreground truncate flex items-center gap-1.5 mt-0.5">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      {session.user.email}
                    </span>
                  </div>
                </div>

                <div className="px-4 pb-2">
                  <SignOut />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <SignIn />
        )}
      </>
    </motion.nav>
  );
};

export default Navbar;
