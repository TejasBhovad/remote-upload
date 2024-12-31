import React, { useState, useCallback } from "react";
import { X, Upload } from "lucide-react";
import { motion } from "motion/react";
import AnimatedButton from "../AnimatedButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Uploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [duplicateFile, setDuplicateFile] = useState(null);
  const [duplicateIndex, setDuplicateIndex] = useState(null);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);

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

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (!checkForDuplicates(files)) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleDuplicateAction = (action) => {
    if (action === "overwrite") {
      setSelectedFiles((prev) => {
        const newFiles = [...prev];
        newFiles[duplicateIndex] = duplicateFile;
        return newFiles;
      });
    } else if (action === "keep-both") {
      setSelectedFiles((prev) => [...prev, duplicateFile]);
    }
    // 'skip' doesn't require any action

    setShowDuplicateDialog(false);
    setDuplicateFile(null);
    setDuplicateIndex(null);
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
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

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (!checkForDuplicates(files)) {
        setSelectedFiles((prev) => [...prev, ...files]);
      }
    },
    [selectedFiles],
  ); // Add selectedFiles to dependencies

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
              onClick={() => handleDuplicateAction("keep-both")}
            >
              Keep Both
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => handleDuplicateAction("overwrite")}
            >
              Overwrite
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
              {/* total size in mb */}
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
                  <div className="flex flex-col">
                    <span className="truncate text-sm font-medium">
                      {file.name}
                    </span>
                    <span className="text-xs text-foreground/75">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
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
    </div>
  );
};

export default Uploader;
