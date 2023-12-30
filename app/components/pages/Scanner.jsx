import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

const Scanner = () => {
  const [data, setData] = useState(null);
  const [isScannerLoaded, setScannerLoaded] = useState(false);

  const toggleScanner = () => {
    // If the scanner is already loaded, close it by setting isScannerLoaded to false
    if (isScannerLoaded) {
      setData(null); // Clear any existing data
      setScannerLoaded(false); // Close the scanner
    } else {
      // If the scanner is closed, open it by setting isScannerLoaded to true
      setScannerLoaded(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 items-center justify-center">
      {/* Toggle scanner with the same button */}
      <button
        onClick={toggleScanner}
        className="text-[.95rem] bg-blue-400 w-1/2 rounded-sm"
      >
        {isScannerLoaded ? "Close Scanner" : "Load Scanner"}
      </button>
      {/* Show scanner when isScannerLoaded is true */}
      {isScannerLoaded && (
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
      {/* Show result */}
      {data?.text}
    </div>
  );
};

export default Scanner;
