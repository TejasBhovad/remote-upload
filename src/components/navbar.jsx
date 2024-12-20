"use client";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const alignmentClass = pathname === "/" ? "justify-start" : "justify-center";
  return (
    <nav className="flex h-16 w-full items-center px-6">
      <div className={`flex ${alignmentClass}`}>
        <span className="text-3xl font-bold text-foreground">Remote</span>
        <span className="text-accent text-3xl font-bold">Upload</span>
      </div>
    </nav>
  );
};

const NavbarWrapper = ({ children }) => {
  return (
    <div className="flex h-auto w-full flex-col bg-background">
      <Navbar />
      {children}
    </div>
  );
};

export default NavbarWrapper;
