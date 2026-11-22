"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Award, ShieldCheck, Flower2, Heart } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import FramelessBotanicalSculpture3D from "@/components/canvas/FramelessBotanicalSculpture3D";

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

      {/* Split Asymmetrical Content: 3D Botanical Specimen Canvas + Original Atelier Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Left Column: Frameless 3D Kinetic Botanical Sculpture & Monogram Astrolabe (Zero Frame, Zero Box) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <FramelessBotanicalSculpture3D />
        </div>

        {/* Right Column: Original Brand Narrative & Atelier Values (100% Preserved) */}
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
