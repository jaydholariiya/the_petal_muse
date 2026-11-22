"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  CheckCircle2,
  CalendarHeart,
  Maximize2,
  Palette,
  Film,
  Camera,
  Layers,
  ArrowRight,
  ShieldCheck,
  LayoutGrid,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Minimize2,
} from "lucide-react";
import { SITE_CONTENT } from "@/content/site";
import { CATALOG_WORKS, CatalogWorkItem } from "@/content/catalogWorks";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { buildWhatsAppUrl, openInstagramInquiry } from "@/lib/utils";
import Luxury3DCard from "@/components/ui/Luxury3DCard";

// Dynamically import Three.js atmospheric canvas for Runway
const RunwayParticlesCanvas = dynamic(() => import("./RunwayParticlesCanvas"), {
  ssr: false,
});

// Refined aesthetic short titles for the 15 categories (Matching User Priority 1 to 15)
const SHORT_TITLES: Record<string, string> = {
  "cat-01": "A4 Magazine",
  "cat-02": "Pipe Cleaner bouquet",
  "cat-03": "Cholocate bouquet",
  "cat-04": "bridal bouquet",
  "cat-05": "Vintage frame",
  "cat-06": "Frames",
  "cat-07": "Gliter Frames",
  "cat-08": "Celebration Cards",
  "cat-09": "Hampers",
  "cat-10": "Desk Decorations",
  "cat-11": "Flower Baskets",
  "cat-12": "Customize Combo",
  "cat-13": "Baby FootPrints",
  "cat-14": "Polaroid photo & albums",
  "cat-15": "Cholocate Basket",
};

function getSafeImageUrl(url?: string, fallback: string = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85") {
  if (!url || typeof url !== "string") return fallback;
  let trimmed = url.trim();
  // If user pasted a gallery page rather than direct image
  if (trimmed.includes("behance.net/gallery/")) {
    return fallback;
  }
  if (trimmed.toLowerCase().endsWith(".heic") && trimmed.includes("cloudinary.com")) {
    trimmed = trimmed.replace(/\.heic$/i, ".jpg");
  }
  return trimmed;
}

export default function CollectionsShowcase() {
  const { categories: dynamicCategories, catalogWorks } = useAtelierContent();
  const productCategories = dynamicCategories?.length > 0 ? dynamicCategories : SITE_CONTENT.productCategories;
  const [activeCategoryId, setActiveCategoryId] = useState<string>("cat-01");
  const [activeWorkItem, setActiveWorkItem] = useState<CatalogWorkItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFitMode, setIsFitMode] = useState<boolean>(false);
  const [showMobileSpecs, setShowMobileSpecs] = useState<boolean>(false);
  const [carouselScrollProgress, setCarouselScrollProgress] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setCarouselScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    setMounted(true);

    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveCategoryId(customEvent.detail);
        const el = document.getElementById("collections");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("selectCategory", handleSelectCategory);
    return () => window.removeEventListener("selectCategory", handleSelectCategory);
  }, []);

  // Smooth scroll 15 catalogs reel by offset
  const scrollCarousel = (dir: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  // Smooth scroll creations runway slider by offset
  const scrollSlider = (dir: number) => {
    if (sliderRef.current) {
      const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
      const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 380;
      sliderRef.current.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-center the active category capsule in the reel (only scroll reel container, NEVER the window)
  const isCollectionsMountRef = useRef(true);

  useEffect(() => {
    // Skip on initial page mount/refresh so window never jumps down
    if (isCollectionsMountRef.current) {
      isCollectionsMountRef.current = false;
      return;
    }

    if (activeItemRef.current && carouselRef.current) {
      const container = carouselRef.current;
      const item = activeItemRef.current;
      const scrollLeft = item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeCategoryId]);

  // Keyboard navigation when modal is open (Escape to close, Left/Right for slider)
  useEffect(() => {
    if (!activeWorkItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveWorkItem(null);
      } else if (e.key === "ArrowLeft") {
        setActiveSlideIndex((prev) => (prev === 0 ? 5 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveSlideIndex((prev) => (prev === 5 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeWorkItem]);

  // Find active category metadata
  const currentCategory =
    productCategories.find((cat) => cat.id === activeCategoryId) || productCategories[0];

  // Get works for the current category
  const currentWorks: CatalogWorkItem[] = catalogWorks[activeCategoryId] || [];

  const handleOpenWork = (work: CatalogWorkItem) => {
    setActiveWorkItem(work);
    setActiveSlideIndex(0);
    setShowMobileSpecs(false);
  };

  const handleOpenWorkAtSlide = (work: CatalogWorkItem, slideIndex: number) => {
    setActiveWorkItem(work);
    setActiveSlideIndex(slideIndex);
    setShowMobileSpecs(false);
  };

  const nextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev === 5 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev === 0 ? 5 : prev - 1));
  }, []);

  return (
    <section
      id="collections"
      className="relative pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto overflow-hidden w-full min-w-0"
    >
      {/* ------------------------------------------------------------------- */}
      {/* SECTION HEADER                                                      */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-3 sm:pb-4 mb-4 sm:mb-5 w-full min-w-0 gap-3">
        <div className="w-full md:w-auto min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-mulberry-wine font-medium">
              Signature Atelier Repertoire
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink-aubergine font-light leading-tight">
            Explore Our Atelier Works –{" "}
            <span className="italic font-serif text-mulberry-wine">Handcrafted Catalogs</span>
          </h2>
        </div>
        <p className="mt-1 md:mt-0 font-sans text-xs sm:text-sm text-ink-aubergine/70 max-w-md leading-relaxed hidden sm:block">
          Select any catalog below to explore genuine pieces sculpted by Jensi Dholariya. Click any creation to view the high-definition{" "}
          <strong className="text-ink-aubergine font-medium">5 Photos + 1 Studio Video</strong> presentation.
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 15 CATEGORIES: MOBILE TOUCH DRAWER + DESKTOP ARCHIVAL REEL           */}
      {/* ------------------------------------------------------------------- */}

      {/* MOBILE VIEW ONLY: Full-Width Catalog Selector Drawer (Zero Left-Right Slider) */}
      <div className="sm:hidden w-full mb-6 min-w-0">
        <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-ink-aubergine/60 font-semibold mb-2">
          <span>Active Catalog:</span>
          <span className="text-mulberry-wine font-medium">15 Collections</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileCatalogOpen(!isMobileCatalogOpen);
          }}
          className="w-full p-3 rounded-2xl bg-white border border-ink-aubergine/15 shadow-md flex items-center justify-between text-ink-aubergine active:scale-[0.99] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-marigold-glow/50 ring-1 ring-marigold-glow/30">
              <Image
                src={getSafeImageUrl(catalogWorks[activeCategoryId]?.[0]?.coverImage || currentCategory.imageUrl)}
                alt={currentCategory.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
                <span className="text-[9.5px] font-sans uppercase tracking-[0.16em] text-mulberry-wine font-semibold">
                  Edition {String(productCategories.findIndex((c) => c.id === activeCategoryId) + 1).padStart(2, "0")} of 15
                </span>
                <span className="text-[9px] font-sans px-2 py-0.5 rounded-full bg-mulberry-wine/10 text-mulberry-wine font-medium">
                  {currentWorks.length} works
                </span>
              </div>
              <span className="font-serif text-sm font-medium text-ink-aubergine truncate block">
                {SHORT_TITLES[activeCategoryId] || currentCategory.name.split("&")[0].trim()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-aubergine/5 border border-ink-aubergine/10 text-[10.5px] font-sans font-medium text-mulberry-wine shrink-0 ml-2">
            <span>{isMobileCatalogOpen ? "Close" : "Switch"}</span>
            {isMobileCatalogOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {/* Expanded Drawer: All 15 Catalogs in Clean 2-Column Vertical Touch Grid (Zero Left-Right Scroll!) */}
        <AnimatePresence>
          {isMobileCatalogOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-2.5 p-3 rounded-2xl bg-white border border-ink-aubergine/15 shadow-xl grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto overscroll-contain">
                {productCategories.map((cat, index) => {
                  const isActive = activeCategoryId === cat.id;
                  const catWorks = catalogWorks[cat.id] || [];
                  const displayTitle = SHORT_TITLES[cat.id] || cat.name.split("&")[0].trim();
                  const thumbnail = getSafeImageUrl(catWorks[0]?.coverImage || cat.imageUrl);

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCategoryId(cat.id);
                        setIsMobileCatalogOpen(false);
                      }}
                      className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${isActive
                        ? "bg-ink-aubergine text-butter-cream border-marigold-glow ring-1 ring-marigold-glow"
                        : "bg-ink-aubergine/5 text-ink-aubergine border-ink-aubergine/10 hover:bg-ink-aubergine/10"
                        }`}
                    >
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20">
                        <Image src={thumbnail} alt="" fill sizes="32px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[8.5px] opacity-75 block">№ {String(index + 1).padStart(2, "0")}</span>
                        <span className="text-[11px] font-sans font-medium truncate block leading-tight">
                          {displayTitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DESKTOP VIEW ONLY: Atelier Archival Reel (Single Line Horizontal Navigation) */}
      <div className="hidden sm:block mb-4 sm:mb-5 w-full min-w-0">
        {/* Archival reel control & status header */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-ink-aubergine font-semibold">
              Atelier Archival Reel
            </span>
            <span className="text-[9.5px] font-sans px-2 py-0.2 rounded-full bg-mulberry-wine/10 text-mulberry-wine border border-mulberry-wine/20 font-medium">
              15 Curated Editions
            </span>
          </div>

          {/* Unified Luxury Archival Controller */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 pl-3 rounded-full border border-ink-aubergine/15 shadow-xs">
            <div className="flex items-center gap-1.5 pr-2 border-r border-ink-aubergine/10">
              <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
              <span className="text-[9px] font-sans uppercase tracking-[0.16em] text-mulberry-wine font-semibold">
                Edition
              </span>
              <span className="font-serif text-sm font-semibold text-ink-aubergine ml-0.5">
                {String(productCategories.findIndex((c) => c.id === activeCategoryId) + 1).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-sans text-ink-aubergine/40">/</span>
              <span className="text-xs font-serif text-ink-aubergine/60">15</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                scrollCarousel(-1);
              }}
              aria-label="Scroll left through catalogs"
              className="w-6 h-6 rounded-full bg-ink-aubergine/5 hover:bg-ink-aubergine hover:text-butter-cream text-ink-aubergine flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                scrollCarousel(1);
              }}
              aria-label="Scroll right through catalogs"
              className="w-6 h-6 rounded-full bg-ink-aubergine/5 hover:bg-ink-aubergine hover:text-butter-cream text-ink-aubergine flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Single continuous horizontal track on desktop */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 w-full min-w-0"
        >
          {productCategories.map((cat, index) => {
            const isActive = activeCategoryId === cat.id;
            const catWorks = catalogWorks[cat.id] || [];
            const count = catWorks.length;
            const categoryNumber = String(index + 1).padStart(2, "0");
            const displayTitle = SHORT_TITLES[cat.id] || cat.name.split("&")[0].trim();
            const thumbnail = getSafeImageUrl(catWorks[0]?.coverImage || cat.imageUrl);

            return (
              <button
                key={cat.id}
                ref={isActive ? activeItemRef : null}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategoryId(cat.id);
                }}
                className={`group relative flex-shrink-0 flex items-center gap-3 rounded-2xl p-2 pr-4 transition-all duration-300 text-left cursor-pointer border ${isActive
                  ? "bg-gradient-to-r from-ink-aubergine via-ink-aubergine to-[#3d182b] text-butter-cream border-marigold-glow/80 shadow-md shadow-ink-aubergine/15 ring-1 ring-marigold-glow/40"
                  : "bg-white/90 text-ink-aubergine/80 border-ink-aubergine/12 hover:bg-white hover:text-ink-aubergine hover:border-ink-aubergine/30 hover:shadow-sm"
                  }`}
              >
                <div
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0 border transition-all duration-300 ${isActive
                    ? "border-marigold-glow ring-2 ring-marigold-glow/40 shadow-sm"
                    : "border-ink-aubergine/15 group-hover:border-ink-aubergine/30"
                    }`}
                >
                  <Image
                    src={thumbnail}
                    alt={displayTitle}
                    fill
                    sizes="48px"
                    className={`object-cover transition-transform duration-500 ${isActive ? "scale-105" : "group-hover:scale-110"
                      }`}
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-marigold-glow/10 pointer-events-none" />
                  )}
                </div>

                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-marigold-glow animate-pulse" : "bg-ink-aubergine/25"
                        }`}
                    />
                    <span
                      className={`font-mono text-[9.5px] uppercase tracking-wider font-semibold ${isActive ? "text-marigold-glow" : "text-ink-aubergine/50"
                        }`}
                    >
                      № {categoryNumber}
                    </span>
                    <span
                      className={`text-[9px] font-sans px-1.5 py-0.2 rounded-full font-medium ml-auto ${isActive
                        ? "bg-marigold-glow/20 text-marigold-glow border border-marigold-glow/30"
                        : "bg-ink-aubergine/8 text-ink-aubergine/60"
                        }`}
                    >
                      {count} {count === 1 ? "work" : "works"}
                    </span>
                  </div>

                  <span
                    className={`text-xs sm:text-[13px] font-medium font-sans whitespace-nowrap tracking-wide leading-tight transition-colors ${isActive ? "text-butter-cream" : "text-ink-aubergine group-hover:text-mulberry-wine"
                      }`}
                  >
                    {displayTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Haute Couture Golden Scroll Track (Visual indicator for 15 categories) */}
        <div className="w-full flex items-center justify-between gap-4 mt-2 px-1">
          <div className="flex-1 h-1.5 bg-ink-aubergine/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-300 via-marigold-glow to-amber-500 rounded-full transition-all duration-150 shadow-sm"
              style={{
                width: `${Math.max(14, carouselScrollProgress)}%`,
                marginLeft: `${(carouselScrollProgress * 0.86).toFixed(1)}%`,
              }}
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-aubergine/70 shrink-0 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span>Edition {String(productCategories.findIndex((c) => c.id === activeCategoryId) + 1).padStart(2, "0")} of 15</span>
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* ATELIER CREATIONS RUNWAY SLIDER (Main Feature: Grand Editorial Cards) */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative w-full min-w-0 mb-8 sm:mb-12">
        {/* 1. Three.js Auto-Magic Stardust Atmosphere */}
        <RunwayParticlesCanvas />

        {/* Sleek Minimalist Controls Header */}
        <div className="relative z-10 flex items-center justify-between gap-3 mb-4 sm:mb-5 pb-3 border-b border-ink-aubergine/10 w-full min-w-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-marigold-glow animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.22em] text-mulberry-wine font-semibold shrink-0">
              Runway
            </span>
            <span className="text-ink-aubergine/30 font-light shrink-0 hidden xs:inline">•</span>
            <h4 className="font-serif text-lg sm:text-2xl text-ink-aubergine font-normal truncate">
              {SHORT_TITLES[activeCategoryId] || currentCategory.name.split("&")[0].trim()}
            </h4>
            {currentCategory.badge && (
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] uppercase font-sans tracking-widest bg-mulberry-wine/10 text-mulberry-wine border border-mulberry-wine/20 font-medium">
                <Sparkles className="w-2.5 h-2.5 text-marigold-glow" />
                <span>{currentCategory.badge}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-[10px] sm:text-xs font-sans px-3 py-1 rounded-full bg-mulberry-wine/10 text-mulberry-wine border border-mulberry-wine/20 font-medium shrink-0">
              {currentWorks.length} {currentWorks.length === 1 ? "Piece" : "Pieces"}
            </span>

            {/* Navigation Arrows for Runway Slider — ONLY on Desktop where runway is horizontal slider */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-sans text-ink-aubergine/60 mr-1">
                Swipe or use arrows to explore
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollSlider(-1);
                }}
                aria-label="Previous creation"
                className="w-8 h-8 rounded-full border border-ink-aubergine/20 bg-white/90 hover:bg-ink-aubergine hover:text-butter-cream text-ink-aubergine flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollSlider(1);
                }}
                aria-label="Next creation"
                className="w-8 h-8 rounded-full border border-ink-aubergine/20 bg-white/90 hover:bg-ink-aubergine hover:text-butter-cream text-ink-aubergine flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DUAL-DISPLAY: DESKTOP HORIZONTAL RUNWAY SLIDER + MOBILE VERTICAL STREAM (NO LEFT-RIGHT SCROLL) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`runway-${activeCategoryId}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 w-full min-w-0"
          >
            {/* DESKTOP VIEW ONLY (>= 640px): Panoramic Runway Slider with Arrows */}
            <div className="hidden sm:block w-full min-w-0">
              <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-3 px-0 w-full min-w-0"
              >
                {currentWorks.map((work, index) => {
                  const itemNumber = String(index + 1).padStart(2, "0");

                  return (
                    <Luxury3DCard
                      key={work.id}
                      tiltIntensity={8}
                      roundedClassName="rounded-tl-[3.8rem] rounded-br-[3.8rem] rounded-tr-[1.2rem] rounded-bl-[1.2rem]"
                      className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] aspect-[3/4.2] shrink-0 snap-start select-none cursor-pointer"
                      onClick={() => handleOpenWork(work)}
                    >
                      {/* Organic Botanical Petal Silhouette & Archival Passepartout */}
                      <div className="relative w-full h-full rounded-tl-[3.8rem] rounded-br-[3.8rem] rounded-tr-[1.2rem] rounded-bl-[1.2rem] overflow-hidden bg-[#100314] group border border-[#E5D7C3]/25">
                        {/* 1. Authentic Masterpiece Photography */}
                        <Image
                          src={getSafeImageUrl(work.coverImage)}
                          alt={work.title}
                          fill
                          sizes="400px"
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                        />

                        {/* 2. Archival Atelier Legibility Vignette (Bottom-only for text, top is 100% crystal clear & bright) */}
                        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#0B020E]/95 via-[#0B020E]/50 to-transparent pointer-events-none" />

                        {/* 3. Asymmetric Petal Gilded Inner Hairline */}
                        <div className="absolute inset-2.5 rounded-tl-[3.3rem] rounded-br-[3.3rem] rounded-tr-[0.8rem] rounded-bl-[0.8rem] border border-white/15 group-hover:border-[#E5D7C3]/50 transition-colors pointer-events-none z-10" />

                        {/* 4. Top Badges */}
                        <div
                          className="absolute top-5 left-5 z-20 w-8 h-8 rounded-full bg-[#18081C]/90 backdrop-blur-md text-white text-[10px] font-sans font-semibold tracking-wider flex items-center justify-center border border-[#E5D7C3]/35 shadow-sm group-hover:border-[#E5D7C3]/70 transition-colors"
                        >
                          {itemNumber}
                        </div>

                        <div
                          className="absolute top-5 right-5 z-20"
                        >
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8.5px] uppercase font-sans tracking-widest bg-[#18081C]/90 backdrop-blur-md text-[#FFF8EE] border border-[#E5D7C3]/35 shadow-sm font-medium">
                            <Sparkles className="w-2.5 h-2.5 text-[#E8DEC8]" />
                            <span>{work.badge || "Signature Piece"}</span>
                          </span>
                        </div>

                        {/* 5. Center Interactive Hover Lens: "Explore" Only (Compact, No Overflow) */}
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none"
                        >
                          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#140618]/95 backdrop-blur-md text-white border border-[#E5D7C3]/60 shadow-[0_12px_36px_rgba(0,0,0,0.7)] whitespace-nowrap">
                            <Sparkles className="w-3.5 h-3.5 text-[#E8DEC8] animate-pulse shrink-0" />
                            <span className="text-xs font-sans uppercase tracking-[0.24em] font-medium text-[#FAF7F2] whitespace-nowrap">
                              Explore
                            </span>
                          </div>
                        </div>

                        {/* 6. Bottom Editorial Content */}
                        <div
                          className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20 flex flex-col justify-end text-butter-cream"
                        >
                          {/* Inclusions Pills in Frosted Glass (No Loud Yellow) */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-medium tracking-wider uppercase bg-white/10 text-[#FAF7F2] border border-white/15 backdrop-blur-sm">
                              <Camera className="w-2.5 h-2.5 text-[#E8DEC8]" /> 5 Photos
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-medium tracking-wider uppercase bg-white/10 text-[#FAF7F2] border border-white/15 backdrop-blur-sm">
                              <Film className="w-2.5 h-2.5 text-[#E8DEC8]" /> 1 Video
                            </span>
                          </div>

                          <h4 className="font-serif text-lg sm:text-2xl font-light leading-snug line-clamp-1 text-white group-hover:text-[#FFF8EE] transition-colors">
                            {work.title}
                          </h4>

                          <p className="mt-0.5 font-serif text-xs italic text-[#E5D7C3]/85 line-clamp-1">
                            &ldquo;{work.tagline}&rdquo;
                          </p>

                          <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-white/15 text-[10.5px] font-sans">
                            <span className="flex items-center gap-1.5 text-[#E8DEC8] uppercase tracking-widest font-medium group-hover:translate-x-1 transition-transform">
                              <span>View Gallery &amp; Details</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-white/50 uppercase tracking-widest font-mono text-[9px]">
                              0{index + 1} / {String(currentWorks.length).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Luxury3DCard>
                  );
                })}
              </div>
            </div>

            {/* MOBILE VIEW ONLY (< 640px): Clean Vertical Lookbook Stream (ZERO LEFT-RIGHT SLIDER!) */}
            <div className="sm:hidden w-full min-w-0 flex flex-col gap-4">
              {currentWorks.map((work, index) => {
                const itemNumber = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={work.id}
                    onClick={() => handleOpenWork(work)}
                    className="group relative cursor-pointer w-full aspect-[4/5] rounded-[1.75rem] overflow-hidden bg-ink-aubergine shadow-xl border border-ink-aubergine/15 active:scale-[0.99] transition-all"
                  >
                    <Image
                      src={getSafeImageUrl(work.coverImage)}
                      alt={work.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#140817]/95 via-[#140817]/50 to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-ink-aubergine/80 backdrop-blur-md text-butter-cream text-[10px] font-sans font-semibold tracking-wider flex items-center justify-center border border-white/20 shadow-sm">
                      {itemNumber}
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[8.5px] uppercase font-sans tracking-widest bg-ink-aubergine/85 backdrop-blur-md text-butter-cream border border-white/20 shadow-sm font-medium">
                        <Sparkles className="w-2.5 h-2.5 text-marigold-glow" />
                        <span>{work.badge || "Signature Piece"}</span>
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end text-butter-cream">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-semibold tracking-wider uppercase bg-marigold-glow/20 text-marigold-glow border border-marigold-glow/30">
                          <Camera className="w-2.5 h-2.5" /> 5 Photos
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenWorkAtSlide(work, 5);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-sans font-semibold tracking-wider uppercase bg-rose-500/25 text-rose-300 border border-rose-400/40 active:scale-95 transition-all"
                        >
                          <Play className="w-2.5 h-2.5 fill-rose-300 stroke-none" /> Watch Reel
                        </button>
                      </div>

                      <h4 className="font-serif text-lg font-normal leading-snug text-butter-cream line-clamp-1">
                        {work.title}
                      </h4>

                      <p className="mt-0.5 font-serif text-xs italic text-apricot-blush/90 line-clamp-1">
                        &ldquo;{work.tagline}&rdquo;
                      </p>

                      <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-white/15 text-xs font-sans">
                        <span className="flex items-center gap-1.5 text-marigold-glow uppercase tracking-wider text-[11px] font-medium">
                          <span>View Gallery &amp; Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-butter-cream/60 font-mono text-[10px]">
                          {itemNumber} / {String(currentWorks.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* PRODUCT MEDIA SLIDER MODAL (5 PHOTOS + 1 VIDEO COMPULSORY)          */}
      {/* ------------------------------------------------------------------- */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeWorkItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[100] flex items-center justify-center select-none"
              >
                {/* ========================================================= */}
                {/* 1. DESKTOP MODAL VIEW (>= 1024px) — 100% UNTOUCHED        */}
                {/* ========================================================= */}
                <div
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setActiveWorkItem(null);
                  }}
                  className="hidden lg:flex fixed inset-0 z-[100] items-center justify-center p-6 md:p-8 bg-ink-aubergine/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {/* Floating Close Button for Desktop */}
                  <button
                    type="button"
                    onClick={() => setActiveWorkItem(null)}
                    aria-label="Close creation view"
                    className="fixed top-6 right-6 z-[130] w-12 h-12 rounded-full bg-ink-aubergine/90 text-butter-cream border border-white/25 hover:bg-white/20 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md active:scale-95"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Main Desktop Modal Box */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-w-5xl w-full max-h-[92vh] flex flex-row items-stretch bg-ink-aubergine border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto text-butter-cream"
                  >
                    {/* --------------------------------------------------------- */}
                    {/* LEFT: 6-MEDIA SLIDER STAGE (5 PHOTOS + 1 VIDEO COMPULSORY) */}
                    {/* --------------------------------------------------------- */}
                    <div className="relative w-full lg:w-[58%] flex flex-col justify-between bg-black/40 border-b lg:border-b-0 lg:border-r border-white/10 p-4 sm:p-6 min-h-[360px] sm:min-h-[460px] lg:min-h-[580px]">
                      {/* Top Status Bar: Slide Counter & Media Type Indicator */}
                      <div className="flex items-center justify-between gap-2 mb-3 z-20">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-sans tracking-widest bg-white/10 text-butter-cream border border-white/15 backdrop-blur-md font-semibold">
                            {activeSlideIndex < 5 ? (
                              <>
                                <Camera className="w-3 h-3 text-marigold-glow" />
                                <span>Photo {activeSlideIndex + 1} of 5</span>
                              </>
                            ) : (
                              <>
                                <Film className="w-3 h-3 text-rose-400" />
                                <span>Studio Reel &amp; Video</span>
                              </>
                            )}
                          </span>
                          <span className="text-[10px] font-mono text-butter-cream/60">
                            Slide 0{activeSlideIndex + 1} / 06
                          </span>
                        </div>

                        {/* Required Atelier Guarantee Badge */}
                        <span className="hidden sm:inline-flex items-center gap-1 text-[9px] uppercase font-sans tracking-widest text-marigold-glow/90 font-medium">
                          <ShieldCheck className="w-3 h-3" />
                          <span>5 Photos + 1 Video Standard</span>
                        </span>
                      </div>

                      {/* Main Active Media Stage */}
                      <div className="relative flex-1 w-full min-h-[260px] sm:min-h-[380px] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          {activeSlideIndex < 5 ? (
                            // Photo View (Slides 0, 1, 2, 3, 4)
                            <motion.div
                              key={`photo-${activeSlideIndex}`}
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.28 }}
                              className="relative w-full h-full min-h-[260px] sm:min-h-[380px]"
                            >
                              <Image
                                src={activeWorkItem.images[activeSlideIndex]}
                                alt={`${activeWorkItem.title} - Photo ${activeSlideIndex + 1}`}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="object-contain"
                              />
                            </motion.div>
                          ) : (
                            // Compulsory Video View (Slide 5)
                            <motion.div
                              key="video-slide"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.28 }}
                              className="relative w-full h-full min-h-[260px] sm:min-h-[380px] flex items-center justify-center bg-black"
                            >
                              <video
                                src={activeWorkItem.videoUrl}
                                controls
                                autoPlay
                                loop
                                playsInline
                                className="w-full h-full max-h-[460px] object-contain rounded-2xl"
                              >
                                Your browser does not support HTML5 video.
                              </video>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Prev Arrow */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevSlide();
                          }}
                          aria-label="Previous media"
                          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-ink-aubergine/80 text-butter-cream border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all shadow-xl backdrop-blur-md active:scale-90"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Next Arrow */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextSlide();
                          }}
                          aria-label="Next media"
                          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-ink-aubergine/80 text-butter-cream border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all shadow-xl backdrop-blur-md active:scale-90"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Bottom Media Selector Thumbnails Strip (6 Chips) */}
                      <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
                        {/* 5 Photo Thumbnails */}
                        {activeWorkItem.images.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSlideIndex(idx)}
                            className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${activeSlideIndex === idx
                              ? "border-marigold-glow ring-2 ring-marigold-glow/50 scale-105 shadow-md"
                              : "border-white/20 opacity-60 hover:opacity-100"
                              }`}
                          >
                            <Image
                              src={img}
                              alt={`Thumb ${idx + 1}`}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                            <span className="absolute bottom-0 inset-x-0 bg-ink-aubergine/85 text-[8px] font-sans text-center text-butter-cream py-0.5">
                              P{idx + 1}
                            </span>
                          </button>
                        ))}

                        {/* 1 Compulsory Video Thumbnail Chip */}
                        <button
                          type="button"
                          onClick={() => setActiveSlideIndex(5)}
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 flex flex-col items-center justify-center transition-all duration-300 ${activeSlideIndex === 5
                            ? "border-rose-400 bg-rose-950/80 ring-2 ring-rose-400/50 scale-105 shadow-md"
                            : "border-white/20 bg-white/5 opacity-70 hover:opacity-100"
                            }`}
                        >
                          <Play className="w-4 h-4 text-rose-400 fill-rose-400" />
                          <span className="text-[7.5px] uppercase font-sans font-semibold tracking-wider text-butter-cream mt-0.5">
                            Video
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* --------------------------------------------------------- */}
                    {/* RIGHT: SPECIFICATIONS, BESPOKE CUSTOMIZATION & WHATSAPP  */}
                    {/* --------------------------------------------------------- */}
                    <div className="w-full lg:w-[42%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] lg:max-h-[88vh]">
                      <div>
                        {/* Category & Badge Header */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-marigold-glow font-medium truncate max-w-[200px]">
                            {activeWorkItem.categoryName}
                          </span>
                          {activeWorkItem.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase font-sans tracking-widest bg-marigold-glow/20 text-marigold-glow border border-marigold-glow/30 font-medium">
                              {activeWorkItem.badge}
                            </span>
                          )}
                        </div>

                        {/* Work Title */}
                        <h3 className="font-serif text-2xl sm:text-3xl text-butter-cream font-normal leading-tight">
                          {activeWorkItem.title}
                        </h3>

                        {/* Tagline */}
                        <p className="mt-1 text-xs sm:text-sm font-serif italic text-apricot-blush">
                          &ldquo;{activeWorkItem.tagline}&rdquo;
                        </p>

                        {/* Description */}
                        <p className="mt-3 text-xs sm:text-sm font-sans text-butter-cream/80 leading-relaxed font-light">
                          {activeWorkItem.description}
                        </p>

                        {/* Specifications Grid */}
                        {activeWorkItem.specifications && activeWorkItem.specifications.length > 0 && (
                          <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-[9.5px] uppercase font-sans tracking-widest text-butter-cream/60 font-semibold mb-2">
                              Atelier Specifications:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                              {activeWorkItem.specifications.map((spec, i) => (
                                <div key={i} className="flex flex-col">
                                  <span className="text-[10px] text-butter-cream/50 uppercase tracking-wider">
                                    {spec.label}
                                  </span>
                                  <span className="text-butter-cream/90 font-medium text-[11.5px]">
                                    {spec.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Bespoke Customization Possibilities */}
                        {activeWorkItem.customizationOptions && (
                          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/10">
                            <h4 className="text-[10.5px] uppercase font-sans tracking-widest text-marigold-glow font-semibold flex items-center gap-1.5 mb-2.5">
                              <Palette className="w-3.5 h-3.5" />
                              <span>Bespoke Customization Options:</span>
                            </h4>
                            <div className="flex flex-col gap-1.5">
                              {activeWorkItem.customizationOptions.map((opt, i) => (
                                <div
                                  key={i}
                                  className="flex items-start gap-2 text-xs font-sans text-butter-cream/90"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suitable Occasions */}
                        {activeWorkItem.suitableOccasions && (
                          <div className="mt-4 flex items-center gap-2 text-xs font-sans text-butter-cream/70">
                            <CalendarHeart className="w-4 h-4 text-apricot-blush shrink-0" />
                            <span>
                              <strong className="font-medium text-butter-cream">Recommended For:</strong>{" "}
                              {activeWorkItem.suitableOccasions.join(", ")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Ordering Action: Instagram DM or WhatsApp */}
                      <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        {SITE_CONTENT.brand.enableWhatsApp ? (
                          <a
                            href={buildWhatsAppUrl({
                              occasion: activeWorkItem.categoryName,
                              notes: `Hello Jensi! I saw "${activeWorkItem.title}" in your ${activeWorkItem.categoryName} catalog on THE PETAL MUSE. Could you please share bespoke customization details, available dates, and pricing?`,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95"
                          >
                            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                            <span>Order on WhatsApp</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              openInstagramInquiry({
                                title: activeWorkItem.title,
                                category: activeWorkItem.categoryName,
                                occasion: activeWorkItem.categoryName,
                                notes: `Hello Jensi! I saw "${activeWorkItem.title}" in your ${activeWorkItem.categoryName} catalog on THE PETAL MUSE. Could you please share bespoke customization details, available dates, and pricing?`,
                              })
                            }
                            className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95"
                          >
                            <Instagram className="w-4 h-4 text-white" />
                            <span>Enquire on Instagram</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setActiveWorkItem(null)}
                          className="py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-butter-cream/80 text-xs font-sans uppercase tracking-wider font-medium text-center transition-colors"
                        >
                          Close View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* ========================================================= */}
                {/* 2. MOBILE FULL-SCREEN REEL & LOOKBOOK VIEWER (< 1024px)   */}
                {/* ========================================================= */}
                <div className="lg:hidden fixed inset-0 z-[120] w-full h-[100dvh] bg-black text-butter-cream flex flex-col justify-between overflow-hidden">
                  {/* Full-Screen Media Stage */}
                  <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {activeSlideIndex < 5 ? (
                        // Photo View Full-Screen
                        <motion.div
                          key={`mobile-photo-${activeSlideIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative w-full h-full flex items-center justify-center p-2"
                        >
                          <Image
                            src={activeWorkItem.images[activeSlideIndex]}
                            alt={`${activeWorkItem.title} - Photo ${activeSlideIndex + 1}`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 80vw"
                            className="object-contain"
                          />
                        </motion.div>
                      ) : (
                        // Studio Reel Full-Screen Video
                        <motion.div
                          key="mobile-video-slide"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative w-full h-full flex items-center justify-center bg-black"
                        >
                          <video
                            src={activeWorkItem.videoUrl}
                            autoPlay
                            loop
                            playsInline
                            muted={isMuted}
                            className={`w-full h-full ${isFitMode ? "object-contain" : "object-cover"}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Top Floating Overlay Bar */}
                  <div className="relative z-20 flex items-center justify-between p-4 pt-5 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-sans tracking-widest bg-white/20 text-butter-cream border border-white/25 backdrop-blur-md font-semibold">
                        {activeSlideIndex < 5 ? (
                          <>
                            <Camera className="w-3 h-3 text-marigold-glow" />
                            <span>Photo {activeSlideIndex + 1} of 5</span>
                          </>
                        ) : (
                          <>
                            <Film className="w-3 h-3 text-rose-400" />
                            <span>Studio Reel &amp; Video</span>
                          </>
                        )}
                      </span>
                      <span className="text-[10.5px] font-mono text-butter-cream/70">
                        0{activeSlideIndex + 1} / 06
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audio mute/unmute (video only) */}
                      {activeSlideIndex === 5 && (
                        <button
                          type="button"
                          onClick={() => setIsMuted(!isMuted)}
                          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-butter-cream flex items-center justify-center active:scale-90"
                          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                      )}

                      {/* Fit / Cover toggle (video only) */}
                      {activeSlideIndex === 5 && (
                        <button
                          type="button"
                          onClick={() => setIsFitMode(!isFitMode)}
                          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-butter-cream flex items-center justify-center active:scale-90 text-[10px]"
                          title={isFitMode ? "Cover Screen" : "Fit to Screen"}
                        >
                          {isFitMode ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                        </button>
                      )}

                      {/* Close button (X) */}
                      <button
                        type="button"
                        onClick={() => setActiveWorkItem(null)}
                        className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-butter-cream flex items-center justify-center active:scale-90 shadow-xl"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Left / Right Navigation Chevrons */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    aria-label="Previous slide"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center active:scale-90"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    aria-label="Next slide"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center active:scale-90"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Bottom Floating Bar */}
                  <div className="relative z-20 p-4 pb-6 pt-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                    {/* Title & Tagline */}
                    <div className="mb-2.5">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-marigold-glow font-semibold truncate max-w-[200px]">
                          {activeWorkItem.categoryName}
                        </span>
                        {activeWorkItem.badge && (
                          <span className="text-[8.5px] uppercase font-sans tracking-widest px-2 py-0.2 rounded-full bg-white/10 text-butter-cream border border-white/15">
                            {activeWorkItem.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-normal text-butter-cream leading-snug line-clamp-1">
                        {activeWorkItem.title}
                      </h3>
                      <p className="font-serif italic text-xs text-apricot-blush/90 line-clamp-1 mt-0.5">
                        &ldquo;{activeWorkItem.tagline}&rdquo;
                      </p>
                    </div>

                    {/* 6-Chip Media Selector Thumbnails */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 no-scrollbar">
                      {activeWorkItem.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${activeSlideIndex === idx
                            ? "border-marigold-glow ring-2 ring-marigold-glow/50 scale-105"
                            : "border-white/20 opacity-65"
                            }`}
                        >
                          <Image src={img} alt="" fill sizes="44px" className="object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[7px] font-sans text-center text-butter-cream py-0.2">
                            P{idx + 1}
                          </span>
                        </button>
                      ))}

                      {/* Reel Chip */}
                      <button
                        type="button"
                        onClick={() => setActiveSlideIndex(5)}
                        className={`relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border-2 flex flex-col items-center justify-center transition-all ${activeSlideIndex === 5
                          ? "border-rose-400 bg-rose-950/90 ring-2 ring-rose-400/50 scale-105"
                          : "border-white/20 bg-white/10 opacity-75"
                          }`}
                      >
                        <Play className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                        <span className="text-[7.5px] uppercase font-sans font-bold text-butter-cream">
                          Reel
                        </span>
                      </button>
                    </div>

                    {/* Action Bar (Instagram DM / WhatsApp + Specs Toggle) */}
                    <div className="flex items-center gap-2">
                      {SITE_CONTENT.brand.enableWhatsApp ? (
                        <a
                          href={buildWhatsAppUrl({
                            occasion: activeWorkItem.categoryName,
                            notes: `Hello Jensi! I watched the full studio reel of "${activeWorkItem.title}" (${activeWorkItem.categoryName}) on THE PETAL MUSE. Could you please share bespoke customization details and pricing?`,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-95"
                        >
                          <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                          <span>Order on WhatsApp</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            openInstagramInquiry({
                              title: activeWorkItem.title,
                              category: activeWorkItem.categoryName,
                              occasion: activeWorkItem.categoryName,
                              notes: `Hello Jensi! I watched the full studio reel of "${activeWorkItem.title}" (${activeWorkItem.categoryName}) on THE PETAL MUSE. Could you please share bespoke customization details and pricing?`,
                            })
                          }
                          className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-95"
                        >
                          <Instagram className="w-4 h-4 text-white" />
                          <span>Enquire on Instagram</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setShowMobileSpecs(true)}
                        className="py-3 px-3.5 rounded-full bg-white/15 text-butter-cream border border-white/20 text-xs font-sans uppercase tracking-wider font-medium flex items-center gap-1.5 active:scale-95"
                      >
                        <Layers className="w-3.5 h-3.5 text-marigold-glow" />
                        <span>Specs</span>
                      </button>
                    </div>
                  </div>

                  {/* Slide-Up Specifications Drawer */}
                  <AnimatePresence>
                    {showMobileSpecs && (
                      <>
                        {/* Dark Backdrop Scrim (Tap to close) */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setShowMobileSpecs(false)}
                          className="absolute inset-0 bg-black/80 backdrop-blur-md z-40"
                        />

                        {/* Solid Luxury Drawer (Opaque Aubergine Background) */}
                        <motion.div
                          initial={{ opacity: 0, y: "100%" }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: "100%" }}
                          transition={{ type: "spring", damping: 28, stiffness: 320 }}
                          style={{ backgroundColor: "#1A0E1C" }}
                          className="absolute inset-x-0 bottom-0 max-h-[85vh] text-butter-cream border-t border-white/20 rounded-t-3xl p-5 sm:p-6 z-50 overflow-y-auto overscroll-contain shadow-[0_-25px_60px_rgba(0,0,0,0.95)]"
                        >
                          {/* Drawer Header */}
                          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/15">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-marigold-glow animate-pulse" />
                              <span className="font-serif text-base font-normal text-butter-cream tracking-wide">
                                Atelier Specifications
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setShowMobileSpecs(false)}
                              aria-label="Close specifications"
                              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-butter-cream border border-white/15 active:scale-90 transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Work Title & Category Summary */}
                          <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                            <span className="text-[9px] uppercase font-sans tracking-[0.2em] text-marigold-glow font-semibold block">
                              {activeWorkItem.categoryName}
                            </span>
                            <h4 className="font-serif text-base text-butter-cream font-light mt-0.5">
                              {activeWorkItem.title}
                            </h4>
                            <p className="font-serif italic text-xs text-apricot-blush mt-0.5">
                              &ldquo;{activeWorkItem.tagline}&rdquo;
                            </p>
                          </div>

                          {/* Specifications Grid */}
                          {activeWorkItem.specifications && activeWorkItem.specifications.length > 0 && (
                            <div className="mb-4">
                              <span className="text-[10px] uppercase font-sans tracking-widest text-marigold-glow font-semibold block mb-2">
                                Piece Dimensions &amp; Architecture:
                              </span>
                              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                                {activeWorkItem.specifications.map((spec, i) => (
                                  <div
                                    key={i}
                                    className="p-3 rounded-xl bg-white/8 border border-white/15 flex flex-col justify-between"
                                  >
                                    <span className="text-[9px] uppercase font-sans tracking-wider text-marigold-glow/90 font-medium">
                                      {spec.label}
                                    </span>
                                    <span className="font-medium text-butter-cream text-xs mt-1 leading-snug">
                                      {spec.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Customization Options */}
                          {activeWorkItem.customizationOptions && (
                            <div className="mb-5 space-y-2 text-xs font-sans">
                              <span className="text-[10px] uppercase font-sans tracking-widest text-marigold-glow font-semibold block mb-1">
                                Bespoke Customization Options:
                              </span>
                              {activeWorkItem.customizationOptions.map((opt, i) => (
                                <div
                                  key={i}
                                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-butter-cream/90"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="leading-snug">{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="space-y-2 pt-2 border-t border-white/15">
                            <a
                              href={buildWhatsAppUrl({
                                occasion: activeWorkItem.categoryName,
                                notes: `Hello Jensi! I am reviewing the atelier specifications for "${activeWorkItem.title}" (${activeWorkItem.categoryName}) on THE PETAL MUSE. Could you please share bespoke customization details and pricing?`,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xl active:scale-95"
                            >
                              <MessageCircle className="w-4 h-4 fill-white stroke-none shrink-0" />
                              <span className="whitespace-nowrap">Order on WhatsApp</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => setShowMobileSpecs(false)}
                              className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-sans uppercase tracking-wider text-butter-cream/80 text-center border border-white/15 active:scale-95 transition-all"
                            >
                              Return to Full-Screen View
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}