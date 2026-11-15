"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid, organic petal trailing
  const springConfig = { damping: 28, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailSpringConfig = { damping: 20, stiffness: 180 };
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

      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      setIsPointer(Boolean(interactive));

      // Check for custom cursor text (e.g. data-cursor="VIEW")
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget && cursorTarget.dataset.cursor) {
        setCursorText(cursorTarget.dataset.cursor);
      } else {
        setCursorText("");
      }
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
      {/* 1. Trailing organic petal ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: trailX,
          y: trailY,
        }}
      >
        <motion.div
          animate={{
            scale: cursorText ? 1.2 : isPointer ? 1.3 : 1,
            rotate: isPointer ? 45 : 0,
            opacity: cursorText ? 0.95 : isPointer ? 0.8 : 0.45,
          }}
          transition={{ duration: 0.2 }}
          className={`rounded-full flex items-center justify-center transition-colors duration-300 ${
            cursorText
              ? "w-12 h-12 bg-marigold-glow text-ink-aubergine shadow-md"
              : isPointer
              ? "w-8 h-8 border border-marigold-glow/70 bg-marigold-glow/10"
              : "w-7 h-7 border border-dusty-orchid/40"
          }`}
        >
          {cursorText && (
            <span className="font-sans text-[9px] font-semibold tracking-widest uppercase">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* 2. Leading core golden dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-marigold-glow -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#E8A93B]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorText ? 0 : 1,
        }}
        animate={{
          scale: isPointer ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
