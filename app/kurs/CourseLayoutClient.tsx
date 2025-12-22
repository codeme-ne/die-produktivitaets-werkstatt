"use client";

import { useState, type ReactNode } from "react";
import { CourseHeader } from "@/components/course/CourseHeader";
import { CourseSidebar } from "@/components/course/CourseSidebar";
import { FocusModeToggle } from "@/components/course/FocusModeToggle";

interface Props {
  children: ReactNode;
}

export function CourseLayoutClient({ children }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden relative" data-focus="false" data-captions="true">
      {/* Subtle decorative wave in background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30" aria-hidden="true">
        <svg className="absolute -bottom-32 -right-32 w-[400px] h-[300px] text-secondary/30" viewBox="0 0 400 300" fill="none">
          <path d="M500 150 Q350 250 250 180 Q150 110 50 200 Q-50 290 -150 180" stroke="currentColor" strokeWidth="120" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      <FocusModeToggle />
      <CourseHeader onMenuClick={() => setDrawerOpen(!drawerOpen)} drawerOpen={drawerOpen} />

      {/* Desktop: Side-by-side layout, Mobile: Drawer */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Desktop Sidebar - Fixed position with own scroll */}
        <aside className="hidden lg:flex w-80 flex-shrink-0 bg-base-100/95 backdrop-blur-sm border-r border-base-300">
          <CourseSidebar />
        </aside>

        {/* Main Content - Scrolls independently */}
        <main className="flex-1 overflow-y-auto bg-base-100/80">{children}</main>

        {/* Mobile Drawer - positioned below header */}
        <div className={`lg:hidden fixed inset-x-0 top-0 bottom-0 z-40 ${drawerOpen ? '' : 'pointer-events-none'}`}>
          <div
            className={`absolute inset-0 bg-base-content/60 transition-opacity ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            className={`absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-base-100 shadow-xl transform transition-transform flex flex-col ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Spacer for header - matches header height */}
            <div className="h-24 flex-shrink-0" />
            <div className="flex-1 min-h-0">
              <CourseSidebar onLinkClick={() => setDrawerOpen(false)} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
