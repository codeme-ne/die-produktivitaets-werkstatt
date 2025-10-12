# Project Overview: AI Course Platform (German)

## Purpose

German AI course platform for selling and delivering a single online course. Focused, simple architecture without traditional user accounts.

## Core Architecture

- **No Database**: Stateless, JWT cookie-based access
- **No Auth System**: No NextAuth, no OAuth, no passwords
- **Single Product**: One-time payment (€97) via Stripe
- **Content Delivery**: MDX lessons in `content/lessons/`
- **Progress Tracking**: Cookie-based (device-specific)

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5.9
- **Styling**: TailwindCSS 4 + DaisyUI 5
- **Payments**: Stripe (checkout.session.completed webhook)
- **Email**: Resend (magic links, completion emails)
- **Video**: Bunny Stream (optional video hosting)
- **Auth**: JWT in HTTP-only cookies

## Key Flows

1. **Purchase**: Stripe checkout → webhook → email with magic link → JWT cookie set
2. **Access**: Middleware checks JWT on `/course/*` and `/dashboard` routes
3. **Progress**: Server actions write to `progress` cookie (device-specific)
4. **Completion**: Auto-send congratulations email at 100%

## Not Included

- ❌ MongoDB/Database
- ❌ NextAuth
- ❌ Multi-plan subscriptions
- ❌ User accounts/profiles
- ❌ Social auth
