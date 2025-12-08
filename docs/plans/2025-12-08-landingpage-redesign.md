# Landingpage Redesign Plan
## "Editorial Craftsman" Ästhetik

**Erstellt:** 2025-12-08
**Status:** Geplant
**Methode:** Ultrathink mit Gemini 3.0 Pro + DaisyUI 5 MCP

---

## Ästhetische Richtung

**Konzept: "Editorial Craftsman"**
Deutsche Handwerks-Qualität trifft modernes Editorial Design

- **Kernidee**: Die "Werkstatt" wörtlich nehmen - handwerklich, präzise, authentisch
- **Ton**: Warm aber professionell, vertrauenswürdig aber nicht langweilig
- **Differenzierung**: Vintage-Workshop-Elemente treffen auf clean Modern Swiss Design

---

## Typografie-Konzept

| Verwendung | Font | Gewicht | Anwendung |
|------------|------|---------|-----------|
| **Display** | Fraunces | 600, 700 | Headlines, Hero |
| **Body** | Source Sans 3 | 400, 500 | Fließtext, Beschreibungen |
| **Accent** | JetBrains Mono | 500 | Zahlen, Stats, Badges |

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=JetBrains+Mono:wght@500&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Farbpalette (DaisyUI Custom Theme)

| Variable | Hex | OKLCH | Verwendung |
|----------|-----|-------|------------|
| `primary` | #2D5A4A | `oklch(42% 0.1 160)` | Vertrauen, Fokus, CTAs |
| `secondary` | #E8DFD0 | `oklch(90% 0.03 80)` | Hintergründe, Cards |
| `accent` | #D4763B | `oklch(62% 0.18 50)` | Highlights, Action |
| `base-100` | #FDFBF7 | `oklch(99% 0.01 90)` | Haupthintergrund |
| `base-200` | #F5F1EA | `oklch(96% 0.02 85)` | Sections |
| `base-content` | #1A1A1A | `oklch(20% 0.02 0)` | Text |

**DaisyUI Theme Config (globals.css):**
```css
@plugin "daisyui/theme" {
  name: "werkstatt";
  default: true;
  color-scheme: light;
  --color-primary: oklch(42% 0.1 160);
  --color-primary-content: oklch(98% 0.01 160);
  --color-secondary: oklch(90% 0.03 80);
  --color-secondary-content: oklch(25% 0.02 80);
  --color-accent: oklch(62% 0.18 50);
  --color-accent-content: oklch(98% 0.01 50);
  --color-base-100: oklch(99% 0.01 90);
  --color-base-200: oklch(96% 0.02 85);
  --color-base-300: oklch(92% 0.03 80);
  --color-base-content: oklch(20% 0.02 0);
  --radius-box: 0.75rem;
  --radius-field: 0.5rem;
  --depth: 1;
}
```

---

## DaisyUI Komponenten Strategie

### Hero Section
| Aktuell | Neu | DaisyUI Komponente |
|---------|-----|-------------------|
| Static Headline | Animierte Headline | `text-rotate` |
| Flat Layout | 3D-Tilt Hero Card | `hover-3d` |
| Custom Grid | Step Indicators | `steps` |
| Avatar Group | Bleibt | `avatar-group` |

**Code-Beispiel text-rotate:**
```jsx
<h1 className="font-display text-5xl">
  Werde{" "}
  <span className="text-rotate text-accent">
    <span>
      <span>produktiver</span>
      <span>fokussierter</span>
      <span>zufriedener</span>
    </span>
  </span>{" "}
  in Wochen
</h1>
```

### Testimonials
| Aktuell | Neu | DaisyUI Komponente |
|---------|-----|-------------------|
| Uniform Cards | Chat-Bubbles | `chat`, `chat-start`, `chat-end` |
| Rounded Avatar | Squircle | `mask-squircle` |
| Featured Card | Side Layout | `card-side` |

**Code-Beispiel Chat:**
```jsx
<div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 mask mask-squircle">
      <Image src={avatar} alt={name} />
    </div>
  </div>
  <div className="chat-bubble bg-base-200 text-base-content">
    "{quote}"
  </div>
  <div className="chat-footer text-xs text-base-content/50">
    — {name}
  </div>
</div>
```

### Curriculum Section
| Aktuell | Neu | DaisyUI Komponente |
|---------|-----|-------------------|
| Vertical Cards | Timeline | `timeline`, `timeline-vertical` |
| Text Numbers | Visual Stats | `stats`, `stat-value` |
| Basic Collapse | Plus-Icon | `collapse-plus` |

**Code-Beispiel Timeline:**
```jsx
<ul className="timeline timeline-vertical">
  <li>
    <div className="timeline-start text-sm font-mono">Woche 1-3</div>
    <div className="timeline-middle">
      <Compass className="w-5 h-5 text-accent" />
    </div>
    <div className="timeline-end timeline-box">
      <h3 className="font-display font-semibold">Das Fundament</h3>
      <p className="text-sm text-base-content/70">...</p>
    </div>
    <hr className="bg-accent" />
  </li>
</ul>
```

### Pricing Section
| Aktuell | Neu | DaisyUI Komponente |
|---------|-----|-------------------|
| Basic Card | Badge oben | `indicator`, `indicator-item` |
| ul/li Features | Styled List | `list`, `list-row` |
| Static Trust | Live Status | `status`, `status-success` |

**Code-Beispiel Indicator:**
```jsx
<div className="indicator">
  <span className="indicator-item badge badge-accent">Beliebteste Wahl</span>
  <div className="card bg-base-100 shadow-xl">
    {/* Pricing Content */}
  </div>
</div>
```

---

## Motion/Animation Strategie

### Page Load Sequence (CSS-only)
```
Delay   Element              Animation
─────────────────────────────────────────
0ms     Hero Headline        fade-in + slide-up
200ms   Subheadline          fade-in
400ms   CTA Button           scale-in
600ms   Avatar Stack         stagger (each +100ms)
800ms   Timeline Preview     stagger (each +150ms)
```

### Scroll Animations (Intersection Observer)
- **Sections**: fade-in-up on scroll entry
- **Stats**: count-up von 0 zu Zielwert
- **Timeline Items**: staggered reveal (150ms delay each)
- **Cards**: fade-in + subtle scale

### Micro-interactions
| Element | Trigger | Animation |
|---------|---------|-----------|
| CTA Button | Every 5s | Subtle pulse |
| Cards | Hover | lift + shadow increase |
| Avatars | Hover | Slight rotation |
| Checkmarks | Load | Draw-in (stroke-dasharray) |
| Rating Stars | Load | Sparkle effect |

### CSS Animation Classes
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.delay-200 { animation-delay: 200ms; }
.delay-400 { animation-delay: 400ms; }
.delay-600 { animation-delay: 600ms; }
```

---

## Visual Details & Textures

### Hintergrund-Effekte
- **Paper Texture**: Subtle CSS noise overlay (5% opacity)
- **Gradient Mesh**: Warmer Gradient im Hero (sehr subtle)
- **Dotted Grid**: 10% opacity pattern für Sections

### Decorative Elements
- Hand-drawn style underlines für Highlights (SVG)
- Rounded corners überall (`--radius-box: 0.75rem`)
- Soft shadows mit warmem Tint (`shadow-[0_4px_20px_rgba(45,90,74,0.1)]`)

### Spacing Guidelines
- Sections: `py-24 md:py-32` für großzügigen vertical rhythm
- Max-width für Lesbarkeit: `max-w-prose` für längere Texte
- Card Padding: `p-6 md:p-8`

---

## Implementierungs-Phasen

| Phase | Beschreibung | Geschätzte Zeit |
|-------|--------------|-----------------|
| **1** | Theme & Fonts Setup (globals.css) | 30 min |
| **2** | Hero Section Redesign | 1-2 Stunden |
| **3** | Testimonials als Chat-Bubbles | 1 Stunde |
| **4** | Curriculum als Timeline + Stats | 1 Stunde |
| **5** | Pricing mit Indicator & List | 45 min |
| **6** | Motion/Animations hinzufügen | 1 Stunde |
| **7** | Polish & Visual Details | 1 Stunde |

**Gesamt: ~6-8 Stunden**

---

## Key Changes Zusammenfassung

| Aspekt | Von (Aktuell) | Zu (Redesign) |
|--------|---------------|---------------|
| **Typografie** | System/Generic | Fraunces + Source Sans 3 |
| **Farben** | Neutral/Kalt | Forest Green + Burnt Orange |
| **Bewegung** | Statisch | text-rotate, hover-3d, Scroll-Animationen |
| **Testimonials** | Uniform Cards | Chat-Bubbles (chat-start/end) |
| **Curriculum** | Vertical Cards | Timeline mit Stats |
| **Pricing** | Basic Card | Indicator + List Komponenten |
| **Visuals** | Safe/Clean | Bold mit Texturen |

---

## Referenz-Links

- [DaisyUI 5 Docs](https://daisyui.com)
- [DaisyUI text-rotate](https://daisyui.com/components/text-rotate/)
- [DaisyUI hover-3d](https://daisyui.com/components/hover-3d/)
- [DaisyUI chat](https://daisyui.com/components/chat/)
- [DaisyUI timeline](https://daisyui.com/components/timeline/)
- [Google Fonts - Fraunces](https://fonts.google.com/specimen/Fraunces)

---

## Nächste Schritte

1. [ ] Phase 1: Theme & Fonts in globals.css implementieren
2. [ ] Phase 2: Hero Section mit text-rotate redesignen
3. [ ] Phase 3: Testimonials zu Chat-Bubbles konvertieren
4. [ ] Phase 4: Curriculum als Timeline umbauen
5. [ ] Phase 5: Pricing Section aufwerten
6. [ ] Phase 6: Animationen hinzufügen
7. [ ] Phase 7: Final Polish
