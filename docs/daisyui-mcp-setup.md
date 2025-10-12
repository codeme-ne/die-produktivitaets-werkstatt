# DaisyUI MCP Setup für Claude Code

> **TL;DR:** DaisyUI 5 nutzt CSS-Klassen (nicht React-Komponenten). Verwende Context7 oder DaisyUI GitMCP für korrekte Code-Generierung.

## 🎯 Warum DaisyUI-spezifische MCPs?

**DaisyUI ≠ shadcn/ui**

| Framework     | Typ                  | Beispiel                               |
| ------------- | -------------------- | -------------------------------------- |
| **DaisyUI 5** | Tailwind CSS Klassen | `<button className="btn btn-primary">` |
| shadcn/ui     | React Components     | `<Button variant="default">`           |

❌ **Shadcn MCP Server = Irrelevant für DaisyUI**
✅ **Context7 & GitMCP = Perfekt für DaisyUI**

---

## ✅ Installierte MCP Server

### 1. **Context7 MCP** (Global verfügbar)

- **Status:** ✅ Bereits installiert
- **Library ID:** `/saadeghi/daisyui`
- **Code Snippets:** 1.079
- **Trust Score:** 9.8/10

**Usage:**

```bash
# Im Prompt schreiben:
"Erstelle eine Card-Komponente mit DaisyUI 5, use context7"
```

### 2. **DaisyUI GitMCP** (Projekt-spezifisch)

- **Status:** ✅ Neu installiert (SSE Transport)
- **URL:** `https://gitmcp.io/saadeghi/daisyui`
- **Config:** `/home/lukasz/.claude.json`

**Usage:**

```bash
# Keine explizite Aufforderung nötig
"Erstelle einen Primary Button mit DaisyUI 5"
```

---

## 📝 DaisyUI 5 Komponenten-Beispiele

### Button (mit neuen v5 Styles)

```html
<!-- Standard -->
<button class="btn btn-primary">Primary</button>

<!-- Neue v5 Styles -->
<button class="btn btn-soft">Soft Button</button>
<button class="btn btn-dash">Dash Button</button>
```

### Card (v5 Klassennamen)

```html
<div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>
      A card component has a figure, a body part, and inside body there are
      title and actions parts
    </p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
```

**⚠️ v5 Breaking Changes:**

```diff
- <div class="card card-bordered">
+ <div class="card card-border">

- <div class="card card-compact">
+ <div class="card card-sm">
```

### Modal (HTML Dialog Element)

```html
<button onclick="my_modal.showModal()">Open Modal</button>
<dialog id="my_modal" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
    </form>
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

---

## 🚀 Workflow-Beispiele

### Beispiel 1: Context7 verwenden

```bash
Prompt: "Erstelle eine Hero-Section mit DaisyUI 5 Card und Primary Button, use context7"
```

**Ergebnis:**

- Context7 liefert aktuelle DaisyUI 5 Docs
- Claude generiert Code mit korrekten Klassennamen
- Automatische v5-Kompatibilität

### Beispiel 2: GitMCP (automatisch)

```bash
Prompt: "Zeige mir ein Modal mit Corner Close Button in DaisyUI 5"
```

**Ergebnis:**

- GitMCP wird automatisch verwendet
- Keine "use context7" Aufforderung nötig
- Direkter Zugriff auf GitHub-Repo

---

## 🔧 Installation Commands (Referenz)

### Context7 (bereits installiert)

```bash
# Lokal (schnellste Option)
claude mcp add context7 -- npx -y @upstash/context7-mcp

# SSE Transport
claude mcp add --transport sse context7 https://mcp.context7.com/sse

# HTTP Transport
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

### DaisyUI GitMCP (✅ installiert)

```bash
# SSE Transport (empfohlen)
claude mcp add --transport sse daisyui https://gitmcp.io/saadeghi/daisyui

# HTTP Transport
claude mcp add --transport http daisyui https://gitmcp.io/saadeghi/daisyui
```

---

## 📚 Weitere Ressourcen

- **Offizielle Docs:** https://daisyui.com/docs/editor/claudecode/
- **DaisyUI 5 Guide:** https://daisyui.com/docs/v5/
- **Context7 Library:** `/saadeghi/daisyui` (Trust Score: 9.8)
- **YouTube Tutorial:** [Generate daisyUI code with Claude and Context7](https://www.youtube.com/watch?v=rEsbZ46oQnE)

---

## ⚠️ Häufige Fehler

### ❌ Shadcn MCP verwenden

```bash
# FALSCH (nur für shadcn/ui React Components)
"Erstelle eine Card mit shadcn"
```

### ✅ Context7 oder GitMCP verwenden

```bash
# RICHTIG (für DaisyUI CSS-Klassen)
"Erstelle eine Card mit DaisyUI 5, use context7"
```

### ❌ Alte v4 Klassennamen

```html
<!-- FALSCH (v4) -->
<div class="card card-bordered card-compact">
  <!-- RICHTIG (v5) -->
  <div class="card card-border card-sm"></div>
</div>
```

---

## 🎨 Projekt-Kontext (AI Course Platform)

**Aktueller Stack:**

- Next.js 15 + React 19
- Tailwind CSS 4
- **DaisyUI 5** ✅
- TypeScript 5.9

**Existierende DaisyUI-Komponenten:**

- `components/Header.tsx` - Navigation
- `components/ProgressRing.tsx` - Radial Progress
- `app/page.tsx` - Landing Page mit Cards

**Best Practice:**

1. Immer "use context7" für komplexe Komponenten
2. GitMCP für schnelle Abfragen
3. Niemals shadcn/ui MCP verwenden
4. v5 Klassennamen-Migration beachten

---

**Status:** ✅ Setup abgeschlossen
**Letztes Update:** 2025-10-11
