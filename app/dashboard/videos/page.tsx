import VideoEmbed from "@/components/VideoEmbed";
import VideoDetails from "@/components/VideoDetails";
import { loadVideoMeta } from "@/libs/videoMeta";

export const runtime = "nodejs";

async function fetchVideos() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/bunny/videos`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function VideosPage() {
  const data = await fetchVideos();
  const items: Array<{ guid: string; title?: string }> = data?.items ?? [];
  const libraryId =
    process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID ||
    process.env.BUNNY_STREAM_LIBRARY_ID ||
    "";
  const metaMap = await loadVideoMeta();

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Videos</h1>
      {!libraryId && (
        <div className="alert alert-warning mb-6">
          Bitte setze NEXT_PUBLIC_BUNNY_LIBRARY_ID oder BUNNY_STREAM_LIBRARY_ID
          in .env.local
        </div>
      )}
      {items.length === 0 ? (
        <div className="alert">
          Noch keine Videos gefunden. Erstelle eins via API oder
          Bunny‑Dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.slice(0, 6).map((v) => (
            <div key={v.guid} className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title text-lg">{v.title || v.guid}</h2>
                {libraryId ? (
                  <VideoEmbed
                    libraryId={libraryId}
                    videoId={v.guid}
                    className="mt-2"
                  />
                ) : (
                  <div className="text-sm opacity-70">Library ID fehlt.</div>
                )}
                <VideoDetails meta={metaMap[v.guid]} className="mt-3" />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
