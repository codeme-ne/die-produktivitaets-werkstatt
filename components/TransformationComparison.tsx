"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
};

export function TransformationComparison({ beforeSrc, beforeAlt, afterSrc, afterAlt }: Props) {
  const [loadedImages, setLoadedImages] = useState({ before: false, after: false });
  const allLoaded = loadedImages.before && loadedImages.after;

  return (
    <div className="w-full">
      {/* Container für beide Bilder */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
        {/* Vorher - Woche 1 */}
        <div className="relative pt-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-base-300 bg-base-100">
            {/* Loading State */}
            {!loadedImages.before && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-base-100">
                <span className="loading loading-spinner loading-lg text-base-content/40"></span>
              </div>
            )}
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              className={`object-contain p-3 transition-opacity duration-300 ${loadedImages.before ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              onLoad={() => setLoadedImages(prev => ({ ...prev, before: true }))}
            />
          </div>
          {/* Label */}
          <div className={`absolute top-0 left-4 z-10 transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-2 bg-base-300 text-base-content px-4 py-2 rounded-full text-sm font-semibold border border-base-300 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-warning"></span>
              Woche 1
            </span>
          </div>
        </div>

        {/* Pfeil zwischen den Bildern - nur auf Desktop sichtbar */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className={`bg-accent text-accent-content rounded-full p-3 shadow-xl transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Pfeil zwischen den Bildern - nur auf Mobile sichtbar */}
        <div className={`flex md:hidden justify-center -my-2 transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-accent text-accent-content rounded-full p-2.5 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Nachher - Woche 12 */}
        <div className="relative pt-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-accent bg-base-100 ring-4 ring-accent/20">
            {/* Loading State */}
            {!loadedImages.after && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-base-100">
                <span className="loading loading-spinner loading-lg text-accent"></span>
              </div>
            )}
            <Image
              src={afterSrc}
              alt={afterAlt}
              fill
              className={`object-contain p-3 transition-opacity duration-300 ${loadedImages.after ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              onLoad={() => setLoadedImages(prev => ({ ...prev, after: true }))}
            />
          </div>
          {/* Label */}
          <div className={`absolute top-0 left-4 z-10 transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-2 bg-accent text-accent-content px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-content/80"></span>
              Woche 12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
