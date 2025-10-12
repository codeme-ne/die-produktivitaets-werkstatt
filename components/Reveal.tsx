"use client";

import { useState, type ReactNode } from "react";

interface RevealProps {
  summary?: string;
  children: ReactNode;
}

export default function Reveal({
  summary = "Lösung anzeigen",
  children,
}: RevealProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        className="btn btn-outline btn-sm"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Verbergen" : summary}
      </button>
      {open && (
        <div className="mt-3 card bg-base-100 shadow p-4 text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
