# Video Description Formatting Guide

## Übersicht

Video-Beschreibungen unterstützen jetzt **Markdown-Formatierung** mit erweiterten Styling-Optionen. Dieses Dokument erklärt, wie Sie Beschreibungen korrekt formatieren.

## Unterstützte Formate

### 1. Absätze

**Regel:** Leerzeile zwischen Absätzen verwenden.

```markdown
Erster Absatz mit wichtigen Informationen.

Zweiter Absatz mit weiteren Details.

Dritter Absatz mit Zusammenfassung.
```

**Ergebnis:** Jeder Absatz wird als separater `<p>`-Tag gerendert mit Abstand.

---

### 2. Fettdruck (Bold)

**Regel:** Text mit `**` umschließen.

```markdown
**Wichtig:** Dies ist eine wichtige Information.

**Definition:** Ein Begriff oder Konzept.

Text mit **mehreren** **fetten** Wörtern.
```

**Ergebnis:** Umschlossener Text wird fett dargestellt.

---

### 3. Kursiv (Italic)

**Regel:** Text mit `*` oder `_` umschließen.

```markdown
Dies ist _kursiver Text_ für Betonung.

Oder verwenden Sie _diese Variante_.
```

**Ergebnis:** Text wird kursiv dargestellt.

---

### 4. Unterstreichen

**Regel:** HTML-Tag `<u>` verwenden (sparsam einsetzen!).

```markdown
Dies ist <u>unterstrichener Text</u> für besondere Betonung.
```

**Wichtig:**

- Nur für kurze Textabschnitte verwenden
- Nicht für ganze Absätze
- Maximal 2-3 Mal pro Beschreibung

**Beispiele:**

✅ **Gut:**

```markdown
Der <u>wichtigste</u> Punkt ist Fokus.
```

❌ **Schlecht:**

```markdown
<u>Dieser ganze lange Absatz ist unterstrichen und schwer zu lesen.</u>
```

---

### 5. Listen

#### Ungeordnete Liste (Bullet Points)

**Regel:** Zeilen mit `-`, `*` oder `+` beginnen. Emojis sind erlaubt!

```markdown
- Erster Punkt
- Zweiter Punkt
- Dritter Punkt

Mit Emojis:

- 🎯 Ziel 1: Produktivität steigern
- 📊 Ziel 2: Workflows optimieren
- ✨ Ziel 3: Automatisierung
```

**Ergebnis:** Liste mit Bullet-Points wird gerendert.

#### Nummerierte Liste

**Regel:** Zeilen mit `1.`, `2.`, `3.` usw. beginnen.

```markdown
1. Erster Schritt
2. Zweiter Schritt
3. Dritter Schritt
4. Vierter Schritt
```

**Ergebnis:** Automatisch nummerierte Liste.

---

### 6. Überschriften

**Regel:** `##` für Hauptabschnitte, `###` für Unterabschnitte.

```markdown
## Was: Hauptthema

Beschreibung des Hauptthemas.

### Warum: Bedeutung

Erklärung der Bedeutung.

### Wie: Umsetzung

Schritt-für-Schritt-Anleitung.

## FAQ: Häufige Fragen

### Frage 1

Antwort...

### Frage 2

Antwort...
```

**Wichtig:**

- **Keine `#` (H1)** verwenden – reserviert für Seitentitel
- `##` (H2) für Hauptabschnitte (z.B. "Was", "Warum", "Wie")
- `###` (H3) für Unterabschnitte und FAQ-Einträge

---

### 7. Links

**Regel:** `[Text](URL)` Syntax verwenden.

```markdown
Mehr Informationen in der [offiziellen Dokumentation](https://docs.example.com).

Interner Link zum [Kurs](/kurs/modul-1).
```

**Automatische Sicherheit:**

- Externe Links öffnen automatisch in neuem Tab
- Alle Links erhalten `rel="noopener noreferrer"`
- Keine manuelle Konfiguration nötig

---

## Verbotene Elemente

❌ **Nicht erlaubt:**

```markdown
<div>, <span>, <section>    → Keine Layout-HTML-Tags
<script>, <iframe>          → Keine JavaScript/Embeds
style="..."                 → Keine Inline-Styles
class="..."                 → Keine CSS-Klassen
onclick="..."               → Keine Event-Handler
```

**Warum?** Sicherheit und konsistentes Design.

---

## Best Practices

### ✅ Gute Struktur

```markdown
## Was: Thema der Lektion

**Definition:** Kurze Erklärung des Themas in 1-2 Sätzen.

Dies ist ein weiterer Absatz mit Details.

### Kernkonzepte

- 🎯 **Konzept 1:** Erklärung
- 📊 **Konzept 2:** Erklärung
- ✨ **Konzept 3:** Erklärung

## Warum: Bedeutung

Absatz über die Bedeutung und den Nutzen.

## Wie: Praktische Umsetzung

1. Erster Schritt mit [Link zur Dokumentation](https://...)
2. Zweiter Schritt
3. Dritter Schritt mit <u>wichtiger Betonung</u>

## Weiterführende Ressourcen

- [Ressource 1](https://...)
- [Ressource 2](https://...)
```

### ❌ Schlechte Struktur

```markdown
Alles in einem langen Absatz ohne Absätze oder Formatierung
macht den Text schwer lesbar und die Benutzer verlieren
den Überblick keine klare Struktur keine Listen keine
Überschriften...

<div class="warning" style="color: red;">
  <p>Warnung!</p>
</div>

<script>alert('test')</script>
```

---

## Label-Konventionen

Für strukturierte Beschreibungen empfohlen:

```markdown
**Was:** Beschreibung des Inhalts
**Warum:** Bedeutung und Kontext
**Wie:** Praktische Anwendung
**Dauer:** Geschätzte Bearbeitungszeit
**Voraussetzungen:** Erforderliches Wissen
**Lernziele:** Was Sie lernen werden
```

---

## Checkliste für Autoren

Vor dem Veröffentlichen prüfen:

- [ ] Absätze durch Leerzeilen getrennt
- [ ] Wichtige Begriffe fett markiert (`**Text**`)
- [ ] Listen korrekt formatiert (`-` oder `1.`)
- [ ] Überschriftenhierarchie korrekt (`##` für Haupt, `###` für Unter)
- [ ] Links funktionieren und sind korrekt formatiert
- [ ] Unterstreichen (`<u>`) nur sparsam verwendet
- [ ] Keine verbotenen HTML-Tags oder Inline-Styles
- [ ] Text ist gut lesbar und strukturiert
- [ ] Emojis sinnvoll eingesetzt (optional)

---

## Technische Details

### Rendering-Pipeline

1. **Markdown → HTML** (markdown-it parser)
2. **Sanitization** (isomorphic-dompurify)
3. **Link Processing** (automatische Security-Attribute)
4. **Styling** (Tailwind CSS)

### Erlaubte HTML-Tags

Nach Sanitization sind nur folgende Tags erlaubt:

- **Text:** `<p>`, `<strong>`, `<em>`, `<u>`, `<br>`
- **Listen:** `<ul>`, `<ol>`, `<li>`
- **Überschriften:** `<h2>`, `<h3>`
- **Links:** `<a>` (mit `href`, `rel`, `target`)

### Sicherheit

- Alle HTML-Tags werden escaped oder entfernt
- XSS-Angriffe werden verhindert
- Nur sichere Attribute erlaubt
- Keine JavaScript-Injection möglich

---

## Beispiele nach Anwendungsfall

### Kurze Video-Beschreibung

```markdown
**Überblick:** Einführung in die Grundlagen der Produktivität.

In diesem Video lernen Sie:

- 🎯 Die wichtigsten Produktivitäts-Prinzipien
- 📊 Praktische Tools und Techniken
- ✨ Sofort umsetzbare Tipps

**Dauer:** 15 Minuten
```

### Ausführliche Lektion

```markdown
## Was: Zeitmanagement-Strategien

**Definition:** Systematische Ansätze zur effektiven Nutzung Ihrer Zeit.

Zeitmanagement ist die Grundlage produktiven Arbeitens. Es geht nicht darum,
mehr Stunden zu arbeiten, sondern die <u>richtigen Dinge</u> zur richtigen
Zeit zu tun.

### Kernstrategien

- 🎯 **Eisenhower-Matrix:** Prioritäten nach Dringlichkeit und Wichtigkeit
- 📊 **Timeboxing:** Feste Zeitblöcke für Aufgaben
- ✨ **Deep Work:** Fokussierte Arbeitsphasen ohne Ablenkung

## Warum: Nutzen und Bedeutung

Gutes Zeitmanagement führt zu:

1. Weniger Stress und Überforderung
2. Mehr Fokus auf wichtige Projekte
3. Bessere Work-Life-Balance
4. Höhere Arbeitszufriedenheit

## Wie: Praktische Umsetzung

### Schritt 1: Aufgaben kategorisieren

Nutzen Sie die [Eisenhower-Matrix](https://de.wikipedia.org/wiki/Eisenhower-Prinzip)
zur Kategorisierung.

### Schritt 2: Zeitblöcke planen

Reservieren Sie feste Zeiten im Kalender für fokussierte Arbeit.

### Schritt 3: Ablenkungen eliminieren

Schaffen Sie eine ablenkungsfreie Umgebung für Deep Work Sessions.

## Weiterführende Ressourcen

- [Cal Newport: Deep Work](https://calnewport.com/books/deep-work/)
- [Timeboxing Guide](/ressourcen/timeboxing)
```

---

## Support

Bei Fragen zur Formatierung:

1. Prüfen Sie diese Dokumentation
2. Testen Sie in einer Preview-Umgebung
3. Kontaktieren Sie das Tech-Team bei Problemen

---

**Zuletzt aktualisiert:** 2025-10-12
**Version:** 1.0
