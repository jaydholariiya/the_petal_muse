"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Three.js particle canvas with SSR disabled
const TickerParticlesCanvas = dynamic(() => import("./TickerParticlesCanvas"), {
  ssr: false,
});

interface CategoryCharm {
  id: string;
  name: string;
  slug: string;
  badge?: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

const CATEGORY_CHARMS: CategoryCharm[] = [
  // 1. Editorial Keepsake Magazines
  {
    id: "cat-01",
    name: "Editorial Keepsake Magazines",
    slug: "magazine",
    badge: "Bridal Story",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M3 5a2 2 0 0 1 2-2h6a1.5 1.5 0 0 1 1.5 1.5V19a1 1 0 0 0-1-1H5a2 2 0 0 0-2 2V5z" fill="currentColor" fillOpacity="0.18" />
        <path d="M21 5a2 2 0 0 0-2-2h-6a1.5 1.5 0 0 0-1.5 1.5V19a1 1 0 0 1 1-1h6a2 2 0 0 1 2 2V5z" fill="currentColor" fillOpacity="0.18" />
        <line x1="6" y1="8" x2="9.5" y2="8" strokeLinecap="round" />
        <line x1="6" y1="11" x2="10" y2="11" strokeLinecap="round" />
        <line x1="14.5" y1="8" x2="18" y2="8" strokeLinecap="round" />
        <line x1="14.5" y1="11" x2="18" y2="11" strokeLinecap="round" />
        <path d="M12 4.5v14" strokeDasharray="1 1.5" />
      </svg>
    ),
  },
  // 2. Bespoke Artisanal & Bridal Bouquets
  {
    id: "cat-02",
    name: "Bespoke Bridal Bouquets",
    slug: "bouquets",
    badge: "Silk Velvet",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <circle cx="8.5" cy="7.5" r="2.8" fill="currentColor" fillOpacity="0.25" />
        <circle cx="15.5" cy="7.5" r="2.8" fill="currentColor" fillOpacity="0.25" />
        <circle cx="12" cy="5" r="2.8" fill="currentColor" fillOpacity="0.4" />
        <path d="M8 12.5l3.5 8m4.5-8l-3.5 8m-1-4.5h2" strokeLinecap="round" />
        <path d="M9.5 14c1.5 1 3.5 1 5 0" />
        <circle cx="12" cy="9.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  // 3. Botanical & Baby Footprint Frames
  {
    id: "cat-03",
    name: "Botanical Baby & Photo Frames",
    slug: "photo-frames",
    badge: "Newborn Art",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="4" y="3" width="16" height="18" rx="2" fill="currentColor" fillOpacity="0.15" />
        <rect x="6.5" y="5.5" width="11" height="13" rx="1" strokeDasharray="1 1.5" />
        <ellipse cx="11.5" cy="12.5" rx="1.6" ry="2.6" fill="currentColor" />
        <circle cx="10" cy="8.8" r="0.65" fill="currentColor" />
        <circle cx="11.5" cy="8.2" r="0.75" fill="currentColor" />
        <circle cx="13" cy="8.8" r="0.65" fill="currentColor" />
      </svg>
    ),
  },
  // 4. Artisan Chocolate Bouquets
  {
    id: "cat-04",
    name: "Artisan Chocolate Bouquets",
    slug: "chocolate-bouquets",
    badge: "Ferrero Roses",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <circle cx="12" cy="7.5" r="3.8" fill="currentColor" fillOpacity="0.3" />
        <circle cx="12" cy="7.5" r="1.8" fill="currentColor" />
        <path d="M7.5 10.5l4.5 10.5 4.5-10.5" strokeLinecap="round" />
        <path d="M6.5 10.5c2.5-1.5 8.5-1.5 11 0" />
        <line x1="12" y1="12" x2="12" y2="20" strokeLinecap="round" />
      </svg>
    ),
  },
  // 5. Three-Part Luxury Hampers
  {
    id: "cat-05",
    name: "Three-Part Luxury Hampers",
    slug: "hamper-boxes",
    badge: "VIP Curation",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3" y="9" width="18" height="12" rx="2" fill="currentColor" fillOpacity="0.22" />
        <path d="M2 9h20v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
        <line x1="12" y1="6" x2="12" y2="21" />
        <path d="M12 6c-2-2-4-2-4 0s2 2 4 0zm0 0c2-2 4-2 4 0s-2 2-4 0z" fill="currentColor" />
        <circle cx="12" cy="6" r="1" fill="#E8A93B" />
      </svg>
    ),
  },
  // 6. Tactile Pipe Cleaner Blooms
  {
    id: "cat-06",
    name: "Tactile Pipe Cleaner Blooms",
    slug: "pipe-cleaner-frames",
    badge: "Never Wilts",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <circle cx="12" cy="9" r="2.8" fill="currentColor" fillOpacity="0.3" />
        <path d="M12 2.5c.8 1.2.8 2.3 0 3.5-.8-1.2-.8-2.3 0-3.5z" fill="currentColor" />
        <path d="M12 12c.8 1.2.8 2.3 0 3.5-.8-1.2-.8-2.3 0-3.5z" fill="currentColor" />
        <path d="M5.5 9c1.2-.8 2.3-.8 3.5 0-1.2.8-2.3.8-3.5 0z" fill="currentColor" />
        <path d="M15 9c1.2-.8 2.3-.8 3.5 0-1.2.8-2.3.8-3.5 0z" fill="currentColor" />
        <path d="M12 14c-1 3-2 5-1 7" strokeLinecap="round" />
        <path d="M11 17c2-1 3-1 4 0" strokeLinecap="round" />
      </svg>
    ),
  },
  // 7. Atelier Botanical Desk Cloches
  {
    id: "cat-07",
    name: "Atelier Botanical Desk Cloches",
    slug: "desk-decor",
    badge: "Walnut Base",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <circle cx="12" cy="2" r="1.2" fill="currentColor" />
        <path d="M6 18c0-5 2.5-13 6-13s6 8 6 13" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <rect x="5" y="18" width="14" height="2.5" rx="1" fill="currentColor" fillOpacity="0.3" />
        <circle cx="12" cy="11.5" r="1.8" fill="currentColor" />
        <path d="M12 13.3v3" />
      </svg>
    ),
  },
  // 8. Real Pressed Flower Mobile Covers
  {
    id: "cat-08",
    name: "Real Pressed Flower Mobile Covers",
    slug: "mobile-covers",
    badge: "24k Gold Flakes",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="6" y="2" width="12" height="20" rx="3" fill="currentColor" fillOpacity="0.12" />
        <circle cx="12" cy="18" r="0.8" fill="currentColor" />
        <path d="M12 7c-1.5 1.5-1.5 3.5 0 5 1.5-1.5 1.5-3.5 0-5z" fill="currentColor" fillOpacity="0.35" />
        <path d="M10 9.5c1.5-1.5 3.5-1.5 5 0-1.5 1.5-3.5 1.5-5 0z" fill="currentColor" fillOpacity="0.35" />
        <circle cx="12" cy="9.5" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  // 9. Antique Vintage Botanical Frames
  {
    id: "cat-09",
    name: "Antique Vintage Frames",
    slug: "vintage-frames",
    badge: "Heirloom Patina",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <ellipse cx="12" cy="12" rx="7.5" ry="9.5" fill="currentColor" fillOpacity="0.18" />
        <ellipse cx="12" cy="12" rx="5.2" ry="7.2" strokeDasharray="1 1.5" />
        <circle cx="12" cy="1.8" r="1.2" fill="currentColor" />
        <circle cx="12" cy="22.2" r="1.2" fill="currentColor" />
        <path d="M12 9c-1 2-1 4 0 6" strokeLinecap="round" />
      </svg>
    ),
  },
  // 10. Luminous Glitter Frames
  {
    id: "cat-10",
    name: "Luminous Glitter Frames",
    slug: "glitter-frames",
    badge: "LED Sparkle",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" fill="currentColor" fillOpacity="0.3" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        <circle cx="5" cy="5" r="0.9" fill="currentColor" />
        <circle cx="19" cy="19" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  // 11. Artisanal Decorative Flower Baskets
  {
    id: "cat-11",
    name: "Decorative Flower Baskets",
    slug: "decorative-baskets",
    badge: "Woven Willow",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M6 10a6 6 0 0 1 12 0" />
        <path d="M4 10h16l-2 10H6L4 10z" fill="currentColor" fillOpacity="0.22" />
        <line x1="8" y1="10" x2="10" y2="20" strokeLinecap="round" />
        <line x1="16" y1="10" x2="14" y2="20" strokeLinecap="round" />
        <circle cx="12" cy="6.5" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  // 12. Handmade Flower Cards & Polaroid Albums
  {
    id: "cat-12",
    name: "Polaroid Albums & Cards",
    slug: "flower-cards",
    badge: "Deckle Cotton",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="4" y="3" width="16" height="18" rx="1.5" fill="currentColor" fillOpacity="0.18" />
        <rect x="6" y="5" width="12" height="10" rx="0.5" fill="currentColor" fillOpacity="0.35" />
        <circle cx="12" cy="19" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  // 13. Customized Combo Gift Suites
  {
    id: "cat-13",
    name: "Customized Combo Suites",
    slug: "combo-gifts",
    badge: "Ultimate Curation",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3" y="10" width="10" height="10" rx="1.5" fill="currentColor" fillOpacity="0.2" />
        <rect x="9" y="4" width="12" height="12" rx="1.5" fill="currentColor" fillOpacity="0.32" />
        <circle cx="15" cy="10" r="1.6" fill="currentColor" />
        <circle cx="8" cy="15" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  // 14. Deluxe Chocolate Floral Towers
  {
    id: "cat-14",
    name: "Chocolate Floral Towers",
    slug: "chocolate-arrangements",
    badge: "3-Tier Gourmet",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="4" y="15" width="16" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
        <rect x="6" y="9.5" width="12" height="5.5" rx="1" fill="currentColor" fillOpacity="0.3" />
        <rect x="8.5" y="4.5" width="7" height="5" rx="1" fill="currentColor" fillOpacity="0.4" />
        <circle cx="12" cy="2.2" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  // 15. Archival Celebration & Milestone Cards
  {
    id: "cat-15",
    name: "Milestone Celebration Cards",
    slug: "celebration-cards",
    badge: "Gilded Hot-Foil",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3" y="5" width="18" height="14" rx="1.5" fill="currentColor" fillOpacity="0.18" />
        <path d="M3 6l9 7 9-7" />
        <circle cx="12" cy="13" r="2.6" fill="currentColor" />
        <path d="M12 11.6c-.6.6-.6 1.6 0 2.2" stroke="#1B1220" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function EditorialTicker() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Duplicate stream for seamless 60fps infinite marquee loop (-50% translation)
  const stream = [...CATEGORY_CHARMS, ...CATEGORY_CHARMS];

  const handleCharmClick = (categoryId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("selectCategory", { detail: categoryId }));
      const el = document.getElementById("collections");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      aria-label="Atelier 15 Categories Jewelry Charms Runway"
      className="relative w-full pt-1 pb-24 sm:pb-28 my-1 sm:my-2 overflow-hidden select-none"
    >
      {/* Clean, Seamless Obsidian Runway Ribbon */}
      <div className="relative w-full py-4 sm:py-5 bg-gradient-to-r from-[#070208] via-[#1B0B20] to-[#070208]">
        {/* Three.js Ethereal Golden Pollen & Stardust River */}
        <TickerParticlesCanvas />

        {/* Subtle Ambient Starlight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,169,59,0.12)_0%,transparent_75%)] pointer-events-none" />

        {/* Vignette Edge Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#070208] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#070208] to-transparent z-20" />

        {/* Continuous Scrolling Charms Stream */}
        <div
          className="flex w-max items-center animate-marquee-scroll hover:[animation-play-state:paused] will-change-transform relative z-20"
          style={{ animationDuration: "55s" }}
        >
          {stream.map((item, idx) => {
            const isHovered = hoveredId === `${item.id}-${idx}`;

            return (
              <div key={idx} className="relative flex flex-col items-center mx-7 sm:mx-10 md:mx-14">
                {/* Upper Runway Typography in 100% Pure Crisp White */}
                <div className="flex items-center gap-3">
                  <span className="font-serif text-base sm:text-xl md:text-2xl font-light tracking-[0.2em] sm:tracking-[0.26em] uppercase text-white whitespace-nowrap">
                    {item.name}
                  </span>

                  {/* Golden Starlight Floral Accent */}
                  <span className="text-marigold-glow text-xs sm:text-sm pl-2 select-none">
                    {idx % 3 === 0 ? "✦" : idx % 3 === 1 ? "✿" : "✧"}
                  </span>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* HAUTE COUTURE TORAN PENDULUM WITH DELICATE GOLDEN HANGING LINE */}
                {/* ------------------------------------------------------------- */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center pt-0 z-30 pointer-events-auto transition-transform duration-300 origin-top ${
                    idx % 3 === 0
                      ? "animate-toran-sway-1"
                      : idx % 3 === 1
                      ? "animate-toran-sway-2"
                      : "animate-toran-sway-3"
                  } ${isHovered ? "[animation-play-state:paused] scale-110" : ""}`}
                >
                  {/* Golden Toran Hanging Cord + Eyelet Ring */}
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 shadow-sm -mt-0.5" />
                    <div className="w-[1.5px] h-3.5 sm:h-5 bg-gradient-to-b from-marigold-glow via-marigold-glow/80 to-marigold-glow/40" />
                    <div className="w-2.5 h-2.5 rounded-full border border-marigold-glow/90 bg-[#1A0B1E] shadow-sm -mt-0.5" />
                  </div>

                  {/* Haute Couture Botanical Medallion Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCharmClick(item.id);
                    }}
                    onMouseEnter={() => setHoveredId(`${item.id}-${idx}`)}
                    onMouseLeave={() => setHoveredId(null)}
                    title={`Click to open ${item.name} collection`}
                    className="group relative mt-0.5 cursor-pointer outline-none transition-transform duration-300"
                  >
                    {/* Clean Golden Ring Rim */}
                    <div
                      className={`p-[2px] rounded-full transition-all duration-300 ${
                        isHovered
                          ? "bg-gradient-to-b from-white via-amber-300 to-amber-500 scale-105"
                          : "bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600"
                      }`}
                    >
                      {/* Deep Obsidian Velvet Glass Core */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#251029] via-[#140618] to-[#0A020C] flex items-center justify-center overflow-hidden border border-white/20">
                        {/* Engraved Concentric Inner Ring */}
                        <div className="absolute inset-1 rounded-full border border-amber-300/25 group-hover:border-amber-300/60 transition-colors pointer-events-none" />

                        {/* High-Contrast Clean B&W Icon (glows golden on hover) */}
                        <div className="relative z-10 text-white group-hover:text-amber-300 transition-colors duration-300 transform group-hover:scale-110">
                          {item.icon({ className: "w-6 h-6 sm:w-7 sm:h-7" })}
                        </div>

                        {/* Subtle Golden Bloom on Hover */}
                        <div className="absolute inset-0 rounded-full bg-marigold-glow/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
