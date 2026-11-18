"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { Color, MathUtils, Matrix4, type Group, type InstancedMesh, type Material } from "three";
import { expertise } from "@/data/expertise";
import { edges, isActiveEdge, nodes } from "./expertise-graph";

const clusterPoints = expertise.map((_, cluster) =>
  edges.filter((edge) => isActiveEdge(edge, cluster)).flatMap(([start, end]) => [nodes[start].position, nodes[end].position]),
);
const connections = edges
  .filter(([start, end]) => nodes[start].cluster !== nodes[end].cluster)
  .flatMap(([start, end]) => [nodes[start].position, nodes[end].position]);

const cyan = new Color("#72f5fb");
const teal = new Color("#3e8d99");
const matrix = new Matrix4();
const color = new Color();

function updateNodes(mesh: InstancedMesh, weights: number[]) {
  nodes.forEach(({ position, cluster, hub }, index) => {
    const weight = weights[cluster];
    const scale = (hub ? 0.092 : 0.051) * (1 + 0.25 * weight);
    matrix.makeScale(scale, scale, scale).setPosition(...position);
    mesh.setMatrixAt(index, matrix);
    mesh.setColorAt(index, color.copy(teal).lerp(cyan, weight));
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
}

function Network({ active }: { active: number }) {
  const group = useRef<Group>(null);
  const instances = useRef<InstancedMesh>(null);
  const lines = useRef<(Material | null)[]>([]);
  const weights = useRef<number[]>([]);
  const initialActive = useRef(active);

  useLayoutEffect(() => {
    weights.current = expertise.map((_, index) => Number(index === initialActive.current));
    if (instances.current) updateNodes(instances.current, weights.current);
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    group.current.rotation.y += dt * (0.15 + pointer.x * 0.09);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -pointer.y * 0.19, 4, dt);

    let changed = false;
    weights.current.forEach((weight, index) => {
      const target = Number(index === active);
      if (weight === target) return;
      const next = Math.abs(target - weight) < 0.004 ? target : MathUtils.damp(weight, target, 8, dt);
      weights.current[index] = next;
      const line = lines.current[index];
      if (line) line.opacity = 0.28 + next * 0.57;
      changed = true;
    });
    if (changed && instances.current) updateNodes(instances.current, weights.current);
  });

  return (
    <group ref={group} rotation={[0.12, -0.18, -0.1]}>
      <Line points={connections} segments color="#36717d" transparent opacity={0.5} lineWidth={0.75} />
      {clusterPoints.map((points, index) => (
        <Line
          key={index}
          ref={(line) => {
            lines.current[index] = line?.material ?? null;
            if (line) line.material.opacity = 0.28 + (weights.current[index] ?? Number(index === active)) * 0.57;
          }}
          points={points}
          segments
          color="#45e3ec"
          transparent
          opacity={0.28}
          lineWidth={1}
        />
      ))}
      <instancedMesh ref={instances} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial />
      </instancedMesh>
    </group>
  );
}

export default function ExpertiseNetwork({ active, visible }: { active: number; visible: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      dpr={[1, 1.45]}
      frameloop={visible ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
      fallback={null}
    >
      <Network active={active} />
    </Canvas>
  );
}
