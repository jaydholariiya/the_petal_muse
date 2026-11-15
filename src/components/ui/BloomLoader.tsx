"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "@/components/brand/BrandLogo";

interface BloomLoaderProps {
  onComplete?: () => void;
}

export default function BloomLoader({ onComplete }: BloomLoaderProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("petalmuse_entered");
    }
    return true;
  });
  const [stage, setStage] = useState<"seed" | "orbit" | "bloom" | "reveal" | "wipe">("seed");

  useEffect(() => {
    // If repeat visit, skip immediately
    if (typeof window !== "undefined" && sessionStorage.getItem("petalmuse_entered")) {
      setIsVisible(false);
      onCompleteRef.current?.();
      return;
    }

    // Fast, elegant bloom sequence (~1.8s total)
    const t1 = setTimeout(() => setStage("orbit"), 250);
    const t2 = setTimeout(() => setStage("bloom"), 650);
    const t3 = setTimeout(() => setStage("reveal"), 1100);
    const t4 = setTimeout(() => setStage("wipe"), 1500);
    const t5 = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem("petalmuse_entered", "true");
      } catch (e) {}
      onCompleteRef.current?.();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []); // Run strictly once on mount

  const handleSkip = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem("petalmuse_entered", "true");
    } catch (e) {}
    onCompleteRef.current?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="bloom-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-aubergine text-butter-cream overflow-hidden select-none px-6 transition-opacity duration-500 ${
            stage === "wipe" ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Ambient background botanical glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,31,61,0.65)_0%,rgba(27,18,32,0.98)_75%)] pointer-events-none" />

          {/* Golden floating dust motes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <span className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-marigold-glow animate-ping" />
            <span className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-apricot-blush animate-pulse" />
            <span className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-marigold-glow animate-pulse" />
          </div>

          {/* Center blooming flower SVG animation */}
          <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central golden stamen glow */}
              <motion.circle
                cx="80"
                cy="80"
                r="7"
                fill="#E8A93B"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: stage !== "seed" ? [1, 1.3, 1] : 0,
                  opacity: stage !== "seed" ? 1 : 0,
                }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* 8 Botanical Petals that orbit and unfold */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
                const rad = (angle * Math.PI) / 180;
                const orbitRadius = stage === "seed" ? 0 : stage === "orbit" ? 30 : 24;

                return (
                  <motion.g
                    key={`petal-${angle}`}
                    initial={{ scale: 0, opacity: 0, rotate: angle }}
                    animate={{
                      scale:
                        stage === "seed"
                          ? index === 0
                            ? 1
                            : 0
                          : stage === "orbit"
                          ? 1
                          : stage === "bloom" || stage === "reveal" || stage === "wipe"
                          ? 1.2
                          : 0,
                      opacity: stage === "seed" ? (index === 0 ? 0.95 : 0) : 0.88,
                      rotate: stage === "orbit" ? angle + 360 : angle,
                      x: Math.cos(rad) * (stage === "orbit" ? orbitRadius * 0.45 : 0),
                      y: Math.sin(rad) * (stage === "orbit" ? orbitRadius * 0.45 : 0),
                    }}
                    transition={{
                      duration: stage === "orbit" ? 1.1 : 0.55,
                      delay: stage === "seed" ? 0 : index * 0.04,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    style={{ originX: "80px", originY: "80px" }}
                  >
                    {/* Petal Path */}
                    <path
                      d="M80 42 C89 42 97 55 95 68 C93 78 86 80 80 80 C74 80 67 78 65 68 C63 55 71 42 80 42 Z"
                      fill={index % 2 === 0 ? "#F4B9A0" : "#E58FA0"}
                      fillOpacity={index % 2 === 0 ? "0.85" : "0.7"}
                      stroke="#E8A93B"
                      strokeWidth="0.8"
                    />
                  </motion.g>
                );
              })}

              {/* Inner delicate pistil ring */}
              <motion.circle
                cx="80"
                cy="80"
                r="18"
                stroke="#E8A93B"
                strokeWidth="1"
                strokeDasharray="2 3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: stage === "bloom" || stage === "reveal" ? 1 : 0,
                  opacity: stage === "bloom" || stage === "reveal" ? 0.75 : 0,
                  rotate: 180,
                }}
                transition={{ duration: 0.7 }}
                style={{ originX: "80px", originY: "80px" }}
              />
            </svg>
          </div>

          {/* Logo & Brand text reveal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: stage === "reveal" || stage === "wipe" ? 1 : 0,
              y: stage === "reveal" || stage === "wipe" ? 0 : 16,
            }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative z-10 mt-6 flex flex-col items-center text-center max-w-xs"
          >
            <BrandLogo variant="light" size="lg" showWordmark={true} />
            <p className="mt-3 font-serif italic text-sm sm:text-base text-apricot-blush tracking-widest">
              Where Beauty Begins...
            </p>
          </motion.div>

          {/* Skip button for rapid accessibility */}
          <button
            onClick={handleSkip}
            aria-label="Enter site directly"
            className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-butter-cream/50 hover:text-butter-cream px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200"
          >
            Enter Atelier →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
