"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SITE_CONTENT, ProductCategoryItem, ReelItem, CustomerReview } from "@/content/site";
import { CATALOG_WORKS, CatalogWorkItem } from "@/content/catalogWorks";

interface AtelierContentContextType {
  categories: ProductCategoryItem[];
  catalogWorks: Record<string, CatalogWorkItem[]>;
  reels: ReelItem[];
  reviews: CustomerReview[];
  settings: Record<string, string>;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
}

const AtelierContentContext = createContext<AtelierContentContextType>({
  categories: SITE_CONTENT.productCategories,
  catalogWorks: CATALOG_WORKS,
  reels: SITE_CONTENT.reels,
  reviews: SITE_CONTENT.customerReviewsSection.reviews,
  settings: {},
  isLoading: false,
  refreshContent: async () => {},
});

export function AtelierContentProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<ProductCategoryItem[]>(SITE_CONTENT.productCategories);
  const [catalogWorks, setCatalogWorks] = useState<Record<string, CatalogWorkItem[]>>(CATALOG_WORKS);
  const [reels, setReels] = useState<ReelItem[]>(SITE_CONTENT.reels);
  const [reviews, setReviews] = useState<CustomerReview[]>(SITE_CONTENT.customerReviewsSection.reviews);
  const [settings, setSettings] = useState<Record<string, string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("the_petal_muse_cached_settings");
        if (cached) return JSON.parse(cached);
      } catch {}
    }
    return {
      about_portraitImage: "https://res.cloudinary.com/dswr70tfw/image/upload/v1794846243/the-petal-muse/npxf7zicjhxearykgyal.png",
    };
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDynamicContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/content?fresh=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      if (json.success && json.data) {
        if (Array.isArray(json.data.categories) && json.data.categories.length > 0) {
          setCategories(json.data.categories);
        }
        if (json.data.catalogWorks && typeof json.data.catalogWorks === "object") {
          setCatalogWorks(json.data.catalogWorks);
        }
        if (Array.isArray(json.data.reels)) {
          setReels(json.data.reels);
        }
        if (Array.isArray(json.data.reviews)) {
          setReviews(json.data.reviews);
        }
        if (json.data.settings) {
          setSettings(json.data.settings);
          try {
            localStorage.setItem("the_petal_muse_cached_settings", JSON.stringify(json.data.settings));
          } catch {}
        }
      }
    } catch (err) {
      console.warn("Using offline atelier content cache:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Immediate hydration from local storage cache to eliminate any image flash
    try {
      const cached = localStorage.getItem("the_petal_muse_cached_settings");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === "object") {
          setSettings((prev) => ({ ...parsed, ...prev }));
        }
      }
    } catch {}

    fetchDynamicContent();

    // Listen to broadcast/events when changes happen in admin panel
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "the_petal_muse_content_updated") {
        fetchDynamicContent();
      }
    };

    const handleCustomRefresh = () => {
      fetchDynamicContent();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("the_petal_muse_refresh", handleCustomRefresh);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("the_petal_muse_refresh", handleCustomRefresh);
    };
  }, [fetchDynamicContent]);

  return (
    <AtelierContentContext.Provider
      value={{
        categories,
        catalogWorks,
        reels,
        reviews,
        settings,
        isLoading,
        refreshContent: fetchDynamicContent,
      }}
    >
      {children}
    </AtelierContentContext.Provider>
  );
}

export function useAtelierContent() {
  return useContext(AtelierContentContext);
}

