"use client";

import React, { useState, useCallback, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { storeFileUrls } from "@/actions/redis";
import AnimatedButton from "../animated-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteFile } from "@/server/uploadthing";
import { usePostHog } from "posthog-js/react";

const Uploader = () => {
  const posthog = usePostHog();
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [duplicateFile, setDuplicateFile] = useState(null);
  const [duplicateIndex, setDuplicateIndex] = useState(null);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [code, setCode] = useState(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [failedFile, setFailedFile] = useState(null);

  const handleStore = async () => {
    // const code = await storeFileUrls(uploadedFiles.map((file) => file.url));
    // instead store both the file name and the url as an object
    const code = await storeFileUrls(
      uploadedFiles.map((file) => ({
        name: file.name,
        url: file.url,
      })),
    );
    setCode(code);
    router.push(`/s/${code}`);
  };
  const { startUpload } = useUploadThing("fileUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        posthog.capture("file_uploaded", {
          file_count: res.length,
          file_names: res.map((file) => file.name),
        });
        setUploadedFiles((prevFiles) => {
          const newFiles = res.map((file) => ({
            key: file.key,
            name: file.name,
            url: file.url,
          }));

          const updatedFiles = [...prevFiles];
          newFiles.forEach((newFile) => {
            const existingIndex = updatedFiles.findIndex(
              (existingFile) => existingFile.name === newFile.name,
            );
            if (existingIndex !== -1) {
              updatedFiles[existingIndex] = newFile;
            } else {
              updatedFiles.push(newFile);
            }
          });

          return updatedFiles;
        });

        setIsUploading(false);
      }
    },
    onUploadError: (error) => {
      setIsUploading(false);
      setErrorMessage(`Error uploading file: ${error.message}`);
      setShowErrorDialog(true);

      // Remove the failed file from selectedFiles
      if (failedFile) {
        setSelectedFiles((prev) =>
          prev.filter((file) => file.name !== failedFile.name),
        );
        setFailedFile(null);
      }
    },
    onUploadBegin: (file) => {
      setIsUploading(true);
      setFailedFile(file);
    },
  });

  const isFileAlreadyUploaded = (fileName) => {
    return uploadedFiles.some((file) => file.name === fileName);
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.filter((file) => !isFileAlreadyUploaded(file.name));

    if (!checkForDuplicates(files)) {
      // Update selected files
      setSelectedFiles((prev) => {
        const uniqueFiles = files.filter(
          (file) =>
            !prev.some((existingFile) => existingFile.name === file.name),
        );
        return [...prev, ...uniqueFiles];
      });

      if (newFiles.length > 0) {
        try {
          await startUpload(newFiles);
        } catch (error) {
          // console.log("Upload failed:", error);
          setIsUploading(false);
        }
      }
    }
  };

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const newFiles = files.filter(
        (file) => !isFileAlreadyUploaded(file.name),
      );

      if (!checkForDuplicates(files)) {
        // Update selected files
        setSelectedFiles((prev) => {
          const uniqueFiles = files.filter(
            (file) =>
              !prev.some((existingFile) => existingFile.name === file.name),
          );
          return [...prev, ...uniqueFiles];
        });

        if (newFiles.length > 0) {
          try {
            await startUpload(newFiles);
          } catch (error) {
            console.log("Upload failed:", error);
            setIsUploading(false);
          }
        }
      }
    },
    [uploadedFiles],
  );

  const removeFile = async (indexToRemove) => {
    const fileToRemove = selectedFiles[indexToRemove];

    // Find the uploaded file (if it exists)
    const uploadedFile = uploadedFiles.find(
      (file) => file.name === fileToRemove.name,
    );

    // If the file was uploaded, delete it from the server
    if (uploadedFile?.key) {
      try {
        await deleteFile({ fileId: uploadedFile.key });
        // Remove from uploaded files
        setUploadedFiles((prev) =>
          prev.filter((file) => file.name !== fileToRemove.name),
        );
      } catch (error) {
        setErrorMessage(`Error removing file: ${error.message}`);
        setShowErrorDialog(true);
      }
    }

    // Always remove from selected files
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const checkForDuplicates = (newFiles) => {
    for (const file of newFiles) {
      const duplicateIdx = selectedFiles.findIndex(
        (existingFile) => existingFile.name === file.name,
      );
      if (duplicateIdx !== -1) {
        setDuplicateFile(file);
        setDuplicateIndex(duplicateIdx);
        setShowDuplicateDialog(true);
        return true;
      }
    }
    return false;
  };

  const handleDuplicateAction = async (action) => {
    if (action === "overwrite") {
      // First, delete the existing file if it was uploaded
      const existingFile = uploadedFiles.find(
        (file) => file.name === duplicateFile.name,
      );

      if (existingFile) {
        try {
          await deleteFile({
            fileId: existingFile.key,
          });
        } catch (error) {
          console.error("Error deleting existing file:", error);
        }
      }

      // Update selected files
      setSelectedFiles((prev) => {
        const newFiles = [...prev];
        newFiles[duplicateIndex] = duplicateFile;
        return newFiles;
      });

      // Reupload the new file
      try {
        await startUpload([duplicateFile]);
      } catch (error) {
        console.log("Upload failed:", error);
        setIsUploading(false);
      }
    }

    setShowDuplicateDialog(false);
    setDuplicateFile(null);
    setDuplicateIndex(null);
  };
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <div className="space-y-4 p-6">
      <AlertDialog
        open={showDuplicateDialog}
        onOpenChange={setShowDuplicateDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate File Detected</AlertDialogTitle>
            <AlertDialogDescription>
              "{duplicateFile?.name}" already exists in the list. What would you
              like to do?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleDuplicateAction("skip")}>
              Skip
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => handleDuplicateAction("overwrite")}
            >
              Overwrite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Error</AlertDialogTitle>
            <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed ${
          isDragging ? "border-primary bg-primary/10" : "border-input"
        } p-8 text-center transition-colors duration-200`}
      >
        <input
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          id="fileInput"
          multiple
        />
        <div className="flex flex-col items-center gap-4">
          <Upload className="h-10 w-10 text-foreground/50" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Drag & Drop files here or click to browse
            </h3>
            <p className="text-sm text-foreground/75">
              Support for multiple files
            </p>
          </div>
          <label
            htmlFor="fileInput"
            className="cursor-pointer rounded-md bg-accent px-4 py-2 text-foreground transition-colors hover:bg-accent/90"
          >
            Select Files
          </label>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Selected Files</h3>
            <div className="flex gap-2">
              <span className="text-sm text-foreground/75">
                {selectedFiles.length} file(s)
              </span>
              <span className="text-sm text-foreground/75">
                {(
                  selectedFiles.reduce((acc, file) => acc + file.size, 0) /
                  1024 /
                  1024
                ).toFixed(2)}{" "}
                MB
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                key={index}
                className="flex items-center justify-between rounded-md bg-secondary/75 p-3 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 truncate pr-4">
                  <div className="flex items-center gap-2">
                    {Array.from(uploadedFiles).some(
                      (uploadedFile) => uploadedFile.name === file.name,
                    ) ? (
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : isUploading ? (
                      <svg
                        className="h-5 w-5 animate-spin text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    <div className="flex flex-col">
                      <span className="truncate text-sm font-medium">
                        {file.name}
                      </span>
                      <span className="text-xs text-foreground/75">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                </div>
                <AnimatedButton
                  onClick={() => removeFile(index)}
                  className="flex items-center justify-center"
                >
                  <X className="h-4 w-4 text-foreground" />
                </AnimatedButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      <div className="flex w-full items-center justify-center">
        <Button
          onClick={handleStore}
          disabled={uploadedFiles.length === 0}
          className="w-full min-w-36 disabled:cursor-not-allowed sm:w-auto"
        >
          Share files
        </Button>
      </div>
    </div>
  );
};

export default Uploader;
