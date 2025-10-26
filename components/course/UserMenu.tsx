"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourse } from "@/app/kurs/CourseContext";
import { useTheme } from "@/app/ThemeProvider";
import toast from "react-hot-toast";

interface Props {
  email: string;
}

function deriveName(email: string) {
  const [local = ""] = email.split("@");
  const cleaned = local
    .split(/[._-]+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map(
      (chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase(),
    );

  if (cleaned.length === 0) {
    const fallbackInitial = email.charAt(0).toUpperCase() || "?";
    return {
      displayName: email,
      initial: fallbackInitial,
    };
  }

  const displayName = cleaned.join(" ");
  return {
    displayName,
    initial: cleaned[0]?.charAt(0).toUpperCase() || "?",
  };
}

export function UserMenu({ email }: Props) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { focusMode, setFocusMode } = useCourse();
  const [captions, setCaptions] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const { displayName, initial } = useMemo(() => deriveName(email), [email]);

  // Load persisted preferences on mount
  useEffect(() => {
    const storedCaptions = localStorage.getItem("captions");
    const initialCaptions = storedCaptions !== "false"; // default ON
    setCaptions(initialCaptions);
    const root = document.querySelector("[data-focus]") as
      | HTMLElement
      | null;
    if (root) root.setAttribute("data-captions", String(initialCaptions));
  }, []);

  useEffect(() => {
    const close = () => setIsOpen(false);

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        close();
      }
    };

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    closeMenu();
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const dropdownClass = `dropdown dropdown-end${
    isOpen ? " dropdown-open" : ""
  }`;

  return (
    <div className={`${dropdownClass} relative`}>
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-ghost h-11 min-h-[44px] rounded-full px-3 md:px-4 gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold uppercase text-primary">
          {initial}
        </span>
        <span className="text-sm font-medium text-base-content whitespace-nowrap">
          {displayName}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 text-base-content/70"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul
        ref={menuRef}
        tabIndex={0}
        className="dropdown-content menu w-[calc(100vw-2rem)] sm:w-80 max-w-80 rounded-box border border-base-300 bg-base-100 p-3 shadow-lg mt-3 right-0"
        role="menu"
      >
        <div className="px-4 pb-2 pt-1 text-xs text-base-content/70">
          <div className="text-sm font-semibold text-base-content">{displayName}</div>
          <div className="truncate">{email}</div>
        </div>
        <div className="divider my-1"></div>
        <li>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 5h16v2H4zM4 9h10v2H4zM4 13h16v2H4zM4 17h10v2H4z" />
              </svg>
              <span>Captions</span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={captions}
              onChange={(event) => {
                const value = event.target.checked;
                setCaptions(value);
                localStorage.setItem("captions", String(value));
                const root = document.querySelector("[data-focus]") as
                  | HTMLElement
                  | null;
                if (root) root.setAttribute("data-captions", String(value));
              }}
            />
          </label>
        </li>
        <li>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
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
              className="toggle toggle-sm"
              checked={focusMode}
              onChange={(event) => {
                const newValue = event.target.checked;
                setFocusMode(newValue);
                toast.success(
                  newValue ? "Fokusmodus aktiviert" : "Fokusmodus deaktiviert",
                  {
                    icon: newValue ? "👁️" : "👁️‍🗨️",
                    duration: 2000,
                  }
                );
              }}
            />
          </label>
        </li>
        <li>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              {theme === "light" ? (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
              <span>Theme</span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={theme === "dark"}
              onChange={toggleTheme}
              aria-label="Toggle theme"
            />
          </label>
        </li>
        <div className="divider my-1"></div>
        <li>
          <a href="mailto:support@produktiv.me" className="gap-3">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Support
          </a>
        </li>
        <div className="divider my-1"></div>
        <li>
          <button
            onClick={handleLogout}
            className="gap-3 text-error"
            type="button"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
