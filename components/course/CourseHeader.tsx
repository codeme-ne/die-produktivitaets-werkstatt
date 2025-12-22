"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCourse } from "@/app/kurs/CourseContext";
import { SettingsMenu } from "./SettingsMenu";
import config from "@/config";

interface Props {
  onMenuClick: () => void;
  drawerOpen?: boolean;
}

export function CourseHeader({ onMenuClick, drawerOpen }: Props) {
  const { totalLessons, completedLessons, percentage, nextOpenLesson } =
    useCourse();
  const progressText = useMemo(() => {
    if (!totalLessons) {
      return "0/0 (0%)";
    }
    return `${completedLessons}/${totalLessons} (${percentage}%)`;
  }, [completedLessons, percentage, totalLessons]);
  const continueHref =
    nextOpenLesson &&
    `/kurs/${nextOpenLesson.moduleSlug}/${nextOpenLesson.lessonSlug}`;
  const continueLabel =
    nextOpenLesson && `Weitermachen: ${nextOpenLesson.title}`;

  return (
    <header className="bg-base-100/95 backdrop-blur-sm border-b border-base-300 px-4 md:px-6 py-3 relative z-20">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Menu + Logo + Progress */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex-shrink-0 p-2.5 rounded-xl bg-primary text-primary-content hover:bg-primary/90 transition-colors shadow-md"
            aria-label={drawerOpen ? "Menü schließen" : "Menü öffnen"}
          >
            <span className="sr-only">{drawerOpen ? "Menü schließen" : "Menü öffnen"}</span>
            {drawerOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <span className="text-base md:text-lg font-display font-bold flex-shrink-0">
            {config.appName}
          </span>

          <span
            className="hidden md:block w-px h-6 bg-base-300 flex-shrink-0"
            aria-hidden="true"
          />

          {/* Progress Bar */}
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            <div className="w-24 md:w-32 lg:w-40">
              <div className="h-2 bg-base-300 rounded-full overflow-hidden border border-base-content/10">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <span className="text-xs font-medium whitespace-nowrap text-base-content/70">
              {progressText}
            </span>
          </div>

          {/* Continue Link - Desktop */}
          {continueHref && (
            <>
              <span
                className="hidden lg:block w-px h-6 bg-base-300 flex-shrink-0"
                aria-hidden="true"
              />
              <Link
                href={continueHref}
                className="hidden lg:inline-flex text-sm text-base-content/80 hover:text-primary transition-colors truncate max-w-md xl:max-w-lg"
                title={nextOpenLesson?.title}
                aria-label={continueLabel ?? undefined}
              >
                {continueLabel}
              </Link>
            </>
          )}
        </div>

        {/* Right: Settings Menu (Logout, Captions, Focus, Theme) */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <SettingsMenu />
        </div>
      </div>
    </header>
  );
}
