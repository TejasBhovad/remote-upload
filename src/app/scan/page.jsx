"use client";
import React, { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import ScannerComponent from "@/components/file/scanner";
import { useRouter } from "next/navigation";

const OTPPage = () => {
  const router = useRouter();
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);

  const handleOTPComplete = (value) => {
    setOtpValue(value);
    setIsValidCode(value.length === 4);
  };

  const extractCodeFromURL = (url) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/s/");
      // Find the code after /s/ in the URL
      const codeIndex = pathParts.findIndex((part) => part.length === 4);
      return codeIndex > 0 && pathParts[codeIndex]
        ? pathParts[codeIndex]
        : null;
    } catch {
      const matches = url.match(/\/s\/([a-zA-Z0-9]{4})/);
      return matches ? matches[1] : null;
    }
  };

  const handleScanComplete = (scannedValue) => {
    setError("");
    const code = extractCodeFromURL(scannedValue);

    if (code && code.length === 4) {
      setOtpValue(code);
      setIsValidCode(true);
    } else {
      setError("Invalid QR code format");
      setIsValidCode(false);
    }
  };

  const handleProceed = () => {
    if (isValidCode) {
      console.log("Proceeding with code:", otpValue);
      router.push(`/f/${otpValue}`);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="relative flex aspect-square w-72 items-center justify-center rounded-md bg-accent p-2">
        <span className="absolute text-lg text-foreground sm:text-xl">
          Enable Camera
        </span>
        <ScannerComponent setQRContent={handleScanComplete} />
      </div>

      <InputOTP
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={otpValue}
        onChange={handleOTPComplete}
      >
        <InputOTPGroup>
          <InputOTPSlot
            className="h-12 w-12 text-lg sm:h-16 sm:w-16 sm:text-xl"
            index={0}
          />
          <InputOTPSlot
            className="h-12 w-12 text-lg sm:h-16 sm:w-16 sm:text-xl"
            index={1}
          />
          <InputOTPSlot
            className="h-12 w-12 text-lg sm:h-16 sm:w-16 sm:text-xl"
            index={2}
          />
          <InputOTPSlot
            className="h-12 w-12 text-lg sm:h-16 sm:w-16 sm:text-xl"
            index={3}
          />
        </InputOTPGroup>
      </InputOTP>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {isValidCode && (
        <Button className="mt-4 w-72" onClick={handleProceed}>
          Proceed
        </Button>
      )}
    </div>
  );
};

export default OTPPage;
