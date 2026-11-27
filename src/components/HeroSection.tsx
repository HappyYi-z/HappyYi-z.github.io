"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, FileText, Mail } from "lucide-react";
import { GitHubIcon } from "./Icons";

interface HeroSectionProps {
  avatar: string;
  name: string;
  englishName: string;
  overline?: string;
  tagline?: string;
  rolePills: string[];
  githubUrl: string;
  email: string;
}

const GENTLE_SPRING = {
  type: "spring" as const,
  stiffness: 150,
  damping: 14,
  mass: 1.15,
};

const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection({
  avatar,
  name,
  englishName,
  overline,
  tagline,
  rolePills,
  githubUrl,
  email,
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const characters = Array.from(name);

  const springItem = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24, scale: 0.9 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: {
            ...GENTLE_SPRING,
            delay,
            opacity: { duration: 0.55, delay, ease: APPLE_EASE },
          },
        };

  return (
    <section className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center py-24 text-center">
      {/* Avatar */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                ...GENTLE_SPRING,
                delay: 0.05,
                opacity: { duration: 0.6, delay: 0.05, ease: APPLE_EASE },
              }
        }
        className="mx-auto mb-7 flex justify-center"
      >
        <Image
          src={avatar}
          alt={englishName}
          width={92}
          height={92}
          priority
          className="h-23 w-23 rounded-full object-cover ring-1 ring-[var(--border-strong)] shadow-sm"
        />
      </motion.div>

      {overline && (
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: APPLE_EASE }}
          className="mb-4 font-mono text-[12px] tracking-[0.18em] uppercase text-[var(--muted)]"
        >
          {overline}
        </motion.p>
      )}

      {/* Bouncy Staggered Chinese Display Name */}
      <h1
        aria-label={name}
        className="font-serif text-[56px] font-semibold leading-[1.12] tracking-[0.08em] text-[var(--foreground)] sm:text-[72px]"
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 30, scale: 0.86, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    ...GENTLE_SPRING,
                    delay: 0.22 + index * 0.18,
                    opacity: { duration: 0.55, delay: 0.22 + index * 0.18 },
                    filter: { duration: 0.6, delay: 0.22 + index * 0.18 },
                  }
            }
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </h1>

      {/* English Subtitle */}
      <motion.p
        {...springItem(0.58)}
        className="mt-3 text-[20px] font-light tracking-[0.04em] text-[var(--muted)] sm:text-[24px]"
      >
        {englishName}
      </motion.p>

      {tagline && (
        <motion.p
          {...springItem(0.7)}
          className="mx-auto mt-6 max-w-[540px] text-[17px] leading-relaxed text-[var(--muted)] sm:text-[19px]"
        >
          {tagline}
        </motion.p>
      )}

      {rolePills.length > 0 && (
        <motion.div
          {...springItem(0.78)}
          className="mt-7 flex flex-wrap items-center justify-center gap-2"
        >
          {rolePills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-[13px] text-[var(--muted)]"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      )}

      {/* CTA Buttons (Staggered Spring Bounce) */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
        <motion.a
          href="#projects"
          {...springItem(0.76)}
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--cta-bg)] px-6 text-[14px] font-medium text-[var(--cta-fg)] transition-opacity duration-200 hover:opacity-90"
        >
          Selected Projects
        </motion.a>
        <motion.div
          {...springItem(0.9)}
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          <Link
            href="/blog"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-6 text-[14px] font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--surface)]"
          >
            Read Blog
          </Link>
        </motion.div>
      </div>

      {/* Quick Links (Staggered Spring Bounce) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[var(--muted)]">
        <motion.a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...springItem(1.04)}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
        >
          <GitHubIcon className="h-4 w-4" />
          <span>GitHub</span>
        </motion.a>

        <motion.a
          href={`mailto:${email}`}
          {...springItem(1.14)}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
        >
          <Mail className="h-4 w-4" strokeWidth={1.75} />
          <span>Email</span>
        </motion.a>

        <motion.div
          {...springItem(1.24)}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        >
          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
          >
            <FileText className="h-4 w-4" strokeWidth={1.75} />
            <span>Resume</span>
          </Link>
        </motion.div>

        <motion.div
          {...springItem(1.34)}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-0.5 text-[var(--accent)] transition-opacity hover:underline hover:underline-offset-4"
          >
            About me
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
