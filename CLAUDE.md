# Claude Instructions for AI Course Platform

## Project Context

You are working with a German AI course platform built on Next.js 15 with simplified authentication via JWT cookies. This is NOT the ShipFast SaaS boilerplate – it's a focused course-selling platform without NextAuth or MongoDB.

## Architecture Overview

### Core Technologies

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5.9
- **Styling**: TailwindCSS 4 with DaisyUI 5
- **Database**: None (stateless; JWT-based access)
- **Authentication**: JWT stored in HTTP-only cookies
- **Payments**: Stripe (one-time checkout, lookup key: `ai_course_eur`)
- **Email**: Resend (magic links to success page)
- **Content**: MDX lessons in `content/lessons/`

### Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/logout/        # Clears JWT cookie
│   │   ├── stripe/
│   │   │   └── create-checkout/ # Creates Stripe session
│   │   └── webhook/stripe/      # Handles payment webhooks
│   ├── checkout/success/        # Sets JWT cookie after payment (route.ts)
│   ├── course/                  # Protected: requires JWT
│   │   ├── components.tsx      # MDX callout components (Tip, Warning, Note)
│   │   └── [slug]/             # Individual lesson pages
│   ├── dashboard/              # Protected: user progress dashboard
│   ├── impressum/              # German imprint
│   ├── widerruf/               # Revocation policy
│   ├── privacy-policy/         # GDPR privacy
│   ├── tos/                    # Terms of service
│   └── page.tsx               # Landing page
├── components/
│   ├── Header.tsx             # Course header (no auth)
│   ├── ButtonCheckout.tsx     # Legal checkboxes + checkout
│   ├── LayoutClient.tsx       # Client-side layout wrapper
│   ├── ProgressRing.tsx       # DaisyUI radial progress indicator
│   └── mdx.tsx                # MDX callouts + widgets
├── libs/
│   ├── jwt.ts                 # JWT sign/verify
│   ├── stripe.ts              # Stripe client
│   ├── pwCourse.ts            # CSV → course mapper
│   ├── pwProgress.ts          # File-based progress helpers
│   └── resend.ts              # Email sending utility
├── logs/
│   ├── events.ndjson          # Event log (POST /api/events)
│   └── progress.json          # Lesson completion store
├── emails/
│   ├── welcome.ts             # Welcome email after purchase
│   └── completion.ts          # Completion email at 100%
├── middleware.ts              # Protects /kurs routes
└── config.ts                  # Centralized config (no auth/stripe.plans)
```

## Key Differences from ShipFast

| ShipFast                | AI Course Platform   |
| ----------------------- | -------------------- |
| NextAuth v5             | JWT cookies          |
| MongoDB + Mongoose      | No database          |
| Multiple plans          | Single product (€97) |
| Recurring subscriptions | One-time payment     |
| Dashboard pages         | Course lessons (MDX) |

## Development Guidelines

### Authentication Flow

1. User completes Stripe checkout
2. Webhook fires `checkout.session.completed`
3. Email sent with magic link: `/checkout/success?session_id=...`
4. Success page verifies session with Stripe, sets JWT cookie
5. Middleware checks cookie on `/kurs/*` requests
6. Logout clears cookie via `/api/auth/logout`

**No user accounts. No password. No OAuth.**

### Middleware (`middleware.ts`)

- Protects `/kurs`, `/kurs/*`, `/dashboard`
- Verifies JWT from `access_token` cookie
- Redirects to `/` if missing/invalid

### Progress Tracking (`libs/pwProgress.ts`)

- Reads user-specific completion map from `logs/progress.json`
- Works with `/api/progress` (GET/POST) to toggle lesson status
- Dashboard combines data from `libs/pwCourse.ts` and this helper to compute stats/next lesson

### Stripe Integration

- **Checkout**: Uses Stripe Price lookup key `ai_course_eur`
- **Webhook**: Verifies signature, sends email on success
- **Email**: Contains magic link to `/checkout/success?session_id=...`

### Config (`config.ts`)

Removed fields from ShipFast:

- ❌ `stripe.plans` (single product, not in config)
- ❌ `auth` (no NextAuth)
- ❌ `aws` (not used)

Kept fields:

- ✅ `appName`, `appDescription`, `domainName`
- ✅ `resend` (email config)
- ✅ `colors` (theme)
- ✅ `crisp` (optional support chat)

### Component Development

- Use DaisyUI 5 classes (e.g., `btn`, `card`, `collapse`)
- All text in German
- No auth UI components (no ButtonSignin, no user menus)
- Simple header with links to `/#curriculum`, `/#pricing`, `/#faq`

### API Route Development

- No MongoDB connection needed
- Validate Stripe webhooks with `stripe.webhooks.constructEvent`
- Use `libs/jwt.ts` for signing/verifying tokens
- Return JSON with proper HTTP status codes

### Content Management

- Lessons defined in `content/lessons/manifest.ts`
- Each lesson exports MDX content
- Rendered in `/course/[slug]/page.tsx`
- No CMS, no admin panel – edit MDX directly

## Common Tasks

### Adding a New Lesson

1. Create `content/lessons/08-new-topic.mdx`
2. Add entry to `content/lessons/manifest.ts`:
   ```ts
   {
     order: 8,
     slug: '08-new-topic',
     title: 'New Topic Title',
     summary: 'Short description',
     module: () => import('./08-new-topic.mdx'),
   }
   ```
3. Lesson automatically appears in curriculum and course nav

### Updating Legal Pages

- Edit `app/impressum/page.tsx` (replace `[PLACEHOLDER]` text)
- Edit `app/widerruf/page.tsx` if policy changes
- Edit `app/privacy-policy/page.tsx` for privacy updates
- Edit `app/tos/page.tsx` for terms updates

### Changing Price

1. Update Stripe Price (keep lookup key `ai_course_eur`)
2. Update display price in `app/page.tsx` (Pricing section)
3. No config changes needed

### Testing Checkout Flow

1. Start dev server: `npm run dev`
2. Use Stripe test card: `4242 4242 4242 4242`
3. Use Stripe CLI for webhook testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
4. Check email delivery in Resend dashboard

## Security Considerations

- JWT secret must be strong (32+ bytes)
- Stripe webhook signature verification required
- HTTP-only cookies prevent XSS
- No sensitive data in JWT payload (only `sessionId`)
- Middleware prevents unauthorized course access

## Deployment Checklist

1. Set all env vars (Stripe keys, Resend key, JWT secret)
2. Create Stripe Price with lookup key `ai_course_eur`
3. Configure Stripe webhook endpoint
4. Update `config.ts` with production domain/emails
5. Fill in `app/impressum/page.tsx` with real company data
6. Test full flow in Stripe test mode
7. Switch to Stripe live mode

## Common Pitfalls

- ❌ Don't try to use NextAuth (not installed)
- ❌ Don't try to connect to MongoDB (not used)
- ❌ Don't reference `config.stripe.plans` (removed)
- ❌ Don't reference `config.auth` (removed)
- ❌ Don't skip Stripe webhook signature verification
- ✅ Always verify JWT before serving course content
- ✅ Use lookup key `ai_course_eur` in checkout creation
- ✅ Keep legal pages (impressum, widerruf) up to date

## Key Files Reference

- `middleware.ts` - Course and dashboard protection
- `libs/jwt.ts` - JWT utilities
- `libs/progress.ts` - Progress cookie management
- `app/api/webhook/stripe/route.ts` - Payment handling
- `app/checkout/success/route.ts` - Cookie setter (JWT + redirect)
- `app/dashboard/page.tsx` - User progress dashboard
- `app/actions.ts` - Server actions for progress
- `content/lessons/manifest.ts` - Course structure
- `components/ProgressRing.tsx` - Progress visualization
- `emails/completion.ts` - Completion email template
- `config.ts` - App configuration (simplified)

Remember: This is a focused course platform, not a full SaaS boilerplate. Keep it simple: one product, JWT-based access, MDX content, German legal compliance.
