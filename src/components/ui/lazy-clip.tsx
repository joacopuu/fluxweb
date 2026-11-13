"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * Clip corto de un sitio en movimiento. No descarga nada hasta que está cerca
 * de la pantalla, se pausa cuando sale, y con movimiento reducido queda en el
 * póster.
 */
export function LazyClip({ src, poster, alt, width, height, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      className={className}
    />
  );
}
