"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";

export default function AboutSection() {
  const { intro, brand } = SITE_CONTENT;

  return (
    <section id="philosophy" className="relative pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-28 md:pb-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 mb-6 sm:mb-10">
        <span className="h-[1px] w-8 sm:w-12 bg-mulberry-wine/30" />
        <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] sm:tracking-[0.3em] text-mulberry-wine">
          {intro.eyebrow}
        </span>
      </div>

      {/* Oversized Editorial Quote */}
      <div className="mb-10 sm:mb-20 md:mb-28 max-w-5xl">
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-ink-aubergine leading-[1.18] sm:leading-[1.1] tracking-tight">
          &ldquo;{intro.quoteLarge}&rdquo;
        </h2>
        <p className="mt-3 sm:mt-6 font-serif italic text-base sm:text-xl md:text-2xl text-muted-jade">
          — {brand.philosophyHeadline}
        </p>
      </div>

      {/* Split Asymmetrical Content: Portrait + Atelier Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Left Column: Portrait of Jensi Dholariya in Architectural Arch Mask */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[3/4] max-w-[280px] sm:max-w-md mx-auto">
            {/* Background offset card border (desktop only) */}
            <div className="hidden sm:block absolute -inset-4 rounded-arch border border-pistachio-sage/40 translate-x-2 translate-y-2 pointer-events-none" />

            {/* Arch-shaped container */}
            <div
              className="relative w-full h-full rounded-t-[90px] sm:rounded-arch overflow-hidden shadow-2xl bg-pistachio-sage/10 group"
              data-cursor="JENSI"
            >
              <Image
                src={intro.portraitImage}
                alt="Jensi Dholariya - Founder & Creative Director of THE PETAL MUSE"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 40vw, 450px"
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Gradient lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating label */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-butter-cream z-10">
                <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-pistachio-sage font-sans">
                  The Founder
                </p>
                <p className="font-serif text-lg sm:text-2xl font-light tracking-wide mt-0.5 sm:mt-1">
                  {brand.owner}
                </p>
                <p className="text-[10px] sm:text-xs text-butter-cream/70 font-sans tracking-widest mt-0.5">
                  {brand.role}
                </p>
              </div>
            </div>

            {/* Secondary small detail photograph */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-butter-cream">
              <Image
                src={intro.detailImage}
                alt="Delicate floral stems"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Brand Narrative & Atelier Values */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.22em] sm:tracking-[0.25em] uppercase text-mulberry-wine font-medium">
            The Hands Behind The Keepsakes &amp; Blooms
          </span>

          <h3 className="font-serif text-xl sm:text-3xl md:text-5xl text-ink-aubergine font-light mt-2 sm:mt-4 leading-tight">
            Handcrafting bespoke keepsakes &amp; living botanical art.
          </h3>

          <div className="mt-4 sm:mt-8 space-y-3.5 sm:space-y-5 text-ink-aubergine/80 font-sans font-light leading-relaxed text-xs sm:text-base md:text-lg">
            {brand.brandStory.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Atelier Stats */}
          <div className="mt-6 sm:mt-12 pt-5 sm:pt-8 border-t border-ink-aubergine/10 grid grid-cols-3 gap-2 sm:gap-6">
            {brand.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-serif text-xl sm:text-3xl md:text-4xl text-mulberry-wine font-light">
                  {stat.value}
                </span>
                <span className="mt-0.5 sm:mt-1 text-[9px] sm:text-[11px] font-sans tracking-[0.14em] sm:tracking-[0.2em] uppercase text-ink-aubergine/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Editorial Signature Note */}
          <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-between text-xs font-sans text-ink-aubergine/60 gap-2">
            <span className="italic font-serif text-sm sm:text-base text-ink-aubergine">
              &ldquo;Where every personalized creation tells an enduring story.&rdquo;
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
              <span className="tracking-[0.18em] uppercase text-[9px] sm:text-[10px]">
                Editorial Craft
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
