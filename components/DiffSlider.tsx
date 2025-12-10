"use client";

import Image from "next/image";
import { type PointerEvent, useCallback, useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
};

export function DiffSlider({ beforeSrc, beforeAlt, afterSrc, afterAlt }: Props) {
  const [pos, setPos] = useState(50);
  const [loadedImages, setLoadedImages] = useState({ before: false, after: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const allLoaded = loadedImages.before && loadedImages.after;

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPos(Number(((x / rect.width) * 100).toFixed(1)));
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.buttons !== 1) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-base-100 bg-base-300"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        role="group"
        aria-label="Vorher/Nachher Vergleich"
      >
        {/* Skeleton Loading State */}
        {!allLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-base-300">
            <div className="flex flex-col items-center gap-3">
              <span className="loading loading-spinner loading-lg text-accent"></span>
              <span className="text-sm text-base-content/60">Bilder werden geladen...</span>
            </div>
          </div>
        )}

        {/* Nachher (hinten) */}
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className={`object-contain transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="100vw"
          priority
          onLoad={() => setLoadedImages(prev => ({ ...prev, after: true }))}
        />

        {/* Vorher (vorn, geklippt aber ohne Resize des Bildes) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className={`object-contain transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="100vw"
            priority
            onLoad={() => setLoadedImages(prev => ({ ...prev, before: true }))}
          />
        </div>

        {/* Slider Linie mit Pfeil-Symbol - nur zeigen wenn geladen */}
        <div
          className={`absolute top-0 bottom-0 w-0.5 bg-base-content/80 cursor-ew-resize transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-base-100 shadow-lg border-2 border-base-300 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-content/70">
              <path d="M18 8L22 12L18 16" />
              <path d="M6 8L2 12L6 16" />
            </svg>
          </div>
        </div>

        {/* Labels unten - nur zeigen wenn geladen */}
        <div className={`absolute bottom-4 left-4 z-10 text-sm font-semibold bg-base-200/90 text-base-content px-3 py-1.5 rounded border border-base-300 transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
          Woche 1
        </div>
        <div className={`absolute bottom-4 right-4 z-10 text-sm font-semibold bg-accent/90 text-accent-content px-3 py-1.5 rounded transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
          Woche 8
        </div>
      </div>
    </div>
  );
}
