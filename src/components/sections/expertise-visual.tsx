"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { edges, isActiveEdge, nodes } from "@/components/three/expertise-graph";

const ExpertiseNetwork = dynamic(() => import("@/components/three/expertise-network"), { ssr: false });

class NetworkBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const projected = nodes.map(({ position: [x, y, z] }) => [
  160 + x * 67 + z * 17,
  128 - y * 64 + z * 10,
]);

function NetworkPoster({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 320 256" className="block h-full w-full">
      {edges.map(([start, end]) => {
        const [x1, y1] = projected[start];
        const [x2, y2] = projected[end];
        const highlighted = isActiveEdge([start, end], active);
        return <line className="motion-safe:transition-[stroke,opacity] motion-safe:duration-300" key={`${start}-${end}`} {...{ x1, y1, x2, y2 }} stroke={highlighted ? "#45e3ec" : "#36717d"} opacity={highlighted ? 0.85 : 0.55} />;
      })}
      {nodes.map(({ cluster, hub }, index) => (
        <circle className="motion-safe:transition-[fill] motion-safe:duration-300" key={index} cx={projected[index][0]} cy={projected[index][1]} r={hub ? 4.5 : 2.5} fill={cluster === active ? "#72f5fb" : "#4a929c"} />
      ))}
    </svg>
  );
}

export function ExpertiseVisual({ active }: { active: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const [{ enabled, visible }, setView] = useState({ enabled: false, visible: false });

  useEffect(() => {
    const element = frame.current;
    if (!element || !window.IntersectionObserver) return;

    const media = window.matchMedia("(min-width: 64rem) and (prefers-reduced-motion: no-preference)");
    let inView = false;
    let supportsWebGL: boolean | undefined;

    function update() {
      if (media.matches && inView && supportsWebGL === undefined) {
        const gl = document.createElement("canvas").getContext("webgl2", { powerPreference: "low-power" });
        supportsWebGL = Boolean(gl);
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      }
      setView({ enabled: media.matches && supportsWebGL === true, visible: inView });
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    media.addEventListener("change", update);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      ref={frame}
      aria-hidden="true"
      className="relative isolate aspect-[5/4] overflow-hidden rounded-[18px] border border-accent/25 bg-elevated"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a3e48_0%,#0b1922_72%)]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#36717d_1px,transparent_1px),linear-gradient(90deg,#36717d_1px,transparent_1px)] [background-size:24px_24px]" />
        <NetworkPoster active={active} />
      </div>
      {enabled && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a3e48_0%,#0b1922_72%)] has-[canvas]:visible invisible">
          <NetworkBoundary><ExpertiseNetwork active={active} visible={visible} /></NetworkBoundary>
        </div>
      )}
    </div>
  );
}
