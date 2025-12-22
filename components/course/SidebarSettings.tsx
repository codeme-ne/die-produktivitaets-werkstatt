"use client";

import { useCourse } from "@/app/kurs/CourseContext";
import { useTheme } from "@/app/ThemeProvider";
import toast from "react-hot-toast";

export function SidebarSettings() {
  const { theme, toggleTheme } = useTheme();
  const { focusMode, setFocusMode } = useCourse();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  const isDark = theme === "werkstatt-dark";

  return (
    <div className="border-t border-base-300 bg-base-200/50 px-4 py-3">
      <div className="space-y-2">
        {/* Focus Mode Toggle */}
        <label className="flex items-center justify-between cursor-pointer py-1">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="text-sm">Fokus</span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-primary"
            checked={focusMode}
            onChange={(event) => {
              const newValue = event.target.checked;
              setFocusMode(newValue);
              toast.success(
                newValue ? "Fokusmodus aktiviert" : "Fokusmodus deaktiviert",
                { icon: newValue ? "👁️" : "👁️‍🗨️", duration: 2000 }
              );
            }}
          />
        </label>

        {/* Theme Toggle */}
        <label className="flex items-center justify-between cursor-pointer py-1">
          <div className="flex items-center gap-2">
            {!isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
            <span className="text-sm">{isDark ? "Hell" : "Dunkel"}</span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-primary"
            checked={isDark}
            onChange={toggleTheme}
            aria-label="Theme wechseln"
          />
        </label>

        <div className="divider my-1 h-px"></div>

        {/* Support Link */}
        <a
          href="mailto:lukas@zangerlcoachingdynamics.com"
          className="flex items-center gap-2 text-sm py-1 hover:text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Support
        </a>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm py-1 text-error hover:text-error/80 transition-colors w-full"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Ausloggen
        </button>
      </div>
    </div>
  );
}