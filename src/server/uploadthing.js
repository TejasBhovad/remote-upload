"use server";
import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";
const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
  apiUrl: "https://api.uploadthing.com",
});

export async function deleteFile({ fileId }) {
  if (!fileId) {
    throw new Error("File id is required");
  }
  console.log("Deleting file with id", fileId);
  const res = utapi.deleteFiles(fileId);
}
