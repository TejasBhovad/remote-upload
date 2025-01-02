"use server";

import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
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
  const urls = await redis.get(code);
  return urls ? JSON.parse(urls) : null;
}

export async function doesCodeExist(code) {
  return await redis.exists(code);
}
