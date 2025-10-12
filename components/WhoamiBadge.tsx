"use client";

import { useEffect, useState } from "react";

type Whoami = {
  authenticated: boolean;
  email?: string;
  cid?: string;
  admin?: boolean;
  error?: string;
};

export default function WhoamiBadge({ className }: { className?: string }) {
  const [data, setData] = useState<Whoami | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/debug/whoami", { cache: "no-store" });
        const json = (await res.json()) as Whoami;
        if (mounted) setData(json);
      } catch {
        if (mounted) setData({ authenticated: false, error: "fetch_error" });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const base = "inline-flex items-center gap-2 px-2 py-1 rounded text-xs";

  if (loading) {
    return (
      <span className={`${base} bg-base-200 ${className || ""}`}>
        <span className="loading loading-spinner loading-xs" />
        Prüfe Login…
      </span>
    );
  }

  if (!data?.authenticated) {
    return (
      <span
        className={`${base} bg-base-200 ${className || ""}`}
        title={data?.error || "Nicht angemeldet"}
      >
        <span className="badge badge-ghost badge-xs" />
        Gast
      </span>
    );
  }

  return (
    <span className={`${base} bg-base-200 ${className || ""}`}>
      <span
        className={`badge ${data.admin ? "badge-primary" : "badge-neutral"} badge-xs`}
      />
      {data.email}
      {data.admin ? (
        <span className="badge badge-outline badge-xs">Admin</span>
      ) : (
        <span className="badge badge-outline badge-xs">User</span>
      )}
    </span>
  );
}
