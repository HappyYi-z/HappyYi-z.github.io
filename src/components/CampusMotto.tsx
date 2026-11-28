"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MottoItem } from "@/data/campus";

interface CampusMottoProps {
  items: MottoItem[];
  source: string;
}

const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CampusMotto({ items, source }: CampusMottoProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeItem = items[activeIndex] ?? items[0];

  if (!activeItem) return null;

  return (
    <div className="border-t border-b border-[var(--border)] py-14 sm:py-16">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
        <h2 className="text-[14px] font-medium text-[var(--foreground)]">
          校训 · Motto
        </h2>
        <p className="text-[13px] text-[var(--muted)]">{source}</p>
      </div>

      {/* 5-Character Interactive Motto Ribbon */}
      <div
        role="tablist"
        aria-label="中山大学校训"
        className="mt-10 grid grid-cols-5 gap-2 sm:gap-4"
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.term}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              className="group relative flex flex-col items-center py-3 text-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sysu-green-ink)]"
            >
              <span
                className={`font-serif text-[26px] font-semibold tracking-[0.06em] transition-colors duration-300 sm:text-[38px] ${
                  isActive
                    ? "text-[var(--sysu-green-ink)]"
                    : "text-[var(--foreground)]/35 group-hover:text-[var(--foreground)]/75"
                }`}
              >
                {item.term}
              </span>
              <span
                className={`mt-1.5 hidden font-mono text-[11px] tracking-[0.04em] transition-colors duration-300 sm:block ${
                  isActive ? "text-[var(--muted)]" : "text-[var(--muted)]/50"
                }`}
              >
                {item.pinyin}
              </span>

              {isActive && (
                <motion.span
                  layoutId="sysu-motto-underline"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.35, ease: APPLE_EASE }
                  }
                  className="absolute right-3 bottom-0 left-3 h-[2px] rounded-full bg-[var(--sysu-green-ink)]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Classical Citation & Reflection */}
      <div className="mt-8 min-h-[84px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 sm:px-8 sm:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.term}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: APPLE_EASE }}
            className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <p className="shrink-0 font-serif text-[16px] font-medium text-[var(--foreground)] sm:text-[17px]">
              “{activeItem.classicLine}”
            </p>
            <p className="max-w-[460px] text-[14px] leading-relaxed text-[var(--muted)] sm:text-right">
              {activeItem.meaning}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
