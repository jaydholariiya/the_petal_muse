"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Palette,
  ShieldCheck,
  Truck,
  MessageCircle,
  Flower,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONTENT } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/utils";

export default function CraftsmanshipStory() {
  const { craftsmanship } = SITE_CONTENT;
  const { handmadeWithLove, personalizedGifts, whyChooseUs } = craftsmanship;

  const pillarIcons: Record<string, React.ReactNode> = {
    Heart: <Heart className="w-5 h-5 text-mulberry-wine" />,
    Flower: <Flower className="w-5 h-5 text-marigold-glow" />,
    MessageCircle: <MessageCircle className="w-5 h-5 text-[#25D366]" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-mulberry-wine" />,
    Truck: <Truck className="w-5 h-5 text-marigold-glow" />,
  };

  return (
    <section id="craftsmanship" className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden w-full min-w-0">
      {/* 1. HANDMADE WITH LOVE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center mb-16 sm:mb-24 w-full min-w-0">
        <div className="lg:col-span-6 relative w-full min-w-0">
          <div className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-ink-aubergine/5">
            <Image
              src={handmadeWithLove.imageUrl}
              alt={handmadeWithLove.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 z-10 text-butter-cream">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8.5px] uppercase font-sans tracking-widest bg-ink-aubergine/80 backdrop-blur-md text-butter-cream border border-white/20 mb-1.5">
                <Heart className="w-2.5 h-2.5 text-apricot-blush" />
                <span>Handcrafted by Jensi Dholariya</span>
              </span>
              <h4 className="font-serif text-lg sm:text-2xl font-light">
                Every Stem Has a Soul
              </h4>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center w-full min-w-0">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-mulberry-wine font-medium">
              {handmadeWithLove.eyebrow}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ink-aubergine font-light leading-tight">
            Handmade with Love – <br className="hidden sm:inline" />
            <span className="italic font-serif text-mulberry-wine">Slow Botanical Craft</span>
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm font-sans italic text-mulberry-wine/85">
            &ldquo;{handmadeWithLove.subtitle}&rdquo;
          </p>

          <p className="mt-3 text-xs sm:text-sm md:text-base font-sans text-ink-aubergine/80 leading-relaxed">
            {handmadeWithLove.description}
          </p>

          <div className="mt-5 space-y-2.5 sm:space-y-3.5">
            {handmadeWithLove.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/70 border border-ink-aubergine/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-marigold-glow shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-aubergine">
                    {h.title}
                  </h4>
                  <p className="font-sans text-[11px] sm:text-xs text-ink-aubergine/70 mt-0.5 leading-relaxed">
                    {h.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. PERSONALIZED GIFTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center mb-16 sm:mb-24 w-full min-w-0">
        <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center w-full min-w-0">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-mulberry-wine font-medium">
              {personalizedGifts.eyebrow}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ink-aubergine font-light leading-tight">
            Personalized Gifts – <br className="hidden sm:inline" />
            <span className="italic font-serif text-mulberry-wine">Your Story in Every Detail</span>
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm font-sans italic text-mulberry-wine/85">
            &ldquo;{personalizedGifts.subtitle}&rdquo;
          </p>

          <p className="mt-3 text-xs sm:text-sm md:text-base font-sans text-ink-aubergine/80 leading-relaxed">
            {personalizedGifts.description}
          </p>

          {/* 4 Steps Timeline */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full min-w-0">
            {personalizedGifts.steps.map((s, i) => (
              <div key={i} className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/70 border border-ink-aubergine/10 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[9.5px] font-sans font-bold uppercase tracking-widest text-marigold-glow">
                    Step {s.step}
                  </span>
                  <h4 className="font-serif text-xs sm:text-sm font-medium text-ink-aubergine mt-0.5">
                    {s.title}
                  </h4>
                  <p className="font-sans text-[11px] text-ink-aubergine/70 mt-1 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <a
              href={buildWhatsAppUrl({
                occasion: "Personalized Gift Consultation",
                notes: "Hello Jensi! I want to create a personalized gift with custom photo, flowers, and handwritten message. Can we start a consultation?",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-sm transition-all duration-300 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none shrink-0" />
              <span className="whitespace-nowrap">Personalize on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 relative w-full min-w-0">
          <div className="relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-ink-aubergine/5">
            <Image
              src={personalizedGifts.imageUrl}
              alt={personalizedGifts.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* 3. WHY CHOOSE THE PETAL MUSE? (5 CORE PILLARS) */}
      <div className="border-t border-ink-aubergine/10 pt-12 sm:pt-16 w-full min-w-0">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="w-1.5 h-1.5 rounded-full bg-marigold-glow inline-block mb-1.5" />
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-mulberry-wine font-medium block">
            {whyChooseUs.eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ink-aubergine font-light leading-tight mt-1">
            Why Choose THE PETAL MUSE?
          </h2>
          <p className="mt-2 font-sans text-xs sm:text-sm text-ink-aubergine/70">
            {whyChooseUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7 w-full min-w-0">
          {whyChooseUs.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md border border-ink-aubergine/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between w-full min-w-0"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-ink-aubergine/5 flex items-center justify-center mb-3 sm:mb-4 border border-ink-aubergine/10">
                  {pillarIcons[pillar.icon] || <Sparkles className="w-5 h-5 text-marigold-glow" />}
                </div>

                <h3 className="font-serif text-base sm:text-lg font-normal text-ink-aubergine leading-snug">
                  {pillar.title}
                </h3>

                <p className="mt-1.5 text-xs font-sans text-ink-aubergine/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-ink-aubergine/10 text-[9.5px] font-sans font-semibold text-mulberry-wine uppercase tracking-widest">
                0{idx + 1} • Studio Standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
