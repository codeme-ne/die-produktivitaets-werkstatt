Setup – Bunny.net Stream

TL;DR

- Erstelle in Bunny.net eine Video Library und notiere Library ID und AccessKey.
- Trage sie in `.env.local` ein: `BUNNY_STREAM_LIBRARY_ID`, `BUNNY_STREAM_ACCESS_KEY`.
- Videos erzeugen (Server/API), Upload via URL (ingest) oder per PUT Upload. Einbetten per iframe.

1. Environment

- `.env.local`
  - `BUNNY_STREAM_LIBRARY_ID=...`
  - `BUNNY_STREAM_ACCESS_KEY=...` (Library Access Key)

2. Endpunkte (Bunny Stream API)

- Base: `https://video.bunnycdn.com`
- Auth: Header `AccessKey: <your-library-access-key>`
- Create video (metadata):
  - `POST /library/{libraryId}/videos`
  - Body: `{ "title": "My Video", "collectionId": "optional" }`
- Upload binary (server-to-server):
  - `PUT /library/{libraryId}/videos/{videoId}`
  - Body: binary file (`Content-Type: application/octet-stream`)
- Ingest from external URL (server requests Bunny to fetch the file):
  - `POST /library/{libraryId}/videos/{videoId}/source`
  - Body: `{ "url": "https://example.com/video.mp4" }`

3. API Routen in diesem Projekt

- `POST app/api/bunny/videos` → erstellt ein Video (nur Metadaten), returns `{ guid, ... }`
- `GET  app/api/bunny/videos` → listet Videos (erste Seite)
- `POST app/api/bunny/videos/[id]/ingest` → fordert das Laden von externer URL an

4. Einbetten im Frontend

- Component: `components/VideoEmbed.tsx`
- Nutzung: `<VideoEmbed libraryId={process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID ?? "<id>"} videoId="<guid>" />`
- Embed-URL: `https://iframe.mediadelivery.net/embed/{libraryId}/{videoId}?autoplay=false&muted=false`

5. Beispiel: cURL (CLI)

```bash
# Create
curl -sS -X POST \
  -H "AccessKey: $BUNNY_STREAM_ACCESS_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Video"}' \
  https://video.bunnycdn.com/library/$BUNNY_STREAM_LIBRARY_ID/videos

# Upload (PUT file)
curl -sS -X PUT \
  -H "AccessKey: $BUNNY_STREAM_ACCESS_KEY" \
  -H "Content-Type: application/octet-stream" \
  --data-binary @./my-video.mp4 \
  https://video.bunnycdn.com/library/$BUNNY_STREAM_LIBRARY_ID/videos/$VIDEO_GUID

# Ingest from URL (server-side)
curl -sS -X POST \
  -H "AccessKey: $BUNNY_STREAM_ACCESS_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/video.mp4"}' \
  https://video.bunnycdn.com/library/$BUNNY_STREAM_LIBRARY_ID/videos/$VIDEO_GUID/source
```

6. Admin-Flow im Dashboard

Der einfachste Weg, Videos zu verwalten, ist über das Dashboard:

**Schritt 1: Admin-Zugang**

- Admin-Emails werden in `config.ts` unter `adminEmails` definiert
- Nur diese Emails sehen den "Videos (Admin)" Link im Dashboard
- Route: `/dashboard/admin/videos`

**Schritt 2: Video erstellen + Import**

- Formular: Titel + Source-URL (öffentlich erreichbare Video-URL)
- Button "Erstellen & Import starten" → erstellt Video-Metadaten + startet URL-Ingest
- GUID wird angezeigt, Import läuft im Hintergrund
- Nach 30-60 Sekunden: "Aktualisieren" klicken → Video erscheint mit Status "Bereit"

**Schritt 3: Embed-Snippet kopieren**

- In der Videos-Liste: "Embed kopieren" Button
- Snippet: `<VideoEmbed libraryId="..." videoId="..." />`
- Einfach in MDX-Lektionen oder andere Seiten einfügen

**Beispiel-Workflow:**

```
1. Dashboard → "Videos (Admin)"
2. Titel: "Lektion 1 - Intro"
   URL: https://example.com/intro.mp4
3. "Erstellen & Import starten" → GUID: abc-123
4. Warten (30-60s) → "Aktualisieren"
5. Video sichtbar → "Embed kopieren"
6. In content/lessons/01-intro.mdx einfügen
```

**Admin-Berechtigungen:**

- Server Actions in `app/dashboard/admin/videos/actions.ts` prüfen JWT + Admin-Status
- API-Routen (`/api/bunny/*`) sind ebenfalls geschützt
- Keine Client-Exposition von AccessKey

7. Hinweise

- Große Uploads nicht durch das Next.js‑Backend tunneln. Bevorzugt: „Ingest from URL" oder direkte PUT‑Uploads aus sicheren Servern/Jobs.
- Der Library „AccessKey" ist geheim → niemals clientseitig einsetzen oder ins Repo commiten.
- Embed ist öffentlich (GUID kennen) – für geschützt benötigst du Signatures/Policies von Bunny (optional, später nachrüstbar).
