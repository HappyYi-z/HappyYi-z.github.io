import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { aboutData } from "@/data/about";
import { MotionReveal } from "@/components/MotionReveal";
import { GitHubIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.englishName} (${siteConfig.name}).`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[980px] px-6 py-20 sm:py-24">
      <MotionReveal>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Image
            src={siteConfig.avatar}
            alt={siteConfig.englishName}
            width={76}
            height={76}
            priority
            className="h-19 w-19 rounded-full object-cover ring-1 ring-[var(--border-strong)]"
          />
          <div>
            <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
              About
            </p>
            <h1 className="mt-1.5 text-[34px] font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-[42px]">
              {siteConfig.name}
              <span className="ml-3 text-[22px] font-normal text-[var(--muted)] sm:text-[26px]">
                {siteConfig.englishName}
              </span>
            </h1>
          </div>
        </div>

        {aboutData.intro.length > 0 ? (
          <div className="mt-8 max-w-[680px] space-y-4 text-[16px] leading-relaxed text-[var(--muted)]">
            {aboutData.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="mt-8 max-w-[640px] text-[15px] leading-relaxed text-[var(--muted)]">
            Bio coming soon. Edit{" "}
            <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[13px] text-[var(--foreground)]">
              src/data/about.ts
            </code>{" "}
            to add your introduction.
          </p>
        )}
      </MotionReveal>

      {/* Skills Bento Grid */}
      <section className="mt-16 border-t border-[var(--border)] pt-14">
        <MotionReveal>
          <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
            Capabilities
          </p>
          <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.025em] text-[var(--foreground)]">
            Skills &amp; Focus
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {aboutData.skillGroups.map((group) => (
              <div
                key={group.category}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="text-[13px] font-semibold tracking-[0.02em] text-[var(--foreground)]">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-[12px] text-[var(--muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MotionReveal>
      </section>

      {/* Timeline */}
      <section className="mt-16 border-t border-[var(--border)] pt-14">
        <MotionReveal>
          <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
            Background
          </p>
          <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.025em] text-[var(--foreground)]">
            Timeline
          </h2>
          <div className="mt-6 space-y-4">
            {aboutData.timeline.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between gap-2 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="text-[16px] font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-[var(--muted)]">
                    {item.organization}
                  </p>
                  {item.description && (
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-mono text-[12px] text-[var(--muted)]">
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </MotionReveal>
      </section>

      {/* Contact */}
      <section className="mt-16 border-t border-[var(--border)] pt-14">
        <MotionReveal>
          <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
            Connect
          </p>
          <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.025em] text-[var(--foreground)]">
            Get in Touch
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-strong)]"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]">
                  <GitHubIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[13px] text-[var(--muted)]">GitHub</p>
                  <p className="text-[15px] font-medium text-[var(--foreground)]">
                    @{siteConfig.githubUsername}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center justify-between rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-strong)]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]">
                  <Mail className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] text-[var(--muted)]">Email</p>
                  <p className="truncate text-[15px] font-medium text-[var(--foreground)]">
                    {siteConfig.email}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
            </a>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
}
