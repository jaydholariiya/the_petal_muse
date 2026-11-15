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

      // Determine Time of Day based on scroll position
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? scrollY / totalHeight : 0;

        if (progress < 0.18) {
          setCurrentTimeOfDay("dawn");
        } else if (progress < 0.38) {
          setCurrentTimeOfDay("morning");
        } else if (progress < 0.65) {
          setCurrentTimeOfDay("noon");
        } else if (progress < 0.85) {
          setCurrentTimeOfDay("sunset");
        } else {
          setCurrentTimeOfDay("night");
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

  // Background gradient map for the Living Day concept
  const backgroundGradients: Record<TimeOfDay, string> = {
    dawn: "radial-gradient(ellipse at 80% 20%, rgba(244,185,160,0.18) 0%, rgba(251,244,230,0.4) 60%, transparent 100%)",
    morning: "radial-gradient(ellipse at 20% 40%, rgba(185,201,163,0.16) 0%, rgba(251,244,230,0.3) 65%, transparent 100%)",
    noon: "radial-gradient(ellipse at 50% 10%, rgba(232,169,59,0.14) 0%, rgba(251,244,230,0.3) 60%, transparent 100%)",
    sunset: "radial-gradient(ellipse at 70% 60%, rgba(229,143,160,0.18) 0%, rgba(244,185,160,0.15) 45%, transparent 100%)",
    night: "radial-gradient(ellipse at 50% 80%, rgba(74,31,61,0.45) 0%, rgba(27,18,32,0.92) 80%)",
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

