import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  tags: string[];
  readingTime: string;
}

export interface PostDetail extends PostMeta {
  contentHtml: string;
  toc: TocHeading[];
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function estimateReadingTime(rawContent: string): string {
  const cjkChars = (rawContent.match(/[\u4e00-\u9fff]/g) || []).length;
  const latinWords = rawContent
    .replace(/[\u4e00-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(cjkChars / 380 + latinWords / 200));
  return `${minutes} min read`;
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function extractTocFromHtml(html: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const regex = /<h([23])\s+[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3;
    const id = match[2];
    const text = stripHtmlTags(match[3]);
    if (id && text) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"));
}

export function getAllPosts(): PostMeta[] {
  const files = getMarkdownFiles();

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: String(data.title || slug),
      date: String(data.date || ""),
      category: String(data.category || "未分类"),
      summary: String(data.summary || ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTime: estimateReadingTime(content),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  for (const post of posts) {
    if (post.category) {
      categories.add(post.category);
    }
  }
  return Array.from(categories);
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeShiki, {
      themes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
      defaultColor: "light",
    })
    .use(rehypeStringify)
    .process(content);

  const contentHtml = String(processed);
  const toc = extractTocFromHtml(contentHtml);

  return {
    slug,
    title: String(data.title || slug),
    date: String(data.date || ""),
    category: String(data.category || "未分类"),
    summary: String(data.summary || ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: estimateReadingTime(content),
    contentHtml,
    toc,
  };
}
