"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import config from "@/config";
import { ThemeToggle } from "@/components/ThemeToggle";

// Workshop Icon - a single, clear hammer representing the workshop
const WorkshopIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
    <path d="M17.64 15L22 10.64" />
    <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H14.14c-.85 0-1.65-.33-2.25-.93L10.64 4.64" />
  </svg>
);

const links = [
  { href: "/#curriculum", label: "Curriculum" },
  { href: "/#pricing", label: "Preis" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * Header for Produktivitäts-Werkstatt - Werkstatt Design
 * Uses CSS variables for theme-awareness
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Prevent scrolling on iOS
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300">
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link
            className="group flex items-center gap-3 shrink-0"
            href="/"
            title={`${config.appName} homepage`}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-content shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <WorkshopIcon className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-base md:text-lg text-base-content shrink-0">
              {config.appName}
            </span>
          </Link>
        </div>

        {/* Mobile burger button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="p-2.5 rounded-xl text-base-content/70 hover:bg-base-200 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Menü öffnen</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex lg:justify-center lg:gap-10 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="relative text-base-content/70 font-medium hover:text-primary transition-colors group"
              title={link.label}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1 lg:gap-3 lg:items-center">
          <ThemeToggle className="text-base-content hover:bg-base-200 hover:text-primary" />
          <Link
            href="/#pricing"
            className="btn btn-primary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Jetzt starten
          </Link>
        </div>
      </nav>

      {/* Mobile menu overlay - dark scrim */}
      <div
        className={`fixed inset-0 bg-base-content/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel - SOLID background, full viewport height */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-base-100 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ height: '100dvh' }}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 bg-base-100">
          <Link
            className="flex items-center gap-3"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-content">
              <WorkshopIcon className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-lg text-base-content">
              {config.appName}
            </span>
          </Link>
          <button
            type="button"
            className="p-2.5 rounded-xl text-base-content/70 hover:bg-base-200 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Menü schließen</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile links */}
        <div className="px-6 py-8 bg-base-100">
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="block px-4 py-3 text-lg font-medium text-base-content rounded-xl transition-colors hover:bg-base-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-base-300 bg-base-200 space-y-4">
          <div className="flex items-center justify-end">
            <ThemeToggle className="text-base-content hover:bg-base-300" />
          </div>
          <Link
            href="/#pricing"
            className="btn btn-primary w-full"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Jetzt Transformation starten
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
