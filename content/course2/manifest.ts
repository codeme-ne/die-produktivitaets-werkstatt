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
    slug: "01-intro",
    title: "Einführung in deinen zweiten Kurs",
    summary:
      "Kurzer Überblick, Ziele und was du in diesem Kurs erreichen wirst.",
    module: () => import("./01-intro.mdx"),
  },
  {
    order: 2,
    slug: "02-basics",
    title: "Grundlagen kompakt",
    summary:
      "Die wichtigsten Konzepte verständlich erklärt – kurz und praxisnah.",
    module: () => import("./02-basics.mdx"),
  },
  {
    order: 3,
    slug: "03-mini-projekt",
    title: "Mini‑Projekt: Erste Ergebnisse liefern",
    summary: "Ein kleines, greifbares Ergebnis Schritt für Schritt umsetzen.",
    module: () => import("./03-mini-projekt.mdx"),
  },
  {
    order: 4,
    slug: "04-rag-zum-anfassen",
    title: "RAG zum Anfassen",
    summary:
      "Chunking und Suche mit interaktiver Visualisierung spielerisch erleben.",
    module: () => import("./04-rag-zum-anfassen.mdx"),
  },
  {
    order: 5,
    slug: "05-use-cases-sprint",
    title: "Use‑Cases Sprint: 5 Mini‑Aufgaben",
    summary: "Kleine, spaßige Aufgaben, um KI direkt im Alltag anzuwenden.",
    module: () => import("./05-use-cases-sprint.mdx"),
  },
  {
    order: 6,
    slug: "06-tool-thinking-light",
    title: "Tool Thinking (Light)",
    summary:
      "Ohne Code: Welche Tools braucht die Aufgabe? Triff smarte Entscheidungen.",
    module: () => import("./06-tool-thinking-light.mdx"),
  },
  {
    order: 7,
    slug: "07-abschluss-habits",
    title: "Abschluss & Habits",
    summary:
      "Rituale, Checklisten und kleine Spiele für nachhaltiges Dranbleiben.",
    module: () => import("./07-abschluss-habits.mdx"),
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
