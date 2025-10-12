import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Datenschutzerklärung | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          Datenschutzerklärung für {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Stand: ${new Date().toLocaleDateString("de-DE")}

Vielen Dank für Ihren Besuch bei ${config.appName}. Diese Datenschutzerklärung
beschreibt, wie wir Ihre personenbezogenen und nicht-personenbezogenen Daten
erheben, verwenden und schützen, wenn Sie unsere Website unter ${config.domainName}
nutzen.

Durch die Nutzung der Website erklären Sie sich mit den in dieser
Datenschutzerklärung beschriebenen Praktiken einverstanden. Wenn Sie mit
diesen Praktiken nicht einverstanden sind, nutzen Sie bitte nicht unsere
Website.

1. VERANTWORTLICHER

Verantwortlich für die Datenverarbeitung auf dieser Website ist:

[FIRMENNAME / VOLLSTÄNDIGER NAME]
[ADRESSE]
E-Mail: ${config.resend.supportEmail || "[IHRE E-MAIL]"}

2. ERHOBENE DATEN

2.1 Personenbezogene Daten

Wir erheben folgende personenbezogene Daten:

- Name: Zur Personalisierung Ihrer Erfahrung und effektiven Kommunikation
- E-Mail-Adresse: Zum Versand wichtiger Informationen zu Bestellungen,
  Updates und Kurszugang
- Zahlungsinformationen: Zur sicheren Abwicklung Ihrer Bestellungen.
  Wir speichern keine Zahlungsinformationen auf unseren Servern.
  Zahlungen werden von vertrauenswürdigen Drittanbietern (Stripe) verarbeitet.

2.2 Nicht-personenbezogene Daten

Wir verwenden Cookies und ähnliche Technologien zur Erhebung nicht-personen-
bezogener Daten wie IP-Adresse, Browsertyp, Geräteinformationen und
Browsing-Muster. Diese Informationen helfen uns, Ihr Nutzererlebnis zu
verbessern, Trends zu analysieren und unsere Dienste zu optimieren.

3. ZWECK DER DATENERHEBUNG

Wir erheben und nutzen Ihre personenbezogenen Daten ausschließlich für:
- Bereitstellung des Kurszugangs
- Abwicklung von Bestellungen
- Versand von Bestätigungen und Zugangslinks
- Kundensupport
- Benachrichtigung über wichtige Updates

4. WEITERGABE VON DATEN

Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, außer soweit
dies zur Bestellabwicklung erforderlich ist (z. B. Weitergabe an
Zahlungsdienstleister wie Stripe). Wir verkaufen, handeln oder vermieten
Ihre persönlichen Daten nicht.

5. SPEICHERDAUER

Wir speichern Ihre Daten nur so lange, wie es für die Erfüllung der
beschriebenen Zwecke erforderlich ist oder gesetzliche Aufbewahrungs-
fristen bestehen.

6. IHRE RECHTE (DSGVO)

Nach der DSGVO haben Sie folgende Rechte:
- Auskunftsrecht über Ihre gespeicherten Daten
- Recht auf Berichtigung unrichtiger Daten
- Recht auf Löschung Ihrer Daten ("Recht auf Vergessenwerden")
- Recht auf Einschränkung der Verarbeitung
- Recht auf Datenübertragbarkeit
- Widerspruchsrecht gegen die Verarbeitung
- Recht auf Beschwerde bei einer Aufsichtsbehörde

7. DATENSCHUTZ FÜR KINDER

${config.appName} richtet sich nicht an Kinder unter 16 Jahren. Wir erheben
wissentlich keine personenbezogenen Daten von Kindern. Wenn Sie Elternteil
oder Erziehungsberechtigter sind und glauben, dass Ihr Kind uns personen-
bezogene Daten zur Verfügung gestellt hat, kontaktieren Sie uns bitte.

8. COOKIES

Wir verwenden technisch notwendige Cookies für die Funktionalität der
Website (z. B. Session-Management, Kurszugang). Sie können Cookies in
Ihren Browser-Einstellungen deaktivieren, dies kann jedoch die
Funktionalität der Website einschränken.

9. ÄNDERUNGEN DER DATENSCHUTZERKLÄRUNG

Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren, um
Änderungen in unseren Praktiken oder aus anderen betrieblichen, rechtlichen
oder regulatorischen Gründen widerzuspiegeln. Wesentliche Änderungen werden
per E-Mail mitgeteilt.

10. KONTAKT

Wenn Sie Fragen oder Anliegen zu dieser Datenschutzerklärung haben,
kontaktieren Sie uns bitte unter:

E-Mail: ${config.resend.supportEmail || "[IHRE E-MAIL]"}

Durch die Nutzung von ${config.appName} stimmen Sie den Bedingungen dieser
Datenschutzerklärung zu.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
