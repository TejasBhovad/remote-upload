import Wave from "@/assets/wave";
export default function Home() {
  return (
    <div className="flex h-auto w-full flex-col">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex h-3/4 w-full max-w-6xl flex-col bg-red-400 sm:flex-row">
          <div className="h-full bg-green-400 sm:w-1/2"></div>
          <div className="h-full bg-green-800 sm:w-1/2"></div>
        </div>
      </div>{" "}
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
