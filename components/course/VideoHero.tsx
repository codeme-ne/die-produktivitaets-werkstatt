import type { VideoInfo } from "@/types/course";
import VideoEmbed from "@/components/VideoEmbed";

interface Props {
  title: string;
  video?: VideoInfo;
}

export function VideoHero({ title, video }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>

      {video ? (
        <div className="w-full aspect-video bg-base-300 rounded-lg overflow-hidden shadow-xl">
          <VideoEmbed libraryId={video.libraryId} videoId={video.guid} />
        </div>
      ) : (
        <div className="w-full aspect-video bg-base-300 rounded-lg flex items-center justify-center text-base-content/50">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg">Nur Text-Lektion</p>
          </div>
        </div>
      )}
    </div>
  );
}
