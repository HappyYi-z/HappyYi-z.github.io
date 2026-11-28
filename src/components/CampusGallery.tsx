"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, MapPin, X } from "lucide-react";
import type { CampusPhoto, CampusPhotoCategory } from "@/data/campus";

interface CampusGalleryProps {
  photos: CampusPhoto[];
}

const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CampusGallery({ photos }: CampusGalleryProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<
    "All" | CampusPhotoCategory
  >("All");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(photos.map((p) => p.category)));
    return ["All", ...unique] as ("All" | CampusPhotoCategory)[];
  }, [photos]);

  const filteredPhotos = React.useMemo(() => {
    if (selectedCategory === "All") return photos;
    return photos.filter((photo) => photo.category === selectedCategory);
  }, [photos, selectedCategory]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = React.useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredPhotos.length === 0) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const goNext = React.useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredPhotos.length === 0) return null;
      return (prev + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  React.useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, goPrev, goNext]);

  const activePhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] ?? null : null;

  const getGridSpanClass = (photo: CampusPhoto, index: number, total: number) => {
    if (total === 1 || photo.aspect === "wide") return "md:col-span-12";
    const isLastOdd = total % 2 === 1 && index === total - 1;
    if (isLastOdd) return "md:col-span-12";

    const rowIndex = Math.floor(index / 2);
    const isFirstInRow = index % 2 === 0;
    if (rowIndex % 2 === 0) {
      return isFirstInRow ? "md:col-span-7" : "md:col-span-5";
    }
    return isFirstInRow ? "md:col-span-5" : "md:col-span-7";
  };

  const getAspectClass = (photo: CampusPhoto, index: number, total: number) => {
    const isFullRow =
      total === 1 ||
      photo.aspect === "wide" ||
      (total % 2 === 1 && index === total - 1);
    if (isFullRow) return "aspect-[16/10] md:aspect-[16/9]";
    return "aspect-[4/3] md:aspect-auto md:h-[420px]";
  };

  return (
    <div>
      {/* Header & Category Filter */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-[var(--foreground)] sm:text-[34px]">
            校园光影
          </h2>
          <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-[var(--muted)]">
            点击任意画面可全屏浏览。后续将持续收录在校园里随手拍下的山海、建筑与季节变化。
          </p>
        </div>

        <div
          role="tablist"
          aria-label="校园风景分类筛选"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(null);
                }}
                className={`rounded-full px-4 py-1.5 text-[13px] transition-colors duration-200 cursor-pointer ${
                  active
                    ? "bg-[var(--sysu-green)] font-medium text-white dark:bg-[#57c482] dark:text-[#041c0d]"
                    : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                }`}
              >
                {category === "All" ? "全部" : category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Editorial Photo Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
        {filteredPhotos.map((photo, index) => (
          <figure
            key={photo.id}
            className={`group flex flex-col ${getGridSpanClass(
              photo,
              index,
              filteredPhotos.length
            )}`}
          >
            <button
              type="button"
              onClick={() => openLightbox(index)}
              aria-label={`全屏查看 ${photo.title}`}
              className={`relative block w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-left cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sysu-green-ink)] ${getAspectClass(
                photo,
                index,
                filteredPhotos.length
              )}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />

              {/* Top-right subtle expand affordance on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100"
              >
                <Expand className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>

              {photo.isSample && (
                <span className="pointer-events-none absolute top-3.5 left-3.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium tracking-[0.02em] text-white/95 backdrop-blur-md">
                  意境预览
                </span>
              )}
            </button>

            <figcaption className="mt-3.5 flex items-baseline justify-between gap-4 px-0.5">
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--foreground)]">
                  {photo.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
                  {photo.caption}
                </p>
              </div>
              <span className="hidden shrink-0 items-center gap-1 text-[12px] text-[var(--muted)] sm:inline-flex">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                {photo.location}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {activePhoto && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/92 p-4 text-white backdrop-blur-xl sm:p-8"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex w-full max-w-[1200px] items-center justify-between"
            >
              <span className="font-mono text-[12px] text-white/70">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="关闭大图预览"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            {/* Main Image Frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto my-4 flex w-full max-w-[1120px] flex-1 items-center justify-center"
            >
              {filteredPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="上一张照片"
                  className="absolute left-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer sm:left-2"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
                </button>
              )}

              <motion.div
                key={activePhoto.id}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.28, ease: APPLE_EASE }}
                className="relative h-[68vh] w-full max-w-[960px]"
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="95vw"
                  className="object-contain"
                />
              </motion.div>

              {filteredPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="下一张照片"
                  className="absolute right-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 cursor-pointer sm:right-2"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex w-full max-w-[960px] flex-col justify-between gap-2 border-t border-white/15 pt-4 sm:flex-row sm:items-end"
            >
              <div>
                <h3 className="text-[16px] font-semibold text-white">
                  {activePhoto.title}
                </h3>
                <p className="mt-1 text-[13px] text-white/75">
                  {activePhoto.caption}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-[12px] text-white/65">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {activePhoto.location}
                </span>
                {activePhoto.takenAt && <span>{activePhoto.takenAt}</span>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
