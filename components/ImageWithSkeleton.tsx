"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & {
  wrapperClassName?: string;
};

/**
 * Image component with elegant skeleton loading state
 */
export function ImageWithSkeleton({
  wrapperClassName = "",
  className = "",
  alt,
  ...props
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${wrapperClassName}`}>
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 skeleton bg-base-300 animate-pulse" />
      )}

      <Image
        {...props}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
