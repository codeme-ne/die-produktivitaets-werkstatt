"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
        document.documentElement.setAttribute("data-theme", stored);
      } else {
        // Detect system preference
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        setTheme(systemTheme);
        document.documentElement.setAttribute("data-theme", systemTheme);
      }
    } catch (e) {
      // localStorage might fail in Safari Private Mode
      console.warn("Theme initialization failed:", e);
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a theme
      try {
        const stored = localStorage.getItem("theme");
        if (!stored) {
          const newTheme = e.matches ? "dark" : "light";
          setTheme(newTheme);
          document.documentElement.setAttribute("data-theme", newTheme);
        }
      } catch (e) {
        console.warn("Theme sync failed:", e);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mounted]);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {
      console.warn("Failed to save theme preference:", e);
    }
  };

  // Prevent context errors: wait until mounted before rendering children.
  // The inline script in app/layout.tsx prevents FOUC by setting data-theme early.
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  // SSG safety: Return defaults during server-side rendering
  if (typeof window === "undefined") {
    return {
      theme: "light" as Theme,
      toggleTheme: () => {},
    };
  }

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
