# L1: Dein erster Prompt (10 Minuten)

TL;DR: In 10 Minuten erstellst du einen kleinen „Prompt‑Agenten“, der dir bei einer echten Aufgabe hilft. Kein Quiz, keine Punkte, kein Tracking – nur ein schneller Aha‑Moment.

## Was du gleich hast

- Einen funktionierenden Prompt für einen Mini‑Use‑Case (z. B. Todo‑Coach oder Meeting‑Notizen‑Assistent).
- Ein wiederverwendbares Prompt‑Template (Role → Constraints → Steps → Examples → Output Schema).
- 2–3 Varianten, die du auf deinen Alltag überträgst.

## Setup (leicht)

- Nutze einen beliebigen Chat‑Client (z. B. ChatGPT/Claude oder ein lokales OSS‑UI). Kein Code nötig.
- Kopiere den Prompt und passe die eckigen Klammern an.

## Prompt‑Template (kopieren, dann anpassen)

```
Role: Du bist mein fokussierter Todo‑Coach. Du zerlegst Aufgaben in kleine, machbare Schritte.

Constraints:
- Antworte kurz und nummeriert.
- Nutze aktive Verben („Öffne, Schreibe, Prüfe“).
- Maximal 5 Schritte; wenn unklar, stelle 2 Rückfragen.

Steps:
1) Verstehe mein Ziel.
2) Zerlege es in 3–5 Schritte.
3) Schlage eine 25‑Minuten‑Variante (Pomodoro) vor.
4) Gib ein kurzes „Start jetzt“-Signal.

Examples:
- Ziel: „Website Landing Page verbessern“ → Schritte: Copy prüfen, Hero vereinfachen, 1 CTA testen, …
- Ziel: „CV aktualisieren“ → Schritte: Rolle(n) sammeln, Bullet‑Points schärfen, Projekte priorisieren, …

Output Schema (JSON‑ähnlich, aber kompakt, menschenlesbar):
Ziel: <dein Ziel>
Schritte:
- [ ] Schritt 1
- [ ] Schritt 2
- [ ] Schritt 3
Pomodoro: 25‑Minuten‑Plan (kurz)
Startsignal: „Los geht’s: <1 Satz>“

Input (jetzt): <DEIN ZIEL IN 1 SATZ>
```

> Tipp: Ersetze „Todo‑Coach“ durch „Meeting‑Notizen‑Assistent“, „E‑Mail‑Entwurf‑Co‑Pilot“ oder „Debug‑Partner“.

## Try it now (5–7 Min)

1. Füge dein Ziel in 1 Satz ein (z. B. „Erste Version meiner Landing Page live bringen“).
2. Lies die 3–5 Schritte. Sind sie zu groß? Bitte um kleinere Teilaufgaben.
3. Lass dir einen 25‑Minuten‑Plan geben. Starte einen Slot, hake danach 1–2 Schritte ab.

Varianten (je 1–2 Min):

- Strenger: „Max. 120 Wörter, keine Füllwörter“.
- Kontext: „Nutze meine 3 Prioritäten: A) Umsatz, B) Zeit, C) Qualität“.
- Format: „Gib die Schritte als Markdown‑Checkliste“.

## Reflexion (2 Min)

- Was hat dich sofort weitergebracht? (konkret benennen)
- Welche Formulierung im Prompt hat am meisten bewirkt? (Role, Constraints, Examples?)
- Was änderst du, um es morgen erneut in 10 Min zu nutzen?

## Selbststudium (10–15 Min)

- Übertrage den Prompt auf 2 weitere Kontexte (z. B. „Onboarding neuer Mitarbeiter“, „Bug‑Analyse“).
- Schreibe 1 „Negativ‑Beispiel“ (absichtlich zu vage) und verbessere es in 2 Iterationen.
- Lege dir ein Snippet‑Dokument mit deinem besten Prompt‑Template an.

---

Hinweis (Compliance):

- Keine Prüfungen/Noten, kein Server‑Tracking. Alles lokal bei dir. „Leichtigkeit lernen“ statt Druck.

Weiter: L2 – Prompt‑Patterns, die sofort wirken (Role/Constraints/Examples/Steps + 2 Templates).
