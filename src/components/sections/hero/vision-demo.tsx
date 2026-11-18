"use client";

import { useId, type PointerEvent } from "react";
import { DetectionOverlay } from "./detection-overlay";
import styles from "./hero.module.css";

function Car({ color }: { color: string }) {
  return (
    <g>
      <ellipse cx="48" cy="66" rx="40" ry="7" fill="#090E11" opacity=".75" />
      <path d="M15 49h11v17H15zM70 49h11v17H70z" fill="#101418" />
      <path d="m13 42 9-11 9-15q2-4 8-4h19q6 0 9 5l8 15 8 10v15q0 4-5 4H18q-5 0-5-4z" fill={color} />
      <path d="m26 34 9-16h26l9 16z" fill="#1D3039" />
      <path d="m33 21-5 11h10l15-11z" fill="#A2BBC2" opacity=".24" />
      <path d="M14 42h69v9H14z" fill="#111C21" opacity=".45" />
      <path d="M17 43h14v5H17zM65 43h14v5H65z" fill="#F18478" />
      <path d="M40 50h16v5H40z" fill="#CED5D4" />
      <path d="M22 59h52" stroke="#0E1519" strokeWidth="2" opacity=".75" />
    </g>
  );
}

function Truck() {
  return (
    <g>
      <ellipse cx="50" cy="95" rx="47" ry="8" fill="#090E11" opacity=".75" />
      <path d="M12 74h13v20H12zM75 74h13v20H75z" fill="#101418" />
      <path d="m13 15 8-6h68l-3 7z" fill="#A3AEAA" />
      <path d="M13 15h74v64H13z" fill="#7D8C8A" stroke="#B6BFBA" strokeWidth="2" />
      <path d="M20 23h60v49H20z" fill="#596B6C" stroke="#A1AFA9" />
      <path d="M50 23v49m-16-9h7m18 0h7" fill="none" stroke="#A1AFA9" strokeWidth="2" />
      <path d="M13 78h74v10H13z" fill="#29363C" />
      <path d="M17 80h11v4H17zM72 80h11v4H72z" fill="#EC8572" />
      <path d="M43 82h14v4H43z" fill="#CFD8D2" />
    </g>
  );
}

function moveScene(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || !window.matchMedia(
    "(min-width: 64rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  ).matches) return;

  const frame = event.currentTarget;
  const bounds = frame.getBoundingClientRect();
  const limit = 7; // At most 10px of combined movement.
  const x = (2 * (event.clientX - bounds.left) / bounds.width - 1) * limit;
  const y = (2 * (event.clientY - bounds.top) / bounds.height - 1) * limit;
  frame.style.setProperty("--scene-x", `${x}px`);
  frame.style.setProperty("--scene-y", `${y}px`);
}

export function VisionDemo() {
  const id = useId();

  return (
    <figure
      data-motion-hero-scene
      className={styles.demo}
      onPointerMove={moveScene}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty("--scene-x");
        event.currentTarget.style.removeProperty("--scene-y");
      }}
    >
      <figcaption className={styles.demoCaption}>
        <span className={styles.demoDot} aria-hidden="true" />
        VISION ENGINE <span className="text-muted">/</span> DEMO MODE
      </figcaption>
      <svg
        className={styles.scene}
        viewBox="0 0 720 540"
        role="img"
        aria-label="Simulated roadway detection scene with cyan boxes marking two cars and a truck."
      >
        <defs>
          <linearGradient id={`${id}-sky`} x2="0" y2="1">
            <stop stopColor="#101E29" />
            <stop offset="1" stopColor="#6A7D7C" />
          </linearGradient>
          <linearGradient id={`${id}-road`} x2="0" y2="1">
            <stop stopColor="#526166" />
            <stop offset="1" stopColor="#222C32" />
          </linearGradient>
          <pattern id={`${id}-grid`} width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M36 0H0V36" fill="none" stroke="#B0D3D7" strokeOpacity=".12" />
          </pattern>
        </defs>
        <path d="M0 0h720v540H0z" fill={`url(#${id}-sky)`} />
        <path d="M0 126 70 92l49 11 50-29 72 39 54-12 55 37 45-17 70 20 97-47 48 26 58-30 52 27v95H0z" fill="#344951" />
        <path d="m0 145 64-20 57 16 71-15 96 32 59-13 89 14 62-18 80 15 66-19 76 20v92H0z" fill="#263B42" />
        <path d="M0 179 118 155l79 15 92-10 74 19 79-11 98 6 89-22 91 13v375H0z" fill="#1C2E32" />
        <path d="M0 249 91 210l106-11 73-15 47-3-71 71L69 411 0 430zM720 243l-85-28-114-13-51-17-41-3 64 70 150 132 77 31z" fill="#293E40" />
        <path d="M0 320 145 251l116-39M0 383l118-76m602 12-137-69-105-37m242 167-106-75" fill="none" stroke="#405455" strokeWidth="2" opacity=".65" />
        <path d="M0 514 327 179h69l324 331v30H0z" fill="#111C20" />
        <path d="m15 540 316-361h62l312 361z" fill={`url(#${id}-road)`} />
        <path d="m37 540 296-361m60 0 290 361" fill="none" stroke="#9EA89D" strokeWidth="2" opacity=".8" />
        <path d="M227 540 347 179m25 0 110 361" fill="none" stroke="#C3C9BA" strokeWidth="2.5" strokeDasharray="26 19" opacity=".73" />
        <path d="M0 0h720v540H0z" fill={`url(#${id}-grid)`} />
        <g transform="translate(308 207) scale(.67)">
          <g className={styles.farVehicle}>
            <Car color="#A4ACAA" />
            <DetectionOverlay width={96} height={70} label="CAR" />
          </g>
        </g>
        <g transform="translate(408 262)">
          <g className={styles.truck}>
            <Truck />
            <DetectionOverlay width={100} height={101} label="TRUCK" />
          </g>
        </g>
        <g transform="translate(172 365) scale(1.3)">
          <g className={styles.nearVehicle}>
            <Car color="#637E8A" />
            <DetectionOverlay width={96} height={70} label="CAR" />
          </g>
        </g>
      </svg>
    </figure>
  );
}
