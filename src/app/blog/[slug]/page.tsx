import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { TableOfContents } from "@/components/TableOfContents";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "文章未找到" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[980px] px-6 py-16 sm:py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--accent)] hover:underline hover:underline-offset-4"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        Back to Blog
      </Link>

      <header className="mt-8 max-w-[680px] border-b border-[var(--border)] pb-8">
        <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-[var(--muted)]">
          <time dateTime={post.date}>{post.date}</time>
          <span aria-hidden="true">·</span>
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-3 text-[32px] font-semibold leading-[1.18] tracking-[-0.03em] text-[var(--foreground)] sm:text-[40px]">
          {post.title}
        </h1>

        {post.summary && (
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--muted)]">
            {post.summary}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-0.5 text-[12px] text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <article className="lg:col-span-9">
          <div
            className="article-prose prose prose-neutral max-w-[680px] dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <aside className="hidden lg:col-span-3 lg:block">
          <TableOfContents headings={post.toc} />
        </aside>
      </div>
    </div>
  );
}
