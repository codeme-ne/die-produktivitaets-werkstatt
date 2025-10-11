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
    slug: '01-intro',
    title: 'Einführung in AI und den Kurs',
    summary: 'Lerne die Grundlagen der künstlichen Intelligenz kennen und erfahre, was dich in diesem Kurs erwartet.',
    module: () => import('./01-intro.mdx'),
  },
  {
    order: 2,
    slug: '02-setup',
    title: 'Setup und Entwicklungsumgebung',
    summary: 'Richte deine Entwicklungsumgebung ein und lerne die wichtigsten Tools kennen.',
    module: () => import('./02-setup.mdx'),
  },
  {
    order: 3,
    slug: '03-prompting',
    title: 'Effektive Prompting-Techniken',
    summary: 'Meistere die Kunst des Promptings für optimale AI-Ergebnisse.',
    module: () => import('./03-prompting.mdx'),
  },
  {
    order: 4,
    slug: '04-retrieval',
    title: 'RAG: Retrieval Augmented Generation',
    summary: 'Erweitere AI-Systeme mit deinen eigenen Daten durch RAG-Techniken.',
    module: () => import('./04-retrieval.mdx'),
  },
  {
    order: 5,
    slug: '05-agents',
    title: 'AI-Agents: Autonome Systeme aufbauen',
    summary: 'Entwickle intelligente Agents, die selbstständig Tools nutzen und Probleme lösen.',
    module: () => import('./05-agents.mdx'),
  },
  {
    order: 6,
    slug: '06-evaluation',
    title: 'Evaluation: AI-Qualität messen',
    summary: 'Lerne systematisch die Qualität, Performance und Kosten deiner AI-Systeme zu messen.',
    module: () => import('./06-evaluation.mdx'),
  },
  {
    order: 7,
    slug: '07-deployment',
    title: 'Deployment: AI-Systeme produktiv betreiben',
    summary: 'Bringe deine AI-Anwendungen vom Prototyp in die Produktion mit Best Practices.',
    module: () => import('./07-deployment.mdx'),
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getNextLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex((lesson) => lesson.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return undefined;
  }
  return lessons[currentIndex + 1];
}

export function getPreviousLesson(currentSlug: string): Lesson | undefined {
  const currentIndex = lessons.findIndex((lesson) => lesson.slug === currentSlug);
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
