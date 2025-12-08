import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SearchBox from "./SearchBox";
import { verifyAccess } from "@/libs/jwt";

async function requireAuth(): Promise<{ email: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (!token) {
    redirect("/");
  }

  try {
    const payload = await verifyAccess(token.value);
    return { email: payload.email };
  } catch {
    redirect("/");
  }
}

export default async function DashboardPage() {
  const { email } = await requireAuth();

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold">Dashboard</h1>
        <p className="text-base-content/70">
          Eingeloggt als {email}. Suche in Lektionen und Transkripten.
        </p>
      </div>

      <section className="card bg-base-100 shadow">
        <div className="card-body space-y-4">
          <div>
            <h2 className="card-title text-2xl">Suche im Kurs</h2>
            <p className="text-sm text-base-content/70">
              Nutzt /api/search und berücksichtigt nur freigeschaltete Module.
            </p>
          </div>
          <SearchBox />
        </div>
      </section>
    </main>
  );
}
