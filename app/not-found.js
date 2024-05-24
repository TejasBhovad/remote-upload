"use client"; // Error components must be Client Components
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="select-none px-4 text-center py-4 text-black w-full h-full flex items-center flex-col gap-2 justify-center">
      <h2 className="text-4xl font-semibold text-secondary">Page not found</h2>
      <Link href="/">
        <span className="text-md text-text font-medium opacity-50 hover:opacity-85 transition-all">
          Go back home
        </span>
      </Link>
    </div>
  );
}
