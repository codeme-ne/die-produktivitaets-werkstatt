import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import { listVideos } from "@/libs/bunnyStream";
import VideoCreateForm from "./VideoCreateForm";
import VideosList from "./VideosList";

export default async function AdminVideosPage() {
  // Verify JWT and check admin status
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/");
  }

  let email: string;
  try {
    const payload = await verifyAccess(token.value);
    email = payload.email;
  } catch {
    redirect("/");
  }

  if (!isAdmin(email)) {
    redirect("/");
  }

  // Load initial videos
  const initialData = await listVideos({ page: 1, perPage: 25 });

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Video-Verwaltung
        </h1>
        <p className="text-lg text-base-content/70">Admin: {email}</p>
      </div>

      {/* Create Video Section */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Neues Video</h2>
          <VideoCreateForm />
        </div>
      </div>

      {/* Videos List Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">
            Deine Videos ({initialData.totalItems})
          </h2>
          <VideosList initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
