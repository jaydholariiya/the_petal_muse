"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Sparkles,
  Maximize2,
  Play,
  Pause,
  LayoutGrid,
  Layers,
  MessageCircle,
} from "lucide-react";
import { SITE_CONTENT, CreationItem } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function CreationsGallery() {
  const { galleryCategories, creations } = SITE_CONTENT;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Mobile Exclusive State: Spotlight Story vs Lookbook Grid
  const [mobileViewMode, setMobileViewMode] = useState<"slideshow" | "grid">("slideshow");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isSlidePlaying, setIsSlidePlaying] = useState(true);
  const [slideProgressKey, setSlideProgressKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter creations based on selected chip
  const filteredItems = creations.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  // Reset slide index on category change
  useEffect(() => {
    setActiveSlideIndex(0);
    setSlideProgressKey((k) => k + 1);
  }, [selectedCategory]);

  // Slideshow auto-advance timer for mobile
  useEffect(() => {
    if (mobileViewMode !== "slideshow" || !isSlidePlaying || filteredItems.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % filteredItems.length);
      setSlideProgressKey((k) => k + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, [mobileViewMode, isSlidePlaying, filteredItems.length, activeSlideIndex]);

  const currentSlide = filteredItems[activeSlideIndex] || filteredItems[0];

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % filteredItems.length);
    setSlideProgressKey((k) => k + 1);
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    setSlideProgressKey((k) => k + 1);
  };

  const activeLightboxItem: CreationItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] || null : null;

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(
      (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  // Lock body scroll and add keyboard navigation when lightbox is active
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveLightboxIndex(null);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeLightboxIndex, filteredItems.length]);

  return (
    <section id="creations" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-6 sm:pb-8 mb-6 sm:mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
              The Bloom Archive
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
            Curated Creations &amp; <br />
            <span className="italic font-serif text-mulberry-wine">Botanical Artworks</span>
          </h2>
        </div>

        <p className="mt-3 md:mt-0 font-sans text-xs sm:text-sm md:text-base text-ink-aubergine/70 max-w-sm leading-relaxed">
          Each piece is a singular living composition tailored to light, architecture, and personal narrative.
        </p>
      </div>

      {/* MOBILE EXCLUSIVE: Architectural Symmetrical Category Selector (Zero Ragged Wrapping) */}
      <div className="md:hidden w-full mb-6">
        <div className="grid grid-cols-2 gap-2 w-full">
          {/* All Creations - Full width hero tile */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`col-span-2 py-2.5 px-3.5 rounded-xl text-xs font-sans uppercase tracking-[0.16em] font-medium transition-all duration-300 flex items-center justify-between border ${
              selectedCategory === "all"
                ? "bg-ink-aubergine text-butter-cream border-ink-aubergine shadow-sm"
                : "bg-white/70 text-ink-aubergine/80 border-ink-aubergine/15 hover:bg-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === "all" ? "bg-marigold-glow animate-pulse" : "bg-ink-aubergine/30"}`} />
              <span>All Creations</span>
            </span>
            <span className={`text-[10px] font-sans tracking-widest ${selectedCategory === "all" ? "text-apricot-blush" : "text-ink-aubergine/45"}`}>
              {creations.length} Works
            </span>
          </button>

          {/* 4 Category Tiles in Perfect 2x2 Symmetry */}
          {galleryCategories.filter(c => c.id !== "all").map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = creations.filter(item => item.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 px-3 rounded-xl text-left border transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? "bg-ink-aubergine text-butter-cream border-ink-aubergine shadow-sm"
                    : "bg-white/60 text-ink-aubergine/80 border-ink-aubergine/15 hover:bg-white"
                }`}
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <span className="text-[10px] font-sans uppercase tracking-[0.12em] font-medium truncate">
                    {cat.label}
                  </span>
                  <span className={`text-[8.5px] font-sans ${isActive ? "text-apricot-blush" : "text-ink-aubergine/45"}`}>
                    {count} creations
                  </span>
                </div>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-marigold-glow" : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP EXCLUSIVE: Elegant Horizontal Pill Row (100% Untouched) */}
      <div className="hidden md:flex items-center gap-2 mb-12">
        {galleryCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 ${
                isActive
                  ? "bg-ink-aubergine text-butter-cream shadow-md"
                  : "bg-ink-aubergine/5 text-ink-aubergine/70 hover:bg-ink-aubergine/10"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* MOBILE EXCLUSIVE: View Mode Switcher (Spotlight Story vs 2-Col Grid) */}
      <div className="md:hidden flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-white/70 backdrop-blur-md border border-ink-aubergine/10 shadow-sm mb-5">
        <button
          onClick={() => setMobileViewMode("slideshow")}
          className={`flex-1 py-2 px-3 rounded-xl text-[10.5px] font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileViewMode === "slideshow"
              ? "bg-ink-aubergine text-butter-cream shadow-md"
              : "text-ink-aubergine/70 hover:text-ink-aubergine"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
          <span>Cinematic Spotlight</span>
        </button>

        <button
          onClick={() => setMobileViewMode("grid")}
          className={`flex-1 py-2 px-3 rounded-xl text-[10.5px] font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileViewMode === "grid"
              ? "bg-ink-aubergine text-butter-cream shadow-md"
              : "text-ink-aubergine/70 hover:text-ink-aubergine"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5 text-apricot-blush" />
          <span>2-Col Lookbook</span>
        </button>
      </div>

      {/* MOBILE EXCLUSIVE: 1. CINEMATIC SPOTLIGHT STORY SLIDESHOW */}
      {mobileViewMode === "slideshow" && currentSlide && (
        <div className="md:hidden w-full mb-8 flex flex-col">
          {/* Main Arched Architectural Story Card */}
          <div
            className="relative w-full rounded-t-[44px] rounded-b-3xl overflow-hidden aspect-[4/5] bg-ink-aubergine shadow-2xl border border-ink-aubergine/15 select-none"
            onTouchStart={() => setIsSlidePlaying(false)}
            onTouchEnd={() => setIsSlidePlaying(true)}
            onMouseDown={() => setIsSlidePlaying(false)}
            onMouseUp={() => setIsSlidePlaying(true)}
          >
            {/* Crossfading Ken Burns Artwork Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-${currentSlide.id}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle Vignette & Gradient Shadows */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine via-ink-aubergine/35 to-ink-aubergine/50 pointer-events-none" />

            {/* Top Story Progress Bars (Instagram/Editorial Luxury Style) */}
            <div className="absolute top-3.5 inset-x-3.5 z-30 flex items-center gap-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={`bar-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlideIndex(idx);
                    setSlideProgressKey((k) => k + 1);
                  }}
                  className="relative flex-1 h-1 rounded-full overflow-hidden bg-white/25 active:scale-95 transition-all"
                  aria-label={`Jump to slide ${idx + 1}`}
                >
                  {idx < activeSlideIndex && (
                    <div className="absolute inset-0 bg-marigold-glow" />
                  )}
                  {idx === activeSlideIndex && (
                    <motion.div
                      key={`progress-${slideProgressKey}-${activeSlideIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isSlidePlaying ? "100%" : "0%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                      className="h-full bg-marigold-glow"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Top Badges & Controls Header */}
            <div className="absolute top-7 inset-x-3.5 z-20 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[8.5px] uppercase font-sans tracking-widest bg-ink-aubergine/70 backdrop-blur-md text-butter-cream border border-white/15 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
                <span>{currentSlide.categoryLabel}</span>
              </span>

              <div className="flex items-center gap-1.5 bg-ink-aubergine/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[8.5px] font-sans uppercase tracking-widest text-butter-cream">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSlidePlaying(!isSlidePlaying);
                  }}
                  aria-label={isSlidePlaying ? "Pause slideshow" : "Play slideshow"}
                  className="hover:text-marigold-glow transition-colors"
                >
                  {isSlidePlaying ? (
                    <Pause className="w-2.5 h-2.5 fill-butter-cream" />
                  ) : (
                    <Play className="w-2.5 h-2.5 fill-butter-cream" />
                  )}
                </button>
                <span className="text-butter-cream/60 font-medium">
                  {String(activeSlideIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Touch Zones: Left 35% for Prev, Right 65% for Next (No Horizontal Page Overflow!) */}
            <div
              onClick={handlePrevSlide}
              className="absolute left-0 top-16 bottom-28 w-[35%] z-10 cursor-pointer"
              title="Previous artwork"
            />
            <div
              onClick={handleNextSlide}
              className="absolute right-0 top-16 bottom-28 w-[65%] z-10 cursor-pointer"
              title="Next artwork"
            />

            {/* Bottom Story Content & Actions */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 flex flex-col justify-end text-butter-cream pointer-events-none">
              <span className="text-[9px] tracking-[0.25em] uppercase text-apricot-blush font-sans block">
                {currentSlide.season || "Bespoke Collection"}
              </span>

              <h3 className="font-serif text-xl sm:text-2xl font-light leading-snug mt-0.5 text-butter-cream">
                {currentSlide.title}
              </h3>

              <p className="mt-1 text-xs text-butter-cream/80 font-sans font-light line-clamp-2 leading-relaxed">
                {currentSlide.caption}
              </p>

              {/* Botanicals Tags */}
              {currentSlide.botanicals && currentSlide.botanicals.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {currentSlide.botanicals.map((botanical, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2 py-0.5 rounded-full text-[9px] font-sans bg-white/15 backdrop-blur-md text-butter-cream/90 border border-white/10"
                    >
                      {botanical}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between gap-2 pointer-events-auto">
                <a
                  href={buildWhatsAppUrl({
                    occasion: currentSlide.categoryLabel,
                    notes: `Hello Jensi! I loved "${currentSlide.title}" from your Bloom Archive and want to enquire about a bespoke creation like this.`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-full bg-[#25D366] text-white font-sans text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3 h-3 fill-white stroke-none" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <button
                  onClick={() => setActiveLightboxIndex(activeSlideIndex)}
                  className="py-2 px-3 rounded-full bg-white/20 backdrop-blur-md text-butter-cream font-sans text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 border border-white/20 active:scale-95 transition-all hover:bg-white/30"
                >
                  <Maximize2 className="w-3 h-3 text-marigold-glow" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Indicator Below Spotlight */}
          <div className="flex items-center justify-between mt-2 px-2 text-[9.5px] font-sans text-ink-aubergine/60">
            <span>← Tap left for prev</span>
            <span className="font-serif italic text-mulberry-wine font-medium">
              THE PETAL MUSE • {currentSlide.title}
            </span>
            <span>Tap right for next →</span>
          </div>
        </div>
      )}

      {/* MOBILE EXCLUSIVE: 2. DOWNWARD FLOWING 2-COLUMN LOOKBOOK */}
      {mobileViewMode === "grid" && (
        <div className="grid md:hidden grid-cols-2 gap-3 w-full mb-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`mobile-grid-${item.id}`}
              onClick={() => setActiveLightboxIndex(index)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-ink-aubergine cursor-pointer group border border-ink-aubergine/10 flex flex-col justify-end"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Subtle Gradient Shade for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/90 via-ink-aubergine/30 to-transparent" />

              {/* Category Pill Tag */}
              <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full text-[8px] uppercase font-sans tracking-widest bg-ink-aubergine/60 backdrop-blur-md text-butter-cream border border-white/10">
                {item.categoryLabel}
              </div>

              {/* Details at bottom */}
              <div className="relative z-10 p-2.5 text-butter-cream">
                <span className="text-[8px] tracking-[0.2em] uppercase text-apricot-blush block font-sans">
                  {item.season || "Bespoke Creation"}
                </span>
                <h3 className="font-serif text-sm font-light leading-snug mt-0.5 line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-1 text-[8px] font-sans text-marigold-glow">
                  <span className="flex items-center gap-0.5 uppercase tracking-wider">
                    <Maximize2 className="w-2 h-2" /> Expand
                  </span>
                  <span className="text-butter-cream/40">0{index + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* DESKTOP ARCHITECTURAL EDITORIAL GALLERY — Unique, High-Fashion, Gapless */}
      <div
        className={`hidden md:grid gap-6 sm:gap-8 md:gap-10 w-full min-w-0 ${
          filteredItems.length === 2
            ? "max-w-5xl mx-auto grid-cols-2"
            : filteredItems.length === 1
            ? "max-w-md mx-auto grid-cols-1"
            : "grid-cols-12"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            // Dynamic high-fashion 12-column editorial spans for "All Creations"
            let colSpan = "col-span-12 lg:col-span-4";
            let aspectClass = "aspect-[4/5]";

            if (filteredItems.length === creations.length) {
              if (index === 0) {
                // Monumental Hero Installation
                colSpan = "col-span-12 lg:col-span-7";
                aspectClass = "aspect-[16/11]";
              } else if (index === 1) {
                // Editorial Bridal Oval
                colSpan = "col-span-12 lg:col-span-5";
                aspectClass = "aspect-[4/5]";
              } else {
                // Balanced 3-column rows (4 + 4 + 4 = 12 cols)
                colSpan = "col-span-12 md:col-span-6 lg:col-span-4";
                aspectClass = "aspect-[4/5]";
              }
            } else if (filteredItems.length === 2) {
              colSpan = "col-span-1";
              aspectClass = "aspect-[4/5]";
            }

            const maskClass =
              item.maskShape === "arch"
                ? "rounded-t-[80px] rounded-b-3xl"
                : item.maskShape === "oval"
                ? "rounded-[80px]"
                : "rounded-3xl";

            return (
              <motion.div
                key={`desktop-${item.id}`}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
                onClick={() => setActiveLightboxIndex(index)}
                className={`group relative cursor-pointer w-full min-w-0 ${colSpan}`}
                data-cursor="VIEW"
              >
                {/* Image Container with Architectural Mask Silhouette */}
                <div
                  className={`relative w-full overflow-hidden bg-ink-aubergine/5 shadow-lg group-hover:shadow-2xl transition-all duration-700 ${aspectClass} ${maskClass}`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-106"
                  />

                  {/* Gentle Gradient Shade from Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/95 via-ink-aubergine/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Archival Catalog Number Disc at Top Left (Never Clips, Perfectly Symmetrical) */}
                  <div className="absolute top-5 left-5 z-10 w-8 h-8 rounded-full bg-ink-aubergine/60 backdrop-blur-md text-butter-cream text-[10px] font-sans font-semibold tracking-wider flex items-center justify-center border border-white/15 shadow-sm group-hover:border-marigold-glow/50 transition-colors">
                    0{index + 1}
                  </div>

                  {/* Clean Bottom Editorial Content — Zero Text Overlap, Beautiful Hierarchy */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-10 flex flex-col justify-end text-butter-cream">
                    {/* Category Pill & Season in One Line (Always in Natural Document Flow) */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-apricot-blush font-sans font-medium">
                        {item.season || "Bespoke Collection"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-ink-aubergine/70 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase font-sans tracking-widest text-butter-cream border border-white/15 shrink-0 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5 text-marigold-glow" />
                        <span>{item.categoryLabel}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-light leading-snug line-clamp-1 group-hover:text-butter-cream transition-colors">
                      {item.title}
                    </h3>

                    {/* Caption */}
                    <p className="mt-1.5 text-xs text-butter-cream/80 font-sans font-light line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>

                    {/* Footer Action */}
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/15 text-xs font-sans">
                      <span className="flex items-center gap-1.5 text-marigold-glow uppercase tracking-widest text-[10px] font-medium group-hover:translate-x-1 transition-transform">
                        <Maximize2 className="w-3 h-3" /> Tap to view
                      </span>
                      <span className="text-butter-cream/50 text-[10px] uppercase tracking-widest">
                        THE PETAL MUSE
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Fullscreen Editorial Lightbox Modal (Rendered to document.body via Portal to escape all stacking contexts) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeLightboxItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setActiveLightboxIndex(null);
                }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-aubergine/95 backdrop-blur-2xl p-3 sm:p-6 md:p-10 select-none overflow-y-auto"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Fixed High-Contrast Close Button - Stays permanently visible above navbar & all elements */}
                <button
                  onClick={() => setActiveLightboxIndex(null)}
                  aria-label="Close image viewer"
                  className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ink-aubergine/90 text-butter-cream border border-white/25 hover:bg-white/20 flex items-center justify-center transition-all shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md active:scale-95"
                >
                  <X className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>

                {/* Prev / Next Controls (Desktop Only) */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous artwork"
                  className="hidden sm:flex fixed left-4 sm:left-6 z-[110] w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-ink-aubergine/80 text-butter-cream border border-white/20 hover:bg-white/20 items-center justify-center transition-all shadow-xl active:scale-95"
                >
                  <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next artwork"
                  className="hidden sm:flex fixed right-4 sm:right-6 z-[110] w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-ink-aubergine/80 text-butter-cream border border-white/20 hover:bg-white/20 items-center justify-center transition-all shadow-xl active:scale-95"
                >
                  <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>

                {/* Lightbox Content Container */}
                <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col lg:flex-row items-center gap-5 sm:gap-8 bg-ink-aubergine/90 p-4 sm:p-6 md:p-8 rounded-3xl border border-white/15 overflow-y-auto shadow-2xl my-auto">
                  {/* Artwork Image View */}
                  <div className="relative w-full lg:w-3/5 aspect-[16/11] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shrink-0">
                    <Image
                      src={activeLightboxItem.imageUrl}
                      alt={activeLightboxItem.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  {/* Artwork Editorial Details */}
                  <div className="w-full lg:w-2/5 flex flex-col text-butter-cream">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-marigold-glow" />
                        <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-apricot-blush">
                          {activeLightboxItem.categoryLabel}
                        </span>
                      </div>
                      
                      {/* Mobile In-Card Dismiss Pill */}
                      <button
                        onClick={() => setActiveLightboxIndex(null)}
                        className="lg:hidden text-[10px] font-sans uppercase tracking-widest text-butter-cream/60 bg-white/10 px-2.5 py-1 rounded-full border border-white/10"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light mt-2 sm:mt-3 leading-tight">
                      {activeLightboxItem.title}
                    </h3>

                    <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-sans font-light text-butter-cream/80 leading-relaxed">
                      {activeLightboxItem.caption}
                    </p>

                    {/* Botanicals / Ingredients */}
                    {activeLightboxItem.botanicals && activeLightboxItem.botanicals.length > 0 && (
                      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.25em] text-butter-cream/50">
                          Curated Botanicals
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                          {activeLightboxItem.botanicals.map((botanical, bIdx) => (
                            <span
                              key={bIdx}
                              className="px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-xs font-sans bg-white/10 text-butter-cream/90"
                            >
                              {botanical}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Outbound Instagram Link & Enquire */}
                    <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={activeLightboxItem.instagramUrl || SITE_CONTENT.brand.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-marigold-glow hover:underline"
                      >
                        <Instagram className="w-4 h-4" />
                        <span>View on Instagram</span>
                      </a>

                      <a
                        href="#contact"
                        onClick={() => setActiveLightboxIndex(null)}
                        className="text-xs uppercase font-sans tracking-widest text-butter-cream/70 hover:text-butter-cream"
                      >
                        Enquire About This →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
