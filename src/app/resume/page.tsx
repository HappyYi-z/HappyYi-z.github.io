import type { Metadata } from "next";
import { ArrowUpRight, Download, FileText, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { resumeData, type ResumeSectionEntry } from "@/data/resume";
import { MotionReveal } from "@/components/MotionReveal";
import { GitHubIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${siteConfig.englishName} (${siteConfig.name}).`,
};

function ResumeSection({
  overline,
  title,
  entries,
}: {
  overline: string;
  title: string;
  entries: ResumeSectionEntry[];
}) {
  if (entries.length === 0) return null;

  return (
    <section className="mt-14 border-t border-[var(--border)] pt-12">
      <MotionReveal>
        <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
          {overline}
        </p>
        <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.025em] text-[var(--foreground)]">
          {title}
        </h2>

        <div className="mt-6 space-y-4">
          {entries.map((entry, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-[var(--foreground)]">
                    {entry.title}
                  </h3>
                  {entry.subtitle && (
                    <p className="mt-0.5 text-[14px] text-[var(--muted)]">
                      {entry.subtitle}
                    </p>
                  )}
                </div>
                {entry.period && (
                  <span className="shrink-0 font-mono text-[12px] text-[var(--muted)]">
                    {entry.period}
                  </span>
                )}
              </div>

              {entry.highlights.length > 0 && (
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-[var(--muted)]">
                  {entry.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}

export default function ResumePage() {
  const hasStructuredContent =
    resumeData.education.length > 0 ||
    resumeData.experience.length > 0 ||
    resumeData.projects.length > 0 ||
    resumeData.skills.length > 0;

  return (
    <div className="mx-auto max-w-[980px] px-6 py-20 sm:py-24">
      <MotionReveal>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
              Curriculum Vitae
            </p>
            <h1 className="mt-2 text-[36px] font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-[44px]">
              Resume
            </h1>
            <p className="mt-2 text-[15px] text-[var(--muted)]">
              {siteConfig.name} · {siteConfig.englishName}
              {resumeData.updatedAt ? ` · ${resumeData.updatedAt}` : ""}
            </p>
          </div>

          {resumeData.pdfUrl && (
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={resumeData.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-5 text-[13px] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
              >
                Preview PDF
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
              <a
                href={resumeData.pdfUrl}
                download
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--cta-bg)] px-5 text-[13px] font-medium text-[var(--cta-fg)] transition-opacity hover:opacity-85"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                Download PDF
              </a>
            </div>
          )}
        </div>

        {resumeData.summary && (
          <p className="mt-6 max-w-[680px] text-[16px] leading-relaxed text-[var(--muted)]">
            {resumeData.summary}
          </p>
        )}
      </MotionReveal>

      {/* PDF Inline Preview when uploaded */}
      {resumeData.pdfUrl && (
        <section className="mt-12">
          <MotionReveal>
            <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <iframe
                src={resumeData.pdfUrl}
                title={`${siteConfig.englishName} Resume PDF`}
                className="h-[820px] w-full"
              />
            </div>
          </MotionReveal>
        </section>
      )}

      {/* Structured Resume Sections */}
      <ResumeSection
        overline="Education"
        title="Education"
        entries={resumeData.education}
      />
      <ResumeSection
        overline="Experience"
        title="Experience"
        entries={resumeData.experience}
      />
      <ResumeSection
        overline="Projects"
        title="Selected Projects"
        entries={resumeData.projects}
      />

      {resumeData.skills.length > 0 && (
        <section className="mt-14 border-t border-[var(--border)] pt-12">
          <MotionReveal>
            <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[var(--muted)]">
              Capabilities
            </p>
            <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-0.025em] text-[var(--foreground)]">
              Skills
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {resumeData.skills.map((group) => (
                <div
                  key={group.label}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <h3 className="text-[13px] font-semibold text-[var(--foreground)]">
                    {group.label}
                  </h3>
                  <div className="mt-3.5 flex flex-wrap gap-2">
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
      )}

      {/* Clean Empty State while Resume is being prepared */}
      {!resumeData.pdfUrl && !hasStructuredContent && (
        <section className="mt-12">
          <MotionReveal>
            <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]">
                <FileText className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-[20px] font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                Resume Coming Soon
              </h2>
              <p className="mt-2 max-w-[440px] text-[14px] leading-relaxed text-[var(--muted)]">
                个人简历正在整理中，完成后将同步上传 PDF 预览与在线结构化版本。如需提前联系，可通过下方方式获取。
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--cta-bg)] px-5 text-[13px] font-medium text-[var(--cta-fg)] transition-opacity hover:opacity-85"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Email Me
                </a>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-5 text-[13px] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </div>
            </div>
          </MotionReveal>
        </section>
      )}
    </div>
  );
}
