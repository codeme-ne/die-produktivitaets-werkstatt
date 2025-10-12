# Codex Environment Setup

This file lists the exact values to enter at `https://chatgpt.com/codex/settings/environments` so you can edit and run this Next.js app from your phone.

## Basics

- Name: `course-ai (Next.js)`
- Repository URL: `https://github.com/codeme-ne/course-ai.git`
- Branch: `main`
- Working directory: `/`
- Runtime: `Node.js 20 LTS`
- Shell: `bash`

## Commands

- Install: `npm ci`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`
- Tests: `echo "no tests yet"`

## Web Preview

- Preview port: `3000`
- Ensure `NEXT_PUBLIC_SITE_URL` is `http://localhost:3000` for dev preview.

## Environment Variables (dev)

Copy these into the Codex environment. They use safe dev/test placeholders and will let the app run locally; payment/email routes only work with real test keys.

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_URL=http://localhost:3000
RESEND_API_KEY=re_test_dummy
STRIPE_SECRET_KEY=sk_test_dummy
STRIPE_WEBHOOK_SECRET=whsec_dummy
# Generate a strong random value for dev:
JWT_SECRET=change-me-dev-secret
```

Tip: You can auto-generate a strong secret with our helper script (below) or any random string generator.

## One-time repo setup from Codex

In a Codex terminal, run:

```
npm run setup:codex
npm run dev
```

This will create `.env.local` (if missing) with sane dev defaults and a random `JWT_SECRET`.

## Optional: Git push from Codex

- Create a GitHub fine‑grained PAT with `Contents: Read and write` for this repo.
- Add it to the environment as `GITHUB_TOKEN` if you want Codex to push changes for you.

## Notes

- Build auto-runs `next-sitemap` via `postbuild`; no extra steps.
- Network must be enabled to run `npm ci` and any external calls (Stripe/Resend). You can still develop without hitting those routes.
- Project structure and coding guidelines are in `AGENTS.md`.

## Troubleshooting

- Port already in use: set `PORT=3001` and update `NEXT_PUBLIC_SITE_URL` accordingly.
- Missing env: compare your env with `.env.local.example`.
- Type errors: run `npm run lint` and `npm run build` to surface issues.
