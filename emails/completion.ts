/**
 * Completion email template sent when user completes all lessons
 * Contains link back to dashboard
 */
export const completionEmail = (dashboardLink: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glückwunsch – Kurs abgeschlossen!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎓 Glückwunsch!</h1>
  </div>
  
  <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 8px 8px;">
    <p style="font-size: 18px; margin-bottom: 20px; font-weight: 600;">
      Du hast den AI-Kurs erfolgreich abgeschlossen! 🎉
    </p>
    
    <p style="font-size: 16px; margin-bottom: 20px;">
      Großartige Leistung! Du hast alle Lektionen durchgearbeitet und bist jetzt bereit, dein Wissen in der Praxis anzuwenden.
    </p>
    
    <div style="background: white; border: 2px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 8px;">
      <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
        Was als Nächstes?
      </p>
      <ul style="margin: 10px 0; padding-left: 20px; font-size: 15px;">
        <li>Wiederhole die Lektionen jederzeit auf deinem Dashboard</li>
        <li>Setze dein Wissen in eigenen Projekten um</li>
        <li>Bleib auf dem Laufenden mit neuen AI-Entwicklungen</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 40px 0;">
      <a href="${dashboardLink}" 
         style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        Zum Dashboard →
      </a>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
    
    <p style="font-size: 14px; color: #666; margin: 0;">
      Vielen Dank, dass du Teil dieses Kurses warst. Wir wünschen dir viel Erfolg auf deinem weiteren Weg mit AI!
    </p>
    
    <p style="font-size: 14px; color: #666; margin-top: 20px;">
      Bei Fragen sind wir jederzeit für dich da.<br>
      Dein AI-Kurs Team
    </p>
  </div>
  
  <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
    <p>© ${new Date().getFullYear()} AI-Kurs. Alle Rechte vorbehalten.</p>
  </div>
</body>
</html>
`;

export const completionEmailSubject = "🎓 Glückwunsch – Kurs abgeschlossen!";
