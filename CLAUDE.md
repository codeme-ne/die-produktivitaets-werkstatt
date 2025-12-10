# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Die Produktivitäts-Werkstatt" is a German-language video course platform built with Next.js 15 and React 19. It features Stripe payments, JWT authentication, file-based progress tracking (PoC), and Bunny.net video hosting.

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build + sitemap generation
npm run lint         # ESLint (Next.js + recommended rules)
npm run test         # Jest tests from __tests__/
```

### Content & Admin Scripts
```bash
npm run bunny:upload -- --title "Title" --file ./video.mp4  # Upload to Bunny CDN
npm run meta:gen                                             # Generate video metadata skeleton
npm run transcripts:generate -- --guid=<bunny-guid>         # Whisper transcript generation
npm run sync-csv                                             # Sync CSV course data to Markdown
npm run lesson:new                                           # Scaffold new lesson files
```

## Architecture

### Data Flow
CSV (`docs/Google Sheets PW-Videobeschreibungen-2025-Transfer - Tabellenblatt1.csv`) → `libs/pwCsv.ts` parses → `libs/pwCourse.ts` maps to TypeScript types → in-memory cache. Markdown files in `content/lessons/<module>/<lesson>.md` override CSV descriptions.

### Authentication
- JWT-based with `access_token` cookie (14-day expiration)
- `middleware.ts` protects `/kurs/*` and `/dashboard/admin/*`
- Dev login: `/dev/login?email=...&cid=...&to=...` (non-production only)
- Admin access: email whitelist in `config.ts` → `adminEmails`

### Key Directories
- `app/kurs/` - Course routes (module overview, lesson pages)
- `app/api/progress/` - Lesson completion tracking (file-based PoC: `logs/progress.json`)
- `app/api/stripe/`, `app/api/webhook/stripe/` - Payment processing
- `libs/` - Business logic (pwCourse, pwProgress, jwt, bunnyStream, releases, search)
- `components/course/` - VideoHero, ModuleNav, MarkDoneButton, etc.
- `content/` - Lesson markdown, transcripts, video metadata

### Course Structure
- 12 modules (weeks) × 5-6 lessons each
- CSV format: `PW_W<module>_L<lesson>_<name>` (e.g., `PW_W01_L02_Mindset`)
- Slugs: Umlaute converted (ä→ae, ö→oe, ü→ue), lowercase, hyphenated
- Routes: `/kurs`, `/kurs/modul-01`, `/kurs/modul-01/willkommen`

### Module Release Schedule
`libs/releases.ts` controls time-based module unlocking over 12 weeks with product-specific access rules.

## Code Style

- TypeScript with 2-space indentation
- PascalCase for components (`MyComponent.tsx`), camelCase for utilities
- Tailwind CSS + DaisyUI for all styling (custom theme "werkstatt" with honey #C9A227)
- MDX for lesson content with callout components: `<Tip>`, `<Warning>`, `<Note>`

## Testing

Tests in `__tests__/` using Jest. Key test files:
- `releases.test.ts` - Module release logic
- `nextOpenLesson.test.ts` - Lesson progression logic

## Environment Variables

Required in `.env.local`:
- `JWT_SECRET` - Token signing
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` - Payments
- `RESEND_API_KEY` - Email delivery
- `BUNNY_STREAM_LIBRARY_ID`, `BUNNY_STREAM_ACCESS_KEY` - Video hosting
- `NEXT_PUBLIC_ASSETS_BASE_URL` - CDN for images
- `WHISPER_COMMAND`, `WHISPER_LANGUAGE` - Transcript generation (optional)

## Important Notes

- Course data cached in-memory; restart dev server after CSV changes or call `clearCourseCache()` from `libs/pwCourse.ts`
- Progress storage is file-based PoC (`logs/progress.json`); production path documented in `scripts/migrate-progress-to-pg.ts`
- Stripe lookup key: `ai_course_eur`
