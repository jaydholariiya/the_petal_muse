"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Heart,
  Quote,
  CheckCircle2,
  Award,
} from "lucide-react";
import { SITE_CONTENT, CustomerReview } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { openInstagramInquiry } from "@/lib/utils";

export default function CustomerReviewsSection() {
  const { reviews: dynamicReviews, settings } = useAtelierContent();
  const { customerReviewsSection } = SITE_CONTENT;
  const reviews: CustomerReview[] =
    dynamicReviews?.length > 0 ? dynamicReviews : customerReviewsSection.reviews;

  // Carousel active index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Responsive items per view: 3 on desktop, 2 on tablet, 1 on mobile
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  // Auto-advance carousel every 6s unless user is hovering
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView);
  // Wrap around if needed for seamless 3-card view
  if (visibleReviews.length < itemsPerView) {
    visibleReviews.push(...reviews.slice(0, itemsPerView - visibleReviews.length));
  }

  const totalDots = maxIndex + 1;

  return (
    <section
      id="reviews"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden w-full select-none"
    >
      {/* 1. ELEGANT AESTHETIC HEADER (Editorial Cormorant Serif + Italic Style) */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
        {/* Eyebrow Label */}
        <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
            Verified Patron Reflections
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
        </div>

        {/* Editorial Headline: Regular Serif + Italic Serif Swash (Exact Reference Style) */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ink-aubergine leading-[1.12] tracking-tight mb-3 sm:mb-4"
        >
          Love Stories &amp; Reviews –
          <span className="block italic font-normal text-mulberry-wine mt-1 sm:mt-1.5">
            Your Story in Every Detail
          </span>
        </motion.h2>

        {/* Clean, Centered Luxury Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sans text-xs sm:text-sm md:text-base text-ink-aubergine/75 font-light leading-relaxed max-w-2xl mx-auto"
        >
          Every bespoke keepsake we sculpt becomes an enduring memory. Read genuine reflections and love stories
          from patrons who commemorated milestones, surprised partners, and celebrated with us.
        </motion.p>
      </div>

      {/* 2. THE 3-CARD CAROUSEL SLIDER (Exact layout from user screenshot) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full"
      >
        {/* Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous Reviews"
          className="absolute -left-2 sm:-left-5 top-1/3 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-ink-aubergine shadow-lg hover:shadow-xl border border-ink-aubergine/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next Reviews"
          className="absolute -right-2 sm:-right-5 top-1/3 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-ink-aubergine shadow-lg hover:shadow-xl border border-ink-aubergine/10 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Cards Grid / Track */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleReviews.map((rev, idx) => (
              <motion.div
                key={`${rev.id}-${currentIndex}-${idx}`}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-ink-aubergine/10 transition-all duration-500"
              >
                {/* Card Top: High-Res Keepsake / Patron Photograph */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-porcelain-white">
                  <Image
                    src={rev.photoUrl}
                    alt={`${rev.name} - ${rev.giftedItem || "The Petal Muse Keepsake"}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Occasion / City Floating Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-ink-aubergine/10 shadow-xs">
                    <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-wider text-ink-aubergine font-medium">
                      {rev.location || "Gujarat, India"}
                    </span>
                  </div>

                  {/* Star Rating Badge (Bottom of Image) */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-sans font-semibold text-white ml-1">
                      5.0
                    </span>
                  </div>
                </div>

                {/* Card Content Below Image */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 text-left bg-white">
                  {/* Review Quote */}
                  <div>
                    <p className="font-serif italic text-sm sm:text-base text-ink-aubergine/85 leading-relaxed line-clamp-3">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  {/* Patron Details & Gifted Item */}
                  <div className="mt-4 pt-3.5 border-t border-ink-aubergine/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-normal text-ink-aubergine leading-tight">
                        {rev.name}
                      </h4>
                      <p className="font-sans text-[10px] sm:text-[11px] text-mulberry-wine font-medium mt-0.5 line-clamp-1">
                        {rev.giftedItem || rev.occasion || "Bespoke Keepsake Commission"}
                      </p>
                    </div>

                    {/* Verified Icon */}
                    <div
                      className="w-7 h-7 rounded-full bg-mulberry-wine/10 flex items-center justify-center text-mulberry-wine shrink-0"
                      title="Verified Patron Story"
                    >
                      <CheckCircle2 className="w-4 h-4 text-marigold-glow" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 3. PAGINATION DOTS (Centered below cards) */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-12">
          {[...Array(totalDots)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review page ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-ink-aubergine"
                  : "w-2 bg-ink-aubergine/25 hover:bg-ink-aubergine/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
