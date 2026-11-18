export type ProjectImage = {
  src: string;
  alt: string;
  framing: "traffic" | "office" | "voice";
};

interface ProjectDetails {
  id: string;
  slug: string;
  title: string;
  description: readonly string[];
  technologies: readonly string[];
  category: string;
  problem: string;
  process: readonly string[];
  featured: boolean;
}

export type Project = ProjectDetails & (
  | { videoId: string; videoTitle: string; image: ProjectImage }
  | { videoId: null; videoTitle: null; image: null }
) & (
  | { externalLink: string; externalLabel: string }
  | { externalLink: null; externalLabel: null }
);

export const featuredProject = {
  id: "01",
  slug: "vehicle-counting-survey",
  title: "Vehicle Detections and Counting by PTZ Camera",
  description: [
    "Built a real-time vehicle counting system for road survey projects with Bangladesh's Roads and Highways Department (RHD).",
    "From 2024 to 2025, I worked across the full computer vision workflow—from data annotation and model training to evaluation and deployment. The system combines YOLO for vehicle detection with DeepSORT to track vehicles across video frames and support reliable traffic counting.",
    "Sharing a short project walkthrough. I'm keen to connect with others working in computer vision, object detection, and intelligent transportation systems.",
  ],
  technologies: ["YOLO", "DeepSORT", "Computer Vision", "Object Tracking"],
  videoId: "GXobCTRM6cY",
  videoTitle: "Vehicle Detection and Counting Project Using Computer Vision",
  image: {
    src: "/images/projects/vehicle-counting-poster.jpg",
    alt: "Road-survey demo thumbnail showing trucks marked with detection boxes.",
    framing: "traffic",
  },
  externalLink: "https://regnum.com.bd/",
  externalLabel: "Explore Regnum Resources Limited",
  category: "Computer Vision",
  problem: "Road surveys needed structured vehicle counts from video without counting the same vehicle in multiple frames.",
  process: ["Road survey footage", "Vehicle detection with YOLO", "Persistent tracks with DeepSORT", "Structured vehicle counts"],
  featured: true,
} satisfies Project;

export const secondaryProjects: readonly Project[] = [
  {
    id: "02",
    slug: "callswainai",
    title: "Callswain AI — An Agentic AI Platform",
    description: [
      "Developed core modules and optimized conversational logic and dialogue management to handle complex business queries with contextual accuracy.",
      "Enabled bilingual Bangla-English voice interactions through IVR, STT, TTS, and SIP calling, with post-call transcriptions and topic summaries for conversation review.",
      "Supported four CallswainAI agents: hotel booking with Google Calendar integration, customer support, lead generation, and appointment scheduling.",
      "Organized service-specific conversation flows so each agent could guide callers through its intended task.",
    ],
    technologies: ["Agentic AI", "Conversational AI", "IVR", "STT", "TTS", "SIP"],
    videoId: "fGEvekSaCQA",
    videoTitle: "Callswain AI – Google Calendar OAuth Integration Demo",
    image: {
      src: "/images/projects/callswain-calendar-poster.webp",
      alt: "Calendar schedule overview from the official Callswain AI integration demo thumbnail.",
      framing: "voice",
    },
    externalLink: "https://callswainai.com/",
    externalLabel: "Explore Callswain AI",
    category: "Voice AI",
    problem: "Telephone interactions needed voice support in both Bangla and English.",
    process: ["Telephone call via SIP and IVR", "Speech recognition and synthesis", "Post-call transcript and topic summary"],
    featured: false,
  },
  {
    id: "03",
    slug: "employee-management-system",
    title: "Employee Management System (EMS)",
    description: [
      "A vision-based employee management system to automate presence tracking and measure total active desk time.",
      "Applied computer vision-based presence monitoring to support workplace activity measurement.",
    ],
    technologies: ["Computer Vision", "Presence Monitoring", "Activity Tracking"],
    videoId: "Ud2HwFR6-CY",
    videoTitle: "Employee Management with Computer Vision",
    image: {
      src: "/images/projects/employee-management-poster.jpg",
      alt: "Office monitoring demo thumbnail showing desk areas and presence markers.",
      framing: "office",
    },
    externalLink: null,
    externalLabel: null,
    category: "Computer Vision",
    problem: "Employee presence and active desk time needed to be tracked automatically.",
    process: ["Desk areas in camera footage", "Presence tracking", "Total active desk time"],
    featured: false,
  },
  {
    id: "04",
    slug: "premier-bank-chatbot",
    title: "Premier Bank Conversational ChatBot",
    description: [
      "A customer-service chatbot for banking inquiries and account FAQs; built its homepage frontend and integrated interface features with backend services through APIs.",
    ],
    technologies: ["Conversational AI", "Chatbot", "API Integration", "Frontend Development"],
    videoId: null,
    videoTitle: null,
    image: null,
    externalLink: "https://chatbot.betopialimited.com/",
    externalLabel: "Explore Live Chatbot",
    category: "Conversational AI",
    problem: "Bank customers needed a way to ask common banking questions and find account FAQ answers.",
    process: ["Customer question in the web interface", "API connection to backend services", "Banking or account FAQ response"],
    featured: false,
  },
];

export const projects: readonly Project[] = [featuredProject, ...secondaryProjects];
