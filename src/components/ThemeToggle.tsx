"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] transition-colors duration-200 hover:bg-[var(--surface)] hover:text-[var(--foreground)] cursor-pointer"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-[15px] w-[15px]" strokeWidth={1.75} />
        ) : (
          <Moon className="h-[15px] w-[15px]" strokeWidth={1.75} />
        )
      ) : (
        <span className="h-[15px] w-[15px]" aria-hidden="true" />
      )}
    </button>
  );
}
