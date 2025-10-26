"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCourse } from "@/app/kurs/CourseContext";

interface Props {
  moduleSlug: string;
  lessonSlug: string;
  initialDone: boolean;
  prev: { moduleSlug: string; lessonSlug: string } | null;
  next: { moduleSlug: string; lessonSlug: string } | null;
}

export function LessonActions({
  moduleSlug,
  lessonSlug,
  initialDone,
  prev,
  next,
}: Props) {
  const [done, setDone] = useState(initialDone);
  const [loading, setLoading] = useState(false);
  const { updateProgress } = useCourse();
  const router = useRouter();

  const handleToggleDone = async () => {
    const newDone = !done;
    setDone(newDone); // Optimistic update
    updateProgress(moduleSlug, lessonSlug, newDone);

    setLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleSlug,
          videoSlug: lessonSlug,
          done: newDone,
        }),
      });

      if (!res.ok) {
        // Revert on failure
        setDone(!newDone);
        updateProgress(moduleSlug, lessonSlug, !newDone);
        toast.error("Fortschritt konnte nicht aktualisiert werden.");
      } else {
        if (newDone && next) {
          router.push(`/kurs/${next.moduleSlug}/${next.lessonSlug}`, {
            scroll: true,
          });
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "auto" });
          }
        } else {
          router.refresh();
        }
      }
    } catch {
      // Revert on error
      setDone(!newDone);
      updateProgress(moduleSlug, lessonSlug, !newDone);
      toast.error("Fortschritt konnte nicht aktualisiert werden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky bottom-0 bg-base-100 border-t border-base-300 p-4 flex items-center justify-between gap-4">
      {/* Left: Zurück */}
      <div>
        {prev ? (
          <Link
            href={`/kurs/${prev.moduleSlug}/${prev.lessonSlug}`}
            className="btn btn-outline gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Zurück
          </Link>
        ) : (
          <div className="w-24" />
        )}
      </div>

      {/* Center: Completed */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleDone}
          disabled={loading}
          aria-busy={loading}
          className={`btn gap-2 ${
            done ? "btn-success" : "btn-outline btn-primary"
          }`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : done ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {done ? "Erledigt" : "Als erledigt markieren"}
        </button>
      </div>

      {/* Right: Weiter */}
      <div>
        {next ? (
          <Link
            href={`/kurs/${next.moduleSlug}/${next.lessonSlug}`}
            className="btn btn-primary gap-2"
          >
            Weiter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div className="w-24" />
        )}
      </div>
    </div>
  );
}
