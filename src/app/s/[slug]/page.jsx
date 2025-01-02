"use client";

import { use, useEffect, useState } from "react";
import { getFileUrls, doesCodeExist } from "@/actions/redis";
import { TabUnloadDetector } from "@/components/file/tab-unloader";
import { motion } from "motion/react";
const Page = ({ params }) => {
  const slug = use(params).slug;
  const [fileUrls, setFileUrls] = useState(null);
  const [error, setError] = useState(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
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

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="h-full w-full max-w-6xl p-4">
          <p className="text-accent">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-full w-full max-w-6xl p-4">
        {fileUrls !== null ? (
          <>
            <TabUnloadDetector code={slug} isMounted={isMounted} />

            <div className="space-y-2 px-2">
              {fileUrls.map((file, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={index}
                  className="flex items-center justify-between rounded-md bg-secondary/75 p-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 truncate pr-4">
                    <div className="flex flex-col">
                      <a
                        href={file.url}
                        className="truncate text-sm font-medium transition-colors hover:text-accent sm:text-lg sm:font-semibold"
                      >
                        {file.name}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-accent">Invalid Path</p>
        )}
      </div>
    </div>
  );
};

export default Page;
