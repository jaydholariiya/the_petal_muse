"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_CONTENT } from "@/content/site";

export default function HeroSection() {
  const { hero, brand } = SITE_CONTENT;

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between pt-20 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Top ambient editorial badge */}
      <div className="flex items-center justify-between border-b border-ink-aubergine/10 pb-3 sm:pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-marigold-glow animate-pulse" />
          <span className="text-[9.5px] sm:text-xs font-sans tracking-[0.22em] sm:tracking-[0.3em] uppercase text-ink-aubergine/70">
            {hero.eyebrow}
          </span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[9.5px] sm:text-xs font-sans tracking-[0.18em] sm:tracking-[0.25em] uppercase text-muted-jade"
        >
          {hero.badgeText}
        </motion.span>
      </div>

      {/* Main Asymmetrical Editorial Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-10">
        {/* Left Column: Oversized Typographic Statement */}
        <div className="lg:col-span-7 flex flex-col z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[7.2rem] font-light leading-[0.98] sm:leading-[0.94] text-ink-aubergine tracking-tight">
              <span className="block italic">{hero.headlineLine1}</span>
              <span className="block font-normal text-mulberry-wine font-serif">
                {hero.headlineLine2}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-ink-aubergine/80 max-w-xl mx-auto lg:mx-0 font-sans font-light leading-relaxed"
          >
            {hero.description}
          </motion.p>

          {/* Action CTAs (Mobile Stack, Desktop Row) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 w-full sm:w-auto"
          >
            <a href="#creations" className="w-full sm:w-auto">
              <MagneticButton variant="primary" className="w-full sm:w-auto py-3.5">
                <span>{hero.ctaPrimary}</span>
              </MagneticButton>
            </a>

            {/* Desktop link to interactive mood workshop */}
            <a href="#workshop" className="hidden sm:inline-block w-auto">
              <MagneticButton variant="outline" className="w-auto py-3.5">
                <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
                <span>{hero.ctaSecondary}</span>
              </MagneticButton>
            </a>

            {/* Mobile direct link to contact concierge */}
            <a href="#contact" className="sm:hidden w-full">
              <MagneticButton variant="outline" className="w-full py-3.5">
                <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
                <span>CONTACT ATELIER</span>
              </MagneticButton>
            </a>
          </motion.div>

          {/* Quick Credential Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-ink-aubergine/10 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-[10.5px] sm:text-xs text-ink-aubergine/60 font-serif italic"
          >
            <span>Under the creative direction of {brand.owner}</span>
            <span className="text-marigold-glow">•</span>
            <span>Worldwide Destination Projects</span>
          </motion.div>
        </div>

        {/* Right Column: Sculptural Botanical Artwork Mask (Centered on Mobile) */}
        <div className="lg:col-span-5 relative flex items-center justify-center mt-2 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] max-w-[280px] sm:max-w-md mx-auto"
          >
            {/* Outer decorative architectural outline (desktop only to prevent mobile edge overflow) */}
            <div className="hidden sm:block absolute -inset-3 rounded-arch border border-mulberry-wine/20 -rotate-1 pointer-events-none transition-transform duration-700 hover:rotate-0" />
            
            {/* Arch-shaped botanical container with balanced mobile curvature */}
            <div
              className="relative w-full h-full overflow-hidden rounded-t-[90px] sm:rounded-arch shadow-[0_20px_50px_rgba(27,18,32,0.12)] bg-ink-aubergine/5 group"
              data-cursor="BLOOM"
            >
              <Image
                src={hero.backgroundImage}
                alt="THE PETAL MUSE Botanical Sculpture"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 45vw, 400px"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Dawn ambient gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/70 via-transparent to-transparent pointer-events-none" />

              {/* Bottom caption */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-butter-cream z-10 flex items-end justify-between">
                <div>
                  <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-apricot-blush font-sans">
                    Botanical Study 01
                  </p>
                  <p className="font-serif text-base sm:text-lg italic mt-0.5">
                    Ivory &amp; Caramel Flora
                  </p>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-widest font-sans border border-white/30 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1">
                  Atelier
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator with Falling Petal Motif */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex items-center justify-between pt-4 sm:pt-6 border-t border-ink-aubergine/10 text-xs font-sans text-ink-aubergine/60"
      >
        <span className="tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[9px] sm:text-[10px]">
          {brand.instagramHandle}
        </span>

        <a
          href="#philosophy"
          aria-label="Scroll to Atelier Philosophy"
          className="flex items-center gap-2 group cursor-pointer hover:text-ink-aubergine"
        >
          <span className="text-[9px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.28em] uppercase font-medium">
            {hero.scrollHint}
          </span>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-ink-aubergine/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-1">
            <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-marigold-glow" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
