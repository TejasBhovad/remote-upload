"use client";
import { useEffect, useState } from "react";

const mountCache = new Set();

export const TabUnloadDetector = ({ code }) => {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const logEvent = (event) => {
      const data = new Blob([JSON.stringify({ event, code })], {
        type: "application/json",
      });
      navigator.sendBeacon("/api/unload", data);
    };

    const handleBeforeUnload = (e) => {
      if (isUploading) {
        e.preventDefault();
        e.returnValue = "Changes you made may not be saved.";
      }
      logEvent("unload");
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (mountCache.has(code)) {
        logEvent("unmounted");
      } else {
        mountCache.add(code);
      }
    };
  }, [code, isUploading]);

  return null;
};
