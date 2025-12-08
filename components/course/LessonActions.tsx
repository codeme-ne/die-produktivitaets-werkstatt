"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCourse } from "@/app/kurs/CourseContext";

interface Props {
  moduleSlug: string;
  lessonSlug: string;
  initialDone: boolean;
  prev: { moduleSlug: string; lessonSlug: string } | null;
  next: { moduleSlug: string; lessonSlug: string } | null;
}

// Confetti colors matching the Werkstatt theme
const CONFETTI_COLORS = [
  "#C9A227", // honey
  "#E8D174", // honey-light
  "#C4704A", // terracotta
  "#E89B78", // terracotta-light
  "#1A5F7A", // ocean
  "#2E8B9A", // ocean-light
  "#FFD700", // gold
  "#FF6B6B", // coral
];

function createConfettiParticle(x: number, y: number, direction: "up" | "left" | "right" = "up") {
  const particle = document.createElement("div");
  const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const size = Math.random() * 14 + 10; // Bigger: 10-24px
  const shapeType = Math.random();

  // Various shapes: circles, rectangles, strips
  let width = size;
  let height = size;
  let borderRadius = "3px";

  if (shapeType < 0.33) {
    // Circle
    borderRadius = "50%";
  } else if (shapeType < 0.66) {
    // Rectangle
    height = size * 0.6;
  } else {
    // Long strip
    width = size * 0.4;
    height = size * 1.5;
  }

  particle.style.cssText = `
    position: fixed;
    width: ${width}px;
    height: ${height}px;
    background: ${color};
    border-radius: ${borderRadius};
    pointer-events: none;
    z-index: 9999;
    left: ${x}px;
    top: ${y}px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `;

  document.body.appendChild(particle);

  // Animation parameters based on direction
  let vx: number;
  let vy: number;
  const velocity = Math.random() * 600 + 500; // 500-1100

  if (direction === "up") {
    // Bottom burst - spread upward across screen
    const angle = (Math.random() * 140 + 20) * (Math.PI / 180); // 20-160 degrees
    vx = Math.cos(angle) * velocity * (Math.random() > 0.5 ? 1 : -1);
    vy = -Math.sin(angle) * velocity;
  } else if (direction === "left") {
    // From left - shoot right and up toward center
    const angle = (Math.random() * 50 + 20) * (Math.PI / 180); // 20-70 degrees
    vx = Math.cos(angle) * velocity * (0.8 + Math.random() * 0.4); // Strong rightward
    vy = -Math.sin(angle) * velocity * (0.6 + Math.random() * 0.6);
  } else {
    // From right - shoot left and up toward center
    const angle = (Math.random() * 50 + 20) * (Math.PI / 180); // 20-70 degrees
    vx = -Math.cos(angle) * velocity * (0.8 + Math.random() * 0.4); // Strong leftward
    vy = -Math.sin(angle) * velocity * (0.6 + Math.random() * 0.6);
  }
  const gravity = 350; // Slightly less gravity for longer hang time
  const friction = 0.985;
  const rotationSpeed = (Math.random() - 0.5) * 1080; // More rotation
  const wobbleSpeed = Math.random() * 10 + 5;
  const wobbleAmount = Math.random() * 30 + 10;

  let currentX = x;
  let currentY = y;
  let currentVx = vx;
  let currentVy = vy;
  let rotation = Math.random() * 360;
  let opacity = 1;
  let time = 0;
  let lastTime = performance.now();

  function animate(now: number) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    time += dt;

    currentVx *= friction;
    currentVy += gravity * dt;

    // Add wobble effect
    const wobble = Math.sin(time * wobbleSpeed) * wobbleAmount * dt;
    currentX += currentVx * dt + wobble;
    currentY += currentVy * dt;
    rotation += rotationSpeed * dt;

    // Start fading after 1.5 seconds
    if (time > 1.5) {
      opacity -= dt * 0.6;
    }

    particle.style.transform = `rotate(${rotation}deg) scale(${0.8 + Math.sin(time * 3) * 0.2})`;
    particle.style.left = `${currentX}px`;
    particle.style.top = `${currentY}px`;
    particle.style.opacity = String(Math.max(0, opacity));

    if (opacity > 0 && currentY < window.innerHeight + 100) {
      requestAnimationFrame(animate);
    } else {
      particle.remove();
    }
  }

  requestAnimationFrame(animate);
}

function fireConfetti(_buttonElement: HTMLButtonElement) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Massive celebration burst from multiple points!
  const particleCount = 120; // Even more particles for full coverage

  // Bottom center burst (main celebration) - spread across entire bottom
  for (let i = 0; i < particleCount * 0.4; i++) {
    setTimeout(() => {
      const x = screenWidth * 0.2 + Math.random() * screenWidth * 0.6; // 20-80% of screen width
      createConfettiParticle(x, screenHeight + 10, "up");
    }, i * 10);
  }

  // Left side burst - shoots toward center
  for (let i = 0; i < particleCount * 0.3; i++) {
    setTimeout(() => {
      const y = screenHeight * 0.5 + (Math.random() - 0.5) * screenHeight * 0.6;
      createConfettiParticle(-20, y, "left");
    }, i * 15 + 50);
  }

  // Right side burst - shoots toward center
  for (let i = 0; i < particleCount * 0.3; i++) {
    setTimeout(() => {
      const y = screenHeight * 0.5 + (Math.random() - 0.5) * screenHeight * 0.6;
      createConfettiParticle(screenWidth + 20, y, "right");
    }, i * 15 + 50);
  }
}

export function LessonActions({
  moduleSlug,
  lessonSlug,
  initialDone,
  prev,
  next,
}: Props) {
  const [done, setDone] = useState(initialDone);
  const [loading, setLoading] = useState(false);
  const { updateProgress } = useCourse();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleDone = useCallback(async () => {
    const newDone = !done;
    setDone(newDone); // Optimistic update
    updateProgress(moduleSlug, lessonSlug, newDone);

    // Fire confetti immediately for instant feedback
    if (newDone && buttonRef.current) {
      fireConfetti(buttonRef.current);
    }

    setLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleSlug,
          videoSlug: lessonSlug,
          done: newDone,
        }),
      });

      if (!res.ok) {
        // Revert on failure
        setDone(!newDone);
        updateProgress(moduleSlug, lessonSlug, !newDone);
        toast.error("Fortschritt konnte nicht aktualisiert werden.");
      } else {
        if (newDone && next) {
          // Small delay to let user see the confetti
          setTimeout(() => {
            router.push(`/kurs/${next.moduleSlug}/${next.lessonSlug}`, {
              scroll: true,
            });
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "auto" });
            }
          }, 600);
        } else {
          router.refresh();
        }
      }
    } catch {
      // Revert on error
      setDone(!newDone);
      updateProgress(moduleSlug, lessonSlug, !newDone);
      toast.error("Fortschritt konnte nicht aktualisiert werden.");
    } finally {
      setLoading(false);
    }
  }, [done, moduleSlug, lessonSlug, next, router, updateProgress]);

  return (
    <div className="bg-base-100 border-t border-base-300 py-3 px-4 flex items-center justify-center gap-2">
      {/* Left: Zurück */}
      {prev && (
        <Link
          href={`/kurs/${prev.moduleSlug}/${prev.lessonSlug}`}
          className="btn btn-ghost gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Zurück
        </Link>
      )}

      {/* Center: Completed */}
      <button
        ref={buttonRef}
        onClick={handleToggleDone}
        disabled={loading || done}
        aria-busy={loading}
        className={`btn gap-2 ${done ? "btn-success cursor-default" : "btn-primary"}`}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : done ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        Erledigt
      </button>

      {/* Right: Weiter */}
      {next && (
        <Link
          href={`/kurs/${next.moduleSlug}/${next.lessonSlug}`}
          className="btn btn-primary gap-2"
        >
          Weiter
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
