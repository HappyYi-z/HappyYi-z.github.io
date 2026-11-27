import { ChevronRight } from "lucide-react";
import type { ProjectItem } from "@/data/projects";

const SURFACE_ARTWORKS: Record<ProjectItem["accentStyle"], string> = {
  graphite:
    "from-[#1d1d1f] via-[#2c2c2e] to-[#111113] dark:from-[#262629] dark:via-[#1c1c1e] dark:to-[#0f0f11]",
  silver:
    "from-[#e8e8ed] via-[#f5f5f7] to-[#d2d2d7] dark:from-[#2c2c2e] dark:via-[#1d1d1f] dark:to-[#141416]",
  slate:
    "from-[#2d3038] via-[#1f2128] to-[#14151a] dark:from-[#252830] dark:via-[#1a1c22] dark:to-[#101116]",
};

export function ProjectCard({ project }: { project: ProjectItem }) {
  const isLightArtwork = project.accentStyle === "silver";

  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-300 hover:border-[var(--border-strong)]">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div
          className={`relative flex min-h-[200px] items-end overflow-hidden bg-gradient-to-br p-7 md:col-span-5 md:min-h-[240px] ${SURFACE_ARTWORKS[project.accentStyle]}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          >
            <svg
              viewBox="0 0 400 280"
              className="h-full w-full opacity-40"
              preserveAspectRatio="xMidYMid slice"
            >
              <circle
                cx="310"
                cy="60"
                r="130"
                fill="none"
                stroke={isLightArtwork ? "#1d1d1f" : "#f5f5f7"}
                strokeOpacity="0.14"
                strokeWidth="1"
              />
              <circle
                cx="310"
                cy="60"
                r="82"
                fill="none"
                stroke={isLightArtwork ? "#1d1d1f" : "#f5f5f7"}
                strokeOpacity="0.18"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="210"
                x2="400"
                y2="140"
                stroke={isLightArtwork ? "#1d1d1f" : "#f5f5f7"}
                strokeOpacity="0.1"
                strokeWidth="1"
              />
            </svg>
          </div>
          <span
            className={`relative z-10 font-mono text-[11px] tracking-[0.08em] uppercase ${
              isLightArtwork
                ? "text-[#1d1d1f]/70 dark:text-[#f5f5f7]/70"
                : "text-[#f5f5f7]/70"
            }`}
          >
            {project.category}
          </span>
        </div>

        <div className="flex flex-col justify-between p-7 sm:p-8 md:col-span-7">
          <div>
            <h3 className="text-[22px] font-semibold tracking-[-0.025em] text-[var(--foreground)]">
              {project.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-[12px] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-6 text-[14px] font-medium">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-[var(--accent)] transition-opacity hover:underline hover:underline-offset-4"
              >
                Live Demo
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-[var(--accent)] transition-opacity hover:underline hover:underline-offset-4"
              >
                Source Code
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
