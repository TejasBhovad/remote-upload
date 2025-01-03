"use client";

import { Scanner } from "@yudiel/react-qr-scanner";

const ScannerComponent = ({ setQRContent }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Scanner
        className="h-full w-full rounded-md"
        onScan={(result) => {
          if (result && result.length > 0) {
            setQRContent(result[0].rawValue);
          }
        }}
        onError={(err) => {
          console.log(err);
          if (err.name === "NotAllowedError") {
            alert(
              "Camera access was denied. Please allow access from your browser settings to use the scanner.",
            );
          } else {
            alert("An error occurred while accessing the camera.");
          }
        }}
      />
    </div>
  );
};

export default ScannerComponent;
