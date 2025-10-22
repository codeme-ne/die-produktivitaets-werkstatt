### Key Files

| File                                      | Purpose                                      |
| ----------------------------------------- | -------------------------------------------- |
| `app/page.tsx`                            | Landing (Hero, Curriculum, Pricing, FAQ)     |
| `app/api/stripe/create-checkout/route.ts` | Creates Stripe session                       |
| `app/api/webhook/stripe/route.ts`         | Handles payments, sends email                |
| `app/checkout/success/route.ts`           | Sets JWT cookie after payment                |
| `app/dashboard/page.tsx`                  | User dashboard with progress tracking        |
| `middleware.ts`                           | Protects `/kurs/*` and `/dashboard` routes   |
| `components/mdx.tsx`                      | Shared MDX callouts/widgets                  |
| `libs/jwt.ts`                             | JWT signing/verification                     |
| `libs/pwCourse.ts`                        | CSV → course mapper                          |
| `libs/pwProgress.ts`                      | Progress reader helpers                      |

## Dashboard & Progress Tracking

- `libs/pwCourse.ts` loads the Produktivitäts-Werkstatt structure (modules + lessons) from CSV.
- `libs/pwProgress.ts` exposes `getProgressForUser` / `isLessonDone` to read file-based progress from `logs/progress.json`.
- `/api/progress` handles toggling lesson completion and returns the user-specific map.
- `app/dashboard/page.tsx` combines both sources to compute completion stats, the next open lesson, and module listings that link to `/kurs/<module>/<video>`.

### MDX Callout Components

Use in lesson MDX files:

```mdx
<Tip>Helpful hint for learners</Tip>
<Warning>Important warning or caveat</Warning>
<Note>Additional information</Note>
```

Import via `components/mdx.tsx`.

## Deployment Checklist

- [ ] Update `config.ts` (appName, domainName, emails)
- [ ] Fill `app/impressum/page.tsx` with your company details
- [ ] Create Stripe Price with lookup key `ai_course_eur`
- [ ] Configure Stripe webhook to `https://yourdomain.com/api/webhook/stripe`
- [ ] Set all env vars in production
- [ ] Test full purchase flow in Stripe test mode
- [ ] Switch to Stripe live mode

## Legal (DE)

German-language legal pages included:

- `/impressum` - Imprint (fill in your details)
- `/widerruf` - Revocation for digital content
- `/privacy-policy` - GDPR-compliant privacy policy
- `/tos` - Terms of service

## Support

For questions or issues, reach out at your configured support email (see `config.ts`).

## Codex Environment

To develop from your phone using ChatGPT Codex, see `docs/codex-env.md` for exact environment fields, commands, and recommended dev env vars. A helper is provided:

```
npm run setup:codex
npm run dev
```

## Bunny.net Stream (Videos)

1. Add to `.env.local`:

```
BUNNY_STREAM_LIBRARY_ID=your-library-id
BUNNY_STREAM_ACCESS_KEY=your-library-access-key
NEXT_PUBLIC_BUNNY_LIBRARY_ID=your-library-id
```

2. Upload from CLI (server-to-server):

```
npm run bunny:upload -- --title "My Video" --file ./path/to/video.mp4
```

3. API routes:

- `POST /api/bunny/videos` → create video metadata
- `GET /api/bunny/videos` → list videos
- `POST /api/bunny/videos/:id/ingest` → ingest from external URL

4. Embed in UI:

```
import VideoEmbed from "@/components/VideoEmbed";
<VideoEmbed libraryId={process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID!} videoId="<guid>" />
```

Details: see `docs/bunny-stream.md`.

## PW Course System (CSV-Based Video Courses)

A complete video course platform powered by a single CSV file.

### Architecture

**Data Source**: `docs/Google Sheets PW-Videobeschreibungen-2025-Transfer - Tabellenblatt1.csv`

**CSV Structure**:

- `Dateiname`: Format `PW_W<modul>_L<lektion>_<name>` (e.g., `PW_W01_L02_Mindset`)
- `Titel`: Lesson title (with optional emojis)
- `Videos`: Bunny.net play URL (format: `https://iframe.mediadelivery.net/play/<library>/<guid>`)
- `Beschreibung`: Full lesson description (Markdown-formatted text)
- `Links`: One or more resource URLs (separate columns)

**Key Features**:

- ✅ 12 modules (weeks) with 5-6 lessons each (~75 lessons total)
- ✅ Automatic slug generation (Umlaute → ae/oe/ue, lowercase, hyphenated)
- ✅ Video embed support (Bunny.net) with fallback for text-only lessons
- ✅ Server-side progress tracking (PoC file-based storage)
- ✅ Event tracking (NDJSON logs)
- ✅ Prev/Next navigation with cross-module support
- ✅ Responsive design with DaisyUI components

### Routes

```
/kurs                           → Course overview (12 modules)
/kurs/modul-01                  → Module index (list of lessons)
/kurs/modul-01/willkommen       → Lesson detail page
```

### File Structure

```
types/course.ts                 # TypeScript types (Course, Module, Lesson)
libs/slugs.ts                   # Slug generation utilities
libs/videoEmbed.ts              # Bunny.net embed URL helpers
libs/pwCsv.ts                   # CSV parser (UTF-8, quotes, commas)
libs/pwCourse.ts                # CSV → Course mapper (in-memory cache)
app/kurs/page.tsx               # Course overview
app/kurs/[module]/page.tsx      # Module index
app/kurs/[module]/[video]/page.tsx  # Video detail page
components/course/
  ├── VideoHero.tsx             # Video player or placeholder
  ├── VideoBody.tsx             # Description + resources
  ├── ModuleNav.tsx             # Lesson navigation sidebar
  └── MarkDoneButton.tsx        # Progress tracking button
app/api/progress/route.ts       # Progress API (GET/POST)
app/api/events/route.ts         # Event tracking API (POST)
logs/progress.json              # User progress storage
logs/events.ndjson              # Event log (NDJSON format)
```

### Progress Tracking (PoC)

**Storage**: `logs/progress.json`

```json
{
  "user@example.com": {
    "modul-01/willkommen": true,
    "modul-01/mindset": true
  }
}
```

**API**:

- `POST /api/progress` → `{ moduleSlug, videoSlug, done: true/false }` (accepts legacy `{ module, video }` payloads for backwards compatibility)
- `GET /api/progress` → `{ progress: { "modul-01/video": true, ... } }`

**Manual QA**:

- Lektion als erledigt markieren → Button färbt sich grün, Sidebar zeigt Häkchen, Header-Prozent steigt.
- Erledigt zurücknehmen → UI-Elemente wechseln zurück, Prozent sinkt entsprechend.
- Nächste Lektion vorhanden → Erfolgreiche Markierung leitet automatisch zur nächsten Lektion weiter.
- Letzte Lektion → Kein Auto-Redirect, Fortschritt bleibt gespeichert.
- Fehlerfall simulieren (`/api/progress` 400/500) → Optimistischer Status wird sauber zurückgerollt, Toast zeigt Fehlerhinweis.

**Auth**: Reads email from JWT `access_token` cookie (dev login available at `/dev/login`)

### Event Tracking (PoC)

**Storage**: `logs/events.ndjson` (newline-delimited JSON)

**Events**:

- `video_start` → User starts watching a video
- `cta_click` → User clicks a CTA button
- `mark_done` → User marks lesson as complete

**API**:

```bash
POST /api/events
{ "name": "mark_done", "moduleSlug": "modul-01", "videoSlug": "mindset", "meta": {} }
```

### Updating Course Content

1. **Edit the CSV**: Update `docs/Google Sheets PW-Videobeschreibungen-2025-Transfer - Tabellenblatt1.csv`
2. **Restart Dev Server**: Changes are cached in-memory; restart to reload
3. **Add Videos**: Upload to Bunny.net, paste play URL into CSV `Videos` column
4. **Module/Lesson Numbering**: Use `W<num>` for module, `L<num>` for lesson order

**Example Row**:

```csv
PW_W01_L03_Setup,🛠 Setup Your Workspace,https://iframe.mediadelivery.net/play/457384/<guid>,"This lesson covers...",https://example.com/resource
```

### Cache Management

The course data is cached in-memory after first load. To clear cache during development:

```typescript
import { clearCourseCache } from "@/libs/pwCourse";
clearCourseCache(); // Call this to force reload from CSV
```

### SEO & Metadata

All pages include:

- Dynamic `<title>` tags (e.g., "Lektion Titel | Modul X | Produktivitäts-Werkstatt")
- Meta descriptions (first 160 chars of lesson description)
- Breadcrumbs (Course → Module → Lesson)
- Canonical URLs (auto-generated from route)

### Production Considerations

**Current Implementation** (PoC):

- File-based storage (`logs/progress.json`, `logs/events.ndjson`)
- No rate limiting
- No database
- Device-specific progress (no cross-device sync)

**Production Upgrade Path**:

1. Replace file storage with database (e.g., PostgreSQL, MongoDB)
2. Add user accounts with proper authentication
3. Implement rate limiting on APIs
4. Add analytics dashboard for event data
5. Consider CDN for CSV (or migrate to CMS)

### Troubleshooting

**Issue**: CSV not loading

- **Fix**: Check file path in `libs/pwCsv.ts`, ensure UTF-8 encoding

**Issue**: Videos not displaying

- **Fix**: Verify Bunny.net URLs in CSV match format `https://iframe.mediadelivery.net/play/<library>/<guid>`

**Issue**: Progress not saving

- **Fix**: Ensure JWT cookie is set (use `/dev/login`), check `logs/` directory has write permissions

**Issue**: Slugs contain special characters

- **Fix**: Update `slugifyTitle()` in `libs/slugs.ts` to handle additional characters

## Dev Auth & Token Quickstart

- Dev Login Helper
  - Route: `/dev/login?email=you@example.com&cid=dev_cid&to=/dashboard`
  - Sets the `access_token` cookie without Stripe; redirects to `to`.
  - Enabled when `NODE_ENV !== production` or `NEXT_PUBLIC_DEV_MODE=1`.
- Check Current User
  - Route: `GET /api/debug/whoami`
  - Returns `{ authenticated, email, cid, admin }` for quick debugging.
- Admin Access
  - Add your email to `config.ts` → `adminEmails`.
  - Admin UI: `/dashboard/admin/videos` (create + ingest from URL, preview, copy embed).

Troubleshooting

- 403 on admin APIs or admin pages: ensure JWT is set (use `/dev/login`) and your email is in `adminEmails`.
- 500 when calling Bunny: verify `BUNNY_STREAM_LIBRARY_ID` and `BUNNY_STREAM_ACCESS_KEY` in `.env.local`.
- No video preview: processing may take time; click “Aktualisieren” in the Admin UI.

## Video Descriptions & Images (Bunny CDN)

Env

- `NEXT_PUBLIC_ASSETS_BASE_URL` → e.g. `https://pw-bunny.b-cdn.net`
- Optional `NEXT_PUBLIC_VIDEO_META_URL` → remote JSON with meta

Meta Source

- Local: `content/videos/meta.json` (GUID → { description, images, alt, links })
- Remote: Host the same JSON at `https://pw-bunny.b-cdn.net/videos/meta.json` and set env

Generate Meta Skeleton

- `npm run meta:gen` → creates/overwrites `content/videos/meta.json` by listing Bunny videos
- Heuristics: maps titles containing “Modul 01..12” to `modul-01..12`, otherwise sequential; “Linkedin” → `Linkedin-Posts-Landing`

Rendering

- Player: `components/VideoEmbed.tsx`
- Details below video: `components/VideoDetails.tsx` (description + image grid + links)
- Integration: `app/dashboard/videos/page.tsx`
