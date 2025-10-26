"use client";

import { useState, useMemo } from "react";
import RichText from "@/components/RichText";

interface Props {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  initialContent: string;
  initialSource: "file" | "csv" | "backup";
  backups: string[];
}

interface StatusMessage {
  type: "success" | "error" | "info";
  text: string;
}

export default function LessonEditor({
  moduleSlug,
  lessonSlug,
  title,
  initialContent,
  initialSource,
  backups,
}: Props) {
  const [content, setContent] = useState(initialContent);
  const [baseline, setBaseline] = useState(initialContent);
  const [source, setSource] = useState(initialSource);
  const [backupPaths, setBackupPaths] = useState(backups);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const isDirty = useMemo(() => content !== baseline, [content, baseline]);

  async function handleSave() {
    if (!isDirty) return;
    setIsSaving(true);
    setStatus(null);

    try {
      const response = await fetch("/api/admin/lesson", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleSlug,
          lessonSlug,
          content,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Speichern fehlgeschlagen");
      }

      const data = await response.json();
      setBaseline(content);
      setSource("file");
      if (data.backup) {
        setBackupPaths((prev) => [data.backup, ...prev]);
      }
      setStatus({ type: "success", text: "Markdown gespeichert." });
    } catch (error: any) {
      setStatus({
        type: "error",
        text: error?.message || "Speichern fehlgeschlagen.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUndo() {
    setIsRestoring(true);
    setStatus(null);

    try {
      const response = await fetch(
        `/api/admin/lesson?module=${moduleSlug}&lesson=${lessonSlug}&backup=latest`,
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Kein Backup gefunden");
      }

      const data = await response.json();
      setContent(data.content || "");
      setSource("backup");
      setStatus({
        type: "info",
        text: data.backupPath
          ? `Backup geladen: ${data.backupPath}`
          : "Letztes Backup geladen.",
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        text: error?.message || "Backup konnte nicht geladen werden.",
      });
    } finally {
      setIsRestoring(false);
    }
  }

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body space-y-6">
        <div>
          <h2 className="card-title text-2xl mb-2">{title}</h2>
          <p className="text-sm text-base-content/70">
            Quelle: {source === "csv"
              ? "CSV-Fallback"
              : source === "backup"
              ? "Backup (noch nicht gespeichert)"
              : "Markdown-Datei"}
          </p>
          <p className="text-sm text-base-content/60">
            Bitte keine H1-Überschrift (`#`). Die erste Überschrift sollte `##` sein.
          </p>
        </div>

        {status ? (
          <div
            className={`alert ${
              status.type === "success"
                ? "alert-success"
                : status.type === "error"
                ? "alert-error"
                : "alert-info"
            }`}
          >
            <span>{status.text}</span>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!isDirty || isSaving}
          >
            {isSaving ? "Speichern…" : "Speichern"}
          </button>
          <button
            className="btn btn-outline"
            onClick={handleUndo}
            disabled={isRestoring || backupPaths.length === 0}
          >
            {isRestoring ? "Backup laden…" : "Letztes Backup laden"}
          </button>
          {backupPaths.length > 0 ? (
            <span className="text-sm text-base-content/60 self-center">
              Aktuelles Backup: {backupPaths[0]}
            </span>
          ) : (
            <span className="text-sm text-base-content/60 self-center">
              Noch keine Backups vorhanden.
            </span>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Markdown</span>
              <span className="label-text-alt text-base-content/60">
                Modul: {moduleSlug} · Lektion: {lessonSlug}
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-[32rem] font-mono"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              spellCheck={false}
            />
            <div className="mt-2 text-sm text-base-content/60">
              Zeichen: {content.length} · Zeilen: {content.split(/\r?\n/).length}
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Live Preview</span>
            </label>
            <div className="border border-base-300 rounded-lg p-4 h-[32rem] overflow-y-auto bg-base-200/40">
              <RichText content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
