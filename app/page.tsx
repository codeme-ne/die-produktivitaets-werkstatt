import Link from "next/link";
import Header from "@/components/Header";
import ButtonCheckout from "@/components/ButtonCheckout";
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
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Die{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Produktivitäts-Werkstatt
              </span>
            </h1>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              {moduleCount} Wochen KI-gestütztes Training für mehr Fokus, Klarheit
              und Flow im beruflichen Alltag.
            </p>
            <div className="flex gap-4 justify-center items-center">
              <Link href="/#pricing" className="btn btn-primary btn-lg group">
                <svg
                  className="w-5 h-5 fill-primary-content group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200"
                  viewBox="0 0 375 509"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M249.685 14.125C249.685 11.5046 248.913 8.94218 247.465 6.75675C246.017 4.57133 243.957 2.85951 241.542 1.83453C239.126 0.809546 236.463 0.516683 233.882 0.992419C231.301 1.46815 228.917 2.69147 227.028 4.50999L179.466 50.1812C108.664 118.158 48.8369 196.677 2.11373 282.944C0.964078 284.975 0.367442 287.272 0.38324 289.605C0.399039 291.938 1.02672 294.226 2.20377 296.241C3.38082 298.257 5.06616 299.929 7.09195 301.092C9.11775 302.255 11.4133 302.867 13.75 302.869H129.042V494.875C129.039 497.466 129.791 500.001 131.205 502.173C132.62 504.345 134.637 506.059 137.01 507.106C139.383 508.153 142.01 508.489 144.571 508.072C147.131 507.655 149.516 506.503 151.432 504.757L172.698 485.394C247.19 417.643 310.406 338.487 359.975 250.894L373.136 227.658C374.292 225.626 374.894 223.327 374.882 220.99C374.87 218.653 374.243 216.361 373.065 214.341C371.887 212.322 370.199 210.646 368.17 209.482C366.141 208.318 363.841 207.706 361.5 207.707H249.685V14.125Z" />
                </svg>
                Jetzt einschreiben
              </Link>
              <a href="#curriculum" className="btn btn-ghost btn-lg">
                Curriculum ansehen
              </a>
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="curriculum" className="bg-base-200 py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold mb-4">CURRICULUM</p>
              <h2 className="text-4xl font-extrabold mb-4">
                Was du lernen wirst
              </h2>
              <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                {moduleCount} Wochen, {totalLessons} Lektionen – strukturiert für
                nachhaltige Gewohnheiten statt overwhelmenden One-Off-Sessions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <div
                  key={module.slug}
                  className="card bg-base-100 hover:shadow-xl transition-shadow"
                >
                  <div className="card-body space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="badge badge-primary badge-lg">
                        Modul {String(index + 1).padStart(2, "0")}
                      </div>
                      <span className="text-sm text-base-content/60">
                        {module.lessonCount} Lektion
                        {module.lessonCount !== 1 ? "en" : ""}
                      </span>
                    </div>
                    <h3 className="card-title text-lg">{module.title}</h3>
                    <p className="text-base-content/70 text-sm">
                      Video-Lektionen, Checklisten und Reflexionen, die sich in
                      deinen Alltag integrieren lassen.
                    </p>
                    <Link href={`/kurs/${module.slug}`} className="btn btn-link px-0">
                      Zum Modul
                    </Link>
                  </div>
                </div>
              ))}
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      {moduleCount} Wochen mit klaren Fokus-Themen und Routinen
                    </span>
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
                    <span>Lebenslanger Zugriff auf alle Inhalte</span>
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
                      {totalLessons} Video-Lektionen plus Übungen und Checklisten
                    </span>
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
                    <span>Sofortiger Zugang zur Werkstatt nach Kauf</span>
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
                  Für wen ist diese Werkstatt ideal?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">
                    Für alle Wissensarbeiter:innen, Gründer:innen und Führungskräfte,
                    die ihre Zeit wieder aktiv steuern möchten. Du brauchst keine
                    speziellen Vorkenntnisse – wir kombinieren leichtgewichtige KI-Workflows
                    mit bewährten Produktivitätsroutinen.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-semibold">
                  Wie funktioniert der Zugang zur Werkstatt?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">
                    Nach dem Kauf erhältst du sofort per E-Mail einen
                    Zugangs-Link. Du kannst alle Wochen direkt online
                    durcharbeiten – wann und wo du möchtest. Der Zugriff ist
                    lebenslang und ohne Limit.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-semibold">
                  Welche Tools und Methoden setzen wir ein?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">
                    Wir arbeiten mit KI-Co-Piloten, Automationen und leichtgewichtigen
                    Tracking-Setups. Jedes Kapitel liefert Templates, Reflexionsfragen
                    und konkrete Workflows für deinen Alltag – von Fokusblöcken bis
                    hin zu Energie- und Kommunikationsritualen.
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
                    Ja! Wenn du innerhalb von 7 Tagen nach dem Kauf nicht
                    zufrieden bist, erstatten wir dir den vollen Kaufpreis
                    zurück. Schreib uns einfach eine E-Mail.
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
