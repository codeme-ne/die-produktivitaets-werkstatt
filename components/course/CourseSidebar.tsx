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

interface SidebarProps {
  onLinkClick?: () => void;
}

export function CourseSidebar({ onLinkClick }: SidebarProps = {}) {
  const { course, progressMap, releaseMap, productType } = useCourse();
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
    onLinkClick?.();
    const drawer = document.getElementById(
      "course-drawer",
    ) as HTMLInputElement;
    if (drawer) drawer.checked = false;
  };

  return (
    <aside className="w-full h-full overflow-y-auto">
      <div className="px-4 py-4">
        <div className="space-y-2">
          {course.modules.map((module) => {
            const completedCount = module.lessons.filter(
              (l) => progressMap[`${module.slug}/${l.slug}`],
            ).length;
            const isReleased =
              productType === "self-paced" ||
              releaseMap?.[module.slug]?.isReleased !== false;
            const allDone = completedCount === module.lessons.length && module.lessons.length > 0;
            return (
              <div
                key={module.slug}
                className={`collapse collapse-arrow rounded-lg transition-colors ${
                  allDone ? "bg-success/10 border border-success/20" : "bg-base-200 hover:bg-base-300/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!openMap[module.slug]}
                  disabled={!isReleased}
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
                  <span className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      allDone ? "bg-success text-success-content" : "bg-accent/20 text-accent"
                    }`}>
                      {module.order}
                    </span>
                    <span className="font-display">{module.title}</span>
                    {!isReleased && (
                      <span className="badge badge-sm badge-ghost">🔒</span>
                    )}
                    {allDone && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  <span className="text-xs opacity-70 font-mono">
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
                          {isReleased ? (
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
                          ) : (
                            <div className="flex items-center gap-2 p-2 rounded text-sm opacity-60 bg-base-200">
                              <span className="flex-shrink-0">
                                <span className="w-2 h-2 rounded-full bg-base-content/20 block" />
                              </span>
                              <span className="flex-1 leading-tight">
                                {lesson.shortTitle || lesson.title}
                              </span>
                              <span className="text-xs flex-shrink-0">🔒</span>
                            </div>
                          )}
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
