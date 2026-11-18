type TimelineDate = { label: string; dateTime: string };

interface JourneyEntry {
  kind: "Employment" | "Education";
  institution: string;
  role: string;
  start: TimelineDate;
  end: TimelineDate | "Present";
  description?: string;
}

export const journey: readonly JourneyEntry[] = [
  {
    kind: "Employment",
    institution: "Betopia Limited",
    role: "AI Engineer",
    start: { label: "Jun 2026", dateTime: "2026-06" },
    end: "Present",
    description: "Worked on handwritten cash memo OCR, CallswainAI, task-focused AI agents, the Premier Bank Chatbot, and a computer vision system for employee presence monitoring.",
  },
  {
    kind: "Employment",
    institution: "Regnum Resource Limited",
    role: "AI Engineer",
    start: { label: "Jan 2024", dateTime: "2024-01" },
    end: { label: "Dec 2025", dateTime: "2025-12" },
    description: "Developed real-time vehicle recognition and vehicle counting systems for road surveys.",
  },
  {
    kind: "Education",
    institution: "Uttara University",
    role: "BSc in Computer Science and Technology",
    start: { label: "2019", dateTime: "2019" },
    end: { label: "2023", dateTime: "2023" },
  },
];
