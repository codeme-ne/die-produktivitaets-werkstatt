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
          {`Angaben gemäß § 5 TMG

Lukas Zangerl
[IHRE STRASSE UND HAUSNUMMER]
[IHRE PLZ STADT]
[IHR LAND]

Kontakt:
E-Mail: lukas@zangerlcoachingdynamics.com

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Lukas Zangerl
[ADRESSE WIE OBEN]

Hinweis zur Online-Streitbeilegung:
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
https://ec.europa.eu/consumers/odr

Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
Verbraucherschlichtungsstelle teilzunehmen.

Haftung für Inhalte:
Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
rechtswidrige Tätigkeit hinweisen.

Haftung für Links:
Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
Gewähr übernehmen.

Urheberrecht:
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.`}
        </pre>
      </div>
    </main>
  );
};

export default Impressum;
