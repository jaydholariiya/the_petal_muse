"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid, organic petal trailing
  const springConfig = { damping: 30, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailSpringConfig = { damping: 24, stiffness: 220 };
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    // Strictly disable on mobile/touch screens
    if (typeof window === "undefined") return;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches ||
      window.innerWidth < 1024;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
      setIsPointer(Boolean(interactive));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* Trailing organic petal ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.4 : 1,
            opacity: isPointer ? 0.75 : 0.35,
          }}
          transition={{ duration: 0.2 }}
          className={`rounded-full transition-all duration-300 ${
            isPointer
              ? "w-8 h-8 border border-marigold-glow bg-marigold-glow/10 shadow-[0_0_12px_rgba(232,169,59,0.3)]"
              : "w-6 h-6 border border-ink-aubergine/30"
          }`}
        />
      </motion.div>

      {/* Leading core golden dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-marigold-glow -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_#E8A93B] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isPointer ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
