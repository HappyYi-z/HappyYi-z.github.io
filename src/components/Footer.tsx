import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]/60">
      <div className="mx-auto max-w-[980px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Image
                src={siteConfig.avatar}
                alt={siteConfig.englishName}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover ring-1 ring-[var(--border)]"
              />
              <span className="text-[14px] font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                {siteConfig.englishName} · {siteConfig.name}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--muted)]">
              {siteConfig.tagline || "Personal Site · Projects & Writing"}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[var(--foreground)]">
              Navigate
            </h3>
            <ul className="space-y-2 text-[13px]">
              {siteConfig.navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[var(--foreground)]">
              Friends
            </h3>
            <ul className="space-y-2 text-[13px]">
              {siteConfig.friends.map((friend) => (
                <li key={friend.url}>
                  <a
                    href={friend.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {friend.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[var(--foreground)]">
              Contact
            </h3>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  GitHub (@{siteConfig.githubUsername})
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-[var(--border)] pt-6 text-[12px] text-[var(--muted)] sm:flex-row sm:items-center">
          <p>
            &copy; {year} {siteConfig.englishName}. All rights reserved.
          </p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
