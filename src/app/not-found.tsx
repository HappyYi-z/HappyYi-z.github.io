import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-14rem)] max-w-[980px] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[13px] text-[var(--muted)]">404</p>
      <h1 className="mt-2 text-[32px] font-semibold tracking-[-0.03em] text-[var(--foreground)]">
        Page not found
      </h1>
      <p className="mt-3 text-[15px] text-[var(--muted)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-full bg-[var(--cta-bg)] px-6 text-[14px] font-medium text-[var(--cta-fg)] transition-opacity hover:opacity-85"
      >
        Back to Home
      </Link>
    </div>
  );
}
