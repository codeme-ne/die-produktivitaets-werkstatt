# Task Completion Checklist

## After Code Changes

### 1. Type Check

```bash
# TypeScript compilation
npm run build
# Check for type errors in output
```

### 2. Lint

```bash
npm run lint
# Fix auto-fixable issues
npm run lint -- --fix
```

### 3. Test Locally

```bash
npm run dev
# Manual testing in browser:
# - /dashboard/videos (requires JWT)
# - /course/[slug] (requires JWT)
# - / (landing page)
```

### 4. Test Auth Flow (if auth-related)

- Dev login: `/dev/login?email=test@example.com&to=/dashboard`
- Verify JWT set: Check browser cookies
- Test protected routes: `/course/*`, `/dashboard`
- Test logout: `/api/auth/logout`

### 5. Test Stripe Integration (if payment-related)

```bash
# Start webhook listener
stripe listen --forward-to localhost:3000/api/webhook/stripe

# Use test card: 4242 4242 4242 4242
# Verify email sent via Resend dashboard
# Check JWT cookie set after success redirect
```

### 6. Before Committing

- [ ] No console.errors in browser
- [ ] No TypeScript errors (`npm run build`)
- [ ] All env vars documented in `.env.local.example`
- [ ] German UI text (no English placeholders)
- [ ] Legal pages updated if needed (`/impressum`, `/privacy-policy`)

### 7. Deployment

- [ ] Update `config.ts` for production domain
- [ ] Set production env vars in hosting platform
- [ ] Configure Stripe webhook for production URL
- [ ] Test with Stripe test mode first
- [ ] Switch to Stripe live mode

## Video-Related Tasks

- [ ] After adding videos: Run `npm run meta:gen`
- [ ] Verify CDN images load: Check `NEXT_PUBLIC_ASSETS_BASE_URL`
- [ ] Test video playback: Check Bunny Stream library ID
