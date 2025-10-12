import Image from "next/image";
import type { VideoMeta } from "@/types/video";
import { cdnUrl } from "@/libs/assets";
import RichText from "@/components/RichText";

type Props = {
  meta?: VideoMeta | null;
  className?: string;
};

export default function VideoDetails({ meta, className }: Props) {
  if (!meta) return null;
  const { description, images = [], alt = [], links = [] } = meta;
  return (
    <div className={className}>
      {description && (
        <div className="mb-3">
          <RichText content={description} className="text-sm" />
        </div>
      )}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((p, i) => {
            const src = cdnUrl(p);
            const a = alt[i] || "";
            return (
              <div
                key={src}
                className="relative w-full aspect-video overflow-hidden rounded"
              >
                <Image
                  src={src}
                  alt={a}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
      {links.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href.startsWith("http") ? l.href : cdnUrl(l.href)}
              className="btn btn-xs btn-outline"
              target="_blank"
              rel="noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
