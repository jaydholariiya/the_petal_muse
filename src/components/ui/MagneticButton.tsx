"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  magneticStrength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  variant = "primary",
  magneticStrength = 0.35,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Only apply magnetic physics on desktop mouse pointers
    if (typeof window !== "undefined" && (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches)) {
      return;
    }
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * magneticStrength;
    const y = (clientY - centerY) * magneticStrength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      "bg-ink-aubergine text-butter-cream hover:bg-mulberry-wine border border-transparent shadow-sm hover:shadow-md",
    secondary:
      "bg-marigold-glow text-ink-aubergine hover:bg-marigold-glow/90 font-medium shadow-sm",
    outline:
      "border border-ink-aubergine/20 text-ink-aubergine hover:border-ink-aubergine hover:bg-ink-aubergine/5",
    ghost:
      "text-ink-aubergine hover:text-mulberry-wine bg-transparent",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full px-5 sm:px-7 py-3 sm:py-3.5 text-[11px] sm:text-xs font-sans font-medium tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-colors duration-300 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
