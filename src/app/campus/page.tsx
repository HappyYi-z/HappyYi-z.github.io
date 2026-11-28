import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Compass, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { campusData } from "@/data/campus";
import { CampusMotto } from "@/components/CampusMotto";
import { CampusGallery } from "@/components/CampusGallery";
import { MotionReveal } from "@/components/MotionReveal";

export const metadata: Metadata = {
  title: "Campus",
  description: `${siteConfig.name} (${siteConfig.englishName}) 就读于${campusData.universityCn}${campusData.campusCn}，记录校园建筑、山海风光与四季光影。`,
};

export default function CampusPage() {
  return (
    <div className="mx-auto max-w-[980px] px-6 py-12 sm:py-16">
      {/* Committed SYSU Green Architectural Masthead */}
      <section className="overflow-hidden rounded-2xl bg-[var(--sysu-green)] text-white">
        <div className="p-8 sm:p-12 lg:p-14">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-6 text-[12px] text-white/75">
            <span className="font-mono tracking-[0.12em] uppercase">
              {campusData.universityEn} · Est. {campusData.foundedYear}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono">
              <Compass className="h-3.5 w-3.5" strokeWidth={1.75} />
              {campusData.coordinates}
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.08] tracking-[0.06em] text-white">
                {campusData.universityCn}
              </h1>
              <p className="mt-3 text-[18px] font-light tracking-[0.02em] text-white/80 sm:text-[21px]">
                {campusData.campusCn} · {campusData.campusEn}
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="text-[15px] leading-[1.75] text-white/85">
                {campusData.intro}
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-white/15 pt-6 text-[13px] text-white/80 sm:grid-cols-3">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/40 bg-[#00561F]"
              />
              <span>
                校色：{campusData.brandColorName}{" "}
                <span className="font-mono text-white/65">
                  {campusData.brandColorHex}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-white/70" strokeWidth={1.75} />
              <span className="truncate">{campusData.address}</span>
            </div>

            <div className="sm:text-right">
              <a
                href={campusData.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-white transition-opacity hover:opacity-80"
              >
                sysu.edu.cn
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Panoramic Hero Plate */}
      <figure className="mt-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <Image
            src={campusData.heroPhoto.src}
            alt={campusData.heroPhoto.alt}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 980px"
            className="object-cover"
          />
          {campusData.heroPhoto.isSample && (
            <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium tracking-[0.02em] text-white/95 backdrop-blur-md">
              意境预览 · 后续替换为个人实拍
            </span>
          )}
        </div>
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 px-0.5 text-[13px] text-[var(--muted)]">
          <span>{campusData.heroPhoto.caption}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            {campusData.heroPhoto.location}
          </span>
        </figcaption>
      </figure>

      {/* Interactive University Motto */}
      <section className="mt-20">
        <MotionReveal>
          <CampusMotto
            items={campusData.mottoItems}
            source={campusData.mottoSource}
          />
        </MotionReveal>
      </section>

      {/* Campus Photography Exhibition */}
      <section className="mt-20">
        <MotionReveal>
          <CampusGallery photos={campusData.photos} />
        </MotionReveal>
      </section>

      {/* Zhuhai Campus Landmarks Architectural Ledger */}
      <section className="mt-24 border-t border-[var(--border)] pt-16">
        <MotionReveal>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-[var(--foreground)] sm:text-[34px]">
                珠海校区地标
              </h2>
              <p className="mt-2 max-w-[500px] text-[15px] leading-relaxed text-[var(--muted)]">
                山海、湖泊与学术空间构成的日常动线。
              </p>
            </div>
            <span className="font-mono text-[12px] text-[var(--muted)]">
              Tangjiawan · Zhuhai
            </span>
          </div>

          <div className="mt-10 divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
            {campusData.landmarks.map((landmark) => (
              <div
                key={landmark.name}
                className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <div className="sm:col-span-4">
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-[var(--foreground)]">
                    {landmark.name}
                    <span className="ml-2 font-sans text-[13px] font-normal text-[var(--muted)]">
                      {landmark.englishName}
                    </span>
                  </h3>
                </div>
                <div className="sm:col-span-3">
                  <span className="inline-flex rounded-full border border-[var(--sysu-green-border)] bg-[var(--sysu-green-soft)] px-2.5 py-0.5 text-[12px] font-medium text-[var(--sysu-green-ink)]">
                    {landmark.area}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-[var(--muted)] sm:col-span-5">
                  {landmark.note}
                </p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </section>
    </div>
  );
}
