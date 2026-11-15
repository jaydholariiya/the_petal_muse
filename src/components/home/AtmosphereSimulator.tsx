"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Sunset, Flame, Moon, Sparkles } from "lucide-react";
import { SITE_CONTENT, AtmosphereMode } from "@/content/site";

export default function AtmosphereSimulator() {
  const { atmosphereSimulator } = SITE_CONTENT;
  const [activeModeId, setActiveModeId] = useState<string>("candlelight");

  const activeMode: AtmosphereMode =
    atmosphereSimulator.modes.find((m) => m.id === activeModeId) ||
    atmosphereSimulator.modes[2];

  const modeIcons = {
    morning: Sun,
    golden: Sunset,
    candlelight: Flame,
    midnight: Moon,
  };

  // Lighting overlay styles
  const lightingOverlays: Record<string, string> = {
    morning:
      "bg-gradient-to-t from-[#FBF4E6]/30 via-transparent to-[#FBF4E6]/20 mix-blend-screen",
    golden:
      "bg-gradient-to-tr from-[#E8A93B]/45 via-[#F4B9A0]/25 to-transparent mix-blend-color-burn",
    candlelight:
      "bg-gradient-to-b from-[#1B1220]/75 via-[#E8A93B]/25 to-[#4A1F3D]/80 mix-blend-multiply",
    midnight:
      "bg-gradient-to-b from-[#10251F]/85 via-[#1B1220]/65 to-[#4A1F3D]/90 mix-blend-multiply",
  };

  return (
    <section className="relative py-16 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
        <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-mulberry-wine/10 text-mulberry-wine text-[9.5px] sm:text-xs uppercase font-sans tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
          <span>{atmosphereSimulator.eyebrow}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
          {atmosphereSimulator.title}
        </h2>
        <p className="mt-2 sm:mt-3 font-serif italic text-sm sm:text-lg md:text-xl text-muted-jade">
          {atmosphereSimulator.subtitle}
        </p>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-sans font-light text-ink-aubergine/70 leading-relaxed max-w-xl mx-auto">
          {atmosphereSimulator.description}
        </p>
      </div>

      {/* Mode Selector: 2x2 Grid on Mobile, Row on Desktop (Zero awkward horizontal swipe) */}
      <div className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-12">
        {atmosphereSimulator.modes.map((mode) => {
          const Icon = modeIcons[mode.id];
          const isActive = mode.id === activeModeId;

          return (
            <button
              key={mode.id}
              onClick={() => setActiveModeId(mode.id)}
              className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-sans tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-all duration-300 ${
                isActive
                  ? "bg-ink-aubergine text-butter-cream shadow-md scale-[1.02] sm:scale-105"
                  : "bg-white/70 text-ink-aubergine/70 hover:bg-white hover:text-ink-aubergine border border-ink-aubergine/10"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  isActive ? "text-marigold-glow" : "text-mulberry-wine"
                }`}
              />
              <span className="font-medium truncate">{mode.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Display Card */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-ink-aubergine/10 bg-ink-aubergine text-butter-cream">
        {/* Main Photograph: Dining Tablescape & Floral Setting */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/10] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=2400&q=90"
            alt="THE PETAL MUSE Tablescape Lighting Atmosphere"
            fill
            sizes="100vw"
            className="object-cover transition-all duration-1000 ease-out"
          />

          {/* Dynamic Ambient Lighting Layer */}
          <div
            className={`absolute inset-0 transition-all duration-1000 ${lightingOverlays[activeMode.id]}`}
          />

          {/* Simulated Candlelight Glow Orbs */}
          <AnimatePresence>
            {(activeMode.id === "candlelight" || activeMode.id === "midnight") && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.6, 0.85, 0.6], scale: [0.95, 1.05, 0.95] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-1/3 left-1/3 w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-marigold-glow/40 blur-3xl pointer-events-none"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-1/4 right-1/3 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-[#F4B9A0]/35 blur-3xl pointer-events-none"
                />
              </>
            )}
          </AnimatePresence>

          {/* Floating Time Pill in Corner */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 z-20 flex items-center gap-1.5 bg-ink-aubergine/75 backdrop-blur-md px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/15 text-[9px] sm:text-xs font-sans tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span>{activeMode.timeLabel}</span>
          </div>

          {/* Bottom Ambient Description Ribbon */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 z-20 bg-gradient-to-t from-ink-aubergine via-ink-aubergine/85 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div className="max-w-xl">
              <span className="text-[9px] sm:text-xs font-sans uppercase tracking-[0.25em] text-apricot-blush font-semibold">
                Atmosphere Profile
              </span>
              <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-butter-cream mt-0.5">
                {activeMode.ambience}
              </h3>
              <p className="mt-1 text-[11px] sm:text-sm font-sans font-light text-butter-cream/80 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {activeMode.description}
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center whitespace-nowrap px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-marigold-glow text-ink-aubergine font-sans text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] font-semibold hover:bg-white transition-all shadow-md shrink-0 w-full sm:w-auto text-center"
            >
              Discuss Atmosphere Styling
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
