# Kurs Text-Rendering: Upgrade-Pfad

## Status Quo (Phase 1)

**Aktuell**: Eigener sicherer Plain→HTML-Konverter (`libs/formatText.ts`)

### Vorteile

- ✅ **Keine Dependencies**: Kein npm install nötig
- ✅ **Volle Kontrolle**: Exakte Whitelist von Tags
- ✅ **Schnell**: Direktes String-Processing
- ✅ **Sicher**: Multi-Layer Escaping + Whitelist
- ✅ **CSV-optimiert**: Speziell für PW-CSV-Format

### Unterstützte Formatierungen

- Absätze (doppelte Newlines)
- BR tags (einzelne Newlines)
- UL/OL Listen (•, -, \*, 1., 1))
- Strong (`""Text""` aus CSV)
- Links (automatisch mit rel="noopener nofollow")

### Limitierungen

- Kein Markdown (kein `**bold**`, `_italic_`, etc.)
- Keine verschachtelten Listen
- Keine Code-Blöcke
- Keine Tabellen
- Keine benutzerdefinierten Formatierungen

---

## Upgrade Option (Phase 2)

**Falls nötig**: Migration zu `react-markdown` + Plugins

### Wann upgraden?

Upgrade **nur wenn**:

- CSV-Beschreibungen komplexere Formatierung brauchen
- Markdown-Support gewünscht (z.B. `**bold**`, `_italic_`)
- Verschachtelte Listen benötigt
- Code-Blöcke oder Syntax-Highlighting gewünscht
- Tabellen oder andere Markdown-Features gebraucht

**Upgrade NICHT wenn**:

- Aktuelle Formatierung ausreichend ist (wahrscheinlich!)
- Dependencies minimieren wichtiger ist
- Performance kritisch ist

### Installation (bei Bedarf)

```bash
npm install react-markdown remark-gfm rehype-sanitize rehype-raw
npm install --save-dev @tailwindcss/typography  # optional: bessere Typografie
```

### Upgrade-Schritte

#### 1. Vorverarbeitung beibehalten

```typescript
// libs/formatText.ts - erweitern, nicht ersetzen!

/**
 * Prepare CSV text for Markdown processing
 */
export function prepareForMarkdown(text: string): string {
  let prepared = normalize(text);

  // Convert CSV bullets to Markdown
  prepared = prepared.replace(/^[•]\s/gm, "- ");

  // Convert CSV quotes to Markdown bold
  prepared = prepared.replace(/""([^"]+)""/g, "**$1**");

  return prepared;
}
```

#### 2. VideoBody.tsx updaten

```typescript
// components/course/VideoBody.tsx

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import { prepareForMarkdown } from '@/libs/formatText';

export function VideoBody({ description, resources }: Props) {
  const markdownText = prepareForMarkdown(description);

  return (
    <div className="prose prose-lg max-w-none">
      <div className="card bg-base-100 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Beschreibung</h2>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener nofollow" />
              ),
            }}
          >
            {markdownText}
          </ReactMarkdown>
        </div>
      </div>
      {/* Resources bleiben gleich */}
    </div>
  );
}
```

#### 3. Tailwind Typography (optional)

```javascript
// tailwind.config.js

module.exports = {
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
```

Dann in VideoBody:

```tsx
<div className="prose prose-lg prose-slate max-w-none">{/* ... */}</div>
```

### Sicherheitshinweise

- `rehype-sanitize` ist **Pflicht** (auch bei react-markdown!)
- `rehypeRaw` nur wenn HTML-Tags erlaubt sein sollen
- `prepareForMarkdown()` behält CSV-spezifische Konvertierung
- Link-Komponente behält `rel="noopener nofollow"`

### Performance-Vergleich

| Methode                | Bundle Size | Parse-Zeit |
| ---------------------- | ----------- | ---------- |
| formatSimple (aktuell) | ~2KB        | <1ms       |
| react-markdown         | ~35KB       | 2-5ms      |

**Empfehlung**: Bei aktuell ~100 Lektionen ist der Unterschied minimal. Upgrade nur bei echtem Feature-Bedarf.

---

## Testing nach Upgrade

Falls du upgradest, teste diese Fälle:

1. **Lange Absätze**: Multi-Paragraph-Text bleibt lesbar
2. **Bullet-Listen**: `•` und `-` werden zu korrekten UL
3. **Nummern-Listen**: `1.`, `2.` werden zu OL
4. **CSV-Quotes**: `""Text""` wird bold
5. **Links**: URLs werden klickbar, öffnen neues Tab
6. **XSS**: `<script>` wird escaped/entfernt

---

## Entscheidungsmatrix

````
Brauche ich...                     | Aktuell | Mit react-markdown
-----------------------------------|---------|-------------------
Absätze, Listen, Links             | ✅      | ✅
CSV-Quotes als Bold                | ✅      | ✅ (mit prep)
Markdown **bold**, _italic_        | ❌      | ✅
Code-Blöcke ```                    | ❌      | ✅
Verschachtelte Listen              | ❌      | ✅
Tabellen                           | ❌      | ✅
Minimale Dependencies              | ✅      | ❌
````

**Fazit**: Aktueller Ansatz deckt 95% der PW-CSV-Fälle ab. Upgrade nur wenn neue Features wirklich benötigt werden.

---

## Weitere Referenzen

- [react-markdown Docs](https://github.com/remarkjs/react-markdown)
- [remark-gfm (GitHub Flavored Markdown)](https://github.com/remarkjs/remark-gfm)
- [rehype-sanitize Security](https://github.com/rehypejs/rehype-sanitize)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)
