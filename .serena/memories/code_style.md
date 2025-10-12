# Code Style & Conventions

## TypeScript

- **Strict Mode**: Enabled in `tsconfig.json`
- **Type Safety**: Prefer explicit types, avoid `any`
- **Imports**: Use `@/` alias for absolute imports from root
- **Server/Client**: Mark client components with `"use client"`

## File Organization

- **API Routes**: `app/api/[feature]/route.ts`
- **Server Actions**: `app/actions.ts` or co-located
- **Components**: `components/[Name].tsx` (PascalCase)
- **Libraries**: `libs/[feature].ts` (lowercase)
- **Types**: `types/[feature].ts`

## Naming Conventions

- **Components**: PascalCase (`VideoEmbed.tsx`)
- **Functions**: camelCase (`getProgress()`)
- **Server Actions**: suffixed with `Action` (`completeLessonAction`)
- **API routes**: lowercase folders (`/api/bunny/videos/route.ts`)

## Styling

- **Framework**: TailwindCSS 4 utility classes
- **Components**: DaisyUI 5 (btn, card, alert, collapse, etc.)
- **Language**: All UI text in German
- **Theme**: Configured in `config.ts` colors section

## Error Handling

- **API Routes**: Return JSON with proper HTTP status codes
- **Server Actions**: Throw errors for client to catch
- **Validation**: Use Zod schemas where appropriate
- **Logging**: Console.log/error for debugging (no external logger)

## Security

- **Cookies**: HTTP-only, secure in production
- **JWT**: No sensitive data in payload (only `sessionId`, `email`, `cid`)
- **Stripe**: Always verify webhook signatures
- **Secrets**: Never commit to git, use `.env.local`
