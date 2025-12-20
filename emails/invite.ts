/**
 * Invitation email template for existing participants
 * Contains a link to /login (no expiring magic token in the invite itself)
 */

export const inviteEmail = (loginUrl: string, recipientEmail: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dein Zugang zur Produktivitäts-Werkstatt</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.7; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  
  <div style="background: linear-gradient(135deg, #C9A227 0%, #C4704A 100%); padding: 35px 20px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">🎉 Die Produktivitäts-Werkstatt<br>ist zurück!</h1>
  </div>

  <div style="background: #ffffff; padding: 35px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    
    <p style="font-size: 16px; margin: 0 0 20px 0; color: #333;">Hallo,</p>

    <p style="font-size: 16px; margin: 0 0 20px 0; color: #444;">
      ich habe es nach viel Herumbasteln und Schrauben endlich geschafft, dass wir auf eine <strong>eigene, selbst gecodete Plattform</strong> übersiedeln.
    </p>
    
    <p style="font-size: 16px; margin: 0 0 20px 0; color: #444;">
      Das heißt: <strong>Du hast ab sofort wieder Zugriff</strong> auf die Produktivitäts-Werkstatt und kannst mit Vollgas ins neue Jahr starten! 🚀
    </p>

    <p style="font-size: 16px; margin: 0 0 24px 0; color: #444;">
      Bitte verzeih mir, falls hier und da noch kleine Fehler auftauchen – es ist noch ein Prozess, alle Inhalte zu überarbeiten. Aber <strong>Good News:</strong> Mit der Überarbeitung kommen auch neue, spannende Inhalte!
    </p>

    <!-- Login Steps Box -->
    <div style="background: #FBF7F0; border: 1px solid #E8DCC8; border-radius: 10px; padding: 20px 24px; margin: 24px 0;">
      <p style="margin: 0 0 14px 0; font-size: 15px; font-weight: 700; color: #333;">📋 So loggst du dich ein:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 28px; font-size: 14px; color: #C9A227; font-weight: bold;">1.</td>
          <td style="padding: 8px 0; font-size: 14px; color: #555;">Klicke unten auf <strong>„Zum Login"</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; font-size: 14px; color: #C9A227; font-weight: bold;">2.</td>
          <td style="padding: 8px 0; font-size: 14px; color: #555;">Gib deine E-Mail-Adresse ein: <strong style="color: #C4704A;">${recipientEmail}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; font-size: 14px; color: #C9A227; font-weight: bold;">3.</td>
          <td style="padding: 8px 0; font-size: 14px; color: #555;">Du bekommst sofort einen Login-Link per E-Mail</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; font-size: 14px; color: #C9A227; font-weight: bold;">4.</td>
          <td style="padding: 8px 0; font-size: 14px; color: #555;">Klicke den Link an → fertig, du bist drin! ✅</td>
        </tr>
      </table>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="${loginUrl}"
         style="display: inline-block; background: linear-gradient(135deg, #C9A227 0%, #C4704A 100%); color: white; padding: 16px 44px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 17px; box-shadow: 0 4px 14px rgba(201, 162, 39, 0.35);">
        Zum Login →
      </a>
    </div>

    <!-- Fallback Link -->
    <p style="font-size: 13px; color: #888; text-align: center; margin: 0 0 24px 0;">
      Falls der Button nicht funktioniert:<br>
      <a href="${loginUrl}" style="color: #C4704A; word-break: break-all;">${loginUrl}</a>
    </p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 28px 0;">

    <!-- Visionstag -->
    <div style="background: #EEF7FF; border: 1px solid #C5E0F7; border-radius: 10px; padding: 18px 20px; margin: 0 0 24px 0;">
      <p style="margin: 0 0 10px 0; font-size: 15px; font-weight: 600; color: #333;">🎯 Lust, gemeinsam ins neue Jahr zu starten?</p>
      <p style="margin: 0 0 12px 0; font-size: 14px; color: #555;">
        Am <strong>11.01.2026</strong> findet der <strong>Visionstag bei Landsiedel</strong> statt – eine tolle Gelegenheit, mit klaren Zielen durchzustarten!
      </p>
      <p style="margin: 0; font-size: 14px;">
        <a href="https://www.landsiedel-seminare.de/life-coach/tagesseminar-visions-tag.php" style="color: #C4704A; font-weight: 600;">→ Mehr Infos zum Visionstag</a>
      </p>
    </div>

    <!-- Closing -->
    <p style="font-size: 15px; color: #444; margin: 0 0 6px 0;">
      Frohe Weihnachten und liebe Grüße 🎄
    </p>
    
    <p style="font-size: 15px; color: #333; margin: 20px 0 0 0; font-weight: 600;">
      Lukas Zangerl
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
    <p style="margin: 0;">© ${new Date().getFullYear()} Die Produktivitäts-Werkstatt</p>
  </div>
</body>
</html>
`;
};

export const inviteEmailSubject = "Dein Zugang zur neuen Plattform der Produktivitäts-Werkstatt";
