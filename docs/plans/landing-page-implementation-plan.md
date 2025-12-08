# Landing Page Implementation Plan - Produktivitäts-Werkstatt
## Comprehensive Implementation Guide for Developer

**Created:** 8. Dezember 2025
**For:** Next.js + DaisyUI 5 Landing Page Redesign
**Current File:** `/app/page.tsx`

---

## 🎯 EXECUTIVE SUMMARY

This plan provides **step-by-step instructions** to transform the current landing page using **DaisyUI 5 components** while maintaining the existing theme system (`werkstatt` / `werkstatt-dark`), color palette, and fonts.

**Key Principles:**
- ✅ Keep existing theme configuration (no changes to tailwind.config)
- ✅ Use ONLY DaisyUI 5 classes (no Tailwind color classes like `red-500`)
- ✅ Maintain current fonts (Fraunces, Source Serif 4)
- ✅ Leverage existing assets (testimonial images, trainer photo)
- ✅ Follow conversion optimization recommendations

---

## 📊 CONSTRAINTS (DO NOT CHANGE)

### Theme System
```javascript
// These REMAIN UNCHANGED
themes: ["werkstatt", "werkstatt-dark"]
```

### Color Palette (Use These DaisyUI Names)
- `primary` - Main brand color
- `secondary` - Secondary brand color
- `accent` - Accent/highlight color
- `base-100` - Background white
- `base-200` - Light gray background
- `base-300` - Border color
- `base-content` - Text color
- `base-content/60`, `base-content/70`, `base-content/80` - Opacity variants

### Fonts (Already Configured)
- **Display/Headlines:** `font-display` (Fraunces)
- **Body:** Default (Source Serif 4)

### Available Assets
```
✅ /public/trainer-lukas.jpg
✅ /public/testimonials/1.png
✅ /public/testimonials/2.png
✅ /public/testimonials/3.png
✅ /public/testimonials/4.png
✅ /public/testimonials/carsten-hunold.jpg
✅ /public/Produktivitäts-Werkstatt Hintergrund 1 - Morgenlich Bergtal(1).png
✅ /public/produktivitaets-werkstatt-hero.png
```

---

## 🔥 PRIORITY CHANGES (Based on Conversion Optimizer Report)

### CRITICAL (Must Implement)
1. **Hero Section:** Add rotating text animation (DaisyUI `text-rotate`)
2. **Social Proof:** Move testimonials higher (marquee after hero)
3. **Stats Display:** Add prominent stats with `stats` component
4. **Pricing Card:** Enhance with better hierarchy and trust badges
5. **CTA Buttons:** Make more prominent with `btn-lg` and shadows

### IMPORTANT (Should Implement)
6. **Problem/Solution:** Clearer visual contrast
7. **Trainer Section:** Add credentials with badges
8. **FAQ:** Use `collapse-arrow` for better UX
9. **Curriculum:** Card-based module display
10. **Final CTA:** More urgent/compelling

### NICE-TO-HAVE (Optional)
11. **Animations:** Subtle hover effects on cards
12. **Progress Indicators:** For curriculum phases
13. **Video Preview:** If available
14. **Additional Testimonials:** Carousel component

---

## 📐 SECTION-BY-SECTION IMPLEMENTATION

### SECTION 1: HERO SECTION

**Current State:**
- Simple centered text with gradient background
- Static headline
- Basic CTAs

**Changes Required:**
1. Add text rotation effect (DaisyUI `text-rotate`)
2. Enhance stats display with `stats` component
3. Add background image overlay
4. Improve CTA button styling

**Implementation:**

```tsx
{/* HERO SECTION - Enhanced with DaisyUI 5 */}
<section className="hero min-h-screen" style={{ backgroundImage: "url('/Produktivitäts-Werkstatt Hintergrund 1 - Morgenlich Bergtal(1).png')" }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center">
    <div className="max-w-4xl">
      {/* Trainer Badge */}
      <div className="badge badge-lg badge-primary gap-2 mb-6">
        <div className="avatar">
          <div className="w-6 rounded-full">
            <Image src="/trainer-lukas.jpg" alt="Lukas" width={24} height={24} />
          </div>
        </div>
        Ein Kurs von Lukas Zangerl
      </div>

      {/* Rotating Headline - DaisyUI 5 Feature */}
      <h1 className="text-5xl md:text-7xl font-bold text-primary-content mb-6">
        Verdopple deine
        <span className="text-rotate">
          <span className="justify-items-center">
            <span className="text-accent">Produktivität</span>
            <span className="text-secondary">Effizienz</span>
            <span className="text-accent">Fokuszeit</span>
            <span className="text-secondary">Lebensqualität</span>
          </span>
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-xl md:text-2xl text-primary-content/80 mb-8 max-w-2xl mx-auto">
        Das 12-Wochen Lebensproduktivitätssystem.<br />
        Wissenschaftlich fundiert. Praxiserprobt. Messbar.
      </p>

      {/* CTAs - Enhanced */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <button className="btn btn-accent btn-lg px-10 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all">
          Jetzt starten
          <ArrowRight className="w-5 h-5" />
        </button>
        <button className="btn btn-outline btn-lg px-10">
          Mehr erfahren
        </button>
      </div>

      {/* Stats - DaisyUI Component */}
      <div className="stats shadow bg-base-100/90 backdrop-blur">
        <div className="stat place-items-center">
          <div className="stat-title">Teilnehmer</div>
          <div className="stat-value text-accent">80+</div>
          <div className="stat-desc">Erfolgreich abgeschlossen</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Verbesserung</div>
          <div className="stat-value text-secondary">92%</div>
          <div className="stat-desc">Nach 18 Tagen messbar</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Zufriedenheit</div>
          <div className="stat-value text-primary">4.9/5</div>
          <div className="stat-desc">⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**DaisyUI Classes Used:**
- `hero`, `hero-overlay`, `hero-content` - Hero layout
- `text-rotate` - Rotating text animation (NEW in DaisyUI 5)
- `stats`, `stat`, `stat-value`, `stat-title`, `stat-desc` - Stats display
- `btn-lg`, `shadow-2xl` - Enhanced buttons
- `badge-lg` - Larger badges

**What Stays:**
- Font classes (`font-display`)
- Image components (Next.js Image)
- Layout structure (responsive classes)

**What Changes:**
- ✅ Add rotating text for dynamic hero
- ✅ Add stats component for social proof
- ✅ Enhance CTA buttons with shadows
- ✅ Add background image with overlay

---

### SECTION 2: TESTIMONIALS MARQUEE

**Current State:**
- Basic marquee with testimonial cards
- Simple card styling

**Changes Required:**
1. Use DaisyUI `carousel` component instead of custom marquee
2. Add `rating` component for stars
3. Enhance card styling with DaisyUI classes

**Implementation:**

```tsx
{/* TESTIMONIALS - DaisyUI Carousel */}
<section className="py-20 bg-base-200">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
      Was Teilnehmer sagen
    </h2>

    {/* DaisyUI Carousel */}
    <div className="carousel carousel-center w-full space-x-4 p-4">
      {testimonials.map((testimonial, i) => (
        <div key={i} className="carousel-item">
          <div className="card bg-base-100 shadow-xl w-96">
            <div className="card-body">
              {/* Avatar + Rating */}
              <div className="flex items-start gap-4 mb-4">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} />
                    ) : (
                      <div className="bg-accent/10 flex items-center justify-center h-full">
                        <span className="text-2xl text-accent">{testimonial.name[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  {testimonial.title && (
                    <p className="text-sm text-base-content/60">{testimonial.title}</p>
                  )}
                  {/* DaisyUI Rating */}
                  <div className="rating rating-sm mt-1">
                    <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
                    <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
                    <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
                    <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
                    <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-base-content/70">
                "{testimonial.quote}"
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**DaisyUI Classes Used:**
- `carousel`, `carousel-center`, `carousel-item` - Carousel layout
- `rating`, `rating-sm`, `mask-star-2` - Star ratings
- `avatar` - Circular avatars
- `card`, `card-body` - Card structure

**What Stays:**
- Testimonial data array
- Image components
- Responsive spacing

**What Changes:**
- ✅ Replace custom marquee with DaisyUI carousel
- ✅ Add star ratings (visual improvement)
- ✅ Better card styling with shadows

---

### SECTION 3: PROBLEM/SOLUTION

**Current State:**
- Simple two-column layout
- Basic list styling

**Changes Required:**
1. Add visual indicators (icons)
2. Use DaisyUI `divider` for separation
3. Enhance contrast between "Before" and "After"

**Implementation:**

```tsx
{/* PROBLEM/SOLUTION - Enhanced */}
<section className="py-24 md:py-32 px-6 bg-base-100">
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="font-display text-3xl md:text-5xl font-bold text-base-content mb-4">
        Produktivität ohne <span className="line-through text-base-content/30">Chaos</span>
      </h2>
      <p className="text-xl text-base-content/60">
        Von reaktiv zu proaktiv — in 12 Wochen
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12">
      {/* Before - DaisyUI Card */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6 text-base-content/50">
            ❌ Ohne System
          </h3>
          <ul className="space-y-4">
            {[
              "47 verschiedene Apps ausprobiert",
              "Stundenlange YouTube-Videos",
              "Systeme, die niemand durchhält",
              "Schlechtes Gewissen am Abend",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-base-content/20 flex-shrink-0" />
                <span className="text-base-content/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* After - DaisyUI Card with Accent */}
      <div className="card bg-accent/5 shadow-xl border-2 border-accent/20">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6 text-accent">
            ✓ Mit der Werkstatt
          </h3>
          <ul className="space-y-4">
            {[
              "Ein System, das zum Leben passt",
              "15-30 Min täglich reichen aus",
              "Messbare Ergebnisse nach 18 Tagen",
              "Energie statt Erschöpfung",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-base-content font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="divider divider-accent my-12">12 Wochen Transformation</div>
  </div>
</section>
```

**DaisyUI Classes Used:**
- `card`, `card-body`, `card-title` - Card components
- `divider`, `divider-accent` - Visual separator
- `bg-accent/5`, `border-accent/20` - Subtle accent colors

**What Stays:**
- Content text
- Icon components (lucide-react)
- Grid layout

**What Changes:**
- ✅ Use DaisyUI cards instead of plain divs
- ✅ Add visual contrast (accent card for "After")
- ✅ Add divider between sections

---

### SECTION 4: CURRICULUM

**Current State:**
- Basic phase cards with badges
- Simple hover effects

**Changes Required:**
1. Use DaisyUI `timeline` component for progression
2. Add `badge` components for tags
3. Enhance card styling

**Implementation:**

```tsx
{/* CURRICULUM - DaisyUI Timeline */}
<section id="curriculum" className="py-24 md:py-32 px-6 bg-base-200">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-16">
      <div className="badge badge-accent badge-lg mb-4">12 Wochen</div>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-base-content mb-4">
        Dein Weg zur Produktivitäts-Meisterschaft
      </h2>
      <p className="text-lg text-base-content/60">
        Systematisch. Praxiserprobt. Messbar.
      </p>
    </div>

    {/* DaisyUI Timeline */}
    <ul className="timeline timeline-vertical">
      {/* Phase 1 */}
      <li>
        <div className="timeline-start timeline-box bg-base-100 shadow-lg">
          <div className="badge badge-accent mb-2">Phase 1</div>
          <h3 className="text-xl font-bold mb-2">Das Fundament</h3>
          <p className="text-sm text-base-content/60 mb-4">Woche 1–3</p>
          <div className="flex flex-wrap gap-2">
            <div className="badge badge-outline">Lebensproduktivitätssystem</div>
            <div className="badge badge-outline">Fokus-Logbuch</div>
            <div className="badge badge-outline">Erste Fokuszeiten</div>
          </div>
        </div>
        <div className="timeline-middle">
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <hr className="bg-accent" />
      </li>

      {/* Phase 2 */}
      <li>
        <hr className="bg-accent" />
        <div className="timeline-middle">
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="timeline-end timeline-box bg-base-100 shadow-lg">
          <div className="badge badge-secondary mb-2">Phase 2</div>
          <h3 className="text-xl font-bold mb-2">Der Rhythmus</h3>
          <p className="text-sm text-base-content/60 mb-4">Woche 4–7</p>
          <div className="flex flex-wrap gap-2">
            <div className="badge badge-outline">Dein idealer Tag</div>
            <div className="badge badge-outline">Wochenplanung</div>
            <div className="badge badge-outline">Quartalsrückblick</div>
          </div>
        </div>
        <hr className="bg-accent" />
      </li>

      {/* Phase 3 */}
      <li>
        <hr className="bg-accent" />
        <div className="timeline-start timeline-box bg-base-100 shadow-lg">
          <div className="badge badge-primary mb-2">Phase 3</div>
          <h3 className="text-xl font-bold mb-2">Die Meisterschaft</h3>
          <p className="text-sm text-base-content/60 mb-4">Woche 8–12</p>
          <div className="flex flex-wrap gap-2">
            <div className="badge badge-outline">Produktives Mindset</div>
            <div className="badge badge-outline">Energie-Management</div>
            <div className="badge badge-outline">System-Integration</div>
          </div>
        </div>
        <div className="timeline-middle">
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </li>
    </ul>

    {/* Summary Stats */}
    <div className="stats stats-vertical lg:stats-horizontal shadow mt-12 w-full">
      <div className="stat place-items-center">
        <div className="stat-title">Video-Lektionen</div>
        <div className="stat-value text-accent">{totalLessons}</div>
        <div className="stat-desc">In 12 Modulen</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Arbeitsblätter</div>
        <div className="stat-value text-secondary">45+</div>
        <div className="stat-desc">PDF Downloads</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Community</div>
        <div className="stat-value text-primary">24/7</div>
        <div className="stat-desc">Support & Co-Working</div>
      </div>
    </div>
  </div>
</section>
```

**DaisyUI Classes Used:**
- `timeline`, `timeline-vertical`, `timeline-box` - Timeline component (NEW in DaisyUI 5)
- `timeline-start`, `timeline-end`, `timeline-middle` - Timeline positioning
- `badge`, `badge-outline` - Tag badges
- `stats`, `stats-vertical`, `stats-horizontal` - Stats display

**What Stays:**
- Phase content and structure
- Responsive grid classes
- Icon usage

**What Changes:**
- ✅ Replace custom cards with DaisyUI timeline
- ✅ Add visual progression indicators
- ✅ Add summary stats at bottom

---

### SECTION 5: TRAINER

**Current State:**
- Simple flex layout with avatar and text
- Basic styling

**Changes Required:**
1. Add credentials with `badge` components
2. Use `card` component for better structure
3. Add social proof badges

**Implementation:**

```tsx
{/* TRAINER - Enhanced with Badges */}
<section className="py-24 md:py-32 px-6 bg-base-100">
  <div className="max-w-4xl mx-auto">
    <div className="card lg:card-side bg-base-200 shadow-xl">
      <figure className="lg:w-2/5">
        <img
          src="/trainer-lukas.jpg"
          alt="Lukas Zangerl"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body lg:w-3/5">
        <div className="badge badge-accent mb-2">Dein Trainer</div>
        <h2 className="card-title text-3xl md:text-4xl">
          Hey, ich bin Lukas 👋
        </h2>

        {/* Credentials Badges */}
        <div className="flex flex-wrap gap-2 my-4">
          <div className="badge badge-primary badge-lg">Ex-Linienpilot</div>
          <div className="badge badge-secondary badge-lg">NLP Master Trainer</div>
          <div className="badge badge-accent badge-lg">Burnout-Coach</div>
          <div className="badge badge-ghost badge-lg">10+ Jahre Erfahrung</div>
        </div>

        {/* Story */}
        <p className="text-base-content/70 mb-4">
          Ex-Pilot, NLP Master Trainer und Produktivitäts-Coach. Nach meinem eigenen
          Burnout wurde mir klar: <strong className="text-base-content">Produktivität ohne
          System ist wie Fliegen ohne Kompass.</strong>
        </p>
        <p className="text-base-content/70">
          Also habe ich die Produktivitäts-Werkstatt entwickelt — mit allem, was ich
          gelernt habe. Mittlerweile haben <span className="text-accent font-semibold">80+ Teilnehmer</span> damit
          ihre Produktivität transformiert.
        </p>

        {/* Stats */}
        <div className="stats shadow mt-6">
          <div className="stat">
            <div className="stat-title">Teilnehmer gecoacht</div>
            <div className="stat-value text-accent">80+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Jahre Erfahrung</div>
            <div className="stat-value text-secondary">10+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**DaisyUI Classes Used:**
- `card`, `card-side`, `card-body` - Horizontal card layout
- `badge-lg` - Larger badges for credentials
- `stats` - Stats display for achievements

**What Stays:**
- Trainer image and bio text
- Layout structure
- Responsive classes

**What Changes:**
- ✅ Add credential badges (visual authority)
- ✅ Use card component for better structure
- ✅ Add stats for achievements

---

### SECTION 6: PRICING

**Current State:**
- Single pricing card with features list
- Basic trust badges

**Changes Required:**
1. Enhance card with `card-compact` or premium styling
2. Add `countdown` timer for urgency (optional)
3. Better visual hierarchy for price
4. Use `stat-actions` for CTAs

**Implementation:**

```tsx
{/* PRICING - Enhanced with DaisyUI */}
<section id="pricing" className="py-24 md:py-32 px-6 bg-base-200">
  <div className="max-w-xl mx-auto">
    <div className="text-center mb-12">
      <div className="badge badge-accent badge-lg mb-4">Begrenztes Angebot</div>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-base-content mb-4">
        Einmal zahlen.<br />Für immer lernen.
      </h2>
      <p className="text-lg text-base-content/60">
        Kein Abo. Lebenslanger Zugang. Alle Updates inklusive.
      </p>
    </div>

    {/* Pricing Card - Featured */}
    <div className="card bg-base-100 shadow-2xl border-4 border-accent relative overflow-hidden">
      {/* Popular Badge */}
      <div className="absolute top-0 right-0 badge badge-accent badge-lg rounded-none rounded-bl-2xl">
        BESTSELLER
      </div>

      <div className="card-body p-8">
        {/* Price with Stats Component */}
        <div className="stats bg-accent/10 shadow mb-6">
          <div className="stat">
            <div className="stat-title text-center">Normalpreis</div>
            <div className="stat-value text-center line-through text-base-content/40">€549</div>
          </div>
          <div className="stat">
            <div className="stat-title text-center">Heute nur</div>
            <div className="stat-value text-center text-accent text-6xl">€299</div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-base-content/60">Einmalige Zahlung — Lebenslanger Zugang</p>
        </div>

        <div className="divider divider-accent">Alles inklusive</div>

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {[
            { icon: <PlayCircle className="w-5 h-5" />, text: `${totalLessons} Video-Lektionen`, badge: "12 Module" },
            { icon: <BookOpen className="w-5 h-5" />, text: "Interaktives Workbook", badge: "PDF" },
            { icon: <Users className="w-5 h-5" />, text: "Community-Zugang", badge: "Exklusiv" },
            { icon: <Clock className="w-5 h-5" />, text: "Wöchentliche Fokus-Sessions", badge: "Live" },
            { icon: <RefreshCw className="w-5 h-5" />, text: "Lebenslange Updates", badge: "Kostenlos" },
          ].map((feature, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-accent">{feature.icon}</span>
                <span className="text-base-content">{feature.text}</span>
              </div>
              <div className="badge badge-ghost badge-sm">{feature.badge}</div>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="card-actions">
          <button className="btn btn-accent btn-lg btn-block shadow-xl hover:shadow-accent/50 hover:scale-105 transition-all">
            Jetzt starten
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-base-200">
          <div className="tooltip" data-tip="SSL-verschlüsselte Zahlung">
            <span className="flex items-center gap-2 text-sm text-base-content/60">
              <Shield className="w-4 h-4 text-success" />
              Sichere Zahlung
            </span>
          </div>
          <div className="tooltip" data-tip="Geld-zurück ohne Fragen">
            <span className="flex items-center gap-2 text-sm text-base-content/60">
              <RotateCcw className="w-4 h-4 text-info" />
              30 Tage Garantie
            </span>
          </div>
        </div>

        {/* Optional: Countdown Timer for Urgency */}
        {/*
        <div className="alert alert-warning mt-6">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-bold">Angebot endet in:</h4>
            <div className="countdown text-2xl">
              <span style={{ "--value": 15 } as any}></span>h
              <span style={{ "--value": 32 } as any}></span>m
              <span style={{ "--value": 47 } as any}></span>s
            </div>
          </div>
        </div>
        */}
      </div>
    </div>

    {/* Money-Back Guarantee Card */}
    <div className="card bg-success/10 shadow-lg mt-8">
      <div className="card-body text-center py-6">
        <div className="flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 text-success" />
          <div>
            <h4 className="font-bold text-lg">30-Tage-Geld-zurück-Garantie</h4>
            <p className="text-sm text-base-content/60">Risikofrei testen. Geld zurück ohne Fragen.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**DaisyUI Classes Used:**
- `stats` - For price comparison
- `divider`, `divider-accent` - Visual separation
- `badge-ghost`, `badge-sm` - Feature tags
- `tooltip` - Hover tooltips for trust badges
- `alert`, `alert-warning` - Urgency message (optional)
- `countdown` - Countdown timer (optional)
- `card-actions` - Button container

**What Stays:**
- Pricing structure
- Feature list content
- CTA button functionality

**What Changes:**
- ✅ Enhanced price display with stats
- ✅ Add feature badges for clarity
- ✅ Better visual hierarchy
- ✅ Optional countdown timer
- ✅ Guarantee as separate card

---

### SECTION 7: FAQ

**Current State:**
- Basic collapse with custom styling
- Simple question/answer format

**Changes Required:**
1. Use DaisyUI `collapse-arrow` for better UX
2. Add icon support in titles
3. Better visual hierarchy

**Implementation:**

```tsx
{/* FAQ - DaisyUI Collapse */}
<section id="faq" className="py-24 md:py-32 px-6 bg-base-100">
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-base-content mb-4">
        Häufige Fragen
      </h2>
      <p className="text-base-content/60">
        Alle Antworten auf deine wichtigsten Fragen
      </p>
    </div>

    <div className="space-y-4">
      {[
        {
          q: "Für wen ist der Kurs geeignet?",
          a: "Für Wissensarbeiter, Selbstständige, Unternehmer und alle, die nicht nur effizienter werden wollen, sondern ihr Leben in Balance bringen möchten.",
        },
        {
          q: "Wie viel Zeit muss ich investieren?",
          a: "15-30 Minuten täglich für die wöchentlichen Experimente. Die Video-Lektionen dauern je 5-15 Minuten. Du bestimmst das Tempo.",
        },
        {
          q: "Was ist die Geld-zurück-Garantie?",
          a: "Wenn du innerhalb von 30 Tagen nicht zufrieden bist, erstatten wir dir den vollen Kaufpreis. Keine Fragen, kein Kleingedrucktes.",
        },
        {
          q: "Wie lange habe ich Zugang?",
          a: "Lebenslang. Einmal zahlen, für immer lernen. Inklusive aller zukünftigen Updates.",
        },
        {
          q: "Funktioniert das wirklich?",
          a: "Ja. Der Produktivitäts-Katalyst misst deine Verbesserung wissenschaftlich. Im Durchschnitt sehen Teilnehmer nach 18 Tagen eine Verbesserung von 92%.",
        },
      ].map((item, i) => (
        <div key={i} className="collapse collapse-arrow bg-base-200 rounded-2xl shadow-sm">
          <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
          <div className="collapse-title text-lg font-semibold text-base-content">
            {item.q}
          </div>
          <div className="collapse-content text-base-content/70">
            <p className="pt-2">{item.a}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Contact Card */}
    <div className="card bg-base-200 shadow-lg mt-12">
      <div className="card-body text-center py-6">
        <h4 className="font-bold">Noch Fragen?</h4>
        <p className="text-sm text-base-content/60 mb-4">
          Schreibe mir eine E-Mail — ich antworte persönlich.
        </p>
        <a
          href="mailto:lukas@zangerl.at"
          className="btn btn-accent btn-sm"
        >
          E-Mail senden
        </a>
      </div>
    </div>
  </div>
</section>
```

**DaisyUI Classes Used:**
- `collapse`, `collapse-arrow` - Collapsible accordion
- `collapse-title`, `collapse-content` - Collapse structure
- Radio inputs for "only one open" behavior

**What Stays:**
- FAQ content
- Question/answer structure
- Responsive spacing

**What Changes:**
- ✅ Use DaisyUI collapse component
- ✅ Better visual hierarchy
- ✅ Add contact card at bottom

---

### SECTION 8: FINAL CTA

**Current State:**
- Simple centered text with button
- Basic styling

**Changes Required:**
1. Add urgency elements
2. Use `alert` component for special offer
3. Better button styling

**Implementation:**

```tsx
{/* FINAL CTA - Enhanced */}
<section className="py-24 md:py-32 px-6 bg-gradient-to-br from-accent/10 via-base-200 to-secondary/10">
  <div className="max-w-3xl mx-auto text-center">
    {/* Alert Badge */}
    <div className="alert alert-accent shadow-lg mb-8 max-w-md mx-auto">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span className="font-semibold">Nur noch heute: €299 statt €549</span>
    </div>

    <h2 className="font-display text-4xl md:text-6xl font-bold text-base-content mb-6">
      Bereit für echte<br />Produktivität?
    </h2>
    <p className="text-xl text-base-content/70 mb-10 max-w-xl mx-auto">
      Hör auf zu planen. Fang an zu handeln.<br />
      80+ Teilnehmer haben bereits ihre Produktivität transformiert.
    </p>

    {/* CTA Button Group */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <a
        href="#pricing"
        className="btn btn-accent btn-lg px-12 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all gap-2"
      >
        Jetzt starten
        <ArrowRight className="w-5 h-5" />
      </a>
      <a
        href="#curriculum"
        className="btn btn-outline btn-lg px-8"
      >
        Nochmal ansehen
      </a>
    </div>

    {/* Trust Indicators */}
    <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-base-content/50">
      <span className="flex items-center gap-2">
        <Check className="w-4 h-4 text-success" />
        30 Tage Garantie
      </span>
      <span className="flex items-center gap-2">
        <Check className="w-4 h-4 text-success" />
        Lebenslanger Zugang
      </span>
      <span className="flex items-center gap-2">
        <Check className="w-4 h-4 text-success" />
        Sichere Zahlung
      </span>
    </div>
  </div>
</section>
```

**DaisyUI Classes Used:**
- `alert`, `alert-accent` - Urgency message
- `btn-lg` - Large button
- Gradient backgrounds with theme colors

**What Stays:**
- CTA text
- Link functionality
- Icon components

**What Changes:**
- ✅ Add alert for urgency
- ✅ Enhance button styling
- ✅ Add trust indicators
- ✅ Better visual hierarchy

---

### SECTION 9: FOOTER

**Current State:**
- Simple footer with links
- Basic layout

**Changes Required:**
1. Use DaisyUI `footer` component
2. Add social media icons (optional)
3. Better structure

**Implementation:**

```tsx
{/* FOOTER - DaisyUI Component */}
<footer className="footer footer-center bg-base-200 text-base-content p-10">
  <div className="grid grid-flow-col gap-4">
    <Link href="/impressum" className="link link-hover">Impressum</Link>
    <Link href="/privacy-policy" className="link link-hover">Datenschutz</Link>
    <Link href="/tos" className="link link-hover">AGB</Link>
    <Link href="/widerruf" className="link link-hover">Widerrufsrecht</Link>
  </div>

  {/* Optional: Social Media */}
  {/*
  <div>
    <div className="grid grid-flow-col gap-4">
      <a className="btn btn-ghost btn-circle">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          LinkedIn Icon
        </svg>
      </a>
      <a className="btn btn-ghost btn-circle">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          Twitter Icon
        </svg>
      </a>
    </div>
  </div>
  */}

  <aside>
    <p className="font-display font-bold text-lg">Die Produktivitäts-Werkstatt</p>
    <p className="text-sm text-base-content/60">
      © {new Date().getFullYear()} — Von Lukas Zangerl mit ❤️ erstellt
    </p>
  </aside>
</footer>
```

**DaisyUI Classes Used:**
- `footer`, `footer-center` - Footer component
- `link`, `link-hover` - Link styling
- `btn-ghost`, `btn-circle` - Social media buttons (optional)

**What Stays:**
- Footer links
- Copyright text
- Next.js Link components

**What Changes:**
- ✅ Use DaisyUI footer component
- ✅ Better structure and spacing
- ✅ Optional social media icons

---

## 🎨 CODE SNIPPETS TO REUSE

### Text Rotation Animation (DaisyUI 5)

```tsx
<h1 className="text-7xl font-bold">
  Werde
  <span className="text-rotate">
    <span className="justify-items-center">
      <span className="text-primary">produktiver</span>
      <span className="text-secondary">fokussierter</span>
      <span className="text-accent">effizienter</span>
    </span>
  </span>
</h1>
```

### Stats Component Patterns

```tsx
{/* Horizontal Stats */}
<div className="stats shadow">
  <div className="stat">
    <div className="stat-title">Teilnehmer</div>
    <div className="stat-value text-primary">80+</div>
    <div className="stat-desc">Erfolgreich</div>
  </div>
</div>

{/* Vertical to Horizontal (Responsive) */}
<div className="stats stats-vertical lg:stats-horizontal shadow">
  {/* ... */}
</div>

{/* Stats with Icon */}
<div className="stat">
  <div className="stat-figure text-primary">
    <svg className="w-8 h-8">...</svg>
  </div>
  <div className="stat-title">Titel</div>
  <div className="stat-value">Wert</div>
</div>
```

### Card Patterns

```tsx
{/* Basic Card */}
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Titel</h2>
    <p>Inhalt</p>
  </div>
</div>

{/* Card with Image */}
<div className="card bg-base-100 shadow-xl">
  <figure>
    <img src="..." alt="..." />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Titel</h2>
  </div>
</div>

{/* Card Side (Horizontal) */}
<div className="card lg:card-side bg-base-200 shadow-xl">
  <figure>
    <img src="..." alt="..." />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Titel</h2>
  </div>
</div>

{/* Featured Card */}
<div className="card bg-accent text-accent-content shadow-2xl">
  <div className="card-body">
    <h2 className="card-title">Featured</h2>
  </div>
</div>
```

### Badge Patterns

```tsx
{/* Basic Badges */}
<div className="badge">Neutral</div>
<div className="badge badge-primary">Primary</div>
<div className="badge badge-secondary">Secondary</div>
<div className="badge badge-accent">Accent</div>
<div className="badge badge-ghost">Ghost</div>

{/* Sizes */}
<div className="badge badge-sm">Small</div>
<div className="badge badge-md">Medium</div>
<div className="badge badge-lg">Large</div>

{/* Outline */}
<div className="badge badge-outline">Outline</div>
```

### Timeline Component

```tsx
<ul className="timeline timeline-vertical">
  <li>
    <div className="timeline-start timeline-box">Content</div>
    <div className="timeline-middle">
      <svg>...</svg>
    </div>
    <hr className="bg-primary" />
  </li>
  <li>
    <hr className="bg-primary" />
    <div className="timeline-end timeline-box">Content</div>
    <div className="timeline-middle">
      <svg>...</svg>
    </div>
  </li>
</ul>
```

### Carousel Component

```tsx
<div className="carousel carousel-center w-full space-x-4 p-4">
  <div className="carousel-item">
    <div className="card w-96">...</div>
  </div>
  <div className="carousel-item">
    <div className="card w-96">...</div>
  </div>
</div>
```

### Collapse/Accordion

```tsx
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion" checked />
  <div className="collapse-title text-xl font-medium">
    Titel
  </div>
  <div className="collapse-content">
    <p>Inhalt</p>
  </div>
</div>
```

### Rating Component

```tsx
<div className="rating rating-sm">
  <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
  <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
  <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
  <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
  <input type="radio" className="mask mask-star-2 bg-warning" checked disabled />
</div>
```

### Avatar Patterns

```tsx
{/* Image Avatar */}
<div className="avatar">
  <div className="w-12 rounded-full">
    <img src="..." alt="..." />
  </div>
</div>

{/* Placeholder Avatar */}
<div className="avatar placeholder">
  <div className="bg-neutral text-neutral-content w-12 rounded-full">
    <span className="text-xl">JD</span>
  </div>
</div>

{/* Avatar with Ring */}
<div className="avatar">
  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src="..." alt="..." />
  </div>
</div>
```

---

## 📦 ASSET LIST & USAGE

### Images Available

| Asset | Path | Usage | Section |
|-------|------|-------|---------|
| Trainer Photo | `/public/trainer-lukas.jpg` | Avatar, About section | Hero badge, Trainer section |
| Hero Background | `/public/Produktivitäts-Werkstatt Hintergrund 1 - Morgenlich Bergtal(1).png` | Hero background | Hero section |
| Testimonial 1 | `/public/testimonials/1.png` | Testimonial card | Testimonials |
| Testimonial 2 | `/public/testimonials/2.png` | Testimonial card | Testimonials |
| Testimonial 3 | `/public/testimonials/3.png` | Testimonial card | Testimonials |
| Testimonial 4 | `/public/testimonials/4.png` | Testimonial card | Testimonials |
| Carsten Hunold | `/public/testimonials/carsten-hunold.jpg` | Featured testimonial | Testimonials |

### Testimonial Data Structure

```typescript
const testimonials = [
  {
    name: "Carsten Hunold",
    title: "IT Projektmanager, NLP Master",
    quote: "Der Wert dieses Kurses übersteigt den Preis bei weitem...",
    image: "/testimonials/carsten-hunold.jpg",
  },
  {
    name: "Ildiko Eder",
    quote: "Die Fokusstunden haben mir besonders geholfen...",
    image: "/testimonials/4.png",
  },
  // ... more testimonials
];
```

---

## 🚦 SECTION FINAL ORDER

```
1. Hero Section (with rotating text + stats)
2. Testimonials Marquee/Carousel
3. Problem/Solution (Before/After cards)
4. Curriculum (Timeline with 3 phases)
5. Trainer Section (Card with badges)
6. Pricing Section (Featured card)
7. FAQ (Collapse accordion)
8. Final CTA (Alert + CTA buttons)
9. Footer (DaisyUI footer component)
```

---

## ⚠️ IMPORTANT DAISYUI 5 RULES

### 1. Color Names (CRITICAL)

```tsx
// ✅ CORRECT: Use DaisyUI color names
<div className="bg-base-100 text-base-content">
  <h2 className="text-primary">Headline</h2>
  <button className="btn btn-accent">Button</button>
</div>

// ❌ WRONG: Never use Tailwind color names
<div className="bg-white text-gray-800">
  <h2 className="text-blue-500">Headline</h2>
  <button className="bg-blue-600 text-white">Button</button>
</div>
```

### 2. Component Structure

```tsx
// Component class (required)
<div className="card">
  {/* Part classes (optional) */}
  <div className="card-body">
    {/* Modifier classes (optional) */}
    <h2 className="card-title">Title</h2>
  </div>
</div>
```

### 3. Responsive Modifiers

```tsx
// Mobile-first approach
<div className="text-2xl md:text-4xl lg:text-6xl">
  Responsive Text
</div>

// Breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

### 4. Theme Switching

```tsx
// Auto theme switching with radio inputs
<input
  type="radio"
  name="theme-controller"
  className="theme-controller"
  value="werkstatt"
/>
<input
  type="radio"
  name="theme-controller"
  className="theme-controller"
  value="werkstatt-dark"
/>
```

### 5. Opacity for Hierarchy

```tsx
// Primary text
<p className="text-base-content">Main text</p>

// Secondary text
<p className="text-base-content/70">Secondary text</p>

// Tertiary text
<p className="text-base-content/50">Tertiary text</p>
```

---

## 🎨 CSS ANIMATIONS (Optional Enhancements)

### Marquee Animation (If Using Custom Marquee)

```css
/* Add to globals.css */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

### Hover Effects

```css
/* Card hover effect */
.card:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}

/* Button hover effect */
.btn:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Core Changes (1-2 hours)
- [ ] Update Hero Section with rotating text
- [ ] Add stats component to Hero
- [ ] Implement DaisyUI carousel for testimonials
- [ ] Add rating components to testimonials
- [ ] Convert Problem/Solution to DaisyUI cards

### Phase 2: Content Enhancement (1-2 hours)
- [ ] Implement timeline component for curriculum
- [ ] Add badges to trainer section
- [ ] Enhance pricing card with stats/dividers
- [ ] Update FAQ with collapse-arrow
- [ ] Add trust badges throughout

### Phase 3: Polish & Details (30-60 min)
- [ ] Add hover effects to cards
- [ ] Implement tooltip components
- [ ] Add alert for urgency in Final CTA
- [ ] Update footer with DaisyUI component
- [ ] Test responsive breakpoints

### Phase 4: Testing & QA (30-60 min)
- [ ] Test all sections on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1440px)
- [ ] Verify theme switching (werkstatt/werkstatt-dark)
- [ ] Check all links and buttons
- [ ] Validate accessibility (keyboard navigation)
- [ ] Test all DaisyUI components

---

## 🔧 TROUBLESHOOTING

### Issue: Text Rotation Not Working

**Solution:**
```tsx
// Ensure you have DaisyUI 5.x installed
npm list daisyui

// If not on 5.x, update:
npm install daisyui@latest
```

### Issue: Colors Not Applying

**Problem:** Using Tailwind color names instead of DaisyUI names

**Solution:**
```tsx
// ❌ Wrong
className="bg-blue-500"

// ✅ Correct
className="bg-primary"
```

### Issue: Component Not Styling Correctly

**Problem:** Missing required parent class

**Solution:**
```tsx
// ❌ Wrong (missing card wrapper)
<div className="card-body">...</div>

// ✅ Correct
<div className="card">
  <div className="card-body">...</div>
</div>
```

### Issue: Responsive Classes Not Working

**Problem:** Wrong order or missing breakpoint

**Solution:**
```tsx
// ❌ Wrong
className="lg:text-6xl text-2xl"

// ✅ Correct (mobile-first)
className="text-2xl lg:text-6xl"
```

---

## 📚 REFERENCE LINKS

- **DaisyUI 5 Documentation:** https://daisyui.com/
- **DaisyUI Components:** https://daisyui.com/components/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Next.js Image:** https://nextjs.org/docs/api-reference/next/image
- **Lucide Icons:** https://lucide.dev/

---

## 🎯 FINAL NOTES FOR IMPLEMENTER

1. **DO NOT CHANGE:**
   - Theme configuration in tailwind.config
   - Font configuration
   - Color palette variables
   - Existing component structure

2. **ALWAYS USE:**
   - DaisyUI color names (`primary`, `accent`, etc.)
   - DaisyUI component classes
   - Mobile-first responsive approach
   - Semantic HTML

3. **NEVER USE:**
   - Tailwind color classes (`red-500`, `blue-600`)
   - Custom CSS for components (use DaisyUI)
   - Fixed pixel values (use Tailwind spacing)

4. **BEST PRACTICES:**
   - Test each section after implementation
   - Verify theme switching works
   - Check mobile responsiveness
   - Validate accessibility
   - Keep components simple and reusable

---

## 🚀 READY TO IMPLEMENT?

Start with **Phase 1** and work section by section. Each section is independent and can be implemented without breaking other parts.

**Estimated Total Time:** 4-6 hours

**Good luck! 🎉**

---

*Plan created: 8. Dezember 2025*
*DaisyUI Version: 5.x*
*Next.js: 14.x*
*Based on: Cora.computer, Linear.app, Notion.com, Maven.com design analysis*
