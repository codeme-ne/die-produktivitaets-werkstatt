import type { VideoInfo } from "@/types/course";
import VideoEmbed from "@/components/VideoEmbed";

interface Props {
  title: string;
  video?: VideoInfo;
}

export function VideoHero({ title, video }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 break-words whitespace-normal">
        {title}
      </h1>

      {video && (
        <div className="w-full aspect-video rounded-xl overflow-hidden border border-base-300 bg-base-100/60 shadow-xl">
          <VideoEmbed libraryId={video.libraryId} videoId={video.guid} />
        </div>
      )}
    </div>
  );
}
