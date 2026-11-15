"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import EditorialTicker from "@/components/home/EditorialTicker";
import AboutSection from "@/components/home/AboutSection";
import BestsellersSection from "@/components/home/BestsellersSection";
import CollectionsShowcase from "@/components/home/CollectionsShowcase";
import ComboCollections from "@/components/home/ComboCollections";
import OccasionCollections from "@/components/home/OccasionCollections";
import CraftsmanshipStory from "@/components/home/CraftsmanshipStory";
import CustomerReviewsSection from "@/components/home/CustomerReviewsSection";
import FeaturedMoment from "@/components/home/FeaturedMoment";
import InstagramReels from "@/components/home/InstagramReels";
import ServicesSection from "@/components/home/ServicesSection";
import InstagramJournal from "@/components/home/InstagramJournal";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/layout/Footer";

// Dynamic imports with ssr: false for client-only animations, WebGL canvas, and cursor to prevent extension attribute mismatches
const BloomLoader = dynamic(() => import("@/components/ui/BloomLoader"), {
  ssr: false,
});

const FloralCanvas = dynamic(() => import("@/components/canvas/FloralCanvas"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  // Guarantee that on initial mount or page refresh, the window starts at the top
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleLoaderComplete = React.useCallback(() => {
    setLoaderComplete(true);
  }, []);

  return (
    <>
      {/* 1. Signature Bloom Loader (Plays smoothly on initial entry, skips on repeat) */}
      <BloomLoader onComplete={handleLoaderComplete} />

      {/* 2. Custom Desktop Trailing Petal Cursor */}
      <CustomCursor />

      {/* 3. The Living Background: 3D Petals & Scroll-Linked Day Lighting */}
      <FloralCanvas />

      {/* 4. Responsive Navigation with Frosted Glass & Full-screen Mobile Menu */}
      <Navbar />

      {/* 5. Main Narrative Flow: The Blooming Day */}
      <main className="relative z-10 flex flex-col min-h-screen overflow-x-hidden">
        {/* Dawn: Hero ("Flowers, reimagined.") — Core Essential */}
        <HeroSection />

        {/* Endless Editorial Atelier Ribbon — Seamless Text Slider */}
        <EditorialTicker />

        {/* Morning: Philosophy & About Jensi Dholariya — Core Essential */}
        <AboutSection />

        {/* Atelier Bestsellers — Most Loved Creations */}
        <BestsellersSection />

        {/* 15 Product Categories Showcase — Complete Repertoire */}
        <CollectionsShowcase />

        {/* Curated Combo Collections — Suggested Gift Combinations */}
        <ComboCollections />

        {/* Gifts for Every Occasion — 10 Milestones */}
        <OccasionCollections />

        {/* Craftsmanship & Atelier Story — Handmade with Love & Why Choose Us */}
        <CraftsmanshipStory />

        {/* Customer Love Stories & 5-Star Reviews — Real Gifting Moments */}
        <CustomerReviewsSection />

        {/* Midday Masterpiece: Full-Width Photographic Moment (Desktop Editorial Feature) */}
        <div className="hidden md:block">
          <FeaturedMoment />
        </div>

        {/* Moving Petals: Video Reels (High-Impact Social Video Proof) */}
        <InstagramReels />

        {/* Sunset: Services & Floral Craft Offerings — Core Essential Offerings */}
        <ServicesSection />

        {/* Editorial Instagram Journal Grid — Core Essential Social Proof */}
        <InstagramJournal />

        {/* Night Garden: Contact & Concierge Experience — Core Essential Conversion */}
        <ContactSection />
      </main>

      {/* 6. Footer & Outlined Marquee */}
      <Footer />

      {/* 7. Floating WhatsApp Concierge Button */}
      <FloatingWhatsApp />
    </>
  );
}
