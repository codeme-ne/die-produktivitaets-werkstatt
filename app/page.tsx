import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import ButtonCheckout from "@/components/ButtonCheckout";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { getCourseOverview } from "@/libs/pwCourse";
import {
  ArrowRight,
  Check,
  Shield,
  RotateCcw,
  PlayCircle,
  BookOpen,
  Users,
  Clock,
  RefreshCw,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   SEO METADATA
   ═══════════════════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: "Die Produktivitäts-Werkstatt | 12-Wochen System von Lukas Zangerl",
  description: "Das 12-Wochen Lebensproduktivitätssystem. Wissenschaftlich fundiert. Praxiserprobt. Messbar. Verdopple deine Produktivität mit dem bewährten System von Lukas Zangerl.",
  keywords: ["Produktivität", "Zeitmanagement", "Online-Kurs", "Produktivitätssystem", "Lukas Zangerl", "Fokus", "Effizienz"],
  authors: [{ name: "Lukas Zangerl" }],
  openGraph: {
    title: "Die Produktivitäts-Werkstatt | Verdopple deine Produktivität",
    description: "Das 12-Wochen Lebensproduktivitätssystem. Wissenschaftlich fundiert. Praxiserprobt. Messbar.",
    type: "website",
    locale: "de_DE",
    siteName: "Die Produktivitäts-Werkstatt",
  },
  twitter: {
    card: "summary_large_image",
    title: "Die Produktivitäts-Werkstatt",
    description: "Verdopple deine Produktivität in 12 Wochen",
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS DATA - Expanded from research
   ═══════════════════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    name: "Jana Lakhera",
    quote: "Die Produktivitäts-Werkstatt war für mich der beste Kurs des Jahres 2024! Es ist wirklich eine spürbare Verbesserung meiner Gesundheit und meines Wohlbefindens.",
    short: "Der beste Kurs des Jahres 2024!",
  },
  {
    name: "Carsten Hunold",
    title: "IT Projektmanager",
    quote: "Der Wert dieses Kurses übersteigt den Preis bei weitem — auch im Vergleich zu namhaften Marktbegleitern.",
    image: "/testimonials/carsten-hunold.jpg",
  },
  {
    name: "Ildiko Eder",
    quote: "Die Fokusstunden haben mir besonders geholfen, da ich in diesen Zeiten wirklich konzentriert an meinen Aufgaben bleiben konnte.",
  },
  {
    name: "Peter Cremer",
    quote: "Es geht schon wesentlich effizienter voran, dank deiner strukturellen Anregungen. Ich habe schon eine wesentlich bessere Zukunftsplanung und Klarheit für meinen Weg gewonnen.",
  },
  {
    name: "Gabriele Thies",
    quote: "In der heutigen Session habe ich eine Aufgabe erledigt, die ich schon ewig vor mir hergeschoben habe — ein sehr sehr gutes Gefühl!",
  },
  {
    name: "Steffen",
    quote: "Der Workshop bietet sehr viel Content, der aufeinander aufbaut. Zeit und Geld sind hier gut investiert.",
  },
  {
    name: "Bernd Hücker",
    quote: "Ich bin begeistert von dieser Art des Arbeitens und kann die Online-Produktivitäts-Werkstatt jedem empfehlen.",
  },
  {
    name: "Martina K",
    quote: "Innerhalb von fünf Wochen hast du es geschafft, dass ich in kleinen Schritten ein großes Stück weitergekommen bin.",
  },
];


/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Page() {
  const modules = getCourseOverview();
  const totalLessons = modules.reduce((count, mod) => count + mod.lessonCount, 0);

  return (
    <>
      <Header />

      <main className="bg-base-100">
        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION - Enhanced with DaisyUI 5
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="hero min-h-screen" style={{ backgroundImage: "url('/Produktivitäts-Werkstatt Hintergrund 1 - Morgenlich Bergtal(1).png')" }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center">
            <div className="max-w-4xl">
              {/* Trainer Badge */}
              <div className="badge badge-lg badge-primary gap-2 mb-6">
                <div className="avatar">
                  <div className="w-6 rounded-full">
                    <Image src="/trainer-lukas.jpg" alt="Lukas Zangerl - NLP Master Trainer und Produktivitäts-Coach" width={24} height={24} />
                  </div>
                </div>
                Ein Kurs von Lukas Zangerl
              </div>

              {/* Rotating Headline with CSS Animation */}
              <h1 className="text-5xl md:text-7xl font-bold text-primary-content mb-6">
                Verdopple deine<br />
                <span className="text-rotate">
                  <span className="text-rotate-inner">
                    <span>Produktivität</span>
                    <span>Effizienz</span>
                    <span>Fokuszeit</span>
                    <span>Lebensqualität</span>
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
                <Link
                  href="#pricing"
                  className="btn btn-accent btn-lg px-10 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all gap-2"
                >
                  Jetzt starten
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#curriculum" className="btn btn-outline btn-lg px-10">
                  Mehr erfahren
                </Link>
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

        {/* ═══════════════════════════════════════════════════════════════════
            TESTIMONIALS - Auto-Play Carousel
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-12 bg-base-200">
          <div className="container mx-auto px-4">
            <TestimonialsCarousel
              testimonials={testimonials}
              speed={40}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PROBLEM / SOLUTION - Enhanced
        ═══════════════════════════════════════════════════════════════════ */}
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

        {/* ═══════════════════════════════════════════════════════════════════
            CURRICULUM - DaisyUI Timeline
        ═══════════════════════════════════════════════════════════════════ */}
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

        {/* ═══════════════════════════════════════════════════════════════════
            TRAINER - Enhanced with Badges
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 px-6 bg-base-100">
          <div className="max-w-4xl mx-auto">
            <div className="card lg:card-side bg-base-200 shadow-xl">
              <figure className="lg:w-2/5">
                <Image
                  src="/trainer-lukas.jpg"
                  alt="Lukas Zangerl"
                  width={400}
                  height={400}
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

        {/* ═══════════════════════════════════════════════════════════════════
            PRICING - Enhanced with DaisyUI
        ═══════════════════════════════════════════════════════════════════ */}
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
                  <ButtonCheckout />
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

        {/* ═══════════════════════════════════════════════════════════════════
            FAQ - DaisyUI Collapse
        ═══════════════════════════════════════════════════════════════════ */}
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

        {/* ═══════════════════════════════════════════════════════════════════
            FINAL CTA - Enhanced
        ═══════════════════════════════════════════════════════════════════ */}
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
              <Link
                href="#pricing"
                className="btn btn-accent btn-lg px-12 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all gap-2"
              >
                Jetzt starten
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#curriculum"
                className="btn btn-outline btn-lg px-8"
              >
                Nochmal ansehen
              </Link>
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
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER - DaisyUI Component
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="footer footer-center bg-base-200 text-base-content p-10">
        <div className="grid grid-flow-col gap-4">
          <Link href="/impressum" className="link link-hover">Impressum</Link>
          <Link href="/privacy-policy" className="link link-hover">Datenschutz</Link>
          <Link href="/tos" className="link link-hover">AGB</Link>
          <Link href="/widerruf" className="link link-hover">Widerrufsrecht</Link>
        </div>

        <aside>
          <p className="font-display font-bold text-lg">Die Produktivitäts-Werkstatt</p>
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} — Von Lukas Zangerl mit ❤️ erstellt
          </p>
        </aside>
      </footer>

    </>
  );
}
