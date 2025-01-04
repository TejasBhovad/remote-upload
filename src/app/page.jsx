"use client";
import Link from "next/link";
import { Google } from "@/components/icons/google";
import Wave from "@/assets/wave";
import { Upload } from "lucide-react";
import Inbox from "@/components/landing/inbox";
import Arrow from "@/components/icons/arrow";
import Hero from "@/components/landing/hero";
import HeroLarge from "@/components/landing/hero-large";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return (
    <div className="flex h-auto w-full flex-col">
      <div className="flex h-screen flex-col items-center justify-center bg-red-400/0">
        <div className="z-10 flex h-full w-full max-w-6xl flex-col justify-between gap-8 bg-red-400/0 px-12 py-4 sm:hidden">
          <div className="flex h-auto w-full flex-col gap-8">
            <Hero />
            <Link href="/scan">
              <Button
                variant="ghost"
                className="w-full bg-accent text-lg font-semibold text-foreground hover:bg-accent/90"
              >
                Scan now
              </Button>
            </Link>
          </div>

          <span className="text-md py-8 text-center font-medium text-foreground">
            Select the Inbox where you'd like to receive your emails.
          </span>
        </div>
        <div className="z-10 hidden h-full w-full max-w-6xl gap-4 bg-background/10 px-12 sm:flex">
          <div className="flex h-full w-1/2 -translate-y-16 flex-col items-center justify-center gap-8">
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
              <Link href="/upload">
                <Button
                  variant="ghost"
                  className="w-auto bg-accent px-4 py-2 text-lg font-semibold text-foreground hover:bg-accent/90 md:py-4 lg:px-6 lg:text-xl xl:px-8 xl:py-4 xl:text-2xl"
                >
                  Share files
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex h-full w-1/2 -translate-y-16 items-center justify-center">
            <HeroLarge />
          </div>
        </div>
      </div>
      <div className="relative top-2 h-auto w-full rotate-180 text-background sm:top-6">
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
              <div className="h-48 w-4/5 overflow-hidden sm:h-fit sm:w-1/3 lg:w-1/2">
                <Inbox />
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="relative -top-2 h-auto w-full text-background sm:-top-6">
        <Wave />
      </div>
      <div className="mb-12 flex h-auto flex-col items-center justify-center">
        <div className="flex h-3/4 w-full max-w-6xl flex-col gap-8">
          <section className="flex h-auto w-full flex-col gap-0 px-4 py-2">
            <h1 className="h-fit w-full text-center text-3xl font-semibold text-foreground lg:text-5xl xl:text-6xl">
              Focus on the Files
            </h1>
            <h1 className="h-fit w-full text-center text-3xl font-semibold italic text-accent lg:text-5xl xl:text-6xl">
              not the Fees
            </h1>
          </section>
          <section className="flex h-full w-full flex-col items-center justify-center gap-4 px-12 md:flex-row md:gap-8">
            <div className="flex aspect-[3/2] w-full flex-col gap-2 rounded-md bg-foreground/10 p-4 sm:w-3/4 sm:translate-y-2 lg:w-1/3 lg:p-8">
              <h1 className="h-fit w-full text-start text-2xl font-bold text-foreground lg:text-3xl">
                100 Shares
              </h1>
              <span className="h-fit w-full text-start text-lg font-medium text-foreground/75 lg:text-xl">
                for small creators and students
              </span>
              <span className="flex h-fit w-full items-center gap-1 py-4 text-start text-2xl font-bold text-foreground lg:text-3xl">
                $0
                <span className="text-lg font-medium text-foreground/75">
                  /month
                </span>
              </span>
              <Button
                variant="ghost"
                className="w-full bg-accent/25 text-lg font-semibold text-foreground hover:bg-accent/30"
              >
                Get Started
              </Button>
              <div className="flex flex-col gap-2 py-4">
                <span className="flex h-fit w-full items-center gap-2 text-start text-lg font-medium text-foreground/75">
                  <Checkbox className="text-foreground/75" checked={true} />
                  Download on local device
                </span>
                <span className="flex h-fit w-full items-center gap-2 text-start text-lg font-medium text-foreground/75">
                  <Checkbox className="text-foreground/75" checked={true} />
                  No credit card required
                </span>
              </div>
            </div>
            <div className="flex aspect-[3/2] w-full flex-col gap-2 rounded-md bg-accent/20 p-4 sm:w-3/4 lg:w-1/3 lg:p-8">
              <h1 className="h-fit w-full text-start text-2xl font-bold text-foreground lg:text-3xl">
                1000 Shares
              </h1>
              <span className="h-fit w-full text-start text-lg font-medium text-foreground/75 lg:text-xl">
                for small businesses and universities
              </span>
              <span className="flex h-fit w-full items-center gap-1 py-4 text-start text-2xl font-bold text-foreground lg:text-3xl">
                $6
                <span className="text-lg font-medium text-foreground/75">
                  /month
                </span>
              </span>
              <Button
                variant="ghost"
                className="w-full bg-foreground text-lg font-semibold text-background hover:bg-foreground/90 hover:text-background"
              >
                Get Started
              </Button>
              <div className="flex flex-col gap-2 py-4">
                <span className="flex h-fit w-full items-center gap-2 text-start text-lg font-medium text-foreground/75">
                  <Checkbox className="text-foreground/75" checked={true} />
                  Files delivered to your inbox
                </span>
                <span className="flex h-fit w-full items-center gap-2 text-start text-lg font-medium text-foreground/75">
                  <Checkbox className="text-foreground/75" checked={true} />
                  File size up to 100MB
                </span>
              </div>
            </div>
            <div className="flex aspect-[3/2] w-full flex-col gap-2 rounded-md bg-foreground/10 p-4 sm:w-3/4 sm:translate-y-2 lg:w-1/3 lg:p-8">
              <h1 className="h-fit w-full text-start text-2xl font-bold text-foreground lg:text-3xl">
                ∞ Shares
              </h1>
              <span className="h-fit w-full text-start text-lg font-medium text-foreground/75 lg:text-xl">
                Custom plans for enterprises
              </span>
              <span className="flex h-fit w-full items-center gap-1 py-4 text-start text-xl font-bold text-foreground lg:text-xl">
                Let's have a chat
              </span>
              <Button
                variant="ghost"
                className="w-full bg-accent/25 text-lg font-semibold text-foreground hover:bg-accent/30"
              >
                Get Started
              </Button>
              <div className="flex flex-col gap-2 py-4">
                <span className="flex h-fit w-full items-center gap-2 text-start text-lg font-medium text-foreground/75">
                  <Checkbox className="text-foreground/75" checked={true} />
                  No file size limit
                </span>
                <span className="flex h-fit w-full items-center gap-2 text-start text-lg font-medium text-foreground/75">
                  <Checkbox className="text-foreground/75" checked={true} />
                  Custom buckets for your files
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
