# Backend Notes (Aktueller Stand)

## 2025-12-08 01:18 CET – Releases & Produkt-Typen
- Zwei Produktvarianten eingeführt (`live`, `self-paced`); JWT + Checkout tragen `productType`, Preise über Stripe-Lookup (`pw_live_eur`, `pw_selfpaced_eur`) oder Env-Fallback.
- Teilnehmer-Store (`participants` Tabelle oder logs/participants.json) wird bei Checkout/Dev-Login gefüllt und speichert Produkt-Typ.
- Modul-Releases: DB/Fallback-Store, Admin-Seite `/dashboard/admin/releases` zum Planen (Datum/UTC), Sofort-Freigabe, optionales E-Mail-Template + Versand; Cron/API unter `/api/releases/run` (optional `CRON_SECRET`).
- Kurszugriff: Live-Kurse respektieren Release-Status (Sidebar mit 🔒, Module/Lektionen gesperrt bis freigegeben); Self-paced ignoriert Locks.
- Neues E-Mail-Template für Modul-Freigaben (`emails/moduleRelease.ts`), Versand an aktive Live-Teilnehmer, Link nutzt `NEXT_PUBLIC_SITE_URL`.

## Zuletzt umgesetzt
- Dev-Bypass in Checkout/Success/Dev-Login nur noch aktiv, wenn `NODE_ENV !== production` **und** `NEXT_PUBLIC_DEV_MODE === "1"`; JWT/Cookies auf 30 Tage reduziert (kein Prod-Bypass mehr).
- Progress-API: Rate-Limits (POST 60/min, GET 120/min) pro IP, Mutex + atomische Writes; optionaler Postgres-Backend (Vercel Postgres) mit Audit-Log (`progress_state`, `progress_log`), Fallback auf File.
- Events-API: Rate-Limit 120/min pro IP.
- Bunny-Admin: Library-ID-Fallback (`BUNNY_LIBRARY_ID`/`BUNNY_STREAM_LIBRARY_ID`/`NEXT_PUBLIC_BUNNY_LIBRARY_ID`).
- Typfix Theme-Toggle; ungenutzter Import entfernt.
- Neue Helpers: `libs/mutex.ts`, `libs/rateLimit.ts`, `libs/requestIp.ts`; Dependency `@vercel/postgres` hinzugefügt.
- Build/Lint durchgelaufen; DaisyUI-@property-Warnung bleibt.

## Offene To-Dos
- **Secrets rotieren**: Stripe/Resend/Bunny/JWT aus `.env.local` gelten als kompromittiert; nur über Secret-Store setzen. `NEXT_PUBLIC_SITE_URL` auf Live-Domain.
- **Progress-Migration**: Falls bestehende Fortschritte aus `logs/progress.json` benötigt werden, kleines Script schreiben und einmalig in Postgres importieren.
- **Prod-Policies**: Dev-Login in Prod deaktiviert lassen; `NEXT_PUBLIC_DEV_MODE` nicht setzen.
- **Alerting/Rate-Limit**: Rate-Limit für Progress/Events und Checkout/Webhook/Admin ist teilweise gesetzt; Alerts/Monitoring für Stripe/Resend-Fehler fehlen.
- **DB-Betrieb**: Bei Vercel Postgres: regelmäßige Backups/Monitoring prüfen (Hobby-Plan beachten).
 - **Bereinigung**: Alte Dev-Route entfernt (nur noch Page). TS-Variante von `fetch-video-meta` entfernt (nur MJS). Neues Migration-Script `npm run progress:migrate` zum Import aus `logs/progress.json`.

## Lokaler Admin/Dev
- Lokal mit `NEXT_PUBLIC_DEV_MODE=1` → `/dev/login?email=<admin>` (Admin in `config.ts`, jetzt inkl. `zangerl.luk@gmail.com`) für schnellen Zugriff ohne Stripe. Dev-Login ist jetzt eine Route (`app/dev/login/route.ts`) statt Page.
- Prod: regulärer Checkout oder separater Invite-Flow, kein Dev-Login.
- Teilnehmer-Ansicht testen: `NEXT_PUBLIC_DEV_MODE=1`, dann `/dev/login?email=teilnehmer@test.de` (E-Mail nicht in `adminEmails`) – leitet zur nächsten offenen Lektion und speichert Progress für diese E-Mail.

## Deployment-Hinweise (Vercel)
- Postgres-Env (`POSTGRES_URL`/`DATABASE_URL`/`VERCEL_POSTGRES_URL`) setzen, dann nutzt Progress-API automatisch die DB.
- `NEXT_PUBLIC_SITE_URL` auf die Produktionsdomain setzen, damit Magic-Link/Webhook-Links stimmen.
