"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Plus, Trash2, Edit, UploadCloud, Compass, RefreshCw, Loader2 } from "lucide-react";
import { OccasionItem } from "@/content/site";

interface OccasionsEditorProps {
  occasions: OccasionItem[];
  onSave: (updatedOccasions: OccasionItem[]) => Promise<void>;
  onUploadImage: (file: File, previousUrl?: string) => Promise<string | null>;
}

export default function OccasionsEditor({
  occasions: initialOccasions,
  onSave,
  onUploadImage,
}: OccasionsEditorProps) {
  const [occasions, setOccasions] = useState<OccasionItem[]>(initialOccasions);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editOccasion, setEditOccasion] = useState<OccasionItem | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Synchronize internal state when parent loads or updates occasions list
  useEffect(() => {
    if (initialOccasions && Array.isArray(initialOccasions)) {
      setOccasions(initialOccasions);
    }
  }, [initialOccasions]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditOccasion({ ...occasions[index] });
  };

  const handleAddNew = () => {
    const newId = `occ-${Date.now().toString(36)}`;
    const newOcc: OccasionItem = {
      id: newId,
      name: "New Milestone Occasion",
      subtitle: "Heartfelt Celebrations & Cherished Memories",
      description: "Custom handcrafted botanical arrangements and memory keepsakes designed for this life chapter.",
      imageUrl: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1200&q=85",
      recommendedCategories: ["bouquets", "photo-frames", "hamper-boxes"],
      curatedIdea: "Signature Keepsake + Botanical Message Card",
      botanicalMood: "Rose Gold, Champagne & Sweet Blossom",
    };
    setOccasions((prev) => [...prev, newOcc]);
    setEditingIndex(occasions.length);
    setEditOccasion(newOcc);
  };

  const handleDelete = async (index: number) => {
    const itemTitle = occasions[index]?.name || "this occasion";
    if (!confirm(`Are you sure you want to delete "${itemTitle}"? This will immediately remove it from the website.`)) return;
    const removedItem = occasions[index];
    if (removedItem?.imageUrl && removedItem.imageUrl.includes("cloudinary.com")) {
      fetch(`/api/admin/upload?url=${encodeURIComponent(removedItem.imageUrl)}`, { method: "DELETE" }).catch(() => {});
    }
    const updated = occasions.filter((_, i) => i !== index);
    setOccasions(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditOccasion(null);
    }
    setIsSaving(true);
    try {
      await onSave(updated);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editOccasion || editingIndex === null) return;
    const updated = [...occasions];
    updated[editingIndex] = editOccasion;
    setOccasions(updated);
    setEditingIndex(null);
    setEditOccasion(null);
    try {
      setIsSaving(true);
      await onSave(updated);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await onSave(occasions);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await onUploadImage(file, editOccasion?.imageUrl);
      if (url && editOccasion) {
        setEditOccasion({ ...editOccasion, imageUrl: url });
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-2xl font-serif text-white">Occasion Chapters Manager</h2>
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
              {occasions.length} Occasions
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Edit the 10 life celebration milestones in &quot;Gifts for Every Occasion&quot; (Screenshot 10). Update occasion photos, recommended pairings, and botanical moods live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Occasion</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>Save Occasions to DB</span>
          </button>
        </div>
      </div>

      {/* Grid of Occasions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {occasions.map((occ, idx) => (
          <div
            key={occ.id || idx}
            className="bg-stone-900/70 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] w-full bg-black/40 overflow-hidden">
              <Image
                src={occ.imageUrl}
                alt={occ.name}
                fill
                sizes="350px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-300 font-mono text-[9.5px] border border-white/20">
                Chapter #{String(idx + 1).padStart(2, "0")}
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <span className="text-[10px] uppercase tracking-wider text-rose-300 font-serif italic line-clamp-1">
                  {occ.subtitle}
                </span>
                <h4 className="font-serif text-sm font-medium line-clamp-1">{occ.name}</h4>
              </div>
            </div>

            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {occ.description}
                </p>
                <div className="mt-2 text-[10.5px] text-amber-300/90 font-medium line-clamp-1">
                  ✦ {occ.curatedIdea}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-stone-500 truncate max-w-[180px]">
                  {occ.botanicalMood}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEdit(idx)}
                    className="p-1.5 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 rounded-lg transition"
                    title="Edit Occasion"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 bg-stone-800 hover:bg-rose-600 hover:text-white text-stone-400 rounded-lg transition"
                    title="Delete Occasion"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingIndex !== null && editOccasion && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-lg font-serif text-white">
                Edit Occasion Chapter #{String(editingIndex + 1).padStart(2, "0")}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingIndex(null);
                  setEditOccasion(null);
                }}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">Occasion Name *</label>
                <input
                  type="text"
                  required
                  value={editOccasion.name}
                  onChange={(e) => setEditOccasion({ ...editOccasion, name: e.target.value })}
                  placeholder="e.g. Birthday Gifts, Anniversary Gifts"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editOccasion.subtitle}
                  onChange={(e) => setEditOccasion({ ...editOccasion, subtitle: e.target.value })}
                  placeholder="Vibrant Celebrations of Another Golden Year"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editOccasion.description}
                  onChange={(e) => setEditOccasion({ ...editOccasion, description: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Curated Pairing Idea
                  </label>
                  <input
                    type="text"
                    value={editOccasion.curatedIdea}
                    onChange={(e) => setEditOccasion({ ...editOccasion, curatedIdea: e.target.value })}
                    placeholder="Artisan Chocolate Bouquet + Real Pressed Flower Mobile Cover"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Botanical Mood Palette
                  </label>
                  <input
                    type="text"
                    value={editOccasion.botanicalMood}
                    onChange={(e) => setEditOccasion({ ...editOccasion, botanicalMood: e.target.value })}
                    placeholder="Marigold, Peach Blossom & Sweet Apricot"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Occasion Photo (Cloudinary or URL) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editOccasion.imageUrl}
                    onChange={(e) => setEditOccasion({ ...editOccasion, imageUrl: e.target.value })}
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                  <label className="cursor-pointer bg-amber-600 hover:bg-amber-500 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0">
                    {isUploading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5" />
                    )}
                    <span>{isUploading ? "Uploading..." : "Upload Photo"}</span>
                    <input
                      type="file"
                      accept="image/*,.heic,.HEIC"
                      disabled={isUploading}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {editOccasion.imageUrl && (
                  <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-stone-800 bg-stone-950">
                    <Image
                      src={editOccasion.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingIndex(null);
                    setEditOccasion(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-5 py-2 rounded-xl text-xs transition"
                >
                  Update Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

