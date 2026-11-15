"use client";

import React from "react";
import BrandLogo from "@/components/brand/BrandLogo";
import { SITE_CONTENT } from "@/content/site";
import { Instagram, ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  const { brand, footer } = SITE_CONTENT;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-ink-aubergine text-butter-cream border-t border-white/10 overflow-hidden pt-12 sm:pt-16 pb-8 sm:pb-12 select-none">
      {/* Huge Subtle Outlined Type Marquee (Carefully contained so no horizontal overflow occurs) */}
      <div className="w-full overflow-hidden whitespace-nowrap opacity-15 mb-10 sm:mb-14 pointer-events-none select-none max-w-full">
        <div className="inline-block animate-marquee-scroll">
          <span className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] text-transparent [-webkit-text-stroke:1px_#FBF4E6]">
            {footer.marqueeText.repeat(4)}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* ============================================================== */}
        {/* MOBILE EXCLUSIVE FOOTER: High-Fashion Luxury Atelier Layout */}
        {/* ============================================================== */}
        <div className="md:hidden flex flex-col gap-7 pb-10 border-b border-white/10">
          {/* Brand & Crest Header */}
          <div className="flex flex-col items-center text-center">
            <BrandLogo variant="light" size="lg" />
            <p className="mt-3 text-xs font-sans font-light text-butter-cream/70 max-w-xs leading-relaxed">
              {footer.tagline}
            </p>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-butter-cream text-[10.5px] font-sans tracking-widest uppercase border border-white/10"
            >
              <Instagram className="w-3.5 h-3.5 text-marigold-glow" />
              <span>Follow {brand.instagramHandle}</span>
            </a>
          </div>

          {/* Navigation Index: Symmetrical 2-Column Luxury Directory */}
          <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
              <span className="text-[9.5px] uppercase font-sans tracking-[0.25em] text-apricot-blush font-semibold">
                Atelier Directory
              </span>
              <span className="text-[8.5px] font-sans tracking-widest text-butter-cream/40 uppercase">
                Index
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                { num: "01", label: "Philosophy", href: "#philosophy" },
                { num: "02", label: "Creations", href: "#creations" },
                { num: "03", label: "Floral Craft", href: "#services" },
                { num: "04", label: "Studio Reels", href: "#reels" },
                { num: "05", label: "Journal", href: "#journal" },
                { num: "06", label: "Enquire", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-baseline justify-between py-1.5 border-b border-white/5 text-butter-cream/80 hover:text-apricot-blush transition-colors"
                >
                  <span className="font-serif text-sm font-light tracking-wide group-hover:text-butter-cream transition-colors">
                    {item.label}
                  </span>
                  <span className="text-[9px] font-sans tracking-widest text-butter-cream/30 group-hover:text-marigold-glow transition-colors">
                    {item.num} →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Atelier Direction & Founder Signature Card */}
          <div className="relative rounded-2xl p-4 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9.5px] uppercase font-sans tracking-[0.22em] text-apricot-blush font-semibold">
                Atelier Direction
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            </div>

            <h4 className="font-serif text-xl font-light text-butter-cream tracking-wide">
              {brand.owner}
            </h4>

            <p className="font-serif italic text-xs text-apricot-blush mt-0.5">
              {brand.role}
            </p>

            <p className="text-[11px] font-sans text-butter-cream/70 mt-2 leading-relaxed">
              {brand.locationDisplay}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-[10.5px] font-sans uppercase tracking-wider text-marigold-glow font-medium hover:underline"
              >
                <span>Consult with Jensi</span>
                <span className="text-xs">→</span>
              </a>
              <span className="text-[9px] font-sans uppercase tracking-widest text-butter-cream/40">
                Private Atelier
              </span>
            </div>
          </div>

          {/* Return to Dawn (Back to Top) Centered Button */}
          <div className="flex justify-center pt-1">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-butter-cream/80 hover:text-butter-cream text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-sm"
            >
              <span>Return to Dawn</span>
              <ArrowUp className="w-3.5 h-3.5 text-marigold-glow" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP EXCLUSIVE FOOTER: 100% UNTOUCHED & PRESERVED */}
        {/* ============================================================== */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col">
            <BrandLogo variant="light" size="lg" />
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm font-sans font-light text-butter-cream/70 max-w-sm leading-relaxed">
              {footer.tagline}
            </p>
            <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/10 hover:bg-marigold-glow hover:text-ink-aubergine text-butter-cream flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs font-sans text-butter-cream/60">
                {brand.instagramHandle}
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-apricot-blush font-semibold mb-3 sm:mb-4">
              Navigation
            </span>
            <ul className="space-y-2 sm:space-y-2.5 text-xs font-sans uppercase tracking-[0.18em] text-butter-cream/75">
              <li>
                <a href="#philosophy" className="hover:text-butter-cream transition-colors">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#creations" className="hover:text-butter-cream transition-colors">
                  The Bloom Archive
                </a>
              </li>
              <li>
                <a href="#stems" className="hover:text-butter-cream transition-colors">
                  Stem Library
                </a>
              </li>
              <li>
                <a href="#workshop" className="hover:text-butter-cream transition-colors">
                  Mood Workshop
                </a>
              </li>
              <li>
                <a href="#scope" className="hover:text-butter-cream transition-colors">
                  Event Scope
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-butter-cream transition-colors">
                  Floral Craft
                </a>
              </li>
              <li>
                <a href="#reels" className="hover:text-butter-cream transition-colors">
                  Studio Reels
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-butter-cream transition-colors">
                  Instagram Journal
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-butter-cream transition-colors">
                  Enquire &amp; Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier Details Column */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-apricot-blush font-semibold mb-3 sm:mb-4 block">
                Atelier Direction
              </span>
              <p className="font-serif text-base sm:text-lg text-butter-cream">
                {brand.owner}
              </p>
              <p className="text-xs font-sans text-butter-cream/60 mt-0.5">
                {brand.role}
              </p>
              <p className="text-xs font-sans text-butter-cream/60 mt-2 sm:mt-3">
                {brand.locationDisplay}
              </p>
            </div>

            {/* Back to top button */}
            <div className="mt-6 sm:mt-8">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-marigold-glow hover:text-white transition-colors"
              >
                <span>Return to dawn</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Signature */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-butter-cream/50 gap-3 sm:gap-4 text-center sm:text-left">
          <p>{footer.copyrightNotice}</p>
          <p className="font-serif italic text-butter-cream/80 text-xs sm:text-sm">
            &ldquo;{brand.name} — {brand.subtagline}&rdquo;
          </p>
          <p>{footer.credits}</p>
        </div>
      </div>
    </footer>
  );
}
