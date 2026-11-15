"use client";

import React from "react";
import { Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";

export default function FloralCareRituals() {
  const { careRituals } = SITE_CONTENT;

  return (
    <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-4 py-1.5 rounded-full bg-mulberry-wine/10 text-mulberry-wine text-[10px] sm:text-xs uppercase font-sans tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
          <span>{careRituals.eyebrow}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
          {careRituals.title}
        </h2>
        <p className="mt-3 font-serif italic text-base sm:text-lg md:text-xl text-muted-jade">
          {careRituals.subtitle}
        </p>
        <p className="mt-3 text-xs sm:text-sm md:text-base font-sans font-light text-ink-aubergine/70 leading-relaxed max-w-xl mx-auto">
          {careRituals.description}
        </p>
      </div>

      {/* Ritual Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {careRituals.rituals.map((ritual) => (
          <div
            key={ritual.id}
            className="group rounded-3xl p-6 sm:p-8 bg-white/70 backdrop-blur-md border border-ink-aubergine/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl sm:text-4xl text-mulberry-wine/60 font-light group-hover:text-mulberry-wine transition-colors">
                  {ritual.stepNumber}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-marigold-glow font-semibold bg-marigold-glow/10 px-2.5 py-1 rounded-full">
                  Ritual
                </span>
              </div>

              <span className="text-[10px] uppercase font-sans tracking-widest text-muted-jade block mb-1">
                {ritual.tagline}
              </span>

              <h3 className="font-serif text-xl sm:text-2xl text-ink-aubergine font-light leading-snug">
                {ritual.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm font-sans font-light text-ink-aubergine/75 leading-relaxed">
                {ritual.instruction}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ink-aubergine/10">
              <span className="text-[9px] uppercase font-sans tracking-widest text-ink-aubergine/45 block mb-1">
                Atelier Pro Tip
              </span>
              <p className="text-[11px] font-sans italic text-mulberry-wine leading-relaxed">
                &ldquo;{ritual.proTip}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

