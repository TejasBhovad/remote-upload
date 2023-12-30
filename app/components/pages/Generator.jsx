"use client";
import { useState } from "react";
import { useQRCode } from "next-qrcode";
import { encrypt } from "@/app/queries/encryption";

const Generator = () => {
  const { SVG } = useQRCode();
  const [fileURLs, setFileURLs] = useState([
    "https://utfs.io/f/9403bfee-edd1-47b7-8208-88e285d7fc08-1v.png",
    "https://utfs.io/f/d90bf0a7-f5de-48a8-9c06-24eb94264864-5molc3.png",
  ]);
  const [text, setText] = useState(JSON.stringify(fileURLs));
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 justify-center bg-gray-900">
      Generator
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="px-2 text-[1.2rem] border-2 border-black text-black rounded-md w-1/2 h-12"
      />
      {text && (
        <SVG
          text={text}
          options={{
            margin: 2,
            width: 200,
            color: {
              dark: "#010599FF",
              light: "#FFBF60FF",
            },
          }}
        />
      )}
      {/* show encrypted text */}
      {text && <p className="text-[.95rem]">{}</p>}
    </div>
  );
};

export default Generator;
