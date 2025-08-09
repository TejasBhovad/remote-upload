"use server";

import { redis, generateCode } from "@/lib/redis";

export async function storeFileUrls(fileUrls) {
  let code;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 5;

  while (!isUnique && attempts < maxAttempts) {
    code = generateCode();

    const exists = await redis.exists(code);

    if (!exists) {
      isUnique = true;
    }
    attempts++;
  }

  if (!isUnique) {
    throw new Error("Unable to generate unique code");
  }

  // Ensure fileUrls is an array before storing
  const dataToStore = Array.isArray(fileUrls) ? fileUrls : [];
  await redis.setex(code, 86400, JSON.stringify(dataToStore));

  return code;
}

export async function getFileUrls(code) {
  if (!code || code.length !== 4) {
    throw new Error("Invalid code");
  }

  const exists = await redis.exists(code);

  if (!exists) {
    throw new Error("Code does not exist");
  }

  const data = await redis.get(code);

  // Handle parsing and ensure we return an array
  try {
    if (typeof data === "string") {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    }
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error parsing Redis data:", error);
    return [];
  }
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
  if (!code || code.length !== 4) {
    throw new Error("Invalid code");
  }

  const exists = await redis.exists(code);

  if (!exists) {
    throw new Error("Code does not exist");
  }

  await redis.del(code);
  return { success: true };
}
