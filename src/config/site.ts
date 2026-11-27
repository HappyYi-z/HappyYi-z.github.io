export interface NavItem {
  label: string;
  href: string;
}

export interface FriendLink {
  name: string;
  url: string;
  description?: string;
}

export const siteConfig = {
  // Core Identity
  name: "张翼",
  englishName: "Yi Zhang",
  siteTitle: "Yi Zhang | Personal Site",
  siteUrl: "https://zhangyi.online",
  avatar: "/avatar.jpg",

  // Bio & Tagline (intentionally left blank for you to customize anytime)
  overline: "", // e.g. "DEVELOPER · BUILDER · EXPLORER"
  tagline: "", // e.g. "Designing and building clean, thoughtful software."
  bio: "",
  rolePills: [] as string[], // e.g. ["Developer", "Builder", "Lifelong Learner"]
  closingQuote: "", // e.g. "Simplicity is the ultimate sophistication."

  // Social & Contact
  githubUsername: "cysy10236-sketch",
  githubUrl: "https://github.com/cysy10236-sketch",
  email: "zhangy2935@mail2.sysu.edu.cn",

  // Navigation
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Resume", href: "/resume" },
    { label: "About", href: "/about" },
  ] as NavItem[],

  // Friends (add entries here to display the Friends column in the footer)
  friends: [] as FriendLink[],
} as const;
