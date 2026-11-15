"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, RefreshCw, Check } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function BouquetMoodWorkshop() {
  const { moodDesigner } = SITE_CONTENT;

  // Selected state
  const [occasion, setOccasion] = useState(moodDesigner.occasions[0].name);
  const [paletteId, setPaletteId] = useState(moodDesigner.palettes[0].id);
  const [styleId, setStyleId] = useState(moodDesigner.styles[1].id);

  const activePalette =
    moodDesigner.palettes.find((p) => p.id === paletteId) || moodDesigner.palettes[0];
  const activeStyle =
    moodDesigner.styles.find((s) => s.id === styleId) || moodDesigner.styles[1];

  // Number of petals based on fullness
  const petalCount = activeStyle.id === "sculptural" ? 6 : activeStyle.id === "organic" ? 12 : 18;

  const handleSendToWhatsApp = () => {
    const url = buildWhatsAppUrl({
      occasion,
      palette: `${activePalette.name} (${activePalette.moodTag})`,
      style: `${activeStyle.name} - ${activeStyle.detail}`,
      notes: "I created this bespoke floral concept in your online workshop and would love to bring it to life!",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="workshop" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-4 py-1.5 rounded-full bg-mulberry-wine/10 text-mulberry-wine text-[10px] sm:text-xs uppercase font-sans tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
          <span>Interactive Botanical Workshop</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
          {moodDesigner.title}
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-sans font-light text-ink-aubergine/70 leading-relaxed max-w-xl mx-auto">
          {moodDesigner.description}
        </p>
      </div>

      {/* Workshop Grid: Interactive Preview First on Mobile, Controls Left & Preview Right on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-white/70 backdrop-blur-md rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl border border-ink-aubergine/10">
        {/* Live Botanical SVG Preview: order-1 on mobile so user sees the flower react immediately */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
            {/* Background subtle glow aura */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.6, 0.35],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
              style={{
                backgroundColor: activePalette.accent,
              }}
            />

            {/* Living Botanical SVG Flower that reacts to choices */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full relative z-10 overflow-visible"
            >
              {/* Central Core Stamen */}
              <circle
                cx="100"
                cy="100"
                r={activeStyle.id === "statement" ? 18 : 12}
                fill={activePalette.colors[1] || "#E8A93B"}
                className="transition-all duration-700"
              />
              <circle
                cx="100"
                cy="100"
                r={activeStyle.id === "statement" ? 10 : 6}
                fill={activePalette.colors[0] || "#F4B9A0"}
                className="transition-all duration-700"
              />

              {/* Dynamic Outer Petals */}
              {Array.from({ length: petalCount }).map((_, index) => {
                const angle = (360 / petalCount) * index;
                const color = activePalette.colors[index % activePalette.colors.length];

                return (
                  <motion.g
                    key={`workshop-petal-${index}-${paletteId}-${petalCount}`}
                    initial={{ scale: 0, rotate: angle }}
                    animate={{ scale: 1, rotate: angle }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.03,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    style={{ originX: "100px", originY: "100px" }}
                  >
                    <path
                      d="M100 45 C115 45 125 65 120 85 C115 100 100 105 100 105 C100 105 85 100 80 85 C75 65 85 45 100 45 Z"
                      fill={color}
                      fillOpacity="0.82"
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                    />
                  </motion.g>
                );
              })}

              {/* Inner Petal Ring for Lush and Statement Styles */}
              {petalCount >= 12 &&
                Array.from({ length: 6 }).map((_, index) => {
                  const angle = (360 / 6) * index + 30;
                  const innerColor = activePalette.colors[(index + 1) % activePalette.colors.length];

                  return (
                    <motion.g
                      key={`inner-petal-${index}-${paletteId}`}
                      initial={{ scale: 0, rotate: angle }}
                      animate={{ scale: 0.75, rotate: angle }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.03 }}
                      style={{ originX: "100px", originY: "100px" }}
                    >
                      <path
                        d="M100 55 C110 55 118 70 114 85 C110 95 100 100 100 100 C100 100 90 95 86 85 C82 70 90 55 100 55 Z"
                        fill={innerColor}
                        fillOpacity="0.9"
                        stroke="#FFFFFF"
                        strokeWidth="0.6"
                      />
                    </motion.g>
                  );
                })}
            </svg>
          </div>

          {/* Real-time Concept Summary Badge */}
          <div className="mt-3 sm:mt-6 text-center">
            <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.25em] text-mulberry-wine font-semibold">
              Live Concept Preview
            </span>
            <p className="font-serif text-lg sm:text-2xl text-ink-aubergine font-light mt-0.5">
              {activePalette.name}
            </p>
            <p className="text-[11px] sm:text-xs text-ink-aubergine/60 font-sans mt-0.5">
              {activeStyle.name} • {occasion}
            </p>
          </div>
        </div>

        {/* Step Controls: order-2 on mobile, order-1 on desktop */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-6 sm:gap-8">
          {/* Step 1: Occasion */}
          <div>
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] sm:tracking-[0.2em] text-mulberry-wine font-semibold">
                Step 1 • Choose Your Occasion
              </span>
              <span className="text-[10px] sm:text-[11px] text-ink-aubergine/50 font-sans">{occasion}</span>
            </div>
            {/* MOBILE EXCLUSIVE: Architectural Symmetrical Occasion Selector (2x2 Grid + Full-Width Header) */}
            <div className="grid md:hidden grid-cols-2 gap-2 w-full">
              {moodDesigner.occasions.map((occ, idx) => {
                const isSelected = occasion === occ.name;
                const isFirst = idx === 0;

                return (
                  <button
                    key={`mobile-occ-${occ.id}`}
                    onClick={() => setOccasion(occ.name)}
                    className={`py-2 px-3 rounded-xl text-left border transition-all duration-200 flex items-center justify-between text-xs font-sans ${
                      isFirst ? "col-span-2" : "col-span-1"
                    } ${
                      isSelected
                        ? "bg-ink-aubergine text-butter-cream border-ink-aubergine shadow-sm"
                        : "bg-white/70 text-ink-aubergine/80 border-ink-aubergine/10 hover:bg-white"
                    }`}
                  >
                    <span className="font-medium truncate pr-1">{occ.name}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isSelected ? "bg-marigold-glow" : "bg-ink-aubergine/20"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* DESKTOP EXCLUSIVE: Original Flex-Wrap Row (100% Untouched) */}
            <div className="hidden md:flex flex-wrap gap-2">
              {moodDesigner.occasions.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setOccasion(occ.name)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-sans tracking-wider transition-all duration-200 ${
                    occasion === occ.name
                      ? "bg-ink-aubergine text-butter-cream shadow-sm"
                      : "bg-ink-aubergine/5 text-ink-aubergine/80 hover:bg-ink-aubergine/10"
                  }`}
                >
                  {occ.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Mood Palette */}
          <div>
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] sm:tracking-[0.2em] text-mulberry-wine font-semibold">
                Step 2 • Select Color Atmosphere
              </span>
              <span className="text-[10px] sm:text-[11px] text-marigold-glow font-serif italic">
                {activePalette.moodTag}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {moodDesigner.palettes.map((palette) => {
                const isSelected = palette.id === paletteId;
                return (
                  <div
                    key={palette.id}
                    onClick={() => setPaletteId(palette.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer border transition-all duration-300 ${
                      isSelected
                        ? "border-mulberry-wine bg-mulberry-wine/5 shadow-md"
                        : "border-ink-aubergine/10 bg-white/40 hover:bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm sm:text-base text-ink-aubergine font-medium">
                        {palette.name}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-mulberry-wine" />}
                    </div>

                    <p className="text-[10px] sm:text-[11px] text-ink-aubergine/70 font-sans mt-1">
                      {palette.description}
                    </p>

                    {/* Petal Color Swatches */}
                    <div className="flex items-center gap-1.5 mt-2.5 sm:mt-3">
                      {palette.colors.map((color, cIdx) => (
                        <span
                          key={cIdx}
                          className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Style & Silhouette */}
          <div>
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] sm:tracking-[0.2em] text-mulberry-wine font-semibold">
                Step 3 • Structural Scale &amp; Silhouette
              </span>
              <span className="text-[10px] sm:text-[11px] text-ink-aubergine/60 font-sans">
                {activeStyle.name}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {moodDesigner.styles.map((style) => {
                const isSelected = style.id === styleId;
                return (
                  <button
                    key={style.id}
                    onClick={() => setStyleId(style.id)}
                    className={`p-3 sm:p-3.5 rounded-2xl text-left border transition-all duration-200 ${
                      isSelected
                        ? "border-ink-aubergine bg-ink-aubergine text-butter-cream shadow-md"
                        : "border-ink-aubergine/10 bg-white/40 text-ink-aubergine hover:bg-white/70"
                    }`}
                  >
                    <div className="font-serif text-xs sm:text-sm font-medium">{style.name}</div>
                    <div
                      className={`text-[9px] sm:text-[10px] font-sans mt-1 line-clamp-2 ${
                        isSelected ? "text-butter-cream/80" : "text-ink-aubergine/60"
                      }`}
                    >
                      {style.detail}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* WhatsApp Direct Action */}
          <div className="pt-3 sm:pt-4 border-t border-ink-aubergine/10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <button
              onClick={handleSendToWhatsApp}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#25D366] text-white font-sans text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold hover:bg-[#20ba59] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Send This Idea on WhatsApp</span>
            </button>

            <span className="text-[10px] sm:text-[11px] text-ink-aubergine/50 font-sans text-center sm:text-left">
              Direct consultation with Jensi • No commitment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
