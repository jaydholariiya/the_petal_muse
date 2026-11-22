"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import Three.js particle canvas with SSR disabled
const TickerParticlesCanvas = dynamic(() => import("./TickerParticlesCanvas"), {
  ssr: false,
});

interface CategoryCharm {
  id: string;
  name: string;
  slug: string;
  romanNumeral: string;
  badge: string;
  imageUrl: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

const CATEGORY_CHARMS: CategoryCharm[] = [
  // 1. A4 Magazine
  {
    id: "cat-01",
    name: "A4 Magazine",
    slug: "a4-magazine",
    romanNumeral: "I",
    badge: "Signature Craft",
    imageUrl: "/works/magazines/The Petal Muse Luxury Cover.png",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M3 5a2 2 0 0 1 2-2h6a1.5 1.5 0 0 1 1.5 1.5V19a1 1 0 0 0-1-1H5a2 2 0 0 0-2 2V5z" fill="currentColor" fillOpacity="0.18" />
        <path d="M21 5a2 2 0 0 0-2-2h-6a1.5 1.5 0 0 0-1.5 1.5V19a1 1 0 0 1 1-1h6a2 2 0 0 1 2 2V5z" fill="currentColor" fillOpacity="0.18" />
        <line x1="6" y1="8" x2="9.5" y2="8" strokeLinecap="round" />
        <line x1="6" y1="11" x2="10" y2="11" strokeLinecap="round" />
        <line x1="14.5" y1="8" x2="18" y2="8" strokeLinecap="round" />
        <line x1="14.5" y1="11" x2="18" y2="11" strokeLinecap="round" />
      </svg>
    ),
  },
  // 2. Pipe Cleaner bouquet
  {
    id: "cat-02",
    name: "Pipe Cleaner bouquet",
    slug: "pipe-cleaner-bouquet",
    romanNumeral: "II",
    badge: "Handcrafted Art",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <circle cx="12" cy="9" r="2.8" fill="currentColor" fillOpacity="0.3" />
        <path d="M12 2.5c.8 1.2.8 2.3 0 3.5-.8-1.2-.8-2.3 0-3.5z" fill="currentColor" />
        <path d="M12 12c.8 1.2.8 2.3 0 3.5-.8-1.2-.8-2.3 0-3.5z" fill="currentColor" />
        <path d="M5.5 9c1.2-.8 2.3-.8 3.5 0-1.2.8-2.3.8-3.5 0z" fill="currentColor" />
        <path d="M15 9c1.2-.8 2.3-.8 3.5 0-1.2.8-2.3.8-3.5 0z" fill="currentColor" />
        <path d="M12 14c-1 3-2 5-1 7" strokeLinecap="round" />
      </svg>
    ),
  },
  // 3. Cholocate bouquet
  {
    id: "cat-03",
    name: "Cholocate bouquet",
    slug: "cholocate-bouquet",
    romanNumeral: "III",
    badge: "Sweet Indulgence",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <circle cx="12" cy="7.5" r="3.8" fill="currentColor" fillOpacity="0.3" />
        <circle cx="12" cy="7.5" r="1.8" fill="currentColor" />
        <path d="M7.5 10.5l4.5 10.5 4.5-10.5" strokeLinecap="round" />
        <path d="M6.5 10.5c2.5-1.5 8.5-1.5 11 0" />
      </svg>
    ),
  },
  // 4. bridal bouquet
  {
    id: "cat-04",
    name: "bridal bouquet",
    slug: "bridal-bouquet",
    romanNumeral: "IV",
    badge: "Bridal Classic",
    imageUrl: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <circle cx="8.5" cy="7.5" r="2.8" fill="currentColor" fillOpacity="0.25" />
        <circle cx="15.5" cy="7.5" r="2.8" fill="currentColor" fillOpacity="0.25" />
        <circle cx="12" cy="11.5" r="3.2" fill="currentColor" fillOpacity="0.35" />
        <path d="M10 15c-1 3-2 5-1 7" strokeLinecap="round" />
        <path d="M14 15c1 3 2 5 1 7" strokeLinecap="round" />
      </svg>
    ),
  },
  // 5. Vintage frame
  {
    id: "cat-05",
    name: "Vintage frame",
    slug: "vintage-frame",
    romanNumeral: "V",
    badge: "Antique Grace",
    imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
        <ellipse cx="12" cy="12" rx="4.5" ry="6" fill="currentColor" fillOpacity="0.25" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
  },
  // 6. Frames
  {
    id: "cat-06",
    name: "Frames",
    slug: "frames",
    romanNumeral: "VI",
    badge: "Classic Archival",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <rect x="6.5" y="6.5" width="11" height="11" rx="1" fill="currentColor" fillOpacity="0.2" />
        <circle cx="9.5" cy="9.5" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
  // 7. Gliter Frames
  {
    id: "cat-07",
    name: "Gliter Frames",
    slug: "gliter-frames",
    romanNumeral: "VII",
    badge: "Luminous Shimmer",
    imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M12 7l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="currentColor" />
      </svg>
    ),
  },
  // 8. Celebration Cards
  {
    id: "cat-08",
    name: "Celebration Cards",
    slug: "celebration-cards",
    romanNumeral: "VIII",
    badge: "Milestone Notes",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3" y="4" width="18" height="16" rx="2" fill="currentColor" fillOpacity="0.15" />
        <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  // 9. Hampers
  {
    id: "cat-09",
    name: "Hampers",
    slug: "hampers",
    romanNumeral: "IX",
    badge: "Luxury Suite",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3" y="8" width="18" height="13" rx="1.5" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 8v13" strokeDasharray="1 1.5" />
        <path d="M7 8C7 5 9 3 12 3s5 2 5 5" />
      </svg>
    ),
  },
  // 10. Desk Decorations
  {
    id: "cat-10",
    name: "Desk Decorations",
    slug: "desk-decorations",
    romanNumeral: "X",
    badge: "Atelier Botanical",
    imageUrl: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M6 19h12" strokeLinecap="round" />
        <path d="M7 19l1.5-6h7l1.5 6" fill="currentColor" fillOpacity="0.25" />
        <circle cx="12" cy="7" r="3.2" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  // 11. Flower Baskets
  {
    id: "cat-11",
    name: "Flower Baskets",
    slug: "flower-baskets",
    romanNumeral: "XI",
    badge: "Meadow Harvest",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M4 11h16l-2 9H6l-2-9z" fill="currentColor" fillOpacity="0.25" />
        <path d="M7 11C7 6 9.5 3 12 3s5 3 5 8" />
      </svg>
    ),
  },
  // 12. Customize Combo
  {
    id: "cat-12",
    name: "Customize Combo",
    slug: "customize-combo",
    romanNumeral: "XII",
    badge: "Curated Pairings",
    imageUrl: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3" y="5" width="10" height="10" rx="1.5" fill="currentColor" fillOpacity="0.25" />
        <rect x="11" y="9" width="10" height="10" rx="1.5" fill="currentColor" fillOpacity="0.35" />
        <path d="M13 11v6m-3-3h6" strokeLinecap="round" />
      </svg>
    ),
  },
  // 13. Baby FootPrints
  {
    id: "cat-13",
    name: "Baby FootPrints",
    slug: "baby-footprints",
    romanNumeral: "XIII",
    badge: "Sacred Keepsake",
    imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <ellipse cx="12" cy="14" rx="4" ry="5.5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="8" cy="6.5" r="1.2" fill="currentColor" />
        <circle cx="10.5" cy="5.2" r="1.1" fill="currentColor" />
        <circle cx="13.5" cy="5.2" r="1.1" fill="currentColor" />
        <circle cx="16" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  // 14. Polaroid photo & albums
  {
    id: "cat-14",
    name: "Polaroid photo & albums",
    slug: "polaroid-photo-albums",
    romanNumeral: "XIV",
    badge: "Retro Keepsake",
    imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="4" y="3" width="16" height="18" rx="1.5" fill="currentColor" fillOpacity="0.18" />
        <rect x="6" y="5" width="12" height="10" rx="0.5" fill="currentColor" fillOpacity="0.35" />
        <circle cx="12" cy="19" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  // 15. Cholocate Basket
  {
    id: "cat-15",
    name: "Cholocate Basket",
    slug: "cholocate-basket",
    romanNumeral: "XV",
    badge: "Sensory Delight",
    imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="4" y="15" width="16" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
        <rect x="6" y="9.5" width="12" height="5.5" rx="1" fill="currentColor" fillOpacity="0.3" />
        <circle cx="12" cy="2.2" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function EditorialTicker() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Triple stream for seamless infinite wrapping
  const stream = [...CATEGORY_CHARMS, ...CATEGORY_CHARMS, ...CATEGORY_CHARMS];

  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const velocityRef = useRef(-1.2); // Base auto-scroll drift speed (px/frame)
  const isPointerDownRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const recentDeltasRef = useRef<{ deltaX: number; dt: number }[]>([]);

  // Calculate single set width for seamless infinite loop modulo
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        // 3 duplicate sets; width of 1 set is total / 3
        singleSetWidthRef.current = trackRef.current.scrollWidth / 3;
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 60-120fps physics animation loop with momentum & velocity friction
  useEffect(() => {
    let animId: number;

    const tick = () => {
      if (!isPointerDownRef.current) {
        // Natural high-end kinetic friction decay when releasing drag
        if (Math.abs(velocityRef.current) > 1.25) {
          velocityRef.current *= 0.962; // Silky smooth deceleration curve
        } else {
          // Return smoothly to base constant drift
          velocityRef.current = -1.2;
        }

        // Apply position
        posRef.current += velocityRef.current;
      }

      // Infinite wrapping modulo: if moved past 1 full set, wrap seamlessly
      const setWidth = singleSetWidthRef.current;
      if (setWidth > 0) {
        if (posRef.current <= -setWidth * 2) {
          posRef.current += setWidth;
        } else if (posRef.current >= 0) {
          posRef.current -= setWidth;
        }
      }

      // Apply transform directly to GPU
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;

        // Calculate dynamic pendulum sway angle on medallions based on current velocity
        const clampedVelocity = Math.max(-28, Math.min(28, velocityRef.current));
        const swingAngle = (-clampedVelocity * 1.35).toFixed(1);
        trackRef.current.style.setProperty("--toran-swing", `${swingAngle}deg`);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer Drag Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    setIsDragging(true);
    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    dragDistanceRef.current = 0;
    recentDeltasRef.current = [];
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const deltaX = e.clientX - lastPointerXRef.current;

    posRef.current += deltaX;
    dragDistanceRef.current += Math.abs(deltaX);

    // Track recent movement deltas for true flick release calculation
    recentDeltasRef.current.push({ deltaX, dt });
    if (recentDeltasRef.current.length > 5) {
      recentDeltasRef.current.shift();
    }

    // Instant velocity for immediate visual response
    const instantVelocity = (deltaX / dt) * 16;
    velocityRef.current = instantVelocity;

    lastPointerXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    // Compute weighted average flick velocity from recent deltas
    if (recentDeltasRef.current.length > 0) {
      const totalDelta = recentDeltasRef.current.reduce((acc, curr) => acc + curr.deltaX, 0);
      const totalDt = recentDeltasRef.current.reduce((acc, curr) => acc + curr.dt, 0);
      if (totalDt > 0) {
        const avgVelocity = (totalDelta / totalDt) * 16;
        // Allows high-speed flick up to 38 px/frame for fast scrolling
        velocityRef.current = Math.max(-38, Math.min(38, avgVelocity * 1.3));
      }
    }
  };

  // Support wheel scroll for trackpad & mouse wheel users
  const handleWheel = (e: React.WheelEvent) => {
    // If user is scrolling horizontally or holding Shift, inject velocity
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 4) {
      velocityRef.current = Math.max(-32, Math.min(32, -delta * 0.4));
    }
  };

  const handleCharmClick = (categoryId: string) => {
    // Prevent accidental clicks if user was actively dragging
    if (dragDistanceRef.current > 7) return;

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
      aria-label="Atelier 15 Categories Haute Couture Runway"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className={`relative w-full pt-2 pb-28 sm:pb-32 my-1 overflow-hidden select-none transition-cursor ${isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
    >
      {/* 1. Three.js Ethereal Golden 3D Petals & Stardust River */}
      <TickerParticlesCanvas />

      {/* 2. Haute Couture Obsidian Runway Sash */}
      <div className="relative w-full py-4 sm:py-5 bg-gradient-to-r from-[#070208] via-[#1B0B20] to-[#070208] border-y border-white/10 shadow-2xl">
        {/* Subtle Ambient Starlight Radial Glow (Champagne Silk) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(245,235,220,0.07)_0%,transparent_75%)] pointer-events-none" />

        {/* Left & Right Luxurious Vignette Edge Fade Fringes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-44 bg-gradient-to-r from-[#070208] via-[#070208]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-44 bg-gradient-to-l from-[#070208] via-[#070208]/90 to-transparent z-20" />

        {/* 3. Physics-Driven Scrolling Charms Track (Drag to Fast-Scroll) */}
        <div
          ref={trackRef}
          className="flex w-max items-center will-change-transform relative z-20"
        >
          {stream.map((item, idx) => {
            const isHovered = hoveredId === `${item.id}-${idx}`;

            return (
              <div key={idx} className="relative flex flex-col items-center mx-8 sm:mx-11 md:mx-14 shrink-0">
                {/* Upper Runway Title in Cormorant Garamond Serif */}
                <div className="flex items-center gap-3">
                  <span
                    className={`font-serif text-sm sm:text-lg md:text-xl font-light tracking-[0.22em] sm:tracking-[0.26em] uppercase whitespace-nowrap transition-colors duration-300 ${isHovered
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5EADB] to-[#E2D2BC] drop-shadow-[0_0_8px_rgba(245,234,219,0.4)]"
                      : "text-white/90"
                      }`}
                  >
                    {item.name}
                  </span>

                  {/* Pale Champagne Floral Diamond Accent */}
                  <span className="text-[#D8C7A8]/75 text-xs sm:text-sm pl-2 select-none">
                    {idx % 3 === 0 ? "✦" : idx % 3 === 1 ? "✿" : "✧"}
                  </span>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* HAUTE COUTURE TORAN PENDULUM WITH DYNAMIC VELOCITY SWAY       */}
                {/* ------------------------------------------------------------- */}
                <div
                  style={{
                    transform: `rotate(var(--toran-swing, 0deg)) scale(${isHovered ? 1.08 : 1})`,
                    transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center pt-0 z-30 pointer-events-auto origin-top"
                >
                  {/* Delicate Champagne Thread & Pin (No Yellow) */}
                  <div className="flex flex-col items-center select-none pointer-events-none">
                    {/* Top Pin Dot on Ribbon Edge */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E5D7C3] shadow-[0_1px_3px_rgba(0,0,0,0.6)] -mt-0.5 border border-[#8C7A5E]/40" />
                    {/* Ultra-Fine Pale Champagne Hanging Hairline (Extended Length) */}
                    <div className="w-[1.5px] h-8 sm:h-10 bg-gradient-to-b from-[#E5D7C3]/90 via-[#C7B59D]/60 to-[#9E8B72]/40" />
                    {/* Micro Connection Loop */}
                    <div className="w-1.5 h-1.5 rounded-full border border-[#C7B59D]/60 bg-[#160A1A]" />
                  </div>

                  {/* Refined Obsidian Cameo Medallion Button (Matches Site Brand Style) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCharmClick(item.id);
                    }}
                    onMouseEnter={() => setHoveredId(`${item.id}-${idx}`)}
                    onMouseLeave={() => setHoveredId(null)}
                    title={`Click to open ${item.name} collection`}
                    className="group relative -mt-0.5 cursor-pointer outline-none transition-transform duration-300"
                  >
                    {/* Subtle Champagne Gold & Platinum Hairline Bezel (NO Bright Yellow) */}
                    <div
                      className={`relative p-[1.5px] rounded-full transition-all duration-300 ${isHovered
                        ? "bg-gradient-to-b from-white via-[#E8DEC8] to-[#9E8B72] shadow-[0_0_18px_rgba(232,222,200,0.4)]"
                        : "bg-gradient-to-b from-[#D4C5AF] via-[#9E8B72] to-[#594B3A] shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                        }`}
                    >
                      {/* Deep Obsidian Velvet Chamber */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#210D25] via-[#120616] to-[#070109] flex items-center justify-center overflow-hidden border border-white/10">
                        {/* Soft Subtle Artwork Silhouette (Blended seamlessly into dark obsidian) */}
                        <div className="absolute inset-0 w-full h-full opacity-35 group-hover:opacity-55 transition-opacity duration-300 mix-blend-luminosity">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 56px, 64px"
                            className="object-cover filter contrast-125 brightness-95"
                          />
                        </div>

                        {/* Rich Obsidian Velvet Vignette Mask */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0412]/95 via-[#120616]/60 to-[#1B0A20]/80 group-hover:via-[#120616]/40 transition-colors pointer-events-none" />

                        {/* Delicate Concentric Inner Hairline */}
                        <div className="absolute inset-1 rounded-full border border-white/10 group-hover:border-[#E8DEC8]/35 transition-colors pointer-events-none" />

                        {/* Crisp Pure Luminous White / Champagne Handcrafted Icon */}
                        <div className="relative z-10 text-white/95 group-hover:text-[#FFF8EE] transition-all duration-300 transform group-hover:scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {item.icon({ className: "w-5 h-5 sm:w-6 sm:h-6" })}
                        </div>

                        {/* Specular Radial Glare Sheen across glass */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_25%,rgba(255,255,255,0.35)_0%,transparent_60%)] pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity" />
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
