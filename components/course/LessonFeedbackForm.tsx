"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  moduleSlug: string;
  lessonSlug: string;
}

const RATING_OPTIONS = [1, 2, 3, 4, 5];

export function LessonFeedbackForm({ moduleSlug, lessonSlug }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(true);
    } catch (error) {
      console.error("Feedback error", error);
      toast.error("Feedback konnte nicht gesendet werden.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="card bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-lg mb-6">
        <div className="card-body text-center py-10">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-primary mb-2">Vielen Dank!</h3>
          <p className="text-base-content/70">
            Dein Feedback hilft uns, den Kurs noch besser zu machen.
          </p>
          <button
            className="btn btn-ghost btn-sm mt-4"
            onClick={() => setSubmitted(false)}
          >
            Weiteres Feedback geben
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="card bg-gradient-to-br from-base-100 to-base-200 border border-base-300 shadow-lg mb-6">
      <div className="card-body space-y-4">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💬</div>
          <div>
            <h3 className="card-title text-xl text-primary">Wie fandest du dieses Modul?</h3>
            <p className="text-sm text-base-content/60 mt-1">
              Dein Feedback ist wertvoll und hilft, den Kurs kontinuierlich zu verbessern.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="bg-base-200/50 rounded-xl p-4">
            <label className="text-sm font-medium text-base-content/80 block mb-3">
              Bewertung (optional)
            </label>
            <div className="flex items-center gap-1">
              {RATING_OPTIONS.map((value) => (
                <button
                  key={value}
                  type="button"
                  className="btn btn-ghost btn-sm px-2 hover:bg-transparent group"
                  onClick={() => setRating(rating === value ? null : value)}
                  aria-label={`${value} Sterne`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-8 h-8 transition-all duration-200 ${
                      rating !== null && value <= rating
                        ? "fill-accent stroke-accent"
                        : "fill-none stroke-base-content/30 group-hover:stroke-accent/60"
                    }`}
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              ))}
              {rating && (
                <span className="ml-3 text-sm text-accent font-medium">
                  {rating === 5 ? "Ausgezeichnet!" : rating === 4 ? "Sehr gut" : rating === 3 ? "Gut" : rating === 2 ? "Geht so" : "Verbesserungswürdig"}
                </span>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-base-content/80 block mb-2">
              Dein Feedback
            </label>
            <textarea
              className="textarea textarea-bordered w-full min-h-[120px] bg-base-100 focus:textarea-primary resize-none"
              placeholder="Was hat dir gefallen? Was könnten wir verbessern? Teile deine Gedanken..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="btn btn-primary gap-2"
              disabled={submitting || !message.trim()}
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Wird gesendet...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                  </svg>
                  Feedback senden
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
