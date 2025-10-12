# Suggested Commands

## Development

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build + sitemap
npm run start            # Start production server
npm run lint             # Run ESLint
```

## Video Management (Bunny Stream)

```bash
npm run bunny:upload -- --title "Video Title" --file ./video.mp4
npm run meta:gen         # Generate video metadata JSON from Bunny API
```

## Testing & Debugging

```bash
# Dev login (bypasses Stripe)
curl "http://localhost:3000/dev/login?email=test@example.com&to=/dashboard"

# Check auth status
curl http://localhost:3000/api/debug/whoami

# Stripe webhook testing
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

## Git Workflow

```bash
git status
git add .
git commit -m "feat: description"
git push
```

## Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Set required vars:
   - `JWT_SECRET` (32+ bytes)
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`
   - `BUNNY_STREAM_LIBRARY_ID`, `BUNNY_STREAM_ACCESS_KEY`

## Linux System Commands

- `ls -la` - List files with details
- `cat file.txt` - Display file contents
- `grep -r "pattern" .` - Search in files
- `find . -name "*.ts"` - Find files by pattern
