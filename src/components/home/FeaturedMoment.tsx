"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";

export default function FeaturedMoment() {
  const { featuredCreation } = SITE_CONTENT;
  const { settings } = useAtelierContent();

  const imageUrl = settings["featured_imageUrl"] || featuredCreation.imageUrl;
  const title = settings["featured_title"] || featuredCreation.title;
  const subtitle = settings["featured_subtitle"] || featuredCreation.subtitle;
  const description = settings["featured_description"] || featuredCreation.description;

  return (
    <section className="relative my-16 sm:my-24 md:my-32 overflow-hidden bg-ink-aubergine text-butter-cream py-16 sm:py-24 md:py-36">
      {/* Background Cinematic Artwork with Subtle Parallax */}
      <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover object-center filter saturate-150"
        />
      </div>

      {/* Radial and atmospheric gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-aubergine via-ink-aubergine/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine via-transparent to-ink-aubergine pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center gap-2 mb-2.5 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
            <span className="text-[9.5px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-apricot-blush">
              {featuredCreation.eyebrow}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-butter-cream leading-tight">
            {title}
          </h2>

          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-marigold-glow mt-1.5 sm:mt-2">
            {subtitle}
          </p>

          <p className="mt-3.5 sm:mt-6 text-xs sm:text-base md:text-lg font-sans font-light text-butter-cream/80 max-w-xl leading-relaxed">
            {description}
          </p>

          <div className="mt-6 sm:mt-8">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-marigold-glow text-ink-aubergine font-sans text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold hover:bg-white transition-all duration-300 shadow-xl w-full sm:w-auto text-center"
            >
              <span>{featuredCreation.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Architectural Details Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-6 bg-ink-aubergine/60 backdrop-blur-md p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10">
          {featuredCreation.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col border-b border-white/10 pb-3 sm:pb-4 last:border-b-0">
              <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.18em] sm:tracking-[0.22em] text-butter-cream/50">
                {metric.label}
              </span>
              <span className="font-serif text-base sm:text-xl md:text-2xl text-butter-cream font-light mt-0.5 sm:mt-1">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
