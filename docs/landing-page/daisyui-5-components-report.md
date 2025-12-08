# DaisyUI 5 Komponenten für Landing Page Optimierung

## Executive Summary

Dieser Report identifiziert die besten DaisyUI 5 Komponenten für eine moderne, konversionsorientierte Landing Page. Alle Komponenten sind kompatibel mit den `werkstatt` und `werkstatt-dark` Custom Themes und nutzen ausschließlich DaisyUI 5 Klassen.

---

## 1. Hero Sections

### 1.1 Basic Hero mit Hintergrundbild
```html
<div class="hero min-h-screen" style="background-image: url('/produktivitaets-werkstatt-bg.png');">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold text-primary-content">Produktivitäts-Werkstatt</h1>
      <p class="py-6 text-primary-content">Dein systematischer Weg zu fokussierter Produktivität</p>
      <button class="btn btn-primary btn-lg">Jetzt starten</button>
    </div>
  </div>
</div>
```

**Features:**
- `hero-overlay` für besseren Textkontrast
- `min-h-screen` für Fullscreen-Effect
- `text-primary-content` für automatische Theme-Anpassung

### 1.2 Hero mit Text-Rotation (Modern & Dynamisch)
```html
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-2xl">
      <h1 class="text-7xl font-bold">
        Werde
        <span class="text-rotate">
          <span class="justify-items-center">
            <span class="text-primary">produktiver</span>
            <span class="text-secondary">fokussierter</span>
            <span class="text-accent">effizienter</span>
            <span class="text-primary">erfolgreicher</span>
          </span>
        </span>
      </h1>
      <p class="py-6 text-lg text-base-content/80">
        Der systematische 12-Wochen-Kurs für nachhaltige Produktivität
      </p>
      <div class="flex gap-4 justify-center">
        <button class="btn btn-primary btn-lg">Kurs starten</button>
        <button class="btn btn-outline btn-lg">Mehr erfahren</button>
      </div>
    </div>
  </div>
</div>
```

**Features:**
- `text-rotate` für dynamische Wortrotation (10s Loop)
- Multiple CTAs mit `btn-primary` + `btn-outline`
- Responsive mit `text-7xl`

### 1.3 Hero mit Card Overlay (Premium Look)
```html
<div class="hero min-h-screen bg-gradient-to-r from-primary/10 to-secondary/10">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <img src="/hero-image.png" class="max-w-sm rounded-lg shadow-2xl" />
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-4xl">12 Wochen, die dein Leben verändern</h2>
        <p>Über 1.000 Teilnehmer haben bereits ihre Produktivität verdoppelt</p>
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-value text-primary">1.000+</div>
            <div class="stat-title">Teilnehmer</div>
          </div>
          <div class="stat">
            <div class="stat-value text-secondary">2x</div>
            <div class="stat-title">Produktivität</div>
          </div>
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-primary btn-block">Jetzt einschreiben</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Features:**
- `lg:flex-row-reverse` für responsive Layout
- Inline Stats für Social Proof
- `btn-block` für volle Breite auf Mobile

---

## 2. Stats & Metrics Displays

### 2.1 Horizontal Stats (Social Proof)
```html
<div class="stats shadow w-full bg-base-100">
  <div class="stat">
    <div class="stat-figure text-primary">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
      </svg>
    </div>
    <div class="stat-title">Aktive Teilnehmer</div>
    <div class="stat-value text-primary">1.2K+</div>
    <div class="stat-desc">↗︎ 400 (22%) mehr als letztes Jahr</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-secondary">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="stat-title">Zufriedenheit</div>
    <div class="stat-value text-secondary">98%</div>
    <div class="stat-desc">4.9/5 Sterne Bewertung</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-accent">
      <div class="radial-progress text-accent" style="--value:86;" role="progressbar" aria-valuenow="86">
        86%
      </div>
    </div>
    <div class="stat-title">Abschlussrate</div>
    <div class="stat-value">86%</div>
    <div class="stat-desc">Teilnehmer schließen den Kurs ab</div>
  </div>
</div>
```

**Features:**
- `stats shadow` für Card-Effect
- `stat-figure` für Icons/Visuals
- `radial-progress` für visuelle Prozentanzeige

### 2.2 Vertical Stats Stack (Mobile-First)
```html
<div class="stats stats-vertical lg:stats-horizontal shadow">
  <div class="stat place-items-center">
    <div class="stat-title">Video-Lektionen</div>
    <div class="stat-value text-primary">72</div>
    <div class="stat-desc">Insgesamt 12 Module</div>
  </div>

  <div class="stat place-items-center">
    <div class="stat-title">Arbeitsblätter</div>
    <div class="stat-value text-secondary">45+</div>
    <div class="stat-desc">PDF Downloads</div>
  </div>

  <div class="stat place-items-center">
    <div class="stat-title">Support</div>
    <div class="stat-value">24/7</div>
    <div class="stat-desc">Community Zugang</div>
  </div>
</div>
```

**Features:**
- `stats-vertical lg:stats-horizontal` für Responsive
- `place-items-center` für zentrierte Darstellung

### 2.3 Stats mit Actions (CTA Integration)
```html
<div class="stats shadow bg-primary text-primary-content">
  <div class="stat">
    <div class="stat-title text-primary-content/80">Begrenztes Angebot</div>
    <div class="stat-value">30% Rabatt</div>
    <div class="stat-desc text-primary-content/80">Nur noch 24 Stunden</div>
    <div class="stat-actions">
      <button class="btn btn-sm btn-success">Jetzt sichern</button>
      <button class="btn btn-sm btn-ghost">Mehr Info</button>
    </div>
  </div>
</div>
```

**Features:**
- `stat-actions` für integrierte CTAs
- Theme-Anpassung mit `text-primary-content`

---

## 3. Card Designs

### 3.1 Course Module Cards (Grid Layout)
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Module Card 1 -->
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <img src="/module-1.png" alt="Modul 1" class="h-48 w-full object-cover" />
    </figure>
    <div class="card-body">
      <div class="badge badge-primary">Woche 1-2</div>
      <h2 class="card-title">Fundament</h2>
      <p>Lerne die Grundlagen produktiver Systeme kennen</p>
      <div class="card-actions justify-between items-center mt-4">
        <div class="flex gap-2">
          <div class="badge badge-outline">6 Videos</div>
          <div class="badge badge-outline">3 PDFs</div>
        </div>
        <button class="btn btn-primary btn-sm">Start</button>
      </div>
    </div>
  </div>

  <!-- Module Card 2 -->
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <img src="/module-2.png" alt="Modul 2" class="h-48 w-full object-cover" />
    </figure>
    <div class="card-body">
      <div class="badge badge-secondary">Woche 3-4</div>
      <h2 class="card-title">Klarheit</h2>
      <p>Definiere deine Ziele und Prioritäten</p>
      <div class="card-actions justify-between items-center mt-4">
        <div class="flex gap-2">
          <div class="badge badge-outline">8 Videos</div>
          <div class="badge badge-outline">4 PDFs</div>
        </div>
        <button class="btn btn-secondary btn-sm">Start</button>
      </div>
    </div>
  </div>

  <!-- Module Card 3 with Lock State -->
  <div class="card bg-base-100 shadow-xl opacity-50">
    <figure>
      <img src="/module-3.png" alt="Modul 3" class="h-48 w-full object-cover" />
    </figure>
    <div class="card-body">
      <div class="badge badge-ghost">Woche 5-6</div>
      <h2 class="card-title">
        Systeme
        <div class="badge badge-sm">🔒 Gesperrt</div>
      </h2>
      <p>Baue dein persönliches Produktivitätssystem</p>
      <div class="card-actions justify-between items-center mt-4">
        <div class="flex gap-2">
          <div class="badge badge-outline">7 Videos</div>
          <div class="badge badge-outline">5 PDFs</div>
        </div>
        <button class="btn btn-disabled btn-sm">Gesperrt</button>
      </div>
    </div>
  </div>
</div>
```

**Features:**
- Responsive Grid: 1/2/3 Spalten
- `badge` für Kategorisierung
- Lock State mit `opacity-50` + `btn-disabled`

### 3.2 Pricing Cards (Side-by-Side)
```html
<div class="flex flex-col lg:flex-row gap-8 justify-center">
  <!-- Basic Plan -->
  <div class="card bg-base-100 shadow-xl w-full lg:w-96">
    <div class="card-body">
      <h2 class="card-title justify-center text-2xl">Selbstlerner</h2>
      <div class="text-center my-4">
        <span class="text-5xl font-bold">€297</span>
        <span class="text-base-content/60">/einmalig</span>
      </div>
      <div class="divider"></div>
      <ul class="space-y-3">
        <li class="flex gap-2">
          <span class="text-success">✓</span> 72 Video-Lektionen
        </li>
        <li class="flex gap-2">
          <span class="text-success">✓</span> 45+ PDF Arbeitsblätter
        </li>
        <li class="flex gap-2">
          <span class="text-success">✓</span> Community Zugang
        </li>
        <li class="flex gap-2">
          <span class="text-base-content/30">✗</span>
          <span class="text-base-content/50">1:1 Coaching</span>
        </li>
        <li class="flex gap-2">
          <span class="text-base-content/30">✗</span>
          <span class="text-base-content/50">Prioritäts-Support</span>
        </li>
      </ul>
      <div class="card-actions justify-center mt-6">
        <button class="btn btn-outline btn-block">Auswählen</button>
      </div>
    </div>
  </div>

  <!-- Premium Plan (Featured) -->
  <div class="card bg-primary text-primary-content shadow-2xl w-full lg:w-96 relative">
    <div class="badge badge-secondary absolute -top-3 left-1/2 -translate-x-1/2">
      BELIEBTESTE WAHL
    </div>
    <div class="card-body">
      <h2 class="card-title justify-center text-2xl">Premium</h2>
      <div class="text-center my-4">
        <span class="text-5xl font-bold">€497</span>
        <span class="text-primary-content/60">/einmalig</span>
      </div>
      <div class="divider divider-neutral"></div>
      <ul class="space-y-3">
        <li class="flex gap-2">
          <span class="text-secondary">✓</span> Alles aus Selbstlerner
        </li>
        <li class="flex gap-2">
          <span class="text-secondary">✓</span> 3x 1:1 Coaching Sessions
        </li>
        <li class="flex gap-2">
          <span class="text-secondary">✓</span> Prioritäts-Support
        </li>
        <li class="flex gap-2">
          <span class="text-secondary">✓</span> Exklusive Bonus-Module
        </li>
        <li class="flex gap-2">
          <span class="text-secondary">✓</span> Lebenslanger Zugang
        </li>
      </ul>
      <div class="card-actions justify-center mt-6">
        <button class="btn btn-secondary btn-block">Jetzt starten</button>
      </div>
    </div>
  </div>

  <!-- VIP Plan -->
  <div class="card bg-base-100 shadow-xl w-full lg:w-96">
    <div class="card-body">
      <h2 class="card-title justify-center text-2xl">VIP</h2>
      <div class="text-center my-4">
        <span class="text-5xl font-bold">€997</span>
        <span class="text-base-content/60">/einmalig</span>
      </div>
      <div class="divider"></div>
      <ul class="space-y-3">
        <li class="flex gap-2">
          <span class="text-success">✓</span> Alles aus Premium
        </li>
        <li class="flex gap-2">
          <span class="text-success">✓</span> 12x 1:1 Coaching Sessions
        </li>
        <li class="flex gap-2">
          <span class="text-success">✓</span> WhatsApp Support 24/7
        </li>
        <li class="flex gap-2">
          <span class="text-success">✓</span> Persönliche Systemanalyse
        </li>
        <li class="flex gap-2">
          <span class="text-success">✓</span> VIP Community Zugang
        </li>
      </ul>
      <div class="card-actions justify-center mt-6">
        <button class="btn btn-accent btn-block">VIP werden</button>
      </div>
    </div>
  </div>
</div>
```

**Features:**
- Featured Card mit `bg-primary` + Badge
- `divider` für visuelle Trennung
- Responsive mit `lg:flex-row`
- Disabled Features mit opacity

### 3.3 Testimonial Cards mit Avatar
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex items-center gap-4 mb-4">
        <div class="avatar">
          <div class="w-16 rounded-full">
            <img src="/testimonial-1.png" alt="Sarah M." />
          </div>
        </div>
        <div>
          <h3 class="font-bold">Sarah M.</h3>
          <div class="rating rating-sm">
            <input type="radio" name="rating-1" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-1" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-1" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-1" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-1" class="mask mask-star bg-warning" disabled checked />
          </div>
        </div>
      </div>
      <p class="text-base-content/80">
        "Dieser Kurs hat meine Arbeitsweise komplett transformiert.
        Ich bin jetzt doppelt so produktiv und fühle mich weniger gestresst."
      </p>
      <div class="card-actions justify-end mt-4">
        <div class="badge badge-outline">Marketing Manager</div>
      </div>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex items-center gap-4 mb-4">
        <div class="avatar placeholder">
          <div class="bg-neutral text-neutral-content w-16 rounded-full">
            <span class="text-2xl">TK</span>
          </div>
        </div>
        <div>
          <h3 class="font-bold">Thomas K.</h3>
          <div class="rating rating-sm">
            <input type="radio" name="rating-2" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-2" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-2" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-2" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-2" class="mask mask-star bg-warning" disabled checked />
          </div>
        </div>
      </div>
      <p class="text-base-content/80">
        "Die Systeme aus dem Kurs nutze ich täglich.
        Meine Prokrastination ist Geschichte!"
      </p>
      <div class="card-actions justify-end mt-4">
        <div class="badge badge-outline">Software Engineer</div>
      </div>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex items-center gap-4 mb-4">
        <div class="avatar">
          <div class="w-16 rounded-full">
            <img src="/testimonial-3.png" alt="Lisa R." />
          </div>
        </div>
        <div>
          <h3 class="font-bold">Lisa R.</h3>
          <div class="rating rating-sm">
            <input type="radio" name="rating-3" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-3" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-3" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-3" class="mask mask-star bg-warning" disabled checked />
            <input type="radio" name="rating-3" class="mask mask-star bg-warning" disabled checked />
          </div>
        </div>
      </div>
      <p class="text-base-content/80">
        "Endlich ein Produktivitätskurs, der wirklich funktioniert.
        Die Community ist mega supportive!"
      </p>
      <div class="card-actions justify-end mt-4">
        <div class="badge badge-outline">Gründerin</div>
      </div>
    </div>
  </div>
</div>
```

**Features:**
- `avatar` mit Fallback (`avatar placeholder`)
- `rating` für visuelle Bewertung
- `badge-outline` für Jobtitel

---

## 4. FAQ / Accordion

### 4.1 Standard FAQ (Radio-basiert)
```html
<div class="max-w-3xl mx-auto space-y-4">
  <!-- FAQ Item 1 -->
  <div class="collapse collapse-arrow bg-base-200">
    <input type="radio" name="faq-accordion" checked="checked" />
    <div class="collapse-title text-xl font-medium">
      Für wen ist der Kurs geeignet?
    </div>
    <div class="collapse-content">
      <p>Der Kurs ist perfekt für alle, die ihre Produktivität systematisch verbessern wollen -
      egal ob Angestellte, Selbstständige, Studenten oder Unternehmer.
      Du brauchst keine Vorkenntnisse.</p>
    </div>
  </div>

  <!-- FAQ Item 2 -->
  <div class="collapse collapse-arrow bg-base-200">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title text-xl font-medium">
      Wie viel Zeit muss ich investieren?
    </div>
    <div class="collapse-content">
      <p>Du solltest pro Woche ca. 2-3 Stunden einplanen: 1 Stunde für Videos und 1-2 Stunden
      für die praktische Umsetzung. Der Kurs ist so strukturiert, dass du ihn flexibel
      in deinen Alltag integrieren kannst.</p>
    </div>
  </div>

  <!-- FAQ Item 3 -->
  <div class="collapse collapse-arrow bg-base-200">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title text-xl font-medium">
      Gibt es eine Geld-zurück-Garantie?
    </div>
    <div class="collapse-content">
      <p>Ja! Wir bieten eine 30-Tage-Geld-zurück-Garantie. Wenn du innerhalb der ersten
      30 Tage merkst, dass der Kurs nichts für dich ist, bekommst du dein Geld zurück -
      ohne Wenn und Aber.</p>
    </div>
  </div>

  <!-- FAQ Item 4 -->
  <div class="collapse collapse-arrow bg-base-200">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title text-xl font-medium">
      Wie lange habe ich Zugang zum Kurs?
    </div>
    <div class="collapse-content">
      <p>Du erhältst lebenslangen Zugang zu allen Kursinhalten, inklusive aller zukünftigen
      Updates und neuen Modulen. Einmal gekauft, für immer verfügbar.</p>
    </div>
  </div>

  <!-- FAQ Item 5 -->
  <div class="collapse collapse-arrow bg-base-200">
    <input type="radio" name="faq-accordion" />
    <div class="collapse-title text-xl font-medium">
      Kann ich den Kurs in meinem eigenen Tempo durchlaufen?
    </div>
    <div class="collapse-content">
      <p>Absolut! Der Kurs ist so konzipiert, dass du ihn in deinem eigenen Tempo durcharbeiten
      kannst. Ob du 12 Wochen oder 6 Monate brauchst - du entscheidest.</p>
    </div>
  </div>
</div>
```

**Features:**
- `collapse-arrow` für Icon-Indicator
- Radio-Input für "nur 1 offen" Verhalten
- `bg-base-200` für subtile Abhebung

### 4.2 Plus-Icon FAQ (Alternative)
```html
<div class="max-w-3xl mx-auto space-y-2">
  <div class="collapse collapse-plus bg-base-100 shadow-sm">
    <input type="radio" name="faq-plus" checked="checked" />
    <div class="collapse-title text-lg font-medium">
      Welche Tools benötige ich?
    </div>
    <div class="collapse-content">
      <p>Du benötigst lediglich ein Tool für Notizen (z.B. Notion, Evernote oder auch Papier)
      und einen Kalender. Alle anderen Tools sind optional und werden im Kurs erklärt.</p>
    </div>
  </div>

  <div class="collapse collapse-plus bg-base-100 shadow-sm">
    <input type="radio" name="faq-plus" />
    <div class="collapse-title text-lg font-medium">
      Gibt es persönliche Betreuung?
    </div>
    <div class="collapse-content">
      <p>Im Premium und VIP Paket erhältst du persönliche 1:1 Coaching Sessions.
      Zusätzlich steht dir unsere aktive Community für Fragen zur Verfügung.</p>
    </div>
  </div>
</div>
```

**Features:**
- `collapse-plus` für + / - Icons
- Leichtere Variante mit `shadow-sm`

---

## 5. CTA Buttons & Patterns

### 5.1 Primary CTA Buttons
```html
<!-- Standard Primary CTA -->
<button class="btn btn-primary btn-lg">
  Jetzt starten
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
  </svg>
</button>

<!-- Wide CTA für Mobile -->
<button class="btn btn-primary btn-lg btn-wide">
  Zum Kurs anmelden
</button>

<!-- Block CTA (volle Breite) -->
<button class="btn btn-primary btn-block">
  Kostenlos testen
</button>

<!-- CTA mit Loading State -->
<button class="btn btn-primary btn-lg">
  <span class="loading loading-spinner"></span>
  Wird geladen...
</button>
```

### 5.2 Secondary & Outline CTAs
```html
<!-- Outline Button (weniger prominent) -->
<button class="btn btn-outline btn-lg">
  Mehr erfahren
</button>

<!-- Ghost Button (minimalistisch) -->
<button class="btn btn-ghost btn-lg">
  Später anschauen
</button>

<!-- Link-Style Button -->
<button class="btn btn-link">
  Demo ansehen →
</button>
```

### 5.3 CTA Button Groups
```html
<!-- Horizontal Group -->
<div class="flex flex-col sm:flex-row gap-4 justify-center">
  <button class="btn btn-primary btn-lg">
    Kurs kaufen
  </button>
  <button class="btn btn-outline btn-lg">
    Kostenlose Probe-Lektion
  </button>
</div>

<!-- Vertical Stack für Mobile -->
<div class="flex flex-col gap-3 w-full max-w-xs">
  <button class="btn btn-primary">
    Premium Plan wählen
  </button>
  <button class="btn btn-secondary">
    VIP Plan wählen
  </button>
  <button class="btn btn-ghost">
    Nur mal umschauen
  </button>
</div>
```

### 5.4 CTA mit Badge/Indicator
```html
<!-- CTA mit Urgency Badge -->
<div class="relative inline-block">
  <button class="btn btn-primary btn-lg">
    Jetzt zugreifen
  </button>
  <span class="indicator-item badge badge-error absolute -top-2 -right-2">
    -30%
  </span>
</div>

<!-- CTA mit Status Indicator -->
<button class="btn btn-success gap-2">
  <span class="status status-success"></span>
  24 Plätze verfügbar
</button>
```

---

## 6. Testimonial Layouts

### 6.1 Chat-Style Testimonials (Modern)
```html
<div class="max-w-4xl mx-auto space-y-6">
  <!-- Testimonial 1 (Left) -->
  <div class="chat chat-start">
    <div class="chat-image avatar">
      <div class="w-12 rounded-full">
        <img src="/testimonial-1.png" alt="User" />
      </div>
    </div>
    <div class="chat-header">
      Sarah Müller
      <time class="text-xs opacity-50">vor 2 Tagen</time>
    </div>
    <div class="chat-bubble chat-bubble-primary">
      Der Kurs hat mein Leben verändert! Ich habe endlich gelernt,
      wie ich meine Zeit wirklich sinnvoll nutze. 🎯
    </div>
    <div class="chat-footer">
      <div class="rating rating-sm">
        <input type="radio" name="rating-s1" class="mask mask-star bg-warning" disabled checked />
        <input type="radio" name="rating-s1" class="mask mask-star bg-warning" disabled checked />
        <input type="radio" name="rating-s1" class="mask mask-star bg-warning" disabled checked />
        <input type="radio" name="rating-s1" class="mask mask-star bg-warning" disabled checked />
        <input type="radio" name="rating-s1" class="mask mask-star bg-warning" disabled checked />
      </div>
    </div>
  </div>

  <!-- Testimonial 2 (Right) -->
  <div class="chat chat-end">
    <div class="chat-image avatar">
      <div class="w-12 rounded-full">
        <img src="/testimonial-2.png" alt="User" />
      </div>
    </div>
    <div class="chat-header">
      Thomas Klein
      <time class="text-xs opacity-50">vor 1 Woche</time>
    </div>
    <div class="chat-bubble chat-bubble-secondary">
      Beste Investition in mich selbst. Die Systeme sind einfach umzusetzen
      und funktionieren wirklich! 💪
    </div>
    <div class="chat-footer">
      <div class="rating rating-sm">
        <input type="radio" name="rating-s2" class="mask mask-star bg-warning" disabled checked />
        <input type="radio" name="rating-s2" class="mask mask-star bg-warning" disabled checked />
        <input type="radio" name="rating-s2" class="mask mask-star bg-warning" disabled checked />
        <input type="radio" name="rating-s2" class="mask mask-star bg-warning" disabled checked />
        <input type="radio" name="rating-s2" class="mask mask-star bg-warning" disabled checked />
      </div>
    </div>
  </div>
</div>
```

**Features:**
- `chat-start` / `chat-end` für Alternierung
- `chat-bubble-{color}` für Theme-Farben
- Timestamps mit `chat-header`

### 6.2 Carousel Testimonials (Space-Saving)
```html
<div class="carousel carousel-center w-full space-x-4 p-4">
  <!-- Testimonial Card 1 -->
  <div class="carousel-item">
    <div class="card bg-base-100 shadow-xl w-96">
      <div class="card-body">
        <div class="flex items-center gap-4 mb-4">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img src="/testimonial-1.png" />
            </div>
          </div>
          <div>
            <h3 class="font-bold">Anna Schmidt</h3>
            <div class="rating rating-xs">
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
            </div>
          </div>
        </div>
        <p class="text-sm">
          "Nach 4 Wochen habe ich meine Produktivität verdoppelt.
          Die Techniken sind gold wert!"
        </p>
        <div class="badge badge-sm badge-ghost mt-2">Marketing Managerin</div>
      </div>
    </div>
  </div>

  <!-- Testimonial Card 2 -->
  <div class="carousel-item">
    <div class="card bg-base-100 shadow-xl w-96">
      <div class="card-body">
        <div class="flex items-center gap-4 mb-4">
          <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content w-16 rounded-full">
              <span>MK</span>
            </div>
          </div>
          <div>
            <h3 class="font-bold">Michael Krause</h3>
            <div class="rating rating-xs">
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
            </div>
          </div>
        </div>
        <p class="text-sm">
          "Endlich schaffe ich es, meine wichtigsten Projekte abzuschließen.
          Game-Changer!"
        </p>
        <div class="badge badge-sm badge-ghost mt-2">Selbstständiger</div>
      </div>
    </div>
  </div>

  <!-- Testimonial Card 3 -->
  <div class="carousel-item">
    <div class="card bg-base-100 shadow-xl w-96">
      <div class="card-body">
        <div class="flex items-center gap-4 mb-4">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img src="/testimonial-3.png" />
            </div>
          </div>
          <div>
            <h3 class="font-bold">Julia Becker</h3>
            <div class="rating rating-xs">
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
              <input type="radio" class="mask mask-star bg-warning" disabled checked />
            </div>
          </div>
        </div>
        <p class="text-sm">
          "Die Community ist unglaublich supportive. Man fühlt sich nicht allein
          auf der Reise!"
        </p>
        <div class="badge badge-sm badge-ghost mt-2">Studentin</div>
      </div>
    </div>
  </div>
</div>
```

**Features:**
- `carousel-center` für zentrierte Items
- `space-x-4` für Spacing zwischen Cards
- Horizontales Scrollen auf Mobile

---

## 7. Footer Patterns

### 7.1 Comprehensive Footer (Multi-Column)
```html
<footer class="footer bg-base-200 text-base-content p-10">
  <nav>
    <h6 class="footer-title">Kurs</h6>
    <a class="link link-hover">Kursübersicht</a>
    <a class="link link-hover">Module</a>
    <a class="link link-hover">Preise</a>
    <a class="link link-hover">FAQ</a>
  </nav>
  <nav>
    <h6 class="footer-title">Unternehmen</h6>
    <a class="link link-hover">Über uns</a>
    <a class="link link-hover">Kontakt</a>
    <a class="link link-hover">Jobs</a>
    <a class="link link-hover">Presse</a>
  </nav>
  <nav>
    <h6 class="footer-title">Rechtliches</h6>
    <a class="link link-hover">AGB</a>
    <a class="link link-hover">Datenschutz</a>
    <a class="link link-hover">Impressum</a>
    <a class="link link-hover">Widerrufsrecht</a>
  </nav>
  <nav>
    <h6 class="footer-title">Social</h6>
    <div class="grid grid-flow-col gap-4">
      <a class="link">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      </a>
      <a class="link">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      </a>
      <a class="link">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      </a>
    </div>
  </nav>
</footer>
<footer class="footer footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © 2024 - Produktivitäts-Werkstatt | Alle Rechte vorbehalten</p>
  </aside>
</footer>
```

**Features:**
- `footer-title` für Section Headers
- `link-hover` für Hover-Effect
- Zwei-stufiger Footer (Content + Copyright)

### 7.2 Newsletter Footer (CTA-fokussiert)
```html
<footer class="footer bg-neutral text-neutral-content p-10">
  <nav>
    <h6 class="footer-title">Bleib auf dem Laufenden</h6>
    <p class="max-w-xs">
      Erhalte kostenlose Produktivitäts-Tipps und exklusive Angebote.
    </p>
    <div class="join mt-4">
      <input
        type="email"
        placeholder="Deine E-Mail"
        class="input input-ghost join-item"
      />
      <button class="btn btn-primary join-item">
        Abonnieren
      </button>
    </div>
  </nav>
  <nav>
    <h6 class="footer-title">Links</h6>
    <a class="link link-hover">Kurse</a>
    <a class="link link-hover">Blog</a>
    <a class="link link-hover">Support</a>
  </nav>
  <nav>
    <h6 class="footer-title">Rechtliches</h6>
    <a class="link link-hover">Impressum</a>
    <a class="link link-hover">Datenschutz</a>
    <a class="link link-hover">AGB</a>
  </nav>
</footer>
```

**Features:**
- Newsletter-Integration mit `join`
- `bg-neutral text-neutral-content` für Kontrast

### 7.3 Minimal Footer (Clean)
```html
<footer class="footer footer-center bg-base-200 text-base-content p-10">
  <nav class="grid grid-flow-col gap-4">
    <a class="link link-hover">Über uns</a>
    <a class="link link-hover">Kontakt</a>
    <a class="link link-hover">Impressum</a>
    <a class="link link-hover">Datenschutz</a>
  </nav>
  <nav>
    <div class="grid grid-flow-col gap-4">
      <a aria-label="Twitter">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      </a>
      <a aria-label="YouTube">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      </a>
      <a aria-label="Instagram">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>
  </nav>
  <aside>
    <p>© 2024 Produktivitäts-Werkstatt. Alle Rechte vorbehalten.</p>
  </aside>
</footer>
```

**Features:**
- `footer-center` für zentrierte Ausrichtung
- Minimale Navigation
- Social Icons

---

## 8. Animation Utilities

### 8.1 Swap Animations (Icon Transitions)
```html
<!-- Hamburger Menu Toggle -->
<label class="swap swap-rotate">
  <input type="checkbox" />

  <!-- Hamburger Icon -->
  <svg class="swap-off fill-current w-8 h-8" viewBox="0 0 512 512">
    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
  </svg>

  <!-- Close Icon -->
  <svg class="swap-on fill-current w-8 h-8" viewBox="0 0 512 512">
    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/>
  </svg>
</label>

<!-- Like/Unlike Toggle -->
<label class="swap swap-rotate text-3xl">
  <input type="checkbox" />
  <div class="swap-off">🤍</div>
  <div class="swap-on">❤️</div>
</label>

<!-- Theme Toggle (Light/Dark) -->
<label class="swap swap-rotate btn btn-circle btn-ghost">
  <input type="checkbox" class="theme-controller" value="werkstatt-dark" />

  <!-- Sun Icon -->
  <svg class="swap-on fill-current w-6 h-6" viewBox="0 0 24 24">
    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
  </svg>

  <!-- Moon Icon -->
  <svg class="swap-off fill-current w-6 h-6" viewBox="0 0 24 24">
    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
  </svg>
</label>
```

**Features:**
- `swap-rotate` für Rotation Animation
- `theme-controller` für automatisches Theme Switching
- Einfache Checkbox-basierte Steuerung

### 8.2 Loading States
```html
<!-- Button mit Loading -->
<button class="btn btn-primary">
  <span class="loading loading-spinner"></span>
  Wird geladen...
</button>

<!-- Verschiedene Loading Styles -->
<span class="loading loading-spinner loading-lg text-primary"></span>
<span class="loading loading-dots loading-lg text-secondary"></span>
<span class="loading loading-ring loading-lg text-accent"></span>
<span class="loading loading-ball loading-lg text-warning"></span>
<span class="loading loading-bars loading-lg text-info"></span>
<span class="loading loading-infinity loading-lg text-success"></span>

<!-- Content Loading Skeleton -->
<div class="flex flex-col gap-4 w-full max-w-md">
  <div class="skeleton h-32 w-full"></div>
  <div class="skeleton h-4 w-28"></div>
  <div class="skeleton h-4 w-full"></div>
  <div class="skeleton h-4 w-full"></div>
</div>
```

**Features:**
- 6 verschiedene Loading-Styles
- `skeleton` für Content Loading
- Color-Klassen für Theme-Farben

### 8.3 Collapse Animations (Accordion)
```html
<!-- Details-based Collapse (keine JS nötig) -->
<details class="collapse collapse-arrow bg-base-200">
  <summary class="collapse-title text-xl font-medium">
    Was passiert nach dem Kauf?
  </summary>
  <div class="collapse-content">
    <p>Du erhältst sofort Zugang zu allen Modulen und Materialien...</p>
  </div>
</details>

<!-- Checkbox-based Collapse -->
<div class="collapse collapse-plus bg-base-200">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    Kann ich jederzeit kündigen?
  </div>
  <div class="collapse-content">
    <p>Es gibt keine Kündigungsfrist. Du kaufst einmalig...</p>
  </div>
</div>
```

**Features:**
- Native HTML `<details>` Support
- Automatische Animationen
- `collapse-arrow` oder `collapse-plus` Icons

---

## 9. Progress & Countdown Components

### 9.1 Course Progress Bar
```html
<!-- Linear Progress -->
<div class="w-full max-w-md">
  <div class="flex justify-between mb-1 text-sm">
    <span>Kurs-Fortschritt</span>
    <span class="font-semibold">67%</span>
  </div>
  <progress class="progress progress-primary" value="67" max="100"></progress>
  <p class="text-xs text-base-content/60 mt-1">8 von 12 Modulen abgeschlossen</p>
</div>

<!-- Radial Progress -->
<div class="flex flex-col items-center gap-2">
  <div
    class="radial-progress text-primary"
    style="--value:67; --size:8rem; --thickness:0.5rem;"
    role="progressbar"
    aria-valuenow="67"
  >
    67%
  </div>
  <p class="text-sm">Kurs-Fortschritt</p>
</div>

<!-- Multi-Step Progress -->
<ul class="steps w-full">
  <li class="step step-primary">Registrierung</li>
  <li class="step step-primary">Zahlung</li>
  <li class="step">Kurs-Zugang</li>
  <li class="step">Zertifikat</li>
</ul>
```

**Features:**
- `progress` für horizontale Balken
- `radial-progress` für Kreisanzeige
- `steps` für Multi-Step UI

### 9.2 Countdown Timer (Urgency)
```html
<div class="stats bg-error text-error-content shadow">
  <div class="stat">
    <div class="stat-title text-error-content/80">Angebot endet in:</div>
    <div class="stat-value font-mono">
      <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span style="--value:15;"></span>
          </span>
          Stunden
        </div>
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span style="--value:32;"></span>
          </span>
          Minuten
        </div>
        <div class="flex flex-col">
          <span class="countdown font-mono text-5xl">
            <span style="--value:47;"></span>
          </span>
          Sekunden
        </div>
      </div>
    </div>
    <div class="stat-actions">
      <button class="btn btn-sm btn-success">Jetzt zugreifen</button>
    </div>
  </div>
</div>
```

**Features:**
- `countdown` für animierte Zahlen
- Grid-Layout für strukturierte Darstellung
- Integration mit Stats für Context

---

## 10. Responsive Patterns

### 10.1 Mobile-First Grid Layouts
```html
<!-- 1 Column Mobile, 2 Columns Tablet, 3 Columns Desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">Content 1</div>
  </div>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">Content 2</div>
  </div>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">Content 3</div>
  </div>
</div>

<!-- 1 Column Mobile, 4 Columns Desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Stats oder Features -->
</div>
```

### 10.2 Responsive Navigation
```html
<!-- Desktop: Horizontal, Mobile: Dropdown -->
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Kurse</a></li>
        <li><a>Über uns</a></li>
        <li><a>Preise</a></li>
        <li><a>Blog</a></li>
      </ul>
    </div>
    <a class="btn btn-ghost text-xl">Produktivitäts-Werkstatt</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Kurse</a></li>
      <li><a>Über uns</a></li>
      <li><a>Preise</a></li>
      <li><a>Blog</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn btn-primary">Anmelden</a>
  </div>
</div>
```

### 10.3 Responsive Typography
```html
<!-- Headline: Small Mobile, Large Desktop -->
<h1 class="text-3xl md:text-5xl lg:text-7xl font-bold">
  Produktivitäts-Werkstatt
</h1>

<!-- Body Text: Responsive Sizing -->
<p class="text-sm md:text-base lg:text-lg text-base-content/80">
  Dein systematischer Weg zu fokussierter Produktivität
</p>

<!-- Container: Responsive Max Width -->
<div class="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto px-4">
  <!-- Content -->
</div>
```

---

## 11. Theme Integration (werkstatt / werkstatt-dark)

### 11.1 Color Usage Best Practices
```html
<!-- ✅ CORRECT: Use DaisyUI color names -->
<div class="bg-base-100 text-base-content">
  <h2 class="text-primary">Überschrift</h2>
  <p class="text-base-content/80">Text mit 80% Opacity</p>
  <button class="btn btn-primary">Primary Button</button>
  <button class="btn btn-secondary">Secondary Button</button>
  <button class="btn btn-accent">Accent Button</button>
</div>

<!-- ❌ WRONG: Avoid Tailwind color names -->
<div class="bg-white text-gray-800">
  <h2 class="text-blue-500">Überschrift</h2>
  <button class="bg-blue-600 text-white">Button</button>
</div>
<!-- Problem: Diese Farben ändern sich NICHT mit dem Theme -->
```

### 11.2 Automatic Theme Switching
```html
<!-- Theme Controller Button -->
<div class="flex gap-2">
  <input
    type="radio"
    name="theme-controller"
    class="theme-controller btn btn-sm"
    aria-label="Light"
    value="werkstatt"
  />
  <input
    type="radio"
    name="theme-controller"
    class="theme-controller btn btn-sm"
    aria-label="Dark"
    value="werkstatt-dark"
  />
</div>

<!-- Theme Dropdown -->
<div class="dropdown">
  <div tabindex="0" role="button" class="btn btn-ghost">
    Theme
    <svg class="fill-current" width="12" height="12" viewBox="0 0 12 12">
      <path d="M6 9L1 4h10z"/>
    </svg>
  </div>
  <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-2xl">
    <li>
      <input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Werkstatt Light" value="werkstatt"/>
    </li>
    <li>
      <input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Werkstatt Dark" value="werkstatt-dark"/>
    </li>
  </ul>
</div>
```

### 11.3 Theme-Aware Shadows & Borders
```html
<!-- Card mit automatischen Theme-Schatten -->
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <!-- Content -->
  </div>
</div>

<!-- Border mit Theme-Farben -->
<div class="border border-base-300 rounded-lg p-4">
  <!-- Content -->
</div>

<!-- Divider mit Theme-Farbe -->
<div class="divider divider-neutral"></div>
```

---

## 12. Accessibility Features

### 12.1 Screen Reader Support
```html
<!-- Button mit aria-label -->
<button class="btn btn-circle" aria-label="Menü öffnen">
  <svg class="w-6 h-6">...</svg>
</button>

<!-- Link mit aria-label bei Icon-only -->
<a href="#" class="btn btn-ghost btn-circle" aria-label="Twitter">
  <svg>...</svg>
</a>

<!-- Progress mit aria-valuenow -->
<div
  class="radial-progress text-primary"
  style="--value:70;"
  role="progressbar"
  aria-valuenow="70"
  aria-valuemin="0"
  aria-valuemax="100"
>
  70%
</div>

<!-- Alert mit role -->
<div role="alert" class="alert alert-warning">
  <svg class="w-6 h-6">...</svg>
  <span>Bitte bestätige deine E-Mail!</span>
</div>
```

### 12.2 Keyboard Navigation
```html
<!-- Dropdown mit tabindex -->
<details class="dropdown">
  <summary tabindex="0" class="btn">Menü</summary>
  <ul tabindex="-1" class="dropdown-content menu">
    <li><button>Option 1</button></li>
    <li><button>Option 2</button></li>
  </ul>
</details>

<!-- Skip to content Link -->
<a href="#main-content" class="btn btn-sm sr-only focus:not-sr-only">
  Skip to content
</a>

<main id="main-content">
  <!-- Page content -->
</main>
```

---

## 13. Performance Best Practices

### 13.1 Image Loading
```html
<!-- Lazy Loading für Hero Images -->
<figure>
  <img
    src="/course-thumbnail.jpg"
    alt="Kurs Thumbnail"
    loading="lazy"
    class="w-full h-auto"
  />
</figure>

<!-- Avatar mit Placeholder -->
<div class="avatar placeholder">
  <div class="bg-neutral text-neutral-content w-16 rounded-full">
    <span>JD</span>
  </div>
</div>
```

### 13.2 Efficient Layouts
```html
<!-- Use Grid statt Flex für komplexe Layouts -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <!-- Automatisches Responsive Layout -->
</div>

<!-- Conditional Rendering mit CSS statt JS -->
<div class="hidden lg:flex">
  <!-- Nur auf Desktop sichtbar -->
</div>

<div class="flex lg:hidden">
  <!-- Nur auf Mobile sichtbar -->
</div>
```

---

## 14. Implementation Checklist

### Phase 1: Foundation
- [ ] Implement Hero Section with Text Rotation
- [ ] Add Stats Display for Social Proof
- [ ] Create Basic Course Module Cards Grid
- [ ] Implement FAQ Accordion

### Phase 2: Conversion Elements
- [ ] Add Primary CTA Buttons throughout
- [ ] Implement Pricing Cards
- [ ] Add Testimonial Carousel
- [ ] Create Newsletter Footer

### Phase 3: Enhancements
- [ ] Add Progress Indicators
- [ ] Implement Theme Switcher
- [ ] Add Loading States
- [ ] Optimize for Accessibility

### Phase 4: Polish
- [ ] Add Animations (Swap, Collapse)
- [ ] Implement Countdown Timer
- [ ] Add Hover Effects
- [ ] Final Responsive Testing

---

## 15. Key DaisyUI 5 Rules

1. **Color Names**: ONLY use DaisyUI color names (`primary`, `secondary`, `accent`, `base-100`, etc.) - NO Tailwind colors (`red-500`, `blue-600`)

2. **Responsive Modifiers**: Use `sm:`, `md:`, `lg:`, `xl:` for responsive breakpoints
   - Mobile: 640px (sm:)
   - Tablet: 768px (md:)
   - Desktop: 1024px (lg:)
   - Large: 1280px (xl:)

3. **Component Structure**: Follow DaisyUI hierarchy
   - Component class (required): `btn`, `card`, `alert`
   - Part classes (optional): `card-body`, `stat-value`
   - Modifier classes (optional): `btn-primary`, `alert-info`

4. **Theme Switching**: Use `theme-controller` class on inputs to enable automatic theme switching

5. **No Custom CSS**: Avoid writing custom CSS - use DaisyUI + Tailwind utility classes

6. **Accessibility**: Always add `aria-label`, `role`, and proper semantic HTML

---

## Conclusion

Dieser Report bietet eine vollständige Übersicht aller relevanten DaisyUI 5 Komponenten für die Landing Page Optimierung der Produktivitäts-Werkstatt. Alle Code-Snippets sind:

- ✅ DaisyUI 5 kompatibel
- ✅ Theme-aware (werkstatt/werkstatt-dark)
- ✅ Mobile-first & responsive
- ✅ Accessibility-optimiert
- ✅ Performance-optimiert

**Nächste Schritte:**
1. Implementation gemäß Checklist (Phase 1-4)
2. Testing auf Mobile/Tablet/Desktop
3. Theme-Switching validieren
4. Performance-Audit durchführen

---

*Report erstellt: 2024-12-08*
*DaisyUI Version: 5.5.x*
*Zielgruppe: Landing Page Optimierung*
