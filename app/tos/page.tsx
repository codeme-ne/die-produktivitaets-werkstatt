import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `AGB | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          Allgemeine Geschäftsbedingungen (AGB) für {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Stand: ${new Date().toLocaleDateString('de-DE')}

Willkommen bei ${config.appName}!

Diese Allgemeinen Geschäftsbedingungen ("AGB") regeln Ihre Nutzung der
Website ${config.domainName} und der von ${config.appName} angebotenen
Dienstleistungen. Durch die Nutzung unserer Website und Dienste stimmen
Sie diesen AGB zu.

1. BESCHREIBUNG DER DIENSTLEISTUNG

${config.appName} bietet einen Online-Kurs zum Thema künstliche Intelligenz
und AI-Systementwicklung. Der Kurs besteht aus digitalen Inhalten, die
online über unsere Plattform zugänglich sind.

2. VERTRAGSSCHLUSS UND ZUGANG

2.1 Mit dem Kauf eines Kurses kommt zwischen Ihnen und uns ein Vertrag
über die Bereitstellung digitaler Inhalte zustande.

2.2 Nach erfolgreicher Zahlung erhalten Sie per E-Mail einen Zugangslink
zu den Kursinhalten. Der Zugang erfolgt sofort nach Kaufabschluss.

2.3 Der Zugriff auf die Inhalte ist lebenslang und unbegrenzt, solange
${config.appName} die Plattform betreibt.

3. PREISE UND ZAHLUNG

3.1 Alle Preise sind Endpreise und enthalten die gesetzliche Mehrwertsteuer.

3.2 Die Zahlung erfolgt über unseren Zahlungsdienstleister Stripe.
Wir akzeptieren gängige Zahlungsmethoden wie Kreditkarte und weitere
von Stripe unterstützte Methoden.

3.3 Der Kaufpreis ist mit Vertragsschluss sofort fällig.

4. NUTZUNGSRECHTE

4.1 Mit dem Kauf erhalten Sie ein persönliches, nicht übertragbares,
nicht-exklusives Recht zur Nutzung der Kursinhalte für Ihre eigene
Weiterbildung.

4.2 Sie dürfen die Inhalte nicht weitergeben, weiterverkaufen, öffentlich
zugänglich machen oder kommerziell nutzen.

4.3 Alle Rechte an den Inhalten verbleiben bei ${config.appName}.

5. WIDERRUFSRECHT

Für den Kauf digitaler Inhalte gilt:

Sie haben ein 14-tägiges Widerrufsrecht. Wenn Sie jedoch beim Kauf
ausdrücklich zustimmen, dass wir sofort mit der Bereitstellung der
digitalen Inhalte beginnen, und Sie bestätigen, dass Sie dadurch Ihr
Widerrufsrecht verlieren, erlischt Ihr Widerrufsrecht mit dem ersten
Zugriff auf die Kursinhalte.

Details finden Sie in unserer Widerrufsbelehrung unter:
${config.domainName}/widerruf

6. RÜCKERSTATTUNG

Trotz des erlöschenden Widerrufsrechts bieten wir eine freiwillige
Geld-zurück-Garantie:

Wenn Sie innerhalb von 7 Tagen nach dem Kauf nicht zufrieden sind,
erstatten wir Ihnen den vollen Kaufpreis. Kontaktieren Sie uns dazu
per E-Mail unter ${config.resend.supportEmail || '[IHRE E-MAIL]'}.

7. DATENSCHUTZ

Wir erheben und verarbeiten personenbezogene Daten (Name, E-Mail,
Zahlungsinformationen) ausschließlich zur Vertragserfüllung. Details
finden Sie in unserer Datenschutzerklärung unter:
${config.domainName}/privacy-policy

8. HAFTUNG

8.1 Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie
bei Verletzung von Leben, Körper oder Gesundheit.

8.2 Bei leichter Fahrlässigkeit haften wir nur bei Verletzung
wesentlicher Vertragspflichten (Kardinalpflichten) und beschränkt auf
den vorhersehbaren, vertragstypischen Schaden.

8.3 Die Haftung für den Verlust von Daten ist auf den typischen
Wiederherstellungsaufwand beschränkt, der bei regelmäßiger und
gefahrentsprechender Anfertigung von Sicherungskopien eingetreten wäre.

9. ÄNDERUNGEN DER AGB

Wir behalten uns vor, diese AGB zu ändern. Bestandskunden werden über
Änderungen per E-Mail informiert. Die Änderungen gelten als genehmigt,
wenn nicht innerhalb von 14 Tagen nach Zugang der Änderungsmitteilung
widersprochen wird.

10. SCHLUSSBESTIMMUNGEN

10.1 Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
des UN-Kaufrechts.

10.2 Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt.

11. KONTAKT

Für Fragen oder Anliegen zu diesen AGB kontaktieren Sie uns bitte unter:

E-Mail: ${config.resend.supportEmail || '[IHRE E-MAIL]'}

Vielen Dank, dass Sie ${config.appName} nutzen!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
