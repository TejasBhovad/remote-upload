"use server";
import { userAgent } from "next/server";
import { headers } from "next/headers";

const deviceTypeDetector = async () => {
  const headerValues = await headers();
  const { device } = userAgent({ headers: headerValues });
  const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
  return deviceType;
};

export default deviceTypeDetector;
