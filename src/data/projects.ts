export type ProjectPreview = "recognition" | "voice" | "ocr" | "chat" | "counting" | "agents";

export interface Project {
  slug: string;
  name: string;
  description: string;
  technologies: readonly string[];
  preview: ProjectPreview;
  category: string;
  problem: string;
  previewAlt: string;
  process: readonly string[];
  contribution: string;
  result?: { from: string; to: string; label: string };
}

export const featuredProject: Project = {
  slug: "vehicle-recognition-system",
  name: "Vehicle Recognition System",
  description: "Developed real-time vehicle detection and classification for work with Bangladesh’s Roads and Highways Department.",
  technologies: ["YOLOv8", "EfficientNet"],
  preview: "recognition",
  category: "Computer Vision",
  problem: "Roads and Highways Department work needed a way to identify vehicles and classify them in real time.",
  previewAlt: "Illustrated aerial roadway with cyan car and truck detection boxes.",
  process: ["Road video frames", "Vehicle detection with YOLOv8", "Vehicle classification with EfficientNet"],
  contribution: "Developed and deployed the real-time pipeline, using YOLOv8 to locate vehicles in video frames and EfficientNet to classify the detections.",
  result: { from: "50%", to: "90.1%", label: "Accuracy improvement reported in the résumé" },
};

export const secondaryProjects: readonly Project[] = [
  {
    slug: "callswainai",
    name: "CallswainAI",
    description: "Contributed to a Bangla–English voice-agent platform for telephone conversations.",
    technologies: ["IVR", "STT", "TTS", "SIP"],
    preview: "voice",
    category: "Voice AI",
    problem: "Telephone interactions needed voice support in both Bangla and English.",
    previewAlt: "Illustrated audio waveform representing a bilingual telephone conversation.",
    process: ["Telephone call via SIP and IVR", "Speech recognition and synthesis", "Post-call transcript and topic summary"],
    contribution: "Contributed to the bilingual voice-agent platform, which combined interactive voice response, speech recognition, speech synthesis, and SIP calling and provided post-call transcripts and topic summaries.",
  },
  {
    slug: "handwritten-cash-memo-ocr",
    name: "Handwritten Cash Memo OCR",
    description: "Built a pipeline to detect and recognize handwritten Bangla and English in cash memos.",
    technologies: ["OCR", "Text region detection"],
    preview: "ocr",
    category: "Document AI",
    problem: "Handwritten Bangla and English cash memo entries needed to be converted into digital records for review.",
    previewAlt: "Illustrated cash memo with boxes marking handwritten text regions.",
    process: ["Cash memo image", "Text region detection", "Bangla–English text recognition", "Digital record for review"],
    contribution: "Built the pipeline to locate handwritten text regions in memo images, recognize their contents, and convert entries into digital records for review.",
  },
  {
    slug: "premier-bank-chatbot",
    name: "Premier Bank Chatbot",
    description: "Developed a customer service chatbot and API-integrated interface for banking inquiries.",
    technologies: ["Conversational AI", "API integration"],
    preview: "chat",
    category: "Conversational AI",
    problem: "Bank customers needed a way to ask common banking questions and find account FAQ answers.",
    previewAlt: "Illustrated chat interface with alternating customer and chatbot messages.",
    process: ["Customer question in the web interface", "API connection to backend services", "Banking or account FAQ response"],
    contribution: "Developed the chatbot, built its homepage frontend, and integrated interface features with backend services through APIs.",
  },
  {
    slug: "vehicle-counting-survey",
    name: "Vehicle Counting Survey",
    description: "Used vehicle detection and DeepSORT tracking to count traffic from road survey footage.",
    technologies: ["YOLO", "DeepSORT"],
    preview: "counting",
    category: "Computer Vision",
    problem: "Road surveys needed structured vehicle counts from video without counting the same vehicle in multiple frames.",
    previewAlt: "Illustrated road survey with tracked vehicles and a dashed counting line.",
    process: ["Road survey footage", "Vehicle detection with YOLO", "Persistent tracks with DeepSORT", "Structured vehicle counts"],
    contribution: "Developed the real-time counting pipeline and used track identities across consecutive video frames to count each passing vehicle once.",
  },
  {
    slug: "ai-agent-systems",
    name: "AI Agent Systems",
    description: "Implemented task-focused agents for hotel booking, customer support, lead generation, and appointment scheduling.",
    technologies: ["AI agents", "Google Calendar"],
    preview: "agents",
    category: "AI Automation",
    problem: "Hotel bookings, customer support, lead generation, and appointment scheduling needed task-specific workflows.",
    previewAlt: "Illustrated agent workflow connected to four task nodes.",
    process: ["Task request", "Task-focused agent", "Booking, support, lead generation, or scheduling"],
    contribution: "Implemented four task-focused agents. The hotel booking agent integrated with Google Calendar.",
  },
];

export const projects: readonly Project[] = [featuredProject, ...secondaryProjects];
