"use client";

import { useEffect, useRef } from "react";

interface Player {
  destroy(): void;
}

interface PlayerAPI {
  Player: new (
    frame: HTMLIFrameElement,
    options: { events: { onReady: () => void; onError: () => void } },
  ) => Player;
}

type YouTubeWindow = Window & {
  YT?: PlayerAPI;
  onYouTubeIframeAPIReady?: () => void;
};

let apiRequest: Promise<PlayerAPI> | undefined;

function loadPlayerAPI() {
  const browser = window as YouTubeWindow;
  if (browser.YT?.Player) return Promise.resolve(browser.YT);

  apiRequest ??= new Promise<PlayerAPI>((resolve, reject) => {
    const script = document.createElement("script");
    const previous = browser.onYouTubeIframeAPIReady;

    browser.onYouTubeIframeAPIReady = () => {
      browser.onYouTubeIframeAPIReady = previous;
      if (browser.YT?.Player) resolve(browser.YT);
      else reject(new Error("YouTube player API unavailable"));
      previous?.();
    };

    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      browser.onYouTubeIframeAPIReady = previous;
      script.remove();
      reject(new Error("YouTube player API failed to load"));
    };
    document.head.append(script);
  }).catch((error: unknown) => {
    apiRequest = undefined;
    throw error;
  });

  return apiRequest;
}

export function YouTubePlayer({ videoId, title, onUnavailable }: {
  videoId: string;
  title: string;
  onUnavailable: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = host.current;
    if (!wrapper) return;

    let disposed = false;
    let player: Player | undefined;
    let timeout: number | undefined;
    const frame = document.createElement("iframe");
    const url = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
    url.search = new URLSearchParams({
      autoplay: "1",
      playsinline: "1",
      rel: "0",
      enablejsapi: "1",
      origin: window.location.origin,
    }).toString();

    frame.src = url.toString();
    frame.title = title;
    frame.className = "absolute inset-0 size-full border-0";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    frame.allowFullscreen = true;
    frame.addEventListener("error", onUnavailable);
    wrapper.append(frame);
    frame.focus();

    void loadPlayerAPI().then(({ Player }) => {
      if (disposed) return;
      timeout = window.setTimeout(onUnavailable, 15000);
      player = new Player(frame, {
        events: {
          onReady: () => window.clearTimeout(timeout),
          onError: onUnavailable,
        },
      });
    }).catch(() => {
      // Native playback and the external link are available without the API.
      window.clearTimeout(timeout);
    });

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      frame.removeEventListener("error", onUnavailable);
      player?.destroy();
      frame.remove();
    };
  }, [videoId, title, onUnavailable]);

  return <div ref={host} className="absolute inset-0" />;
}
