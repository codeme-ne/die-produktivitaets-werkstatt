/**
 * Course system types for PW (Produktivitäts-Werkstatt)
 * Based on CSV data structure
 */

export interface VideoInfo {
  libraryId: string;
  guid: string;
  embedUrl: string;
  durationSec?: number; // From Bunny Stream API or cache
}

export interface Resource {
  label: string;
  href: string;
}

export interface Lesson {
  slug: string;
  title: string;
  shortTitle?: string; // Shortened version for sidebar (≤40 chars)
  order: number;
  moduleSlug: string;
  video?: VideoInfo;
  description: string;
  resources: Resource[];
}

export interface Module {
  slug: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  modules: Module[];
}
