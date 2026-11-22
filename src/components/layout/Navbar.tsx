"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, ArrowUpRight, MessageCircle } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";
import { SITE_CONTENT } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";
import { buildWhatsAppUrl, openInstagramInquiry } from "@/lib/utils";

// Curated primary links for desktop header — balanced luxury marquee links
const PRIMARY_NAV_LINKS = [
  { label: "Bestsellers", href: "#bestsellers" },
  { label: "Collections", href: "#collections" },
  { label: "Combos", href: "#combos" },
  { label: "Occasions", href: "#occasions" },
  { label: "Reviews", href: "#reviews" },
];

// Full directory of links for desktop full menu
const FULL_DIRECTORY_LINKS = [
  { label: "Our Bestsellers", sub: "Most loved creations by the atelier", href: "#bestsellers" },
  { label: "Explore Collections", sub: "Handcrafted product categories", href: "#collections" },
  { label: "Creative Combos", sub: "Curated gift pairing combinations", href: "#combos" },
  { label: "Gifts for Every Occasion", sub: "Birthdays, anniversaries, milestones", href: "#occasions" },
  { label: "Craftsmanship & Story", sub: "Handmade with love & why choose us", href: "#craftsmanship" },
  { label: "Client Reviews", sub: "5-star patron stories & real gifting photos", href: "#reviews" },
  { label: "Our Floral Craft", sub: "Installations, bridal & tablescapes", href: "#services" },
  { label: "Instagram Journal", sub: "Recent captures from @the.petalmusee", href: "#journal" },
  { label: "Contact & Concierge", sub: "Direct consultation with Jensi", href: "#contact" },
];

// Streamlined essential links for mobile drawer
const MOBILE_DIRECTORY_LINKS = [
  { label: "Our Bestsellers", sub: "Most loved creations", href: "#bestsellers" },
  { label: "15 Collections", sub: "Complete product catalog", href: "#collections" },
  { label: "Combo Gifts", sub: "Suggested gift pairings", href: "#combos" },
  { label: "Every Occasion", sub: "Birthdays, weddings & more", href: "#occasions" },
  { label: "Handmade Story", sub: "Why choose The Petal Muse", href: "#craftsmanship" },
  { label: "Client Reviews", sub: "5-star patron stories & photos", href: "#reviews" },
  { label: "Studio Reels", sub: "Behind the scenes moving petals", href: "#reels" },
  { label: "Instagram Journal", sub: "Recent captures from @the.petalmusee", href: "#journal" },
  { label: "Contact & Concierge", sub: "Direct consultation with Jensi", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up (smoother threshold)
      if (currentScrollY > lastScrollY && currentScrollY > 160) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Keyboard Escape listener when mobile/desktop drawer is open (zero scroll jumping)
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const { settings } = useAtelierContent();
  const enableWhatsApp = settings["enable_whatsapp"] !== undefined
    ? settings["enable_whatsapp"] === "true"
    : Boolean(SITE_CONTENT.brand.enableWhatsApp);

  const whatsappDirectUrl = buildWhatsAppUrl({
    occasion: "Bespoke Mobile Consultation",
    notes: "Hello Jensi! I am browsing THE PETAL MUSE on my phone and would love to discuss floral styling.",
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled
            ? "bg-butter-cream/95 backdrop-blur-md border-b border-ink-aubergine/10 shadow-[0_4px_20px_rgba(27,18,32,0.04)] py-2.5 sm:py-3.5"
            : "bg-butter-cream/90 backdrop-blur-sm border-b border-ink-aubergine/5 py-3 sm:py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between">
          {/* Brand Logo / Wordmark with guaranteed breathing room */}
          <div className="shrink-0 flex items-center mr-6 lg:mr-10 xl:mr-14">
            <BrandLogo variant="dark" size="sm" className="sm:hidden" />
            <BrandLogo variant="dark" size="md" className="hidden sm:inline-flex" />
          </div>

          {/* Desktop Navigation Links — Centered with refined luxury typography */}
          <nav
            className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 mx-auto"
            aria-label="Primary Navigation"
          >
            {PRIMARY_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-[11px] xl:text-xs font-sans uppercase tracking-[0.18em] xl:tracking-[0.22em] text-ink-aubergine/80 hover:text-mulberry-wine transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-marigold-glow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Actions for Desktop & Mobile with matching balance */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0 ml-6 lg:ml-10 xl:ml-14">
            {/* Mobile Quick Action Icon */}
            {enableWhatsApp ? (
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Concierge"
                className="sm:hidden p-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] stroke-none" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() =>
                  openInstagramInquiry({
                    occasion: "Bespoke Mobile Consultation",
                    notes: "Hello Jensi! I am browsing THE PETAL MUSE on my phone and would love to discuss floral styling.",
                  })
                }
                aria-label="Instagram Concierge"
                className="sm:hidden p-2 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 text-rose-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-rose-300" />
              </button>
            )}

            {/* Desktop Instagram Link */}
            <a
              href={SITE_CONTENT.brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow THE PETAL MUSE on Instagram"
              className="hidden sm:flex p-2 text-ink-aubergine/70 hover:text-mulberry-wine hover:scale-105 transition-all duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Desktop Enquire CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-ink-aubergine text-butter-cream text-xs font-sans tracking-[0.18em] uppercase hover:bg-mulberry-wine transition-all duration-300 shadow-sm"
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Menu Drawer Toggle Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full border border-ink-aubergine/20 text-ink-aubergine hover:border-ink-aubergine hover:bg-ink-aubergine/5 transition-all text-xs font-sans uppercase tracking-widest"
            >
              {menuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <>
                  <Menu className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Luxury Mobile & Desktop Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-ink-aubergine text-butter-cream p-5 sm:p-10 md:p-14 overflow-y-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <BrandLogo variant="light" size="sm" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close directory menu"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 text-butter-cream/80 hover:text-butter-cream hover:border-white/50 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Directory Links Grid: Mobile-only essential links */}
            <div className="sm:hidden my-auto py-6 flex flex-col gap-y-3 max-w-5xl w-full mx-auto">
              {MOBILE_DIRECTORY_LINKS.map((link, index) => (
                <motion.a
                  key={`mob-link-${link.label}`}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.25 }}
                  className="group py-2.5 border-b border-white/10 hover:border-marigold-glow/50 transition-colors flex items-baseline justify-between"
                >
                  <div>
                    <h3 className="font-serif text-2xl text-butter-cream group-hover:text-apricot-blush transition-colors font-light">
                      {link.label}
                    </h3>
                    <p className="text-[10px] font-sans text-butter-cream/50 mt-0.5 font-light">
                      {link.sub}
                    </p>
                  </div>
                  <span className="font-sans text-[10px] tracking-widest text-butter-cream/30 group-hover:text-marigold-glow font-medium shrink-0 ml-3">
                    0{index + 1} →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Directory Links Grid: Desktop full directory */}
            <div className="hidden sm:grid my-auto py-8 grid-cols-2 gap-x-12 gap-y-5 max-w-5xl w-full mx-auto">
              {FULL_DIRECTORY_LINKS.map((link, index) => (
                <motion.a
                  key={`desk-link-${link.label}`}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.25 }}
                  className="group py-2 border-b border-white/10 hover:border-marigold-glow/50 transition-colors flex items-baseline justify-between"
                >
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-butter-cream group-hover:text-apricot-blush transition-colors font-light">
                      {link.label}
                    </h3>
                    <p className="text-[11px] font-sans text-butter-cream/50 mt-0.5 font-light">
                      {link.sub}
                    </p>
                  </div>
                  <span className="font-sans text-[11px] tracking-widest text-butter-cream/30 group-hover:text-marigold-glow font-medium shrink-0 ml-3">
                    0{index + 1} →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Drawer Bottom Bar */}
            <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0 max-w-5xl w-full mx-auto text-xs font-sans text-butter-cream/60">
              <div className="flex items-center gap-3 text-[11px] sm:text-xs">
                <a
                  href={SITE_CONTENT.brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-butter-cream hover:text-marigold-glow transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-marigold-glow" />
                  <span>{SITE_CONTENT.brand.instagramHandle}</span>
                </a>
                <span>•</span>
                <span className="font-serif italic text-xs sm:text-sm text-butter-cream/80">
                  Flowers, reimagined.
                </span>
              </div>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-marigold-glow text-ink-aubergine font-sans text-xs uppercase tracking-[0.18em] font-semibold hover:bg-white transition-colors"
                >
                  Begin Your Enquiry
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
