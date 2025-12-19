"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect, useRef } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if image is already cached/loaded
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  // For fill images, wrapper needs to fill the parent container
  const isFillImage = props.fill === true;
  const wrapperClasses = isFillImage 
    ? `absolute inset-0 ${wrapperClassName}` 
    : `relative ${wrapperClassName}`;

  return (
    <div className={wrapperClasses}>
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 skeleton bg-base-300 animate-pulse" />
      )}

      <Image
        {...props}
        ref={imgRef}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (img.naturalWidth > 0) {
            setIsLoaded(true);
          }
        }}
      />
    </div>
  );
}
