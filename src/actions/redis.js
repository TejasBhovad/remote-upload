"use server";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const alphabet = "1234567890";
const generateCode = customAlphabet(alphabet, 4);

export async function storeFileUrls(fileUrls) {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = generateCode();
    const exists = await redis.exists(code);
    if (!exists) {
      isUnique = true;
    }
  }

  await redis.setex(code, 86400, JSON.stringify(fileUrls));

  return code;
}

export async function getFileUrls(code) {
  if (!code) {
    return NextResponse.error("Code is required", { status: 400 });
  }
  if (code.length !== 4) {
    return NextResponse.error("Invalid code", { status: 400 });
  }
  if (!doesCodeExist(code)) {
    return NextResponse.error("Code does not exist", { status: 404 });
  }
  const urls = await redis.get(code);
  return urls;
  // return JSON.parse(urls);
}

export async function doesCodeExist(code) {
  if (!code) {
    return false;
  }
  try {
    const exists = await redis.exists(code);
    return exists === 1;
  } catch (error) {
    console.error("Redis error:", error);
    return false;
  }
}

export async function deleteCode({ code }) {
  // console.log("Deleting code", code);
  if (!code) {
    return NextResponse.error("Code is required", { status: 400 });
  }
  if (code.length !== 4) {
    return NextResponse.error("Invalid code", { status: 400 });
  }
  if (!doesCodeExist(code)) {
    return NextResponse.error("Code does not exist", { status: 404 });
  }
  await redis.del(code);
  return new Response("File deleted successfully", { status: 200 });
}
