import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import { listVideos, type BunnyListResponse } from "@/libs/bunnyStream";
import VideoCreateForm from "./VideoCreateForm";
import VideosList from "./VideosList";
import AdminNav from "@/components/admin/AdminNav";
import { getTranscriptStatuses } from "@/libs/transcripts";

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
  const apiData = await listVideos({ page: 1, perPage: 25 });
  const initialData: BunnyListResponse = apiData ?? {
    items: [],
    itemsPerPage: 25,
    currentPage: 1,
    totalItems: 0,
  };

  const initialTranscripts = initialData.items.length
    ? getTranscriptStatuses(initialData.items.map((video) => video.guid))
    : [];

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Video-Verwaltung
        </h1>
        <p className="text-lg text-base-content/70">Admin: {email}</p>
      </div>

      <AdminNav active="videos" />

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
          <VideosList
            initialData={initialData}
            initialTranscripts={initialTranscripts}
          />
        </div>
      </div>
    </main>
  );
}
