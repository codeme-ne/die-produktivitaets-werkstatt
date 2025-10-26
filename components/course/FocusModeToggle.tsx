"use client";

import { useCourse } from "@/app/kurs/CourseContext";
import { useEffect } from "react";

export function FocusModeToggle(): null {
  const { focusMode } = useCourse();

  // Update data-focus attribute on root element
  useEffect(() => {
    const root = document.querySelector("[data-focus]");
    if (root) {
      root.setAttribute("data-focus", String(focusMode));
    }
  }, [focusMode]);

  return null; // No UI, just the useEffect hook
}
