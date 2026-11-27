export interface ResumeSectionEntry {
  title: string;
  subtitle?: string;
  period?: string;
  highlights: string[];
}

export interface ResumeData {
  updatedAt: string;
  pdfUrl?: string; // Put your finished PDF at public/resume.pdf and set "/resume.pdf"
  summary: string;
  education: ResumeSectionEntry[];
  experience: ResumeSectionEntry[];
  projects: ResumeSectionEntry[];
  skills: { label: string; items: string[] }[];
}

export const resumeData: ResumeData = {
  updatedAt: "In Progress",
  pdfUrl: undefined,
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: [],
};
