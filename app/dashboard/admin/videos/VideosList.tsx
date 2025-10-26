"use client";

import { useState } from "react";
import { BunnyListResponse } from "@/libs/bunnyStream";
import { listVideosAction, generateTranscriptAction } from "./actions";
import VideoEmbed from "@/components/VideoEmbed";
import type { TranscriptStatus } from "@/types/transcripts";

type Props = {
  initialData: BunnyListResponse;
  initialTranscripts: TranscriptStatus[];
};

type TranscriptMessage = {
  type: "success" | "error";
  text: string;
};

function toTranscriptMap(items: TranscriptStatus[]) {
  return items.reduce<Record<string, TranscriptStatus>>((acc, item) => {
    acc[item.guid] = item;
    return acc;
  }, {});
}

export default function VideosList({ initialData, initialTranscripts }: Props) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<Record<string, TranscriptStatus>>(
    toTranscriptMap(initialTranscripts),
  );
  const [messages, setMessages] = useState<Record<string, TranscriptMessage | undefined>>({});
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  async function handleRefresh() {
    setLoading(true);
    const res = await listVideosAction();
    if (res.success && res.data) {
      setData(res.data);
      if (res.transcripts) {
        setTranscripts(toTranscriptMap(res.transcripts));
      }
    }
    setLoading(false);
  }

  function copyEmbedSnippet(videoId: string) {
    const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID || "";
    const snippet = `<VideoEmbed libraryId="${libraryId}" videoId="${videoId}" />`;
    navigator.clipboard.writeText(snippet);
    setCopiedId(videoId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleGenerateTranscript(videoId: string) {
    setGeneratingId(videoId);
    setMessages((prev) => ({ ...prev, [videoId]: undefined }));

    const res = await generateTranscriptAction({ guid: videoId });
    if (res.success && res.transcript) {
      setTranscripts((prev) => ({ ...prev, [videoId]: res.transcript! }));
      setMessages((prev) => ({
        ...prev,
        [videoId]: { type: "success", text: "Transkript aktualisiert." },
      }));
    } else {
      setMessages((prev) => ({
        ...prev,
        [videoId]: {
          type: "error",
          text: res.error || "Transkript konnte nicht erstellt werden.",
        },
      }));
    }

    if (res.logs) {
      console.log(`[transcript:${videoId}]\n${res.logs}`);
    }

    setGeneratingId(null);
  }

  if (data.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base-content/70">Noch keine Videos vorhanden.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleRefresh}
          className="btn btn-sm btn-outline"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Lädt...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Aktualisieren
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((video) => {
          const transcript = transcripts[video.guid];
          const message = messages[video.guid];

          return (
            <div key={video.guid} className="card bg-base-200 shadow-md">
              <div className="card-body p-4">
                <h3 className="card-title text-lg">
                  {video.title || "Ohne Titel"}
                </h3>

                {/* Status & Date */}
                <div className="flex gap-2 text-sm text-base-content/70">
                  <span
                    className={`badge ${video.status === 4 ? "badge-success" : "badge-warning"}`}
                  >
                    {video.status === 4
                      ? "Bereit"
                      : `Status ${video.status || "?"}`}
                  </span>
                  {video.dateUploaded && (
                    <span className="badge badge-ghost">
                      {new Date(video.dateUploaded).toLocaleDateString("de-DE")}
                    </span>
                  )}
                </div>

                {/* Embed Preview (only if status === 4) */}
                {video.status === 4 && (
                  <div className="mt-2">
                    <VideoEmbed
                      libraryId={process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID || ""}
                      videoId={video.guid}
                      className="rounded-lg overflow-hidden"
                    />
                  </div>
                )}

                {/* GUID */}
                <div className="mt-2">
                  <code
                    className="text-xs bg-base-100 px-2 py-1 rounded block truncate"
                    title={video.guid}
                  >
                    {video.guid}
                  </code>
                </div>

                {/* Transcript */}
                <div className="mt-4 border-t border-base-content/10 pt-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-base-content/80">
                        Transkript
                      </p>
                      {transcript?.exists ? (
                        <p className="text-sm text-base-content/70">
                          {transcript.meta?.language?.toUpperCase() || "—"} ·{" "}
                          {transcript.meta?.generatedAt
                            ? new Date(transcript.meta.generatedAt).toLocaleString("de-DE")
                            : "Zeitpunkt unbekannt"}
                        </p>
                      ) : (
                        <p className="text-sm text-base-content/60">
                          Noch kein Transkript vorhanden.
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleGenerateTranscript(video.guid)}
                      className="btn btn-xs btn-outline"
                      disabled={generatingId === video.guid || video.status !== 4}
                    >
                      {generatingId === video.guid ? (
                        <>
                          <span className="loading loading-spinner loading-xs"></span>
                          Läuft...
                        </>
                      ) : transcript?.exists ? (
                        "Neu generieren"
                      ) : (
                        "Transkript erzeugen"
                      )}
                    </button>
                  </div>
                  {message && (
                    <div
                      className={`alert mt-3 py-2 text-sm ${
                        message.type === "success" ? "alert-success" : "alert-error"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => copyEmbedSnippet(video.guid)}
                    className={`btn btn-xs ${copiedId === video.guid ? "btn-success" : "btn-outline"}`}
                  >
                    {copiedId === video.guid ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Embed kopieren
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
