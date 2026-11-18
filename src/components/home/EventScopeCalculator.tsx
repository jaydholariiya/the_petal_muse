"use client";

import React, { useState } from "react";
import { Check, Sparkles, MessageCircle, Instagram, Clock, Layers, ArrowRight } from "lucide-react";
import { SITE_CONTENT, EventScope } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { buildWhatsAppUrl, openInstagramInquiry } from "@/lib/utils";

export default function EventScopeCalculator() {
  const { eventScopes } = SITE_CONTENT;
  const { settings } = useAtelierContent();
  const enableWhatsApp = settings?.["enable_whatsapp"] !== undefined
    ? settings["enable_whatsapp"] === "true"
    : Boolean(SITE_CONTENT.brand.enableWhatsApp);

  const [selectedTierId, setSelectedTierId] = useState<string>(eventScopes.tiers[1].id);

  const selectedTier =
    eventScopes.tiers.find((t) => t.id === selectedTierId) || eventScopes.tiers[1];

  const handleDiscussScope = (tier: EventScope) => {
    if (enableWhatsApp) {
      const url = buildWhatsAppUrl({
        occasion: tier.title,
        notes: `Hello Jensi! I reviewed your Event Scope Guide on the website and would like to discuss ${tier.title} (${tier.subtitle}) for our celebration.`,
      });
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      openInstagramInquiry({
        title: tier.title,
        occasion: tier.title,
        details: `Hello Jensi! I reviewed your Event Scope Guide on the website and would like to discuss ${tier.title} (${tier.subtitle}) for our celebration.`,
      });
    }
  };

  return (
    <section id="scope" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-6 sm:pb-8 mb-10 sm:mb-14">
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Layers className="w-3.5 h-3.5 text-mulberry-wine" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-mulberry-wine font-medium">
              {eventScopes.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
            {eventScopes.title}
          </h2>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-muted-jade mt-1">
            {eventScopes.subtitle}
          </p>
        </div>

        <p className="mt-4 md:mt-0 font-sans text-xs sm:text-sm md:text-base text-ink-aubergine/70 max-w-md leading-relaxed">
          {eventScopes.description}
        </p>
      </div>

      {/* Tier Selector Chips: 2x2 on Mobile, 4 across on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
        {eventScopes.tiers.map((tier) => {
          const isSelected = tier.id === selectedTierId;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              className={`p-3.5 sm:p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? "bg-ink-aubergine text-butter-cream border-ink-aubergine shadow-lg"
                  : "bg-white/60 text-ink-aubergine border-ink-aubergine/10 hover:bg-white"
              }`}
            >
              <div>
                <span
                  className={`text-[9px] sm:text-[10px] uppercase font-sans tracking-widest ${
                    isSelected ? "text-apricot-blush" : "text-mulberry-wine"
                  }`}
                >
                  Scale Option
                </span>
                <h3 className="font-serif text-base sm:text-xl font-light mt-0.5 leading-snug">
                  {tier.title}
                </h3>
              </div>
              <p
                className={`text-[10.5px] sm:text-xs font-sans mt-2 line-clamp-2 ${
                  isSelected ? "text-butter-cream/70" : "text-ink-aubergine/60"
                }`}
              >
                {tier.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Scope View Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-10 border border-ink-aubergine/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Scope Info */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-mulberry-wine font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-marigold-glow" />
            <span>Scope Breakdown &amp; Deliverables</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink-aubergine font-light">
            {selectedTier.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm font-sans font-light text-ink-aubergine/75 leading-relaxed">
            {selectedTier.curatedFor}
          </p>

          {/* Deliverables List */}
          <div className="mt-6 pt-5 border-t border-ink-aubergine/10">
            <span className="text-[10px] font-sans uppercase tracking-widest text-ink-aubergine/50 mb-3 block">
              Included Atelier Deliverables
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedTier.deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs font-sans text-ink-aubergine/85"
                >
                  <Check className="w-3.5 h-3.5 text-mulberry-wine shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Stems */}
          <div className="mt-6 pt-5 border-t border-ink-aubergine/10 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-sans uppercase tracking-widest text-ink-aubergine/50 mr-1">
              Signature Stems:
            </span>
            {selectedTier.suggestedStems.map((stem, sIdx) => (
              <span
                key={sIdx}
                className="px-3 py-1 rounded-full text-xs font-sans bg-mulberry-wine/5 text-mulberry-wine"
              >
                {stem}
              </span>
            ))}
          </div>
        </div>

        {/* Right Metric Summary & Action Card */}
        <div className="lg:col-span-5 bg-butter-cream rounded-2xl p-6 sm:p-8 border border-ink-aubergine/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-ink-aubergine/10">
              <span className="text-xs uppercase font-sans tracking-widest text-ink-aubergine/60">
                Stem Volume
              </span>
              <span className="font-serif text-lg sm:text-xl text-ink-aubergine font-medium">
                {selectedTier.stemVolume}
              </span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-ink-aubergine/10">
              <span className="text-xs uppercase font-sans tracking-widest text-ink-aubergine/60">
                Consultation Period
              </span>
              <span className="font-serif text-base text-ink-aubergine">
                {selectedTier.timeline}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-xs uppercase font-sans tracking-widest text-ink-aubergine/60">
                Creative Direction
              </span>
              <span className="font-serif text-base text-mulberry-wine">
                Jensi Dholariya
              </span>
            </div>
          </div>

          {enableWhatsApp ? (
            <button
              onClick={() => handleDiscussScope(selectedTier)}
              className="mt-8 w-full py-4 rounded-full bg-[#25D366] text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Enquire For This Scale</span>
            </button>
          ) : (
            <button
              onClick={() => handleDiscussScope(selectedTier)}
              className="mt-8 w-full py-4 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>Enquire via Instagram DM</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

