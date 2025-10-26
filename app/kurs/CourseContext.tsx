"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Course } from "@/types/course";

/* eslint-disable no-unused-vars */
interface CourseContextValue {
  course: Course;
  progressMap: Record<string, boolean>;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  nextOpenLesson: {
    moduleSlug: string;
    lessonSlug: string;
    title: string;
  } | null;
  focusMode: boolean;
  setFocusMode(value: boolean): void;
  updateProgress(
    moduleSlug: string,
    lessonSlug: string,
    done: boolean,
  ): void;
}
/* eslint-enable no-unused-vars */

const CourseContext = createContext<CourseContextValue | null>(null);

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}

interface Props {
  children: ReactNode;
  course: Course;
  initialProgress: Record<string, boolean>;
  initialNextOpen: {
    moduleSlug: string;
    lessonSlug: string;
    title: string;
  } | null;
}

export function CourseProvider({
  children,
  course,
  initialProgress,
  initialNextOpen,
}: Props) {
  const [progressMap, setProgressMap] = useState(initialProgress);
  const [nextOpenLesson, setNextOpenLesson] = useState(initialNextOpen);
  const [focusMode, setFocusModeState] = useState(false);

  // Persist focus mode to localStorage
  useEffect(() => {
    const stored = localStorage.getItem("focusMode");
    if (stored === "true") setFocusModeState(true);
  }, []);

  const setFocusMode = (focus: boolean) => {
    setFocusModeState(focus);
    localStorage.setItem("focusMode", String(focus));
  };

  // Calculate stats
  const totalLessons = course.modules.reduce(
    (sum, mod) => sum + mod.lessons.length,
    0,
  );
  const completedLessons = Object.values(progressMap).filter(Boolean).length;
  const percentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const computeNextLesson = (map: Record<string, boolean>) => {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        const key = `${mod.slug}/${lesson.slug}`;
        if (!map[key]) {
          return {
            moduleSlug: mod.slug,
            lessonSlug: lesson.slug,
            title: lesson.title,
          };
        }
      }
    }

    const lastMod = course.modules[course.modules.length - 1];
    if (!lastMod || lastMod.lessons.length === 0) {
      return null;
    }

    const lastLesson = lastMod.lessons[lastMod.lessons.length - 1];
    return {
      moduleSlug: lastMod.slug,
      lessonSlug: lastLesson.slug,
      title: lastLesson.title,
    };
  };

  // Optimistic progress update
  const updateProgress = (
    moduleSlug: string,
    lessonSlug: string,
    done: boolean,
  ) => {
    const key = `${moduleSlug}/${lessonSlug}`;
    setProgressMap((prev) => {
      const nextMap = { ...prev };
      if (done) {
        nextMap[key] = true;
      } else {
        delete nextMap[key];
      }

      setNextOpenLesson(computeNextLesson(nextMap));

      return nextMap;
    });
  };

  return (
    <CourseContext.Provider
      value={{
        course,
        progressMap,
        totalLessons,
        completedLessons,
        percentage,
        nextOpenLesson,
        focusMode,
        setFocusMode,
        updateProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
