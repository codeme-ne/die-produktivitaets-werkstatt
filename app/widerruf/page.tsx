import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Widerrufsrecht | ${config.appName}`,
  canonicalUrlRelative: "/widerruf",
});

const Widerruf = () => {
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
        <h1 className="text-3xl font-extrabold pb-6">
          Widerrufsbelehrung für digitale Inhalte
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`WIDERRUFSRECHT

Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen
Vertrag zu widerrufen.

Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.

Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen
Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren
Entschluss, diesen Vertrag zu widerrufen, informieren.

Kontakt für Widerruf:
[FIRMENNAME]
[ADRESSE]
E-Mail: ${config.resend.supportEmail || "[IHRE E-MAIL]"}

Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch
nicht vorgeschrieben ist.

Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über
die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.

FOLGEN DES WIDERRUFS

Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir
von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der
zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der
Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt
haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags
bei uns eingegangen ist.

Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen
dieser Rückzahlung Entgelte berechnet.

VORZEITIGES ERLÖSCHEN DES WIDERRUFSRECHTS BEI DIGITALEN INHALTEN

Sie stimmen ausdrücklich zu, dass wir mit der Ausführung des Vertrags über
die Bereitstellung digitaler Inhalte (Online-Kurszugang) vor Ablauf der
Widerrufsfrist beginnen.

Durch Ihre ausdrückliche Zustimmung beim Kaufvorgang und die Bestätigung,
dass Sie zur Kenntnis genommen haben, dass Sie mit Beginn der Vertragserfüllung
Ihr Widerrufsrecht verlieren, erlischt Ihr Widerrufsrecht.

Der Zugang zu den digitalen Inhalten erfolgt unmittelbar nach Kaufabschluss.
Mit dem Abruf der Inhalte verlieren Sie daher Ihr Widerrufsrecht gemäß
§ 356 Abs. 5 BGB.

Hinweis: Wenn Sie auf "Jetzt kaufen" klicken und beide Checkboxen aktivieren,
stimmen Sie ausdrücklich der sofortigen Vertragserfüllung zu und nehmen zur
Kenntnis, dass Sie dadurch Ihr Widerrufsrecht verlieren.`}
        </pre>
      </div>
    </main>
  );
};

export default Widerruf;
