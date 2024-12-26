"use client";
import { Google } from "@/components/icons/google";
import Wave from "@/assets/wave";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex h-auto w-full flex-col">
      <div className="flex h-screen flex-col items-center justify-center bg-red-400/0">
        <div className="z-10 flex h-full w-full max-w-6xl flex-col justify-between gap-8 bg-red-400/0 px-12 py-16 sm:hidden">
          <div className="flex h-auto w-full translate-y-24 flex-col gap-6">
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

          <span className="text-md text-center font-medium text-foreground">
            Select the Inbox where you'd like to receive your emails.
          </span>
        </div>
        <div className="z-10 hidden h-full w-full max-w-6xl flex-col gap-4 bg-background/10 bg-green-400 px-12 sm:flex">
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
