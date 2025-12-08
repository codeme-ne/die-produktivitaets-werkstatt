import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ButtonCheckout from "@/components/ButtonCheckout";
import { getCourseOverview } from "@/libs/pwCourse";
import {
  Target,
  Clock,
  Brain,
  Rocket,
  BookOpen,
  Zap,
  TrendingUp,
  RefreshCw,
  Check,
  XCircle,
  Shield,
  RotateCcw,
  Compass,
  ArrowRight,
  Sparkles,
  Quote,
  Users,
  PlayCircle,
  Award,
  Calendar,
  BarChart3,
} from "lucide-react";

const testimonials = {
  featured: {
    name: "Carsten Hunold",
    title: "IT Projektmanager, NLP Master, Deep Ocean Coach",
    quote:
      "Am wertvollsten fand ich, mit welcher Tiefe der Trainer das Thema durchdrungen und wie gut er das ganze Thema in der Circle Plattform aufbereitet hatte. Zur weiteren Vertiefung gab es auch noch eine Vielzahl von Buchtipps und App-Empfehlungen.",
    shortQuote:
      "Der Wert dieses Kurses übersteigt den Preis bei weitem — auch im Vergleich zu namhaften Marktbegleitern.",
    image: "/testimonials/carsten-hunold.jpg",
  },
  others: [
    {
      name: "Joachim Kühl",
      quote:
        "Schade, dass ich den Kurs nicht schon früher entdeckt habe. Denn vieles wäre wahrscheinlich einfacher und schneller gegangen.",
    },
    {
      name: "Sabine",
      quote:
        "Ich empfehle die Werkstatt jedem, der Schwierigkeiten hat, mit dem Arbeiten anzufangen oder Aufgaben aufzuschieben.",
    },
    {
      name: "Gabriele Thies",
      quote:
        "In der heutigen Session habe ich eine Aufgabe erledigt, die ich schon ewig vor mir hergeschoben habe — ein sehr sehr gutes Gefühl!",
    },
    {
      name: "Ildiko Eder",
      quote:
        'Die "Fokusstunden" haben mir besonders geholfen, da ich in diesen Zeiten wirklich konzentriert an meinen Aufgaben bleiben konnte.',
    },
  ],
};

// Avatar Stack Component
function AvatarStack() {
  const avatars = [
    { name: "Carsten", image: "/testimonials/carsten-hunold.jpg" },
    { name: "Joachim", image: "/testimonials/joachim-kuehl.jpg" },
    { name: "Sabine", image: "/testimonials/sabine.jpg" },
    { name: "Gabriele", image: "/testimonials/gabriele-thies.jpg" },
    { name: "Ildiko", image: "/testimonials/ildiko-eder.jpg" },
  ];

  return (
    <div className="avatar-group -space-x-4">
      {avatars.map((avatar, i) => (
        <div key={i} className="avatar border-2 border-base-100">
          <div className="w-10">
            <Image
              src={avatar.image}
              alt={avatar.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Highlighted text span with warm underline
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute bottom-1 left-0 right-0 h-3 bg-accent/25 -z-0 -skew-x-2 rounded-sm"
        aria-hidden="true"
      />
    </span>
  );
}

// Icon wrapper for consistent styling
function IconBox({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
}) {
  const variants = {
    default: "bg-base-200 text-base-content",
    accent: "bg-accent/15 text-accent",
    muted: "bg-base-200/50 text-base-content/60",
  };

  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${variants[variant]}`}
    >
      {children}
    </div>
  );
}

export default function Page() {
  const modules = getCourseOverview();
  const totalLessons = modules.reduce(
    (count, module) => count + module.lessonCount,
    0
  );

  return (
    <>
      <Header />

      <main className="bg-base-100 relative overflow-hidden">
        {/* Subtle geometric background pattern */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-30"
          aria-hidden="true"
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-secondary/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="min-h-[90vh] flex items-center justify-center relative z-10 px-6">
          <div className="max-w-4xl mx-auto text-center py-16 md:py-24">
            {/* Trainer Badge */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="avatar">
                <div className="w-11 rounded-full ring-2 ring-base-300 ring-offset-base-100 ring-offset-2">
                  <Image
                    src="/trainer-lukas.jpg"
                    alt="Lukas Zangerl"
                    width={44}
                    height={44}
                  />
                </div>
              </div>
              <span className="text-base-content/70 font-medium text-sm tracking-wide">
                Ein Kurs von Lukas Zangerl
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-base-content leading-[1.08] tracking-tight mb-6">
              Werde produktiver{" "}
              <Highlight>in Wochen,</Highlight>
              <br className="hidden sm:block" />
              nicht Monaten
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-base-content/60 max-w-2xl mx-auto leading-relaxed mb-10">
              Alles was du brauchst, um dein Produktivitätssystem aufzubauen —
              selbst wenn du bisher jede Methode aufgegeben hast.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-6 mb-12">
              <Link
                href="#pricing"
                className="btn btn-accent btn-lg px-10 gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Jetzt Zugang sichern
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Social Proof */}
              <div className="flex flex-col items-center gap-2">
                <AvatarStack />
                <p className="text-base-content/60 text-sm">
                  <span className="font-semibold text-accent">80+</span>{" "}
                  Teilnehmer lieben den Kurs
                </p>
              </div>
            </div>

            {/* Timeline Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 pt-8 border-t border-base-200">
              {[
                {
                  week: "Woche 1",
                  text: "System kennenlernen",
                  icon: <Target className="w-5 h-5" />,
                },
                {
                  week: "Woche 4",
                  text: "Rhythmus etablieren",
                  icon: <Clock className="w-5 h-5" />,
                },
                {
                  week: "Woche 8",
                  text: "Mindset meistern",
                  icon: <Brain className="w-5 h-5" />,
                },
                {
                  week: "Woche 12",
                  text: "Voll integriert",
                  icon: <Rocket className="w-5 h-5" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div className="text-accent">{item.icon}</div>
                  <span className="font-display font-semibold text-base-content text-sm">
                    {item.week}
                  </span>
                  <span className="text-xs text-base-content/50 leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED TESTIMONIAL
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 px-6 bg-base-200/40 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="relative">
                <div className="avatar">
                  <div className="w-20 md:w-24 rounded-full ring-2 ring-accent/20 ring-offset-base-100 ring-offset-4">
                    <Image
                      src={testimonials.featured.image}
                      alt={testimonials.featured.name}
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-accent" />
              </div>
              <div className="text-center md:text-left">
                <blockquote className="text-xl md:text-2xl font-display text-base-content leading-snug mb-3">
                  &ldquo;{testimonials.featured.shortQuote}&rdquo;
                </blockquote>
                <p className="text-base-content/50 text-sm font-medium">
                  — {testimonials.featured.name}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PROBLEM/SOLUTION COMPARISON
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-base-content text-center font-bold leading-tight mb-4">
              Produktivitätskurse sind für{" "}
              <span className="text-base-content/30 line-through decoration-2">
                Theoretiker
              </span>
            </h2>
            <p className="text-center text-base-content/60 mb-12 text-lg">
              Nicht für Macher. Bis jetzt.
            </p>

            {/* Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Left: What doesn't work */}
              <div className="card bg-base-100 shadow-sm p-6 md:p-8 border border-base-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-base-content/40" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-base-content/80">
                    So funktioniert&apos;s nicht
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "47 verschiedene Apps ausprobieren",
                    "Stundenlange Theorie-Videos schauen",
                    "Komplizierte Systeme, die niemand durchhält",
                    'Gefühl von "Es liegt an mir"',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base-content/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-base-content/30 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: What works */}
              <div className="card bg-accent/5 p-6 md:p-8 border-2 border-accent/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-base-content">
                    Die Werkstatt-Methode
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Nur die Grundlagen lernen",
                    "Sofort praktisch umsetzen",
                    "Ein System, das zum Leben passt",
                    "Messbare Ergebnisse nach 18 Tagen",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base-content/80"
                    >
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FLYWHEEL SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 px-6 bg-base-200/30 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Flywheel visualization */}
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-10">
              {[
                { icon: <BookOpen className="w-5 h-5" />, text: "Lerne" },
                { icon: <Zap className="w-5 h-5" />, text: "Setze um" },
                { icon: <TrendingUp className="w-5 h-5" />, text: "Messe" },
                { icon: <RefreshCw className="w-5 h-5" />, text: "Optimiere" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-base-100 shadow-sm border border-base-200">
                    <div className="text-accent">{step.icon}</div>
                    <span className="text-xs font-semibold text-base-content/80">
                      {step.text}
                    </span>
                  </div>
                  {i < 3 && (
                    <ArrowRight className="w-4 h-4 text-base-content/20" />
                  )}
                </div>
              ))}
            </div>

            {/* Main message */}
            <div className="text-center">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-base-content font-bold leading-tight mb-4">
                Starte ein{" "}
                <Highlight>Produktivitäts-Flywheel</Highlight>
              </h2>
              <p className="text-lg text-base-content/60 max-w-2xl mx-auto mb-8">
                Lerne wie ein Unternehmer — baue dein System in 12 Wochen auf
                und verbessere es kontinuierlich durch echtes Feedback.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#pricing"
                  className="btn btn-accent btn-lg shadow-md hover:shadow-lg gap-2"
                >
                  Jetzt Zugang sichern
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <span className="text-sm text-base-content/50 flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Keine Vorkenntnisse nötig
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            WHAT YOU GET - Course Overview
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="curriculum" className="py-20 md:py-28 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-base-content font-bold leading-tight mb-4">
                Von 0 zum System in{" "}
                <Highlight>{totalLessons} Lektionen</Highlight>
              </h2>
              <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                Alles was du brauchst, um produktiver zu werden — Schritt für
                Schritt
              </p>
            </div>

            {/* Course content sections */}
            <div className="space-y-4">
              {[
                {
                  title: "1. Das Fundament",
                  duration: "Woche 1–3",
                  desc: "Lerne das Lebensproduktivitätssystem und etabliere deine ersten Fokuszeiten",
                  items: [
                    "Produktivitäts-Katalyst Test",
                    "Das Lebensproduktivitätssystem",
                    "Fokus-Logbuch einführen",
                    "Lebenskompass entwickeln",
                  ],
                  icon: <Compass className="w-5 h-5" />,
                },
                {
                  title: "2. Der Rhythmus",
                  duration: "Woche 4–7",
                  desc: "Baue deinen idealen Tages-, Wochen- und Quartalsrhythmus auf",
                  items: [
                    "Dein idealer Tag designen",
                    "Wochenplanung meistern",
                    "Quartalsrückblick etablieren",
                    "Langfristige Vision definieren",
                  ],
                  icon: <Calendar className="w-5 h-5" />,
                },
                {
                  title: "3. Die Vertiefung",
                  duration: "Woche 8–12",
                  desc: "Meistere Mindset, Organisation und integriere alles zu deinem System",
                  items: [
                    "Produktives Mindset aufbauen",
                    "Physischen Raum optimieren",
                    "Energie-Management",
                    "System-Integration",
                  ],
                  icon: <BarChart3 className="w-5 h-5" />,
                },
              ].map((section, i) => (
                <div
                  key={i}
                  className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden"
                >
                  <div className="card-body p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="font-display font-semibold text-lg text-base-content">
                            {section.title}
                          </h3>
                          <span className="badge badge-ghost badge-sm">
                            {section.duration}
                          </span>
                        </div>
                        <p className="text-base-content/60 text-sm mb-4">
                          {section.desc}
                        </p>
                        <ul className="flex flex-wrap gap-x-4 gap-y-1">
                          {section.items.map((item, j) => (
                            <li
                              key={j}
                              className="flex items-center gap-1.5 text-sm text-base-content/70"
                            >
                              <Check className="w-3.5 h-3.5 text-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TESTIMONIALS GRID
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 px-6 bg-base-200/30 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 text-accent mb-3">
                <Users className="w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Teilnehmerstimmen
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.others.map((t, i) => (
                <div
                  key={i}
                  className="card bg-base-100 shadow-sm p-5 md:p-6 border border-base-200"
                >
                  <div className="flex gap-4">
                    <div className="avatar placeholder shrink-0">
                      <div className="bg-accent/15 text-accent rounded-full w-10 h-10">
                        <span className="text-sm font-semibold">{t.name[0]}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-base-content/80 text-sm leading-relaxed mb-2">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <p className="text-xs text-base-content/50 font-medium">
                        — {t.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TRAINER SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="avatar mb-4">
                <div className="w-24 rounded-full ring-2 ring-accent/20 ring-offset-base-100 ring-offset-4">
                  <Image
                    src="/trainer-lukas.jpg"
                    alt="Lukas Zangerl"
                    width={96}
                    height={96}
                  />
                </div>
              </div>
              <p className="text-base-content/60 text-lg">
                Hey, ich bin Lukas, dein Trainer
              </p>
            </div>

            <div className="space-y-5 text-base text-base-content/80 leading-relaxed">
              <p>
                Ex-Pilot, NLP Master Trainer und Produktivitäts-Coach. Nach
                meinem eigenen Burnout wurde mir klar:{" "}
                <strong className="text-base-content">
                  Produktivität ohne System ist wie Fliegen ohne Kompass.
                </strong>
              </p>

              <p>
                Ich habe dutzende Bücher gelesen, tausende Euro für Kurse
                ausgegeben... um dann zu erkennen, dass das meiste davon{" "}
                <em>Theorie</em> war.
              </p>

              <p className="font-display text-lg text-base-content font-medium py-2">
                &ldquo;Also habe ich die Produktivitäts-Werkstatt
                entwickelt:&rdquo;
              </p>

              <ul className="space-y-2 pl-0">
                {[
                  "Kurze, fokussierte Lektionen",
                  "Sofort umsetzbare Experimente",
                  "Messbare Ergebnisse",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-base-content/60 pt-2">
                Mittlerweile haben{" "}
                <strong className="text-accent">80+ Teilnehmer</strong> mit
                diesem System ihre Produktivität transformiert. Ich hoffe, du
                bist der nächste.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRICING
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="pricing" className="py-20 md:py-28 px-6 bg-base-200/40 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-base-content text-center font-bold leading-tight mb-4">
              Werde produktiv,{" "}
              <Highlight>baue dein System</Highlight>
            </h2>
            <p className="text-center text-base-content/60 mb-10 max-w-xl mx-auto">
              Einmalzahlung. Lebenslanger Zugang. Keine versteckten Kosten.
            </p>

            {/* Pricing Card */}
            <div className="max-w-md mx-auto">
              <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                {/* Card Header */}
                <div className="p-6 border-b border-base-200">
                  <div className="flex items-center gap-3 mb-1">
                    <Award className="w-5 h-5 text-accent" />
                    <p className="font-display font-semibold text-lg text-base-content">
                      Produktivitäts-Werkstatt
                    </p>
                  </div>
                  <p className="text-sm text-base-content/60">
                    Der komplette 12-Wochen-Kurs
                  </p>
                </div>

                {/* Price */}
                <div className="p-6 border-b border-base-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base-content/40 line-through text-lg">
                      €549
                    </span>
                    <span className="font-display text-5xl font-bold text-base-content">
                      €299
                    </span>
                    <span className="text-base-content/60 text-sm">EUR</span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {[
                      { icon: <PlayCircle />, text: `${totalLessons} Video-Lektionen (kurz & fokussiert)` },
                      { icon: <BookOpen />, text: "Interaktives Workbook mit Templates" },
                      { icon: <BarChart3 />, text: "Produktivitäts-Katalyst Messung" },
                      { icon: <Users />, text: "Community-Zugang" },
                      { icon: <Clock />, text: "Fokus-Sessions" },
                      { icon: <RefreshCw />, text: "Lebenslange Updates" },
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-accent w-4 h-4 mt-0.5 shrink-0">
                          {feature.icon}
                        </span>
                        <span className="text-base-content/80 text-sm">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  <ButtonCheckout />
                  <p className="text-center text-xs text-base-content/50 mt-4">
                    Lebenslanger Zugang (kein Abo)
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-base-content/50">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Sichere Zahlung via Stripe
                </span>
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4" />
                  30-Tage Geld-zurück-Garantie
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="faq" className="py-20 md:py-28 px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-base-content/60 mb-10 font-medium">
              Häufig gestellte Fragen
            </p>

            <div className="space-y-2">
              {[
                {
                  q: "Für wen ist der Kurs geeignet?",
                  a: "Für Wissensarbeiter, Selbstständige, Unternehmer und alle, die nicht nur effizienter werden wollen, sondern ihr Leben in Balance bringen möchten.",
                },
                {
                  q: "Wie lange habe ich Zugang?",
                  a: "Lebenslang. Einmal zahlen, für immer lernen. Inklusive aller zukünftigen Updates.",
                },
                {
                  q: "Funktioniert das wirklich so schnell?",
                  a: "Ja. Der Produktivitäts-Katalyst misst deine Verbesserung wissenschaftlich. Im Durchschnitt sehen Teilnehmer nach 18 Tagen eine Verbesserung von 92%.",
                },
                {
                  q: "Was ist die Geld-zurück-Garantie?",
                  a: "Wenn du innerhalb von 30 Tagen nicht zufrieden bist, erstatten wir dir den vollen Kaufpreis. Keine Fragen, kein Kleingedrucktes.",
                },
                {
                  q: "Wie viel Zeit muss ich investieren?",
                  a: "15-30 Minuten täglich für die wöchentlichen Experimente. Die Video-Lektionen dauern je 5-15 Minuten. Du bestimmst das Tempo.",
                },
                {
                  q: "Ich habe noch eine Frage",
                  a: "Schreibe mir eine E-Mail an lukas@zangerl.at — ich antworte persönlich.",
                },
              ].map((item, i) => (
                <details
                  key={i}
                  className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-lg"
                >
                  <summary className="collapse-title font-medium text-base-content cursor-pointer pr-12">
                    {item.q}
                  </summary>
                  <div className="collapse-content text-base-content/70 text-sm">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-base-content leading-tight mb-6">
              Bereit für echte Produktivität?
            </h2>
            <p className="text-base-content/60 text-lg mb-8 max-w-xl mx-auto">
              Hör auf, nach der perfekten Methode zu suchen. Fang an, dein
              eigenes System aufzubauen.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link
                href="#pricing"
                className="btn btn-accent btn-lg px-10 gap-2 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                Jetzt starten
                <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex flex-col items-center gap-2 mt-4">
                <AvatarStack />
                <p className="text-base-content/60 text-sm">
                  <span className="font-semibold text-accent">80+ Teilnehmer</span>{" "}
                  haben ihr System aufgebaut
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <aside>
          <p className="font-display font-semibold text-lg">
            Die Produktivitäts-Werkstatt
          </p>
          <nav className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/impressum" className="link link-hover text-sm">
              Impressum
            </Link>
            <Link href="/privacy-policy" className="link link-hover text-sm">
              Datenschutz
            </Link>
            <Link href="/tos" className="link link-hover text-sm">
              AGB
            </Link>
            <Link href="/widerruf" className="link link-hover text-sm">
              Widerrufsrecht
            </Link>
          </nav>
          <p className="mt-4 text-sm text-base-content/60">
            © {new Date().getFullYear()} Die Produktivitäts-Werkstatt. Alle
            Rechte vorbehalten.
          </p>
        </aside>
      </footer>
    </>
  );
}
