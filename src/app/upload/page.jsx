"use client";
import React, { useEffect } from "react";
import { test } from "@/actions/test";
import { Button } from "@/components/ui/button";
const UploadPage = () => {
  useEffect(() => {
    // Function to handle beforeunload event
    const handleTabClose = async () => {
      // Call the test action
      test();
    };

    // Add event listener for when the user is about to leave the page
    window.addEventListener("beforeunload", handleTabClose);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Upload Page</h1>
      <Button
        className="bg-accent text-xl font-semibold hover:bg-accent/90"
        onClick={() => test()}
      >
        Test
      </Button>
    </div>
  );
};

export default UploadPage;
