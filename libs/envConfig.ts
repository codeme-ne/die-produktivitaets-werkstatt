export type EnvImportance = "required" | "recommended" | "optional" | "dev-only";

export type EnvScope = "server" | "client" | "script";

export interface EnvVarDefinition {
  key: string;
  label: string;
  description: string;
  importance: EnvImportance;
  scope: EnvScope;
  example?: string;
  note?: string;
}

export interface EnvGroupDefinition {
  id: string;
  title: string;
  description: string;
  items: EnvVarDefinition[];
}

export const ENV_GROUPS: EnvGroupDefinition[] = [
  {
    id: "core",
    title: "Pflicht (Produktion)",
    description: "Ohne diese Keys funktionieren Checkout, Login und E-Mails nicht.",
    items: [
      {
        key: "NEXT_PUBLIC_SITE_URL",
        label: "Live-Domain (https://...)",
        description: "Basis-URL fuer Links in E-Mails und Magic Links.",
        importance: "required",
        scope: "client",
        example: "https://deine-domain.de",
      },
      {
        key: "STRIPE_SECRET_KEY",
        label: "Stripe Secret Key (live)",
        description: "API-Key beginnend mit sk_live_ fuer den Checkout.",
        importance: "required",
        scope: "server",
        example: "sk_live_...",
      },
      {
        key: "STRIPE_WEBHOOK_SECRET",
        label: "Stripe Webhook Secret",
        description: "Signatur-Secret deines Stripe-Webhooks.",
        importance: "required",
        scope: "server",
        example: "whsec_...",
      },
      {
        key: "RESEND_API_KEY",
        label: "Resend API Key",
        description: "E-Mail-Versand fuer Magic Links und Updates.",
        importance: "required",
        scope: "server",
        example: "re_...",
      },
      {
        key: "JWT_SECRET",
        label: "JWT Secret",
        description: "Mindestens 32 Zeichen, signiert die Login-Cookies.",
        importance: "required",
        scope: "server",
        example: "min. 32 Zeichen",
      },
      {
        key: "BUNNY_STREAM_LIBRARY_ID",
        label: "Bunny Stream Library ID",
        description: "Stream-Library fuer alle Kursvideos.",
        importance: "required",
        scope: "server",
        example: "123456",
      },
      {
        key: "BUNNY_STREAM_ACCESS_KEY",
        label: "Bunny Stream Access Key",
        description: "API-Key fuer Uploads und Transkript-Jobs.",
        importance: "required",
        scope: "server",
        example: "********",
      },
      {
        key: "NEXT_PUBLIC_BUNNY_LIBRARY_ID",
        label: "Bunny Library ID (public)",
        description: "Gleiche ID wie oben, fuer den Video-Player im Frontend.",
        importance: "required",
        scope: "client",
        example: "123456",
      },
      {
        key: "NEXT_PUBLIC_ASSETS_BASE_URL",
        label: "CDN-Basis fuer Assets",
        description: "Empfohlen, z. B. Bunny CDN Bucket fuer Bilder/Transkripte.",
        importance: "recommended",
        scope: "client",
        example: "https://pw-bunny.b-cdn.net",
      },
      {
        key: "SITE_URL",
        label: "Sitemap Domain (Fallback)",
        description: "Wird nur fuer das Sitemap-Tool genutzt, falls NEXT_PUBLIC_SITE_URL fehlt.",
        importance: "optional",
        scope: "server",
        example: "https://deine-domain.de",
      },
    ],
  },
  {
    id: "payments",
    title: "Stripe Preise (Fallback)",
    description: "Nur noetig, falls die Stripe Lookup Keys pw_live_eur / pw_selfpaced_eur fehlen.",
    items: [
      {
        key: "STRIPE_PRICE_ID_LIVE_EUR",
        label: "Preis-ID Live",
        description: "Fallback-Preis fuer das Live-Produkt.",
        importance: "optional",
        scope: "server",
        example: "price_...",
      },
      {
        key: "STRIPE_PRICE_ID_SELF_EUR",
        label: "Preis-ID Self-paced",
        description: "Fallback-Preis fuer den Self-paced Kurs.",
        importance: "optional",
        scope: "server",
        example: "price_...",
      },
      {
        key: "STRIPE_PRICE_ID_COURSE_EUR",
        label: "Legacy Preis-ID",
        description: "Aelterer Fallback fuer Live (falls oben nicht gesetzt).",
        importance: "optional",
        scope: "server",
        example: "price_...",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Datenbank & Releases (optional)",
    description: "Nur setzen, wenn Progress-Tracking oder Cron-Schutz ueber Infrastruktur laufen soll.",
    items: [
      {
        key: "DATABASE_URL",
        label: "Database URL",
        description: "Postgres-Verbindung (Alternative zu POSTGRES_URL oder VERCEL_POSTGRES_URL).",
        importance: "optional",
        scope: "server",
        example: "postgres://...",
      },
      {
        key: "POSTGRES_URL",
        label: "Postgres URL (Vercel)",
        description: "Alternative Env fuer die Progress-API.",
        importance: "optional",
        scope: "server",
        example: "postgres://...",
      },
      {
        key: "VERCEL_POSTGRES_URL",
        label: "Vercel Postgres URL",
        description: "Weitere Alternative; setze nur eine der drei Postgres-Varianten.",
        importance: "optional",
        scope: "server",
        example: "postgres://...",
      },
      {
        key: "CRON_SECRET",
        label: "Cron Secret",
        description: "Optionaler Token-Schutz fuer /api/releases/run.",
        importance: "optional",
        scope: "server",
        example: "random-long-secret",
      },
    ],
  },
  {
    id: "ai",
    title: "AI, Transkripte & Video-Meta (optional)",
    description: "Nur relevant, wenn du GPT-Features oder Transkript-Generierung nutzt.",
    items: [
      {
        key: "OPENAI_API_KEY",
        label: "OpenAI API Key",
        description: "Nur fuer GPT-Automationen (nicht Sentiment).",
        importance: "optional",
        scope: "server",
        example: "sk-...",
      },
      {
        key: "OPENROUTER_API_KEY",
        label: "OpenRouter API Key",
        description: "Noetig fuer Sentiment/Feedback (kostenloses Modell).",
        importance: "recommended",
        scope: "server",
        example: "sk-or-v1-...",
      },
      {
        key: "OPENROUTER_MODEL_SENTIMENT",
        label: "OpenRouter Modell (Sentiment)",
        description: "Standard: gryphe/mythomax-l2-13b:free",
        importance: "optional",
        scope: "server",
        example: "gryphe/mythomax-l2-13b:free",
      },
      {
        key: "NEXT_PUBLIC_VIDEO_META_URL",
        label: "Externer Video-Meta Feed",
        description: "CDN-URL fuer content/video-meta.json (optional).",
        importance: "optional",
        scope: "client",
        example: "https://cdn.deine-domain.de/video-meta.json",
      },
      {
        key: "BUNNY_STREAM_API_KEY",
        label: "Bunny Stream API Key (alt)",
        description: "Fallback anstelle von BUNNY_STREAM_ACCESS_KEY.",
        importance: "optional",
        scope: "server",
        example: "********",
      },
      {
        key: "BUNNY_STREAM_TIMEOUT_MS",
        label: "Bunny Stream Timeout",
        description: "Timeout in Millisekunden fuer API Calls (Default 10000).",
        importance: "optional",
        scope: "server",
        example: "10000",
      },
      {
        key: "BUNNY_LIBRARY_ID",
        label: "Bunny Library ID (Fallback)",
        description: "Alternative Bezeichnung fuer die Stream-Library.",
        importance: "optional",
        scope: "server",
        example: "123456",
      },
      {
        key: "BUNNY_VIDEO_API_KEY",
        label: "Bunny Video API Key",
        description: "Nur fuer das Video-Metadaten-Script.",
        importance: "optional",
        scope: "server",
        example: "********",
      },
      {
        key: "WHISPER_COMMAND",
        label: "Whisper CLI",
        description: "z. B. whisper oder faster-whisper fuer Transkripte.",
        importance: "optional",
        scope: "script",
        example: "whisper",
      },
      {
        key: "WHISPER_EXTRA_ARGS",
        label: "Whisper Extra Args",
        description: "Optionale Flags, z. B. --model medium --device cuda.",
        importance: "optional",
        scope: "script",
        example: "--model medium",
      },
      {
        key: "WHISPER_LANGUAGE",
        label: "Whisper Sprache",
        description: "Sprache fuer Transkripte (Default de).",
        importance: "optional",
        scope: "script",
        example: "de",
      },
    ],
  },
  {
    id: "storage",
    title: "Storage & Uploads (CLI, optional)",
    description: "Nur fuer CLI-Uploads zu Bunny Storage oder die Import-Skripte.",
    items: [
      {
        key: "BUNNY_STORAGE_ZONE",
        label: "Bunny Storage Zone",
        description: "Storage-Zone fuer Assets.",
        importance: "optional",
        scope: "script",
        example: "pw-assets",
      },
      {
        key: "BUNNY_STORAGE_ACCESS_KEY",
        label: "Storage Access Key",
        description: "Zugriffsschluessel fuer Storage-Uploads.",
        importance: "optional",
        scope: "script",
        example: "********",
      },
      {
        key: "BUNNY_STORAGE_API_KEY",
        label: "Storage API Key",
        description: "Alternativer API-Key fuer Storage.",
        importance: "optional",
        scope: "script",
        example: "********",
      },
      {
        key: "BUNNY_STORAGE_HOSTNAME",
        label: "Storage Hostname",
        description: "Standard: storage.bunnycdn.com.",
        importance: "optional",
        scope: "script",
        example: "storage.bunnycdn.com",
      },
    ],
  },
  {
    id: "dev",
    title: "Debug/Dev (nicht in Produktion setzen)",
    description: "Nur lokal verwenden, sonst dev-login offen.",
    items: [
      {
        key: "NEXT_PUBLIC_DEV_MODE",
        label: "Dev Modus",
        description: "Aktiviert /dev/login; in Produktion leer lassen.",
        importance: "dev-only",
        scope: "client",
        example: "1",
      },
    ],
  },
];
