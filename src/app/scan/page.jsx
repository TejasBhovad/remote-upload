"use client";
import { usePostHog } from "posthog-js/react";
import React, { useState, useEffect } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import ScannerComponent from "@/components/file/scanner";
import { useRouter } from "next/navigation";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return "tablet";
      }
      if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          userAgent,
        )
      ) {
        return "mobile";
      }
      return "desktop";
    };

    setDeviceType(detectDevice());
  }, []);

  return deviceType;
};

const OTPPage = () => {
  const posthog = usePostHog();
  const router = useRouter();
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);
  const deviceType = useDeviceType();

  const handleOTPComplete = (value) => {
    setOtpValue(value);
    setIsValidCode(value.length === 4);
  };

  const extractCodeFromURL = (url) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/s/");
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
      posthog.capture("otp_scanned", {
        otp_code: code,
      });
      setOtpValue(code);
      setIsValidCode(true);
    } else {
      setError("Invalid QR code format");
      setIsValidCode(false);
    }
  };

  const handleProceed = () => {
    if (isValidCode) {
      router.push(`/f/${otpValue}`);
      posthog.capture("otp_proceed", {
        otp_code: otpValue,
      });
    }
  };

  const renderOTPInput = () => (
    <div className="flex flex-col items-center gap-4">
      {deviceType === "desktop" && (
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Enter Your Code</h1>
          <p className="text-muted-foreground">
            Please enter the 4-digit code to proceed
          </p>
        </div>
      )}

      <div
        className={`flex flex-col items-center gap-6 ${deviceType === "desktop" ? "rounded-lg bg-accent p-[1px] shadow-sm" : ""}`}
      >
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          value={otpValue}
          onChange={handleOTPComplete}
        >
          <InputOTPGroup>
            <InputOTPSlot
              className="h-12 w-12 bg-background text-lg sm:h-16 sm:w-16 sm:text-xl"
              index={0}
            />
            <InputOTPSlot
              className="h-12 w-12 bg-background text-lg sm:h-16 sm:w-16 sm:text-xl"
              index={1}
            />
            <InputOTPSlot
              className="h-12 w-12 bg-background text-lg sm:h-16 sm:w-16 sm:text-xl"
              index={2}
            />
            <InputOTPSlot
              className="h-12 w-12 bg-background text-lg sm:h-16 sm:w-16 sm:text-xl"
              index={3}
            />
          </InputOTPGroup>
        </InputOTP>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {isValidCode && (
          <Button
            className="w-full min-w-[288px]"
            size="lg"
            onClick={handleProceed}
          >
            Proceed
          </Button>
        )}
      </div>
    </div>
  );

  const renderScanner = () => (
    <div className="relative flex aspect-square w-72 items-center justify-center rounded-md bg-accent p-2">
      <span className="absolute text-lg text-foreground sm:text-xl">
        Enable Camera
      </span>
      <ScannerComponent setQRContent={handleScanComplete} />
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      {deviceType !== "desktop" ? (
        <>
          {renderScanner()}
          {renderOTPInput()}
        </>
      ) : (
        renderOTPInput()
      )}
    </div>
  );
};

export default OTPPage;
