"use client";
import { Google } from "@/components/icons/google";
import Wave from "@/assets/wave";
import { Upload } from "lucide-react";
import Inbox from "@/components/landing/inbox";
import Arrow from "@/components/icons/arrow";
import Hero from "@/components/landing/hero";
import HeroLarge from "@/components/landing/hero-large";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex h-auto w-full flex-col">
      <div className="flex h-screen flex-col items-center justify-center bg-red-400/0">
        <div className="z-10 flex h-full w-full max-w-6xl flex-col justify-between gap-8 bg-red-400/0 px-12 py-16 sm:hidden">
          <div className="flex h-auto w-full translate-y-24 flex-col gap-8">
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
        <div className="z-10 hidden h-full w-full max-w-6xl gap-4 bg-background/10 px-12 pt-16 sm:flex">
          <div className="flex h-full w-1/2 flex-col items-center justify-center gap-8">
            <div className="flex w-full flex-col items-start justify-center gap-2">
              <span className="text-left text-4xl font-bold text-foreground transition-transform ease-in-out lg:text-5xl xl:text-6xl">
                Share your files
              </span>
              <span className="text-left text-4xl font-semibold text-accent transition-transform ease-in-out lg:text-5xl xl:text-6xl">
                Without login
              </span>
            </div>
            <span className="w-full items-start justify-start text-left text-lg font-medium text-foreground transition-transform ease-in-out lg:text-xl xl:text-xl">
              Get your files delivered straight to your inbox
            </span>
            <div className="flex w-full items-start justify-start">
              <Button
                variant="ghost"
                className="w-auto bg-accent px-4 py-2 text-lg font-semibold text-foreground hover:bg-accent/90 lg:px-6 lg:py-3 lg:text-xl xl:px-8 xl:py-4 xl:text-2xl"
                onClick={() => console.log("Hello World")}
              >
                Share files
              </Button>
            </div>
          </div>
          <div className="flex h-full w-1/2 items-center justify-center">
            <HeroLarge />
          </div>
        </div>
      </div>
      <div className="relative top-6 h-auto w-full rotate-180 text-background">
        <Wave />
      </div>
      <div className="flex h-screen flex-col items-center justify-center bg-foreground">
        <div className="flex h-3/4 w-full max-w-6xl flex-col">
          <h1 className="h-fit w-full px-4 py-2 text-center text-3xl font-semibold text-background lg:text-5xl xl:text-6xl">
            Effortless File Sharing
          </h1>
          <h2 className="h-fit w-full px-4 py-2 text-center text-xl font-medium text-background lg:text-2xl xl:text-3xl">
            delivered straight to your inbox.
          </h2>
          <div className="flex h-full items-center justify-center">
            <section className="flex h-full flex-col items-center justify-center gap-2 overflow-hidden px-8 py-4 sm:h-auto sm:flex-row">
              <div className="flex aspect-square w-48 items-center justify-center rounded-lg border-4 border-dashed border-accent bg-accent/25 sm:w-64 lg:w-96">
                <Upload className="h-16 w-16 text-accent sm:h-24 sm:w-24" />
              </div>
              <Arrow
                size={80}
                className="h-16 w-16 text-accent sm:h-24 sm:w-24"
              />
              <div className="h-fit w-4/5 sm:w-1/3 lg:w-1/2">
                <Inbox />
              </div>
            </section>
          </div>
        </div>
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
