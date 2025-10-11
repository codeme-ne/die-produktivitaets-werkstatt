# Repository Guidelines

## Project Structure & Module Organization
The Next.js 15 app router lives in `app/`, with route groups such as `app/dashboard` and API handlers in `app/api`. Shared UI lives in `components/`, while reusable business logic and helpers sit in `libs/`. Database schemas belong in `models/`, TypeScript contracts in `types/`, and project-level settings in `config.ts`. Static assets (logos, icons, sitemap outputs) reside in `public/`. When adding features, keep UI concerns in components, move cross-page utilities to `libs/`, and reflect new environment needs in both `config.ts` and docs.

## Build, Test, and Development Commands
- `npm run dev` — start the local Next.js server with Tailwind JIT.
- `npm run lint` — run Next.js ESLint rules; fix issues before committing.
- `npm run build` — compile the production bundle; catches type and config regressions.
- `npm run start` — serve the optimized build locally for smoke testing.

## Coding Style & Naming Conventions
Follow TypeScript throughout with 2-space indentation and trailing commas where ESLint inserts them. React components and files exporting a default component use PascalCase (`components/PricingTable.tsx`), hooks and helpers use camelCase. Co-locate styles in the component when possible, keeping global adjustments in `app/globals.css`. Rely on Tailwind 4 utilities and DaisyUI tokens for styling rather than bespoke CSS.

## Testing Guidelines
A formal test suite is not shipped yet; introduce targeted Jest/React Testing Library specs alongside the feature (`ComponentName.test.tsx` or `__tests__/`). Always run `npm run lint` and `npm run build` before opening a PR to surface build-time type issues. For feature work, add manual QA notes covering key user flows (e.g., dashboard onboarding, pricing forms).

## Commit & Pull Request Guidelines
Commits follow a lightweight conventional pattern from history: `<type>(optional scope): <imperative summary>` (e.g., `feat(auth): add invite flow`). Keep commits focused and include relevant screenshots for UI changes. PRs must describe the change, list testing performed, link issues or Linear tickets, and call out migrations or new environment variables.

## Environment & Configuration Tips
Store secrets in `.env.local`; never commit them. Update `config.ts` when adding public runtime config so new deploys stay aligned. Regenerate sitemaps with `npm run build` when URLs change, and document required third-party keys (Stripe, Resend, MongoDB) in the PR description.
