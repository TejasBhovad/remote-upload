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
  const [files, setFiles] = useState([
    // {
    //   name: "image-1.jpg",
    //   size: 100000,
    //   type: "image/jpeg",
    //   url: "https://utfs.io/f/22865c40-92dd-45fc-8c52-2363c6129203-stjq8f.png",
    // },
    // {
    //   name: "image-2.jpg",
    //   size: 100000,
    //   type: "image/jpeg",
    //   url: "https://utfs.io/f/d90bf0a7-f5de-48a8-9c06-24eb94264864-5molc3.png",
    // },
    // {
    //   name: "image-3.jpg",
    //   size: 100000,
    //   type: "image/jpeg",
    //   url: "https://utfs.io/f/9403bfee-edd1-47b7-8208-88e285d7fc08-1v.png",
    // },
    // {
    //   name: "image-4.jpg",
    //   size: 100000,
    //   type: "image/jpeg",
    //   url: "https://utfs.io/f/22865c40-92dd-45fc-8c52-2363c6129203-stjq8f.png",
    // },
    // {
    //   name: "image-5.jpg",
    //   size: 100000,
    //   type: "image/jpeg",
    //   url: "https://utfs.io/f/d90bf0a7-f5de-48a8-9c06-24eb94264864-5molc3.png",
    // },
  ]);
  const handleShare = () => {
    setShowQR(true);
    // set contents of text to array of urls
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
      <div className="w-full flex items-center justify-center">
        {files.length >= FileLimit ? (
          <div className="p-1 w-1/3 sm:h-48 py-3 min-w-64 border-2 border-dashed border-secondary text-center flex items-center justify-center rounded-sm">
            <h1 className="text-accent font-semibold px-8">
              You can only upload {FileLimit} files at a time
            </h1>
          </div>
        ) : (
          <UploadDropzone
            className="p-1 w-1/3 sm:h-48 min-w-64"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              // append to files
              setFiles([...files, ...res]);
              // alert("Upload Completed");
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
