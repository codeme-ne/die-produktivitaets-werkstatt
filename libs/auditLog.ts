import { sql } from "@vercel/postgres";

export interface AuditLogEntry {
  id: number;
  type: string;
  actor: string | null;
  data: Record<string, unknown>;
  createdAt: string;
}

const hasDb =
  !!process.env.DATABASE_URL ||
  !!process.env.POSTGRES_URL ||
  !!process.env.VERCEL_POSTGRES_URL;
const isProd = process.env.NODE_ENV === "production";
const requireDbInProd = isProd;

let dbInitialized = false;

async function ensureDb() {
  if (!hasDb) {
    if (requireDbInProd) {
      throw new Error("Audit-DB nicht konfiguriert (setze DATABASE_URL/POSTGRES_URL/VERCEL_POSTGRES_URL)");
    }
    // Dev/no-DB: operate as no-op
    return;
  }
  if (dbInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id BIGSERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      actor TEXT,
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  dbInitialized = true;
}

export async function appendAuditLog(entry: {
  type: string;
  actor?: string | null;
  data?: Record<string, unknown>;
}): Promise<void> {
  await ensureDb();
  if (!hasDb) {
    console.warn("Audit log skipped (kein DB-Backend)", entry);
    return;
  }
  const payload = entry.data || {};
  await sql`
    INSERT INTO audit_logs (type, actor, data)
    VALUES (${entry.type}, ${entry.actor || null}, ${payload as any});
  `;
}

export async function listAuditLogs(limit = 200): Promise<AuditLogEntry[]> {
  await ensureDb();
  if (!hasDb) return [];
  const capped = Math.min(Math.max(limit, 1), 500);
  const result = await sql`
    SELECT id, type, actor, data, created_at
    FROM audit_logs
    ORDER BY created_at DESC
    LIMIT ${capped};
  `;
  return result.rows.map((row) => ({
    id: Number(row.id),
    type: row.type,
    actor: row.actor,
    data: row.data || {},
    createdAt: row.created_at?.toISOString?.() ?? new Date().toISOString(),
  }));
}
