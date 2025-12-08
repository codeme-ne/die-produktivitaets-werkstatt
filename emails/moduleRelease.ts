interface ModuleReleaseEmailProps {
  moduleTitle: string;
  moduleOrder: number;
  moduleLink: string;
}

export function moduleReleaseSubject(moduleTitle: string) {
  return `Neue Lektion freigeschaltet: ${moduleTitle}`;
}

export function moduleReleaseEmail({
  moduleTitle,
  moduleOrder,
  moduleLink,
}: ModuleReleaseEmailProps) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Neue Lektion freigeschaltet</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111; max-width: 640px; margin: 0 auto; padding: 24px;">
    <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 28px 20px; border-radius: 12px 12px 0 0; color: #fff;">
      <p style="margin: 0; letter-spacing: 0.5px; text-transform: uppercase; font-size: 13px;">Modul ${moduleOrder}</p>
      <h1 style="margin: 6px 0 0; font-size: 24px;">${moduleTitle}</h1>
    </div>
    <div style="background: #f8fafc; padding: 28px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
      <p style="font-size: 16px; margin: 0 0 16px 0;">
        Dein nächstes Modul ist jetzt freigeschaltet. Schnapp dir einen Kaffee und leg los.
      </p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${moduleLink}" style="display: inline-block; background: #2563eb; color: #fff; padding: 14px 30px; border-radius: 10px; text-decoration: none; font-weight: 600; box-shadow: 0 10px 30px rgba(37,99,235,0.25);">Zum Modul</a>
      </div>
      <p style="font-size: 14px; color: #334155; margin: 0 0 8px 0;">Kurzer Tipp: Plane dir 45–60 Minuten Fokuszeit ein und hake die Lektionen danach direkt als erledigt ab.</p>
      <p style="font-size: 14px; color: #334155; margin: 0;">Viel Erfolg und bis gleich!</p>
    </div>
    <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">Du möchtest diese Benachrichtigungen nicht mehr erhalten? Aktualisiere deine Kurs-Einstellungen.</p>
  </body>
</html>
`;
}
