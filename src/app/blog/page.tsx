import type { Metadata } from "next";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import { BlogListClient } from "@/components/BlogListClient";
import { MotionReveal } from "@/components/MotionReveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on engineering, design, and learning.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-[980px] px-6 py-20 sm:py-24">
      <MotionReveal>
        <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
          Writing
        </p>
        <h1 className="mt-2 text-[36px] font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-[44px]">
          Blog
        </h1>
        <p className="mt-3 max-w-[540px] text-[16px] leading-relaxed text-[var(--muted)]">
          Notes on engineering, design, and things worth writing down.
        </p>

        <div className="mt-10">
          <BlogListClient posts={posts} categories={categories} />
        </div>
      </MotionReveal>
    </div>
  );
}
