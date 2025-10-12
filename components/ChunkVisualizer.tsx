"use client";

import { useMemo, useState } from "react";

export default function ChunkVisualizer() {
  const [text, setText] = useState(
    "Füge hier deinen Text ein, um Chunking zu visualisieren.",
  );
  const [size, setSize] = useState(120);

  const chunks = useMemo(() => {
    const out: string[] = [];
    let i = 0;
    while (i < text.length) {
      out.push(text.slice(i, i + size));
      i += size;
    }
    return out;
  }, [text, size]);

  return (
    <div className="card bg-base-100 shadow-md my-4">
      <div className="card-body">
        <h4 className="card-title">Chunk‑Visualizer</h4>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Text</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <label className="label">
            <span className="label-text">Chunk‑Größe</span>
          </label>
          <input
            type="range"
            min={60}
            max={400}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="range"
          />
          <span className="badge badge-ghost">{size} Zeichen</span>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {chunks.map((c, idx) => (
            <pre
              key={idx}
              className="bg-base-200 p-3 rounded text-xs whitespace-pre-wrap"
            >
              {c}
            </pre>
          ))}
        </div>
      </div>
    </div>
  );
}
