# Cora.computer Landing Page Design Analysis

**Date:** 2025-12-08
**URL:** https://cora.computer
**Purpose:** Design system documentation for recreating this aesthetic using DaisyUI 5

---

## Executive Summary

Cora.computer showcases a premium, minimalist design with heavy emphasis on:
- **Social proof** (8 repeating testimonials in infinite carousel)
- **Trust building** (dedicated security section, Google Verified badges)
- **Interactive demos** (embedded email UI mockups)
- **Clean typography** (Serif headlines + Sans-serif body)
- **Subtle animations** (GSAP, Lenis smooth scroll)

---

## 1. Section Structure (Top to Bottom)

### Navigation
- **Layout:** Fixed header with logo (left), Login + Sign Up (right)
- **Style:** Minimal, transparent background, white text
- **DaisyUI equivalent:** `navbar` with `navbar-start`, `navbar-end`

### Hero Section
```
├── Headline (H1): "Give Cora your inbox. Take back your life."
├── Subheadline (P): "$150,000 chief of staff that only costs $20 per month"
├── Primary CTA: "Get Started" button with arrow icon
└── Cloud decorative images (background layer)
```

**DaisyUI pattern:**
```jsx
<div className="hero min-h-screen bg-base-100">
  <div className="hero-content text-center">
    <div className="max-w-4xl">
      <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
        Give Cora your inbox.<br />Take back your life.
      </h1>
      <p className="py-6 text-lg md:text-xl opacity-70">
        Cora is the $150,000 chief of staff that only costs $20 per month
      </p>
      <button className="btn btn-primary btn-lg rounded-full gap-2">
        Get Started
        <svg className="w-5 h-5">...</svg>
      </button>
    </div>
  </div>
</div>
```

### Testimonials Carousel (Post-Hero)
- **Pattern:** 8 unique testimonials repeated 10 times (infinite loop illusion)
- **Layout:** Horizontal scroll, auto-advancing
- **Components:** Quote + Avatar + Name + Title + Company logo
- **DaisyUI equivalent:** `carousel` with `carousel-item`

```jsx
<div className="carousel carousel-center w-full py-16 space-x-4 bg-base-200">
  {testimonials.map((t, i) => (
    <div key={i} className="carousel-item">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="text-lg italic">{t.quote}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={t.avatar} alt={t.name} />
              </div>
            </div>
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm opacity-70">{t.role} at {t.company}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
```

### Feature Demos (3 Sections)

#### 1. "Cora screens your email"
- **Layout:** Text (left) + Mockup image (right)
- **Components:** H3 heading, paragraph, CTA button

#### 2. "Cora drafts responses in your voice"
- **Layout:** Text (left) + Interactive email UI mockup (right)
- **Special:** Embedded Gmail-style draft interface with realistic email content

#### 3. "The rest gets Briefed"
- **Layout:** Text (left) + Email thumbnails grid (right)
- **Components:** Grid of 6 email previews + main "Today's Brief" card

**DaisyUI pattern:**
```jsx
<div className="grid md:grid-cols-2 gap-12 items-center py-24 px-6 max-w-7xl mx-auto">
  {/* Text Column */}
  <div>
    <h3 className="text-4xl font-serif font-bold mb-6">
      Cora screens your email
    </h3>
    <p className="text-lg opacity-70 mb-8">
      Cora knows what's important to you and the types of emails you need to respond to...
    </p>
    <button className="btn btn-primary btn-lg rounded-full gap-2">
      Start your free trial
      <svg>...</svg>
    </button>
  </div>

  {/* Mockup Column */}
  <div className="mockup-window bg-base-300">
    <div className="bg-base-200 px-4 py-16">
      {/* Feature demo content */}
    </div>
  </div>
</div>
```

### Learning Section: "Cora learns you inside and out"
- **Layout:** Icon grid + 2 cards explaining personalization
- **Components:**
  - Center-aligned heading with icon
  - 2-column layout (mobile: stacked)
  - Icon badges ("Only for CEOs", "Only for designers")
  - Numbered/unnumbered lists

**DaisyUI pattern:**
```jsx
<div className="py-24 px-6 bg-base-200">
  <div className="max-w-7xl mx-auto text-center mb-12">
    <div className="inline-block mb-4">
      <svg className="w-16 h-16 text-primary">...</svg>
    </div>
    <h2 className="text-5xl font-serif font-bold">
      Cora learns you inside and out
    </h2>
  </div>

  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    <div className="card bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <div className="flex gap-2">
          <div className="badge badge-outline">Only for CEOs</div>
          <div className="badge badge-outline">Only for designers</div>
        </div>
      </figure>
      <div className="card-body">
        <h3 className="card-title">Cora gets to know you, automatically</h3>
        <p>Cora reads your email patterns to discover who you are...</p>
      </div>
    </div>

    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">Shape Cora through conversation</h3>
        <p>Talk to Cora like your chief of staff over chat or email...</p>
      </div>
    </div>
  </div>
</div>
```

### Security Section: "Security and privacy are built in"
- **Layout:** 4-column grid (mobile: 1-2 columns)
- **Components:** Icon + Heading + Description
- **Icons:** Circular white containers with gray SVG icons

**DaisyUI pattern:**
```jsx
<div className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <svg className="w-16 h-16 mx-auto mb-4 text-primary">...</svg>
      <h2 className="text-5xl font-serif font-bold">
        Security and privacy are built in
      </h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {securityFeatures.map((feature) => (
        <div key={feature.id} className="text-center">
          <div className="avatar placeholder mb-4">
            <div className="bg-base-100 text-neutral-content rounded-full w-16">
              <svg className="w-8 h-8">...</svg>
            </div>
          </div>
          <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
          <p className="text-sm opacity-70">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</div>
```

### Pricing Section: "Pick a plan"
- **Layout:** Toggle (Yearly/Monthly) + 2-column pricing cards
- **Components:**
  - Toggle buttons (segmented control)
  - Pricing cards with feature lists
  - Checkmark icons for features
  - CTA buttons
  - Upsell note (Every bundle)

**DaisyUI pattern:**
```jsx
<div className="py-24 px-6 bg-base-200">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-5xl font-serif font-bold text-center mb-8">Pick a plan</h2>

    {/* Toggle */}
    <div className="flex justify-center mb-12">
      <div className="join">
        <button className="btn join-item btn-active">Yearly (save 20%)</button>
        <button className="btn join-item">Monthly</button>
      </div>
    </div>

    {/* Pricing Cards */}
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Professional Plan */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-2xl">Professional</h3>
          <div className="my-4">
            <div className="text-4xl font-bold">$20/month</div>
            <div className="text-sm opacity-70">Billed annually as $240</div>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success">✓</svg>
              <span>Includes 2 email accounts</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success">✓</svg>
              <span>AI Inbox organization</span>
            </li>
            {/* More features... */}
          </ul>
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary btn-block rounded-full">
              Start free trial
            </button>
          </div>
        </div>
      </div>

      {/* Unlimited Plan - Similar structure */}
    </div>

    {/* Upsell Note */}
    <div className="alert alert-info mt-12 max-w-4xl mx-auto">
      <svg>...</svg>
      <div>
        <p>Or get the Every bundle for full access to all of our apps...</p>
      </div>
    </div>
  </div>
</div>
```

### FAQ Section
- **Layout:** Accordion/collapse components
- **Components:** 12 collapsible Q&A pairs
- **DaisyUI equivalent:** `collapse` or `accordion`

```jsx
<div className="py-24 px-6">
  <div className="max-w-4xl mx-auto">
    <h3 className="text-4xl font-serif font-bold text-center mb-12">
      Frequently asked questions
    </h3>

    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="collapse collapse-plus bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-xl font-medium">
            {faq.question}
          </div>
          <div className="collapse-content">
            <p className="pt-2 opacity-70">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
```

### Footer
- **Layout:** Logo + tagline + CTA (left) | Links + Every logo (right)
- **Components:**
  - Footer nav links (Privacy, Terms, Log In)
  - Partner badge (Every.to)

**DaisyUI pattern:**
```jsx
<footer className="footer footer-center bg-base-300 text-base-content p-10">
  <div className="grid grid-flow-col gap-4">
    <a className="link link-hover">Privacy</a>
    <a className="link link-hover">Terms</a>
    <a className="link link-hover">Log In</a>
  </div>
  <aside>
    <img src="/logo.svg" alt="Cora" className="h-8" />
    <p className="font-bold">Free Yourself from Email</p>
    <p>Let Cora handle your emails, so you can regain time to focus on what matters.</p>
  </aside>
  <div>
    <a href="https://every.to" target="_blank">
      <img src="/every-logo.svg" alt="Made by Every" className="h-6 opacity-70" />
    </a>
  </div>
</footer>
```

---

## 2. DaisyUI-Compatible Component Patterns

### Primary Components Used

| Cora Pattern | DaisyUI Component | Notes |
|-------------|-------------------|-------|
| Navigation | `navbar` | Fixed header with logo + auth buttons |
| Hero section | `hero` | Center-aligned with max-width container |
| Testimonial cards | `carousel` + `card` | Infinite horizontal scroll |
| Feature sections | `grid` + `card` | 2-column responsive layout |
| Email mockups | `mockup-window` | Browser/app window styling |
| Security icons | `avatar placeholder` | Circular icon containers |
| Pricing cards | `card` + `join` | Toggle + feature lists |
| FAQ | `collapse` or `accordion` | Expandable Q&A |
| CTA buttons | `btn btn-primary` | Rounded-full, with arrow icons |
| Footer | `footer` | Multi-column with links |

### Custom Patterns to Implement

#### 1. Pill Buttons with Arrow Icons
```jsx
<button className="btn btn-primary btn-lg rounded-full gap-2">
  Get Started
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
</button>
```

#### 2. Testimonial Card with Avatar
```jsx
<div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <p className="text-lg italic">
      "I've tried all these newfangled AI email apps, and the winner, by far, is Cora by Every"
    </p>
    <div className="flex items-center gap-4 mt-4">
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img src="/testimonials/andrew.jpg" alt="Andrew Wilkinson" />
        </div>
      </div>
      <div>
        <div className="font-semibold">Andrew Wilkinson</div>
        <div className="text-sm opacity-70 flex items-center gap-1">
          <span>Founder at</span>
          <img src="/logos/tiny.svg" className="h-4" alt="Tiny" />
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 3. Security Feature Block
```jsx
<div className="text-center">
  <div className="avatar placeholder mb-4">
    <div className="bg-white border border-base-300 rounded-full w-16">
      <svg className="w-8 h-8 text-base-content opacity-50">
        {/* Icon SVG */}
      </svg>
    </div>
  </div>
  <h4 className="font-bold text-lg mb-2">We never train on your data</h4>
  <p className="text-sm opacity-70">
    We share your emails with LLMs, but your data is never used to train models.
  </p>
</div>
```

#### 4. Pricing Feature List
```jsx
<ul className="space-y-3">
  <li className="flex items-center gap-2">
    <svg className="w-5 h-5 text-success shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    <span>Includes 2 email accounts</span>
  </li>
  {/* More features... */}
</ul>
```

---

## 3. Typography Hierarchy

### Font Families

**Primary (Headlines):** Signifier (serif)
**Secondary (Body):** Switzer (sans-serif)

**DaisyUI Config:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Signifier', 'Georgia', 'serif'],
        sans: ['Switzer', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}
```

### Type Scale

| Element | Size (Mobile) | Size (Desktop) | Weight | Line Height |
|---------|--------------|----------------|--------|-------------|
| H1 (Hero) | 2.5rem (40px) | 4.5rem (72px) | Bold | 1.1 |
| H2 (Section) | 2rem (32px) | 3rem (48px) | Bold | 1.2 |
| H3 (Feature) | 1.5rem (24px) | 2.25rem (36px) | Bold | 1.3 |
| H4 (FAQ) | 1.25rem (20px) | 1.5rem (24px) | Medium | 1.4 |
| Body Large | 1.125rem (18px) | 1.25rem (20px) | Normal | 1.6 |
| Body Default | 1rem (16px) | 1rem (16px) | Normal | 1.6 |
| Body Small | 0.875rem (14px) | 0.875rem (14px) | Normal | 1.5 |

### Utility Classes

```css
/* Headlines */
.heading-1 { @apply text-4xl md:text-7xl font-serif font-bold leading-tight; }
.heading-2 { @apply text-3xl md:text-5xl font-serif font-bold leading-snug; }
.heading-3 { @apply text-2xl md:text-4xl font-serif font-bold leading-snug; }

/* Body */
.body-lg { @apply text-lg md:text-xl font-sans leading-relaxed; }
.body-default { @apply text-base font-sans leading-relaxed; }
.body-sm { @apply text-sm font-sans leading-normal; }
```

---

## 4. Color Usage and Contrast

### Color Palette Analysis

**Primary Brand:** Blue theme (`data-theme="blue"`)
- **Primary Action Color:** Bright blue (used for CTAs)
- **Text on Dark:** White (`#FFFFFF`)
- **Text on Light:** Near-black (`#1a1a1a`)
- **Muted Text:** 70% opacity of base text

**Neutrals:**
- **Border Color:** `#D7D4CF` (warm light gray)
- **Hover State:** `#d6d6d6` (slightly darker gray)
- **Icon Color:** `#787878` (medium gray)
- **Background Light:** Off-white/cream
- **Background Dark:** Charcoal/near-black

### DaisyUI Theme Configuration

```js
// tailwind.config.js
module.exports = {
  daisyui: {
    themes: [
      {
        coraLight: {
          "primary": "#2563eb",        // Blue for CTAs
          "secondary": "#64748b",      // Slate for secondary actions
          "accent": "#0ea5e9",         // Sky blue for accents
          "neutral": "#1a1a1a",        // Near-black for text
          "base-100": "#ffffff",       // White background
          "base-200": "#fafaf9",       // Off-white/cream
          "base-300": "#f5f5f4",       // Light gray
          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
  },
}
```

### Opacity Patterns

| Use Case | Opacity | DaisyUI Class |
|----------|---------|---------------|
| Primary text | 100% | `text-base-content` |
| Secondary text | 70% | `text-base-content opacity-70` |
| Disabled text | 50% | `text-base-content opacity-50` |
| Hover overlay | 10% | `bg-base-content bg-opacity-10` |

### Contrast Ratios (WCAG AAA)

- **Headline on light:** 21:1 (near-black on white)
- **Body on light:** 15:1 (gray on white)
- **CTA button:** 4.5:1 (white text on blue)
- **Border contrast:** 3:1 (light gray on white)

---

## 5. Animation & Interaction Patterns

### Libraries Used
- **GSAP (GreenSock Animation Platform):** Timeline-based animations
- **Lenis:** Smooth scrolling library
- **Custom CSS transitions:** Hover effects

### Key Animations

#### 1. Button Hover Effects
```css
/* Cora pattern */
.btn-hover {
  transition: all 0.3s ease-in-out;
}
.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: -3px 4px 4px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(20px);
}
```

**DaisyUI implementation:**
```jsx
<button className="btn btn-primary rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
  Get Started
</button>
```

#### 2. Testimonial Carousel
- **Pattern:** Infinite horizontal scroll with auto-advance
- **Implementation:** Duplicate testimonial array 10x to create seamless loop

```jsx
// Using React + Framer Motion (alternative to GSAP)
import { motion } from 'framer-motion';

<motion.div
  className="flex gap-4"
  animate={{
    x: [0, -testimonialWidth * testimonials.length]
  }}
  transition={{
    duration: 60,
    repeat: Infinity,
    ease: "linear"
  }}
>
  {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
    <TestimonialCard key={i} {...t} />
  ))}
</motion.div>
```

#### 3. FAQ Accordion
- **Pattern:** Expand/collapse with smooth height transition
- **DaisyUI:** Built-in `collapse` component handles this

```jsx
<div className="collapse collapse-plus bg-base-200">
  <input type="radio" name="faq-accordion" />
  <div className="collapse-title text-xl font-medium">
    Wait, does this actually write and send emails for me?
  </div>
  <div className="collapse-content">
    <p className="pt-2 opacity-70">
      No, Cora will never send emails for you...
    </p>
  </div>
</div>
```

#### 4. Smooth Scroll (Lenis alternative)
```jsx
// Using Framer Motion + Next.js
import { useScroll, useTransform, motion } from 'framer-motion';

export function SmoothScroll({ children }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
}
```

### Micro-interactions

| Element | Interaction | Effect |
|---------|------------|--------|
| CTA buttons | Hover | Lift up 2px, add shadow, blur background |
| Navigation links | Hover | Underline animation from left |
| Pricing cards | Hover | Subtle scale (1.02x) |
| FAQ items | Click | Smooth expand with chevron rotate |
| Email mockups | Hover | Slight brightness increase |

---

## 6. Mobile Responsiveness Approach

### Breakpoint Strategy

Cora uses **desktop-first** approach with `dt:` prefix (desktop/tablet breakpoint).

**DaisyUI equivalent:** Use Tailwind's standard breakpoints:
- `sm:` - 640px (mobile landscape)
- `md:` - 768px (tablet)
- `lg:` - 1024px (desktop)
- `xl:` - 1280px (large desktop)

### Responsive Patterns

#### 1. Typography Scaling
```jsx
<h1 className="text-4xl md:text-5xl lg:text-7xl">
  Give Cora your inbox.
</h1>
```

#### 2. Grid Layouts
```jsx
{/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map(feature => <FeatureCard {...feature} />)}
</div>
```

#### 3. Flexbox Direction
```jsx
{/* Mobile: stacked, Desktop: side-by-side */}
<div className="flex flex-col md:flex-row gap-8 items-center">
  <div className="w-full md:w-1/2">Text content</div>
  <div className="w-full md:w-1/2">Image/Mockup</div>
</div>
```

#### 4. Padding/Spacing Adjustments
```jsx
<section className="py-12 px-4 md:py-24 md:px-6 lg:px-12">
  {/* Content */}
</section>
```

#### 5. Hidden Elements
```jsx
{/* Show on mobile only */}
<div className="md:hidden">Mobile menu</div>

{/* Show on desktop only */}
<div className="hidden md:block">Desktop nav</div>
```

### Mobile-Specific Considerations

1. **Touch Targets:** Minimum 44x44px (DaisyUI `btn` handles this)
2. **Carousel Navigation:** Swipe gestures + optional nav dots
3. **Modal Behavior:** Full-screen on mobile, centered on desktop
4. **Form Inputs:** Large enough for easy tapping (DaisyUI `input-lg`)
5. **Image Optimization:** Use `srcset` for responsive images

---

## 7. Specific Recommendations for Die Produktivitäts-Werkstatt

### Design System Setup

#### 1. Install DaisyUI 5
```bash
npm install -D daisyui@latest
```

#### 2. Configure Tailwind + DaisyUI
```js
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)'], // Use Next.js font optimization
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        pwLight: {
          "primary": "#2563eb",
          "secondary": "#64748b",
          "accent": "#0ea5e9",
          "neutral": "#1a1a1a",
          "base-100": "#ffffff",
          "base-200": "#fafaf9",
          "base-300": "#f5f5f4",
          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
        pwDark: {
          "primary": "#3b82f6",
          "secondary": "#94a3b8",
          "accent": "#38bdf8",
          "neutral": "#f5f5f4",
          "base-100": "#1a1a1a",
          "base-200": "#262626",
          "base-300": "#404040",
          "info": "#38bdf8",
          "success": "#34d399",
          "warning": "#fbbf24",
          "error": "#f87171",
        },
      },
    ],
  },
}
```

#### 3. Set Up Font Optimization (Next.js)
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const signifier = localFont({
  src: '../public/fonts/Signifier-Regular.woff2',
  variable: '--font-serif',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${inter.variable} ${signifier.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### Component Library Structure

Create reusable components based on Cora patterns:

```
/components
├── landing/
│   ├── Hero.tsx              # Hero section with CTA
│   ├── TestimonialCarousel.tsx  # Infinite scroll testimonials
│   ├── FeatureSection.tsx    # 2-column feature demo
│   ├── SecurityGrid.tsx      # 4-column security features
│   ├── PricingCards.tsx      # Pricing comparison
│   └── FAQ.tsx               # Accordion FAQ
├── ui/
│   ├── Button.tsx            # Pill-style CTA buttons
│   ├── Card.tsx              # DaisyUI card wrapper
│   ├── Badge.tsx             # Feature badges
│   └── Modal.tsx             # DaisyUI modal wrapper
└── layout/
    ├── Navbar.tsx            # Fixed navigation
    └── Footer.tsx            # Multi-column footer
```

### Migration Strategy (Cora → Produktivitäts-Werkstatt)

| Cora Section | PW Equivalent | Changes Needed |
|--------------|---------------|----------------|
| Hero: "Give Cora your inbox" | Hero: "Werde zum Produktivitäts-Tüftler" | Update copy, keep structure |
| Testimonials (8 founders) | Testimonials (course participants) | Use existing testimonial data |
| Feature demos (3 email UIs) | Feature demos (course modules preview) | Replace mockups with course screenshots |
| Security section | Trust section (money-back guarantee, etc.) | Replace icons, update copy |
| Pricing (2 tiers) | Pricing (1 tier: €497) | Simplify to single plan |
| FAQ (12 questions) | FAQ (course-specific) | Keep accordion, update questions |

### Implementation Checklist

- [ ] Install DaisyUI 5 and configure custom theme
- [ ] Set up serif + sans-serif font pairing (e.g., Crimson Text + Inter)
- [ ] Create `<Hero>` component with centered CTA
- [ ] Build `<TestimonialCarousel>` with infinite scroll (use existing testimonials)
- [ ] Design 3 feature sections with course module previews
- [ ] Create trust indicators grid (replace Cora's security icons)
- [ ] Implement pricing card (single plan, highlight value)
- [ ] Build FAQ accordion with DaisyUI `collapse`
- [ ] Add smooth scroll library (Lenis or Framer Motion)
- [ ] Implement hover effects on CTAs (lift + shadow)
- [ ] Ensure all text is in German
- [ ] Test mobile responsiveness (especially carousel)
- [ ] Optimize images (WebP format, responsive srcset)
- [ ] Add animations (GSAP or Framer Motion)

### Key Design Principles to Apply

1. **Generous Whitespace:** Don't crowd elements. Use `py-24` for section spacing.
2. **Strong Typography Contrast:** Large serif headlines + readable sans-serif body.
3. **Social Proof First:** Testimonials appear early and repeat throughout.
4. **Trust Building:** Dedicate section to credibility indicators.
5. **Clear CTAs:** One primary action per section, always visible.
6. **Minimal Color Palette:** Stick to neutrals + one accent color.
7. **Subtle Animations:** Enhance, don't distract. Hover states should feel premium.
8. **Mobile-First Interactions:** Ensure touch targets are large, scrolling is smooth.

### Sample Hero Component (German)

```tsx
// components/landing/Hero.tsx
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export function Hero() {
  return (
    <div className="hero min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      <div className="hero-content text-center max-w-5xl px-6">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
            Werde zum Produktivitäts-Tüftler
          </h1>
          <p className="text-lg md:text-xl text-base-content opacity-70 mb-8 max-w-3xl mx-auto">
            Entdecke das 12-Wochen-Videokursprogramm, das dich zum Meister deiner Zeit macht.
            Für €497 statt €997.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="btn btn-primary btn-lg rounded-full gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Jetzt Kurs buchen
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="#curriculum"
              className="btn btn-outline btn-lg rounded-full"
            >
              Mehr erfahren
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm opacity-70">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>30 Tage Geld-zurück-Garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Lebenslanger Zugang</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>75 Video-Lektionen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Conclusion

Cora.computer exemplifies a premium, conversion-focused landing page design that prioritizes:

1. **Clarity:** Simple message, clear value proposition
2. **Trust:** Heavy use of testimonials and security indicators
3. **Beauty:** Clean typography, generous whitespace, subtle animations
4. **Usability:** Mobile-responsive, fast loading, accessible

By adapting these patterns to Die Produktivitäts-Werkstatt using DaisyUI 5, you can achieve a similarly polished, professional aesthetic while maintaining German language and course-specific content. The key is to use DaisyUI's pre-built components as a foundation, then layer on custom typography, colors, and animations that match Cora's premium feel.

**Next Steps:**
1. Set up DaisyUI theme with custom colors
2. Implement hero section with German copy
3. Build testimonial carousel using existing testimonial data
4. Create feature sections showcasing course modules
5. Test responsiveness and interactions across devices
