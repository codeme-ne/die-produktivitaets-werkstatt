/**
 * Bunny image reference mapping per module.
 *
 * If a Markdown description contains placeholders like ![][image1],
 * we can append reference definitions that point to the public CDN URLs.
 */

const BUNNY_CDN = "https://pw-bunny.b-cdn.net";

type ModuleImageMap = Record<string, string[]>; // ordered list maps to image1..imageN

// Filenames must match exactly (case-sensitive); we URL-encode them when building URLs.
const MODULE_IMAGES: ModuleImageMap = {
  "modul-01": [
    "PW-M1-Produktivitäts-Formel.jpg",
    "PW-M1-Segelboot.jpeg",
    "PW-M1-Produktivitätssystem-Vision-Aktion.jpeg",
    "PW-M1-Lebensproduktivitätssystem-Kapitän.jpeg",
    "PW-M1-Lebensproduktivitätssystem-Raum.jpeg",
    "PW-M1-Segelboot.jpeg", // reused intentionally
    "PW-M1-Produktivitätssystem-Vision-Aktion.jpeg", // for image7 (overview)
  ],
  "modul-02": [
    "PW-M2-Fokusformel.jpeg",
    "PW-M2-Fokuslogbuch-Zitate.jpeg",
    "PW-M2-Planen-Übersichtsfolie.jpeg",
    "PW-M2-Organisieren-Übersichtsfolie.jpeg",
    "PW-M2-Reflektieren-Übersichtsfolie.jpeg",
    "PW-M2-Regenerieren-Übersichtsfolie.jpeg",
  ],
  // Ensure arrays are at least as long as the highest image index used per module
  // Modul 03 needs up to image15
  "modul-03": [
    "PW-M3-Placeholder-01.jpeg",
    "PW-M3-Placeholder-02.jpeg",
    "PW-M3-Placeholder-03.jpeg",
    "PW-M3-Placeholder-04.jpeg",
    "PW-M3-Placeholder-05.jpeg",
    "PW-M3-Placeholder-06.jpeg",
    "PW-M3-Placeholder-07.jpeg",
    "PW-M3-Placeholder-08.jpeg",
    "PW-M3-Placeholder-09.jpeg",
    "PW-M3-Placeholder-10.jpeg",
    "PW-M3-Placeholder-11.jpeg",
    "PW-M3-Placeholder-12.jpeg",
    "PW-M3-Placeholder-13.jpeg",
    "PW-M3-Placeholder-14.jpeg",
    "PW-M3-Placeholder-15.jpeg",
  ],
  // Modul 04 uses up to image18
  "modul-04": [
    "PW-M4-Abschaltritual.jpeg",
    "PW-M4-Experiment.jpeg",
    "PW-M4-Morgen-Manifest.jpeg",
    "PW-M4-Placeholder-04.jpeg",
    "PW-M4-Placeholder-05.jpeg",
    "PW-M4-Placeholder-06.jpeg",
    "PW-M4-Placeholder-07.jpeg",
    "PW-M4-Placeholder-08.jpeg",
    "PW-M4-Placeholder-09.jpeg",
    "PW-M4-Placeholder-10.jpeg",
    "PW-M4-Placeholder-11.jpeg",
    "PW-M4-Placeholder-12.jpeg",
    "PW-M4-Placeholder-13.jpeg",
    "PW-M4-Placeholder-14.jpeg",
    "PW-M4-Placeholder-15.jpeg",
    "PW-M4-Placeholder-16.jpeg",
    "PW-M4-Placeholder-17.jpeg",
    "PW-M4-Placeholder-18.jpeg",
  ],
  // Modul 05 uses up to image20
  "modul-05": [
    "PW-M5-Visionboard-Lukas-2021.jpeg",
    "PW-M5-Visionboard-Lukas-2025.jpeg",
    "PW-M5-Placeholder-03.jpeg",
    "PW-M5-Placeholder-04.jpeg",
    "PW-M5-Placeholder-05.jpeg",
    "PW-M5-Placeholder-06.jpeg",
    "PW-M5-Placeholder-07.jpeg",
    "PW-M5-Placeholder-08.jpeg",
    "PW-M5-Placeholder-09.jpeg",
    "PW-M5-Placeholder-10.jpeg",
    "PW-M5-Placeholder-11.jpeg",
    "PW-M5-Placeholder-12.jpeg",
    "PW-M5-Placeholder-13.jpeg",
    "PW-M5-Placeholder-14.jpeg",
    "PW-M5-Placeholder-15.jpeg",
    "PW-M5-Placeholder-16.jpeg",
    "PW-M5-Placeholder-17.jpeg",
    "PW-M5-Placeholder-18.jpeg",
    "PW-M5-Placeholder-19.jpeg",
    "PW-M5-Placeholder-20.jpeg",
  ],
  // Modul 06 uses up to image24
  "modul-06": [
    "PW-M6-Die-ideale-Woche-Lukas-selbstaendig.jpeg",
    "PW-M6-Die-ideale-Woche-Lukas-angestellt.jpeg",
    "PW-M6-Die-ideale-Woche-Beispiel-andere-Person.jpeg",
    "PW-M6-Experiment.jpeg",
    "PW-M6-Placeholder-05.jpeg",
    "PW-M6-Placeholder-06.jpeg",
    "PW-M6-Placeholder-07.jpeg",
    "PW-M6-Placeholder-08.jpeg",
    "PW-M6-Placeholder-09.jpeg",
    "PW-M6-Placeholder-10.jpeg",
    "PW-M6-Placeholder-11.jpeg",
    "PW-M6-Placeholder-12.jpeg",
    "PW-M6-Placeholder-13.jpeg",
    "PW-M6-Placeholder-14.jpeg",
    "PW-M6-Placeholder-15.jpeg",
    "PW-M6-Placeholder-16.jpeg",
    "PW-M6-Placeholder-17.jpeg",
    "PW-M6-Placeholder-18.jpeg",
    "PW-M6-Placeholder-19.jpeg",
    "PW-M6-Placeholder-20.jpeg",
    "PW-M6-Placeholder-21.jpeg",
    "PW-M6-Placeholder-22.jpeg",
    "PW-M6-Placeholder-23.jpeg",
    "PW-M6-Placeholder-24.jpeg",
  ],
  "modul-07": [
    "PW-M7-Bereiche-Projekte-Aufgaben.jpeg",
    "PW-M7-Coaching-Umsetzungssystem.jpeg",
    "PW-M7-ZPS-Methode-Beispiel-Accountability-App.jpeg",
    "PW-M7-ZPS-Methode-Beispiel-Atomschutzbunker.jpeg",
    "PW-M7-ZPS-Methode-Beispiel-Bachelorarbeit.jpeg",
    "PW-M7-ZPS-Methode-Beispiel-Balkondschungel.jpeg",
    "PW-M7-ZPS-Methode-Beispiel-Klopapiermuseum.jpeg",
  ],
  "modul-08": [
    "PW-M8-Destillieren-Text.png",
    "PW-M8-Projekte-Todoist.jpeg",
  ],
  "modul-09": [
    "PW-M9-Das-Selbst.png",
    "PW-M9-Produktivitätssystem-Aktion-Vision.png",
    "PW-M9-Produktivitaetssystem-Kapitaen.png",
    "PW-M9-Produktivitaetssystem-Raum.png",
    "PW-M9-joker-why-so-serious.png",
    "PW-M10-Workbook-Beschreibung-Navigationsbereich.jpg",
    "PW-M10-Workbook-Beschreibung-Navigationsbereich-Teil2.jpg",
  ],
  "modul-10": [
    "PW-M10-3-Burnout-Arten.png",
    "PW-M10-FAKE-Aktivitaeten.png",
    "PW-M10-Energie-Menu-Uebung.png",
    "PW-M10-Lukas-Energie-Menu.png",
  ],
  "modul-11": [
    "PW-M11-digitale-Inhaltsdiaet.png",
    "PW-M11-digitaler-Konsum.png",
  ],
  "modul-12": [
    "PW-M12-Lebensproduktivitaetssystem-Ueberblick.png",
    "PW-M12-Checkliste.png",
    "PW-M12-Workbook.png",
    "PW-M12-Testimonial-FAQ-Bonussession.png",
    "PW-M12-Landsiedel-Termine.png",
    "PW-M12-QR-Code-Katalyst.png",
  ],
};

function url(moduleSlug: string, filename: string): string {
  // Encode only the filename portion (folder is ASCII)
  return `${BUNNY_CDN}/${moduleSlug}/${encodeURIComponent(filename)}`;
}

/**
 * Build reference lines for a module, e.g.:
 * [image1]: https://.../file1.jpg "optional title"
 */
export function buildImageReferenceBlock(moduleSlug: string): string | null {
  const files = MODULE_IMAGES[moduleSlug];
  if (!files || files.length === 0) return null;
  const lines: string[] = [];
  files.forEach((file, i) => {
    const n = i + 1;
    lines.push(`[image${n}]: ${url(moduleSlug, file)}`);
  });
  return `\n\n${lines.join("\n")}\n`;
}

/** Quick check whether content already contains reference definitions. */
export function hasImageDefinitions(content: string): boolean {
  return /\n\[image\d+\]:\s?https?:\/\//.test(content);
}

/** Quick check whether content uses image placeholders. */
export function usesImagePlaceholders(content: string): boolean {
  return /!\[]\[image\d+\]/.test(content);
}
