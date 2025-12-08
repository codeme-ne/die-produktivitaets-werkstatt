import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import {
  ENV_GROUPS,
  type EnvGroupDefinition,
  type EnvImportance,
  type EnvScope,
  type EnvVarDefinition,
} from "@/libs/envConfig";
import EnvWizard from "./EnvWizard";

type EnvVarStatus = EnvVarDefinition & {
  isSet: boolean;
  valueLength: number;
};

type EnvGroupStatus = Omit<EnvGroupDefinition, "items"> & {
  items: EnvVarStatus[];
};

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

function toStatus(def: EnvVarDefinition): EnvVarStatus {
  const raw = process.env[def.key];
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  return {
    ...def,
    isSet: trimmed.length > 0,
    valueLength: trimmed.length,
  };
}

function importanceLabel(importance: EnvImportance): string {
  switch (importance) {
    case "required":
      return "Pflicht";
    case "recommended":
      return "Empfohlen";
    case "optional":
      return "Optional";
    case "dev-only":
      return "Nur Dev";
    default:
      return "";
  }
}

function scopeLabel(scope: EnvScope): string {
  switch (scope) {
    case "client":
      return "Frontend";
    case "script":
      return "CLI/Script";
    default:
      return "Server";
  }
}

function statusBadgeClass(isSet: boolean, importance: EnvImportance): string {
  if (isSet) return "badge badge-success";
  if (importance === "required") return "badge badge-error";
  if (importance === "recommended") return "badge badge-warning";
  return "badge badge-outline";
}

function importanceBadgeClass(importance: EnvImportance): string {
  if (importance === "required") return "badge badge-primary";
  if (importance === "recommended") return "badge badge-info";
  if (importance === "dev-only") return "badge badge-neutral";
  return "badge badge-ghost";
}

export default async function AdminEnvPage() {
  const email = await requireAdmin();

  const statusGroups: EnvGroupStatus[] = ENV_GROUPS.map((group) => ({
    ...group,
    items: group.items.map(toStatus),
  }));

  const required = statusGroups.flatMap((group) =>
    group.items.filter((item) => item.importance === "required"),
  );
  const recommended = statusGroups.flatMap((group) =>
    group.items.filter((item) => item.importance === "recommended"),
  );
  const optional = statusGroups.flatMap((group) =>
    group.items.filter((item) => item.importance === "optional"),
  );
  const devOnly = statusGroups.flatMap((group) =>
    group.items.filter((item) => item.importance === "dev-only"),
  );

  const requiredSet = required.filter((item) => item.isSet).length;
  const recommendedSet = recommended.filter((item) => item.isSet).length;
  const optionalSet = optional.filter((item) => item.isSet).length;
  const devSet = devOnly.filter((item) => item.isSet);

  const missingRequired = required.filter((item) => !item.isSet).map((item) => item.key);
  const missingRecommended = recommended
    .filter((item) => !item.isSet)
    .map((item) => item.key);

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Umgebungsvariablen
        </h1>
        <p className="text-lg text-base-content/70">
          Admin: {email} - hier fuegst du alle noetigen Env-Keys fuer Produktion hinzu.
        </p>
      </div>

      <AdminNav active="env" />

      <div className="stats stats-vertical md:stats-horizontal shadow mb-10 bg-base-100">
        <div className="stat">
          <div className="stat-title">Pflicht-Keys</div>
          <div className="stat-value text-primary">
            {requiredSet}/{required.length}
          </div>
          <div className="stat-desc">
            {missingRequired.length === 0
              ? "Alles gesetzt"
              : `Fehlt: ${missingRequired.slice(0, 3).join(", ")}${missingRequired.length > 3 ? " ..." : ""}`}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Empfohlen</div>
          <div className="stat-value">
            {recommendedSet}/{recommended.length}
          </div>
          <div className="stat-desc">
            {missingRecommended.length === 0
              ? "OK"
              : `Offen: ${missingRecommended.slice(0, 3).join(", ")}${missingRecommended.length > 3 ? " ..." : ""}`}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Optionale Keys</div>
          <div className="stat-value">
            {optionalSet}/{optional.length}
          </div>
          <div className="stat-desc">Nur noetig fuer Extras / CLI.</div>
        </div>
        <div className="stat">
          <div className="stat-title">Dev-Flags aktiv?</div>
          <div className={`stat-value ${devSet.length ? "text-warning" : "text-success"}`}>
            {devSet.length ? "Ja" : "Nein"}
          </div>
          <div className="stat-desc">
            {devSet.length ? devSet.map((item) => item.key).join(", ") : "Prod sicher"}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <EnvWizard groups={ENV_GROUPS} />

        <section className="card bg-base-100 shadow">
          <div className="card-body space-y-5">
            <div>
              <h2 className="card-title text-2xl">Aktueller Status (read-only)</h2>
              <p className="text-base-content/70 text-sm">
                Werte werden hier nicht angezeigt, nur ob sie gesetzt sind. Quelle ist die laufende Runtime.
              </p>
            </div>

            <div className="space-y-4">
              {statusGroups.map((group) => {
                const setCount = group.items.filter((item) => item.isSet).length;
                const total = group.items.length;

                return (
                  <section key={group.id} className="border border-base-300 rounded-xl p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{group.title}</h3>
                        <p className="text-sm text-base-content/70">{group.description}</p>
                      </div>
                      <div className="badge badge-outline">
                        {setCount}/{total} gesetzt
                      </div>
                    </div>

                    <div className="space-y-3">
                      {group.items.map((item) => (
                        <div
                          key={item.key}
                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-base-300 pb-3 last:border-none"
                        >
                          <div className="space-y-1">
                            <div className="font-mono text-sm">{item.key}</div>
                            <div className="text-sm text-base-content/70">{item.label}</div>
                            <div className="text-xs text-base-content/60">{item.description}</div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              <span className={`${importanceBadgeClass(item.importance)} text-xs`}>
                                {importanceLabel(item.importance)}
                              </span>
                              <span className="badge badge-ghost text-xs">{scopeLabel(item.scope)}</span>
                              {item.example ? (
                                <span className="badge badge-ghost text-xs">
                                  Bsp: {item.example}
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={statusBadgeClass(item.isSet, item.importance)}>
                              {item.isSet ? "gesetzt" : "fehlt"}
                            </span>
                            {item.isSet ? (
                              <span className="text-xs text-base-content/60">
                                {item.valueLength} Zeichen
                              </span>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section className="card bg-base-100 shadow">
          <div className="card-body space-y-3">
            <h2 className="card-title text-2xl">So nutzt du die Keys</h2>
            <ul className="list-disc list-inside space-y-2 text-base-content/80 text-sm">
              <li>Fuelle oben die Pflichtfelder aus und kopiere die .env.local-Vorlage.</li>
              <li>Trage die Werte bei deinem Hoster ein (z. B. Vercel &gt; Settings &gt; Environment Variables) und starte einen neuen Deploy.</li>
              <li>Lokale Tests: Lege eine .env.local im Projekt an und fuege die kopierten Zeilen ein.</li>
              <li>Webhook: Stelle sicher, dass Stripe den Webhook auf https://deine-domain.de/api/webhook/stripe zeigt.</li>
              <li>Dev-Flag NEXT_PUBLIC_DEV_MODE bleibt in Produktion leer.</li>
            </ul>
            <p className="text-xs text-base-content/60">
              Hinweis: Dieses Dashboard speichert keine Secrets, es hilft nur beim Zusammenstellen.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
