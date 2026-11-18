"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Award, ShieldCheck, Flower2, Heart } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";

export default function AboutSection() {
  const { intro, brand } = SITE_CONTENT;
  const { settings } = useAtelierContent();

  const quoteLarge = settings["about_quoteLarge"] || intro.quoteLarge;
  const philosophyHeadline = settings["about_philosophyHeadline"] || brand.philosophyHeadline;

  // Clean dummy/test placeholders if stored in database
  const isDummyText = (text?: string) =>
    !text ||
    text.includes("Second line here") ||
    text.includes("tabs here") ||
    text.includes("ADD_") ||
    text.trim().length < 20;

  const storyPara1 = isDummyText(settings["about_storyPara1"]) ? brand.brandStory[0] : settings["about_storyPara1"];
  const storyPara2 = isDummyText(settings["about_storyPara2"]) ? brand.brandStory[1] : settings["about_storyPara2"];
  const storyPara3 = isDummyText(settings["about_storyPara3"]) ? brand.brandStory[2] : settings["about_storyPara3"];

  return (
    <section id="philosophy" className="relative pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-28 md:pb-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 mb-6 sm:mb-10">
        <span className="h-[1px] w-8 sm:w-12 bg-mulberry-wine/30" />
        <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
          {intro.eyebrow}
        </span>
      </div>

      {/* Oversized Editorial Quote */}
      <div className="mb-10 sm:mb-20 md:mb-28 max-w-5xl">
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-ink-aubergine leading-[1.18] sm:leading-[1.1] tracking-tight">
          &ldquo;{quoteLarge}&rdquo;
        </h2>
        <p className="mt-3 sm:mt-6 font-serif italic text-base sm:text-xl md:text-2xl text-muted-jade">
          — {philosophyHeadline}
        </p>
      </div>

      {/* Split Asymmetrical Content: Bespoke Atelier Insignia Crest + Atelier Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Left Column: Royal Atelier Monogram Crest & Wax Seal Arch (Zero personal photo needed) */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[3/4] max-w-[290px] sm:max-w-md mx-auto">
            {/* Background offset ornamental frame (desktop only) */}
            <div className="hidden sm:block absolute -inset-3.5 rounded-t-[130px] sm:rounded-arch border border-marigold-glow/30 translate-x-2.5 translate-y-2.5 pointer-events-none" />

            {/* The Royal Arch Emblem Card */}
            <div
              className="relative w-full h-full rounded-t-[100px] sm:rounded-arch overflow-hidden shadow-2xl bg-gradient-to-b from-[#281326] via-[#1a0b18] to-[#10060f] border border-amber-300/35 p-5 sm:p-8 flex flex-col items-center justify-between text-center select-none group"
              data-cursor="ATELIER"
            >
              {/* Inner Concentric Hairline Filigree Border */}
              <div className="absolute inset-2 sm:inset-3 rounded-t-[92px] sm:rounded-arch border border-amber-200/15 pointer-events-none" />

              {/* Shimmering Golden Ambient Lighting */}
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-marigold-glow/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-peony-rose/15 rounded-full blur-3xl pointer-events-none" />

              {/* 1. TOP CROWN & ARCHIVAL ATELIER BANNER */}
              <div className="relative z-10 pt-2 sm:pt-4 flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-marigold-glow/80 mb-1">
                  <span className="w-1.5 h-1.5 rotate-45 bg-marigold-glow/60 inline-block" />
                  <span className="text-[8.5px] sm:text-[9.5px] font-sans uppercase tracking-[0.3em] sm:tracking-[0.35em] text-amber-200/90 font-medium">
                    Atelier Botanique
                  </span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-marigold-glow/60 inline-block" />
                </div>
                <div className="h-[1px] w-20 sm:w-28 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
              </div>

              {/* 2. CENTERPIECE: GILDED ATELIER EMBLEM & WAX SEAL MEDALLION */}
              <div className="relative z-10 my-auto py-2 sm:py-3 flex flex-col items-center">
                {/* Radiant Glow Behind Seal */}
                <div className="relative">
                  <div className="absolute -inset-4 bg-marigold-glow/20 rounded-full blur-xl group-hover:bg-marigold-glow/30 transition-all duration-700" />
                  
                  {/* Outer Embossed Seal */}
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[2px] bg-gradient-to-tr from-amber-600 via-amber-200 to-amber-500 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#341830] to-[#1a0c18] border border-amber-300/30 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                      {/* Radial Seal Lines */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,169,59,0.15)_0%,transparent_70%)]" />

                      {/* Concentric Dotted Ring */}
                      <div className="absolute inset-2 rounded-full border border-dashed border-amber-300/30 pointer-events-none" />

                      {/* Botanical Crest SVG Icon */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_2px_8px_rgba(232,169,59,0.4)]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Upward blooming petals */}
                        <path
                          d="M50 16 C57 28, 68 38, 64 52 C60 64, 50 70, 50 70 C50 70, 40 64, 36 52 C32 38, 43 28, 50 16 Z"
                          fill="url(#petalGoldGrad)"
                          stroke="#FCD34D"
                          strokeWidth="1.2"
                        />
                        {/* Side Petal Left */}
                        <path
                          d="M48 48 C36 40, 24 44, 22 56 C20 68, 34 72, 48 64"
                          stroke="#FCD34D"
                          strokeWidth="1.2"
                          fill="url(#petalGoldGradSoft)"
                        />
                        {/* Side Petal Right */}
                        <path
                          d="M52 48 C64 40, 76 44, 78 56 C80 68, 66 72, 52 64"
                          stroke="#FCD34D"
                          strokeWidth="1.2"
                          fill="url(#petalGoldGradSoft)"
                        />
                        {/* Flourishing Monogram Curve */}
                        <path
                          d="M38 78 V34 C38 29, 44 26, 50 26 C56 26, 62 29, 62 36 C62 43, 56 46, 48 46 H38"
                          stroke="#FFFBEB"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        {/* Radiant Dewdrop Accent */}
                        <circle cx="50" cy="36" r="2.2" fill="#FCD34D" />

                        {/* Defs */}
                        <defs>
                          <linearGradient id="petalGoldGrad" x1="50" y1="16" x2="50" y2="70" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FDE68A" />
                            <stop offset="0.5" stopColor="#E8A93B" />
                            <stop offset="1" stopColor="#92400E" />
                          </linearGradient>
                          <linearGradient id="petalGoldGradSoft" x1="50" y1="40" x2="50" y2="72" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FCD34D" stopOpacity="0.4" />
                            <stop offset="1" stopColor="#92400E" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Monogram Seal Text */}
                      <span className="text-[7.5px] sm:text-[8.5px] uppercase font-sans tracking-[0.25em] text-amber-200/90 font-semibold mt-0.5">
                        TPM • GUJARAT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Brand Moniker */}
                <h4 className="font-serif tracking-[0.2em] sm:tracking-[0.26em] text-base sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 font-normal mt-3 sm:mt-4">
                  THE PETAL MUSE
                </h4>
                <p className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.22em] text-amber-200/70 mt-0.5">
                  Haute Keepsakes &amp; Botanical Craft
                </p>
              </div>

              {/* 3. FOUNDER & ATELIER SIGNATURE */}
              <div className="relative z-10 pb-2 sm:pb-3 w-full">
                <div className="h-[1px] w-28 sm:w-36 mx-auto bg-gradient-to-r from-transparent via-amber-300/30 to-transparent mb-2 sm:mb-2.5" />
                <p className="text-[8px] sm:text-[9px] tracking-[0.24em] uppercase text-apricot-blush/80 font-sans font-medium">
                  Creative Direction
                </p>
                <p className="font-serif text-base sm:text-xl font-light tracking-wide text-butter-cream mt-0.5">
                  {brand.owner}
                </p>
                <p className="text-[9px] sm:text-[10.5px] text-butter-cream/65 font-sans tracking-widest mt-0.5">
                  {brand.role} • Gujarat, India
                </p>
              </div>
            </div>

            {/* Secondary Floating Seal: 3D Wax Stamp & Certificate of Artistry */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 p-3 rounded-2xl bg-gradient-to-br from-[#2f132a] to-[#180a16] border border-amber-300/40 shadow-2xl items-center gap-3 backdrop-blur-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-[1.5px] shrink-0 shadow-md">
                <div className="w-full h-full rounded-full bg-[#3c1535] flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
              </div>
              <div className="pr-1 text-left">
                <span className="text-[8px] uppercase tracking-widest text-amber-200/80 font-sans font-semibold block">
                  100% Bespoke Craft
                </span>
                <p className="font-serif italic text-xs text-butter-cream leading-tight">
                  Handcrafted with Intention
                </p>
              </div>
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
            {[storyPara1, storyPara2, storyPara3].filter(Boolean).map((paragraph, idx) => (
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
