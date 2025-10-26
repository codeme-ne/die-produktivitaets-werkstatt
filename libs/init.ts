import { z } from "zod";
import config from "../config";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  OPENAI_API_KEY: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_PRICE_ID_COURSE_EUR: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1),
  NEXT_PUBLIC_VIDEO_META_URL: z.string().url().optional(),
  NEXT_PUBLIC_ASSETS_BASE_URL: z.string().url().optional(),
  BUNNY_STREAM_ACCESS_KEY: z.string().min(1).optional(),
  BUNNY_STREAM_LIBRARY_ID: z.string().min(1).optional(),
});

type Env = z.infer<typeof envSchema>;

declare global {
  var __appInitialized: boolean | undefined;
}

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env);
  }
  return cachedEnv;
}

export function initApp(): void {
  if (globalThis.__appInitialized) return;
  getEnv();
  globalThis.__appInitialized = true;
}

export { config };
