"use client";

import { useState, useOptimistic, startTransition } from "react";

interface Props {
  moduleSlug: string;
  videoSlug: string;
  initialDone?: boolean;
}

export function MarkDoneButton({
  moduleSlug,
  videoSlug,
  initialDone = false,
}: Props) {
  const [done, setDone] = useState(initialDone);
  const [optimisticDone, setOptimisticDone] = useOptimistic(done);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    const newDone = !done;
    // Optimistic updates must run inside a transition
    startTransition(() => {
      setOptimisticDone(newDone);
    });
    setLoading(true);

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleSlug, videoSlug, done: newDone }),
      });

      if (!res.ok) throw new Error("Failed to update progress");

      setDone(newDone);

      // Track event
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "mark_done",
          moduleSlug,
          videoSlug,
          meta: { done: newDone },
        }),
      });
    } catch (error) {
      console.error("Failed to toggle done:", error);
      // Revert optimistic update inside a transition
      startTransition(() => {
        setOptimisticDone(done);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`btn ${optimisticDone ? "btn-success" : "btn-outline"} gap-2`}
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : optimisticDone ? (
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
            d="M5 13l4 4L19 7"
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {optimisticDone ? "Als erledigt markiert" : "Als erledigt markieren"}
    </button>
  );
}
