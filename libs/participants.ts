import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { sql } from "@vercel/postgres";
import { DEFAULT_PRODUCT, type CourseProduct } from "@/types/products";

export type ParticipantStatus = "active" | "inactive" | "cancelled";

export interface Participant {
  email: string;
  productType: CourseProduct;
  stripeCustomerId?: string | null;
  status: ParticipantStatus;
  createdAt?: string;
  updatedAt?: string;
}

const FILE = join(process.cwd(), "logs", "participants.json");
const LOGS_DIR = dirname(FILE);
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
      CREATE TABLE IF NOT EXISTS participants (
        email TEXT PRIMARY KEY,
        product_type TEXT NOT NULL,
        stripe_customer_id TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
  } catch (error: unknown) {
    // Ignore "already exists" errors from concurrent creation
    const pgError = error as { code?: string };
    if (pgError.code !== '42P07') throw error;
  }
  dbInitialized = true;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function readFileStore(): Record<string, Participant> {
  try {
    const content = readFileSync(FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeFileStore(data: Record<string, Participant>) {
  ensureLogsDir();
  const tmp = `${FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  renameSync(tmp, FILE);
}

export async function upsertParticipant(input: {
  email: string;
  productType?: CourseProduct;
  stripeCustomerId?: string | null;
  status?: ParticipantStatus;
}): Promise<Participant> {
  if (requireDbInProd && !hasDb) {
    throw new Error("Teilnehmer-DB nicht konfiguriert (setze DATABASE_URL/POSTGRES_URL/VERCEL_POSTGRES_URL)");
  }

  const email = normalizeEmail(input.email);
  const productType = input.productType || DEFAULT_PRODUCT;
  const stripeCustomerId = input.stripeCustomerId || null;
  const status = input.status || "active";

  if (hasDb) {
    await ensureDb();
    const result = await sql`
      INSERT INTO participants (email, product_type, stripe_customer_id, status)
      VALUES (${email}, ${productType}, ${stripeCustomerId}, ${status})
      ON CONFLICT (email)
      DO UPDATE SET product_type = EXCLUDED.product_type,
        stripe_customer_id = EXCLUDED.stripe_customer_id,
        status = EXCLUDED.status,
        updated_at = NOW()
      RETURNING email, product_type, stripe_customer_id, status, created_at, updated_at;
    `;
    const row = result.rows[0];
    return {
      email: row.email,
      productType: row.product_type as CourseProduct,
      stripeCustomerId: row.stripe_customer_id,
      status: row.status as ParticipantStatus,
      createdAt: row.created_at?.toISOString?.() ?? undefined,
      updatedAt: row.updated_at?.toISOString?.() ?? undefined,
    };
  }

  const data = readFileStore();
  data[email] = {
    email,
    productType,
    stripeCustomerId,
    status,
    createdAt: data[email]?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeFileStore(data);

  return data[email];
}

export async function getParticipant(email: string): Promise<Participant | null> {
  const normalized = normalizeEmail(email);

  if (requireDbInProd && !hasDb) {
    throw new Error("Teilnehmer-DB nicht konfiguriert (setze DATABASE_URL/POSTGRES_URL/VERCEL_POSTGRES_URL)");
  }

  if (hasDb) {
    await ensureDb();
    const result =
      await sql`SELECT email, product_type, stripe_customer_id, status, created_at, updated_at FROM participants WHERE email = ${normalized}`;
    const row = result.rows[0];
    if (!row) return null;
    return {
      email: row.email,
      productType: row.product_type as CourseProduct,
      stripeCustomerId: row.stripe_customer_id,
      status: row.status as ParticipantStatus,
      createdAt: row.created_at?.toISOString?.() ?? undefined,
      updatedAt: row.updated_at?.toISOString?.() ?? undefined,
    };
  }

  const data = readFileStore();
  return data[normalized] || null;
}

export async function listParticipants(options?: {
  productType?: CourseProduct;
  status?: ParticipantStatus;
}): Promise<Participant[]> {
  if (requireDbInProd && !hasDb) {
    throw new Error("Teilnehmer-DB nicht konfiguriert (setze DATABASE_URL/POSTGRES_URL/VERCEL_POSTGRES_URL)");
  }

  const productType = options?.productType;
  const status = options?.status || "active";

  if (hasDb) {
    await ensureDb();
    const rows =
      await sql`SELECT email, product_type, stripe_customer_id, status, created_at, updated_at FROM participants WHERE status = ${status}`;
    return rows.rows
      .filter((row) => !productType || row.product_type === productType)
      .map((row) => ({
        email: row.email,
        productType: row.product_type as CourseProduct,
        stripeCustomerId: row.stripe_customer_id,
        status: row.status as ParticipantStatus,
        createdAt: row.created_at?.toISOString?.() ?? undefined,
        updatedAt: row.updated_at?.toISOString?.() ?? undefined,
      }));
  }

  const data = readFileStore();
  return Object.values(data).filter(
    (p) =>
      (!productType || p.productType === productType) &&
      (!status || p.status === status),
  );
}

export async function listActiveParticipants(productType?: CourseProduct) {
  return listParticipants({ productType, status: "active" });
}
