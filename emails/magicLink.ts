/**
 * Magic Link email template for login
 * Sent when user requests access via /login
 */
export const magicLinkEmail = (loginLink: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dein Login-Link</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #C9A227 0%, #C4704A 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Produktivitäts-Werkstatt</h1>
  </div>

  <div style="background: #FBF7F0; padding: 40px 30px; border-radius: 0 0 8px 8px;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Du hast einen Login-Link angefordert.
    </p>

    <p style="font-size: 16px; margin-bottom: 30px;">
      Klicke auf den Button unten, um dich einzuloggen:
    </p>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${loginLink}"
         style="display: inline-block; background: linear-gradient(135deg, #C9A227 0%, #C4704A 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        Jetzt einloggen
      </a>
    </div>

    <div style="background: white; border-left: 4px solid #C9A227; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px; color: #666;">
        <strong>Hinweis:</strong> Dieser Link ist 15 Minuten gültig und kann nur einmal verwendet werden.
      </p>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Falls du keinen Login angefordert hast, kannst du diese E-Mail ignorieren.
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

    <p style="font-size: 14px; color: #666; margin: 0;">
      Viele Grüße,<br>
      Dein Produktivitäts-Werkstatt Team
    </p>
  </div>

  <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
    <p>© ${new Date().getFullYear()} Produktivitäts-Werkstatt</p>
  </div>
</body>
</html>
`;

export const magicLinkEmailSubject = "Dein Login-Link für die Produktivitäts-Werkstatt";
