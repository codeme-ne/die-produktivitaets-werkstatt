"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCourse } from "@/app/kurs/CourseContext";

/**
 * Format duration in seconds to mm:ss
 */
function formatDuration(sec?: number): string {
  if (!sec) return "–:–";
  const min = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${min}:${s.toString().padStart(2, "0")}`;
}

export function CourseSidebar() {
  const { course, progressMap } = useCourse();
  const pathname = usePathname();
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const mod of course.modules) {
      initial[mod.slug] = pathname.startsWith(`/kurs/${mod.slug}`);
    }
    return initial;
  });
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Auto-scroll to active lesson on mount
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [pathname]);

  // Ensure the active module is opened on route change
  useEffect(() => {
    const active = course.modules.find((m) =>
      pathname.startsWith(`/kurs/${m.slug}`),
    )?.slug;
    if (active) {
      const next: Record<string, boolean> = {};
      for (const mod of course.modules) {
        next[mod.slug] = mod.slug === active;
      }
      setOpenMap(next);
    }
  }, [pathname, course.modules]);

  // Close drawer on mobile when link is clicked
  const handleLinkClick = () => {
    const drawer = document.getElementById(
      "course-drawer",
    ) as HTMLInputElement;
    if (drawer) drawer.checked = false;
  };

  return (
    <aside className="w-80 bg-base-100 border-r border-base-300 overflow-y-auto flex-shrink-0 h-full">
      <div className="px-4 py-3">
        <div className="space-y-2">
          {course.modules.map((module) => {
            const completedCount = module.lessons.filter(
              (l) => progressMap[`${module.slug}/${l.slug}`],
            ).length;
            return (
              <div
                key={module.slug}
                className="collapse collapse-arrow bg-base-200 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={!!openMap[module.slug]}
                  onChange={() =>
                    setOpenMap((prev) => {
                      const willOpen = !prev[module.slug];
                      const next: Record<string, boolean> = {};
                      for (const mod of course.modules) {
                        next[mod.slug] = false;
                      }
                      next[module.slug] = willOpen;
                      return next;
                    })
                  }
                  aria-expanded={!!openMap[module.slug]}
                />
                <div className="collapse-title text-sm font-medium flex items-center justify-between pr-12">
                  <span>
                    {module.order}. {module.title}
                  </span>
                  <span className="text-xs opacity-70">
                    {completedCount}/{module.lessons.length}
                  </span>
                </div>
                <div className="collapse-content">
                  <ul className="space-y-1 mt-2">
                    {module.lessons.map((lesson) => {
                      const key = `${module.slug}/${lesson.slug}`;
                      const isDone = progressMap[key];
                      const isActive =
                        pathname === `/kurs/${module.slug}/${lesson.slug}`;

                      return (
                        <li key={lesson.slug}>
                          <Link
                            ref={isActive ? activeRef : null}
                            href={`/kurs/${module.slug}/${lesson.slug}`}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-2 p-2 rounded text-sm transition-colors ${
                              isActive
                                ? "bg-primary text-primary-content font-medium"
                                : "hover:bg-base-300"
                            }`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {/* Progress Indicator */}
                            <span className="flex-shrink-0">
                              {isDone ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-success"
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
                                <span className="w-2 h-2 rounded-full bg-base-content/30 block" />
                              )}
                            </span>

                            {/* Title */}
                            <span
                              className="flex-1 leading-tight line-clamp-2 tooltip tooltip-right"
                              data-tip={lesson.title}
                            >
                              {lesson.shortTitle || lesson.title}
                            </span>

                            {/* Duration */}
                            {lesson.video?.durationSec && (
                              <span className="text-xs opacity-70 flex-shrink-0">
                                {formatDuration(lesson.video.durationSec)}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
