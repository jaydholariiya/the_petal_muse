"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Instagram,
  X,
  Maximize2,
  CalendarHeart,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import { SITE_CONTENT, BestsellerProduct } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { buildWhatsAppUrl, openInstagramInquiry } from "@/lib/utils";

function getSafeImageUrl(url?: string, fallback: string = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85") {
  if (!url || typeof url !== "string") return fallback;
  let trimmed = url.trim();
  if (trimmed.includes("behance.net/gallery/")) return fallback;
  if (trimmed.toLowerCase().endsWith(".heic") && trimmed.includes("cloudinary.com")) {
    trimmed = trimmed.replace(/\.heic$/i, ".jpg");
  }
  return trimmed;
}

export default function BestsellersSection() {
  const { settings } = useAtelierContent();
  let bestsellersSection = SITE_CONTENT.bestsellersSection;
  if (settings["bestsellers_data"]) {
    try {
      const parsed = JSON.parse(settings["bestsellers_data"]);
      if (parsed && Array.isArray(parsed.products)) {
        bestsellersSection = {
          ...bestsellersSection,
          ...parsed,
          products: parsed.products,
        };
      } else if (Array.isArray(parsed)) {
        bestsellersSection = {
          ...bestsellersSection,
          products: parsed,
        };
      }
    } catch {
      bestsellersSection = SITE_CONTENT.bestsellersSection;
    }
  }

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeProduct, setActiveProduct] = useState<BestsellerProduct | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard Escape listener when detail popup is active (zero scroll jumping)
  useEffect(() => {
    if (!activeProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProduct(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProduct]);

  const filterTabs = [
    { id: "all", label: "All Bestsellers" },
    {
      id: "frames",
      label: "Keepsake Frames & Albums",
      match: ["photo-frames", "pipe-cleaner-frames"],
    },
    {
      id: "bridal",
      label: "Bridal & Magazines",
      match: ["bouquets", "magazine"],
    },
    {
      id: "hampers",
      label: "Hampers & Chocolates",
      match: ["hamper-boxes", "chocolate-bouquets"],
    },
  ];

  const filteredProducts = bestsellersSection.products.filter((product) => {
    if (selectedFilter === "all") return true;
    const currentTab = filterTabs.find((t) => t.id === selectedFilter);
    return currentTab?.match?.includes(product.category) ?? false;
  });

  return (
    <section
      id="bestsellers"
      className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden w-full min-w-0"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-5 sm:pb-8 mb-6 sm:mb-10 w-full min-w-0">
        <div className="w-full md:w-auto min-w-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
              {bestsellersSection.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
            OUR BESTSELLERS – <br className="hidden sm:inline" />
            <span className="italic font-serif text-mulberry-wine">Most Loved Creations</span>
          </h2>
        </div>

        <p className="mt-3 md:mt-0 font-sans text-xs sm:text-sm md:text-base text-ink-aubergine/75 max-w-md leading-relaxed">
          {bestsellersSection.description}
        </p>
      </div>

      {/* Symmetrical Filter Tabs — Hidden on Mobile (Clean & Clutter-Free), Visible on Desktop */}
      <div className="hidden sm:flex flex-wrap items-center gap-2 mb-8 sm:mb-12 w-full min-w-0">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilter(tab.id);
              }}
              className={`py-2 px-3.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-sans tracking-[0.14em] uppercase transition-all duration-300 border flex items-center gap-2 ${isActive
                ? "bg-ink-aubergine text-butter-cream border-ink-aubergine shadow-md"
                : "bg-white/70 text-ink-aubergine/75 border-ink-aubergine/15 hover:bg-white hover:text-ink-aubergine"
                }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-marigold-glow animate-pulse" : "bg-ink-aubergine/20"
                  }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ARCHITECTURAL EDITORIAL CARD GRID — Styled Exactly Like Curated Creations */}
      <div className="w-full min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bestsellers-grid-${selectedFilter}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className={`w-full min-w-0 ${selectedFilter === "all"
              ? "grid grid-cols-12 gap-6 sm:gap-8"
              : filteredProducts.length === 2
                ? "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
                : filteredProducts.length === 1
                  ? "max-w-lg mx-auto grid grid-cols-1"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              }`}
          >
            {filteredProducts.map((product, index) => {
              const originalIndex = bestsellersSection.products.findIndex(
                (p) => p.id === product.id
              );
              const itemNumber = String(originalIndex + 1).padStart(2, "0");

              // Dynamic editorial column spans when viewing "All Bestsellers"
              let colSpan = "";
              let aspectClass = "aspect-[3/4] min-h-[500px]";

              if (selectedFilter === "all") {
                if (index === 0) {
                  // Hero piece (Grand architectural scale, expansive artwork visibility)
                  colSpan = "col-span-12 lg:col-span-7";
                  aspectClass = "aspect-[3/4] sm:aspect-[16/14] min-h-[540px] sm:min-h-[600px] lg:min-h-[660px]";
                } else if (index === 1) {
                  // Companion piece (Aligned height with hero piece)
                  colSpan = "col-span-12 lg:col-span-5";
                  aspectClass = "aspect-[3/4] min-h-[540px] sm:min-h-[600px] lg:min-h-[660px]";
                } else {
                  // 3-column rows (4 + 4 + 4 = 12 columns)
                  colSpan = "col-span-12 md:col-span-6 lg:col-span-4";
                  aspectClass = "aspect-[3/4] min-h-[480px] sm:min-h-[520px]";
                }
              } else {
                colSpan = "col-span-12 md:col-span-6 lg:col-span-4";
                aspectClass = "aspect-[3/4] min-h-[500px]";
              }

              return (
                <motion.div
                  key={`bestseller-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  onClick={() => setActiveProduct(product)}
                  className={`group relative cursor-pointer w-full min-w-0 ${colSpan}`}
                >
                  {/* Image Container with Architectural Rounded Silhouette */}
                  <div
                    className={`relative w-full overflow-hidden bg-ink-aubergine/5 shadow-lg group-hover:shadow-2xl transition-all duration-700 rounded-3xl ${aspectClass}`}
                  >
                    <Image
                      src={getSafeImageUrl(product.imageUrl)}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-106"
                    />

                    {/* Gentle Bottom-Only Legibility Shade for Editorial Text (Top 60% is 100% crystal clear & bright) */}
                    <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-ink-aubergine/95 via-ink-aubergine/40 to-transparent pointer-events-none" />

                    {/* Archival Catalog Number Disc at Top Left */}
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 w-8 h-8 rounded-full bg-ink-aubergine/70 backdrop-blur-md text-butter-cream text-[10px] font-sans font-semibold tracking-wider flex items-center justify-center border border-white/20 shadow-sm group-hover:border-marigold-glow/50 transition-colors">
                      {itemNumber}
                    </div>

                    {/* Top Right Atelier Badge */}
                    <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-sans tracking-widest bg-ink-aubergine/80 backdrop-blur-md text-butter-cream border border-white/15 shadow-sm font-medium">
                        <Sparkles className="w-2.5 h-2.5 text-marigold-glow" />
                        <span>{product.badge}</span>
                      </span>
                    </div>

                    {/* Clean Bottom Editorial Content — Uncluttered Luxury Presentation */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10 flex flex-col justify-end text-butter-cream">
                      {/* Featured Occasion & Category Eyebrow */}
                      <div className="flex items-center gap-2 mb-1.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse shrink-0" />
                        <span className="text-[9.5px] sm:text-[10px] tracking-[0.18em] uppercase text-apricot-blush font-sans font-medium truncate">
                          {product.categoryName} • {product.featuredOccasion.split("&")[0].trim()}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg sm:text-2xl lg:text-[26px] font-normal leading-snug line-clamp-1 group-hover:text-butter-cream transition-colors">
                        {product.title}
                      </h3>

                      {/* Tagline / Caption — Visible on desktop, hidden on mobile so artwork is not covered */}
                      <p className="mt-1.5 text-xs text-butter-cream/80 font-sans font-light line-clamp-2 leading-relaxed hidden sm:block">
                        {product.description}
                      </p>

                      {/* Footer Action */}
                      <div className="mt-3 sm:mt-4 flex items-center justify-between pt-2.5 sm:pt-3 border-t border-white/15 text-xs font-sans">
                        <span className="flex items-center gap-1.5 text-marigold-glow uppercase tracking-wider text-[10px] sm:text-[10.5px] font-medium group-hover:translate-x-1 transition-transform">
                          <Maximize2 className="w-3 h-3" />
                          <span>Tap to View &amp; Customize</span>
                        </span>
                        <span className="text-butter-cream/50 text-[9.5px] font-mono uppercase tracking-widest">
                          {itemNumber} / {String(bestsellersSection.products.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LUXURY EDITORIAL DETAIL POPUP MODAL (Zero Scroll Jumping) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setActiveProduct(null);
                }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-aubergine/90 backdrop-blur-xl p-3 sm:p-6 md:p-10 select-none overflow-y-auto overscroll-contain"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Fixed Close Button */}
                <button
                  onClick={() => setActiveProduct(null)}
                  aria-label="Close product view"
                  className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ink-aubergine/90 text-butter-cream border border-white/25 hover:bg-white/20 flex items-center justify-center transition-all shadow-2xl backdrop-blur-md active:scale-95"
                >
                  <X className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row items-stretch bg-ink-aubergine/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto text-butter-cream"
                >
                  {/* Left Column: Full Artwork Photography */}
                  <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto min-h-[260px] md:min-h-[440px] shrink-0 bg-ink-aubergine/40">
                    <Image
                      src={getSafeImageUrl(activeProduct.imageUrl)}
                      alt={activeProduct.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/80 via-transparent to-transparent md:hidden" />

                    {/* Badge Over Photo */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-sans tracking-widest bg-ink-aubergine/80 backdrop-blur-md text-butter-cream border border-white/20 shadow-sm font-medium">
                        <Sparkles className="w-2.5 h-2.5 text-marigold-glow" />
                        <span>{activeProduct.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Complete Product Story & Customization Details */}
                  <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
                    <div>
                      {/* Category & Atelier Origin */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-[0.25em] text-apricot-blush font-medium">
                          {activeProduct.categoryName}
                        </span>
                        <span className="text-[10px] font-sans text-butter-cream/60">
                          Handcrafted by Jensi Dholariya
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-2xl sm:text-3xl font-light text-butter-cream leading-tight">
                        {activeProduct.title}
                      </h3>

                      {/* Tagline */}
                      <p className="mt-1 font-serif text-xs sm:text-sm italic text-marigold-glow">
                        &ldquo;{activeProduct.tagline}&rdquo;
                      </p>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm font-sans text-butter-cream/80 leading-relaxed font-light">
                        {activeProduct.description}
                      </p>

                      {/* Customization Details Box */}
                      <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/10">
                        <h4 className="text-[10.5px] uppercase font-sans tracking-widest text-marigold-glow font-semibold flex items-center gap-1.5 mb-1.5">
                          <Palette className="w-3.5 h-3.5" />
                          <span>Customization Possibilities:</span>
                        </h4>
                        <p className="text-xs font-sans text-butter-cream/90 leading-relaxed">
                          {activeProduct.customizationSnippet}
                        </p>
                      </div>

                      {/* Featured Occasion */}
                      <div className="mt-4 flex items-center gap-2 text-xs font-sans text-butter-cream/70">
                        <CalendarHeart className="w-4 h-4 text-apricot-blush shrink-0" />
                        <span>
                          <strong className="font-medium text-butter-cream">Featured For:</strong>{" "}
                          {activeProduct.featuredOccasion}
                        </span>
                      </div>
                    </div>

                    {/* Ordering Action Button: Instagram DM or WhatsApp */}
                    <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      {SITE_CONTENT.brand.enableWhatsApp ? (
                        <a
                          href={buildWhatsAppUrl({
                            occasion: activeProduct.categoryName,
                            notes: `Hello Jensi! I saw "${activeProduct.title}" in your Bestsellers on THE PETAL MUSE and would love to enquire about customizing one.`,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95"
                        >
                          <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                          <span>Enquire on WhatsApp</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            openInstagramInquiry({
                              title: activeProduct.title,
                              category: activeProduct.categoryName,
                              occasion: activeProduct.featuredOccasion,
                              notes: `Hello Jensi! I saw "${activeProduct.title}" in your Bestsellers on THE PETAL MUSE and would love to enquire about customizing one.`,
                            })
                          }
                          className="py-3 px-6 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95"
                        >
                          <Instagram className="w-4 h-4 text-white" />
                          <span>Enquire on Instagram</span>
                        </button>
                      )}

                      <button
                        onClick={() => setActiveProduct(null)}
                        className="py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-butter-cream/80 text-xs font-sans uppercase tracking-wider font-medium text-center transition-colors"
                      >
                        Close View
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
