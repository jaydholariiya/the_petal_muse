"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Plus, Trash2, Edit, UploadCloud, CheckCircle2, Eye, RefreshCw, Loader2 } from "lucide-react";
import { BestsellerProduct } from "@/content/site";

function getSafeImageUrl(url?: string, fallback: string = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85") {
  if (!url || typeof url !== "string") return fallback;
  let trimmed = url.trim();
  if (trimmed.includes("behance.net/gallery/")) return fallback;
  if (trimmed.toLowerCase().endsWith(".heic") && trimmed.includes("cloudinary.com")) {
    trimmed = trimmed.replace(/\.heic$/i, ".jpg");
  }
  return trimmed;
}

interface BestsellersEditorProps {
  products: BestsellerProduct[];
  categories: { Id: string; Name: string; Slug: string }[];
  onSave: (updatedProducts: BestsellerProduct[]) => Promise<void>;
  onUploadImage: (file: File) => Promise<string | null>;
}

export default function BestsellersEditor({
  products: initialProducts,
  categories,
  onSave,
  onUploadImage,
}: BestsellersEditorProps) {
  const [products, setProducts] = useState<BestsellerProduct[]>(initialProducts);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<BestsellerProduct | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Synchronize internal state when parent loads or updates bestsellers list
  useEffect(() => {
    if (initialProducts && Array.isArray(initialProducts)) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditProduct({ ...products[index] });
  };

  const handleAddNew = () => {
    const newId = `best-${String(products.length + 1).padStart(2, "0")}`;
    const newProd: BestsellerProduct = {
      id: newId,
      title: "New Atelier Bestseller",
      category: categories[0]?.Slug || "photo-frames",
      categoryName: categories[0]?.Name || "Photo Frames",
      tagline: "Handcrafted Atelier Creation",
      description: "Description of this handcrafted botanical masterpiece.",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85",
      badge: "Signature Creation",
      customizationSnippet: "Custom colors & handwritten wax-sealed letter included.",
      featuredOccasion: "Weddings & Anniversaries",
    };
    setProducts((prev) => [...prev, newProd]);
    setEditingIndex(products.length);
    setEditProduct(newProd);
  };

  const handleDelete = async (index: number) => {
    const itemTitle = products[index]?.title || "this bestseller";
    if (!confirm(`Are you sure you want to delete "${itemTitle}" from bestsellers? This will immediately remove it from the website.`)) return;
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditProduct(null);
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
    if (!editProduct || editingIndex === null) return;
    const updated = [...products];
    updated[editingIndex] = editProduct;
    setProducts(updated);
    setEditingIndex(null);
    setEditProduct(null);
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
      await onSave(products);
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
      if (url && editProduct) {
        setEditProduct({ ...editProduct, imageUrl: url });
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
            <h2 className="text-2xl font-serif text-white">Atelier Bestsellers Manager</h2>
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
              {products.length} Products
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Edit all bestselling creations shown in the &quot;OUR BESTSELLERS&quot; grid on the homepage. Change titles, badges, and photos live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Bestseller</span>
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
            <span>Save Bestsellers to DB</span>
          </button>
        </div>
      </div>

      {/* Grid of Bestsellers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((prod, idx) => (
          <div
            key={prod.id || idx}
            className="bg-stone-900/70 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] w-full bg-black/40 overflow-hidden">
              <Image
                src={getSafeImageUrl(prod.imageUrl)}
                alt={prod.title}
                fill
                sizes="350px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

              {/* Number disc */}
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-300 font-mono text-[10px] flex items-center justify-center border border-white/20">
                0{idx + 1}
              </div>

              {/* Badge */}
              {prod.badge && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md font-semibold">
                    {prod.badge}
                  </span>
                </div>
              )}

              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <span className="text-[10px] uppercase tracking-wider text-amber-300/90 font-medium">
                  {prod.categoryName || prod.category}
                </span>
                <h4 className="font-serif text-sm font-medium line-clamp-1">{prod.title}</h4>
              </div>
            </div>

            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] italic text-rose-300 line-clamp-1">&ldquo;{prod.tagline}&rdquo;</p>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-stone-500 truncate max-w-[180px]">
                  {prod.featuredOccasion}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEdit(idx)}
                    className="p-1.5 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 rounded-lg transition"
                    title="Edit Bestseller"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 bg-stone-800 hover:bg-rose-600 hover:text-white text-stone-400 rounded-lg transition"
                    title="Delete Bestseller"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Bestseller Modal */}
      {editingIndex !== null && editProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-lg font-serif text-white">
                Edit Bestseller #{String(editingIndex + 1).padStart(2, "0")}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingIndex(null);
                  setEditProduct(null);
                }}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editProduct.title}
                  onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">Category Slug</label>
                  <select
                    value={editProduct.category}
                    onChange={(e) => {
                      const sel = categories.find((c) => c.Slug === e.target.value);
                      setEditProduct({
                        ...editProduct,
                        category: e.target.value,
                        categoryName: sel?.Name || editProduct.categoryName,
                      });
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.Id} value={c.Slug}>
                        {c.Name} ({c.Slug})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={editProduct.badge || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, badge: e.target.value })}
                    placeholder="e.g. Newborn Keepsake Favorite"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editProduct.tagline}
                  onChange={(e) => setEditProduct({ ...editProduct, tagline: e.target.value })}
                  placeholder="e.g. Baby's Tiny Footprint Sealed in Dried Blooms"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white leading-relaxed"
                />
              </div>

              {/* Photo URL + Direct Upload */}
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Product Photo (Cloudinary or URL) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editProduct.imageUrl}
                    onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
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

                {editProduct.imageUrl && (
                  <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border border-stone-800 bg-stone-950">
                    <Image
                      src={getSafeImageUrl(editProduct.imageUrl)}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Featured Occasion Tag
                </label>
                <input
                  type="text"
                  value={editProduct.featuredOccasion || ""}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, featuredOccasion: e.target.value })
                  }
                  placeholder="e.g. Baby Arrival, 1st Birthday & Parenthood Milestones"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingIndex(null);
                    setEditProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-5 py-2 rounded-xl text-xs transition"
                >
                  Update Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

