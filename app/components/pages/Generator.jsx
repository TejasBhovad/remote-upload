"use client";
import { useState } from "react";
import { useQRCode } from "next-qrcode";
import { downloadFiles, deleteFiles } from "@/app/queries/download";

const Generator = () => {
  const { Canvas } = useQRCode();
  const [text, setText] = useState("hello world");
  const fileUrls = [
    "https://utfs.io/f/9403bfee-edd1-47b7-8208-88e285d7fc08-1v.png",
    "https://utfs.io/f/d90bf0a7-f5de-48a8-9c06-24eb94264864-5molc3.png",
  ];
  // create empty array of file paths
  const [filePaths, setFilePaths] = useState([]); // [

  const handleDownload = async () => {
    // loop through each file url
    for (const url of fileUrls) {
      // download each file and get the file path
      const filePath = await downloadFiles(url);
      // push the file path to the array
      setFilePaths((prevFilePaths) => [...prevFilePaths, filePath]);
    }
  };

  const handleDelete = async () => {
    // loop through each file path
    for (const path of filePaths) {
      // delete each file
      await deleteFiles(path);
    }
    // clear the array
    setFilePaths([]);
  };
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 justify-center bg-gray-900">
      Generator
      {/* input that changes value of text */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="px-2 text-[1.2rem] border-2 border-black text-black rounded-md w-1/2 h-12"
      />
      {/* while text is not null or mepty */}
      {text && (
        <Canvas
          text={text}
          options={{
            type: "image/jpeg",
            quality: 0.3,
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#f1f5f9",
              light: "#020617",
            },
          }}
        />
      )}
      {/* button to handle file operatons */}
      <button
        onClick={handleDownload}
        className="text-[.95rem] bg-blue-400 w-1/2 rounded-sm"
      >
        Download
      </button>
      {/* delete btn */}
      <button
        onClick={handleDelete}
        className="text-[.95rem] bg-blue-400 w-1/2 rounded-sm"
      >
        Delete
      </button>
      {/* show file paths */}
      {filePaths.map((filePath) => (
        <p className="text-sm">{filePath}</p>
      ))}
    </div>
  );
};

export default Generator;
