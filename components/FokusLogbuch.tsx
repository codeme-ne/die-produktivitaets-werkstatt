"use client";

import { useState, useEffect, useCallback } from "react";

type Phase = "idle" | "planning" | "focusing" | "reflecting" | "results";

interface PhaseConfig {
  title: string;
  duration: number; // in seconds
  instruction: string;
  color: string;
}

const PHASE_CONFIGS: Record<Exclude<Phase, "idle" | "results">, PhaseConfig> = {
  planning: {
    title: "Planung",
    duration: 30, // Demo: 30s instead of 5min for landing page
    instruction: "Woran möchtest du als nächstes arbeiten?",
    color: "text-info",
  },
  focusing: {
    title: "Fokuszeit",
    duration: 60, // Demo: 60s instead of 50min for landing page
    instruction: "Konzentriere dich voll auf deine Aufgabe.",
    color: "text-primary",
  },
  reflecting: {
    title: "Reflexion",
    duration: 30, // Demo: 30s instead of 5min for landing page
    instruction: "Was hast du erreicht? Wie lief es?",
    color: "text-secondary",
  },
};

export default function FokusLogbuch() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [planText, setPlanText] = useState("");
  const [reflectionText, setReflectionText] = useState("");
  const [totalFocusTime, setTotalFocusTime] = useState(0); // in seconds
  const [sessionCount, setSessionCount] = useState(0);

  // Define advancePhase before it's used
  const advancePhase = useCallback(() => {
    setIsRunning(false);

    if (phase === "planning") {
      setPhase("focusing");
      setTimeRemaining(PHASE_CONFIGS.focusing.duration);
      setIsRunning(true);
    } else if (phase === "focusing") {
      // Add focus time to total
      setTotalFocusTime((prev) => prev + PHASE_CONFIGS.focusing.duration);
      setSessionCount((prev) => prev + 1);
      setPhase("reflecting");
      setTimeRemaining(PHASE_CONFIGS.reflecting.duration);
      setIsRunning(true);
    } else if (phase === "reflecting") {
      setPhase("results");
      setTimeRemaining(0);
    }
  }, [phase]);

  // Timer countdown logic
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  // Auto-advance when timer reaches 0
  useEffect(() => {
    if (timeRemaining === 0 && !isRunning && phase !== "idle" && phase !== "results") {
      // Timer finished, show completion message briefly then auto-advance
      setTimeout(() => {
        advancePhase();
      }, 1000);
    }
  }, [timeRemaining, isRunning, phase, advancePhase]);

  const startDemo = useCallback(() => {
    setPhase("planning");
    setTimeRemaining(PHASE_CONFIGS.planning.duration);
    setIsRunning(true);
    setPlanText("");
    setReflectionText("");
  }, []);

  const skipPhase = useCallback(() => {
    setTimeRemaining(0);
    setIsRunning(false);
    advancePhase();
  }, [advancePhase]);

  const resetDemo = useCallback(() => {
    setPhase("idle");
    setTimeRemaining(0);
    setIsRunning(false);
    setPlanText("");
    setReflectionText("");
  }, []);

  const scrollToPricing = useCallback(() => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = (): number => {
    if (phase === "idle" || phase === "results") return 0;
    const config = PHASE_CONFIGS[phase];
    return Math.round(((config.duration - timeRemaining) / config.duration) * 100);
  };

  // Render based on current phase
  if (phase === "idle") {
    return (
      <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl max-w-md">
        <div className="card-body items-center text-center space-y-4">
          <h3 className="card-title text-2xl">Fokus-Logbuch Demo</h3>
          <p className="text-base-content/70">
            Erlebe die 5-50-5-Methode: Messbare Fokuszeit für mehr Produktivität.
          </p>
          <div className="bg-base-200 p-4 rounded-lg space-y-2 w-full text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">📝 Planung:</span>
              <span className="text-base-content/60">Was steht an?</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">🎯 Fokus:</span>
              <span className="text-base-content/60">Konzentriert arbeiten</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">🤔 Reflexion:</span>
              <span className="text-base-content/60">Was wurde erreicht?</span>
            </div>
          </div>
          <button onClick={startDemo} className="btn btn-primary btn-lg w-full">
            Demo starten
          </button>
          <p className="text-xs text-base-content/50">
            ⚡ Beschleunigter Demo-Modus (Sekunden statt Minuten)
          </p>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl max-w-md">
        <div className="card-body items-center text-center space-y-4">
          <div className="text-6xl mb-2">🎉</div>
          <h3 className="card-title text-2xl">Fokussession abgeschlossen!</h3>

          <div className="stats stats-vertical shadow bg-base-100 w-full">
            <div className="stat">
              <div className="stat-title">Fokuszeit gesamt</div>
              <div className="stat-value text-primary">{Math.floor(totalFocusTime / 60)}:{(totalFocusTime % 60).toString().padStart(2, "0")}</div>
              <div className="stat-desc">Minuten konzentrierter Arbeit</div>
            </div>
            <div className="stat">
              <div className="stat-title">Sessions</div>
              <div className="stat-value text-secondary">{sessionCount}</div>
              <div className="stat-desc">Abgeschlossene Fokuseinheiten</div>
            </div>
          </div>

          {reflectionText && (
            <div className="bg-base-200 p-3 rounded w-full text-left">
              <p className="text-sm font-semibold mb-1">Deine Reflexion:</p>
              <p className="text-sm text-base-content/70">{reflectionText}</p>
            </div>
          )}

          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="text-sm">
              <p className="font-semibold">Was gemessen wird, wird besser</p>
              <p className="text-xs">2-4h Fokus übertreffen 8h Multitasking</p>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <button onClick={resetDemo} className="btn btn-outline flex-1">
              Zurücksetzen
            </button>
            <button onClick={scrollToPricing} className="btn btn-primary flex-1">
              Zum Kurs →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active phase (planning, focusing, reflecting)
  const config = PHASE_CONFIGS[phase];
  const progress = getProgress();

  return (
    <div className="card bg-base-100 shadow-xl max-w-md">
      <div className="card-body items-center space-y-4">
        <div className="badge badge-lg badge-primary">{config.title}</div>

        <div className="relative">
          <div
            className={`radial-progress ${config.color}`}
            style={{
              "--value": progress,
              "--size": "160px",
              "--thickness": "8px",
            } as any}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="text-center">
              <div className="text-3xl font-bold">{formatTime(timeRemaining)}</div>
              <div className="text-xs text-base-content/60">{progress}%</div>
            </div>
          </div>
        </div>

        <p className="text-center text-base-content/70">{config.instruction}</p>

        {(phase === "planning" || phase === "reflecting") && (
          <div className="form-control w-full">
            <textarea
              className="textarea textarea-bordered h-20"
              placeholder={
                phase === "planning"
                  ? "z.B. 'Präsentation für Meeting vorbereiten'"
                  : "z.B. 'Erste Draft fertig, 3 Folien erstellt'"
              }
              value={phase === "planning" ? planText : reflectionText}
              onChange={(e) =>
                phase === "planning"
                  ? setPlanText(e.target.value)
                  : setReflectionText(e.target.value)
              }
            />
          </div>
        )}

        {phase === "focusing" && planText && (
          <div className="bg-base-200 p-3 rounded w-full">
            <p className="text-xs font-semibold text-base-content/60 mb-1">
              Dein Fokus:
            </p>
            <p className="text-sm">{planText}</p>
          </div>
        )}

        <div className="flex gap-2 w-full">
          <button onClick={toggleTimer} className="btn btn-outline flex-1">
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={skipPhase} className="btn btn-ghost flex-1">
            Überspringen →
          </button>
        </div>

        {sessionCount > 0 && (
          <div className="badge badge-secondary badge-outline">
            {sessionCount} Session{sessionCount !== 1 ? "s" : ""} · {Math.floor(totalFocusTime / 60)}min Fokus
          </div>
        )}
      </div>
    </div>
  );
}
