import { sql } from "@vercel/postgres";
import { classifySentiment } from "./sentiment";

export interface FeedbackEntry {
  id: number;
  email: string;
  moduleSlug: string | null;
  lessonSlug: string | null;
  rating: number | null;
  message: string;
  sentimentScore: number;
  sentimentLabel: "negative" | "neutral" | "positive";
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
      throw new Error("Feedback-DB nicht konfiguriert (setze DATABASE_URL/POSTGRES_URL/VERCEL_POSTGRES_URL)");
    }
    throw new Error("Feedback-DB nicht verfügbar (kein Postgres konfiguriert)");
  }
  if (dbInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      module_slug TEXT,
      lesson_slug TEXT,
      rating INTEGER,
      message TEXT NOT NULL,
      sentiment_score REAL NOT NULL DEFAULT 0,
      sentiment_label TEXT NOT NULL DEFAULT 'neutral',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  dbInitialized = true;
}

export async function submitFeedback(input: {
  email: string;
  moduleSlug?: string | null;
  lessonSlug?: string | null;
  rating?: number | null;
  message: string;
}): Promise<FeedbackEntry> {
  await ensureDb();

  const sentiment = await classifySentiment(input.message);
  const rating =
    typeof input.rating === "number" && input.rating >= 1 && input.rating <= 5
      ? input.rating
      : null;

  const result = await sql`
    INSERT INTO feedback (email, module_slug, lesson_slug, rating, message, sentiment_score, sentiment_label)
    VALUES (${input.email}, ${input.moduleSlug || null}, ${input.lessonSlug || null}, ${rating}, ${input.message}, ${sentiment.score}, ${sentiment.label})
    RETURNING id, email, module_slug, lesson_slug, rating, message, sentiment_score, sentiment_label, created_at;
  `;

  const row = result.rows[0];
  return {
    id: Number(row.id),
    email: row.email,
    moduleSlug: row.module_slug,
    lessonSlug: row.lesson_slug,
    rating: row.rating !== null ? Number(row.rating) : null,
    message: row.message,
    sentimentScore: Number(row.sentiment_score),
    sentimentLabel: row.sentiment_label as FeedbackEntry["sentimentLabel"],
    createdAt: row.created_at?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function listFeedback(options?: {
  limit?: number;
  moduleSlug?: string;
  lessonSlug?: string;
}): Promise<FeedbackEntry[]> {
  await ensureDb();
  const limit = options?.limit && options.limit > 0 ? Math.min(options.limit, 500) : 200;
  const filters = [];
  const params: any[] = [];

  if (options?.moduleSlug) {
    params.push(options.moduleSlug);
    filters.push(`module_slug = $${params.length}`);
  }
  if (options?.lessonSlug) {
    params.push(options.lessonSlug);
    filters.push(`lesson_slug = $${params.length}`);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const query = `
    SELECT id, email, module_slug, lesson_slug, rating, message, sentiment_score, sentiment_label, created_at
    FROM feedback
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ${limit};
  `;

  const result = await sql.query(query, params);
  return result.rows.map((row) => ({
    id: Number(row.id),
    email: row.email,
    moduleSlug: row.module_slug,
    lessonSlug: row.lesson_slug,
    rating: row.rating !== null ? Number(row.rating) : null,
    message: row.message,
    sentimentScore: Number(row.sentiment_score),
    sentimentLabel: row.sentiment_label as FeedbackEntry["sentimentLabel"],
    createdAt: row.created_at?.toISOString?.() ?? new Date().toISOString(),
  }));
}

export async function feedbackStats(): Promise<{
  count: number;
  avgRating: number | null;
  sentiments: Record<FeedbackEntry["sentimentLabel"], number>;
}> {
  await ensureDb();
  const stats = await sql`
    SELECT
      COUNT(*)::bigint AS count,
      AVG(rating)::numeric AS avg_rating,
      SUM(CASE WHEN sentiment_label = 'positive' THEN 1 ELSE 0 END)::bigint AS positive,
      SUM(CASE WHEN sentiment_label = 'neutral' THEN 1 ELSE 0 END)::bigint AS neutral,
      SUM(CASE WHEN sentiment_label = 'negative' THEN 1 ELSE 0 END)::bigint AS negative
    FROM feedback;
  `;
  const row = stats.rows[0];
  return {
    count: Number(row.count || 0),
    avgRating: row.avg_rating !== null ? Number(row.avg_rating) : null,
    sentiments: {
      positive: Number(row.positive || 0),
      neutral: Number(row.neutral || 0),
      negative: Number(row.negative || 0),
    },
  };
}
