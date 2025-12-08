# Plan: Kurs UI Bug Fixes & Content-Formatierung

## Zusammenfassung

8 UI-Probleme auf den Kursseiten (`/kurs/*`) beheben + Content-Formatierung für 79 Lektionen.

**Status**: 8 von 8 Code-Bugs erledigt ✅ (Phase 1 abgeschlossen)

---

## Teil 1: Code/CSS Bugs

### Bug 1: Sidebar reicht nicht bis unten ✅ ERLEDIGT

**Problem**: Die linke Navigation im Kursbereich füllt nicht die volle Höhe aus.

**Lösung**: Drawer-Container und CourseSidebar Höhen-Klassen angepasst.

**Dateien**:
- `app/kurs/CourseLayoutClient.tsx`
- `components/course/CourseSidebar.tsx`

---

### Bug 2: Lange Video-Beschreibungen sehen komisch aus ✅ ERLEDIGT

**Problem**: Bei langen Beschreibungen unter dem Video ist das Layout unschön.

**Ursache**: `VideoBody.tsx` hat keine Breitenbegrenzung, die Card dehnt sich zu weit aus.

**Lösung**: Max-Width auf `max-w-prose` gesetzt mit `mx-auto` für Zentrierung.

**Dateien**:
- `components/course/VideoBody.tsx`

---

### Bug 3: UserMenu (Teilnehmer-Button) Probleme ✅ ERLEDIGT

**3a, 3b, 3c**: Alle drei Probleme behoben (Zuklappen, Transparenz, Rundung).

**Dateien**:
- `components/course/UserMenu.tsx`

---

### Bug 4a: RichText CSS verbessern (Absätze, Bullets) ✅ ERLEDIGT

**Problem**:
1. Text ist oft in einer Wurst ohne Absätze
2. Bulletpoints sind zu weit links und nicht vertikal korrekt ausgerichtet

**Lösung**: Listen-Einrückung auf `pl-6` gesetzt, Absatz-Abstände auf `space-y-6` erhöht, Listen-Items mit `pl-2` für bessere Ausrichtung.

**Dateien**:
- `components/RichText.tsx`

---

### Bug 5: Videos vergrössern + Layout-Redesign ✅ ERLEDIGT

**Problem**: Die Kursvideos sollen grösser dargestellt werden.

**Entscheidung aus Brainstorming-Session**:
- **Layout Option B gewählt**: Video gross + Text darunter (nicht daneben)
- **Action-Buttons**: Direkt unter dem Video, NICHT sticky am unteren Rand
- **Button-Text**: "Erledigt" statt "Als erledigt markieren"
- **Button-Layout**: Kompakt zentriert: `← Zurück    [✓ Erledigt]    Weiter →`

**Lösung**: Container auf `max-w-6xl` erweitert, `sticky bottom-0` entfernt, Button-Text zu "Erledigt" gekürzt, Layout kompakter mit `py-3 px-4 gap-2`.

**Dateien**:
- `app/kurs/[module]/[video]/page.tsx`
- `components/course/LessonActions.tsx`

---

### Bug 6: Dark Mode lila Buttons ✅ ERLEDIGT

**Problem**: Im Dark Mode erscheinen Buttons in lila statt in den Werkstatt-Farben.

**Lösung**: Dark Theme Variablen in `globals.css` korrigiert.

**Dateien**:
- `app/globals.css`

---

### Bug 7: Goldene Buttons zu grell beim Hover ✅ ERLEDIGT

**Problem**: Die goldenen/honey Buttons sind zu grell wenn man darüber hovert.

**Lösung**: `.btn-primary:hover` Farbe gedämpft.

**Dateien**:
- `app/globals.css`

---

### Bug 8: Fortschritts-Tracking nicht sichtbar im hellen Theme ✅ ERLEDIGT

**Problem**: Die Fortschrittsanzeige (Progress Bar) ist im hellen/werkstatt Theme nicht sichtbar.

**Lösung**: Kontrast im `werkstatt` Theme erhöht.

**Dateien**:
- `app/globals.css`

---

## NEU: Design-Verbesserungen (aus Brainstorming)

### Bug 9: Karten-Umrandungen im Light Theme ✅ ERLEDIGT

**Problem**: Im Dark Theme sind Karten-Umrandungen (Borders) sichtbar und sehen gut aus. Im Light Theme (werkstatt) fehlen diese oder sind zu schwach.

**Lösung**: Card-Borders in `globals.css` verstärkt (opacity 0.5 → 0.7) und explizite Border-Klasse `border border-base-300` direkt auf VideoBody Card angewendet für zuverlässige Darstellung.

**Dateien**:
- `app/globals.css`
- `components/course/VideoBody.tsx`

---

## Teil 2: Content-Formatierung

### Übersicht

- **79 Lesson-Dateien** in `content/lessons/modul-01` bis `modul-12`
- **~20 Dateien** mit veralteten Kursreferenzen (Februar/März, "Circle", "12 Wochen")
- **Viele Dateien** mit schlechter Formatierung (Text in einer Wurst)

### Bekannte Probleme im Content

1. **Keine Absätze**: Text ist in langen Blöcken ohne Zeilenumbrüche
2. **Listen als Text**: Bullet-Points als `-` im Fliesstext statt als Markdown-Liste
3. **Veraltete Referenzen**:
   - "12 Wochen" → Selbstlernkurs (kein Zeitrahmen)
   - "Circle" Community → Selbstlernkurs (keine Community)
   - "Februar/März/April/Mai" Daten → Zeitunabhängig
   - "Woche X" Referenzen → "Modul X" oder neutral

### Workflow: Modul für Modul

**Für jedes Modul (1-12):**
1. Alle Lektionen des Moduls anzeigen
2. Problematische Dateien identifizieren
3. Formatierung verbessern:
   - Absätze einfügen
   - Listen korrekt formatieren
   - Text kürzen (aber verständlich halten für Nicht-Video-Schauer)
4. Kursreferenzen aktualisieren
5. Review durch User
6. **Aus Feedback lernen für nächstes Modul**

### Content-Richtlinien

**Textlänge**:
- Kurz und prägnant, ABER verständlich für Teilnehmer die das Video nicht schauen
- Kernpunkte behalten, Füllwörter streichen
- Ca. 150-300 Wörter pro Lektion als Richtwert

**Formatierung**:
- Klare Absätze (Leerzeile zwischen Abschnitten)
- Echte Markdown-Listen (`- ` oder `1. `)
- Fettdruck für wichtige Begriffe
- Überschriften wo sinnvoll (## oder ###)

**Kursreferenzen anpassen**:
- ❌ "In den kommenden 12 Wochen..."
- ✅ "In diesem Kurs..." oder "Im Laufe dieses Programms..."
- ❌ "Teile auf Circle"
- ✅ "Notiere dir..." oder weglassen
- ❌ "Experiment Woche 3"
- ✅ "Experiment für dieses Modul"

---

## Reihenfolge der Umsetzung

### Phase 1: Code-Bugs

| # | Bug | Status | Priorität |
|---|-----|--------|-----------|
| 1 | Sidebar Höhe | ✅ Erledigt | - |
| 2 | VideoBody Layout | ✅ Erledigt | - |
| 3 | UserMenu | ✅ Erledigt | - |
| 4a | RichText CSS | ✅ Erledigt | - |
| 5 | Video Grösse + Layout Redesign | ✅ Erledigt | - |
| 6 | Dark Mode Buttons | ✅ Erledigt | - |
| 7 | Hover Farben | ✅ Erledigt | - |
| 8 | Progress Bar | ✅ Erledigt | - |
| 9 | Karten-Umrandungen Light Theme | ✅ Erledigt | - |

### Phase 1 abgeschlossen ✅

Alle 9 Code-Bugs wurden behoben.

### Phase 2: Content (Modul für Modul)
1. Modul 1 (7 Lektionen) → Review → Feedback einarbeiten
2. Modul 2 (8 Lektionen) → Review
3. Modul 3-12 → Iterativ mit gelernten Verbesserungen

---

## Dateien mit veralteten Kursreferenzen (gefunden via Grep)

```
content/lessons/modul-01/willkommen-in-der-produktivitaets-werkstatt.md
content/lessons/modul-09/das-selbst-hirn-herz-und-koerper.md
content/lessons/modul-09/experiment-woche-9-anti-prokrastinations-protokoll-kernbereich-optimierung.md
content/lessons/modul-09/herz-das-anti-prokrastinations-protokoll.md
content/lessons/modul-10/fake-aktivitaeten.md
content/lessons/modul-10/reflexion-das-innere-spiel-der-produktivitaet.md
content/lessons/modul-11/einladung-zur-co-working-session.md
content/lessons/modul-12/m12.md
content/lessons/modul-12/lps-party-badge-verfuegbar.md
... (+ weitere in docs/ Ordner)
```

---

## Beispiel: Vorher/Nachher

### Vorher (willkommen.md, Zeile 9):
```
Meine Mission für dich - Messbare Verdopplung deiner Produktivität: Keine leeren Versprechen – mit dem "Produktivitäts-Katalysator" messen wir deinen Fortschritt von Anfang an. - Ein lebendiges System: Hier erwartet dich kein starres Konzept, sondern ein flexibles Framework, das sich an deine Bedürfnisse anpasst und mit dir wächst. - Wissenschaft trifft Praxis: In über zehn Jahren habe ich die effektivsten Methoden aus Forschung, Coaching und eigener Erfahrung zu einem ganzheitlichen Ansatz vereint.
```

### Nachher:
```markdown
**Meine Mission für dich:**

- **Messbare Verdopplung deiner Produktivität** – Mit dem "Produktivitäts-Katalysator" messen wir deinen Fortschritt von Anfang an.
- **Ein lebendiges System** – Kein starres Konzept, sondern ein flexibles Framework, das sich an deine Bedürfnisse anpasst.
- **Wissenschaft trifft Praxis** – Die effektivsten Methoden aus über zehn Jahren Forschung, Coaching und Erfahrung.
```
