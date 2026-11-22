"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import FloralScene, { TimeOfDay } from "./FloralScene";

interface FloralCanvasProps {
  activeTimeOfDay?: TimeOfDay;
}

export default function FloralCanvas({ activeTimeOfDay }: FloralCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDay>("dawn");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);

      // Track mouse coordinates for interactive parallax
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMousePos({ x, y });
      };

      // Determine 4 distinct atmospheric combinations based on scroll position & section milestones
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? scrollY / totalHeight : 0;

        const collectionsEl = document.getElementById("collections");
        const occasionsEl = document.getElementById("occasions");
        const contactEl = document.getElementById("contact");

        const vh = window.innerHeight;
        const collectionsTop = collectionsEl ? collectionsEl.getBoundingClientRect().top : vh * 0.4;
        const occasionsTop = occasionsEl ? occasionsEl.getBoundingClientRect().top : vh * 0.65;
        const contactTop = contactEl ? contactEl.getBoundingClientRect().top : vh * 0.85;

        // 4 Clear Combinations Across the Narrative Page:
        // Combination 4: Midnight Obsidian Velvet (Night Garden & Concierge)
        if (contactTop <= vh * 0.5 || progress > 0.76) {
          setCurrentTimeOfDay("night");
        }
        // Combination 3: Sunlit Honey Amber (Combos, Occasions, Craftsmanship & Reviews)
        else if (occasionsTop <= vh * 0.5 || progress > 0.46) {
          setCurrentTimeOfDay("noon");
        }
        // Combination 2: Signature Mulberry Wine (Atelier Catalogs & Collections Showcase)
        else if (collectionsTop <= vh * 0.6 || progress > 0.18) {
          setCurrentTimeOfDay("morning");
        }
        // Combination 1: Champagne Blush Pearl (Hero & Bestsellers)
        else {
          setCurrentTimeOfDay("dawn");
        }
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Initial check

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Allow explicit override if passed as prop
  const effectiveTimeOfDay = activeTimeOfDay || currentTimeOfDay;

  // Background gradient map for the 4 Living Atelier Scroll Milestones
  const backgroundGradients: Record<TimeOfDay, string> = {
    // 1. Top (Hero & Bestsellers): Champagne Blush Pearl
    dawn: "radial-gradient(ellipse at 80% 18%, rgba(246, 222, 210, 0.45) 0%, rgba(254, 250, 244, 0.65) 55%, transparent 100%)",
    // 2. Middle 1 (Atelier Catalogs & Collections Showcase): Rich Mulberry Wine Atmosphere
    morning: "radial-gradient(ellipse at 35% 35%, rgba(168, 62, 108, 0.18) 0%, rgba(224, 142, 178, 0.12) 45%, rgba(254, 248, 242, 0.55) 80%, transparent 100%)",
    // 3. Middle 2 (Combos, Occasions & Reviews): Luminous Sunlit Honey Amber
    noon: "radial-gradient(ellipse at 65% 50%, rgba(234, 168, 58, 0.22) 0%, rgba(238, 204, 134, 0.14) 50%, rgba(254, 251, 245, 0.6) 80%, transparent 100%)",
    // Sunset transition fallback
    sunset: "radial-gradient(ellipse at 70% 60%, rgba(212, 120, 145, 0.22) 0%, rgba(240, 165, 140, 0.15) 45%, transparent 100%)",
    // 4. Bottom (Services, Journal, Contact & Footer): Deep Obsidian Plum Velvet Night
    night: "radial-gradient(ellipse at 50% 80%, rgba(94, 33, 76, 0.7) 0%, rgba(27, 18, 32, 0.96) 80%)",
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000"
      style={{
        background: backgroundGradients[effectiveTimeOfDay],
      }}
    >
      {mounted && !reducedMotion && (
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            dpr={[1, 1.5]} // Performance optimization: cap at 1.5 DPR
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ width: "100%", height: "100%" }}
          >
            <FloralScene
              timeOfDay={effectiveTimeOfDay}
              mousePos={mousePos}
            />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}

