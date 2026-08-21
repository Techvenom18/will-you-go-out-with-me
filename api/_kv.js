import { Redis } from "@upstash/redis";

// Works with Vercel's "Redis" marketplace integration (Upstash), which
// auto-populates KV_REST_API_URL / KV_REST_API_TOKEN — or their newer
// REDIS_* / UPSTASH_* names depending on how it was connected.
const url =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.REDIS_KV_REST_API_URL;

const token =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.REDIS_KV_REST_API_TOKEN;

export const kv = url && token ? new Redis({ url, token }) : null;