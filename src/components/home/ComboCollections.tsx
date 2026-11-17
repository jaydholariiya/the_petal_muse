"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  X,
  Maximize2,
  HeartHandshake,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Gift,
  Layers,
} from "lucide-react";
import { SITE_CONTENT, ComboCollectionItem } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { buildWhatsAppUrl } from "@/lib/utils";

function getSafeImageUrl(url?: string, fallback: string = "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85") {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (trimmed.includes("behance.net/gallery/")) return fallback;
  return trimmed;
}

export default function ComboCollections() {
  const { settings } = useAtelierContent();
  let comboCollections = SITE_CONTENT.comboCollections;
  if (settings["combos_data"]) {
    try {
      const parsed = JSON.parse(settings["combos_data"]);
      if (parsed && Array.isArray(parsed.combos)) {
        comboCollections = {
          ...comboCollections,
          ...parsed,
          combos: parsed.combos,
        };
      } else if (Array.isArray(parsed)) {
        comboCollections = {
          ...comboCollections,
          combos: parsed,
        };
      }
    } catch {
      comboCollections = SITE_CONTENT.comboCollections;
    }
  }

  const { combos } = comboCollections;
  const [activeComboIndex, setActiveComboIndex] = useState(0);
  const [activeModalCombo, setActiveModalCombo] = useState<ComboCollectionItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard navigation & escape listener (zero scroll jumping)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalCombo) {
        if (e.key === "Escape") setActiveModalCombo(null);
        return;
      }
      if (e.key === "ArrowLeft") {
        setActiveComboIndex((prev) => (prev - 1 + combos.length) % combos.length);
      }
      if (e.key === "ArrowRight") {
        setActiveComboIndex((prev) => (prev + 1) % combos.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalCombo, combos.length]);

  const currentCombo = combos[activeComboIndex] || combos[0];
  const comboNumber = String(activeComboIndex + 1).padStart(2, "0");

  const handlePrev = () => {
    setActiveComboIndex((prev) => (prev - 1 + combos.length) % combos.length);
  };

  const handleNext = () => {
    setActiveComboIndex((prev) => (prev + 1) % combos.length);
  };

  const whatsappUrl = buildWhatsAppUrl({
    occasion: `Combo Suite - ${currentCombo.title}`,
    notes: `Hello Jensi! I am enquiring about "${currentCombo.title}" (${currentCombo.subtitle}) from your Combo Collections. Could you share customization possibilities and pricing?`,
  });

  return (
    <section
      id="combos"
      className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden w-full min-w-0"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-5 sm:pb-8 mb-6 sm:mb-10 w-full min-w-0">
        <div className="w-full md:w-auto min-w-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
              Curated Gift Bundles
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
            Creative Combo Collections – <br className="hidden sm:inline" />
            <span className="italic font-serif text-mulberry-wine">Thoughtful Pairings</span>
          </h2>
        </div>

        <p className="mt-3 md:mt-0 font-sans text-xs sm:text-sm md:text-base text-ink-aubergine/75 max-w-md leading-relaxed">
          {comboCollections.description}
        </p>
      </div>

      {/* Symmetrical Combo Suite Switcher Tabs (Zero Scroll Jump) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar w-full">
        {combos.map((combo, idx) => {
          const isActive = idx === activeComboIndex;
          const num = String(idx + 1).padStart(2, "0");
          return (
            <button
              key={combo.id}
              type="button"
              onClick={() => setActiveComboIndex(idx)}
              className={`flex-shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-sans tracking-[0.1em] uppercase transition-all duration-300 border flex items-center gap-2 ${
                isActive
                  ? "bg-ink-aubergine text-butter-cream border-ink-aubergine shadow-md"
                  : "bg-white/70 text-ink-aubergine/75 border-ink-aubergine/15 hover:bg-white hover:text-ink-aubergine"
              }`}
            >
              <span
                className={`text-[10px] font-bold ${
                  isActive ? "text-marigold-glow" : "text-ink-aubergine/40"
                }`}
              >
                {num}
              </span>
              <span className="truncate max-w-[140px] sm:max-w-none">{combo.title}</span>
            </button>
          );
        })}
      </div>

      {/* SINGLE CINEMATIC SPOTLIGHT SHOWCASE (Replaces 3-image / 6-image grid with 1 focal image) */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-ink-aubergine text-butter-cream shadow-2xl border border-ink-aubergine/15 flex flex-col justify-between min-h-[480px] sm:min-h-[560px] md:min-h-[620px]">
        {/* Full-Bleed Background Photography with Smooth Crossfade */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentCombo.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={getSafeImageUrl(currentCombo.imageUrl)}
              alt={currentCombo.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Atmospheric Cinematic Gradient Shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine via-ink-aubergine/55 to-ink-aubergine/35" />
          </motion.div>
        </AnimatePresence>

        {/* Top Bar: Badge, Suite Counter & Navigation Arrows */}
        <div className="relative z-10 p-5 sm:p-7 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-sans tracking-widest bg-ink-aubergine/80 backdrop-blur-md text-butter-cream border border-white/20 shadow-sm font-medium">
            <Sparkles className="w-2.5 h-2.5 text-marigold-glow" />
            <span>{currentCombo.badge}</span>
          </span>

          {/* Suite Navigator Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous combo suite"
              className="w-9 h-9 rounded-full bg-ink-aubergine/80 backdrop-blur-md text-butter-cream border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md text-butter-cream border border-white/20">
              {comboNumber} / {String(combos.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next combo suite"
              className="w-9 h-9 rounded-full bg-ink-aubergine/80 backdrop-blur-md text-butter-cream border border-white/20 hover:bg-white/20 flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Content: Clean, High-Fashion Editorial Presentation */}
        <div className="relative z-10 p-5 sm:p-8 md:p-10 bg-gradient-to-t from-ink-aubergine via-ink-aubergine/90 to-transparent pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCombo.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Occasion & Pairing Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-apricot-blush font-semibold flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-marigold-glow" />
                  <span>{currentCombo.idealFor}</span>
                </span>
              </div>

              {/* Suite Title */}
              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-butter-cream font-normal leading-tight">
                {currentCombo.title}
              </h3>

              {/* Pairing Subtitle */}
              <p className="font-serif italic text-sm sm:text-base text-marigold-glow/90 mt-1">
                &ldquo;{currentCombo.subtitle}&rdquo;
              </p>

              {/* Pairing Description */}
              <p className="mt-3 text-xs sm:text-sm md:text-base font-sans text-butter-cream/85 leading-relaxed max-w-3xl font-light">
                {currentCombo.pairingDescription}
              </p>

              {/* Included Items Checklist Badges */}
              <div className="mt-4 pt-3 border-t border-white/15">
                <span className="text-[9.5px] uppercase font-sans tracking-widest text-butter-cream/60 block mb-2 font-medium">
                  Artisanal Pieces Included in this Suite:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {currentCombo.itemsIncluded.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] sm:text-xs font-sans bg-white/10 backdrop-blur-md text-butter-cream border border-white/15"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar: Direct WhatsApp Enquiry & Full Story Modal */}
              <div className="mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none shrink-0" />
                  <span className="whitespace-nowrap">Order Combo on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModalCombo(currentCombo)}
                  className="w-full sm:w-auto py-3 px-5 rounded-full bg-white/15 hover:bg-white/25 text-butter-cream text-xs font-sans uppercase tracking-wider font-medium inline-flex items-center justify-center gap-1.5 border border-white/20 transition-all active:scale-95"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-marigold-glow shrink-0" />
                  <span className="whitespace-nowrap">Full Suite Specifications</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {combos.map((combo, idx) => (
          <button
            key={combo.id}
            type="button"
            onClick={() => setActiveComboIndex(idx)}
            aria-label={`Jump to suite ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === activeComboIndex
                ? "w-8 h-2 bg-ink-aubergine"
                : "w-2 h-2 bg-ink-aubergine/25 hover:bg-ink-aubergine/50"
            }`}
          />
        ))}
      </div>

      {/* LUXURY INTERACTIVE COMBO DETAIL POPUP MODAL (Portal to document.body, Zero Scroll Jump) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeModalCombo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setActiveModalCombo(null);
                }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-aubergine/90 backdrop-blur-xl p-3 sm:p-6 md:p-10 select-none overflow-y-auto overscroll-contain"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Floating Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveModalCombo(null)}
                  aria-label="Close combo view"
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
                  {/* Left Column: Photography */}
                  <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto min-h-[260px] md:min-h-[460px] shrink-0 bg-ink-aubergine/40">
                    <Image
                      src={getSafeImageUrl(activeModalCombo.imageUrl)}
                      alt={activeModalCombo.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink-aubergine via-transparent to-transparent opacity-85" />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-sans tracking-widest bg-ink-aubergine/80 text-butter-cream border border-white/20 backdrop-blur-md font-medium">
                        <Sparkles className="w-2.5 h-2.5 text-marigold-glow" />
                        <span>{activeModalCombo.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: In-Depth Curation Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[85vh] w-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-marigold-glow font-medium">
                          Curated Gift Suite
                        </span>
                        <span className="text-[10px] font-sans text-butter-cream/60">
                          Handcrafted in Gujarat
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl text-butter-cream font-normal mt-1 leading-tight">
                        {activeModalCombo.title}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm font-sans italic text-apricot-blush">
                        &ldquo;{activeModalCombo.subtitle}&rdquo;
                      </p>

                      <p className="mt-3 text-xs sm:text-sm font-sans text-butter-cream/80 leading-relaxed font-light">
                        {activeModalCombo.pairingDescription}
                      </p>

                      {/* Included Items List */}
                      <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/10">
                        <h4 className="text-[10.5px] uppercase font-sans tracking-widest text-marigold-glow font-semibold flex items-center gap-1.5 mb-2">
                          <Gift className="w-3.5 h-3.5" />
                          <span>Included in This Suite:</span>
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {activeModalCombo.itemsIncluded.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs font-sans text-butter-cream/90"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Why This Pairing is Beloved */}
                      <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="text-[10px] uppercase font-sans tracking-widest text-butter-cream/60 font-medium mb-1">
                          Why This Pairing is Beloved:
                        </h4>
                        <p className="text-xs font-serif italic text-butter-cream/85 leading-relaxed">
                          &ldquo;{activeModalCombo.whyItsSpecial}&rdquo;
                        </p>
                      </div>

                      {/* Ideal For Occasions */}
                      <div className="mt-4 flex items-center gap-2 text-xs font-sans text-butter-cream/70">
                        <HeartHandshake className="w-4 h-4 text-apricot-blush shrink-0" />
                        <span>
                          <strong className="font-medium text-butter-cream">Recommended For:</strong>{" "}
                          {activeModalCombo.idealFor}
                        </span>
                      </div>
                    </div>

                    {/* WhatsApp Action Button */}
                    <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <a
                        href={buildWhatsAppUrl({
                          occasion: `Combo Suite - ${activeModalCombo.title}`,
                          notes: `Hello Jensi! I am enquiring about "${activeModalCombo.title}" from your curated combo suites. Could you share customization possibilities and pricing?`,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                        <span>Enquire on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setActiveModalCombo(null)}
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
