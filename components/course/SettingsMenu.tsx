"use client";

import { useEffect, useState } from "react";
import { useCourse } from "@/app/kurs/CourseContext";
import { useTheme } from "@/app/ThemeProvider";
import toast from "react-hot-toast";

export function SettingsMenu() {
  const { theme, toggleTheme } = useTheme();
  const { focusMode, setFocusMode } = useCourse();
  const [captions, setCaptions] = useState<boolean>(true);

  // Load persisted preferences on mount
  useEffect(() => {
    const storedCaptions = localStorage.getItem("captions");
    const initialCaptions = storedCaptions !== "false"; // default ON
    setCaptions(initialCaptions);
    const root = document.querySelector("[data-focus]") as HTMLElement | null;
    if (root) root.setAttribute("data-captions", String(initialCaptions));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  const isDark = theme === "werkstatt-dark";

  return (
    <details className="dropdown dropdown-end hidden lg:block">
      <summary className="list-none [&::-webkit-details-marker]:hidden p-2 rounded-lg hover:bg-base-200 transition-colors cursor-pointer" aria-label="Einstellungen öffnen">
        {/* User/Settings Icon - clean design */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-base-content/70 hover:text-base-content"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </summary>
      <ul className="dropdown-content menu bg-base-100 rounded-box border border-base-300 w-64 p-3 shadow-xl z-50 mt-2">
        {/* Captions Toggle */}
        <li>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-70"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 5h16v2H4zM4 9h10v2H4zM4 13h16v2H4zM4 17h10v2H4z" />
              </svg>
              <span>Captions</span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary"
              checked={captions}
              onChange={(event) => {
                const value = event.target.checked;
                setCaptions(value);
                localStorage.setItem("captions", String(value));
                const root = document.querySelector("[data-focus]") as HTMLElement | null;
                if (root) root.setAttribute("data-captions", String(value));
              }}
            />
          </label>
        </li>

        {/* Focus Mode Toggle */}
        <li>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-70"
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
              <span>Focus mode</span>
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
        </li>

        {/* Theme Toggle */}
        <li>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              {!isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 opacity-70"
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
                  className="h-5 w-5 opacity-70"
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
              <span>Dunkelmodus</span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary"
              checked={isDark}
              onChange={toggleTheme}
              aria-label="Toggle theme"
            />
          </label>
        </li>

        <div className="divider my-1"></div>

        {/* Support Link */}
        <li>
          <a href="mailto:lukas@zangerlcoachingdynamics.com" className="gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-70"
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
        </li>

        <div className="divider my-1"></div>

        {/* Logout Button */}
        <li>
          <button onClick={handleLogout} className="gap-3 text-error" type="button">
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Ausloggen
          </button>
        </li>
      </ul>
    </details>
  );
}
