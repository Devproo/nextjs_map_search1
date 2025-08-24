// shared/Jobs.ts

// Job interface
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Remote" | "Contract";
  description: string;
  salary?: string; // optional
}

// Sample Jobs data
export const JobsListData: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Cairo, Egypt",
    type: "Full-time",
    description:
      "Work with React, Next.js, and Tailwind to build scalable UIs.",
    salary: "$1200 - $1500",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "DataSoft",
    location: "Remote",
    type: "Remote",
    description: "Build APIs with Node.js, Express, and PostgreSQL.",
    salary: "$1500 - $2000",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Designify",
    location: "Alexandria, Egypt",
    type: "Contract",
    description: "Create user-friendly prototypes and high-quality designs.",
  },
  {
    id: 4,
    title: "Mobile App Developer",
    company: "AppNation",
    location: "Giza, Egypt",
    type: "Part-time",
    description: "Develop iOS/Android apps with Flutter or React Native.",
    salary: "$800 - $1200",
  },
];
