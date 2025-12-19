import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { sql } from "@vercel/postgres";
import crypto from "crypto";

interface StoredToken {
  token: string;
  email: string;
  expiresAt: string;
  used: boolean;
}

const FILE = join(process.cwd(), "logs", "magic-tokens.json");
const LOGS_DIR = dirname(FILE);
const TOKEN_EXPIRY_MINUTES = 15;

const hasDb =
  !!process.env.DATABASE_URL ||
  !!process.env.POSTGRES_URL ||
  !!process.env.VERCEL_POSTGRES_URL;
const isProd = process.env.NODE_ENV === "production";
const requireDbInProd = isProd;

let dbInitialized = false;

function ensureLogsDir() {
  if (!existsSync(LOGS_DIR)) {
    mkdirSync(LOGS_DIR, { recursive: true });
  }
}

async function ensureDb() {
  if (!hasDb || dbInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS magic_tokens (
        token TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        used BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
  } catch (error: unknown) {
    // Ignore "already exists" errors from concurrent creation
    const pgError = error as { code?: string };
    if (pgError.code !== '42P07') throw error;
  }
  dbInitialized = true;
}

function readFileStore(): Record<string, StoredToken> {
  try {
    const content = readFileSync(FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeFileStore(data: Record<string, StoredToken>) {
  ensureLogsDir();
  const tmp = `${FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  renameSync(tmp, FILE);
}

function cleanExpiredTokens(data: Record<string, StoredToken>): Record<string, StoredToken> {
  const now = new Date();
  const cleaned: Record<string, StoredToken> = {};
  for (const [key, token] of Object.entries(data)) {
    if (new Date(token.expiresAt) > now && !token.used) {
      cleaned[key] = token;
    }
  }
  return cleaned;
}

export async function createMagicToken(email: string): Promise<string> {
  if (requireDbInProd && !hasDb) {
    throw new Error("Magic Token DB nicht konfiguriert");
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);
  const normalizedEmail = email.trim().toLowerCase();

  if (hasDb) {
    await ensureDb();
    // Delete any existing unused tokens for this email
    await sql`DELETE FROM magic_tokens WHERE email = ${normalizedEmail} AND used = FALSE`;
    await sql`
      INSERT INTO magic_tokens (token, email, expires_at, used)
      VALUES (${token}, ${normalizedEmail}, ${expiresAt.toISOString()}, FALSE)
    `;
  } else {
    let data = readFileStore();
    data = cleanExpiredTokens(data);
    // Remove existing tokens for this email
    for (const [key, stored] of Object.entries(data)) {
      if (stored.email === normalizedEmail) {
        delete data[key];
      }
    }
    data[token] = {
      token,
      email: normalizedEmail,
      expiresAt: expiresAt.toISOString(),
      used: false,
    };
    writeFileStore(data);
  }

  return token;
}

export interface VerifyResult {
  valid: boolean;
  email?: string;
  error?: "not_found" | "expired" | "already_used";
}

export async function verifyMagicToken(token: string): Promise<VerifyResult> {
  if (requireDbInProd && !hasDb) {
    throw new Error("Magic Token DB nicht konfiguriert");
  }

  if (hasDb) {
    await ensureDb();
    const result = await sql`
      SELECT email, expires_at, used FROM magic_tokens WHERE token = ${token}
    `;
    const row = result.rows[0];

    if (!row) {
      return { valid: false, error: "not_found" };
    }

    if (row.used) {
      return { valid: false, error: "already_used" };
    }

    if (new Date(row.expires_at) < new Date()) {
      return { valid: false, error: "expired" };
    }

    // Mark as used
    await sql`UPDATE magic_tokens SET used = TRUE WHERE token = ${token}`;

    return { valid: true, email: row.email };
  }

  // File-based
  let data = readFileStore();
  const stored = data[token];

  if (!stored) {
    return { valid: false, error: "not_found" };
  }

  if (stored.used) {
    return { valid: false, error: "already_used" };
  }

  if (new Date(stored.expiresAt) < new Date()) {
    return { valid: false, error: "expired" };
  }

  // Mark as used
  data[token].used = true;
  writeFileStore(data);

  return { valid: true, email: stored.email };
}
