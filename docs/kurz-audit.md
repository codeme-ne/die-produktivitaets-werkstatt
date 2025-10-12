TL;DR

- Zielgruppe: A) Entwickler (wenig KI‑Wissen, wollen Code). Content zuerst kuratieren, dann leichte Interaktivität. Keine Quizzes/Noten/Tracking.
- Behalten: Transformer/LLM‑Kerne (1.3, 2.2), „Wichtige Erkenntnisse“, „Selbststudium“, Code‑Beispiele (MNIST, KG/Cypher), Praxisfälle (Kap. 6).
- Kürzen: Historie/Definitionen (zu lang), schwere Mathe‑Herleitungen, redundante Passagen. Klartext statt akademischer Sprache.
- Ergänzen: RAG‑Grundlagen, aktuelle Open‑Source‑Modelle (Llama/Mistral u.ä.), Prompt‑Patterns, mehr „Try it now“.
- MVP: 1 Testlektion (L1: Dein erster Prompt) in Markdown; manuelle Compliance‑Checkliste, keine neuen Komponenten.

Kontext & Aktualität (Kurzbefund)

- Datum im PDF: 11.10.2025 (Druck). Enthält GPT‑4 und o1 (09/2024) → grundsätzlich aktuell.
- Fehlende Essentials für Devs 2024/2025: RAG wird nicht erwähnt; wenig zu OSS‑Modellen/Tooling; viel Text, wenig „do this now“.

Was ist Gold (Behalten/verdichten)

- „Wichtige Erkenntnisse“ (z. B. 5.4) als kompakte Callouts/Notizzettel.
- „Vorschläge fürs Selbststudium“ (5.5) → klare, konkrete Aufgaben; in Checklistenform nutzbar.
- Transformer/LLM‑Kerne (1.3, 2.2) → knapp halten, als Referenzkasten.
- Praxisfälle aus Kap. 6: Reise‑Optimierung, Nachfrageprognose, Sales‑Automation, Recycling‑Vision, Cybertrap.
- Code‑Snippets: MNIST (TF/PyTorch), Neo4j/Cypher‑Beispiel (KG) → als optionale Vertiefung.

Kürzen/Klarziehen (Streichliste)

- Lange Historie (1.1–1.6): auf 3–5 Sätze condensen, Rest als „Mehr anzeigen“ (später).
- Formalia/Herleitungen (z. B. RL‑Formeln) → Einsteiger‑Dev‑Publikum: weglassen/anhängen.
- Dopplungen/grundsätzliche Definitionen → bündeln in Glossar (später), im MVP nur das Nötigste.

Lücken (ergänzen)

- RAG in 20 Zeilen (Konzept+Minisnippets), Vektorsuche/Embeddings auf High‑Level.
- Prompt‑Patterns (Role/Constraints/Examples/Steps) mit 2–3 funktionierenden Templates.
- Kurzreferenz zu aktuellen Modellen (Closed & Open Source) und praktischen Grenzen (Kontextfenster, Kosten, Latenz).
- Mini‑Walkthroughs statt Theorieblöcke: „Mach X in 10 Minuten“.

Strukturvorschlag (7 Micro‑Lektionen, 8–15 Min)

1. Dein erster Prompt (Aha in 10 Min) – heute geliefert als Markdown.
2. Prompt‑Patterns, die sofort wirken – Templates + Variationen.
3. RAG in 20 Zeilen – Konzept, kleine Code‑Skelette (ohne Tests/Scoring).
4. Bildklassifikation Quickstart – Datensatz → erstes Modell (theoretisch oder minimaler Code‑Pfad).
5. Wissensgraph in 15 Min – Mini‑Demo (KG‑Konzept, einfache Abfrageideen).
6. Nachfrageprognose kurz erklärt – Feature‑Ideen, Metriken, Fallstricke.
7. Risiken & Ethik – realistische Szenarien, Reflexion statt Bewertung.

Compliance (MVP: manuelle Checkliste)

- Verbotene Begriffe/Mechaniken: Quiz, Test, Prüfung, Punkt(e), Note(n), Zertifikat, bestanden/nicht bestanden, serverseitige Speicherung von Antworten.
- Erlaubt: Reflexionsfragen, nicht‑bewertete Checklisten, Reveal‑Hinweise, lokale Notizen/„zuletzt gelesen“.
- Speicherung: ausschließlich lokal (localStorage/Download), kein Login, kein Tracking.
- Sprache: Du‑Anrede, kurze Sätze, „Leichtigkeit lernen“ statt akademischer Ton.

Akzeptanzkriterien MVP

- In 10 Minuten ein sichtbarer Fortschritt (L1) ohne Setup‑Hürden.
- Eine Seite pro Lektion, klare TL;DR, 3 „Nächste Schritte“.
- Keine verbotenen Begriffe/Mechaniken (manueller Check bestanden).
- Lesbar auf Mobil, scannbar (Überschriften, kurze Absätze).

Nächste Schritte

- Jetzt: L1 als Markdown (ohne Komponenten) – erstellt in `content/lessons/01-erster-prompt.md`.
- Danach: kurzes Feedback einholen, dann L2 (Prompt‑Patterns) und L3 (RAG‑Concept) skizzieren.
