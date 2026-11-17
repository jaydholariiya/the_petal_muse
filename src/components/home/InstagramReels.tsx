"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Instagram, Film } from "lucide-react";
import { SITE_CONTENT, ReelItem } from "@/content/site";
import { useAtelierContent } from "@/context/AtelierContentContext";

export default function InstagramReels() {
  const { reels: dynamicReels } = useAtelierContent();
  const reels = dynamicReels?.length > 0 ? dynamicReels : SITE_CONTENT.reels;
  const { brand } = SITE_CONTENT;
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handlePlayToggle = (reel: ReelItem) => {
    const video = videoRefs.current[reel.id];

    if (playingId === reel.id) {
      if (video) video.pause();
      setPlayingId(null);
    } else {
      // Pause previously playing video
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }

      if (video) {
        video.play().catch(() => {});
      }
      setPlayingId(reel.id);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) vid.muted = !isMuted;
    });
  };

  return (
    <section id="reels" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-ink-aubergine/10 pb-6 mb-8 sm:mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Film className="w-3.5 h-3.5 text-mulberry-wine" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-mulberry-wine font-medium">
              Moving Petals • Studio Reels
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ink-aubergine font-light leading-tight">
            In The Studio &amp; Behind The Scenes
          </h2>
        </div>

        <a
          href={brand.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-mulberry-wine hover:text-marigold-glow transition-colors"
        >
          <Instagram className="w-4 h-4" />
          <span>Follow {brand.instagramHandle}</span>
        </a>
      </div>

      {/* MOBILE EXCLUSIVE: Downward Vertical 2-Column Grid (Zero Left/Right Scroll) */}
      <div className="grid md:hidden grid-cols-2 gap-3 w-full mb-8">
        {reels.map((reel) => {
          const isPlaying = playingId === reel.id;

          return (
            <div
              key={`mobile-reel-${reel.id}`}
              onClick={() => handlePlayToggle(reel)}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-md bg-ink-aubergine cursor-pointer group border border-ink-aubergine/10 flex flex-col justify-between"
            >
              {/* Poster Image */}
              <Image
                src={reel.posterUrl}
                alt={reel.title}
                fill
                sizes="50vw"
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Optional HTML5 Video (Plays if videoUrl supplied) */}
              {reel.videoUrl && (
                <video
                  ref={(el) => {
                    videoRefs.current[`mobile-${reel.id}`] = el;
                  }}
                  src={reel.videoUrl}
                  loop
                  playsInline
                  muted={isMuted}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              )}

              {/* Soft Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/95 via-ink-aubergine/30 to-transparent pointer-events-none" />

              {/* Top Controls: Sound toggle & Duration */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-20">
                <span className="text-[8px] font-sans tracking-widest uppercase bg-ink-aubergine/60 backdrop-blur-md px-2 py-0.5 rounded-full text-butter-cream border border-white/10">
                  {reel.duration || "Reel"}
                </span>

                {isPlaying && (
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    className="w-6 h-6 rounded-full bg-ink-aubergine/70 backdrop-blur-md text-butter-cream flex items-center justify-center"
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                )}
              </div>

              {/* Center Play Button Overlay (when paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-butter-cream/25 backdrop-blur-md text-butter-cream flex items-center justify-center shadow-lg border border-white/20">
                    <Play className="w-4 h-4 fill-butter-cream stroke-none translate-x-0.5" />
                  </div>
                </div>
              )}

              {/* Bottom Caption & Instagram Outbound Link */}
              <div className="relative z-20 p-3 mt-auto flex flex-col text-butter-cream">
                <h3 className="font-serif text-sm font-light leading-snug line-clamp-1">
                  {reel.title}
                </h3>
                <p className="mt-0.5 text-[9.5px] text-butter-cream/75 font-sans font-light line-clamp-2 leading-relaxed">
                  {reel.caption}
                </p>

                <div className="mt-2 pt-1.5 border-t border-white/15 flex items-center justify-between">
                  <a
                    href={reel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[8.5px] font-sans uppercase tracking-wider text-marigold-glow"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>Watch</span>
                  </a>
                  <span className="text-[7.5px] uppercase tracking-widest text-butter-cream/40">
                    Studio
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW: 100% UNTOUCHED Draggable / Horizontal Carousel of 9:16 Video Cards */}
      <div className="hidden md:flex md:gap-6 md:overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory">
        {reels.map((reel) => {
          const isPlaying = playingId === reel.id;

          return (
            <div
              key={reel.id}
              onClick={() => handlePlayToggle(reel)}
              className="relative flex-shrink-0 w-[260px] sm:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-xl bg-ink-aubergine cursor-pointer group snap-center border border-ink-aubergine/10"
              data-cursor={isPlaying ? "PAUSE" : "PLAY"}
            >
              {/* Poster Image */}
              <Image
                src={reel.posterUrl}
                alt={reel.title}
                fill
                sizes="(max-width: 768px) 260px, 320px"
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Optional HTML5 Video (Plays if videoUrl supplied) */}
              {reel.videoUrl && (
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={reel.videoUrl}
                  loop
                  playsInline
                  muted={isMuted}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              )}

              {/* Soft Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-aubergine/90 via-ink-aubergine/20 to-transparent pointer-events-none" />

              {/* Top Controls: Sound toggle & Duration */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <span className="text-[10px] font-sans tracking-widest uppercase bg-ink-aubergine/50 backdrop-blur-md px-2.5 py-1 rounded-full text-butter-cream border border-white/10">
                  {reel.duration || "Reel"}
                </span>

                {isPlaying && (
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    className="w-8 h-8 rounded-full bg-ink-aubergine/60 backdrop-blur-md text-butter-cream flex items-center justify-center hover:bg-ink-aubergine"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Center Play Button Overlay (when paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-butter-cream/20 backdrop-blur-md text-butter-cream flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-butter-cream stroke-none translate-x-0.5" />
                  </div>
                </div>
              )}

              {/* Bottom Caption & Instagram Outbound Button */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col text-butter-cream">
                <h3 className="font-serif text-xl font-light leading-snug">
                  {reel.title}
                </h3>
                <p className="mt-1.5 text-xs text-butter-cream/80 font-sans font-light line-clamp-2">
                  {reel.caption}
                </p>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                  <a
                    href={reel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.2em] text-marigold-glow hover:underline"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Watch on Instagram</span>
                  </a>
                  <span className="text-[9px] uppercase tracking-widest text-butter-cream/50">
                    @the.petalmusee
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

