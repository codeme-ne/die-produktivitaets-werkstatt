# Magic Link Login System

## Übersicht

Minimalistisches Login-System für die Produktivitäts-Werkstatt nach Marc Lou Vorbild.

## User Flow

```
Landing Page → [Anmelden] → /login (Email-Feld) → Magic Link per Email → Link klicken → Direkt in den Kurs
```

## Komponenten

### Neue Dateien

| Datei | Zweck |
|-------|-------|
| `app/login/page.tsx` | Login-Seite mit Email-Formular |
| `app/api/auth/magic-link/route.ts` | Prüft Email, sendet Magic Link |
| `app/auth/verify/route.ts` | Verifiziert Token, setzt JWT, leitet zum Kurs |
| `libs/magicToken.ts` | Token generieren/verifizieren (15min Ablauf) |
| `emails/magicLink.ts` | E-Mail Template für den Link |

### Bestehende Dateien (nutzen)

- `libs/participants.ts` - Email-Check ob Teilnehmer
- `libs/jwt.ts` - JWT signieren
- Resend für Email

## Datenspeicherung

Dual-Mode wie bestehende Architektur:

| Modus | Speicher |
|-------|----------|
| Development | `logs/magic-tokens.json` |
| Production | Vercel Postgres |

### DB Schema (Production)

```sql
CREATE TABLE magic_tokens (
  token TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE
);
```

## Login-Seite UI

Minimalistisch - nur Email-Feld:

```
┌─────────────────────────────────────────────┐
│                                             │
│        Produktivitäts-Werkstatt             │
│                                             │
│        ┌─────────────────────────┐          │
│        │ deine@email.de          │          │
│        └─────────────────────────┘          │
│        [ Anmelden →                ]        │
│                                             │
│        Noch kein Zugang? Hier kaufen        │
│                                             │
└─────────────────────────────────────────────┘
```

## Verhalten

### Email bekannt (Teilnehmer)
1. Magic Token generieren (crypto.randomUUID)
2. Token speichern mit 15min Ablauf
3. Email mit Link senden: `/auth/verify?token=xxx`
4. UI zeigt: "Wir haben dir einen Login-Link geschickt!"

### Email unbekannt
1. Kein Token generieren
2. UI zeigt: "Diese E-Mail hat keinen Zugang. [Jetzt Zugang sichern →]"

### Token-Verifizierung
1. Token aus URL lesen
2. Prüfen: existiert, nicht abgelaufen, nicht benutzt
3. Token als "benutzt" markieren
4. Participant aus DB laden
5. JWT signieren und Cookie setzen
6. Redirect zur nächsten offenen Lektion

## Sicherheit

- Tokens ablaufen nach 15 Minuten
- Tokens sind einmalig verwendbar
- Keine Email-Enumeration (unterschiedliche Fehlermeldungen sind OK für UX)
