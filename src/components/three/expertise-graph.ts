import { expertise } from "@/data/expertise";

type Position = [number, number, number];
const centers: Position[] = [
  [-1.22, 0.84, 0.55],
  [0.51, 1.19, -0.48],
  [1.35, 0.07, 0.51],
  [0.55, -1.11, -0.49],
  [-0.91, -0.84, 0.12],
];

export const nodes = expertise.flatMap(({ skills }, cluster) => {
  const [x, y, z] = centers[cluster];
  return [
    { cluster, position: centers[cluster], hub: true },
    ...skills.map((_, index) => {
      const angle = index * 2.4 + cluster;
      const radius = 0.34 + (index % 3) * 0.12;
      const position: Position = [
        x + Math.cos(angle) * radius,
        y + Math.sin(angle) * radius,
        z + (index % 2 === 0 ? 0.45 : -0.37),
      ];
      return { cluster, position, hub: false };
    }),
  ];
});

const hubs = nodes.flatMap((node, index) => node.hub ? [index] : []);
export const edges: [number, number][] = [
  ...nodes.flatMap<[number, number]>((node, index) => node.hub ? [] : [[hubs[node.cluster], index]]),
  ...hubs.map<[number, number]>((hub, index) => [hub, hubs[(index + 1) % hubs.length]]),
  [hubs[0], hubs[2]],
  [hubs[1], hubs[3]],
];

export function isActiveEdge([start, end]: [number, number], active: number) {
  return nodes[start].cluster === active && nodes[end].cluster === active;
}
