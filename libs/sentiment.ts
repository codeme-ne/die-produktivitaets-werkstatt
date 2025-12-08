/*
  Sentiment analysis via OpenRouter (kostenloses Modell).
  - Requires OPENROUTER_API_KEY
  - Model configurable via OPENROUTER_MODEL_SENTIMENT (default: gryphe/mythomax-l2-13b:free)
  - Returns label (positive/neutral/negative) and score [-1, 1]
*/

export type SentimentLabel = "positive" | "neutral" | "negative";

export interface SentimentResult {
  score: number;
  label: SentimentLabel;
}

const DEFAULT_MODEL =
  process.env.OPENROUTER_MODEL_SENTIMENT || "gryphe/mythomax-l2-13b:free";

function requireApiKey(): string {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error("OPENROUTER_API_KEY fehlt (erforderlich für Sentiment)");
  }
  return key;
}

function normalizeScore(value: unknown): number {
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.max(-1, Math.min(1, num));
}

function normalizeLabel(value: unknown): SentimentLabel {
  if (value === "positive" || value === "neutral" || value === "negative") {
    return value;
  }
  return "neutral";
}

export async function classifySentiment(text: string): Promise<SentimentResult> {
  const apiKey = requireApiKey();
  const body = {
    model: DEFAULT_MODEL,
    messages: [
      {
        role: "system" as const,
        content:
          "Du bist ein strenger Sentiment-Klassifizierer für deutsches Feedback. Antworte nur als JSON-Objekt mit den Feldern label (positive|neutral|negative) und score (Zahl zwischen -1 und 1). Keine Erklärungen.",
      },
      { role: "user" as const, content: text.slice(0, 4000) },
    ],
    max_tokens: 60,
    temperature: 0,
    response_format: { type: "json_object" },
  };

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "PW Sentiment",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`Sentiment API fehlgeschlagen: ${response.status} ${msg}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("Sentiment API Antwort ungueltig");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Sentiment API lieferte kein JSON");
  }

  const label = normalizeLabel(parsed.label);
  const score = normalizeScore(parsed.score);

  return { label, score };
}
