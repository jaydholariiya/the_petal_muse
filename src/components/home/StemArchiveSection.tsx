"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flower, Wind, Info, MessageCircle } from "lucide-react";
import { SITE_CONTENT, StemItem } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function StemArchiveSection() {
  const { stemLibrary } = SITE_CONTENT;
  const [activeSeason, setActiveSeason] = useState<string>("all");
  const [selectedStem, setSelectedStem] = useState<StemItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredStems = stemLibrary.stems.filter(
    (stem) => activeSeason === "all" || stem.season === activeSeason || stem.season === "year-round"
  );

  const handleRequestStem = (stem: StemItem) => {
    const url = buildWhatsAppUrl({
      occasion: "Stem Inquiry",
      notes: `Hello Jensi! I was exploring your Sensory Stem Library on the website and would love to feature ${stem.commonName} (${stem.botanicalName}) in our floral design.`,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="stems" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-6 sm:pb-8 mb-10 sm:mb-14">
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Flower className="w-3.5 h-3.5 text-mulberry-wine" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-mulberry-wine font-medium">
              {stemLibrary.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
            {stemLibrary.title}
          </h2>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-muted-jade mt-1">
            {stemLibrary.subtitle}
          </p>
        </div>

        <p className="mt-4 md:mt-0 font-sans text-xs sm:text-sm md:text-base text-ink-aubergine/70 max-w-md leading-relaxed">
          {stemLibrary.description}
        </p>
      </div>

      {/* Season Filter Chips - Wrapped cleanly on mobile so ALL buttons are visible on-screen */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6 sm:mb-12 w-full">
        {[
          { id: "all", label: "All Stems" },
          { id: "spring", label: "Spring Awakening" },
          { id: "summer", label: "Summer Splendor" },
          { id: "autumn", label: "Autumn Harvest" },
          { id: "year-round", label: "Year-Round Reserve" },
        ].map((season) => (
          <button
            key={season.id}
            onClick={() => setActiveSeason(season.id)}
            className={`px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-sans tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-all duration-300 ${
              activeSeason === season.id
                ? "bg-ink-aubergine text-butter-cream shadow-md scale-[1.02]"
                : "bg-ink-aubergine/5 text-ink-aubergine/75 hover:bg-ink-aubergine/10"
            }`}
          >
            {season.label}
          </button>
        ))}
      </div>

      {/* MOBILE EXCLUSIVE: Downward Vertical Flowing Botanical Grid (2-Column - Zero Left/Right Scroll) */}
      <div className="grid md:hidden grid-cols-2 gap-3 w-full mb-8">
        {filteredStems.map((stem) => (
          <motion.div
            key={`mobile-stem-${stem.id}`}
            onClick={() => setSelectedStem(stem)}
            className="relative rounded-2xl overflow-hidden bg-white/85 backdrop-blur-md border border-ink-aubergine/10 shadow-sm cursor-pointer flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative w-full aspect-square overflow-hidden bg-ink-aubergine/5">
              <Image
                src={stem.imageUrl}
                alt={stem.commonName}
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/75 via-transparent to-transparent opacity-60" />

              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[7.5px] font-sans uppercase tracking-widest bg-white/90 text-ink-aubergine font-medium shadow-sm">
                {stem.seasonLabel}
              </div>

              <div className="absolute bottom-2 right-2 z-10 flex items-center gap-0.5 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-full">
                {stem.colorPalette.slice(0, 3).map((color, cIdx) => (
                  <span
                    key={cIdx}
                    className="w-2.5 h-2.5 rounded-full border border-white/40"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-2.5 flex flex-col justify-between flex-1">
              <div>
                <span className="font-serif italic text-[10px] text-mulberry-wine block line-clamp-1">
                  {stem.botanicalName}
                </span>
                <h3 className="font-serif text-sm text-ink-aubergine font-light leading-snug mt-0.5 line-clamp-1">
                  {stem.commonName}
                </h3>
                <p className="mt-1 text-[9.5px] font-sans font-light text-ink-aubergine/70 line-clamp-2 leading-relaxed">
                  {stem.story}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-ink-aubergine/10 flex items-center justify-between text-[9px] font-sans text-ink-aubergine/60">
                <span className="truncate">{stem.fragranceProfile}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRequestStem(stem);
                }}
                className="mt-2 w-full py-1.5 rounded-full bg-[#25D366] text-white font-sans text-[9px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
              >
                <MessageCircle className="w-2.5 h-2.5 fill-white stroke-none" />
                <span>WhatsApp</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP VIEW: 100% UNTOUCHED & PRESERVED EXACTLY AS YOU LOVE */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full min-w-0">
        <AnimatePresence>
          {filteredStems.map((stem) => (
            <motion.div
              key={stem.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedStem(stem)}
              className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-ink-aubergine/10 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between w-full min-w-0"
              data-cursor="STEM"
            >
              {/* Image with Arch Masking */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-ink-aubergine/5">
                <Image
                  src={stem.imageUrl}
                  alt={stem.commonName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Season Tag */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest bg-white/80 backdrop-blur-md text-ink-aubergine shadow-sm">
                  {stem.seasonLabel}
                </div>

                {/* Palette Swatches */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {stem.colorPalette.map((color, cIdx) => (
                    <span
                      key={cIdx}
                      className="w-3.5 h-3.5 rounded-full border border-white/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Stem Details */}
              <div className="p-5 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <span className="font-serif italic text-xs sm:text-sm text-mulberry-wine block">
                    {stem.botanicalName}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-ink-aubergine font-light mt-0.5">
                    {stem.commonName}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm font-sans font-light text-ink-aubergine/75 line-clamp-2 leading-relaxed">
                    {stem.story}
                  </p>
                </div>

                {/* Botanical Specs */}
                <div className="mt-4 pt-4 border-t border-ink-aubergine/10 space-y-2 text-[11px] font-sans text-ink-aubergine/70">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-aubergine/45 uppercase tracking-wider text-[10px]">
                      Fragrance
                    </span>
                    <span className="font-medium text-ink-aubergine">
                      {stem.fragranceProfile}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-aubergine/45 uppercase tracking-wider text-[10px]">
                      Ideal Setting
                    </span>
                    <span className="font-medium text-ink-aubergine text-right line-clamp-1">
                      {stem.idealSetting}
                    </span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-5 pt-4 border-t border-ink-aubergine/10 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequestStem(stem);
                    }}
                    className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest font-semibold text-mulberry-wine hover:text-marigold-glow transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Request on WhatsApp</span>
                  </button>

                  <span className="text-[9.5px] sm:text-[10px] uppercase tracking-widest text-ink-aubergine/40 shrink-0">
                    Botanical Spec
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stem Detail Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedStem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setSelectedStem(null);
                }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-aubergine/90 backdrop-blur-xl p-4 sm:p-8 select-none"
              >
                <div className="relative max-w-2xl w-full bg-butter-cream rounded-3xl p-5 sm:p-10 shadow-2xl border border-ink-aubergine/15 max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => setSelectedStem(null)}
                    aria-label="Close modal"
                    className="absolute top-4 sm:top-5 right-4 sm:right-5 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-ink-aubergine/10 hover:bg-ink-aubergine/20 flex items-center justify-center text-ink-aubergine transition-colors z-20 shadow-md font-bold"
                  >
                    ✕
                  </button>

              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                <div className="relative w-full sm:w-1/2 aspect-[16/11] sm:aspect-[4/5] rounded-2xl overflow-hidden shrink-0 shadow-lg">
                  <Image
                    src={selectedStem.imageUrl}
                    alt={selectedStem.commonName}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 text-ink-aubergine">
                  <span className="font-serif italic text-sm text-mulberry-wine">
                    {selectedStem.botanicalName}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light mt-0.5">
                    {selectedStem.commonName}
                  </h3>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[10px] font-sans tracking-widest uppercase bg-mulberry-wine/10 px-3 py-1 rounded-full text-mulberry-wine font-medium">
                      {selectedStem.seasonLabel}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm font-sans font-light text-ink-aubergine/80 leading-relaxed">
                    {selectedStem.story}
                  </p>

                  <div className="mt-5 space-y-2 text-xs font-sans border-t border-ink-aubergine/10 pt-4">
                    <div>
                      <span className="text-ink-aubergine/50 uppercase tracking-wider text-[10px] block">
                        Texture &amp; Form
                      </span>
                      <p className="text-ink-aubergine font-medium">
                        {selectedStem.petalTexture}
                      </p>
                    </div>
                    <div>
                      <span className="text-ink-aubergine/50 uppercase tracking-wider text-[10px] block">
                        Fragrance Profile
                      </span>
                      <p className="text-ink-aubergine font-medium">
                        {selectedStem.fragranceProfile}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleRequestStem(selectedStem);
                      setSelectedStem(null);
                    }}
                    className="mt-6 w-full py-3.5 rounded-full bg-[#25D366] text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                    <span>Include in My Bespoke Design</span>
                  </button>
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

