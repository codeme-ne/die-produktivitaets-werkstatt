"use client";

import React from "react";

type Props = {
  libraryId: string;
  videoId: string;
  title?: string;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
  aspect?: "16:9" | "4:3" | "1:1";
};

export default function VideoEmbed({
  libraryId,
  videoId,
  title,
  autoplay = false,
  muted = false,
  className,
  aspect = "16:9",
}: Props) {
  const ratio = aspect === "4:3" ? 3 / 4 : aspect === "1:1" ? 1 : 9 / 16;
  const paddingTop = `${ratio * 100}%`;
  const src = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=${autoplay}&muted=${muted}`;
  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", paddingTop }}
    >
      <iframe
        src={src}
        title={title || "Video"}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          borderRadius: 8,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
