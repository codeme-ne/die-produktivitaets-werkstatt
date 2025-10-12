export interface Lesson {
  order: number;
  slug: string;
  title: string;
  summary: string;
  module: () => Promise<any>;
}

export const lessons: Lesson[] = [
  {
    order: 1,
    slug: "01-willkommen",
    title: "Willkommen in der Produktivitäts‑Werkstatt",
    summary:
      "Dein 12‑Wochen Start: Ziele, System und Erwartungshaltung – mit messbarem Fortschritt.",
    module: () => import("./01-willkommen.mdx"),
  },
  {
    order: 2,
    slug: "02-produktivitaets-mindset",
    title: "Das Produktivitäts‑Mindset",
    summary:
      "Forschermindset: Testen, bewerten, anpassen – Growth Mindset statt Perfektionismus.",
    module: () => import("./02-produktivitaets-mindset.mdx"),
  },
  {
    order: 3,
    slug: "03-produktivitaets-katalyst",
    title: "Der Produktivitäts‑Katalyst",
    summary:
      "Standortbestimmung: Stärken, Potenziale und Ausgangsniveau in 15–20 Minuten feststellen.",
    module: () => import("./03-produktivitaets-katalyst.mdx"),
  },
  {
    order: 4,
    slug: "04-lebensproduktivitaetssystem",
    title: "Das Lebensproduktivitätssystem – Die Gewässer des Lebens",
    summary:
      "Ein ganzheitliches Modell: Richtung, Antrieb, Selbst, Fähigkeiten, Raum und Freude.",
    module: () => import("./04-lebensproduktivitaetssystem.mdx"),
  },
  {
    order: 5,
    slug: "05-lebensproduktivitaetssystem-ueberblick",
    title: "Lebensproduktivitätssystem: Überblick",
    summary:
      "Richtung (Vision) und Antrieb (Aktion) – plus 5 Fähigkeiten, Selbst und Umfeld.",
    module: () => import("./05-lebensproduktivitaetssystem-ueberblick.mdx"),
  },
  {
    order: 6,
    slug: "06-experiment-woche-1-katalyst",
    title: "Experiment Woche 1: Der Produktivitäts‑Katalyst",
    summary:
      "LEGO‑Prinzip: Bausteine testen, anpassen, integrieren – pragmatisch statt perfekt.",
    module: () => import("./06-experiment-woche-1-katalyst.mdx"),
  },
  {
    order: 7,
    slug: "07-feedback-badge",
    title: "Lebensproduktivitätssystem: Feedback [Badge verfügbar]",
    summary: "Teile Feedback zu Modul 1 – Badge‑Hinweis am Ende der Lektion.",
    module: () => import("./07-feedback-badge.mdx"),
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getNextLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex(
    (lesson) => lesson.slug === currentSlug,
  );
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return undefined;
  }
  return lessons[currentIndex + 1];
}

export function getPreviousLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex(
    (lesson) => lesson.slug === currentSlug,
  );
  if (currentIndex <= 0) {
    return undefined;
  }
  return lessons[currentIndex - 1];
}

/**
 * Get the first lesson that is not completed (for "Weiterlernen" feature)
 */
export function getNextOpenLesson(completed: Set<string>): Lesson | undefined {
  return lessons.find((lesson) => !completed.has(lesson.slug));
}
