"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Instagram,
  CalendarHeart,
  ChevronLeft,
  ChevronRight,
  Gift,
  ArrowRight,
  Play,
  Pause,
  Compass,
  HeartHandshake,
  Heart,
  Cake,
  GraduationCap,
  Sparkle,
} from "lucide-react";
import { SITE_CONTENT, OccasionItem } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { buildWhatsAppUrl, openInstagramInquiry } from "@/lib/utils";

function getSafeImageUrl(url?: string, fallback: string = "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1200&q=85") {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (trimmed.includes("behance.net/gallery/")) return fallback;
  return trimmed;
}

// Category slug to readable label and emoji icon mapping
const CATEGORY_MAP: Record<string, { label: string; icon: string }> = {
  "magazine": { label: "Editorial Keepsake Magazines", icon: "📖" },
  "bouquets": { label: "Artisanal & Bridal Bouquets", icon: "💐" },
  "photo-frames": { label: "Botanical & Baby Footprint Frames", icon: "🖼️" },
  "chocolate-bouquets": { label: "Artisan Chocolate Bouquets", icon: "🍫" },
  "hamper-boxes": { label: "Three-Part Luxury Hampers", icon: "🎁" },
  "pipe-cleaner-frames": { label: "Pipe Cleaner Art & Bouquets", icon: "🧸" },
  "desk-decor": { label: "Atelier Botanical Desk Decor", icon: "🪴" },
  "mobile-covers": { label: "Pressed Flower Phone Cases", icon: "📱" },
  "vintage-frames": { label: "Antique Vintage Frames", icon: "🏛️" },
  "glitter-frames": { label: "Luminous Glitter Frames", icon: "✨" },
  "decorative-baskets": { label: "Decorative Meadow Baskets", icon: "🧺" },
  "flower-cards": { label: "Polaroid Albums & Cards", icon: "💌" },
  "combo-gifts": { label: "Customized Combo Suites", icon: "⚜️" },
  "chocolate-arrangements": { label: "Deluxe Chocolate Towers", icon: "🍰" },
  "celebration-cards": { label: "Archival Milestone Cards", icon: "📜" },
};

// Occasion icons for tab badges
const OCCASION_ICONS: Record<string, React.ReactNode> = {
  "occ-birthday": <Cake className="w-3.5 h-3.5 text-marigold-glow" />,
  "occ-anniversary": <Heart className="w-3.5 h-3.5 text-rose-300" />,
  "occ-valentines": <Heart className="w-3.5 h-3.5 text-red-400" />,
  "occ-friendship": <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />,
  "occ-proposal": <Sparkles className="w-3.5 h-3.5 text-yellow-300" />,
  "occ-wedding": <CalendarHeart className="w-3.5 h-3.5 text-pink-300" />,
  "occ-graduation": <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />,
  "occ-festive": <Sparkle className="w-3.5 h-3.5 text-amber-400" />,
  "occ-justbecause": <Compass className="w-3.5 h-3.5 text-teal-300" />,
  "occ-personalized": <Gift className="w-3.5 h-3.5 text-purple-300" />,
};

export default function OccasionCollections() {
  const { settings } = useAtelierContent();
  const enableWhatsApp = settings?.["enable_whatsapp"] !== undefined
    ? settings["enable_whatsapp"] === "true"
    : Boolean(SITE_CONTENT.brand.enableWhatsApp);
  let occasionCollections = SITE_CONTENT.occasionCollections;
  if (settings["occasions_data"]) {
    try {
      const parsed = JSON.parse(settings["occasions_data"]);
      if (parsed && Array.isArray(parsed.occasions)) {
        occasionCollections = {
          ...occasionCollections,
          ...parsed,
          occasions: parsed.occasions,
        };
      } else if (Array.isArray(parsed)) {
        occasionCollections = {
          ...occasionCollections,
          occasions: parsed,
        };
      }
    } catch {
      occasionCollections = SITE_CONTENT.occasionCollections;
    }
  }

  const { occasions } = occasionCollections;
  const [activeOccasionIndex, setActiveOccasionIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const activeOccasion: OccasionItem = occasions[activeOccasionIndex] || occasions[0];

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveOccasionIndex((prev) => (prev === occasions.length - 1 ? 0 : prev + 1));
  }, [occasions.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActiveOccasionIndex((prev) => (prev === 0 ? occasions.length - 1 : prev - 1));
  }, [occasions.length]);

  // Auto-center active tab in horizontal dock (only scroll horizontal dock container, NEVER the window)
  const isOccasionMountRef = useRef(true);

  useEffect(() => {
    // Skip on initial page mount/refresh so window never jumps down
    if (isOccasionMountRef.current) {
      isOccasionMountRef.current = false;
      return;
    }

    if (activeTabRef.current && trackRef.current) {
      const container = trackRef.current;
      const tab = activeTabRef.current;
      const scrollLeft = tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeOccasionIndex]);

  // Optional subtle auto-story playback
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, goToNext]);

  // Slide transition variants for animated experience
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 32 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      id="occasions"
      className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden w-full min-w-0"
    >
      {/* ------------------------------------------------------------------- */}
      {/* SECTION HEADER                                                      */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-5 sm:pb-8 mb-6 sm:mb-10 w-full min-w-0 gap-4">
        <div className="w-full md:w-auto min-w-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
              Every Significant Chapter
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
            Gifts for Every Occasion – <br className="hidden sm:inline" />
            <span className="italic font-serif text-mulberry-wine">10 Curated Milestones</span>
          </h2>
        </div>

        <p className="mt-2 md:mt-0 font-sans text-xs sm:text-sm md:text-base text-ink-aubergine/75 max-w-md leading-relaxed">
          From golden birthdays and romantic anniversaries to whispered proposals and spontaneous Tuesday love, each chapter has a bespoke botanical signature sculpted by Jensi Dholariya.
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* INTERACTIVE MILESTONE DOCK (Wrap-Friendly, Animated Active Pill)    */}
      {/* ------------------------------------------------------------------- */}
      <div className="mb-6 sm:mb-10 w-full min-w-0">
        <div className="flex items-center justify-between gap-2 mb-3 w-full min-w-0">
          {/* Mobile Single-Line Header (Zero Broken Wrapping) */}
          <div className="flex sm:hidden items-center gap-2 min-w-0">
            <Compass className="w-3.5 h-3.5 text-marigold-glow shrink-0" />
            <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-mulberry-wine font-semibold shrink-0">
              Milestone
            </span>
            <span className="text-ink-aubergine/30 font-light shrink-0">•</span>
            <span className="font-serif text-xs text-ink-aubergine font-medium truncate">
              {activeOccasion.name}
            </span>
          </div>

          {/* Desktop Eyebrow Title (sm and up) */}
          <span className="hidden sm:flex text-[10.5px] font-sans uppercase tracking-[0.2em] text-ink-aubergine/60 font-semibold items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-marigold-glow" />
            <span>Select Celebration Chapter:</span>
          </span>

          {/* Right Controls: Streamlined for Mobile, Complete on Desktop */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Auto-story toggle (Desktop & Tablet only) */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest text-ink-aubergine/70 hover:text-ink-aubergine bg-white/70 border border-ink-aubergine/10 hover:bg-white transition-all shadow-sm"
              title={isPlaying ? "Pause automated story" : "Play milestone story"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-2.5 h-2.5 text-mulberry-wine" />
                  <span>Story Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-2.5 h-2.5 text-ink-aubergine/60" />
                  <span>Auto Tour</span>
                </>
              )}
            </button>

            {/* Navigation Arrows (Desktop only — Mobile has large touch arrows inside the card) */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  goToPrev();
                }}
                aria-label="Previous occasion"
                className="w-7 h-7 rounded-full border border-ink-aubergine/15 bg-white/80 hover:bg-ink-aubergine hover:text-butter-cream text-ink-aubergine flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  goToNext();
                }}
                aria-label="Next occasion"
                className="w-7 h-7 rounded-full border border-ink-aubergine/15 bg-white/80 hover:bg-ink-aubergine hover:text-butter-cream text-ink-aubergine flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step Counter (Single Line, Never Wraps) */}
            <span className="text-[10px] sm:text-[10.5px] font-mono text-mulberry-wine bg-mulberry-wine/10 border border-mulberry-wine/20 px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shrink-0 whitespace-nowrap">
              {String(activeOccasionIndex + 1).padStart(2, "0")} / 10
            </span>
          </div>
        </div>

        {/* Milestone Pill Buttons — Single Continuous Horizontal Reel (Zero Wrap, Smooth Scroll) */}
        <div
          ref={trackRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1 -my-1 w-full min-w-0 touch-pan-x"
        >
          {occasions.map((occ: OccasionItem, idx: number) => {
            const isActive = idx === activeOccasionIndex;
            const icon = OCCASION_ICONS[occ.id] || <Gift className="w-3.5 h-3.5" />;

            return (
              <button
                key={occ.id}
                ref={isActive ? activeTabRef : null}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setDirection(idx > activeOccasionIndex ? 1 : -1);
                  setActiveOccasionIndex(idx);
                }}
                className={`relative shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-sans tracking-[0.12em] uppercase transition-all duration-300 border flex items-center gap-2 ${
                  isActive
                    ? "bg-ink-aubergine text-butter-cream border-ink-aubergine shadow-sm z-10"
                    : "bg-white/85 text-ink-aubergine/75 border-ink-aubergine/15 hover:bg-white hover:text-ink-aubergine hover:border-ink-aubergine/30"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeOccasionIndicator"
                    className="absolute inset-0 rounded-full bg-ink-aubergine -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="shrink-0">{icon}</span>
                <span className="font-medium whitespace-nowrap">{occ.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* GRAND EDITORIAL CELEBRATION STAGE (Distinct Luxury Dark Aubergine)  */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#200D1C] via-[#2A1125] to-[#140612] border border-white/15 text-butter-cream p-4 sm:p-7 lg:p-10 min-h-[500px]">
        {/* Ambient Botanical Aura Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-marigold-glow/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mulberry-wine/30 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Prev / Next Arrow Navigation Controls */}
        <div className="absolute top-4 sm:top-7 right-4 sm:right-7 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goToPrev();
            }}
            aria-label="Previous occasion"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-butter-cream border border-white/20 flex items-center justify-center transition-all backdrop-blur-md active:scale-90 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
            aria-label="Next occasion"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-butter-cream border border-white/20 flex items-center justify-center transition-all backdrop-blur-md active:scale-90 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Occasion Stage Container */}
        <div className="relative z-10 w-full min-w-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeOccasion.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center w-full min-w-0"
            >
              {/* ----------------------------------------------------------- */}
              {/* LEFT: CINEMATIC PORTRAIT FRAME WITH ARCHITECTURAL SILHOUETTE */}
              {/* ----------------------------------------------------------- */}
              <div className="lg:col-span-5 relative w-full min-w-0">
                <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl bg-black/40 border border-white/20 group">
                  <Image
                    src={getSafeImageUrl(activeOccasion.imageUrl)}
                    alt={activeOccasion.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-106"
                  />

                  {/* Gradient Shadow Shading from Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85" />

                  {/* Top Left Archival Occasion Disc */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[9.5px] uppercase font-sans tracking-widest bg-ink-aubergine/85 text-butter-cream border border-white/20 backdrop-blur-md font-semibold">
                      Chapter #{String(activeOccasionIndex + 1).padStart(2, "0")} of {String(occasions.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom Portrait Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20 text-butter-cream">
                    <span className="text-[9.5px] uppercase font-sans tracking-[0.25em] text-marigold-glow block mb-1 font-semibold">
                      Curated Celebration Suite
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-butter-cream font-light leading-snug">
                      {activeOccasion.name}
                    </h4>

                    {/* Botanical Mood Indicator */}
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-sans text-apricot-blush">
                      <span className="w-2 h-2 rounded-full bg-marigold-glow animate-ping" />
                      <span className="truncate max-w-[240px]">
                        <strong>Mood:</strong> {activeOccasion.botanicalMood}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------- */}
              {/* RIGHT: THE BESPOKE GIFTING CONCIERGE & BLUEPRINT            */}
              {/* ----------------------------------------------------------- */}
              <div className="lg:col-span-7 flex flex-col justify-between w-full min-w-0 pt-1 lg:pt-0">
                <div>
                  {/* Eyebrow Header (Desktop only - mobile is clean and uncluttered) */}
                  <div className="hidden lg:flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
                    <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-[0.25em] text-marigold-glow font-medium">
                      Atelier Celebration Blueprint
                    </span>
                  </div>

                  {/* Grand Serif Title (Desktop only - photo overlay already displays title on mobile) */}
                  <h3 className="hidden lg:block font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-butter-cream leading-tight">
                    {activeOccasion.name}
                  </h3>

                  {/* Poetic Subtitle (Desktop only) */}
                  <p className="hidden lg:block mt-1.5 sm:mt-2 text-sm sm:text-base font-serif italic text-apricot-blush">
                    &ldquo;{activeOccasion.subtitle}&rdquo;
                  </p>

                  {/* Narrative Craft Description (Desktop only) */}
                  <p className="hidden lg:block mt-3 sm:mt-4 text-xs sm:text-sm font-sans text-butter-cream/80 leading-relaxed font-light">
                    {activeOccasion.description}
                  </p>

                  {/* ------------------------------------------------------- */}
                  {/* ATELIER GIFTING IDEA BLUEPRINT (Illuminated Gold Box)   */}
                  {/* ------------------------------------------------------- */}
                  <div className="mt-1 lg:mt-5 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-marigold-glow/10 rounded-full blur-xl pointer-events-none" />

                    <div className="flex items-center gap-2 mb-1.5 text-marigold-glow">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-[10px] sm:text-[10.5px] uppercase font-sans tracking-widest font-semibold">
                        Recommended Atelier Pairing:
                      </span>
                    </div>

                    <p className="text-xs sm:text-base font-serif text-butter-cream leading-snug font-normal pl-3 sm:pl-6 border-l-2 border-marigold-glow/50">
                      {activeOccasion.curatedIdea}
                    </p>
                  </div>

                  {/* ------------------------------------------------------- */}
                  {/* RECOMMENDED CATEGORIES (Desktop only - mobile has CTA)   */}
                  {/* ------------------------------------------------------- */}
                  <div className="hidden lg:block mt-5 pt-4 border-t border-white/15">
                    <h4 className="text-[10px] sm:text-[10.5px] uppercase font-sans tracking-widest text-butter-cream/65 font-semibold flex items-center gap-1.5 mb-2.5">
                      <Gift className="w-3.5 h-3.5 text-apricot-blush shrink-0" />
                      <span>Matching Repertoire Categories ({activeOccasion.recommendedCategories.length}):</span>
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {activeOccasion.recommendedCategories.map((slug: string, i: number) => {
                        const info = CATEGORY_MAP[slug] || {
                          label: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                          icon: "✨",
                        };

                        return (
                          <a
                            key={i}
                            href="#collections"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium bg-white/10 hover:bg-white/20 text-butter-cream border border-white/20 hover:border-marigold-glow/50 transition-all shadow-sm active:scale-95"
                          >
                            <span>{info.icon}</span>
                            <span>{info.label}</span>
                            <ArrowRight className="w-3 h-3 text-marigold-glow opacity-75" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* ACTION SUITE (Direct Inquiry & Repertoire CTA) */}
                {/* --------------------------------------------------------- */}
                <div className="mt-4 lg:mt-7 pt-3 lg:pt-5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  {enableWhatsApp ? (
                    <a
                      href={buildWhatsAppUrl({
                        occasion: activeOccasion.name,
                        notes: `Hello Jensi! I am looking for a special bespoke gift for an upcoming ${activeOccasion.name} from THE PETAL MUSE. Could you please share your curated recommendations and customization possibilities?`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 sm:py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-white stroke-none shrink-0" />
                      <span className="whitespace-nowrap">Enquire on WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        openInstagramInquiry({
                          occasion: activeOccasion.name,
                          title: activeOccasion.name,
                          details: `Hello Jensi! I am looking for a special bespoke gift for an upcoming ${activeOccasion.name} from THE PETAL MUSE. Could you please share your curated recommendations and customization possibilities?`,
                        })
                      }
                      className="flex-1 py-3 sm:py-3.5 px-6 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 active:scale-95"
                    >
                      <Instagram className="w-4 h-4 text-white shrink-0" />
                      <span className="whitespace-nowrap">Enquire via Instagram DM</span>
                    </button>
                  )}

                  <a
                    href="#collections"
                    className="py-2.5 sm:py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-butter-cream text-xs font-sans uppercase tracking-wider font-medium text-center border border-white/15 transition-all"
                  >
                    View All 15 Catalogs
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Interactive Progress Bar Line */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-marigold-glow via-apricot-blush to-mulberry-wine"
            animate={{ width: `${((activeOccasionIndex + 1) / occasions.length) * 100}%` }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
          />
        </div>
      </div>
    </section>
  );
}