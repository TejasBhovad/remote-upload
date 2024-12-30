import deviceTypeDetector from "@/server/utils";

const page = () => {
  const isMobile = deviceTypeDetector() === "mobile";
  return (
    <div className="h-full w-full">
      <h1>Test Page</h1>
      <p>{isMobile ? "Mobile" : "Desktop"}</p>
    </div>
  );
};

export default page;
