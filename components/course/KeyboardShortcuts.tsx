"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCourse } from "@/app/kurs/CourseContext";
import toast from "react-hot-toast";

interface Props {
  prev: { moduleSlug: string; lessonSlug: string } | null;
  next: { moduleSlug: string; lessonSlug: string } | null;
}

export function KeyboardShortcuts({ prev, next }: Props): null {
  const router = useRouter();
  const { focusMode, setFocusMode } = useCourse();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is in input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "n":
          if (next) {
            router.push(`/kurs/${next.moduleSlug}/${next.lessonSlug}`);
          }
          break;
        case "p":
          if (prev) {
            router.push(`/kurs/${prev.moduleSlug}/${prev.lessonSlug}`);
          }
          break;
        case "j": {
          // Scroll to next sidebar item
          const sidebar = document.querySelector("aside");
          if (sidebar) {
            sidebar.scrollBy({ top: 100, behavior: "smooth" });
          }
          break;
        }
        case "k": {
          // Scroll to previous sidebar item
          const sidebar = document.querySelector("aside");
          if (sidebar) {
            sidebar.scrollBy({ top: -100, behavior: "smooth" });
          }
          break;
        }
        case "f": {
          // Toggle focus mode
          const newFocusMode = !focusMode;
          setFocusMode(newFocusMode);
          toast.success(
            newFocusMode ? "Fokusmodus aktiviert" : "Fokusmodus deaktiviert",
            {
              icon: newFocusMode ? "👁️" : "👁️‍🗨️",
              duration: 2000,
            }
          );
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, router, focusMode, setFocusMode]);

  return null; // No UI, just logic
}
