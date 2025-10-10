"use client";

import React, { useState, useCallback, useMemo } from "react";
import { X, Upload } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { storeFileUrls } from "@/actions/redis";
import AnimatedButton from "@/components/ui/animated-button";
import { Spinner } from "@/components/ui/spinner";
import { CircleCheck } from "lucide-react";
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

const Uploader = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [duplicateFile, setDuplicateFile] = useState(null);
  const [duplicateIndex, setDuplicateIndex] = useState(null);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(new Set());
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { startUpload } = useUploadThing("fileUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        setUploadedFiles((prevFiles) => {
          const newFiles = res.map((file) => ({
            key: file.key,
            name: file.name,
            url: file.url,
          }));

          const updatedFiles = [...prevFiles];
          newFiles.forEach((newFile) => {
            const existingIndex = updatedFiles.findIndex(
              (existingFile) => existingFile.name === newFile.name
            );
            if (existingIndex !== -1) {
              updatedFiles[existingIndex] = newFile;
            } else {
              updatedFiles.push(newFile);
            }
          });

          return updatedFiles;
        });

        // Remove from uploading state
        res.forEach((file) => {
          setUploadingFiles((prev) => {
            const next = new Set(prev);
            next.delete(file.name);
            return next;
          });
        });
      }
    },
    onUploadError: (error) => {
      setErrorMessage(`Error uploading file: ${error.message}`);
      setShowErrorDialog(true);
      setUploadingFiles(new Set());
    },
    onUploadBegin: (fileName) => {
      setUploadingFiles((prev) => new Set(prev).add(fileName));
    },
  });

  const isFileAlreadyUploaded = useCallback(
    (fileName) => {
      return uploadedFiles.some((file) => file.name === fileName);
    },
    [uploadedFiles]
  );

  const checkForDuplicates = useCallback(
    (newFiles) => {
      for (const file of newFiles) {
        const duplicateIdx = selectedFiles.findIndex(
          (existingFile) => existingFile.name === file.name
        );
        if (duplicateIdx !== -1) {
          setDuplicateFile(file);
          setDuplicateIndex(duplicateIdx);
          setShowDuplicateDialog(true);
          return true;
        }
      }
      return false;
    },
    [selectedFiles]
  );

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files || []);
    const newFiles = files.filter((file) => !isFileAlreadyUploaded(file.name));

    if (!checkForDuplicates(files)) {
      setSelectedFiles((prev) => {
        const uniqueFiles = files.filter(
          (file) =>
            !prev.some((existingFile) => existingFile.name === file.name)
        );
        return [...prev, ...uniqueFiles];
      });

      if (newFiles.length > 0) {
        try {
          await startUpload(newFiles);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }
    }

    // Reset input value to allow selecting the same file again
    event.target.value = "";
  };

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const newFiles = files.filter(
        (file) => !isFileAlreadyUploaded(file.name)
      );

      if (!checkForDuplicates(files)) {
        setSelectedFiles((prev) => {
          const uniqueFiles = files.filter(
            (file) =>
              !prev.some((existingFile) => existingFile.name === file.name)
          );
          return [...prev, ...uniqueFiles];
        });

        if (newFiles.length > 0) {
          try {
            await startUpload(newFiles);
          } catch (error) {
            console.error("Upload failed:", error);
          }
        }
      }
    },
    [isFileAlreadyUploaded, checkForDuplicates, startUpload]
  );

  const removeFile = async (indexToRemove) => {
    const fileToRemove = selectedFiles[indexToRemove];

    // Find the uploaded file (if it exists)
    const uploadedFile = uploadedFiles.find(
      (file) => file.name === fileToRemove.name
    );

    // If the file was uploaded, delete it from the server
    if (uploadedFile?.key) {
      try {
        await deleteFile({ fileId: uploadedFile.key });
        setUploadedFiles((prev) =>
          prev.filter((file) => file.name !== fileToRemove.name)
        );
      } catch (error) {
        setErrorMessage(`Error removing file: ${error.message}`);
        setShowErrorDialog(true);
        return;
      }
    }

    // Remove from selected files
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    // Remove from uploading state
    setUploadingFiles((prev) => {
      const next = new Set(prev);
      next.delete(fileToRemove.name);
      return next;
    });
  };

  const handleDuplicateAction = async (action) => {
    if (action === "overwrite" && duplicateFile && duplicateIndex !== null) {
      const existingFile = uploadedFiles.find(
        (file) => file.name === duplicateFile.name
      );

      if (existingFile) {
        try {
          await deleteFile({ fileId: existingFile.key });
        } catch (error) {
          console.error("Error deleting existing file:", error);
        }
      }

      setSelectedFiles((prev) => {
        const newFiles = [...prev];
        newFiles[duplicateIndex] = duplicateFile;
        return newFiles;
      });

      try {
        await startUpload([duplicateFile]);
      } catch (error) {
        console.error("Upload failed:", error);
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

  const handleStore = async () => {
    const code = await storeFileUrls(
      uploadedFiles.map((file) => ({
        name: file.name,
        url: file.url,
      }))
    );
    router.push(`/s/${code}`);
  };

  const totalSize = useMemo(() => {
    return selectedFiles.reduce((acc, file) => acc + file.size, 0);
  }, [selectedFiles]);

  const allFilesUploaded = useMemo(() => {
    return (
      selectedFiles.length > 0 &&
      selectedFiles.every((file) => isFileAlreadyUploaded(file.name)) &&
      uploadingFiles.size === 0
    );
  }, [selectedFiles, isFileAlreadyUploaded, uploadingFiles]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="space-y-4 p-6 w-full max-w-5xl">
        <AlertDialog
          open={showDuplicateDialog}
          onOpenChange={setShowDuplicateDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Duplicate File Detected</AlertDialogTitle>
              <AlertDialogDescription>
                "{duplicateFile?.name}" already exists in the list. What would
                you like to do?
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

        <AnimatePresence>
          {selectedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Selected Files</h3>
                <div className="flex gap-2">
                  <span className="text-sm text-foreground/75">
                    {selectedFiles.length} file(s)
                  </span>
                  <span className="text-sm text-foreground/75">
                    {(totalSize / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {selectedFiles.map((file, index) => {
                    const isUploading = uploadingFiles.has(file.name);
                    const isUploaded = isFileAlreadyUploaded(file.name);

                    return (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        layout
                        key={file.name + index}
                        className="flex items-center justify-between rounded-md bg-secondary/75 p-3 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3 truncate pr-4">
                          <div className="flex items-center gap-2">
                            {isUploaded ? (
                              <CircleCheck className="h-5 w-5 text-primary" />
                            ) : isUploading ? (
                              <Spinner className={"text-primary"} />
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
                          disabled={isUploading}
                        >
                          <X className="h-4 w-4 text-foreground" />
                        </AnimatedButton>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {allFilesUploaded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex w-full items-center justify-center"
          >
            <Button onClick={handleStore} className="w-full min-w-36 sm:w-auto">
              Share files
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
