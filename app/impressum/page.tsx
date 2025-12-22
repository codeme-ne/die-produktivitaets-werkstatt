import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Impressum | ${config.appName}`,
  canonicalUrlRelative: "/impressum",
});

const Impressum = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Zurück
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">Impressum</h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Impressum gemäß § 5 ECG (E-Commerce-Gesetz)

Diensteanbieter:
Lukas Zangerl
Jägerstätterstraße 39
4040 Linz
Österreich

Kontakt:
E-Mail: lukas@zangerlcoachingdynamics.com

Unternehmensgegenstand:
Online-Kurse und digitale Bildungsangebote im Bereich Produktivität

Anwendbare Rechtsvorschriften:
E-Commerce-Gesetz (ECG), Konsumentenschutzgesetz (KSchG),
Fern- und Auswärtsgeschäfte-Gesetz (FAGG)
Abrufbar unter: https://www.ris.bka.gv.at

Hinweis zur Online-Streitbeilegung:
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
https://ec.europa.eu/consumers/odr

Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer
Verbraucherschlichtungsstelle teilzunehmen.

Haftung für Inhalte:
Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
Gemäß § 16 ECG sind wir als Diensteanbieter für eigene Inhalte und bereitgestellte
Informationen verantwortlich. Wir sind jedoch nicht verpflichtet, fremde übermittelte
oder gespeicherte Informationen zu überwachen (§ 18 ECG).

Haftung für Links:
Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
Anbieter oder Betreiber der Seiten verantwortlich.

Urheberrecht:
Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
unterliegen dem österreichischen Urheberrecht (Urheberrechtsgesetz - UrhG).
Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
des jeweiligen Autors bzw. Erstellers.`}
        </pre>
      </div>
    </main>
  );
};

export default Impressum;
