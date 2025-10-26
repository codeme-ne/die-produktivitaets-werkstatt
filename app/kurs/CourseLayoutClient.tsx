"use client";

import { useState, type ReactNode } from "react";
import { CourseHeader } from "@/components/course/CourseHeader";
import { CourseSidebar } from "@/components/course/CourseSidebar";
import { FocusModeToggle } from "@/components/course/FocusModeToggle";

interface Props {
  email: string;
  children: ReactNode;
}

export function CourseLayoutClient({ email, children }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" data-focus="false" data-captions="true">
      <FocusModeToggle />
      <CourseHeader email={email} onMenuClick={() => setDrawerOpen(true)} />

      <div className="drawer lg:drawer-open flex-1">
        <input
          id="course-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          onChange={(e) => setDrawerOpen(e.target.checked)}
        />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>

        {/* Sidebar Drawer */}
        <div className="drawer-side z-50">
          <label
            htmlFor="course-drawer"
            className="drawer-overlay"
            onClick={() => setDrawerOpen(false)}
          ></label>
          <CourseSidebar />
        </div>
      </div>
    </div>
  );
}
