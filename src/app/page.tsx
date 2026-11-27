import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";
import { HeroSection } from "@/components/HeroSection";
import { MotionReveal } from "@/components/MotionReveal";
import { ProjectCard } from "@/components/ProjectCard";

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="mx-auto max-w-[980px] px-6">
      <HeroSection
        avatar={siteConfig.avatar}
        name={siteConfig.name}
        englishName={siteConfig.englishName}
        overline={siteConfig.overline}
        tagline={siteConfig.tagline}
        rolePills={siteConfig.rolePills}
        githubUrl={siteConfig.githubUrl}
        email={siteConfig.email}
      />

      {/* Overview & GitHub Contributions */}
      <section className="border-t border-[var(--border)] py-24">
        <MotionReveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
                Activity
              </p>
              <h2 className="mt-1.5 text-[30px] font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-[36px]">
                GitHub
              </h2>
            </div>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--accent)] hover:underline hover:underline-offset-4"
            >
              @{siteConfig.githubUsername}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-[12px] font-medium tracking-[0.02em] text-[var(--muted)]">
                Projects
              </p>
              <p className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                {projects.length}
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-[12px] font-medium tracking-[0.02em] text-[var(--muted)]">
                Posts
              </p>
              <p className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                {posts.length}
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-[12px] font-medium tracking-[0.02em] text-[var(--muted)]">
                Contact
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 block truncate text-[14px] font-medium text-[var(--accent)] hover:underline hover:underline-offset-4"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="overflow-x-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/1d1d1f/${siteConfig.githubUsername}`}
                alt={`${siteConfig.githubUsername} GitHub Contributions`}
                loading="lazy"
                className="mx-auto min-w-[680px] w-full max-w-[840px] dark:invert dark:opacity-85"
              />
            </div>
          </div>
        </MotionReveal>
      </section>

      {/* Selected Projects */}
      <section id="projects" className="scroll-mt-20 border-t border-[var(--border)] py-24">
        <MotionReveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
                Work
              </p>
              <h2 className="mt-1.5 text-[30px] font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-[36px]">
                Selected Projects
              </h2>
            </div>
            <a
              href={`${siteConfig.githubUrl}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[14px] font-medium text-[var(--accent)] hover:underline hover:underline-offset-4"
            >
              All repositories
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
        </MotionReveal>

        <div className="mt-10 space-y-6">
          {projects.map((project, idx) => (
            <MotionReveal key={project.id} delay={idx * 0.06}>
              <ProjectCard project={project} />
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Latest Writing */}
      {latestPosts.length > 0 && (
        <section className="border-t border-[var(--border)] py-24">
          <MotionReveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
                  Writing
                </p>
                <h2 className="mt-1.5 text-[30px] font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-[36px]">
                  Latest Posts
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-0.5 text-[14px] font-medium text-[var(--accent)] hover:underline hover:underline-offset-4"
              >
                All posts
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>

            <div className="mt-8 divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="text-[17px] font-medium tracking-[-0.015em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="mt-1 line-clamp-1 text-[14px] text-[var(--muted)]">
                        {post.summary}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-[13px] text-[var(--muted)]">
                    <time dateTime={post.date}>{post.date}</time>
                    <ChevronRight className="h-4 w-4 text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
                  </div>
                </Link>
              ))}
            </div>
          </MotionReveal>
        </section>
      )}

      {siteConfig.closingQuote && (
        <section className="py-16 text-center">
          <p className="text-[15px] tracking-[-0.01em] text-[var(--muted)]">
            “{siteConfig.closingQuote}”
          </p>
        </section>
      )}
    </div>
  );
}
