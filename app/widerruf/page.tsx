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
          {`WIDERRUFSBELEHRUNG
gemäß Fern- und Auswärtsgeschäfte-Gesetz (FAGG)

WIDERRUFSRECHT

Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen
Vertrag zu widerrufen.

Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.

Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen
Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren
Entschluss, diesen Vertrag zu widerrufen, informieren.

Kontakt für Widerruf:
Lukas Zangerl
Jägerstätterstraße 39, 4040 Linz, Österreich
E-Mail: ${config.resend.supportEmail || "lukas@zangerlcoachingdynamics.com"}

Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über
die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.

FOLGEN DES WIDERRUFS

Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir
von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen
ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses
Vertrags bei uns eingegangen ist.

Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen
dieser Rückzahlung Entgelte berechnet.

VORZEITIGES ERLÖSCHEN DES WIDERRUFSRECHTS BEI DIGITALEN INHALTEN

Bei Verträgen über die Lieferung digitaler Inhalte, die nicht auf einem
körperlichen Datenträger geliefert werden, erlischt das Widerrufsrecht
vorzeitig, wenn:

1. Sie ausdrücklich zugestimmt haben, dass wir mit der Vertragserfüllung
   vor Ablauf der Widerrufsfrist beginnen, und

2. Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung
   mit Beginn der Vertragserfüllung Ihr Widerrufsrecht verlieren.

Dies entspricht § 18 Abs. 1 Z 11 FAGG.

Der Zugang zu den digitalen Kursinhalten erfolgt unmittelbar nach Kaufabschluss.
Mit dem Abruf der Inhalte und der vorherigen ausdrücklichen Zustimmung
verlieren Sie Ihr Widerrufsrecht.

Hinweis: Beim Kauf werden Sie gebeten, der sofortigen Bereitstellung der
digitalen Inhalte zuzustimmen und zu bestätigen, dass Sie dadurch Ihr
Widerrufsrecht verlieren.

FREIWILLIGE GELD-ZURÜCK-GARANTIE

Unabhängig vom gesetzlichen Widerrufsrecht bieten wir Ihnen eine freiwillige
30-Tage-Geld-zurück-Garantie. Wenn Sie innerhalb von 30 Tagen nach dem Kauf
nicht zufrieden sind, erstatten wir Ihnen den vollen Kaufpreis ohne Fragen.

MUSTER-WIDERRUFSFORMULAR

(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus
und senden Sie es zurück.)

An:
Lukas Zangerl
Jägerstätterstraße 39, 4040 Linz, Österreich
E-Mail: lukas@zangerlcoachingdynamics.com

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag
über den Kauf der folgenden digitalen Inhalte: ${config.appName}

Bestellt am (*)/erhalten am (*):
Name des/der Verbraucher(s):
Anschrift des/der Verbraucher(s):
Datum:

(*) Unzutreffendes streichen.`}
        </pre>
      </div>
    </main>
  );
};

export default Widerruf;
