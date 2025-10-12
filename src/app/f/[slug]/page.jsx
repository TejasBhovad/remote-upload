"use client";
import { useSession } from "@/lib/auth-client";
import { Download, Mail, QrCode, FileText, Check, X } from "lucide-react";
import { use, useEffect, useState } from "react";
import { getFileUrls, doesCodeExist } from "@/actions/redis";
import { sendEmail } from "@/actions/email";
import { motion, AnimatePresence } from "motion/react";
import { useQRCode } from "next-qrcode";
import AnimatedButton from "@/components/ui/animated-button";
import { Button } from "@/components/ui/button";

const Page = ({ params }) => {
  const { data: session, isPending, error: sessionError } = useSession();
  const { SVG } = useQRCode();
  const slug = use(params).slug;
  const [showQR, setShowQR] = useState(false);
  const [url, setUrl] = useState(``);
  const [fileUrls, setFileUrls] = useState(null);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [codeExists, setCodeExists] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [downloadingFiles, setDownloadingFiles] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}/s/${slug}`);
    }
  }, [slug]);

  useEffect(() => {
    const checkCodeAndFetchUrls = async () => {
      try {
        setIsLoading(true);
        const exists = await doesCodeExist(slug);
        setCodeExists(exists);

        if (exists) {
          const urls = await getFileUrls(slug);
          setFileUrls(urls);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      checkCodeAndFetchUrls();
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = async (url, filename, index) => {
    try {
      setDownloadingFiles((prev) => ({ ...prev, [index]: "loading" }));

      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setDownloadingFiles((prev) => ({ ...prev, [index]: "success" }));
      setTimeout(() => {
        setDownloadingFiles((prev) => {
          const newState = { ...prev };
          delete newState[index];
          return newState;
        });
      }, 2000);
    } catch (err) {
      console.error("Download failed:", err);
      setDownloadingFiles((prev) => ({ ...prev, [index]: "error" }));
      setTimeout(() => {
        setDownloadingFiles((prev) => {
          const newState = { ...prev };
          delete newState[index];
          return newState;
        });
      }, 2000);
    }
  };

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
      setTimeout(() => {
        setEmailSent(false);
      }, 3000);
    }
    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
          <span className="text-sm font-medium text-foreground/75">
            Loading your files...
          </span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-md rounded-xl border border-destructive/20 bg-secondary p-6 text-center"
        >
          <div className="mb-3 text-4xl">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">Error</h2>
          <p className="text-sm text-foreground/70">{error}</p>
        </motion.div>
      </div>
    );
  }

  if (codeExists === false) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-md rounded-xl bg-secondary/50 p-6 text-center backdrop-blur-sm"
        >
          <div className="mb-3 text-4xl">🔒</div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Code Not Found
          </h2>
          <p className="text-sm text-foreground/70">
            This code doesn't exist or has expired
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] items-start justify-center p-4">
      <div className="w-full max-w-3xl">
        {fileUrls !== null ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="rounded-xl bg-secondary/50 p-5 backdrop-blur-sm">
              <h1 className="mb-1 text-xl font-semibold text-foreground">
                Shared Files
              </h1>
              <p className="mb-4 text-sm text-foreground/60">
                {Array.isArray(fileUrls) ? fileUrls.length : 0} file
                {fileUrls?.length !== 1 ? "s" : ""} available
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-200"
                  variant={showQR ? "default" : "outline"}
                  size="sm"
                >
                  <QrCode className="h-4 w-4" />
                  {showQR ? "Hide QR" : "Show QR"}
                </Button>

                {email ? (
                  <Button
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
                      emailSent ? "bg-primary hover:bg-primary/80" : ""
                    }`}
                    onClick={handleSendEmail}
                    disabled={loading || emailSent}
                    size="sm"
                  >
                    {loading ? (
                      <>
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                        Sending...
                      </>
                    ) : emailSent ? (
                      <>
                        <Check className="h-4 w-4" />
                        Sent!
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Email
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
                    variant="outline"
                    disabled
                    size="sm"
                  >
                    <Mail className="h-4 w-4" />
                    Login to email
                  </Button>
                )}
              </div>
            </div>

            {/* QR Code Section */}
            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl bg-secondary/50 p-5 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-center text-xs text-foreground/60">
                        {url}
                      </p>

                      <div className="rounded-xl bg-white p-4 shadow-sm">
                        <SVG
                          text={url}
                          options={{
                            margin: 1,
                            width:
                              typeof window !== "undefined" &&
                              window.innerWidth < 640
                                ? 180
                                : 220,
                            color: {
                              dark: "#000000",
                              light: "#FFFFFF",
                            },
                          }}
                        />
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <p className="text-xs font-medium text-foreground/70">
                          Access Code
                        </p>
                        <div
                          onClick={handleCopy}
                          className="grid cursor-pointer grid-cols-4 gap-2"
                        >
                          {slug.split("").map((digit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: index * 0.05,
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              whileTap={{ opacity: 0.7 }}
                              className="flex h-12 w-12 items-center justify-center rounded-lg bg-background text-xl font-semibold text-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
                            >
                              {digit}
                            </motion.div>
                          ))}
                        </div>
                        <AnimatePresence>
                          {copied && (
                            <motion.span
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{
                                duration: 0.2,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              className="text-xs text-primary"
                            >
                              Copied to clipboard!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Files List */}
            <div className="space-y-2">
              {(Array.isArray(fileUrls) ? fileUrls : []).map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="flex items-center justify-between rounded-xl bg-secondary/50 p-4 backdrop-blur-sm transition-colors duration-200 hover:bg-secondary/70"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-2.5 text-accent">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a
                        href={file.url}
                        referrerPolicy="no-referrer"
                        target="_blank"
                        className="block truncate text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
                      >
                        {file.name}
                      </a>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ opacity: 0.7 }}
                    transition={{ duration: 0.1 }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                      downloadingFiles[index] === "success"
                        ? "bg-primary text-white"
                        : downloadingFiles[index] === "error"
                          ? "bg-red-600/50 text-white"
                          : "bg-accent text-accent-foreground hover:bg-accent/90"
                    }`}
                    onClick={() => handleDownload(file.url, file.name, index)}
                    disabled={downloadingFiles[index] === "loading"}
                  >
                    <AnimatePresence mode="wait">
                      {downloadingFiles[index] === "loading" ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                        />
                      ) : downloadingFiles[index] === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                        >
                          <Check
                            className="h-5 w-5 text-black"
                            strokeWidth={3}
                          />
                        </motion.div>
                      ) : downloadingFiles[index] === "error" ? (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="download"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Download className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center p-8"
          >
            <div className="rounded-xl bg-secondary/50 p-6 text-center backdrop-blur-sm">
              <span className="text-sm font-semibold text-accent">
                Code is not valid
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Page;
