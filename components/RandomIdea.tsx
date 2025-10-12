"use client";

import { useState } from "react";

const ROLES = ["Lehrer", "Coach", "Analyst", "Forscher", "Produktmanager"];
const TOPICS = [
  "Blogartikel",
  "Meeting-Notizen",
  "Marketing-Text",
  "Bug-Report",
  "Interview-Zusammenfassung",
];
const TWISTS = [
  "in 5 Stichpunkten",
  "als Markdown",
  "mit Beispielen",
  "im Stil von IKEA-Anleitungen",
  "max. 80 Wörter",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function RandomIdea() {
  const [idea, setIdea] = useState({
    role: pick(ROLES),
    topic: pick(TOPICS),
    twist: pick(TWISTS),
  });

  const regenerate = () => {
    setIdea({ role: pick(ROLES), topic: pick(TOPICS), twist: pick(TWISTS) });
  };

  return (
    <div className="card bg-base-100 shadow-md my-4">
      <div className="card-body">
        <h4 className="card-title">Ideen‑Generator</h4>
        <p>
          Rolle: <span className="font-semibold">{idea.role}</span> · Thema:{" "}
          <span className="font-semibold">{idea.topic}</span> · Twist:{" "}
          <span className="font-semibold">{idea.twist}</span>
        </p>
        <button className="btn btn-sm mt-2" onClick={regenerate}>
          Neue Idee
        </button>
      </div>
    </div>
  );
}
