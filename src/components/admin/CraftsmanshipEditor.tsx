"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, UploadCloud, Heart, Edit, RefreshCw } from "lucide-react";
import { CraftsmanshipStory } from "@/content/site";

interface CraftsmanshipEditorProps {
  handmade: CraftsmanshipStory["handmadeWithLove"];
  steps: CraftsmanshipStory["personalizedGifts"];
  onSave: (
    updatedHandmade: CraftsmanshipStory["handmadeWithLove"],
    updatedSteps: CraftsmanshipStory["personalizedGifts"]
  ) => Promise<void>;
  onUploadImage: (file: File) => Promise<string | null>;
}

export default function CraftsmanshipEditor({
  handmade: initialHandmade,
  steps: initialSteps,
  onSave,
  onUploadImage,
}: CraftsmanshipEditorProps) {
  const [handmade, setHandmade] = useState(initialHandmade);
  const [steps, setSteps] = useState(initialSteps);
  const [isUploadingHandmade, setIsUploadingHandmade] = useState(false);
  const [isUploadingSteps, setIsUploadingSteps] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(handmade, steps);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadHandmadePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingHandmade(true);
    try {
      const url = await onUploadImage(file);
      if (url) setHandmade((prev) => ({ ...prev, imageUrl: url }));
    } finally {
      setIsUploadingHandmade(false);
    }
  };

  const handleUploadStepsPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingSteps(true);
    try {
      const url = await onUploadImage(file);
      if (url) setSteps((prev) => ({ ...prev, imageUrl: url }));
    } finally {
      setIsUploadingSteps(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-2xl font-serif text-white">Craftsmanship &amp; Story CMS</h2>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Edit the &quot;Handmade with Love&quot; slow-craft botanical texture photo and the &quot;Personalized Gifts&quot; 4-step timeline and pen calligraphy photo live.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>Save Craftsmanship to DB</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-8">
        {/* SECTION 1: HANDMADE WITH LOVE */}
        <div className="bg-stone-900/60 border border-amber-500/30 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-300">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white font-medium">Part 1: Handmade with Love</h3>
                <p className="text-xs text-stone-400">Slow Botanical Craft &amp; Texture Artwork</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Eyebrow</label>
              <input
                type="text"
                value={handmade.eyebrow}
                onChange={(e) => setHandmade({ ...handmade, eyebrow: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Title</label>
              <input
                type="text"
                value={handmade.title}
                onChange={(e) => setHandmade({ ...handmade, title: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-stone-400 mb-1">Subtitle</label>
            <input
              type="text"
              value={handmade.subtitle}
              onChange={(e) => setHandmade({ ...handmade, subtitle: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-stone-400 mb-1">Description</label>
            <textarea
              rows={3}
              value={handmade.description}
              onChange={(e) => setHandmade({ ...handmade, description: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white leading-relaxed"
            />
          </div>

          {/* Texture Photo Upload */}
          <div>
            <label className="block text-xs uppercase text-stone-400 mb-1">
              Texture Photo (Every Stem Has a Soul card) *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={handmade.imageUrl}
                onChange={(e) => setHandmade({ ...handmade, imageUrl: e.target.value })}
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
              <label className="cursor-pointer bg-amber-600 hover:bg-amber-500 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0">
                {isUploadingHandmade ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <UploadCloud className="w-3.5 h-3.5" />
                )}
                <span>{isUploadingHandmade ? "Uploading..." : "Upload Photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingHandmade}
                  onChange={handleUploadHandmadePhoto}
                  className="hidden"
                />
              </label>
            </div>

            {handmade.imageUrl && (
              <div className="mt-2 relative w-32 h-32 rounded-xl overflow-hidden border border-stone-800 bg-stone-950">
                <Image
                  src={handmade.imageUrl}
                  alt="Texture Photo"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: PERSONALIZED GIFTS (4 STEPS) */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
                <Edit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white font-medium">Part 2: Personalized Gifts (4 Steps)</h3>
                <p className="text-xs text-stone-400">Customization Process &amp; Pen Calligraphy Photo</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Eyebrow</label>
              <input
                type="text"
                value={steps.eyebrow}
                onChange={(e) => setSteps({ ...steps, eyebrow: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Title</label>
              <input
                type="text"
                value={steps.title}
                onChange={(e) => setSteps({ ...steps, title: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-stone-400 mb-1">Subtitle</label>
            <input
              type="text"
              value={steps.subtitle}
              onChange={(e) => setSteps({ ...steps, subtitle: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-stone-400 mb-1">Description</label>
            <textarea
              rows={3}
              value={steps.description}
              onChange={(e) => setSteps({ ...steps, description: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white leading-relaxed"
            />
          </div>

          {/* Fountain Pen Calligraphy Photo Upload */}
          <div>
            <label className="block text-xs uppercase text-stone-400 mb-1">
              Personalized Gifts Artwork Photo (Fountain Pen Calligraphy) *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={steps.imageUrl}
                onChange={(e) => setSteps({ ...steps, imageUrl: e.target.value })}
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
              <label className="cursor-pointer bg-amber-600 hover:bg-amber-500 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0">
                {isUploadingSteps ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <UploadCloud className="w-3.5 h-3.5" />
                )}
                <span>{isUploadingSteps ? "Uploading..." : "Upload Photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingSteps}
                  onChange={handleUploadStepsPhoto}
                  className="hidden"
                />
              </label>
            </div>

            {steps.imageUrl && (
              <div className="mt-2 relative w-32 h-32 rounded-xl overflow-hidden border border-stone-800 bg-stone-950">
                <Image
                  src={steps.imageUrl}
                  alt="Personalized Artwork"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* 4 Steps Fields */}
          <div className="space-y-3 pt-4 border-t border-stone-800">
            <h4 className="text-xs uppercase tracking-wider text-amber-300 font-medium">
              The 4 Handcrafting Steps (01 to 04)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.steps.map((st, i) => (
                <div key={i} className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                      Step {st.step}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={st.title}
                    onChange={(e) => {
                      const updated = [...steps.steps];
                      updated[i] = { ...updated[i], title: e.target.value };
                      setSteps({ ...steps, steps: updated });
                    }}
                    placeholder="Step Title"
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium"
                  />
                  <textarea
                    rows={2}
                    value={st.detail}
                    onChange={(e) => {
                      const updated = [...steps.steps];
                      updated[i] = { ...updated[i], detail: e.target.value };
                      setSteps({ ...steps, steps: updated });
                    }}
                    placeholder="Step Detail"
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-[11px] text-stone-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>Save Craftsmanship Story to DB</span>
          </button>
        </div>
      </form>
    </div>
  );
}

