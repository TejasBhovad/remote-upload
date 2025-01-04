import { deleteFile } from "@/server/uploadthing";
import { getFileUrls, doesCodeExist, deleteCode } from "@/actions/redis";
import { NextResponse } from "next/server";
export async function POST(request) {
  const data = await request.json();
  // console.log("Server log:", data);
  const code = data.code;
  if (!code) {
    return NextResponse.error("Code is required", { status: 400 });
  }
  if (code.length !== 4) {
    return NextResponse.error("Invalid code", { status: 400 });
  }
  if (!doesCodeExist(code)) {
    return NextResponse.error("Code does not exist", { status: 404 });
  }
  const urls = await getFileUrls(code);
  //   await deleteFile({ fileId: urls });
  const urlArray = Array.isArray(urls)
    ? urls
        .map((file) => {
          const url = file.url || file;
          return url.split("/f/")[1];
        })
        .filter(Boolean)
    : [urls.split("/f/")[1]].filter(Boolean);
  // console.log("Server log:", urlArray);
  // console.log("Server log:", code);
  await deleteFile({ fileId: urlArray });
  await deleteCode({ code });

  return new Response("Logged", { status: 200 });
}
