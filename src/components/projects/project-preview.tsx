import type { ProjectPreview as Preview } from "@/data/projects";

function Traffic({ counting }: { counting: boolean }) {
  return (
    <>
      <path d="M0 0h640v320H0z" fill="#182f31" />
      <path d="M0 248 322 0h280L317 320H0z" fill="#34444a" />
      <path d="M0 254 329 0m242 0L289 320" stroke="#9caaa6" strokeWidth="2" />
      <path d="M98 320 444 0" stroke="#95a3a0" strokeWidth="2" strokeDasharray="18 16" />
      <path d="M0 178 229 0m187 320L640 75M25 142l96-76m351 247 168-177" stroke="#44605d" opacity=".5" />
      {counting && <path d="m140 146 337 4" stroke="#ffc387" strokeWidth="2" strokeDasharray="8 5" />}
      {[
        { x: 305, y: 77, body: "#80999d", name: counting ? "TRACK A" : "CAR" },
        { x: 395, y: 123, body: "#b1a48e", truck: true, name: counting ? "TRACK B" : "TRUCK" },
        { x: 170, y: 211, body: "#748b98", name: counting ? "TRACK C" : "CAR" },
      ].map(({ x, y, body, name, truck }) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <g transform="translate(43 26) rotate(47)">
            <rect x="-12" y="-23" width="24" height="46" rx="5" fill="#172125" />
            <rect x="-10" y="-21" width="20" height="42" rx="4" fill={body} />
            {truck ? (
              <>
                <rect x="-10" y="-9" width="20" height="29" rx="2" fill="#8c836f" stroke="#d1c7b8" />
                <path d="M-7-17H7v5H-7z" fill="#263940" />
              </>
            ) : <path d="M-8-11H8v6H-8zm0 17H8v6H-8z" fill="#263940" />}
            <path d="M-8 17h4m8 0h4" stroke="#e89075" strokeWidth="2" />
          </g>
          <rect width="86" height="54" fill="#45e3ec" fillOpacity=".06" stroke="#45e3ec" />
          <rect y="-21" width={name.length * 9 + 12} height="21" rx="2" fill="#45e3ec" />
          <text x="6" y="-6" fill="#071017" fontSize="14" fontWeight="700">{name}</text>
        </g>
      ))}
    </>
  );
}

export function ProjectPreview({ preview, alt }: { preview: Preview; alt?: string }) {
  const isTraffic = preview === "recognition" || preview === "counting";
  return (
    <div className="relative isolate overflow-hidden bg-canvas">
      <svg
        viewBox="0 0 640 320"
        role={alt ? "img" : undefined}
        aria-label={alt}
        aria-hidden={!alt}
        className="block aspect-[2/1] w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
      >
        <path d="M0 0h640v320H0z" fill={preview === "ocr" ? "#302d26" : preview === "chat" ? "#142b31" : "#121f31"} />
        {isTraffic && <Traffic counting={preview === "counting"} />}
        {preview === "voice" && (
          <g stroke="#72dbe5">
            <path d="M90 159h460M320 78v164" opacity=".22" />
            {[14, 28, 16, 54, 96, 66, 37, 82, 124, 76, 46, 81, 37, 60, 25, 14].map((height, index) => (
              <path key={index} d={`M${140 + index * 24} ${160 - height / 2}v${height}`} strokeWidth="5" strokeLinecap="round" opacity={index % 3 === 0 ? ".5" : "1"} />
            ))}
          </g>
        )}
        {preview === "ocr" && (
          <g transform="translate(190 48) rotate(-5 130 110)">
            <rect width="260" height="224" rx="8" fill="#d2c6aa" />
            <path d="M29 45h90m25 0h70M29 86h185m-185 32h185m-185 32h185m-185 32h185" stroke="#887f69" strokeWidth="3" />
            <path d="M34 79q10-14 18-2t20-4m11 3 18-8 18 8m-85 36 24-7 12 8 26-11m44 42 15-9 13 12 26-10" fill="none" stroke="#373b36" strokeWidth="3" />
            <path d="M22 62h112v25H22zM22 96h95v24H22zM131 129h79v26h-79z" fill="none" stroke="#147382" strokeWidth="2" />
          </g>
        )}
        {preview === "chat" && (
          <g>
            <rect x="139" y="55" width="362" height="211" rx="15" fill="#10212b" stroke="#4e7881" />
            <path d="M139 90h362" stroke="#4e7881" />
            <circle cx="158" cy="72" r="4" fill="#45e3ec" />
            <rect x="180" y="110" width="153" height="33" rx="8" fill="#274a53" />
            <rect x="303" y="155" width="160" height="33" rx="8" fill="#387580" />
            <rect x="180" y="200" width="190" height="33" rx="8" fill="#274a53" />
            <path d="M192 126h89m34 46h105m-228 44h125" stroke="#bdd7d8" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}
        {preview === "agents" && (
          <g>
            <path d="M320 160 176 96m144 64 144-64M320 160l-144 64m144-64 144 64" stroke="#879ec9" strokeWidth="2" strokeDasharray="6 5" />
            {[[176, 96], [464, 96], [176, 224], [464, 224]].map(([x, y]) => (
              <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
                <rect x="-42" y="-26" width="84" height="52" rx="8" fill="#22324b" stroke="#879ec9" />
                <path d="M-21-6h42m-42 12h30" stroke="#afc1e5" strokeWidth="3" />
              </g>
            ))}
            <circle cx="320" cy="160" r="35" fill="#203d4b" stroke="#45e3ec" strokeWidth="2" />
            <path d="m320 144 13 16-13 16-13-16z" fill="#45e3ec" />
          </g>
        )}
      </svg>
      <span className="absolute top-3 left-3 rounded border border-line bg-canvas px-2 py-1 font-mono text-[10px] tracking-wide text-ink uppercase">
        Conceptual preview
      </span>
    </div>
  );
}
