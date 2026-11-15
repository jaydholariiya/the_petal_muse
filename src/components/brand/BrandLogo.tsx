"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark" | "gold";
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
}

export function BotanicalMark({
  className = "w-7 h-7",
  color = "#E8A93B",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer subtle concentric botanical ring */}
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 3"
        opacity="0.4"
      />
      <circle
        cx="40"
        cy="40"
        r="33"
        stroke={color}
        strokeWidth="0.6"
        opacity="0.65"
      />

      {/* Upward blooming central petal */}
      <path
        d="M40 12 C45 22, 54 30, 51 41 C48 51, 40 56, 40 56 C40 56, 32 51, 29 41 C26 30, 35 22, 40 12 Z"
        fill={color}
        fillOpacity="0.22"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Graceful P curve silhouette */}
      <path
        d="M31 62 V26 C31 22, 36 19.5, 42 19.5 C48 19.5, 52 23.5, 52 30 C52 36.5, 47 40, 40 40 H31"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* M accentuation */}
      <path
        d="M40 40 L46 62 L54 38 L60 62"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Radiant golden dewdrop */}
      <circle cx="40" cy="30" r="1.8" fill={color} />
    </svg>
  );
}

export default function BrandLogo({
  className = "",
  variant = "dark",
  showWordmark = true,
  size = "md",
  href = "/",
}: BrandLogoProps) {
  const [logoImageFailed, setLogoImageFailed] = useState(false);

  const textColor =
    variant === "light"
      ? "text-butter-cream"
      : variant === "gold"
      ? "text-marigold-glow"
      : "text-ink-aubergine";

  const subColor =
    variant === "light"
      ? "text-butter-cream/60"
      : variant === "gold"
      ? "text-marigold-glow/70"
      : "text-muted-jade";

  const monogramColor =
    variant === "light"
      ? "#FBF4E6"
      : variant === "gold"
      ? "#E8A93B"
      : "#4A1F3D";

  const sizeMap = {
    sm: {
      img: "w-6 h-6 rounded-full overflow-hidden shadow-2xs border border-ink-aubergine/10",
      icon: "w-5 h-5",
      title: "text-xs tracking-[0.22em]",
      sub: "text-[7.5px] tracking-[0.25em]",
    },
    md: {
      img: "w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow-2xs border border-ink-aubergine/15",
      icon: "w-6 h-6",
      title: "text-sm sm:text-base tracking-[0.26em]",
      sub: "text-[8px] sm:text-[9px] tracking-[0.3em]",
    },
    lg: {
      img: "w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-sm border border-ink-aubergine/15",
      icon: "w-8 h-8",
      title: "text-lg sm:text-xl tracking-[0.28em]",
      sub: "text-[9px] sm:text-[10px] tracking-[0.34em]",
    },
    xl: {
      img: "w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md border border-ink-aubergine/20",
      icon: "w-11 h-11",
      title: "text-xl sm:text-2xl tracking-[0.3em]",
      sub: "text-xs tracking-[0.36em]",
    },
  };

  const logoContent = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group transition-transform duration-300 shrink-0 ${className}`}>
      {/* If logoPath is provided and hasn't failed, show the owner's real logo image */}
      {SITE_CONTENT.brand.logoPath && !logoImageFailed ? (
        <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size].img}`}>
          <Image
            src={SITE_CONTENT.brand.logoPath}
            alt={SITE_CONTENT.brand.name}
            width={80}
            height={80}
            priority
            unoptimized
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={() => setLogoImageFailed(true)}
          />
        </div>
      ) : (
        /* Fallback: Exquisite botanical mark & display font wordmark */
        <div className="relative flex items-center justify-center shrink-0">
          <BotanicalMark
            className={`${sizeMap[size].icon} transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6`}
            color={monogramColor}
          />
        </div>
      )}

      {showWordmark && (
        <div className="flex flex-col text-left select-none whitespace-nowrap">
          <span
            className={`font-serif uppercase font-medium leading-none whitespace-nowrap transition-colors duration-300 ${textColor} ${sizeMap[size].title}`}
          >
            {SITE_CONTENT.brand.name}
          </span>
          <span
            className={`font-sans uppercase font-medium mt-1 whitespace-nowrap transition-colors duration-300 ${subColor} ${sizeMap[size].sub}`}
          >
            BESPOKE GIFTS &amp; FLORAL ATELIER
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-marigold-glow/50 rounded-sm shrink-0">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
