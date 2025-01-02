"use client";
import { Button } from "@/components/ui/button";
import { storeFileUrls } from "@/actions/redis";
import { useState } from "react";
import { deleteFile } from "@/server/uploadthing";
const page = () => {
  const [files, setFiles] = useState([
    "https://example.com/file1.pdf",
    "https://example.com/file2.pdf",
  ]);
  const [code, setCode] = useState(null);

  const handleStore = async () => {
    const code = await storeFileUrls(files);
    setCode(code);
  };

  const filesToDelete = "1F2rb3walRkfgiVsOHrTfcwxlpRVGd5yj49EtansmhUCNDJS";
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Button variant="outline" onClick={handleStore}>
          Store files
        </Button>
        {code && (
          <div className="mt-4">
            <p>Code: {code}</p>
          </div>
        )}
      </div>
      <Button
        variant="outline"
        onClick={() => deleteFile({ fileId: filesToDelete })}
      >
        Delete file
      </Button>
    </div>
  );
};

export default page;
