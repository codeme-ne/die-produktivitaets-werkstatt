"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  quote: string;
  title?: string;
  image?: string;
  short?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  speed?: number; // pixels per second (default: 50)
}

export default function TestimonialsCarousel({
  testimonials,
  speed = 50,
}: TestimonialsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(30);

  // Calculate animation duration based on content width and speed
  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth / 2; // divided by 2 because we duplicate content
      const duration = scrollWidth / speed;
      setAnimationDuration(duration);
    }
  }, [testimonials, speed]);

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Gradient overlays for smooth fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-base-200 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-base-200 to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div
        ref={containerRef}
        className="flex gap-6 w-max"
        style={{
          animationName: "marquee-scroll",
          animationDuration: `${animationDuration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: "running",
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`testimonial-${index}`}
            className="w-80 md:w-96 shrink-0"
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-base-content/5">
      <div className="card-body p-5">
        {/* Quote */}
        <p className="text-base-content/80 text-sm md:text-base leading-relaxed line-clamp-4 mb-4">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="h-px bg-base-content/10 my-2" />

        {/* Avatar + Info */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring-2 ring-accent/20">
              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              ) : (
                <div className="bg-accent/10 flex items-center justify-center h-full">
                  <span className="text-lg font-semibold text-accent">{testimonial.name[0]}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{testimonial.name}</h3>
            {testimonial.title && (
              <p className="text-xs text-base-content/50 truncate">{testimonial.title}</p>
            )}
          </div>
          {/* Rating Stars */}
          <div className="flex gap-0.5 shrink-0">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-warning"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
