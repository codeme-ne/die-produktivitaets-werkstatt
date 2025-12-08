# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Die Produktivitäts-Werkstatt** - A German 12-week video course platform for productivity training. CSV-based course content, JWT authentication via Stripe payments, Bunny.net video hosting.

## Development Commands

```bash
npm run dev              # Start development server (localhost:3000)
npm run build            # Production build
npm run lint             # ESLint
npm run videos:sync-meta # Fetch video metadata from Bunny.net
npm run transcripts:generate -- --guid=<bunny-video-guid> --language=de
npm run content:validate # Validate lesson content
npm run sync-csv         # Sync CSV to markdown files
```

**Dev Login** (bypasses Stripe): `/dev/login?email=you@example.com&to=/dashboard`

**Stripe Webhook Testing**:
```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

## Architecture

### Tech Stack
- Next.js 15 (App Router), React 19, TypeScript 5.9
- TailwindCSS 4 + DaisyUI 5
- **No database** - File-based storage (logs/progress.json)
- JWT in HTTP-only cookies (no NextAuth, no user accounts)
- Stripe one-time payment, Resend emails, Bunny.net videos

### Authentication Flow

1. User purchases via Stripe → webhook fires `checkout.session.completed`
2. Email sent with magic link to `/checkout/success?session_id=...`
3. Success page verifies with Stripe, sets JWT cookie (`access_token`)
4. `middleware.ts` protects `/kurs/*` and `/dashboard/admin/*` routes
5. Logout clears cookie via `/api/auth/logout`

**No passwords, no OAuth, no user accounts.**

### Course Data Flow

```
CSV (docs/*.csv) → libs/pwCsv.ts → libs/pwCourse.ts → Course object (cached in memory)
                                                    ↓
                                    app/kurs/[module]/[video]/page.tsx
```

**CSV Structure**: `Dateiname` format is `PW_W<modul>_L<lektion>_<name>` (e.g., `PW_W01_L02_Mindset`)

### Key Patterns

**Progress Tracking** (`libs/pwProgress.ts`):
- Stored in `logs/progress.json` keyed by user email
- API: `GET/POST /api/progress`
- Device-specific (no cross-device sync)

**Video Embedding** (`libs/bunnyStream.ts`, `libs/videoEmbed.ts`):
- Videos hosted on Bunny.net Stream (Library ID: 457384)
- Embed URLs: `https://iframe.mediadelivery.net/embed/<library>/<guid>`
- Video metadata in `content/video-meta.json`

**Admin Access**:
- Add email to `config.ts` → `adminEmails` array
- Admin UI: `/dashboard/admin/videos`
- Check with: `GET /api/debug/whoami`

### Route Structure

```
/                           Landing page (Hero, Curriculum, Pricing, FAQ)
/kurs                       Course overview (12 modules)
/kurs/modul-01              Module index (lessons list)
/kurs/modul-01/willkommen   Lesson page (video + description)
/dashboard                  User progress dashboard
/dashboard/admin/videos     Admin video management
```

### Critical Files

| File | Purpose |
|------|---------|
| `middleware.ts` | JWT protection for /kurs/* routes |
| `libs/jwt.ts` | Sign/verify JWT tokens |
| `libs/pwCourse.ts` | CSV → Course data mapper |
| `libs/pwProgress.ts` | File-based progress helpers |
| `app/api/webhook/stripe/route.ts` | Payment webhook handler |
| `app/checkout/success/route.ts` | Sets JWT after payment |
| `config.ts` | App config (adminEmails, domain, etc.) |

### Environment Variables

Required in `.env.local`:
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` - Payment processing
- `RESEND_API_KEY` - Email delivery
- `JWT_SECRET` - Token signing (32+ bytes)
- `BUNNY_STREAM_LIBRARY_ID`, `BUNNY_STREAM_ACCESS_KEY` - Video hosting
- `NEXT_PUBLIC_ASSETS_BASE_URL` - CDN for images (https://pw-bunny.b-cdn.net)

## UI Components

**ALWAYS use DaisyUI components** for all UI work. This project uses DaisyUI 5 extensively.
- Use DaisyUI classes (`btn`, `card`, `alert`, `modal`, etc.) instead of custom styling
- Use DaisyUI color variables (`primary`, `secondary`, `accent`, `base-100`, etc.)
- Check DaisyUI docs for component patterns before building custom solutions

## Common Pitfalls

- This is **NOT** the ShipFast boilerplate - no NextAuth, no MongoDB
- Don't reference `config.stripe.plans` or `config.auth` (removed)
- Stripe uses lookup key `ai_course_eur` (not price IDs in config)
- Progress is file-based - restart server to see changes in `logs/progress.json`
- Course data is cached in memory - restart server after CSV edits
- All user-facing text must be in German
