import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { downloadFiles, deleteFiles } from "@/app/queries/download";
import { decrypt } from "@/app/queries/encryption";
import { sendEmail } from "@/app/queries/email";

const Scanner = ({
  userEmail = "default@email.com",
  name = "default",
  image = "image",
}) => {
  const [data, setData] = useState(null);

  const [filePaths, setFilePaths] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [email, setEmail] = useState(userEmail);
  const [username, setUsername] = useState(name);
  const [userImage, setUserImage] = useState(image);

  const handleDownload = async () => {
    const downloadPromises = fileUrls.map((url) => downloadFiles(url));
    const filePaths = await Promise.all(downloadPromises);
    setFilePaths(filePaths);
  };

  const handleDelete = async () => {
    const deletePromises = filePaths.map((path) => deleteFiles(path));
    await Promise.all(deletePromises);
    // console.log("All files deleted");
  };

  const handleEmail = async () => {
    await sendEmail(email, filePaths, username, userImage);
  };

  useEffect(() => {
    setEmail(userEmail);
  }, [userEmail]);

  useEffect(() => {
    setUsername(name);
  }, [name]);

  useEffect(() => {
    setUserImage(image);
  }, [image]);

  useEffect(() => {
    if (data?.text) {
      setFileUrls(JSON.parse(data.text));
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
      setTimeout(() => {
        handleDelete();
      }, 10000);
    }
  }, [filePaths]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-4 py-12">
      {data && (
        <div className="text-secondary text-md w-full h-full flex items-center justify-center flex-col">
          <span className="bg-trnaparent bg-opacity-15 px-4 py-2 border-utility border-2 rounded-sm mb-20">
            <h1 className="font-semibold text-transparent text-xl sm:text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r from-secondary to-primary transition-all">
              Email Sent to {email}
            </h1>
          </span>
          {/* button to clear data */}
          <div className="w-full flex items-center justify-center">
            <Button
              className="slow-fade text-md sm:text-xl lg:text-2xl lg:px-18 lg:py-6 font-semibold text-white transition-all bg-accent px-10 py-2 mt-4 transition-all hover:text-text bg-opacity-75"
              onClick={() => setData(null)}
            >
              Reset
            </Button>{" "}
          </div>
        </div>
      )}
      {!data && (
        <div className="w-full md:w-1/2 px-8 aspect-square rounded-md object-cover flex flex-col gap-2">
          <div className="text-sm text-center bg-secondary w-full bg-opacity-50 rounded-md text-text py-1 px-2">
            {email}
          </div>

          <QrScanner
            className="rounded-md"
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
        </div>
      )}
      {/* <span className="text-sm"> {data?.text}</span> */}
    </div>
  );
};

export default Scanner;
