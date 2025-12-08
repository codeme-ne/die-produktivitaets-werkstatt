"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  moduleSlug: string;
  lessonSlug: string;
}

const RATING_OPTIONS = [5, 4, 3, 2, 1];

export function LessonFeedbackForm({ moduleSlug, lessonSlug }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) {
      toast.error("Bitte Feedback eingeben.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleSlug,
          lessonSlug,
          rating,
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const error = data?.error || "Feedback konnte nicht gesendet werden.";
        toast.error(error);
        return;
      }

      toast.success("Danke für dein Feedback!");
      setMessage("");
      setRating(null);
    } catch (error) {
      console.error("Feedback error", error);
      toast.error("Feedback konnte nicht gesendet werden.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="card bg-base-100 shadow mb-6">
      <div className="card-body space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="card-title text-xl">Feedback zu diesem Modul</h3>
            <p className="text-sm text-base-content/70">
              Dein Feedback hilft, den Kurs zu verbessern. Sentiment läuft über OpenRouter (kein Shortcut).
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-base-content/70">Bewertung (optional):</span>
            {RATING_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                className={`btn btn-xs ${
                  rating === value ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setRating(rating === value ? null : value)}
              >
                {value} ★
              </button>
            ))}
          </div>

          <textarea
            className="textarea textarea-bordered w-full min-h-[140px]"
            placeholder="Was war hilfreich? Was fehlte? Konkretes Feedback…"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Senden..." : "Feedback senden"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
