"use client";

import React from "react";
import Image from "next/image";
import { Instagram, ArrowUpRight, Sparkles } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";

export default function InstagramJournal() {
  const { journal, brand } = SITE_CONTENT;

  return (
    <section id="journal" className="relative py-16 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-6 sm:pb-8 mb-8 sm:mb-14">
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-mulberry-wine" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
              From Our Instagram Journal
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
            Follow The Journey • <br />
            <span className="italic font-serif text-mulberry-wine">
              {brand.instagramHandle}
            </span>
          </h2>
        </div>

        <div className="mt-4 md:mt-0">
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-ink-aubergine text-butter-cream text-xs font-sans tracking-[0.18em] sm:tracking-[0.2em] uppercase font-medium hover:bg-mulberry-wine transition-colors duration-300 shadow-md"
          >
            <span>Follow @the.petalmusee</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Modern High-Fashion 2-Column Mobile & 3-Column Desktop Editorial Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
        {journal.map((post) => (
          <a
            key={post.id}
            href={post.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square bg-ink-aubergine/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end"
            data-cursor="INSTAGRAM"
          >
            <Image
              src={post.imageUrl}
              alt={post.caption}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 350px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/90 via-ink-aubergine/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Top Right Instagram Icon */}
            <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>

            {/* Bottom Caption Overlay */}
            <div className="relative z-10 p-3 sm:p-5 text-butter-cream">
              <div className="flex items-center justify-between text-[8.5px] sm:text-[10px] font-sans tracking-wider sm:tracking-widest uppercase text-apricot-blush mb-0.5 sm:mb-1">
                <span>{post.date}</span>
                <span className="hidden sm:flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-marigold-glow" /> Atelier
                </span>
              </div>
              <p className="font-sans text-[10.5px] sm:text-xs font-light text-butter-cream/90 line-clamp-2 leading-tight sm:leading-relaxed">
                {post.caption}
              </p>
              <div className="mt-1.5 sm:mt-2.5 flex items-center gap-1 text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.16em] sm:tracking-[0.2em] text-marigold-glow opacity-80 group-hover:opacity-100 transition-opacity">
                <span>View on Instagram</span>
                <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
