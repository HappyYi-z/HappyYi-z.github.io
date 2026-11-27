"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="apple-glass fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]">
      <div className="mx-auto flex h-14 max-w-[980px] items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em] text-[var(--foreground)] transition-opacity hover:opacity-80"
        >
          <Image
            src={siteConfig.avatar}
            alt={siteConfig.englishName}
            width={28}
            height={28}
            priority
            className="h-7 w-7 rounded-full object-cover ring-1 ring-[var(--border)]"
          />
          <span>{siteConfig.englishName}</span>
        </Link>

        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 sm:flex"
        >
          {siteConfig.navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] transition-colors duration-200 ${
                  active
                    ? "font-medium text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="h-3.5 w-px bg-[var(--border)]" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] px-6 py-4 sm:hidden">
          <nav className="flex flex-col gap-3">
            {siteConfig.navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-1.5 text-[15px] transition-colors ${
                    active
                      ? "font-medium text-[var(--foreground)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
