import React from "react";

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
  thickness?: number;
  className?: string;
}

export default function ProgressRing({
  completed,
  total,
  size = 120,
  thickness = 8,
  className = "",
}: ProgressRingProps) {
  // Edge case: avoid division by zero
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Clamp to 0-100 range
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div
      className={`radial-progress ${className}`}
      style={
        {
          "--value": clampedPercentage,
          "--size": `${size}px`,
          "--thickness": `${thickness}px`,
        } as React.CSSProperties
      }
      role="progressbar"
      aria-valuenow={clampedPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Fortschritt: ${completed} von ${total} abgeschlossen`}
    >
      <span className="text-sm font-semibold">
        {completed}/{total}
      </span>
    </div>
  );
}
