"use client";

import React, { useState } from "react";
import { createAndIngestAction } from "./actions";

export default function VideoCreateForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    guid?: string;
    error?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await createAndIngestAction({ title, url });
    setResult(res);

    if (res.success) {
      setTitle("");
      setUrl("");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Titel</span>
        </label>
        <input
          type="text"
          placeholder="z.B. Einführung in KI"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Source-URL</span>
        </label>
        <input
          type="url"
          placeholder="https://example.com/video.mp4"
          className="input input-bordered w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={loading}
        />
        <label className="label">
          <span className="label-text-alt">
            Öffentlich erreichbare Video-URL (MP4, etc.)
          </span>
        </label>
      </div>

      {result && (
        <div
          className={`alert ${result.success ? "alert-success" : "alert-error"}`}
        >
          {result.success ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div className="font-bold">Video erfolgreich erstellt!</div>
                <div className="text-sm">
                  GUID:{" "}
                  <code className="bg-base-100 px-2 py-1 rounded">
                    {result.guid}
                  </code>
                </div>
                <div className="text-sm mt-1">
                  Import läuft im Hintergrund. Aktualisiere die Liste in wenigen
                  Sekunden.
                </div>
              </div>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Fehler: {result.error}</span>
            </>
          )}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Wird erstellt...
          </>
        ) : (
          "Erstellen & Import starten"
        )}
      </button>
    </form>
  );
}
