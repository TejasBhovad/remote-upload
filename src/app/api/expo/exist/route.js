import { doesCodeExist } from "@/actions/redis";
import { NextResponse } from "next/server";

// GET /api/code/exists?code=XXXX - Check if code exists
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  try {
    const exists = await doesCodeExist(code);
    return NextResponse.json({ exists });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
