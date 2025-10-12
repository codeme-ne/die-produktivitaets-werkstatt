"use client";

import { useState } from "react";

interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export default function Quiz({
  question,
  options,
  correctIndex,
  explanation,
}: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = checked && selected === correctIndex;

  return (
    <div className="card bg-base-100 shadow-md my-4">
      <div className="card-body">
        <h4 className="card-title">Quiz</h4>
        <p className="mb-3">{question}</p>
        <ul className="space-y-2">
          {options.map((opt, i) => (
            <li key={i}>
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name={`quiz-${question}`}
                  className="radio radio-primary"
                  checked={selected === i}
                  onChange={() => {
                    setSelected(i);
                    setChecked(false);
                  }}
                  disabled={checked}
                />
                <span className="label-text">{opt}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setChecked(true)}
            disabled={selected === null || checked}
          >
            Prüfen
          </button>
          {checked &&
            (isCorrect ? (
              <span className="badge badge-success">Richtig! 🎉</span>
            ) : (
              <span className="badge badge-error">Nicht ganz…</span>
            ))}
        </div>

        {checked && explanation && (
          <div className="mt-3 text-sm text-base-content/70">{explanation}</div>
        )}
      </div>
    </div>
  );
}
