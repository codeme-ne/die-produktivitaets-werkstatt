"use client";

import { useMemo, useState } from "react";

export default function PromptBuilder() {
  const [role, setRole] = useState("Du bist ein hilfreicher Assistent.");
  const [task, setTask] = useState(
    "Erstelle eine kurze Zusammenfassung des folgenden Textes.",
  );
  const [style, setStyle] = useState("Klar, prägnant, deutsch.");
  const [constraints, setConstraints] = useState(
    "Max. 80 Wörter, keine Aufzählungen.",
  );
  const [format, setFormat] = useState<"plain" | "json">("plain");

  const prompt = useMemo(() => {
    const header = `${role}\n\nAufgabe: ${task}\n\nStil: ${style}\n\nVorgaben: ${constraints}`;
    if (format === "json") {
      return `${header}\n\nGib die Antwort als JSON zurück:\n{ "summary": string }`;
    }
    return header;
  }, [role, task, style, constraints, format]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch (error) {
      // Clipboard API kann in unsicheren Kontexten fehlschlagen
      console.error("PromptBuilder: clipboard write failed", error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md my-4">
      <div className="card-body">
        <h4 className="card-title">Prompt‑Builder</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rolle</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Aufgabe</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Stil</span>
            </label>
            <input
              className="input input-bordered"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Vorgaben</span>
            </label>
            <input
              className="input input-bordered"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Format</span>
            </label>
            <select
              className="select select-bordered"
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
            >
              <option value="plain">Text</option>
              <option value="json">JSON</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="label">
            <span className="label-text">Vorschau</span>
          </label>
          <pre className="bg-base-200 p-3 rounded text-sm whitespace-pre-wrap">
            {prompt}
          </pre>
        </div>
        <div className="mt-3">
          <button className="btn btn-sm" onClick={copy}>
            In die Zwischenablage
          </button>
        </div>
      </div>
    </div>
  );
}
