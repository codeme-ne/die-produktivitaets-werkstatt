/*
  Produktivitäts-Werkstatt · Simple Wireframes
  Fokus: minimalistische Layouts für Video-Detailseiten
*/

import type { ReactNode } from "react";

const wireframes: Array<{
  id: string;
  title: string;
  layout: ReactNode;
}> = [
  {
    id: "hero",
    title: "Hero Video & Textblock",
    layout: (
      <section className="space-y-6">
        <header>
          <p className="text-xs uppercase tracking-wide text-primary">
            Modul · Produktivitäts-Werkstatt
          </p>
          <h2 className="text-2xl font-semibold">Kick-off · Mindset</h2>
        </header>
        <div className="aspect-video rounded-2xl bg-base-200 flex items-center justify-center text-base-content/60">
          Video Placeholder
        </div>
        <article className="space-y-3">
          <p className="text-sm text-base-content/60">
            24 Minuten · Workbook Kapitel 1
          </p>
          <p className="leading-relaxed text-base-content/80">
            Kurzer Introtext mit dem Kernversprechen des Videos. Zwei bis drei
            Sätze, warum dieses Video wichtig ist und was die Lernenden direkt
            danach tun können.
          </p>
        </article>
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] rounded-xl bg-base-200 flex items-center justify-center text-xs text-base-content/60"
            >
              Bild {index + 1}
            </div>
          ))}
        </div>
      </section>
    ),
  },
  {
    id: "split",
    title: "Split Layout",
    layout: (
      <section className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          <div className="aspect-video rounded-2xl bg-base-200 flex items-center justify-center text-base-content/60">
            Video Placeholder
          </div>
          <p className="text-base-content/80 leading-relaxed">
            Ein kurzer Beschreibungstext unter dem Video. Daneben (rechts) eine
            einfache Liste der restlichen Videos im Modul.
          </p>
        </div>
        <aside className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-base-content/60">
            Modul Videos
          </p>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <button
                key={index}
                className="w-full rounded-xl border border-base-300 px-3 py-2 text-left text-sm hover:border-primary transition"
              >
                Video {index + 1}
              </button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className="h-24 rounded-lg bg-base-200 flex items-center justify-center text-xs text-base-content/60"
              >
                Bild {idx + 1}
              </div>
            ))}
          </div>
        </aside>
      </section>
    ),
  },
  {
    id: "stack",
    title: "Stacked Sections",
    layout: (
      <section className="space-y-4">
        <div className="aspect-[16/9] rounded-2xl bg-base-200 flex items-center justify-center text-base-content/60">
          Video Placeholder
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Beschreibung</h3>
          <p className="leading-relaxed text-base-content/80">
            Ein Fließtext, der das Video zusammenfasst. Anschließend eine
            einfache Liste mit Stichpunkten.
          </p>
          <ul className="list-disc list-inside text-base-content/70 text-sm space-y-1">
            <li>Bullet 1</li>
            <li>Bullet 2</li>
            <li>Bullet 3</li>
          </ul>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-32 rounded-xl bg-base-200 flex items-center justify-center text-xs text-base-content/60"
            >
              Bild {index + 1}
            </div>
          ))}
        </div>
      </section>
    ),
  },
];

export default function ProductivityWireframeSimple() {
  return (
    <div className="space-y-12">
      {wireframes.map((item) => (
        <section key={item.id} className="space-y-4">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm">
            {item.layout}
          </div>
        </section>
      ))}
    </div>
  );
}
