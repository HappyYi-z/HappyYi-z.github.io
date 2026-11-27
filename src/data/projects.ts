export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repoUrl?: string;
  accentStyle: "graphite" | "silver" | "slate";
}

// 项目展示数据（当前为示例占位结构，替换为你的实际项目即可）
export const projects: ProjectItem[] = [
  {
    id: "project-01",
    category: "Featured Project · 01",
    title: "项目占位示例 A",
    description:
      "在此填写项目的核心问题、实现思路与实际成果。支持直接链接至在线预览或 GitHub 源码仓库。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/cysy10236-sketch",
    accentStyle: "graphite",
  },
  {
    id: "project-02",
    category: "Featured Project · 02",
    title: "项目占位示例 B",
    description:
      "用于展示工具、研究实验或开源库。编辑 src/data/projects.ts 即可增删项目卡片与技术标签。",
    tags: ["Python", "AI / LLM", "System"],
    repoUrl: "https://github.com/cysy10236-sketch",
    accentStyle: "silver",
  },
  {
    id: "project-03",
    category: "Featured Project · 03",
    title: "项目占位示例 C",
    description:
      "保持简短克制的单句说明，配合大留白与清晰排版突出产品本身的重点。",
    tags: ["React", "Node.js", "Design"],
    repoUrl: "https://github.com/cysy10236-sketch",
    accentStyle: "slate",
  },
];
