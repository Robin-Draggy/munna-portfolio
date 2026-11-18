export function ProjectPreview() {
  return (
    <figure className="relative isolate overflow-hidden bg-canvas">
      <svg
        viewBox="0 0 640 360"
        role="img"
        aria-label="Illustration of a banking assistant with alternating chat messages"
        className="block aspect-video w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
      >
        <path d="M0 0h640v360H0z" fill="#142b31" />
        <path d="M0 72h640M0 144h640M0 216h640M0 288h640M128 0v360M256 0v360M384 0v360M512 0v360" stroke="#284950" opacity=".48" />
        <rect x="112" y="66" width="416" height="236" rx="16" fill="#10212b" stroke="#4e7881" />
        <path d="M112 111h416" stroke="#4e7881" />
        <circle cx="135" cy="89" r="4" fill="#45e3ec" />
        <text x="152" y="94" fill="#b8d6db" fontSize="15" fontWeight="600">BANKING ASSISTANT</text>
        <rect x="148" y="132" width="170" height="35" rx="8" fill="#274a53" />
        <rect x="270" y="179" width="220" height="35" rx="8" fill="#31646d" />
        <rect x="148" y="226" width="201" height="35" rx="8" fill="#274a53" />
        <path d="M161 150h119m4 47h176m-300 47h145" stroke="#bdd7d8" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <figcaption className="absolute top-3 left-3 rounded border border-line bg-canvas px-2 py-1 font-mono text-[10px] tracking-wide text-ink uppercase">
        Illustrative interface
      </figcaption>
    </figure>
  );
}
