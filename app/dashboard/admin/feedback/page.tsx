import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import { feedbackStats, listFeedback } from "@/libs/feedback";
import { listAuditLogs } from "@/libs/auditLog";

async function requireAdmin(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/");
  }

  try {
    const payload = await verifyAccess(token.value);
    if (!isAdmin(payload.email)) {
      redirect("/");
    }
    return payload.email;
  } catch {
    redirect("/");
  }
}

export default async function AdminFeedbackPage() {
  const email = await requireAdmin();
  const [stats, entries, audits] = await Promise.all([
    feedbackStats(),
    listFeedback({ limit: 200 }),
    listAuditLogs(100),
  ]);

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
      <div className="mb-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Feedback & Logs</h1>
        <p className="text-lg text-base-content/70">
          Admin: {email} - Nutzerfeedback, Stimmung und letzte Ereignisse.
        </p>
      </div>

      <AdminNav active="feedback" />

      <div className="stats stats-vertical md:stats-horizontal shadow bg-base-100">
        <div className="stat">
          <div className="stat-title">Feedback gesamt</div>
          <div className="stat-value">{stats.count}</div>
          <div className="stat-desc">Limit: letzte 200 Einträge</div>
        </div>
        <div className="stat">
          <div className="stat-title">Ø Bewertung</div>
          <div className="stat-value">
            {stats.avgRating ? stats.avgRating.toFixed(2) : "—"}
          </div>
          <div className="stat-desc">Skala 1-5 (falls gesetzt)</div>
        </div>
      </div>

      <section className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h2 className="card-title text-2xl">Feedback (neueste 200)</h2>
              <p className="text-sm text-base-content/70">
                Gespeichert in Postgres.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Modul/Lektion</th>
                  <th>Nachricht</th>
                  <th>Bewertung</th>
                  <th>Email</th>
                  <th>Datum</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <div className="font-mono text-xs">
                        {entry.moduleSlug ?? "—"} / {entry.lessonSlug ?? "—"}
                      </div>
                    </td>
                    <td className="max-w-xl">
                      <div className="text-sm whitespace-pre-wrap">
                        {entry.message}
                      </div>
                    </td>
                    <td>{entry.rating ?? "—"}</td>
                    <td>
                      <span
                        className={`badge ${
                          entry.sentimentLabel === "positive"
                            ? "badge-success"
                            : entry.sentimentLabel === "negative"
                              ? "badge-error"
                              : "badge-neutral"
                        }`}
                      >
                        {entry.sentimentLabel} ({entry.sentimentScore.toFixed(2)})
                      </span>
                    </td>
                    <td className="text-xs text-base-content/70">{entry.email}</td>
                    <td className="text-xs text-base-content/60">
                      {new Date(entry.createdAt).toLocaleString("de-DE")}
                    </td>
                  </tr>
                ))}
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-base-content/60">
                      Noch kein Feedback eingegangen.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="card bg-base-100 shadow">
        <div className="card-body space-y-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="card-title text-2xl">Letzte Ereignisse (Audit)</h2>
              <p className="text-sm text-base-content/70">
                Zeigt die letzten 100 Einträge aus audit_logs (Feedback, Suchen, Admin-Aktionen).
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Typ</th>
                  <th>Actor</th>
                  <th>Daten</th>
                  <th>Zeit</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((log) => (
                  <tr key={log.id}>
                    <td className="font-mono text-xs">{log.type}</td>
                    <td className="text-xs text-base-content/70">{log.actor ?? "—"}</td>
                    <td className="text-xs text-base-content/70 whitespace-pre-wrap">
                      {JSON.stringify(log.data)}
                    </td>
                    <td className="text-xs text-base-content/60">
                      {new Date(log.createdAt).toLocaleString("de-DE")}
                    </td>
                  </tr>
                ))}
                {audits.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-base-content/60">
                      Noch keine Audit-Einträge.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
