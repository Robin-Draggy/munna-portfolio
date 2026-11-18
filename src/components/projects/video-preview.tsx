"use client";

import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { YouTubePlayer } from "./youtube-player";
import styles from "./video-preview.module.css";

interface VideoPreviewProps {
  videoId: string;
  title: string;
  poster: ProjectImage;
  sizes: string;
  className?: string;
}

const playEvent = "portfolio:play-project-demo";

export function VideoPreview({ videoId, title, poster, sizes, className }: VideoPreviewProps) {
  const [state, setState] = useState<"poster" | "playing" | "unavailable">("poster");
  const figure = useRef<HTMLElement>(null);
  const moveFocus = useRef(false);
  const showFallback = useCallback(() => {
    moveFocus.current = figure.current?.contains(document.activeElement) ?? false;
    setState("unavailable");
  }, []);
  const watchLink = useRef<HTMLAnchorElement>(null);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    if (state === "unavailable" && moveFocus.current) watchLink.current?.focus();
    if (state !== "playing") return;

    function restorePoster() {
      setState("poster");
    }

    window.addEventListener(playEvent, restorePoster);
    return () => window.removeEventListener(playEvent, restorePoster);
  }, [state]);

  return (
    <figure ref={figure} className={className}>
      <div className={`${styles.frame} group/video`}>
        {state === "playing" ? (
          <YouTubePlayer videoId={videoId} title={title} onUnavailable={showFallback} />
        ) : (
          <>
            <div className={styles.poster}>
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                sizes={sizes}
                className={`object-cover ${styles[poster.framing] ?? ""}`}
              />
            </div>
            <div className={styles.corners} aria-hidden="true" />
            {poster.framing === "voice" && (
              <svg className={styles.waveform} viewBox="0 0 40 26" aria-hidden="true">
                <path d="M2 11v4m6-8v12m6-17v22m6-16v10m6-14v18m6-15v12m6-8v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            {state === "poster" ? (
              <button
                type="button"
                aria-label={`Watch Project Demo: ${title}`}
                className={styles.play}
                onClick={() => {
                  window.dispatchEvent(new Event(playEvent));
                  setState("playing");
                }}
              >
                <Play size={17} fill="currentColor" aria-hidden="true" /> Watch Project Demo
              </button>
            ) : (
              <p className={styles.notice} role="status">Embedded playback is unavailable.</p>
            )}
          </>
        )}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line px-4 py-2 text-xs text-muted">
        <span>Project demonstration</span>
        <a
          ref={watchLink}
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch on YouTube: ${title} (opens in a new tab)`}
          className="inline-flex min-h-8 items-center gap-1.5 font-medium text-accent hover:underline"
        >
          Watch on YouTube <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
