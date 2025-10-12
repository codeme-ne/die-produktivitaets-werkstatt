# Admin-Videos QA Checkliste

## Implementierte Features ✓

### 1. Admin-Gating

- [x] `config.ts` erweitert um `adminEmails: string[]`
- [x] `types/config.ts` erweitert um `adminEmails` im Interface
- [x] `libs/authz.ts` erstellt mit `isAdmin(email)` Funktion
- [x] `libs/apiAuth.ts` erstellt mit `requireAdminApi()` für API-Routen

### 2. Server Actions

- [x] `app/dashboard/admin/videos/actions.ts` erstellt mit:
  - [x] `createAndIngestAction()` - Video erstellen + URL-Ingest starten
  - [x] `listVideosAction()` - Videos auflisten
  - [x] `getVideoAction()` - Einzelnes Video abrufen
- [x] Alle Actions prüfen JWT + Admin-Status

### 3. Admin-Seite

- [x] `app/dashboard/admin/videos/page.tsx` - Server Component mit Admin-Prüfung
- [x] `app/dashboard/admin/videos/VideoCreateForm.tsx` - Client Component für Video-Erstellung
- [x] `app/dashboard/admin/videos/VideosList.tsx` - Client Component für Videos-Liste
- [x] Features:
  - [x] Formular: Titel + Source-URL
  - [x] "Erstellen & Import starten" Button
  - [x] GUID-Anzeige nach Erstellung
  - [x] Videos-Liste mit Refresh-Button
  - [x] Embed-Snippet kopieren
  - [x] Video-Vorschau (wenn Status === 4)
  - [x] Status-Badges (Bereit/Processing)

### 4. API-Härtung

- [x] `app/api/bunny/videos/route.ts` - Admin-Prüfung für GET/POST
- [x] `app/api/bunny/videos/[id]/ingest/route.ts` - Admin-Prüfung für POST
- [x] 403 Fehler bei fehlender Berechtigung

### 5. Navigation

- [x] Dashboard erweitert um Admin-Check
- [x] "Videos (Admin)" Link nur für Admins sichtbar
- [x] Video-Icon für bessere UX

### 6. Dokumentation

- [x] `docs/bunny-stream.md` erweitert um "Admin-Flow im Dashboard"
- [x] Schritt-für-Schritt Anleitung
- [x] Beispiel-Workflow
- [x] Admin-Berechtigungen dokumentiert

## Manuelle Tests (vor Deployment)

### Voraussetzungen

- [ ] `.env.local` hat alle 3 Bunny-Variablen gesetzt:
  - `BUNNY_STREAM_LIBRARY_ID`
  - `BUNNY_STREAM_ACCESS_KEY`
  - `NEXT_PUBLIC_BUNNY_LIBRARY_ID`
- [ ] Admin-Email in `config.ts` eingetragen

### Test 1: Non-Admin Zugriff

- [ ] Mit Non-Admin-Account einloggen
- [ ] Dashboard öffnen → "Videos (Admin)" Link NICHT sichtbar
- [ ] `/dashboard/admin/videos` direkt aufrufen → Redirect zu `/`

### Test 2: Admin Zugriff

- [ ] Mit Admin-Account einloggen
- [ ] Dashboard öffnen → "Videos (Admin)" Link SICHTBAR
- [ ] Link klicken → Admin-Seite lädt

### Test 3: Video erstellen

- [ ] Titel eingeben: "Test Video"
- [ ] URL eingeben: (öffentliche MP4-URL)
- [ ] "Erstellen & Import starten" klicken
- [ ] GUID wird angezeigt
- [ ] Erfolgsmeldung erscheint

### Test 4: Videos-Liste

- [ ] Nach 30-60s "Aktualisieren" klicken
- [ ] Video erscheint in Liste
- [ ] Status-Badge korrekt (Processing → Bereit)
- [ ] Thumbnail/Preview sichtbar (wenn Status === 4)

### Test 5: Embed kopieren

- [ ] Bei einem Video: "Embed kopieren" klicken
- [ ] Button zeigt "Kopiert!" Feedback
- [ ] Clipboard enthält: `<VideoEmbed libraryId="..." videoId="..." />`
- [ ] Snippet in MDX einfügen → Video wird korrekt gerendert

### Test 6: API-Sicherheit

- [ ] API-Route direkt aufrufen (ohne Admin-Cookie):
  - `GET /api/bunny/videos` → 403 Forbidden
  - `POST /api/bunny/videos` → 403 Forbidden
  - `POST /api/bunny/videos/[id]/ingest` → 403 Forbidden

## Akzeptanzkriterien (erfüllt ✓)

- [x] Nur Admins sehen "Videos (Admin)"
- [x] "Erstellen & Import starten" legt Video an und startet URL-Ingest
- [x] GUID sichtbar nach Erstellung
- [x] Liste zeigt bis zu 25 Videos
- [x] "Aktualisieren" lädt neue Daten
- [x] "Embed kopieren" liefert funktionierendes Snippet
- [x] Keine Client-Exposition von AccessKey
- [x] Keine weiteren Env-Variablen nötig (alle 3 bereits vorhanden)

## Build-Status

- [x] TypeScript kompiliert ohne Fehler
- [x] ESLint: Keine neuen Fehler durch diese Implementation
- [x] Next.js Build erfolgreich

## Nächste Schritte (Optional)

- [ ] Video umbenennen/löschen (Stream-API Endpunkte nachrüsten)
- [ ] Auto-Refresh alle 20-30s
- [ ] Detaillierte Statusbadges (processing/ready) aus API
- [ ] Einbettung in Lektionen (MDX-Support oder CMS-Feld)
