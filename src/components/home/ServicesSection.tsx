"use client";

import React from "react";
import Image from "next/image";
import { Check, ArrowRight, Flower2 } from "lucide-react";
import { SITE_CONTENT, ServiceItem } from "@/content/site";

export default function ServicesSection() {
  const { services } = SITE_CONTENT;

  return (
    <section id="services" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-6 sm:pb-8 mb-10 sm:mb-16">
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-peony-rose" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
              Sunset Atmosphere • Atelier Offerings
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-aubergine font-light leading-tight">
            Our Floral Craft &amp; <br />
            <span className="italic font-serif text-mulberry-wine">Bespoke Services</span>
          </h2>
        </div>

        <p className="mt-3 md:mt-0 font-sans text-xs sm:text-sm md:text-base text-ink-aubergine/70 max-w-sm leading-relaxed">
          From grand spatial installations to personal bridal suites and curated gifting, every offering is approached as an editorial artwork.
        </p>
      </div>

      {/* MOBILE EXCLUSIVE: Downward Flowing Stacked Service Cards (Zero Left/Right Scroll) */}
      <div className="flex md:hidden flex-col gap-4 w-full mb-8">
        {services.map((service, index) => (
          <div
            key={`mobile-service-${service.id}`}
            className="relative w-full rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-ink-aubergine/10 shadow-md flex flex-col"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-ink-aubergine/5">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/80 via-transparent to-transparent opacity-60" />

              <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center font-serif text-xs text-ink-aubergine font-medium">
                0{index + 1}
              </div>
            </div>

            {/* Service Details */}
            <div className="p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-peony-rose font-semibold">
                  {service.subtitle}
                </span>
                <h3 className="font-serif text-xl text-ink-aubergine font-light mt-0.5">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs font-sans font-light text-ink-aubergine/80 leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-3 pt-3 border-t border-ink-aubergine/10 space-y-1.5">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-[11px] font-sans text-ink-aubergine/75">
                      <Check className="w-3.5 h-3.5 text-mulberry-wine shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-ink-aubergine/10 flex items-center justify-between">
                <a
                  href={`#contact?service=${encodeURIComponent(service.enquiryType)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider font-semibold text-mulberry-wine hover:text-ink-aubergine transition-colors"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-[9px] uppercase tracking-widest text-ink-aubergine/40">
                  By Appointment
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: 100% UNTOUCHED & PRESERVED EXACTLY AS YOU LOVE */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-ink-aubergine/10 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            {/* Top Image Container */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-ink-aubergine/5">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-106"
              />

              {/* Sunset Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Number Badge */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-10 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center font-serif text-xs sm:text-sm text-ink-aubergine font-medium">
                0{index + 1}
              </div>

              {/* Corner Petal Bloom Icon Accent */}
              <div className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-butter-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
                <Flower2 className="w-4 h-4 text-marigold-glow" />
              </div>
            </div>

            {/* Service Details Body */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.25em] text-peony-rose font-semibold">
                  {service.subtitle}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-ink-aubergine font-light mt-1">
                  {service.title}
                </h3>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-sans font-light text-ink-aubergine/80 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5 pt-5 sm:pt-6 border-t border-ink-aubergine/10">
                  {service.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs font-sans text-ink-aubergine/75"
                    >
                      <Check className="w-3.5 h-3.5 text-mulberry-wine shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer CTA */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-ink-aubergine/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`#contact?service=${encodeURIComponent(service.enquiryType)}`}
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-mulberry-wine group-hover:text-ink-aubergine transition-colors"
                >
                  <span>Enquire For This Craft</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-widest text-ink-aubergine/40">
                  By Appointment
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
