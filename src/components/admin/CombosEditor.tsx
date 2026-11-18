"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Plus, Trash2, Edit, UploadCloud, CheckCircle2, Gift, RefreshCw, Loader2 } from "lucide-react";
import { ComboCollectionItem } from "@/content/site";

interface CombosEditorProps {
  combos: ComboCollectionItem[];
  onSave: (updatedCombos: ComboCollectionItem[]) => Promise<void>;
  onUploadImage: (file: File) => Promise<string | null>;
}

export default function CombosEditor({
  combos: initialCombos,
  onSave,
  onUploadImage,
}: CombosEditorProps) {
  const [combos, setCombos] = useState<ComboCollectionItem[]>(initialCombos);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCombo, setEditCombo] = useState<ComboCollectionItem | null>(null);
  const [itemsString, setItemsString] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Synchronize internal state when parent loads or updates combos list
  useEffect(() => {
    if (initialCombos && Array.isArray(initialCombos)) {
      setCombos(initialCombos);
    }
  }, [initialCombos]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditCombo({ ...combos[index] });
    setItemsString(combos[index].itemsIncluded.join("\n"));
  };

  const handleAddNew = () => {
    const newId = `combo-${combos.length + 1}`;
    const newSuite: ComboCollectionItem = {
      id: newId,
      title: "New Curated Gift Suite",
      subtitle: "Artisanal Bouquet + Luxury Hamper",
      itemsIncluded: [
        "Handcrafted Floral Arrangement",
        "Imported Confectionery Selection",
        "Handmade Archival Wax Card",
      ],
      pairingDescription: "Harmonious pairing of botanical beauty and sensory indulgence.",
      whyItsSpecial: "Thoughtfully color-matched packaging and raw silk ribbons.",
      imageUrl: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85",
      badge: "Curated Suite",
      idealFor: "Weddings, Anniversaries, VIP Gifting",
    };
    setCombos((prev) => [...prev, newSuite]);
    setEditingIndex(combos.length);
    setEditCombo(newSuite);
    setItemsString(newSuite.itemsIncluded.join("\n"));
  };

  const handleDelete = async (index: number) => {
    const itemTitle = combos[index]?.title || "this suite";
    if (!confirm(`Are you sure you want to delete "${itemTitle}"? This will immediately remove it from the website.`)) return;
    const updated = combos.filter((_, i) => i !== index);
    setCombos(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditCombo(null);
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
    if (!editCombo || editingIndex === null) return;
    const itemsIncluded = itemsString
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const updated = [...combos];
    updated[editingIndex] = { ...editCombo, itemsIncluded };
    setCombos(updated);
    setEditingIndex(null);
    setEditCombo(null);
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
      await onSave(combos);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await onUploadImage(file);
      if (url && editCombo) {
        setEditCombo({ ...editCombo, imageUrl: url });
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
            <h2 className="text-2xl font-serif text-white">Combo Collections Manager</h2>
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
              {combos.length} Suites
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Manage the multi-item paired suites shown in the &quot;Creative Combo Collections&quot; slider (Screenshot 9). Edit suite titles, photos, and included items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Combo Suite</span>
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
            <span>Save Combos to DB</span>
          </button>
        </div>
      </div>

      {/* Grid of Combo Suites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {combos.map((suite, idx) => (
          <div
            key={suite.id || idx}
            className="bg-stone-900/70 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] w-full bg-black/40 overflow-hidden">
              <Image
                src={suite.imageUrl}
                alt={suite.title}
                fill
                sizes="350px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-300 font-mono text-[10px] flex items-center justify-center border border-white/20">
                0{idx + 1}
              </div>

              {suite.badge && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md font-semibold">
                    {suite.badge}
                  </span>
                </div>
              )}

              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <span className="text-[10px] uppercase tracking-wider text-rose-300 font-serif italic line-clamp-1">
                  {suite.subtitle}
                </span>
                <h4 className="font-serif text-sm font-medium line-clamp-1">{suite.title}</h4>
              </div>
            </div>

            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {suite.pairingDescription}
                </p>
                <div className="mt-2 text-[10.5px] text-stone-300 flex items-center gap-1">
                  <Gift className="w-3 h-3 text-amber-400" />
                  <span>{suite.itemsIncluded.length} Artisanal Pieces Included</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-stone-500 truncate max-w-[180px]">
                  {suite.idealFor}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEdit(idx)}
                    className="p-1.5 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 rounded-lg transition"
                    title="Edit Suite"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 bg-stone-800 hover:bg-rose-600 hover:text-white text-stone-400 rounded-lg transition"
                    title="Delete Suite"
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
      {editingIndex !== null && editCombo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-lg font-serif text-white">
                Edit Combo Suite #{String(editingIndex + 1).padStart(2, "0")}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingIndex(null);
                  setEditCombo(null);
                }}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">Suite Title *</label>
                <input
                  type="text"
                  required
                  value={editCombo.title}
                  onChange={(e) => setEditCombo({ ...editCombo, title: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editCombo.subtitle}
                    onChange={(e) => setEditCombo({ ...editCombo, subtitle: e.target.value })}
                    placeholder="Signature Bouquet + Gourmet Artisan Chocolates"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={editCombo.badge}
                    onChange={(e) => setEditCombo({ ...editCombo, badge: e.target.value })}
                    placeholder="Most Popular Combo"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Items Included in This Suite (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={itemsString}
                  onChange={(e) => setItemsString(e.target.value)}
                  placeholder="Fresh or Preserved Floral Bouquet&#10;Box of 16 Imported Ferrero Rocher&#10;Silk Velvet Ribbon Binding&#10;Wax-Sealed Message Card"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white leading-relaxed font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Pairing Description
                </label>
                <textarea
                  rows={3}
                  value={editCombo.pairingDescription}
                  onChange={(e) => setEditCombo({ ...editCombo, pairingDescription: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white leading-relaxed"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Suite Photo (Cloudinary or URL) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editCombo.imageUrl}
                    onChange={(e) => setEditCombo({ ...editCombo, imageUrl: e.target.value })}
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

                {editCombo.imageUrl && (
                  <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-stone-800 bg-stone-950">
                    <Image
                      src={editCombo.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">Ideal For Occasion</label>
                <input
                  type="text"
                  value={editCombo.idealFor}
                  onChange={(e) => setEditCombo({ ...editCombo, idealFor: e.target.value })}
                  placeholder="Valentine's Day, Romantic Anniversaries, Birthday Surprises"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingIndex(null);
                    setEditCombo(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-5 py-2 rounded-xl text-xs transition"
                >
                  Update Suite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

