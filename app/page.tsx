import Link from "next/link";
import Header from "@/components/Header";
import ButtonCheckout from "@/components/ButtonCheckout";
import FokusLogbuch from "@/components/FokusLogbuch";
import { getCourseOverview } from "@/libs/pwCourse";

export default function Page() {
  const modules = getCourseOverview();
  const moduleCount = modules.length;
  const totalLessons = modules.reduce(
    (count, module) => count + module.lessonCount,
    0,
  );

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-base-100 py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Headline & CTA */}
              <div className="space-y-8 text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                  Verdopple deine Produktivität –{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    mit mehr Leichtigkeit und Freude
                  </span>
                </h1>
                <p className="text-xl text-base-content/70 max-w-2xl mx-auto lg:mx-0">
                  Wissenschaftlich fundiertes 12-Wochen-System für Wissensarbeiter:innen,
                  die nicht nur effizienter werden wollen, sondern ihr Leben in Balance bringen möchten.
                </p>
                <div className="flex gap-4 justify-center lg:justify-start items-center flex-wrap">
                  <Link href="/#pricing" className="btn btn-primary btn-lg group">
                    <svg
                      className="w-5 h-5 fill-primary-content group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200"
                      viewBox="0 0 375 509"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M249.685 14.125C249.685 11.5046 248.913 8.94218 247.465 6.75675C246.017 4.57133 243.957 2.85951 241.542 1.83453C239.126 0.809546 236.463 0.516683 233.882 0.992419C231.301 1.46815 228.917 2.69147 227.028 4.50999L179.466 50.1812C108.664 118.158 48.8369 196.677 2.11373 282.944C0.964078 284.975 0.367442 287.272 0.38324 289.605C0.399039 291.938 1.02672 294.226 2.20377 296.241C3.38082 298.257 5.06616 299.929 7.09195 301.092C9.11775 302.255 11.4133 302.867 13.75 302.869H129.042V494.875C129.039 497.466 129.791 500.001 131.205 502.173C132.62 504.345 134.637 506.059 137.01 507.106C139.383 508.153 142.01 508.489 144.571 508.072C147.131 507.655 149.516 506.503 151.432 504.757L172.698 485.394C247.19 417.643 310.406 338.487 359.975 250.894L373.136 227.658C374.292 225.626 374.894 223.327 374.882 220.99C374.87 218.653 374.243 216.361 373.065 214.341C371.887 212.322 370.199 210.646 368.17 209.482C366.141 208.318 363.841 207.706 361.5 207.707H249.685V14.125Z" />
                    </svg>
                    Jetzt Transformation starten
                  </Link>
                  <a href="#curriculum" className="btn btn-ghost btn-lg">
                    System kennenlernen
                  </a>
                </div>
                <div className="pt-8 flex justify-center lg:justify-start gap-8 text-sm text-base-content/60 flex-wrap">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Über 30 Absolvent:innen
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Messbare Ergebnisse
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Wissenschaftlich fundiert
                  </div>
                </div>
              </div>

              {/* Right: Interactive Demo */}
              <div className="flex justify-center lg:justify-end">
                <FokusLogbuch />
              </div>
            </div>
          </div>
        </section>

        {/* Why Section - Problem & Solution */}
        <section className="bg-base-200 py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold">
                  Warum die meisten Produktivitätssysteme scheitern
                </h2>
                <p className="text-base-content/80 leading-relaxed">
                  Du hast schon dutzende Produktivitäts-Apps ausprobiert, hunderte Artikel
                  über Zeitmanagement gelesen, zahlreiche To-Do-Listen-Systeme getestet.
                  Und trotzdem: Am Ende der Woche fragst du dich, wo die Zeit geblieben ist.
                </p>
                <p className="text-base-content/80 leading-relaxed">
                  <strong>Das Problem ist nicht, dass du zu wenig weißt.</strong>{" "}
                  Das Problem ist, dass dir ein ganzheitliches System fehlt, das nicht nur
                  deine Effizienz steigert, sondern auch Sinn, Balance und Freude in dein
                  Leben bringt.
                </p>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl">Das Lebensproduktivitätssystem</h3>
                  <p className="text-base-content/70">
                    Stell dir vor, dein Leben ist wie ein Boot auf dem Ozean. Mit unserem
                    System lernst du:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🧭</span>
                      <div>
                        <strong>Richtung finden</strong>
                        <p className="text-sm text-base-content/60">
                          Lebenskompass, Zukunftsskizze & Quartals-Missionen
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🚀</span>
                      <div>
                        <strong>Antrieb entwickeln</strong>
                        <p className="text-sm text-base-content/60">
                          Fokussierte Stunden, Produktive Tage & Ausgeglichene Wochen
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">⛵</span>
                      <div>
                        <strong>Mit Freude segeln</strong>
                        <p className="text-sm text-base-content/60">
                          Energie tanken, Regenerieren & das innere Spiel meistern
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="curriculum" className="bg-base-100 py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-4">CURRICULUM</p>
              <h2 className="text-4xl font-extrabold mb-4">
                Das Lebensproduktivitätssystem
              </h2>
              <p className="text-base-content/70 text-lg max-w-3xl mx-auto">
                In {moduleCount} Wochen baust du dir ein ganzheitliches System,
                das auf 5 Kernfähigkeiten basiert: <strong>Ausrichten</strong>,{" "}
                <strong>Organisieren</strong>, <strong>Fokussieren</strong>,{" "}
                <strong>Reflektieren</strong> und <strong>Regenerieren</strong>.
              </p>
            </div>

            {/* 5 Core Competencies */}
            <div className="mb-16">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {[
                  { icon: "🧭", label: "Ausrichten", desc: "Richtung finden" },
                  { icon: "📂", label: "Organisieren", desc: "Struktur schaffen" },
                  { icon: "🎯", label: "Fokussieren", desc: "Tiefenarbeit" },
                  { icon: "🤔", label: "Reflektieren", desc: "Lernen & Anpassen" },
                  { icon: "🧘", label: "Regenerieren", desc: "Energie tanken" },
                ].map((skill) => (
                  <div
                    key={skill.label}
                    className="text-center p-4 bg-base-200 rounded-lg"
                  >
                    <div className="text-4xl mb-2">{skill.icon}</div>
                    <div className="font-semibold text-sm">{skill.label}</div>
                    <div className="text-xs text-base-content/60">{skill.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, index) => {
                // Map specific tools/methods to each module
                const moduleTools: Record<number, string> = {
                  1: "Produktivitäts-Katalyst, Lebensproduktivitätssystem-Framework",
                  2: "Fokus-Logbuch, Co-Working Sessions, 5-50-5-Methode",
                  3: "Lebenskompass, Grabrede-Übung, Mission & Erfolgs-Definition",
                  4: "Morgen-Manifest, Idealer Dienstag, Abendliches Abschalten",
                  5: "3-Jahres-Traum, Vision Board, Odyssee-Plan",
                  6: "Ideale Woche, Wöchentliches Planungsritual",
                  7: "Quartals-Missionen, ZPS-Methode, Haupt- & Neben-Missionen",
                  8: "Zweites Gehirn, Organisieren-Workshop, Aufgaben-System",
                  9: "Anti-Prokrastinations-Protokoll, Alter Ego Effekt, Motivationsspektrum",
                  10: "Energie-Menü, Burnout-Prävention, Regenerations-Strategien",
                  11: "Raum-Optimierung (physisch & digital), Produktivitäts-Community",
                  12: "Abschluss & Integration, Feedback-Session",
                };

                const tools = moduleTools[index + 1] || "Praktische Übungen & Reflexionen";

                return (
                  <div
                    key={module.slug}
                    className="card bg-base-200 hover:shadow-xl transition-shadow border border-base-300"
                  >
                    <div className="card-body space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="badge badge-primary badge-lg">
                          Woche {String(index + 1).padStart(2, "0")}
                        </div>
                        <span className="text-sm text-base-content/60">
                          {module.lessonCount} Lektion
                          {module.lessonCount !== 1 ? "en" : ""}
                        </span>
                      </div>
                      <h3 className="card-title text-lg">{module.title}</h3>
                      <p className="text-base-content/70 text-sm">
                        <strong>Werkzeuge:</strong> {tools}
                      </p>
                      <Link href={`/kurs/${module.slug}`} className="btn btn-link px-0 justify-start">
                        Zum Modul →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-base-200 py-16 px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div>
              <div className="text-5xl font-extrabold text-primary mb-4">30+</div>
              <p className="text-xl text-base-content/80">
                Menschen haben bereits ihre persönliche Bestleistung erreicht
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold">2x</div>
                <p className="text-sm text-base-content/70">
                  Verdopplung der fokussierten Stunden (im Durchschnitt)
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">12 Wochen</div>
                <p className="text-sm text-base-content/70">
                  Strukturiertes Training für nachhaltige Gewohnheiten
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">5 Fähigkeiten</div>
                <p className="text-sm text-base-content/70">
                  Ausrichten, Organisieren, Fokussieren, Reflektieren, Regenerieren
                </p>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-base-content/60 italic">
                &bdquo;Ein System, das nicht nur deine Produktivität steigert, sondern auch Sinn
                und Freude in dein Leben bringt.&ldquo;
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-base-100 py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-4">PREIS</p>
              <h2 className="text-4xl font-extrabold mb-4">
                Einmalzahlung. Lebenslanger Zugang.
              </h2>
              <p className="text-base-content/70 text-lg">
                Keine Abos, keine versteckten Kosten. Einmal zahlen, für immer
                lernen.
              </p>
            </div>

            <div className="card bg-base-200 shadow-2xl max-w-md mx-auto">
              <div className="card-body items-center text-center space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-wide text-base-content/60 mb-2">
                    Kompletter Kurs
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-extrabold">€97</span>
                  </div>
                  <p className="text-sm text-base-content/60 mt-2">
                    Einmalige Zahlung
                  </p>
                </div>

                <div className="divider"></div>

                <ul className="space-y-3 text-left w-full">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <div>
                      <strong>Produktivitäts-Katalyst</strong>
                      <p className="text-sm text-base-content/60">
                        Vorher/Nachher-Messung deiner Transformation
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <div>
                      <strong>Community & Co-Working Sessions</strong>
                      <p className="text-sm text-base-content/60">
                        Gemeinsam fokussiert arbeiten, Austausch & Accountability
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div>
                      <strong>Konkrete Werkzeuge & Templates</strong>
                      <p className="text-sm text-base-content/60">
                        Lebenskompass, Fokus-Logbuch, Quartals-Missionen & mehr
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <div>
                      <strong>Wissenschaftlich fundiert</strong>
                      <p className="text-sm text-base-content/60">
                        Basierend auf Forschung & erprobt mit über 30 Teilnehmer:innen
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      {totalLessons} Video-Lektionen + Lebenslanger Zugriff
                    </span>
                  </li>
                </ul>

                <div className="divider"></div>

                <div className="w-full">
                  <ButtonCheckout />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-base-200 py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-4">FAQ</p>
              <h2 className="text-4xl font-extrabold">
                Häufig gestellte Fragen
              </h2>
            </div>

            <div className="space-y-4">
              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="collapse-title text-lg font-semibold">
                  Was macht diesen Kurs anders als andere Produktivitätskurse?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">
                    Die meisten Produktivitätskurse fokussieren sich nur auf &bdquo;mehr
                    Output in weniger Zeit&ldquo;. Das Lebensproduktivitätssystem geht weiter:
                    Es verbindet <strong>Wissenschaft</strong> (messbare Ergebnisse),
                    <strong>Praxis</strong> (konkrete Werkzeuge) und <strong>Freude</strong>{" "}
                    (Balance & Sinn). Du baust dir über 12 Wochen ein ganzheitliches
                    System, das zu dir passt – nicht ein starres Schema, das für alle
                    gleich ist.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-semibold">
                  Ist das nur Zeitmanagement oder mehr?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70 space-y-2">
                    <span className="block">
                      Viel mehr! Das Lebensproduktivitätssystem adressiert nicht nur
                      &bdquo;Zeit&ldquo;, sondern deine gesamte Lebensführung:
                    </span>
                    <span className="block">
                      • <strong>Körper</strong>: Energie, Schlaf, Gesundheit
                    </span>
                    <span className="block">
                      • <strong>Herz</strong>: Motivation, Emotionen, Anti-Prokrastination
                    </span>
                    <span className="block">
                      • <strong>Verstand</strong>: Fokus, Organisation, Reflexion
                    </span>
                    <span className="block mt-2">
                      Du lernst, dein Leben wie ein Boot auf dem Ozean zu steuern – mit
                      klarer Richtung, starkem Antrieb und der Freude am Segeln.
                    </span>
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-semibold">
                  Wie viel Zeit muss ich investieren?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">
                    Realistisch: 15-30 Minuten täglich für die wöchentlichen Experimente
                    (z.B. Fokus-Logbuch führen, Lebenskompass erstellen). Die
                    Video-Lektionen dauern je 5-15 Minuten. Du bestimmst selbst das Tempo
                    – manche arbeiten intensiv eine Woche durch, andere nehmen sich mehr
                    Zeit. Das System passt sich an deinen Alltag an.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-semibold">
                  Für wen ist diese Werkstatt ideal?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">
                    Für Wissensarbeiter:innen, Gründer:innen und Führungskräfte, die
                    nicht nur &bdquo;produktiver&ldquo; werden wollen, sondern ihr Arbeitsleben in
                    Balance mit ihren Werten und Zielen bringen möchten. Du brauchst
                    keine Vorkenntnisse – nur die Bereitschaft, zu experimentieren und
                    dein persönliches System aufzubauen.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-semibold">
                  Welche Werkzeuge und Methoden lerne ich konkret?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">
                    Du bekommst konkrete, erprobte Werkzeuge: Produktivitäts-Katalyst
                    (Vorher/Nachher-Messung), Fokus-Logbuch (Daily Tracking),
                    Lebenskompass (Vision & Werte), Quartals-Missionen (90-Tage-Sprints),
                    Anti-Prokrastinations-Protokoll, Energie-Menü, Ideale Woche und viele
                    mehr. Jedes Tool ist praxiserprobt und direkt umsetzbar.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-semibold">
                  Gibt es eine Geld-zurück-Garantie?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">
                    Ja! Wenn du innerhalb von 7 Tagen nach dem Kauf nicht zufrieden
                    bist, erstatten wir dir den vollen Kaufpreis zurück. Schreib uns
                    einfach eine E-Mail. Kein Kleingedrucktes, keine Tricks.
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-base-300 py-8 px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-base-content/60">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/impressum" className="link link-hover">
              Impressum
            </Link>
            <Link href="/privacy-policy" className="link link-hover">
              Datenschutz
            </Link>
            <Link href="/tos" className="link link-hover">
              AGB
            </Link>
            <Link href="/widerruf" className="link link-hover">
              Widerrufsrecht
            </Link>
          </div>
          <p>© 2025 KI Kompakt Kurs. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </>
  );
}
