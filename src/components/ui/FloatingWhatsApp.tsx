"use client";

import React, { useState } from "react";
import { MessageCircle, Instagram, X } from "lucide-react";
import { SITE_CONTENT } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { buildWhatsAppUrl, openInstagramInquiry, buildInstagramDmUrl } from "@/lib/utils";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { settings } = useAtelierContent();
  const enableWhatsApp = settings["enable_whatsapp"] !== undefined
    ? settings["enable_whatsapp"] === "true"
    : Boolean(SITE_CONTENT.brand.enableWhatsApp);

  const whatsappUrl = buildWhatsAppUrl({
    occasion: "Bespoke Enquiry",
    notes: "Hello Jensi! I was admiring THE PETAL MUSE creations on your website and would love to discuss floral styling for my upcoming event.",
  });

  const handleInstagramClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await openInstagramInquiry({
      occasion: "Bespoke Atelier Enquiry",
      notes: "Hello Jensi! I was admiring THE PETAL MUSE creations on your website and would love to discuss bespoke gifting.",
    });
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Tooltip greeting (hidden on touch/small screens to avoid clutter) */}
      {showTooltip && (
        <div className="hidden sm:block mb-3 max-w-xs rounded-2xl bg-ink-aubergine p-4 text-butter-cream shadow-2xl border border-white/10 animate-fade-in relative">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close tooltip"
            className="absolute top-2 right-2 text-butter-cream/50 hover:text-butter-cream"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-xs font-serif italic text-apricot-blush">
            THE PETAL MUSE Concierge
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-butter-cream/80">
            {enableWhatsApp
              ? "Have a question or vision in mind? Connect directly with Jensi on WhatsApp."
              : "Have a question or vision in mind? Message Jensi directly on Instagram DM."}
          </p>
        </div>
      )}

      {/* Main floating button: Instagram DM or WhatsApp */}
      {enableWhatsApp ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          aria-label="Chat on WhatsApp with THE PETAL MUSE"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
          <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 fill-white stroke-none" />
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-marigold-glow border-2 border-white" />
          </span>
        </a>
      ) : (
        <button
          type="button"
          onClick={handleInstagramClick}
          onMouseEnter={() => setShowTooltip(true)}
          aria-label="Direct Message on Instagram with THE PETAL MUSE"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_8px_24px_rgba(220,39,67,0.4)] hover:shadow-[0_12px_32px_rgba(220,39,67,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="absolute -inset-1 rounded-full bg-rose-500 opacity-25 animate-ping pointer-events-none" />
          <Instagram className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-amber-300 border-2 border-white" />
          </span>
        </button>
      )}
    </div>
  );
}
