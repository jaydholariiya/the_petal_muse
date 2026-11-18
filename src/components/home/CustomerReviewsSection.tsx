"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
  Heart,
  MessageCircle,
  Instagram,
  Sparkles,
  MapPin,
  Gift,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SITE_CONTENT, CustomerReview } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { buildWhatsAppUrl, openInstagramInquiry } from "@/lib/utils";

export default function CustomerReviewsSection() {
  const { reviews: dynamicReviews, settings } = useAtelierContent();
  const enableWhatsApp = settings?.["enable_whatsapp"] !== undefined
    ? settings["enable_whatsapp"] === "true"
    : Boolean(SITE_CONTENT.brand.enableWhatsApp);
  const { customerReviewsSection } = SITE_CONTENT;
  const reviews = dynamicReviews?.length > 0 ? dynamicReviews : customerReviewsSection.reviews;
  const [activeIndex, setActiveIndex] = useState(0);

  // Keyboard navigation for desktop arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reviews.length]);

  const currentReview: CustomerReview = reviews[activeIndex] || reviews[0];
  const slideNumber = String(activeIndex + 1).padStart(2, "0");

  const handlePrev = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const waUrl = buildWhatsAppUrl({
    service: `Patron Keepsake Inquiry: ${currentReview.giftedItem}`,
    occasion: currentReview.occasion,
    notes: `Hello Jensi! I read the review by ${currentReview.name} regarding "${currentReview.giftedItem}" and would love to craft a similar bespoke keepsake for my upcoming celebration!`,
  });

  return (
    <section
      id="reviews"
      className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden w-full min-w-0"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-5 sm:pb-8 mb-8 sm:mb-12 w-full min-w-0 gap-4">
        <div className="w-full md:w-auto min-w-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
              {customerReviewsSection.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ink-aubergine font-normal tracking-tight">
            {customerReviewsSection.title}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-ink-aubergine/70 font-light max-w-xl">
            {customerReviewsSection.subtitle}
          </p>
        </div>

        {/* Patron Confidence Stats */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 shrink-0">
          {customerReviewsSection.stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-ink-aubergine/10 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-marigold-glow flex-shrink-0" />
              <span className="text-xs font-serif font-medium text-ink-aubergine">
                {stat.value}
              </span>
              <span className="text-[11px] font-sans text-ink-aubergine/60 font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* UNIQUE CINEMATIC LOVE STORY SLIDER (Split Exhibition Stage - Non-Card Layout) */}
      <div className="relative w-full rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-white/90 via-cream-linen/60 to-warm-parchment/80 border border-ink-aubergine/10 shadow-xl overflow-hidden p-6 sm:p-10 md:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full min-w-0">
          {/* LEFT: ARCHITECTURAL PORTRAIT & GIFT PHOTOGRAPHY */}
          <div className="lg:col-span-5 relative w-full min-w-0">
            <div className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl bg-ink-aubergine/10 border border-ink-aubergine/10">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentReview.photoUrl}
                    alt={`${currentReview.name} - ${currentReview.giftedItem}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  {/* Atmospheric Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/90 via-ink-aubergine/25 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Top Rating Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-amber-900/10">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-500"
                    />
                  ))}
                </div>
                <span className="text-xs font-sans font-bold text-ink-aubergine ml-0.5">
                  5.0
                </span>
              </div>

              {/* Occasion Pill (Top Right) */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-ink-aubergine/80 backdrop-blur-md text-[9.5px] font-sans uppercase tracking-wider text-butter-cream border border-white/20">
                {currentReview.occasion}
              </div>

              {/* Bottom Inset: Gifted Item Tag */}
              <div className="absolute bottom-4 inset-x-4 z-10 p-3 rounded-2xl bg-ink-aubergine/90 backdrop-blur-md text-butter-cream border border-white/10 flex items-center gap-2">
                <Gift className="w-4 h-4 text-marigold-glow shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-sans tracking-widest text-apricot-blush block">
                    Bespoke Creation Gifted
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm truncate text-butter-cream">
                    {currentReview.giftedItem}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: EDITORIAL VOICE, TESTIMONIAL & PATRON SIGNATURE */}
          <div className="lg:col-span-7 flex flex-col justify-between w-full min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Large Decorative Serif Quotation Mark */}
                <div className="text-5xl sm:text-6xl md:text-7xl font-serif text-mulberry-wine/25 leading-none select-none -mb-3">
                  “
                </div>

                {/* The Emotional Testimonial Quote */}
                <blockquote className="font-serif italic text-lg sm:text-2xl md:text-3xl text-ink-aubergine font-light leading-relaxed pl-1 sm:pl-2">
                  &ldquo;{currentReview.quote}&rdquo;
                </blockquote>

                {/* Patron Details & Verification */}
                <div className="mt-8 pt-6 border-t border-ink-aubergine/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-serif font-medium text-ink-aubergine">
                        {currentReview.name}
                      </h4>
                      {currentReview.verified && (
                        <span
                          title="Verified Patron Experience"
                          className="inline-flex items-center text-emerald-600"
                        >
                          <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-sans text-ink-aubergine/65 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-ink-aubergine/40" />
                      <span>{currentReview.location}</span>
                      <span className="mx-1">•</span>
                      <span>Verified {currentReview.date}</span>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider font-sans font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Purchase</span>
                  </span>
                </div>

                {/* Action CTA & Slider Controls */}
                <div className="mt-8 pt-6 border-t border-ink-aubergine/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {enableWhatsApp ? (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-sans uppercase tracking-wider font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-md active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-white stroke-none shrink-0" />
                      <span className="whitespace-nowrap">Order Keepsake on WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-80 shrink-0" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        openInstagramInquiry({
                          title: currentReview.giftedItem,
                          occasion: currentReview.occasion,
                          notes: `Hello Jensi! I read the review by ${currentReview.name} regarding "${currentReview.giftedItem}" and would love to craft a similar bespoke keepsake for my upcoming celebration!`,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-sans uppercase tracking-wider font-semibold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 transition-all shadow-md active:scale-95"
                    >
                      <Instagram className="w-4 h-4 text-white shrink-0" />
                      <span className="whitespace-nowrap">Order Keepsake via Instagram DM</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-80 shrink-0" />
                    </button>
                  )}

                  {/* Previous / Next Arrow Controls */}
                  <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous story"
                      className="w-10 h-10 rounded-full bg-white border border-ink-aubergine/15 text-ink-aubergine hover:bg-ink-aubergine hover:text-warm-parchment flex items-center justify-center transition-all shadow-xs active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-widest text-ink-aubergine/70 bg-white/70 border border-ink-aubergine/10 font-medium">
                      {slideNumber} / 06
                    </span>

                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next story"
                      className="w-10 h-10 rounded-full bg-white border border-ink-aubergine/15 text-ink-aubergine hover:bg-ink-aubergine hover:text-warm-parchment flex items-center justify-center transition-all shadow-xs active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Pagination Slider Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {reviews.map((rev, idx) => (
          <button
            key={rev.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Jump to review ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === activeIndex
                ? "w-8 h-2 bg-ink-aubergine"
                : "w-2 h-2 bg-ink-aubergine/25 hover:bg-ink-aubergine/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
