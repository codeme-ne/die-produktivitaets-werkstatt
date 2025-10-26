"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCourse } from "@/app/kurs/CourseContext";
import { UserMenu } from "./UserMenu";
import config from "@/config";

interface Props {
  email: string;
  onMenuClick: () => void;
}

export function CourseHeader({ email, onMenuClick }: Props) {
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
    <header className="bg-base-100 border-b border-base-300 px-4 md:px-6 py-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 md:items-stretch">
            <button
              onClick={onMenuClick}
              className="btn btn-ghost btn-square btn-sm lg:hidden"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link
              href="/"
              className="text-lg md:text-xl font-bold hover:opacity-80 md:inline-flex md:items-center"
            >
              {config.appName}
            </Link>

            <span
              className="hidden md:block w-px bg-base-300/70 md:mx-2 md:self-stretch"
              aria-hidden="true"
            />

            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="w-full min-w-[140px] max-w-xs md:max-w-sm">
                <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {progressText}
              </span>
            </div>

            {continueHref && (
              <>
                <span
                  className="hidden md:block w-px bg-base-300/70 md:mx-2 md:self-stretch"
                  aria-hidden="true"
                />
                <Link
                  href={continueHref}
                  className="hidden md:inline-flex text-sm font-medium text-base-content hover:text-primary transition-colors min-w-0"
                  title={nextOpenLesson?.title}
                  aria-label={continueLabel ?? undefined}
                >
                  <span className="break-words">{continueLabel}</span>
                </Link>
              </>
            )}
          </div>

          {continueHref && (
            <Link
              href={continueHref}
              className="md:hidden text-sm font-medium text-base-content hover:text-primary transition-colors min-w-0"
              title={nextOpenLesson?.title}
              aria-label={continueLabel}
            >
              <span className="break-words">{continueLabel}</span>
            </Link>
          )}
        </div>

        <div className="flex items-center justify-end">
          <UserMenu email={email} />
        </div>
      </div>
    </header>
  );
}
