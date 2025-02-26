import {
  storeFileUrls,
  getFileUrls,
  doesCodeExist,
  deleteCode,
} from "@/actions/redis";
import { NextResponse } from "next/server";

// POST /api/files - Store files and get code
export async function POST(request) {
  try {
    const { files } = await request.json();
    const code = await storeFileUrls(files);
    return NextResponse.json({ code });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET /api/files?code=XXXX - Get files for a code
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("code", code);

  if (!code) {
    return NextResponse.json(
      { error: "Code parameter is required" },
      { status: 400 },
    );
  }

  try {
    // Check if code exists first
    const exists = await doesCodeExist(code);
    if (!exists) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    const files = await getFileUrls(code);

    // Check if the value is already an object or needs parsing
    let parsedFiles;
    if (typeof files === "string") {
      try {
        parsedFiles = JSON.parse(files);
      } catch (parseError) {
        console.error("Failed to parse files JSON:", parseError);
        return NextResponse.json(
          { error: "Invalid file data format" },
          { status: 500 },
        );
      }
    } else {
      // It's already an object
      parsedFiles = files;
    }

    return NextResponse.json({ files: parsedFiles });
  } catch (error) {
    console.error("Error retrieving files:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/files?code=XXXX - Delete a code
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Code parameter is required" },
      { status: 400 },
    );
  }

  try {
    await deleteCode({ code });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
