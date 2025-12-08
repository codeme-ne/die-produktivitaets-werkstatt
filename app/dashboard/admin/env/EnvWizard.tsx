"use client";

import { useMemo, useState } from "react";
import type { EnvGroupDefinition, EnvVarDefinition } from "@/libs/envConfig";

interface Props {
  groups: EnvGroupDefinition[];
}

type CopyState = "idle" | "copied" | "error";

function buildTemplate(
  requiredFields: EnvVarDefinition[],
  optionalFields: EnvVarDefinition[],
  values: Record<string, string>,
): string {
  const lines: string[] = [];
  lines.push("# Pflicht fuer Produktion");
  requiredFields.forEach((item) => {
    const raw = values[item.key]?.trim();
    const fallback = item.example || "<bitte einsetzen>";
    lines.push(`${item.key}=${raw || fallback}`);
  });

  if (optionalFields.length) {
    lines.push("", "# Optionale Keys (leer lassen, wenn nicht benoetigt)");
    optionalFields.forEach((item) => {
      const raw = values[item.key]?.trim();
      const fallback = item.example || "";
      const prefix = raw ? "" : "# ";
      lines.push(`${prefix}${item.key}=${raw || fallback}`);
    });
  }

  return lines.join("\n").trimEnd();
}

export default function EnvWizard({ groups }: Props) {
  const allFields = useMemo(
    () => groups.flatMap((group) => group.items),
    [groups],
  );

  const requiredFields = useMemo(
    () =>
      allFields.filter(
        (item) =>
          item.importance === "required" || item.importance === "recommended",
      ),
    [allFields],
  );

  const optionalFields = useMemo(
    () =>
      allFields.filter(
        (item) => item.importance === "optional" || item.importance === "dev-only",
      ),
    [allFields],
  );

  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    allFields.forEach((item) => {
      initial[item.key] = "";
    });
    return initial;
  });
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const template = useMemo(
    () => buildTemplate(requiredFields, optionalFields, values),
    [requiredFields, optionalFields, values],
  );

  const missingRequired = useMemo(
    () => requiredFields.filter((item) => !values[item.key]?.trim()),
    [requiredFields, values],
  );

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setCopyState("idle");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1800);
    } catch (error) {
      console.error("Copy failed", error);
      setCopyState("error");
    }
  };

  return (
    <section className="card bg-base-100 shadow">
      <div className="card-body space-y-6">
        <div>
          <h2 className="card-title text-2xl">.env Generator</h2>
          <p className="text-base-content/70 text-sm">
            Fuelle die Pflichtfelder aus, kopiere die Vorlage und fuege sie bei deinem Hoster ein.
            Optionale Keys sind auskommentiert, solange kein Wert eingetragen wird.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requiredFields.map((item) => (
            <label key={item.key} className="form-control">
              <div className="label">
                <span className="label-text font-medium">{item.label}</span>
                <span className="label-text-alt text-xs font-mono">{item.key}</span>
              </div>
              <input
                type="text"
                value={values[item.key]}
                onChange={(event) => handleChange(item.key, event.target.value)}
                placeholder={item.example || ""}
                className="input input-bordered"
              />
              <span className="label-text-alt text-xs text-base-content/60">
                {item.description}
              </span>
            </label>
          ))}
        </div>

        <div className="collapse collapse-arrow bg-base-200/60">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium">
            Optionale Keys (CLI, Fallbacks, Dev)
          </div>
          <div className="collapse-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {optionalFields.map((item) => (
                <label key={item.key} className="form-control">
                  <div className="label">
                    <span className="label-text font-medium">{item.label}</span>
                    <span className="label-text-alt text-xs font-mono">{item.key}</span>
                  </div>
                  <input
                    type="text"
                    value={values[item.key]}
                    onChange={(event) => handleChange(item.key, event.target.value)}
                    placeholder={item.example || ""}
                    className="input input-bordered input-sm"
                  />
                  <span className="label-text-alt text-xs text-base-content/60">
                    {item.description}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
            <div>
              <h3 className="font-semibold">Vorschau: .env.local</h3>
              <p className="text-xs text-base-content/60">
                Optionale Zeilen bleiben kommentiert, bis du einen Wert eintraegst.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {missingRequired.length ? (
                <span className="text-xs text-warning">
                  Fehlt: {missingRequired.map((item) => item.key).join(", ")}
                </span>
              ) : (
                <span className="text-xs text-success">Pflichtfelder gefuellt</span>
              )}
              <button
                type="button"
                onClick={handleCopy}
                className="btn btn-primary btn-sm"
              >
                {copyState === "copied"
                  ? "Kopiert"
                  : copyState === "error"
                    ? "Kopieren fehlgeschlagen"
                    : "Alles kopieren"}
              </button>
            </div>
          </div>
          <textarea
            className="textarea textarea-bordered w-full min-h-[240px] font-mono text-xs"
            readOnly
            value={template}
          />
        </div>
      </div>
    </section>
  );
}
