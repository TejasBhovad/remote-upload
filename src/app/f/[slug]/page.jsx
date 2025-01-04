"use client";
import { useSession } from "next-auth/react";
import { Download } from "lucide-react";
import { use, useEffect, useState } from "react";
import { getFileUrls, doesCodeExist } from "@/actions/redis";
import { sendEmail } from "@/actions/email";
import { motion } from "motion/react";
import { useQRCode } from "next-qrcode";
import AnimatedButton from "@/components/AnimatedButton";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
const Page = ({ params }) => {
  const { data: session } = useSession();
  const { SVG } = useQRCode();
  const slug = use(params).slug;
  const [showQR, setShowQR] = useState(false);
  const [url, setUrl] = useState(` `);
  const [fileUrls, setFileUrls] = useState(null);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  // TODO: add loading state
  useEffect(() => {
    setIsMounted(true);
    if (slug) {
      const checkCode = async () => {
        try {
          const exists = await doesCodeExist(slug);
          if (!exists) {
            setError("Code does not exist");
          }
        } catch (err) {
          setError(err.message);
        }
      };
      checkCode();
    }
  }, []);
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/s/${slug}`);
    }
  }, [slug]);
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const urls = await getFileUrls(slug);
        setFileUrls(urls);
      } catch (err) {
        setError(err.message);
      }
    };

    if (slug) {
      fetchUrls();
    }
  }, [slug]);

  useEffect(() => {
    if (session && session.user) {
      setEmail(session.user.email);
      setName(session.user.name);
      if (session.user.image) {
        setProfileImage(session.user.image);
      }
    }
  }, [session]);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Clean up the URL object
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="h-full w-full max-w-4xl p-4">
          <p className="text-accent">{error}</p>
        </div>
      </div>
    );
  }

  const handleSendEmail = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("recipient", email);
    formData.append("fileUrls", JSON.stringify(fileUrls));
    formData.append("name", name);
    formData.append("profileImage", profileImage);
    const response = await sendEmail(formData);

    if (response.success) {
      setEmailSent(true);
      // Reset the state after 3 seconds
      setTimeout(() => {
        setEmailSent(false);
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex h-full w-full max-w-6xl p-4">
        {/* <div className="h-auto w-full"></div> */}
        {fileUrls !== null ? (
          <>
            <div className="flex h-full w-full flex-col gap-4 space-y-2 px-2">
              <section className="flex w-full gap-2">
                <Button
                  onClick={() => setShowQR(!showQR)}
                  className="rounded-full px-4 py-2 transition-colors"
                >
                  {showQR ? "Hide QR" : "Show QR"}
                </Button>
                {email ? (
                  <Button
                    className={`rounded-full px-4 py-2 transition-all ${
                      emailSent
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : ""
                    }`}
                    onClick={handleSendEmail}
                    disabled={loading || emailSent}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                        Sending...
                      </span>
                    ) : emailSent ? (
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        Email Sent!
                      </span>
                    ) : (
                      "Share via Email"
                    )}
                  </Button>
                ) : (
                  <Button
                    className="rounded-full px-4 py-2 transition-colors"
                    disabled
                  >
                    Login to share via email
                  </Button>
                )}
              </section>

              {fileUrls.map((file, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={index}
                  className="flex items-center justify-between rounded-md bg-secondary/75 p-3 backdrop-blur-sm"
                >
                  <div className="flex w-full items-center gap-3 truncate px-3">
                    <div className="flex w-full items-center justify-between">
                      <a
                        href={file.url}
                        referrerPolicy="no-referrer"
                        target="_blank"
                        className="text-md truncate font-medium transition-colors hover:text-accent sm:text-lg sm:font-semibold"
                      >
                        {file.name}
                      </a>
                      <AnimatedButton
                        className="rounded-full p-2 transition-colors"
                        onClick={() => handleDownload(file.url, file.name)}
                      >
                        <Download className="h-5 w-5" />
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              ))}
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 rounded-lg bg-secondary/50 p-6 backdrop-blur-lg sm:gap-6 sm:p-8"
                >
                  <span className="text-sm text-foreground/75 sm:text-base">
                    {url}
                  </span>
                  <div className="rounded-lg bg-white p-2 sm:p-4">
                    <SVG
                      text={url}
                      options={{
                        margin: 2,
                        width:
                          typeof window !== "undefined" &&
                          window.innerWidth < 640
                            ? 200
                            : 300,
                        color: {
                          dark: "#000000",
                          light: "#FFFFFF",
                        },
                      }}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div
                      onClick={handleCopy}
                      className="grid cursor-pointer grid-cols-4 gap-2 transition-transform hover:scale-105 sm:gap-4"
                    >
                      {slug.split("").map((digit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-2xl font-bold text-foreground hover:bg-secondary/80 sm:h-16 sm:w-16 sm:text-3xl"
                        >
                          {digit}
                        </motion.div>
                      ))}
                    </div>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-accent"
                      >
                        Copied to clipboard!
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="rounded bg-secondary px-3 py-2 text-lg font-semibold text-accent sm:text-xl">
              Loading...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
