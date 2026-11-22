"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Luxury3DCardProps {
  children: React.ReactNode;
  className?: string;
  roundedClassName?: string;
  tiltIntensity?: number; // Maximum rotation in degrees (e.g. 8 to 12)
  glareOpacity?: number; // 0 to 1
  glowColor?: string; // Specular light reflection tint
  borderGlow?: boolean;
  onClick?: () => void;
}

/**
 * Luxury3DCard
 * High-end physical material simulator with:
 * 1. Damped spring 3D perspective tilt
 * 2. Specular gold-foil light reflection that tracks cursor position via GPU CSS vars
 * 3. Multi-layer 3D transform depth preservation (children with translateZ pop forward!)
 * 4. Customizable organic corner silhouettes
 */
export default function Luxury3DCard({
  children,
  className = "",
  roundedClassName = "rounded-tl-[3.8rem] rounded-br-[3.8rem] rounded-tr-[1.2rem] rounded-bl-[1.2rem]",
  tiltIntensity = 9,
  glareOpacity = 0.4,
  glowColor = "rgba(235, 222, 205, 0.4)", // Pale Champagne Gold
  borderGlow = true,
  onClick,
}: Luxury3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coords (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Silky smooth spring damping (prevents jitter, creates tactile weight)
  const springConfig = { damping: 28, stiffness: 240, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]), springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const normX = mouseX / rect.width - 0.5;
      const normY = mouseY / rect.height - 0.5;

      x.set(normX);
      y.set(normY);

      // Set CSS variables directly on DOM node for 120fps GPU glare tracking
      const px = ((mouseX / rect.width) * 100).toFixed(1);
      const py = ((mouseY / rect.height) * 100).toFixed(1);
      cardRef.current.style.setProperty("--glare-x", `${px}%`);
      cardRef.current.style.setProperty("--glare-y", `${py}%`);
    },
    [x, y]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--glare-x", `50%`);
      cardRef.current.style.setProperty("--glare-y", `50%`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`relative select-none ${roundedClassName} ${className}`}
    >
      {/* Elevated Content Layer with strict organic rounding & overflow clipping */}
      <div
        className={`relative w-full h-full ${roundedClassName} overflow-hidden transition-all duration-500`}
      >
        {children}

        {/* 1. Dynamic Specular Gold Foil Reflection (glides across surface with cursor) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30 mix-blend-screen"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle 380px at var(--glare-x, 50%) var(--glare-y, 50%), ${glowColor} 0%, rgba(255,255,255,0.14) 28%, transparent 72%)`,
          }}
        />

        {/* 2. Micro Champagne Edge Shimmer */}
        {borderGlow && (
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${roundedClassName} pointer-events-none border border-[#E5D7C3]/35 transition-opacity duration-500 z-30`}
            style={{
              opacity: isHovered ? 1 : 0.45,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
