"use client";
import React from "react";
import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import Cross from "@/app/components/logos/Cross";
import Folder from "@/app/components/logos/Folder";
import { Button } from "@/components/ui/button";
import { useQRCode } from "next-qrcode";

const page = () => {
  const { SVG } = useQRCode();
  const FileLimit = 5;
  const [showQR, setShowQR] = useState(false);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const handleShare = () => {
    setShowQR(true);
    setText(JSON.stringify(files.map((file) => file.url)));
  };
  const handleRemoveFile = (url) => {
    return () => {
      setFiles(files.filter((file) => file.url !== url));
      console.log("Files: ", files);
    };
  };
  return showQR ? (
    <div className="h-full w-full flex gap-8 flex-col">
      <div className="w-full h-16 sm:h-24 lg:h-28 border-2 transition-all flex items-center justify-center">
        <h1 className="font-extrabold text-transparent text-2xl sm:text-4xl lg:text-5xl bg-clip-text bg-gradient-to-r from-secondary to-primary transition-all">
          RemoteUpload
        </h1>
      </div>
      <div className="w-full flex items-center justify-center">
        <SVG
          text={text}
          options={{
            margin: 2,
            width: 200,
            color: {
              dark: "#5866E4",
              light: "",
            },
          }}
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <Button
          className="w-32 font-semibold text-text"
          onClick={() => setShowQR(false)}
        >
          Back
        </Button>
      </div>
    </div>
  ) : (
    <div className="h-full w-full flex gap-8 flex-col">
      <div className="w-full h-16 sm:h-24 lg:h-28 border-2 transition-all flex items-center justify-center">
        <h1 className="font-extrabold text-transparent text-2xl sm:text-4xl lg:text-5xl bg-clip-text bg-gradient-to-r from-secondary to-primary transition-all">
          RemoteUpload
        </h1>
      </div>
      <div className="w-full h-full flex items-start justify-center py-12">
        {files.length >= FileLimit ? (
          <div className="p-1 w-1/3 sm:h-48 py-3 min-w-64 border-2 border-dashed border-secondary text-center flex items-center justify-center rounded-sm">
            <h1 className="text-accent font-semibold px-8">
              You can only upload {FileLimit} files at a time
            </h1>
          </div>
        ) : (
          <UploadDropzone
            className="p-1 w-1/3 h-1/4 min-w-64 ut-allowed-content:text-opacity-50 bg-transparent ut-label:text-secondary sm:ut-label:text-md ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setFiles([...files, ...res]);
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
      </div>

      <ul className="w-full items-center flex flex-col gap-2 select-none">
        {files.map((file, index) => (
          <div
            key={index}
            className="bg-secondary bg-opacity-50 sm:w-1/2 py-3 px-4 rounded-md flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span>
                <Folder />
              </span>
              <li className="text-text">
                {typeof file === "object" ? file.name : file}
              </li>
            </div>
            <div
              onClick={handleRemoveFile(file.url)}
              className="hover:bg-accent hover:bg-opacity-25 p-1 hover:rounded-full cursor-pointer transition-all"
            >
              <Cross />
            </div>
          </div>
        ))}
      </ul>
      {files.length > 0 && (
        <div className="w-full flex items-center justify-center">
          <Button
            className="w-32 font-semibold text-text"
            onClick={handleShare}
          >
            Share
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
