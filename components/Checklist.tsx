"use client";

import { useEffect, useState } from "react";

interface ChecklistItem {
  id: string;
  label: string;
}

interface ChecklistProps {
  id: string;
  items: ChecklistItem[];
  className?: string;
}

export default function Checklist({ id, items, className }: ChecklistProps) {
  const storageKey = `course:checklist:${id}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) {
        setChecked(new Set(parsed));
      }
    } catch {
      // ignore parse errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(checked)));
    } catch {
      // ignore write errors
    }
  }, [checked, storageKey]);

  const toggle = (itemId: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  return (
    <div className={className}>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={checked.has(item.id)}
                onChange={() => toggle(item.id)}
                aria-label={item.label}
              />
              <span className="label-text">{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
