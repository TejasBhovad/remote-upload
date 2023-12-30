import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { downloadFiles, deleteFiles } from "@/app/queries/download";
import { decrypt } from "@/app/queries/encryption";
import { sendEmail } from "@/app/queries/email";

const Scanner = () => {
  const [data, setData] = useState(null);
  const [isScannerLoaded, setScannerLoaded] = useState(false);

  const toggleScanner = () => {
    if (isScannerLoaded) {
      setData(null);
      setScannerLoaded(false);
    } else {
      setScannerLoaded(true);
    }
  };
  const [filePaths, setFilePaths] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [email, setEmail] = useState("code.tejas@gmail.com");

  const handleDownload = async () => {
    const downloadPromises = fileUrls.map((url) => downloadFiles(url));
    const filePaths = await Promise.all(downloadPromises);
    setFilePaths(filePaths);
  };

  const handleDelete = async () => {
    const deletePromises = filePaths.map((path) => deleteFiles(path));
    await Promise.all(deletePromises);
    console.log("All files deleted");
  };

  const handleEmail = async () => {
    await sendEmail(email, filePaths);
  };

  useEffect(() => {
    if (data?.text) {
      setFileUrls(JSON.parse(data.text));
      setScannerLoaded(false);
    }
  }, [data]);

  // download files
  useEffect(() => {
    if (fileUrls.length > 0) {
      handleDownload();
    }
  }, [fileUrls]);

  // send email
  useEffect(() => {
    if (filePaths.length > 0) {
      handleEmail();
    }
  }, [filePaths]);

  // delete files
  useEffect(() => {
    if (filePaths.length > 0) {
      handleDelete();
    }
  }, [filePaths]);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 items-center justify-center gap-4">
      {/* Toggle scanner with the same button */}
      <button
        onClick={toggleScanner}
        className="text-[.95rem] bg-blue-400 w-1/2 rounded-sm"
      >
        {isScannerLoaded ? "Close Scanner" : "Load Scanner"}
      </button>
      {/* Show scanner when isScannerLoaded is true and data is empty*/}
      {isScannerLoaded && !data && (
        <QrScanner
          onResult={(result) => setData(result)}
          onError={(err) => {
            console.log(err);
            if (err.name === "NotAllowedError") {
              alert(
                "Camera access was denied. Please allow access from your browser settings to use the scanner."
              );
            }
          }}
        />
      )}
      {/* {isScannerLoaded && (
        <QrScanner
          onResult={(result) => setData(result)}
          onError={(err) => {
            console.log(err);
            if (err.name === "NotAllowedError") {
              alert(
                "Camera access was denied. Please allow access from your browser settings to use the scanner."
              );
            }
          }}
        />
      )} */}
      <span className="text-sm"> {data?.text}</span>

      {/* <button
        onClick={handleDownload}
        className="text-[.95rem] bg-blue-400 w-1/2 rounded-sm"
      >
        Download
      </button>
      <button
        onClick={handleDelete}
        className="text-[.95rem] bg-blue-400 w-1/2 rounded-sm"
      >
        Delete
      </button> */}
      {/* {filePaths.map((filePath) => (
        <p className="text-sm">{filePath}</p>
      ))} */}
    </div>
  );
};

export default Scanner;
