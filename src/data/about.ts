export interface SkillGroup {
  category: string;
  items: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  description?: string;
}

// About page data — edit this file whenever you're ready to fill in details
export const aboutData = {
  intro: [] as string[], // e.g. ["Hi, I'm Yi Zhang..."]
  skillGroups: [
    {
      category: "Focus Areas",
      items: ["To be updated"],
    },
    {
      category: "Languages",
      items: ["To be updated"],
    },
    {
      category: "Frameworks & Tools",
      items: ["To be updated"],
    },
  ] as SkillGroup[],
  timeline: [
    {
      period: "TBD",
      title: "Education / Experience",
      organization: "Edit src/data/about.ts to add your background",
      description: "",
    },
  ] as TimelineItem[],
};
