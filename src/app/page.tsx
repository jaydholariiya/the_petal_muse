"use client";

import React, { useState } from "react";
import BloomLoader from "@/components/ui/BloomLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import FloralCanvas from "@/components/canvas/FloralCanvas";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import CreationsGallery from "@/components/home/CreationsGallery";
import FeaturedMoment from "@/components/home/FeaturedMoment";
import StemArchiveSection from "@/components/home/StemArchiveSection";
import InstagramReels from "@/components/home/InstagramReels";
import AtmosphereSimulator from "@/components/home/AtmosphereSimulator";
import BouquetMoodWorkshop from "@/components/interactive/BouquetMoodWorkshop";
import EventScopeCalculator from "@/components/home/EventScopeCalculator";
import FloralMoodQuiz from "@/components/interactive/FloralMoodQuiz";
import FloralCareRituals from "@/components/home/FloralCareRituals";
import ServicesSection from "@/components/home/ServicesSection";
import InstagramJournal from "@/components/home/InstagramJournal";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

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

        {/* Morning: Philosophy & About Jensi Dholariya — Core Essential */}
        <AboutSection />

        {/* Golden Noon: Creations Gallery ("The Bloom Archive") — Core Essential Portfolio */}
        <CreationsGallery />

        {/* Midday Masterpiece: Full-Width Photographic Moment (Desktop Editorial Feature) */}
        <div className="hidden md:block">
          <FeaturedMoment />
        </div>

        {/* Sensory Stem Library & Seasonal Bloom Archive (Desktop Botanical Library) */}
        <div className="hidden md:block">
          <StemArchiveSection />
        </div>

        {/* Moving Petals: Video Reels (High-Impact Social Video Proof) */}
        <InstagramReels />

        {/* Floral Atmosphere & Candlelight Simulator (Desktop Interactive Experience) */}
        <div className="hidden md:block">
          <AtmosphereSimulator />
        </div>

        {/* Signature Interactive Feature 1: Design Your Floral Mood Workshop (Desktop Only — Hidden on Mobile per request) */}
        <div className="hidden md:block">
          <BouquetMoodWorkshop />
        </div>

        {/* Bespoke Event Floral Scale & Scope Planner (Desktop Planning Tool) */}
        <div className="hidden md:block">
          <EventScopeCalculator />
        </div>

        {/* Signature Interactive Feature 2: Floral Mood Finder Quiz (Desktop Interactive Quiz) */}
        <div className="hidden md:block">
          <FloralMoodQuiz />
        </div>

        {/* Botanical Care & Heirloom Bouquet Preservation Rituals (Desktop Care Guide) */}
        <div className="hidden md:block">
          <FloralCareRituals />
        </div>

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
