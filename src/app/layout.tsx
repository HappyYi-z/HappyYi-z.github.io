import type { Metadata } from "next";
import { Inter, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteTitle,
    template: `%s | ${siteConfig.englishName}`,
  },
  description:
    siteConfig.tagline ||
    `${siteConfig.englishName} (${siteConfig.name}) — Personal site, projects, and writing.`,
  openGraph: {
    title: siteConfig.siteTitle,
    description:
      siteConfig.tagline ||
      `${siteConfig.englishName} (${siteConfig.name}) — Personal site, projects, and writing.`,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.englishName,
  },
  twitter: {
    card: "summary",
    title: siteConfig.siteTitle,
    description:
      siteConfig.tagline ||
      `${siteConfig.englishName} (${siteConfig.name}) — Personal site, projects, and writing.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${notoSerifSC.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased selection:bg-[var(--accent)]/15 selection:text-[var(--foreground)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
