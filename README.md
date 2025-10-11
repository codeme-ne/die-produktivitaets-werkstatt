# AI Course Platform

Deutsche Kurs-Landing mit Stripe-Checkout, Cookie-basiertem Kurszugang und MDX-Lessons.

## Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp .env.local.example .env.local

# Fill in your values:
# - STRIPE_SECRET_KEY (from https://dashboard.stripe.com/apikeys)
# - STRIPE_WEBHOOK_SECRET (create webhook endpoint)
# - RESEND_API_KEY (from https://resend.com/api-keys)
# - JWT_SECRET (generate with: openssl rand -base64 32)
```

### 2. Stripe Configuration

Create a **Price** with **Lookup Key**: `ai_course_eur` in your [Stripe Dashboard](https://dashboard.stripe.com/products).

```
Product: AI Course
Price: €97 (one-time)
Lookup Key: ai_course_eur
```

### 3. Run Dev Server

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Architecture

**No NextAuth. No MongoDB.**

### Stack
- Next.js 15 + App Router
- TypeScript 5.9
- TailwindCSS 4 + DaisyUI 5
- Stripe (one-time payments)
- Resend (emails)
- JWT (course access via HTTP-only cookie)

### Flow

```
Landing (/) → Checkout → Success → Email (Magic Link) → /course → Lessons
```

1. User visits `/`, clicks "Jetzt einschreiben"
2. User checks legal boxes, clicks "Jetzt kaufen"
3. Stripe Checkout opens, user pays
4. Webhook receives `checkout.session.completed`
5. Email sent with magic link to `/checkout/success?session_id=...`
6. Success page sets JWT cookie
7. User accesses `/course` (middleware checks cookie)
8. User can view all lessons in `content/lessons/`

### Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing (Hero, Curriculum, Pricing, FAQ) |
| `app/api/stripe/create-checkout/route.ts` | Creates Stripe session |
| `app/api/webhook/stripe/route.ts` | Handles payments, sends email |
| `app/checkout/success/page.tsx` | Sets JWT cookie after payment |
| `middleware.ts` | Protects `/course/*` routes |
| `content/lessons/manifest.ts` | Course structure |
| `libs/jwt.ts` | JWT signing/verification |

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
