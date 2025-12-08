"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface SearchResult {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  excerpt: string;
  score: number;
  source: "lesson" | "transcript";
}

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim().length < 2) {
      toast.error("Bitte mindestens 2 Zeichen eingeben.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=25`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.error || "Suche fehlgeschlagen");
        return;
      }
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed", error);
      toast.error("Suche fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Thema, Begriff oder Zitat eingeben..."
          className="input input-bordered w-full"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="btn btn-primary min-w-[120px]" disabled={loading}>
          {loading ? "Suche..." : "Suchen"}
        </button>
      </form>

      <div className="space-y-3">
        {results.length === 0 && !loading ? (
          <p className="text-sm text-base-content/70">
            Keine Ergebnisse. Suche durchsucht Lektionstexte und Transkripte (freigeschaltete Module).
          </p>
        ) : null}

        {results.map((result, idx) => (
          <div key={`${result.moduleSlug}-${result.lessonSlug}-${idx}`} className="card bg-base-100 shadow">
            <div className="card-body space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-primary badge-sm">{result.source}</span>
                <span className="badge badge-ghost badge-sm font-mono">
                  {result.moduleSlug}/{result.lessonSlug}
                </span>
                <span className="badge badge-outline badge-sm">Score {result.score.toFixed(2)}</span>
              </div>
              <Link
                href={`/kurs/${result.moduleSlug}/${result.lessonSlug}`}
                className="link link-primary text-lg font-semibold"
              >
                {result.title}
              </Link>
              <p className="text-sm text-base-content/70 whitespace-pre-wrap">
                {result.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
