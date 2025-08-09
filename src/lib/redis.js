import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  retry: { retries: 1 },
  keepAlive: true,
  automaticDeserialization: false,
  enableTelemetry: false,
});

const alphabet = "1234567890";
export const generateCode = customAlphabet(alphabet, 4);
