"use client";

import { Plus, Minus } from "lucide-react";
import { useId, useState } from "react";
import { Tag } from "@/components/ui/tag";
import { expertise } from "@/data/expertise";
import { ExpertiseVisual } from "./expertise-visual";

export function ExpertiseControls() {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <>
      <ExpertiseVisual active={active} />
      <div className="min-w-0 divide-y divide-line border-y border-line">
        {expertise.map(({ name, skills }, index) => {
          const open = active === index;
          const headingId = `${id}-category-${index}`;
          const panelId = `${id}-skills-${index}`;
          const Icon = open ? Minus : Plus;
          return (
            <div key={name}>
              <h3>
                <button
                  id={headingId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  aria-disabled={open || undefined}
                  onClick={() => setActive(index)}
                  className="flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left text-base/5 font-semibold text-ink hover:text-accent aria-expanded:text-accent"
                >
                  {name} <Icon size={16} className="shrink-0" aria-hidden="true" />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={headingId} hidden={!open}>
                <ul className="flex flex-wrap gap-2 pb-4">
                  {skills.map((skill) => <li key={skill} className="max-w-full"><Tag>{skill}</Tag></li>)}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
