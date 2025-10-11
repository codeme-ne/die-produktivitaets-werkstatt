### Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing (Hero, Curriculum, Pricing, FAQ) |
| `app/api/stripe/create-checkout/route.ts` | Creates Stripe session |
| `app/api/webhook/stripe/route.ts` | Handles payments, sends email |
| `app/checkout/success/route.ts` | Sets JWT cookie after payment |
| `app/dashboard/page.tsx` | User dashboard with progress tracking |
| `middleware.ts` | Protects `/course/*` and `/dashboard` routes |
| `content/lessons/manifest.ts` | Course structure |
| `libs/jwt.ts` | JWT signing/verification |
| `libs/progress.ts` | Progress tracking (cookie-based) |
| `components/ProgressRing.tsx` | DaisyUI radial progress component |
| `components/LessonsList.tsx` | Lesson list with completion status |

## Dashboard & Progress Tracking

### Cookie Structure

Progress is tracked via **`progress` cookie** (httpOnly):

```typescript
{
  completed: string[];        // Array of completed lesson slugs
  flags?: {
    notifiedComplete?: boolean; // Completion email sent flag
  };
}
```

**Limitations**: Cookie-based = device-specific (no multi-device sync).

### Server Actions

- `getProgress()` - Read current progress
- `completeLessonAction(slug)` - Mark lesson complete (sends completion email on 100%)
- `undoLessonAction(slug)` - Unmark lesson

### "Weiterlernen" Logic

- `getNextOpenLesson(completed: Set<string>)` returns first incomplete lesson
- Shows CTA on lesson pages when next lesson available
- Shows "Kurs abgeschlossen! 🎉" badge when all done

### Completion Email

When user completes final lesson:
- Idempotent check via `flags.notifiedComplete`
- Sends congratulations email once per device
- Includes link back to dashboard

### MDX Callout Components

Use in lesson MDX files:

```mdx
<Tip>Helpful hint for learners</Tip>
<Warning>Important warning or caveat</Warning>
<Note>Additional information</Note>
```

Import via `app/course/components.tsx`.

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
