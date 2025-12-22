import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import OfferCountdown from "@/components/OfferCountdown";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { ProductivityToggle } from "@/components/ProductivityToggle";
import { TransformationComparison } from "@/components/TransformationComparison";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import ButtonCheckout from "@/components/ButtonCheckout";
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

/* Oberer Slider - bewegt sich von RECHTS nach LINKS */
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
    name: "Anna Schmitz",
    title: "Marketingmanagerin",
    quote: "Durch die Zusammenarbeit mit Lukas konnte ich schlechte Gewohnheiten wie das Rauchen durch gesunde Routinen ersetzen und meine beruflichen To-dos endlich wieder mit meinem Wohlbefinden in Einklang bringen.",
    image: "/testimonials/Anna_Schmitz.jpeg",
  },
  {
    name: "Peter Cremer",
    quote: "Es geht schon wesentlich effizienter voran, dank deiner strukturellen Anregungen. Ich habe schon eine wesentlich bessere Zukunftsplanung und Klarheit für meinen Weg gewonnen.",
  },
  {
    name: "Stefanie Gralewski",
    title: "Unternehmerin +20 Jahre",
    quote: "Lukas ist einer der wertschätzendsten Coaches, die ich kenne. Er bringt mich auf meinem eigenen Weg voran, ohne dass es sich jemals wie ein steiniger Weg anfühlt. Absolute Empfehlung!",
    image: "/testimonials/Stefanie_Grawleski.jpg",
  },
  {
    name: "Christine Dehnel",
    title: "lernspass-oase.de",
    quote: "Ich kann die Teilnahme an der Werkstatt, vor allem auch aufgrund von Lukas' wertvoller Präsenz, jedem empfehlen. Jetzt habe ich ein einfaches System zur Gestaltung produktiver Zeiträume, um es im Alltag einzusetzen.",
  },
  {
    name: "Dino G. Cardiano",
    quote: "Lieber Lukas, ich möchte gerne jeden Tag Fokus-Sessions haben, da sie mich in meiner Produktivität enorm unterstützen. Super Programm!!! Vielen Dank!!!",
  },
];

/* Unterer Slider - bewegt sich von LINKS nach RECHTS */
const testimonials2 = [
  {
    name: "Gabriele Thies",
    quote: "In der heutigen Session habe ich eine Aufgabe erledigt, die ich schon ewig vor mir hergeschoben habe — ein sehr sehr gutes Gefühl!",
  },
  {
    name: "Martina K.",
    quote: "Dank Lukas' wertschätzendem Coaching und seiner Produktivitätswerkstatt habe ich in nur fünf Wochen alte Glaubenssätze abgelegt und meine Ernährung sowie Bewegung so umgestellt, dass ich endlich die lang ersehnte Hexenplatte erklommen habe – ein Ziel, vor dem ich fünf Jahre lang zurückgeschreckt bin.",
    image: "/testimonials/Martina K.jpg",
  },
  {
    name: "Steffen",
    quote: "Der Workshop bietet sehr viel Content, der aufeinander aufbaut. Zeit und Geld sind hier gut investiert.",
  },
  {
    name: "Stephan Pilgrim",
    title: "Dipl.-Ingenieur (BA)",
    quote: "Besonders hilfreich im System von Lukas ist für mich das Zusammenspiel von 'Vision' und 'Aktion'.",
  },
  {
    name: "Ilka Eisermann",
    quote: "Er hat mir geholfen, meine Ziele zu definieren, realistische Pläne zu erstellen und mich regelmäßig zu motivieren. Außerdem unterstützte er mich dabei, die Ergebnisse zu überprüfen und zu reflektieren. Dank seiner Hilfe bin ich ein großes Stück weitergekommen und habe ihn bereits anderen Menschen weiterempfohlen.",
    image: "/testimonials/Ilka Eisermann.png",
  },
  {
    name: "Bernd Hücker",
    quote: "Ich bin begeistert von dieser Art des Arbeitens und kann die Online-Produktivitäts-Werkstatt jedem empfehlen.",
  },
  {
    name: "Birgit W.",
    quote: "Das Lebensproduktivitätssystem ist sehr überzeugend und hat mir geholfen, mir über meine eigenen Ziele klarzuwerden. Ich habe Deinen Kurs genossen und eine Menge für mein Leben gelernt!",
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
        <section className="hero min-h-screen" style={{ backgroundImage: "url('/Produktivitäts-Werkstatt Hintergrund 1 - Morgenlich Bergtal(1).webp')" }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center">
            <div className="max-w-4xl px-4">
              {/* Rotating Headline with CSS Animation */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-content mb-6 leading-tight">
                Verdopple deine<br />
                <span className="text-rotate text-5xl md:text-6xl lg:text-8xl text-honey-dark mt-2 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  <span className="text-rotate-inner">
                    <span>Produktivität</span>
                    <span>Effizienz</span>
                    <span>Fokuszeit</span>
                    <span>Lebensqualität</span>
                  </span>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl lg:text-2xl text-primary-content/80 mb-8 max-w-2xl mx-auto">
                Das 12-Wochen Lebensproduktivitätssystem.<br />
                Wissenschaftlich fundiert. Praxiserprobt. Messbar.
              </p>

              {/* CTAs - Mobile optimized */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 md:mb-12 w-full sm:w-auto">
                <Link
                  href="#pricing"
                  className="btn btn-accent btn-lg w-full sm:w-auto px-8 md:px-10 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all gap-2"
                >
                  Jetzt starten
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#curriculum" className="btn btn-outline btn-lg w-full sm:w-auto px-8 md:px-10 border-primary-content/30 text-primary-content hover:bg-primary-content/10 hover:border-primary-content/50">
                  Mehr erfahren
                </Link>
              </div>

              {/* Stats - DaisyUI with subtle transparency */}
              <div className="stats stats-vertical sm:stats-horizontal bg-base-200/90 backdrop-blur shadow-lg w-full sm:w-auto">
                <div className="stat place-items-center">
                  <div className="stat-title">Teilnehmer</div>
                  <div className="stat-value">80+</div>
                  <div className="stat-desc">Erfolgreich abgeschlossen</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Verbesserung</div>
                  <div className="stat-value">92%</div>
                  <div className="stat-desc">Nach 18 Tagen messbar</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Zufriedenheit</div>
                  <div className="stat-value">4.9/5</div>
                  <div className="stat-desc">Bewertung</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TESTIMONIALS - Auto-Play Carousel
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-12 bg-base-200">
          <div className="container mx-auto px-4 space-y-6">
            <TestimonialsCarousel
              testimonials={testimonials}
              speed={40}
            />
            <TestimonialsCarousel
              testimonials={testimonials2}
              speed={35}
              direction="reverse"
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PROBLEM / SOLUTION - Mobile optimized
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-base-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-base-content mb-3 md:mb-4">
                <span className="line-through text-base-content/30">Ohne System</span> Mit der Werkstatt
              </h2>
              <p className="text-base md:text-xl text-base-content/60">
                Von reaktiv zu proaktiv — in 12 Wochen
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-12">
              {/* Before - DaisyUI Card */}
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body p-5 md:p-8">
                  <h3 className="card-title text-xl md:text-2xl mb-4 md:mb-6 text-base-content/50">
                    ❌ Ohne System
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    {[
                      "47 verschiedene Apps ausprobiert",
                      "Stundenlange YouTube-Videos",
                      "Systeme, die niemand durchhält",
                      "Schlechtes Gewissen am Abend",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 rounded-full bg-base-content/20 flex-shrink-0" />
                        <span className="text-sm md:text-base text-base-content/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* After - DaisyUI Card with Accent */}
              <div className="card bg-accent/5 shadow-xl border-2 border-accent/20">
                <div className="card-body p-5 md:p-8">
                  <h3 className="card-title text-xl md:text-2xl mb-4 md:mb-6 text-accent">
                    ✓ Mit der Werkstatt
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    {[
                      "Ein System, das zum Leben passt",
                      "Motivation durch spürbaren Fortschritt",
                      "Messbare Ergebnisse nach 18 Tagen",
                      "Energie statt Erschöpfung",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-base-content font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="divider divider-accent my-8 md:my-12 text-sm md:text-base">12 Wochen Transformation</div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            5 KEYS TO PRODUCTIVITY - New Section
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-base-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
                <span className="highlight">Doppelte Produktivität</span> in weniger als 12 Wochen
              </h2>
            </div>

            <div className="w-full max-w-5xl mx-auto mt-8 pt-4">
              <TransformationComparison
                beforeSrc="/Generated Image December 10, 2025 - 4_42AM.webp"
                beforeAlt="Vorher: Fragebogen Woche 1"
                afterSrc="/Generated Image December 10, 2025 - 4_43AM.webp"
                afterAlt="Nachher: Fragebogen Woche 12"
              />
              <p className="text-center text-sm md:text-base text-base-content/70 mt-6">
                <span className="font-semibold text-accent">92% produktiver in nur 18 Tagen?</span>
                <br className="hidden sm:block" />{" "}
                Dies ist nur einer der zahlreichen Teilnehmer, der seine Produktivität deutlich verbessert hat.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CURRICULUM - DaisyUI Timeline - Mobile optimized
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="curriculum" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-base-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-base-content mb-3 md:mb-4">
                Das System dahinter
              </h2>
            </div>

            {/* Responsive Timeline */}
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              <li>
                <div className="timeline-middle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-accent">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="timeline-start mb-10 md:text-end">
                  <time className="font-mono italic text-accent">Woche 1–3</time>
                  <div className="text-lg font-black">Das Fundament</div>
                  <p className="mb-4 text-base-content/80">Wir bauen dein persönliches Produktivitätssystem auf, das zu deinem Leben passt.</p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <div className="badge badge-outline badge-accent p-3">Lebensproduktivitätssystem</div>
                    <div className="badge badge-outline badge-accent p-3">Fokus-Logbuch</div>
                    <div className="badge badge-outline badge-accent p-3">Erste Fokuszeiten</div>
                  </div>
                </div>
                <hr className="bg-accent" />
              </li>
              <li>
                <hr className="bg-accent" />
                <div className="timeline-middle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-secondary">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="timeline-end mb-10">
                  <time className="font-mono italic text-secondary">Woche 4–7</time>
                  <div className="text-lg font-black">Der Rhythmus</div>
                  <p className="mb-4 text-base-content/80">Finde deinen idealen Arbeitsrhythmus und plane deine Wochen strategisch.</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="badge badge-outline badge-secondary p-3">Dein idealer Tag</div>
                    <div className="badge badge-outline badge-secondary p-3">Wochenplanung</div>
                    <div className="badge badge-outline badge-secondary p-3">Quartalsrückblick</div>
                  </div>
                </div>
                <hr className="bg-primary" />
              </li>
              <li>
                <hr className="bg-primary" />
                <div className="timeline-middle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-primary">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="timeline-start mb-10 md:text-end">
                  <time className="font-mono italic text-primary">Woche 8–12</time>
                  <div className="text-lg font-black">Die Meisterschaft</div>
                  <p className="mb-4 text-base-content/80">Optimiere deine Energie, dein Mindset und integriere alles in ein nahtloses System.</p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <div className="badge badge-outline badge-primary p-3">Produktives Mindset</div>
                    <div className="badge badge-outline badge-primary p-3">Energie-Management</div>
                    <div className="badge badge-outline badge-primary p-3">System-Integration</div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Summary Stats */}
            <div className="stats stats-vertical sm:stats-horizontal shadow mt-8 md:mt-12 w-full">
              <div className="stat place-items-center">
                <div className="stat-title">Video-Lektionen</div>
                <div className="stat-value text-accent">{totalLessons}</div>
                <div className="stat-desc">In 12 Modulen</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Arbeitsblätter</div>
                <div className="stat-value text-secondary">8</div>
                <div className="stat-desc">Kern-Workbooks</div>
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
            KURS-PREVIEW - Ein Blick in den Kurs
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-base-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-base-content mb-3">
                Ein Blick in den Kurs
              </h2>
              <p className="text-base-content/60 text-sm md:text-base max-w-xl mx-auto">
                Entdecke die Werkzeuge und Methoden, die deine Produktivität transformieren werden.
              </p>
            </div>

            {/* Desktop: DaisyUI Carousel */}
            <div className="hidden md:flex justify-center">
              <div className="carousel carousel-center p-4 space-x-4 bg-base-200 rounded-box max-w-5xl">
                {[
                  { src: "/1.webp", title: "Kurs-Oberfläche", desc: "75 Video-Lektionen in 12 Modulen für maximale Klarheit" },
                  { src: "/2.webp", title: "Das Workbook", desc: "Dein interaktives Arbeitsbuch für tägliche Fortschritte" },
                  { src: "/3.webp", title: "Fokus-Logbuch", desc: "Das bewährte System um deine Produktivität zu tracken" },
                  { src: "/4.webp", title: "Anti-Prokrastination", desc: "Die wissenschaftliche Formel gegen Aufschieberitis" },
                  { src: "/5.webp", title: "80/20 Prinzip", desc: "Weniger tun, mehr erreichen durch radikalen Fokus" },
                  { src: "/6.webp", title: "Dein idealer Tag", desc: "So sieht ein produktiver Tagesablauf aus" },
                  { src: "/7.webp", title: "Das Lebensproduktivitätssystem", desc: "Das System das wir in der Werkstatt lernen" },
                  { src: "/8.webp", title: "Von Reaktiv zu Produktiv", desc: "Werde zum Gestalter deiner Tage" },
                ].map((item, i) => (
                  <div key={i} className="carousel-item relative group w-[28rem]">
                    <figure className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-base-300">
                      <ImageWithSkeleton
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        priority={i < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                        <p className="text-white/80 text-sm">{item.desc}</p>
                      </div>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Horizontal Scroll Snap */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[
                  { src: "/1.webp", title: "Kurs-Oberfläche", desc: "75 Video-Lektionen in 12 Modulen" },
                  { src: "/2.webp", title: "Das Workbook", desc: "Dein interaktives Arbeitsbuch" },
                  { src: "/3.webp", title: "Fokus-Logbuch", desc: "Tracke deine Produktivität" },
                  { src: "/4.webp", title: "Anti-Prokrastination", desc: "Überwinde Aufschieberitis" },
                  { src: "/5.webp", title: "80/20 Prinzip", desc: "Fokus auf das Wesentliche" },
                  { src: "/6.webp", title: "Dein idealer Tag", desc: "So sieht ein produktiver Tag aus" },
                  { src: "/7.webp", title: "Das Lebensproduktivitätssystem", desc: "Das System der Werkstatt" },
                  { src: "/8.webp", title: "Von Reaktiv zu Produktiv", desc: "Werde zum Gestalter" },
                ].map((item, i) => (
                  <div key={i} className="flex-none w-72 snap-center">
                    <div className="card bg-base-200 shadow-lg">
                      <figure className="relative aspect-video bg-base-300">
                        <ImageWithSkeleton
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover object-top"
                          priority={i < 2}
                        />
                      </figure>
                      <div className="card-body p-4">
                        <h3 className="card-title text-base">{item.title}</h3>
                        <p className="text-sm text-base-content/60">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scroll Indicator */}
              <div className="flex justify-center gap-1.5 mt-2">
                <span className="text-xs text-base-content/40">← Swipe für mehr →</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TRAINER - Mobile optimized (image on top)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-base-200">
          <div className="max-w-4xl mx-auto">
            <div className="card lg:card-side bg-base-100 shadow-xl max-w-3xl mx-auto overflow-hidden">
              <figure className="lg:w-1/3 h-64 lg:h-auto relative bg-base-300">
                <ImageWithSkeleton
                  src="/trainer-lukas.webp"
                  alt="Lukas Zangerl"
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </figure>
              <div className="card-body p-5 md:p-8 lg:w-2/3">
                <div className="badge badge-accent mb-2">Dein Trainer</div>
                <h2 className="card-title text-2xl md:text-3xl">
                  Hey, ich bin Lukas 👋
                </h2>

                <p className="text-sm md:text-base text-base-content/70 mt-4">
                  Ich bin ehemaliger Linienpilot, heutiger Unternehmer, NLP-Master-Trainer und Produktivitätsexperte. Vor einigen Jahren, als ich meine unternehmerische Reise begann, war ich ausgebrannt und gestresst. Trotz meines Wissens über Produktivität steckte ich in einem Kreislauf aus Ineffizienz und Überforderung fest.
                </p>
                <p className="text-sm md:text-base text-base-content/70 mt-2">
                  Ich arbeitete als Linienpilot mit Schichten von 50 bis 60 Stunden pro Woche. An meinen freien Tagen kümmerte ich mich um meinen Blog und meine Selbstständigkeit. Ich arbeitete hart, machte aber wenig Fortschritte und hatte keinen engen Freundeskreis mit ähnlichen Interessen oder Zielen. Es war ziemlich deprimierend.
                </p>
                <p className="text-sm md:text-base text-base-content/70 mt-2">
                  <strong className="text-base-content">Alles änderte sich, als ich die Philosophie der Wohlfühl-Produktivität entdeckte</strong> — die Idee, dass wir energiegeladener, kreativer und produktiver sind, wenn wir unsere Arbeit als angenehm empfinden.
                </p>
                <p className="text-sm md:text-base text-base-content/70 mt-2">
                  Heute helfe ich Unternehmer*innen und Führungskräften dabei, mit einem wöchentlichen 30-minütigen Planungsritual ihre Produktivität zu verdoppeln. Zusätzlich habe ich diesen 12-wöchigen Kurs ins Leben gerufen, der dir hilft, ein persönliches Lebens-Produktivitätssystem aufzubauen. Ich bin außerdem Experte für Zielerreichungs-Apps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRICING - Mobile optimized
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="pricing" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-base-200">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-base-content mb-3 md:mb-4">
                Einmal zahlen.<br />Für immer lernen.
              </h2>
              <p className="text-base md:text-lg text-base-content/60">
                Kein Abo. Lebenslanger Zugang. Alle Updates inklusive.
              </p>
            </div>

            {/* Pricing Card - Featured */}
            <div className="card bg-base-100 shadow-2xl border-2 md:border-4 border-accent relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 badge badge-accent badge-md md:badge-lg rounded-none rounded-bl-xl md:rounded-bl-2xl text-xs md:text-sm">
                BESTSELLER
              </div>

              <div className="card-body p-5 md:p-8">
                {/* Price with Stats Component */}
                <div className="stats stats-vertical sm:stats-horizontal bg-accent/10 shadow mb-4 md:mb-6 w-full">
                  <div className="stat py-3 md:py-4">
                    <div className="stat-title text-center text-xs md:text-sm">Normalpreis</div>
                    <div className="stat-value text-center line-through text-base-content/40 text-2xl md:text-3xl">€549</div>
                  </div>
                  <div className="stat py-3 md:py-4">
                    <div className="stat-title text-center text-xs md:text-sm">Frühbucher</div>
                    <div className="stat-value text-center text-accent text-4xl md:text-6xl">€299</div>
                  </div>
                </div>

                <div className="text-center mb-4 md:mb-6">
                  <p className="text-sm md:text-base text-base-content/60">Einmalige Zahlung — Lebenslanger Zugang</p>
                </div>

                <div className="divider divider-accent text-sm md:text-base">Alles inklusive</div>

                {/* Features List */}
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {[
                    { icon: <PlayCircle className="w-5 h-5" />, text: `${totalLessons} Video-Lektionen`, badge: "12 Module" },
                    { icon: <BookOpen className="w-5 h-5" />, text: "Interaktives Workbook", badge: "PDF" },
                    { icon: <Users className="w-5 h-5" />, text: "Community-Zugang", badge: "Exklusiv" },
                    { icon: <Clock className="w-5 h-5" />, text: "Wöchentliche Fokus-Sessions", badge: "Live" },
                    { icon: <RefreshCw className="w-5 h-5" />, text: "Lebenslange Updates", badge: "Kostenlos" },
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 md:gap-3 min-w-0">
                        <span className="text-accent shrink-0">{feature.icon}</span>
                        <span className="text-sm md:text-base text-base-content truncate">{feature.text}</span>
                      </div>
                      <div className="badge badge-outline badge-accent badge-xs md:badge-sm shrink-0">{feature.badge}</div>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="card-actions">
                  <ButtonCheckout />
                </div>

                {/* Trust Badges */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-base-200">
                  <div className="tooltip" data-tip="SSL-verschlüsselte Zahlung">
                    <span className="flex items-center gap-2 text-xs md:text-sm text-base-content/60">
                      <Shield className="w-4 h-4 text-success" />
                      Sichere Zahlung
                    </span>
                  </div>
                  <div className="tooltip" data-tip="Geld-zurück ohne Fragen">
                    <span className="flex items-center gap-2 text-xs md:text-sm text-base-content/60">
                      <RotateCcw className="w-4 h-4 text-info" />
                      30 Tage Garantie
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Money-Back Guarantee Card */}
            <div className="card bg-success/10 shadow-lg mt-6 md:mt-8">
              <div className="card-body text-center py-4 md:py-6 px-4 md:px-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 text-success shrink-0" />
                  <div>
                    <h4 className="font-bold text-base md:text-lg">30-Tage-Geld-zurück-Garantie</h4>
                    <p className="text-xs md:text-sm text-base-content/60">Risikofrei testen. Geld zurück ohne Fragen.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FAQ - Mobile optimized with touch-friendly areas
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="faq" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-base-100">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-base-content mb-3 md:mb-4">
                Häufige Fragen
              </h2>
              <p className="text-sm md:text-base text-base-content/60">
                Alle Antworten auf deine wichtigsten Fragen
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
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
                <div key={i} className="collapse collapse-arrow bg-base-200 rounded-xl md:rounded-2xl shadow-sm">
                  <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
                  <div className="collapse-title text-base md:text-lg font-semibold text-base-content min-h-[3.5rem] md:min-h-[4rem] py-4 pr-12">
                    {item.q}
                  </div>
                  <div className="collapse-content text-sm md:text-base text-base-content/70">
                    <p className="pt-2 pb-1">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Card */}
            <div className="card bg-base-200 shadow-lg mt-8 md:mt-12">
              <div className="card-body text-center py-5 md:py-6 px-4 md:px-6">
                <h4 className="font-bold text-base md:text-lg">Noch Fragen?</h4>
                <p className="text-xs md:text-sm text-base-content/60 mb-3 md:mb-4">
                  Schreibe mir eine E-Mail — ich antworte persönlich.
                </p>
                <a
                  href="mailto:lukas@zangerl.at"
                  className="btn btn-accent btn-sm w-full sm:w-auto"
                >
                  E-Mail senden
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FINAL CTA - Mobile optimized
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-br from-accent/10 via-base-200 to-secondary/10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Alert Badge removed, replaced with Countdown */}
            <OfferCountdown />

            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-base-content mb-4 md:mb-6">
              Bereit deine Produktivität<br />zu verdoppeln?
            </h2>
            <p className="text-base md:text-xl text-base-content/70 mb-8 md:mb-10 max-w-xl mx-auto">
              Hör auf zu planen. Fang an zu handeln.<br />
              80+ Teilnehmer haben bereits ihre Produktivität transformiert.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
              <Link
                href="#pricing"
                className="btn btn-accent btn-md md:btn-lg w-full sm:w-auto px-12 md:px-16 shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all gap-2"
              >
                Jetzt starten
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 text-xs md:text-sm text-base-content/50">
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

        {/* ═══════════════════════════════════════════════════════════════════
            ABSCHLUSS BANNER - Die Werkstatt bei Nacht (Story: Tag → Nacht)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center">
          {/* Fullscreen Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/werkstatt-nacht.webp"
              alt="Die Produktivitäts-Werkstatt bei Nacht"
              fill
              className="object-cover object-center"
              priority={false}
            />
            {/* Gradient Overlays für bessere Lesbarkeit */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-base-200/30 to-transparent h-32" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center px-4 py-16 md:py-24">
            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Wir sehen uns in der{' '}
              <span className="text-[#E8A94B]">
                Werkstatt
              </span>
            </h2>
            
            {/* Subtile Dekoration */}
            <div className="flex items-center justify-center gap-3 opacity-70">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-400/60"></div>
              <span className="text-amber-400 text-lg">✦</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-400/60"></div>
            </div>
          </div>
          
          {/* Sanfter Übergang zum Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-base-200 to-transparent" />
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER - DaisyUI Component
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="footer footer-center bg-base-200 text-base-content p-6 md:p-10">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link href="/impressum" className="link link-hover">Impressum</Link>
          <Link href="/privacy-policy" className="link link-hover">Datenschutz</Link>
          <Link href="/tos" className="link link-hover">AGB</Link>
          <Link href="/widerruf" className="link link-hover">Widerrufsrecht</Link>
        </div>

        <aside className="text-center">
          <p className="font-display font-bold text-base md:text-lg">Die Produktivitäts-Werkstatt</p>
          <p className="text-xs md:text-sm text-base-content/60">
            © {new Date().getFullYear()} — Von Lukas Zangerl mit ❤️ erstellt
          </p>
          
          {/* Fun Productivity Toggle Easter Egg */}
          <ProductivityToggle />
        </aside>
      </footer>

    </>
  );
}
