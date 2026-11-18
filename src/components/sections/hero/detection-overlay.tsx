interface DetectionOverlayProps {
  width: number;
  height: number;
  label: string;
}

export function DetectionOverlay({ width, height, label }: DetectionOverlayProps) {
  const corner = 9;
  const labelWidth = label.length * 11 + 14;

  return (
    <g>
      <rect width={width} height={height} className="fill-accent/5 stroke-accent/60" />
      <path
        d={`M0 ${corner}V0H${corner} M${width - corner} 0H${width}V${corner}
          M${width} ${height - corner}V${height}H${width - corner}
          M${corner} ${height}H0V${height - corner}`}
        className="fill-none stroke-accent"
        strokeWidth={2}
      />
      <rect width={labelWidth} height={25} y={-25} rx={2} className="fill-accent" />
      <text x={7} y={-7} className="fill-canvas font-mono text-[17px] font-semibold">{label}</text>
    </g>
  );
}
