import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const alphabet = "1234567890";
export const generateCode = customAlphabet(alphabet, 4);
