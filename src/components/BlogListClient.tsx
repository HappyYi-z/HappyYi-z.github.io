"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

interface BlogListClientProps {
  posts: PostMeta[];
  categories: string[];
}

export function BlogListClient({ posts, categories }: BlogListClientProps) {
  const [selected, setSelected] = React.useState<string>("All");

  const tabs = ["All", ...categories];
  const filteredPosts =
    selected === "All"
      ? posts
      : posts.filter((post) => post.category === selected);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter posts by category"
        className="flex flex-wrap items-center gap-2"
      >
        {tabs.map((tab) => {
          const active = selected === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(tab)}
              className={`rounded-full px-4 py-1.5 text-[13px] transition-colors duration-200 cursor-pointer ${
                active
                  ? "bg-[var(--cta-bg)] font-medium text-[var(--cta-fg)]"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center text-[15px] text-[var(--muted)]">
          No posts in this category yet.
        </div>
      ) : (
        <div className="mt-10 divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="group py-7">
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"
              >
                <div className="max-w-[640px]">
                  <div className="flex flex-wrap items-center gap-2.5 text-[12px] text-[var(--muted)]">
                    <time dateTime={post.date}>{post.date}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">
                      {post.summary}
                    </p>
                  )}
                </div>

                <span className="inline-flex shrink-0 items-center gap-0.5 text-[13px] font-medium text-[var(--accent)] sm:mt-7">
                  Read
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
