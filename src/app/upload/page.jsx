"use client";
import React, { useEffect } from "react";
import { test } from "@/actions/test";
import Uploader from "@/components/file/uploader";
const UploadPage = () => {
  useEffect(() => {
    // Function to handle beforeunload event
    const handleTabClose = async () => {
      test();
    };
    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-full w-full max-w-6xl p-4">
        <Uploader />
      </div>

      {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
    </div>
  );
};

export default UploadPage;
