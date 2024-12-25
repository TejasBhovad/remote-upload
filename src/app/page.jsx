"use client";
import { Google } from "@/components/icons/google";
import Wave from "@/assets/wave";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex h-auto w-full flex-col">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="z-10 flex h-3/4 w-full max-w-6xl flex-col bg-background/10 px-12">
          <Hero />
          <Button
            variant="ghost"
            className="w-full bg-accent text-lg font-semibold text-foreground hover:bg-accent/90"
            onClick={() => console.log("Hello World")}
          >
            <Google width={24} height={24} />
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="relative top-6 h-auto w-full rotate-180 text-background">
        <Wave />
      </div>
      <div className="flex h-screen flex-col items-center justify-center bg-foreground">
        <div className="flex h-3/4 w-full max-w-6xl flex-col bg-red-400 sm:flex-row"></div>
      </div>
      <div className="relative -top-6 h-auto w-full text-background">
        <Wave />
      </div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex h-3/4 w-full max-w-6xl flex-col bg-red-400 sm:flex-row"></div>
      </div>
    </div>
  );
}
