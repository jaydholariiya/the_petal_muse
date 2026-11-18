"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  LayoutGrid,
  Film,
  Star,
  Settings,
  UploadCloud,
  Layers,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Database,
  Search,
  RefreshCw,
  LogOut,
  KeyRound,
  Eye,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Video,
  Image as ImageIcon,
  Type,
  User,
  Phone,
  Palette,
  Award,
  Gift,
  Compass,
  Scissors
} from "lucide-react";
import {
  SITE_CONTENT,
  BestsellerProduct,
  ComboCollectionItem,
  OccasionItem,
  CraftsmanshipStory,
} from "@/content/site";
import BestsellersEditor from "@/components/admin/BestsellersEditor";
import CombosEditor from "@/components/admin/CombosEditor";
import OccasionsEditor from "@/components/admin/OccasionsEditor";
import CraftsmanshipEditor from "@/components/admin/CraftsmanshipEditor";

interface Category {
  Id: string;
  Slug: string;
  Name: string;
  ShortTitle?: string;
  Subtitle?: string;
  Description?: string;
  ImageUrl?: string;
  Badge?: string;
  DisplayOrder?: number;
  IsActive?: boolean;
}

interface CatalogWork {
  Id: string;
  CategoryId: string;
  Title: string;
  Slug: string;
  Badge?: string;
  ShortDescription?: string;
  FullStory?: string;
  Dimensions?: string;
  LeadTime?: string;
  PriceDisplay?: string;
  CoverImageUrl: string;
  Images?: string[];
  VideoUrl?: string;
  IsFeatured?: boolean;
  WorkOrder?: number;
  IsActive?: boolean;
}

interface InstagramReel {
  Id: string;
  Title: string;
  Caption?: string;
  VideoUrl?: string;
  PosterUrl: string;
  Duration?: string;
  InstagramUrl?: string;
  DisplayOrder?: number;
  IsActive?: boolean;
}

interface CustomerReview {
  Id: string;
  Author: string;
  City?: string;
  Occasion?: string;
  Rating: number;
  ReviewText: string;
  PhotoUrl?: string;
  IsVerified?: boolean;
  DisplayOrder?: number;
}

interface DatabaseStats {
  CategoriesCount: number;
  WorksCount: number;
  MediaCount: number;
  ReelsCount: number;
  ReviewsCount: number;
  SettingsCount: number;
}

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    | "sections"
    | "bestsellers"
    | "combos"
    | "occasions"
    | "craftsmanship"
    | "works"
    | "categories"
    | "reels"
    | "reviews"
    | "uploader"
    | "dashboard"
    | "settings"
  >("sections");

  // Data State
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [works, setWorks] = useState<CatalogWork[]>([]);
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Dedicated Section Collections State (Bestsellers, Combos, Occasions, Craftsmanship)
  const [bestsellersList, setBestsellersList] = useState<BestsellerProduct[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("the_petal_muse_cached_settings");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.bestsellers_data) {
            const b = JSON.parse(parsed.bestsellers_data);
            if (Array.isArray(b?.products)) return b.products;
            if (Array.isArray(b)) return b;
          }
        }
      } catch {}
    }
    return SITE_CONTENT.bestsellersSection.products;
  });
  const [combosList, setCombosList] = useState<ComboCollectionItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("the_petal_muse_cached_settings");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.combos_data) {
            const c = JSON.parse(parsed.combos_data);
            if (Array.isArray(c?.combos)) return c.combos;
            if (Array.isArray(c)) return c;
          }
        }
      } catch {}
    }
    return SITE_CONTENT.comboCollections.combos;
  });
  const [occasionsList, setOccasionsList] = useState<OccasionItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("the_petal_muse_cached_settings");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.occasions_data) {
            const o = JSON.parse(parsed.occasions_data);
            if (Array.isArray(o?.occasions)) return o.occasions;
            if (Array.isArray(o)) return o;
          }
        }
      } catch {}
    }
    return SITE_CONTENT.occasionCollections.occasions;
  });
  const [handmadeData, setHandmadeData] = useState<CraftsmanshipStory["handmadeWithLove"]>(
    SITE_CONTENT.craftsmanship.handmadeWithLove
  );
  const [stepsData, setStepsData] = useState<CraftsmanshipStory["personalizedGifts"]>(
    SITE_CONTENT.craftsmanship.personalizedGifts
  );

  // Website Sections CMS State (Hero, About, Featured, Contact)
  const [sectionsData, setSectionsData] = useState({
    // Hero Section
    hero_headlineLine1: "Bespoke Gifts &",
    hero_headlineLine2: "Blooms, reimagined.",
    hero_description: "An artisan atelier in Gujarat handcrafting couture keepsake magazines, personalized floral frames, artisan chocolate bouquets, luxury hampers, and botanical creations. Thoughtfully sculpted for life's most cherished celebrations.",
    hero_backgroundImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=2400&q=90",
    hero_badgeSuite: "Atelier Keepsake Suite 01",
    hero_badgeSubtitle: "Curated Hampers, Frames & Blooms",
    hero_ctaPrimary: "EXPLORE 15+ CREATIONS",
    hero_ctaSecondary: "ORDER BESPOKE GIFT",
    hero_badgeText: "Bespoke Floral Atelier • Gujarat",

    // About / Founder Section
    about_quoteLarge: "Every celebration deserves a handcrafted memory.",
    about_philosophyHeadline: "Turning fleeting emotions into enduring, physical keepsakes.",
    about_portraitImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    about_detailImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    about_storyPara1: "Founded by Jensi Dholariya in Gujarat, THE PETAL MUSE was conceived as an intersection of botanical art and bespoke handcrafted gifting.",
    about_storyPara2: "We believe gifting should be unforgettable. From custom love story magazines and pressed flower frames to handcrafted chocolate bouquets, personalized phone covers, and sensory hamper boxes, each creation is hand-sculpted petal by petal with mindful love.",
    about_storyPara3: "From intimate couple milestones to grand family celebrations, our atelier curates moments of quiet wonder, personalized sentiment, and enduring elegance.",

    // Featured Masterpiece Moment
    featured_title: "The Botanical Conservatory Suite",
    featured_subtitle: "A full-scale immersive floral atmosphere crafted for celebration.",
    featured_description: "An ethereal marriage of pressed heirloom florals, raw silk velvet ribbons, and ambient botanical cloches.",
    featured_imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=90",

    // Contact & Social Media
    enable_whatsapp: "false",
    brand_whatsapp: "ADD_PHONE_HERE",
    contact_email: "ADD_EMAIL_HERE",
    contact_location: "Gujarat, India | Handcrafted & Delivered Across India & Worldwide",
    brand_instagram: "https://www.instagram.com/the.petalmusee/",
    brand_instagram_handle: "@the.petalmusee",
  });

  // Cloudinary Settings State
  const [cloudName, setCloudName] = useState<string>("");
  const [isCloudinaryConnected, setIsCloudinaryConnected] = useState<boolean>(false);
  const [isTestingCloudinary, setIsTestingCloudinary] = useState<boolean>(false);
  const [isSyncingCloudinary, setIsSyncingCloudinary] = useState<boolean>(false);

  // Modals & Forms
  const [workModalOpen, setWorkModalOpen] = useState<boolean>(false);
  const [editingWork, setEditingWork] = useState<Partial<CatalogWork> | null>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  const [reelModalOpen, setReelModalOpen] = useState<boolean>(false);
  const [editingReel, setEditingReel] = useState<Partial<InstagramReel> | null>(null);

  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<Partial<CustomerReview> | null>(null);

  // Standalone Uploader State
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check existing login on mount
  useEffect(() => {
    const saved = localStorage.getItem("the_petal_muse_admin_token");
    if (saved === "atelier_verified_1924") {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError("");
    setIsAuthLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("the_petal_muse_admin_token", "atelier_verified_1924");
        fetchAllData();
      } else {
        setAuthError(data.message || "Invalid passcode.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Connection error");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("the_petal_muse_admin_token");
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [statusRes, catsRes, worksRes, reelsRes, reviewsRes, contentRes, cloudRes] = await Promise.all([
        fetch("/api/admin/status").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/categories").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/works").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/reels").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/reviews").then((r) => r.json()).catch(() => ({})),
        fetch("/api/content?fresh=1", { cache: "no-store" }).then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/cloudinary/test").then((r) => r.json()).catch(() => ({})),
      ]);

      if (cloudRes?.success && cloudRes.data?.cloudName) {
        setCloudName(cloudRes.data.cloudName);
        setIsCloudinaryConnected(Boolean(cloudRes.data.isConnected));
      }

      if (statusRes.success && statusRes.data?.database?.counts) {
        setStats(statusRes.data.database.counts);
      }
      if (catsRes.success) setCategories(catsRes.data || []);
      if (worksRes.success) setWorks(worksRes.data || []);
      if (reelsRes.success) setReels(reelsRes.data || []);
      if (reviewsRes.success) setReviews(reviewsRes.data || []);

      if (contentRes.success && contentRes.data?.settings) {
        const s = contentRes.data.settings;
        setSectionsData((prev) => ({ ...prev, ...s }));

        if (s.bestsellers_data) {
          try {
            const parsed = JSON.parse(s.bestsellers_data);
            if (parsed?.products && Array.isArray(parsed.products)) setBestsellersList(parsed.products);
            else if (Array.isArray(parsed)) setBestsellersList(parsed);
          } catch {}
        }
        if (s.combos_data) {
          try {
            const parsed = JSON.parse(s.combos_data);
            if (parsed?.combos && Array.isArray(parsed.combos)) setCombosList(parsed.combos);
            else if (Array.isArray(parsed)) setCombosList(parsed);
          } catch {}
        }
        if (s.occasions_data) {
          try {
            const parsed = JSON.parse(s.occasions_data);
            if (parsed?.occasions && Array.isArray(parsed.occasions)) setOccasionsList(parsed.occasions);
            else if (Array.isArray(parsed)) setOccasionsList(parsed);
          } catch {}
        }
        if (s.craft_handmade_data) {
          try {
            const parsed = JSON.parse(s.craft_handmade_data);
            setHandmadeData((prev) => ({ ...prev, ...parsed }));
          } catch {}
        }
        if (s.craft_steps_data) {
          try {
            const parsed = JSON.parse(s.craft_steps_data);
            setStepsData((prev) => ({ ...prev, ...parsed }));
          } catch {}
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      showMessage("Error fetching data from SQL Server", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setActionMessage({ text, type });
    if (type === "success" && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("the_petal_muse_refresh"));
      localStorage.setItem("the_petal_muse_content_updated", Date.now().toString());
    }
    setTimeout(() => setActionMessage(null), 4000);
  };

  // ---------------- Cloudinary Direct Uploader ----------------
  const handleFileUpload = async (
    file: File,
    targetField?: "work" | "category" | "reel_video" | "reel_poster" | "review" | "hero_image" | "about_portrait" | "about_detail" | "featured_image" | "standalone"
  ) => {
    setIsUploading(true);
    try {
      const isVid = file.type.startsWith("video/");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("resourceType", isVid ? "video" : "image");
      formData.append("cloudName", cloudName);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      const url = json.data?.secureUrl || json.data?.url;

      if (targetField === "hero_image") {
        setSectionsData((prev) => ({ ...prev, hero_backgroundImage: url }));
      } else if (targetField === "about_portrait") {
        setSectionsData((prev) => ({ ...prev, about_portraitImage: url }));
      } else if (targetField === "about_detail") {
        setSectionsData((prev) => ({ ...prev, about_detailImage: url }));
      } else if (targetField === "featured_image") {
        setSectionsData((prev) => ({ ...prev, featured_imageUrl: url }));
      } else if (targetField === "work" && editingWork) {
        setEditingWork((prev) => ({ ...prev, CoverImageUrl: url }));
      } else if (targetField === "category" && editingCategory) {
        setEditingCategory((prev) => ({ ...prev, ImageUrl: url }));
      } else if (targetField === "reel_poster" && editingReel) {
        setEditingReel((prev) => ({ ...prev, PosterUrl: url }));
      } else if (targetField === "reel_video" && editingReel) {
        setEditingReel((prev) => ({ ...prev, VideoUrl: url }));
      } else if (targetField === "review" && editingReview) {
        setEditingReview((prev) => ({ ...prev, PhotoUrl: url }));
      } else {
        setUploadedUrl(url);
      }

      if (json.data?.source === "cloudinary") {
        showMessage("Uploaded successfully to Cloudinary cloud!", "success");
      } else {
        showMessage(json.warning || "Saved locally. Enter valid Cloud Name in settings for Cloudinary cloud.", "error");
      }
    } catch (err: any) {
      showMessage(`Upload failed: ${err.message}`, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMediaFile = async (file: File): Promise<string | null> => {
    try {
      const isVid = file.type.startsWith("video/");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("resourceType", isVid ? "video" : "image");
      if (cloudName) formData.append("cloudName", cloudName);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      const url = json.data?.secureUrl || json.data?.url;
      if (json.data?.source === "cloudinary") {
        showMessage("Uploaded successfully to Cloudinary cloud!", "success");
      } else {
        showMessage(json.warning || "Saved locally. Enter valid Cloud Name in settings for Cloudinary cloud.", "error");
      }
      return url;
    } catch (err: any) {
      showMessage(`Upload failed: ${err.message}`, "error");
      return null;
    }
  };

  // ---------------- Cloudinary Test & Sync Handlers ----------------
  const handleTestCloudinary = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!cloudName.trim()) {
      showMessage("Please enter your Cloud Name first.", "error");
      return;
    }
    setIsTestingCloudinary(true);
    try {
      const res = await fetch("/api/admin/cloudinary/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cloudName: cloudName.trim() }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setIsCloudinaryConnected(true);
      showMessage(json.message, "success");
    } catch (err: any) {
      setIsCloudinaryConnected(false);
      showMessage(err.message, "error");
    } finally {
      setIsTestingCloudinary(false);
    }
  };

  const handleSyncCloudinary = async () => {
    setIsSyncingCloudinary(true);
    try {
      const res = await fetch("/api/admin/cloudinary/sync", { method: "POST" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      showMessage(json.message, "success");
      fetchAllData();
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setIsSyncingCloudinary(false);
    }
  };

  // ---------------- Bestsellers Save Handler ----------------
  const handleSaveBestsellers = async (updatedProducts: BestsellerProduct[]) => {
    try {
      setBestsellersList(updatedProducts);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settingKey: "bestsellers_data",
          settingValue: JSON.stringify({ products: updatedProducts }),
          section: "Bestsellers",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      // Instant synchronization across tabs and client context
      try {
        const cached = localStorage.getItem("the_petal_muse_cached_settings");
        const parsed = cached ? JSON.parse(cached) : {};
        parsed["bestsellers_data"] = JSON.stringify({ products: updatedProducts });
        localStorage.setItem("the_petal_muse_cached_settings", JSON.stringify(parsed));
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}

      showMessage("Atelier Bestsellers updated successfully in database!", "success");
    } catch (err: any) {
      showMessage(`Failed to save bestsellers: ${err.message}`, "error");
    }
  };

  // ---------------- Combos Save Handler ----------------
  const handleSaveCombos = async (updatedCombos: ComboCollectionItem[]) => {
    try {
      setCombosList(updatedCombos);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settingKey: "combos_data",
          settingValue: JSON.stringify({ combos: updatedCombos }),
          section: "Combos",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      try {
        const cached = localStorage.getItem("the_petal_muse_cached_settings");
        const parsed = cached ? JSON.parse(cached) : {};
        parsed["combos_data"] = JSON.stringify({ combos: updatedCombos });
        localStorage.setItem("the_petal_muse_cached_settings", JSON.stringify(parsed));
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}

      showMessage("Combo gift suites updated successfully in database!", "success");
    } catch (err: any) {
      showMessage(`Failed to save combos: ${err.message}`, "error");
    }
  };

  // ---------------- Occasions Save Handler ----------------
  const handleSaveOccasions = async (updatedOccasions: OccasionItem[]) => {
    try {
      setOccasionsList(updatedOccasions);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settingKey: "occasions_data",
          settingValue: JSON.stringify({ occasions: updatedOccasions }),
          section: "Occasions",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      try {
        const cached = localStorage.getItem("the_petal_muse_cached_settings");
        const parsed = cached ? JSON.parse(cached) : {};
        parsed["occasions_data"] = JSON.stringify({ occasions: updatedOccasions });
        localStorage.setItem("the_petal_muse_cached_settings", JSON.stringify(parsed));
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}

      showMessage("Occasion chapters updated successfully in database!", "success");
    } catch (err: any) {
      showMessage(`Failed to save occasions: ${err.message}`, "error");
    }
  };

  // ---------------- Craftsmanship Save Handler ----------------
  const handleSaveCraftsmanship = async (
    updatedHandmade: CraftsmanshipStory["handmadeWithLove"],
    updatedSteps: CraftsmanshipStory["personalizedGifts"]
  ) => {
    try {
      setHandmadeData(updatedHandmade);
      setStepsData(updatedSteps);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            { key: "craft_handmade_data", value: JSON.stringify(updatedHandmade), section: "Craftsmanship" },
            { key: "craft_steps_data", value: JSON.stringify(updatedSteps), section: "Craftsmanship" },
          ],
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      showMessage("Craftsmanship Story and 4 Steps saved successfully to SQL Server!", "success");
    } catch (err: any) {
      showMessage(`Failed to save craftsmanship: ${err.message}`, "error");
    }
  };

  // ---------------- Save Website Sections CMS ----------------
  const handleSaveSections = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: sectionsData, section: "HomeContent" }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      // Sync to browser localStorage and broadcast so homepage updates instantly without delay
      try {
        localStorage.setItem("the_petal_muse_cached_settings", JSON.stringify(sectionsData));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
      } catch {}

      showMessage("Website content and photos saved successfully to SQL Server!", "success");
      fetchAllData();
    } catch (err: any) {
      showMessage(`Save failed: ${err.message}`, "error");
    }
  };

  // ---------------- Works Save/Delete ----------------
  const handleSaveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWork?.Title || !editingWork?.CategoryId || !editingWork?.CoverImageUrl) {
      showMessage("Title, Category, and Cover Image are required.", "error");
      return;
    }

    try {
      const res = await fetch("/api/admin/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingWork.Id,
          categoryId: editingWork.CategoryId,
          title: editingWork.Title,
          slug: editingWork.Slug,
          badge: editingWork.Badge,
          shortDescription: editingWork.ShortDescription,
          fullStory: editingWork.FullStory,
          dimensions: editingWork.Dimensions,
          leadTime: editingWork.LeadTime,
          priceDisplay: editingWork.PriceDisplay,
          coverImageUrl: editingWork.CoverImageUrl,
          images: editingWork.Images || [editingWork.CoverImageUrl],
          videoUrl: editingWork.VideoUrl || "",
          isFeatured: editingWork.IsFeatured ?? false,
          workOrder: editingWork.WorkOrder ?? 1,
          isActive: editingWork.IsActive !== false,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      showMessage("Work saved successfully in SQL Server database!", "success");
      setWorkModalOpen(false);
      setEditingWork(null);
      fetchAllData();
    } catch (err: any) {
      showMessage(`Save failed: ${err.message}`, "error");
    }
  };

  const handleDeleteWork = async (id: string) => {
    if (!confirm("Are you sure you want to delete this creation from the catalog?")) return;
    try {
      const res = await fetch(`/api/admin/works/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      showMessage("Work deleted successfully from database.", "success");
      try {
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}
      fetchAllData();
    } catch (err: any) {
      showMessage(`Delete failed: ${err.message}`, "error");
    }
  };

  // ---------------- Categories Save/Delete ----------------
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.Name || !editingCategory?.Slug) {
      showMessage("Category Name and Slug are required.", "error");
      return;
    }

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCategory.Id,
          name: editingCategory.Name,
          slug: editingCategory.Slug,
          shortTitle: editingCategory.ShortTitle,
          subtitle: editingCategory.Subtitle,
          description: editingCategory.Description,
          imageUrl: editingCategory.ImageUrl,
          badge: editingCategory.Badge,
          displayOrder: editingCategory.DisplayOrder ?? 1,
          isActive: editingCategory.IsActive !== false,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      showMessage("Category saved successfully in database!", "success");
      setCategoryModalOpen(false);
      setEditingCategory(null);
      try {
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}
      fetchAllData();
    } catch (err: any) {
      showMessage(`Save failed: ${err.message}`, "error");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      showMessage("Category deleted successfully.", "success");
      try {
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}
      fetchAllData();
    } catch (err: any) {
      showMessage(`Delete failed: ${err.message}`, "error");
    }
  };

  // ---------------- Reels Save/Delete ----------------
  const handleSaveReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel?.Title || !editingReel?.PosterUrl) {
      showMessage("Title and Poster Cover URL are required.", "error");
      return;
    }

    try {
      const res = await fetch("/api/admin/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingReel.Id,
          title: editingReel.Title,
          caption: editingReel.Caption,
          videoUrl: editingReel.VideoUrl,
          posterUrl: editingReel.PosterUrl,
          duration: editingReel.Duration,
          instagramUrl: editingReel.InstagramUrl,
          displayOrder: editingReel.DisplayOrder ?? 1,
          isActive: editingReel.IsActive !== false,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      showMessage("Reel saved successfully!", "success");
      setReelModalOpen(false);
      setEditingReel(null);
      try {
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}
      fetchAllData();
    } catch (err: any) {
      showMessage(`Save failed: ${err.message}`, "error");
    }
  };

  const handleDeleteReel = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reel?")) return;
    try {
      const res = await fetch(`/api/admin/reels/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      showMessage("Reel deleted successfully.", "success");
      try {
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}
      fetchAllData();
    } catch (err: any) {
      showMessage(`Delete failed: ${err.message}`, "error");
    }
  };

  // ---------------- Reviews Save/Delete ----------------
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview?.Author || !editingReview?.ReviewText) {
      showMessage("Author name and Review text are required.", "error");
      return;
    }

    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingReview.Id,
          author: editingReview.Author,
          city: editingReview.City,
          occasion: editingReview.Occasion,
          rating: editingReview.Rating ?? 5,
          reviewText: editingReview.ReviewText,
          photoUrl: editingReview.PhotoUrl,
          isVerified: editingReview.IsVerified !== false,
          displayOrder: editingReview.DisplayOrder ?? 1,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      showMessage("Customer review saved successfully!", "success");
      setReviewModalOpen(false);
      setEditingReview(null);
      try {
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}
      fetchAllData();
    } catch (err: any) {
      showMessage(`Save failed: ${err.message}`, "error");
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      showMessage("Customer review deleted successfully.", "success");
      try {
        localStorage.setItem("the_petal_muse_content_updated", String(Date.now()));
        window.dispatchEvent(new Event("the_petal_muse_refresh"));
      } catch {}
      fetchAllData();
    } catch (err: any) {
      showMessage(`Delete failed: ${err.message}`, "error");
    }
  };

  // Filtered Works
  const filteredWorks = works.filter((w) => {
    const matchesCat = selectedCategoryFilter === "all" || w.CategoryId === selectedCategoryFilter;
    const matchesSearch =
      !searchQuery ||
      w.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.Badge?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // ---------------- PASSCODE LOGIN SCREEN ----------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0B0E] text-[#F3E5AB] flex items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-stone-900/80 backdrop-blur-2xl border border-amber-500/20 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-400/40 flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-amber-300" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-medium">
              Curator Atelier Console
            </span>
            <h1 className="text-3xl font-serif text-white mt-1">THE PETAL MUSE</h1>
            <p className="text-xs text-stone-400 mt-2">
              Enter your Atelier security passcode to manage database works, Cloudinary media, and website sections.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                Atelier Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. 1924)"
                className="w-full bg-stone-950/60 border border-amber-500/30 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 transition"
                autoFocus
              />
            </div>

            {authError && (
              <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 p-2.5 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
            >
              {isAuthLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Unlock Atelier Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
              <span>Default Passcode: <code className="text-amber-400">1924</code></span>
              <button
                type="button"
                onClick={() => {
                  setPasscode("1924");
                }}
                className="text-amber-400/80 hover:text-amber-300 underline"
              >
                Auto-fill
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <span>← Back to Customer Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- MAIN ADMIN INTERFACE ----------------
  return (
    <div className="min-h-screen bg-[#0D0B0E] text-stone-200 flex flex-col">
      {/* Action Toast Notification */}
      {actionMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border transition-all ${
            actionMessage.type === "success"
              ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/40"
              : "bg-rose-950/90 text-rose-200 border-rose-500/40"
          }`}
        >
          {actionMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
          <span className="text-sm font-medium">{actionMessage.text}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-stone-950/80 backdrop-blur-xl border-b border-amber-500/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 p-[1px]">
            <div className="w-full h-full bg-stone-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg text-white font-medium tracking-wide">
                THE PETAL MUSE
              </h1>
              <span className="text-[10px] uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Connected: SSMS Database <span className="text-amber-300 font-mono">thepetalmuse</span> (DESKTOP-6Q3P8HQ)
            </p>
          </div>
        </div>

        {/* Server & Cloudinary Status Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Database className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-300">SSMS Active: 46 Works / 15 Cats</span>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 text-xs border px-3 py-1.5 rounded-lg transition ${
              isCloudinaryConnected
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                : "bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/40"
            }`}
            title="Click to configure Cloudinary"
          >
            <span className={`w-2 h-2 rounded-full ${isCloudinaryConnected ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{isCloudinaryConnected ? `Cloudinary: ${cloudName}` : "Cloudinary: Enter Cloud Name"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-lg transition"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={fetchAllData}
            title="Refresh from Database"
            className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded-lg transition"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleLogout}
            title="Lock Console"
            className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 px-3 py-1.5 rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-stone-950/50 border-r border-amber-500/10 p-4 space-y-2 shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("sections")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "sections"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Hero & Website Content</span>
            </button>

            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "bestsellers"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Atelier Bestsellers</span>
              </div>
              <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full font-mono text-stone-300">
                {bestsellersList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("combos")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "combos"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-rose-400" />
                <span>Combo Collections</span>
              </div>
              <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full font-mono text-stone-300">
                {combosList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("occasions")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "occasions"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Occasion Chapters</span>
              </div>
              <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full font-mono text-stone-300">
                {occasionsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("craftsmanship")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "craftsmanship"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <Scissors className="w-4 h-4 text-amber-300" />
              <span>Craftsmanship & Story</span>
            </button>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "dashboard"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Overview & Stats</span>
            </button>

            <button
              onClick={() => setActiveTab("works")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "works"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                <span>Creations & Works</span>
              </div>
              <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full font-mono text-stone-300">
                {works.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "categories"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Categories</span>
              </div>
              <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full font-mono text-stone-300">
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("reels")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "reels"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Film className="w-4 h-4" />
                <span>Instagram Reels</span>
              </div>
              <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full font-mono text-stone-300">
                {reels.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "reviews"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4" />
                <span>Customer Reviews</span>
              </div>
              <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-full font-mono text-stone-300">
                {reviews.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("uploader")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "uploader"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Cloudinary Media Hub</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab === "settings"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings & SSMS DB</span>
            </button>
          </nav>

          {/* Quick Info Box */}
          <div className="pt-6 border-t border-stone-800/80">
            <div className="bg-gradient-to-br from-amber-950/30 to-stone-900 border border-amber-500/20 rounded-xl p-3.5 text-xs text-stone-300 space-y-2">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Full Website CMS</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Change Hero text, photos, founder story, contact details, and works anytime. Everything saves to SQL Server &amp; Cloudinary.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Active Tab View */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl overflow-y-auto">
          {/* TAB: HERO & WEBSITE CONTENT (CMS) */}
          {activeTab === "sections" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-white">Hero & Website Content CMS</h2>
                  <p className="text-sm text-stone-400 mt-1">
                    Edit the Hero banner text, hero arch photo (Cloudinary), founder story, and contact details live.
                  </p>
                </div>

                <button
                  onClick={handleSaveSections}
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition shadow-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Save All Website Content</span>
                </button>
              </div>

              <form onSubmit={handleSaveSections} className="space-y-8">
                {/* 1. HERO SECTION */}
                <div className="bg-stone-900/60 border border-amber-500/30 rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif text-white font-medium">Hero Section (Main Banner)</h3>
                        <p className="text-xs text-stone-400">Controls the first impression on the homepage.</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Live on Homepage
                    </span>
                  </div>

                  {/* Hero Headline & Subhead */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Headline Line 1 (Italic Script) *
                      </label>
                      <input
                        type="text"
                        value={sectionsData.hero_headlineLine1}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, hero_headlineLine1: e.target.value }))
                        }
                        placeholder="e.g. Bespoke Gifts &"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Headline Line 2 (Bold Serif) *
                      </label>
                      <input
                        type="text"
                        value={sectionsData.hero_headlineLine2}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, hero_headlineLine2: e.target.value }))
                        }
                        placeholder="e.g. Blooms, reimagined."
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-serif"
                      />
                    </div>
                  </div>



                  {/* Hero Description */}
                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">
                      Hero Subtitle / Description *
                    </label>
                    <textarea
                      rows={3}
                      value={sectionsData.hero_description}
                      onChange={(e) =>
                        setSectionsData((prev) => ({ ...prev, hero_description: e.target.value }))
                      }
                      placeholder="An artisan atelier in Gujarat handcrafting couture keepsake magazines..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400 leading-relaxed"
                    />
                  </div>

                  {/* Hero Arch Photo + Cloudinary Upload */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                    <div className="md:col-span-8 space-y-3">
                      <label className="block text-xs uppercase text-stone-400">
                        Hero Arch Card Photo (Upload to Cloudinary or enter URL) *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={sectionsData.hero_backgroundImage}
                          onChange={(e) =>
                            setSectionsData((prev) => ({ ...prev, hero_backgroundImage: e.target.value }))
                          }
                          placeholder="https://images.unsplash.com/... or Cloudinary URL"
                          className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                        />
                        <label className="cursor-pointer bg-amber-600 hover:bg-amber-500 text-stone-950 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0">
                          <UploadCloud className="w-4 h-4" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileUpload(f, "hero_image");
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Badge Tag</label>
                          <input
                            type="text"
                            value={sectionsData.hero_badgeSuite}
                            onChange={(e) =>
                              setSectionsData((prev) => ({ ...prev, hero_badgeSuite: e.target.value }))
                            }
                            placeholder="Atelier Keepsake Suite 01"
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-stone-400 mb-1">Badge Subtitle</label>
                          <input
                            type="text"
                            value={sectionsData.hero_badgeSubtitle}
                            onChange={(e) =>
                              setSectionsData((prev) => ({ ...prev, hero_badgeSubtitle: e.target.value }))
                            }
                            placeholder="Curated Hampers, Frames & Blooms"
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Live Thumbnail Preview */}
                    <div className="md:col-span-4 flex justify-center">
                      <div className="relative w-40 h-52 rounded-t-[50px] overflow-hidden border border-amber-500/30 shadow-2xl bg-stone-950 group">
                        {sectionsData.hero_backgroundImage ? (
                          <Image
                            src={sectionsData.hero_backgroundImage}
                            alt="Hero Preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-600">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                          <span className="text-[10px] text-amber-300 font-serif italic line-clamp-1">
                            {sectionsData.hero_badgeSubtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>



                  {/* Buttons & CTAs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-800/80">
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Primary Button Text
                      </label>
                      <input
                        type="text"
                        value={sectionsData.hero_ctaPrimary}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, hero_ctaPrimary: e.target.value }))
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Secondary Button Text
                      </label>
                      <input
                        type="text"
                        value={sectionsData.hero_ctaSecondary}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, hero_ctaSecondary: e.target.value }))
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>


                </div>

                {/* 2. ABOUT & FOUNDER SECTION */}
                <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
                    <div className="w-9 h-9 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-300">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-white font-medium">About &amp; Founder Story (Jensi Dholariya)</h3>
                      <p className="text-xs text-stone-400">Curator philosophy, portrait photo, and atelier narrative.</p>
                    </div>
                  </div>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Oversized Editorial Quote
                      </label>
                      <input
                        type="text"
                        value={sectionsData.about_quoteLarge}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, about_quoteLarge: e.target.value }))
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Philosophy Tagline
                      </label>
                      <input
                        type="text"
                        value={sectionsData.about_philosophyHeadline}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, about_philosophyHeadline: e.target.value }))
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>



                  {/* Founder Portrait Photo */}
                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">
                      Founder Portrait Photo (Cloudinary)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={sectionsData.about_portraitImage}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, about_portraitImage: e.target.value }))
                        }
                        className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                      <label className="cursor-pointer bg-amber-600 hover:bg-amber-500 text-stone-950 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFileUpload(f, "about_portrait");
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Secondary Small Detail Photo (Red Gift Box Accent Card) */}
                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">
                      Secondary Detail Photo (Red Gift Box / Small Accent Photo on Founder Arch)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={sectionsData.about_detailImage || ""}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, about_detailImage: e.target.value }))
                        }
                        placeholder="https://... or upload photo"
                        className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                      <label className="cursor-pointer bg-amber-600 hover:bg-amber-500 text-stone-950 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFileUpload(f, "about_detail");
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>



                  {/* Story Paragraphs */}
                  <div className="space-y-3">
                    <label className="block text-xs uppercase text-stone-400">Atelier Story Paragraphs</label>
                    <textarea
                      rows={2}
                      value={sectionsData.about_storyPara1}
                      onChange={(e) =>
                        setSectionsData((prev) => ({ ...prev, about_storyPara1: e.target.value }))
                      }
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white"
                      placeholder="Story paragraph 1..."
                    />
                    <textarea
                      rows={2}
                      value={sectionsData.about_storyPara2}
                      onChange={(e) =>
                        setSectionsData((prev) => ({ ...prev, about_storyPara2: e.target.value }))
                      }
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white"
                      placeholder="Story paragraph 2..."
                    />
                  </div>
                </div>

                {/* 3. FEATURED MASTERPIECE BANNER */}
                <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-white font-medium">Midday Photographic Feature Banner</h3>
                      <p className="text-xs text-stone-400">Full-width photographic feature shown mid-page.</p>
                    </div>
                  </div>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">Feature Title</label>
                      <input
                        type="text"
                        value={sectionsData.featured_title}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, featured_title: e.target.value }))
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">Feature Subtitle</label>
                      <input
                        type="text"
                        value={sectionsData.featured_subtitle}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, featured_subtitle: e.target.value }))
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>



                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">
                      Full-Width Photographic Banner (Cloudinary)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={sectionsData.featured_imageUrl}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, featured_imageUrl: e.target.value }))
                        }
                        className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                      <label className="cursor-pointer bg-amber-600 hover:bg-amber-500 text-stone-950 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Banner</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFileUpload(f, "featured_image");
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>


                </div>

                {/* 4. CONTACT & CONCIERGE INFORMATION */}
                <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
                    <div className="w-9 h-9 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif text-white font-medium">Contact &amp; Concierge Details</h3>
                      <p className="text-xs text-stone-400">Controls WhatsApp, Email, Studio Location, and Instagram links.</p>
                    </div>
                  </div>



                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        WhatsApp Feature Visibility
                      </label>
                      <select
                        value={sectionsData.enable_whatsapp || "false"}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, enable_whatsapp: e.target.value }))
                        }
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-sans focus:border-amber-500"
                      >
                        <option value="false">Hidden (Instagram DM Mode)</option>
                        <option value="true">Visible (WhatsApp Active)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        WhatsApp Number (with country code)
                      </label>
                      <input
                        type="text"
                        value={sectionsData.brand_whatsapp}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, brand_whatsapp: e.target.value }))
                        }
                        placeholder="e.g. 919876543210"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Official Contact Email
                      </label>
                      <input
                        type="text"
                        value={sectionsData.contact_email}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, contact_email: e.target.value }))
                        }
                        placeholder="hello@thepetalmuse.com"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Studio Location / Address Display
                      </label>
                      <input
                        type="text"
                        value={sectionsData.contact_location}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, contact_location: e.target.value }))
                        }
                        placeholder="Gujarat, India | Handcrafted & Delivered Across India"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">
                        Instagram Profile Link
                      </label>
                      <input
                        type="text"
                        value={sectionsData.brand_instagram}
                        onChange={(e) =>
                          setSectionsData((prev) => ({ ...prev, brand_instagram: e.target.value }))
                        }
                        placeholder="https://www.instagram.com/the.petalmusee/"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono"
                      />
                    </div>
                  </div>


                </div>

                {/* Final Save Button */}
                <div className="sticky bottom-6 z-20 bg-stone-950/90 backdrop-blur-xl border border-amber-500/40 p-4 rounded-2xl flex items-center justify-between shadow-2xl">
                  <span className="text-xs text-stone-400">
                    Changes will immediately write to SQL Server (<span className="text-amber-300 font-mono">SiteSettings</span>) &amp; update the website.
                  </span>
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-8 py-3 rounded-xl text-sm transition shadow-lg flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save All Changes to Website</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: BESTSELLERS MANAGER */}
          {activeTab === "bestsellers" && (
            <BestsellersEditor
              products={bestsellersList}
              categories={categories.map((c) => ({ Id: c.Id, Name: c.Name, Slug: c.Slug }))}
              onSave={handleSaveBestsellers}
              onUploadImage={uploadMediaFile}
            />
          )}

          {/* TAB: COMBOS MANAGER */}
          {activeTab === "combos" && (
            <CombosEditor
              combos={combosList}
              onSave={handleSaveCombos}
              onUploadImage={uploadMediaFile}
            />
          )}

          {/* TAB: OCCASIONS MANAGER */}
          {activeTab === "occasions" && (
            <OccasionsEditor
              occasions={occasionsList}
              onSave={handleSaveOccasions}
              onUploadImage={uploadMediaFile}
            />
          )}

          {/* TAB: CRAFTSMANSHIP & STORY CMS */}
          {activeTab === "craftsmanship" && (
            <CraftsmanshipEditor
              handmade={handmadeData}
              steps={stepsData}
              onSave={handleSaveCraftsmanship}
              onUploadImage={uploadMediaFile}
            />
          )}

          {/* TAB: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif text-white">Atelier Dashboard</h2>
                <p className="text-sm text-stone-400 mt-1">
                  Live state of the database and media assets connected to THE PETAL MUSE.
                </p>
              </div>

              {/* KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-stone-900/60 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-stone-400 mb-3">
                    <span className="text-xs uppercase tracking-wider">Catalog Works</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-serif text-white font-bold">{works.length}</div>
                  <p className="text-xs text-stone-500 mt-1">46 seed works in SQL Server</p>
                </div>

                <div className="bg-stone-900/60 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-stone-400 mb-3">
                    <span className="text-xs uppercase tracking-wider">Categories</span>
                    <Layers className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-serif text-white font-bold">{categories.length}</div>
                  <p className="text-xs text-stone-500 mt-1">15 curated botanical suites</p>
                </div>

                <div className="bg-stone-900/60 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-stone-400 mb-3">
                    <span className="text-xs uppercase tracking-wider">Instagram Reels</span>
                    <Film className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-3xl font-serif text-white font-bold">{reels.length}</div>
                  <p className="text-xs text-stone-500 mt-1">Video reels with Cloudinary CDN</p>
                </div>

                <div className="bg-stone-900/60 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-stone-400 mb-3">
                    <span className="text-xs uppercase tracking-wider">Customer Reviews</span>
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-serif text-white font-bold">{reviews.length}</div>
                  <p className="text-xs text-stone-500 mt-1">5-star verified testimonials</p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6">
                <h3 className="text-sm uppercase tracking-wider text-amber-400/90 font-semibold mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("sections")}
                    className="flex items-center gap-3 p-4 bg-stone-900 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 rounded-xl transition text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Edit Hero &amp; Sections</div>
                      <div className="text-xs text-stone-400">Change homepage photos &amp; text</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setEditingWork({
                        Id: `work-${Date.now().toString(36)}`,
                        CategoryId: categories[0]?.Id || "cat-01",
                        WorkOrder: works.length + 1,
                        IsActive: true,
                      });
                      setWorkModalOpen(true);
                    }}
                    className="flex items-center gap-3 p-4 bg-stone-900 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 rounded-xl transition text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">New Creation</div>
                      <div className="text-xs text-stone-400">Add work to database</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setEditingReel({
                        Id: `reel-${Date.now().toString(36)}`,
                        DisplayOrder: reels.length + 1,
                        IsActive: true,
                      });
                      setReelModalOpen(true);
                    }}
                    className="flex items-center gap-3 p-4 bg-stone-900 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 rounded-xl transition text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-300 group-hover:scale-110 transition">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Upload Reel / Video</div>
                      <div className="text-xs text-stone-400">Post video to Cloudinary</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: WORKS & CREATIONS */}
          {activeTab === "works" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-white">Creations &amp; Catalog Works</h2>
                  <p className="text-sm text-stone-400 mt-1">
                    Manage the 46 works, upload photography to Cloudinary, update stories and pricing.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingWork({
                      Id: `work-${Date.now().toString(36)}`,
                      CategoryId: categories[0]?.Id || "cat-01",
                      WorkOrder: works.length + 1,
                      IsActive: true,
                    });
                    setWorkModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-4 py-2.5 rounded-xl transition shadow-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Creation</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search works by title or badge..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                >
                  <option value="all">All Categories ({works.length})</option>
                  {categories.map((c) => (
                    <option key={c.Id} value={c.Id}>
                      {c.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Works Table / Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWorks.map((work) => {
                  const cat = categories.find((c) => c.Id === work.CategoryId);
                  return (
                    <div
                      key={work.Id}
                      className="bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-4 backdrop-blur-sm transition flex flex-col justify-between group"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-stone-950 mb-3 border border-stone-800/80">
                          {work.CoverImageUrl ? (
                            <Image
                              src={work.CoverImageUrl}
                              alt={work.Title || "Creation"}
                              fill
                              className="object-cover group-hover:scale-105 transition duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-600">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}

                          {work.Badge && (
                            <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-bold tracking-wider bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                              {work.Badge}
                            </span>
                          )}

                          <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono bg-stone-950/80 text-stone-300 px-2 py-0.5 rounded">
                            {work.Id}
                          </span>
                        </div>

                        <div className="text-[11px] text-amber-400/90 font-medium uppercase tracking-wider mb-1">
                          {cat?.Name || work.CategoryId}
                        </div>
                        <h3 className="font-serif text-white font-medium text-base line-clamp-1">
                          {work.Title}
                        </h3>
                        <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                          {work.ShortDescription || "Bespoke handcrafted creation sculpted petal by petal."}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                        <span className="text-xs font-mono text-stone-400">
                          {work.PriceDisplay || "Couture Pricing"}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingWork(work);
                              setWorkModalOpen(true);
                            }}
                            className="p-2 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 rounded-lg transition"
                            title="Edit Creation"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteWork(work.Id)}
                            className="p-2 bg-stone-800 hover:bg-rose-600 hover:text-white text-stone-300 rounded-lg transition"
                            title="Delete Creation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredWorks.length === 0 && (
                <div className="text-center py-12 text-stone-500 text-sm">
                  No works found matching your filter criteria.
                </div>
              )}
            </div>
          )}

          {/* TAB: CATEGORIES */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-white">Categories Repertoire</h2>
                  <p className="text-sm text-stone-400 mt-1">
                    Manage the 15 categories, titles, taglines, and cover photography.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingCategory({
                      Id: `cat-${(categories.length + 1).toString().padStart(2, "0")}`,
                      DisplayOrder: categories.length + 1,
                      IsActive: true,
                    });
                    setCategoryModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-4 py-2.5 rounded-xl transition shadow-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.Id}
                    className="bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-5 backdrop-blur-sm transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full h-36 rounded-xl overflow-hidden bg-stone-950 mb-3 border border-stone-800/80">
                        {cat.ImageUrl ? (
                          <Image
                            src={cat.ImageUrl}
                            alt={cat.Name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-600">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                        <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-bold tracking-wider bg-stone-950/80 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                          #{cat.DisplayOrder ?? 1}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-amber-400 mb-0.5">
                        Slug: {cat.Slug}
                      </div>
                      <h3 className="font-serif text-white font-medium text-lg leading-tight">
                        {cat.Name}
                      </h3>
                      <p className="text-xs text-stone-400 line-clamp-2 mt-2">
                        {cat.Description || "Curated botanical suite."}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-xs text-stone-500 font-mono">
                        ID: {cat.Id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryModalOpen(true);
                          }}
                          className="p-2 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 rounded-lg transition"
                          title="Edit Category"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.Id)}
                          className="p-2 bg-stone-800 hover:bg-rose-600 hover:text-white text-stone-300 rounded-lg transition"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>


                ))}
              </div>
            </div>
          )}

          {/* TAB: REELS & VIDEOS */}
          {activeTab === "reels" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-white">Instagram Reels &amp; Videos</h2>
                  <p className="text-sm text-stone-400 mt-1">
                    Manage 9:16 vertical video reels, Cloudinary video uploads, and Instagram links.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingReel({
                      Id: `reel-${Date.now().toString(36)}`,
                      DisplayOrder: reels.length + 1,
                      IsActive: true,
                    });
                    setReelModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-4 py-2.5 rounded-xl transition shadow-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Reel</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {reels.map((reel) => (
                  <div
                    key={reel.Id}
                    className="bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-4 backdrop-blur-sm transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Reel 9:16 preview */}
                      <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-stone-950 mb-3 border border-stone-800/80">
                        {reel.PosterUrl ? (
                          <Image
                            src={reel.PosterUrl}
                            alt={reel.Title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-600">
                            <Film className="w-8 h-8" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                          <span className="text-xs font-semibold text-white line-clamp-1">
                            {reel.Title}
                          </span>
                          <span className="text-[10px] text-amber-300 font-mono">
                            {reel.Duration || "0:30"}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-400 line-clamp-2">
                        {reel.Caption || "Instagram reel"}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      {reel.InstagramUrl ? (
                        <a
                          href={reel.InstagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                        >
                          <span>Instagram</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-stone-500">No IG link</span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingReel(reel);
                            setReelModalOpen(true);
                          }}
                          className="p-2 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 rounded-lg transition"
                          title="Edit Reel"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReel(reel.Id)}
                          className="p-2 bg-stone-800 hover:bg-rose-600 hover:text-white text-stone-300 rounded-lg transition"
                          title="Delete Reel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>


                ))}
              </div>
            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-white">Customer Reviews &amp; Testimonials</h2>
                  <p className="text-sm text-stone-400 mt-1">
                    Manage 5-star verified customer feedback and quotes stored in SQL Server.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingReview({
                      Id: `rev-${Date.now().toString(36)}`,
                      Rating: 5,
                      IsVerified: true,
                      DisplayOrder: reviews.length + 1,
                    });
                    setReviewModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-4 py-2.5 rounded-xl transition shadow-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.Id}
                    className="bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-5 backdrop-blur-sm transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: rev.Rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        {rev.IsVerified && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-300 italic mb-4 line-clamp-4">
                        &ldquo;{rev.ReviewText}&rdquo;
                      </p>

                      <div className="flex items-center gap-3">
                        {rev.PhotoUrl ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/30 shrink-0">
                            <Image
                              src={rev.PhotoUrl}
                              alt={rev.Author}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-xs font-bold text-amber-300 shrink-0">
                            {rev.Author?.[0] || "U"}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-white">{rev.Author}</div>
                          <div className="text-xs text-stone-400">{rev.City || rev.Occasion || "Patron"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-xs text-stone-500 font-mono">
                        {rev.Id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingReview(rev);
                            setReviewModalOpen(true);
                          }}
                          className="p-2 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 rounded-lg transition"
                          title="Edit Review"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.Id)}
                          className="p-2 bg-stone-800 hover:bg-rose-600 hover:text-white text-stone-300 rounded-lg transition"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>


                ))}
              </div>
            </div>
          )}

          {/* TAB: CLOUDINARY MEDIA HUB */}
          {activeTab === "uploader" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white">Cloudinary Media Hub</h2>
                <p className="text-sm text-stone-400 mt-1">
                  Upload images and video reels directly to Cloudinary using your API Key (655244333868859).
                </p>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-500/30 hover:border-amber-400 rounded-3xl p-12 text-center bg-stone-900/40 hover:bg-stone-900/60 cursor-pointer transition group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(f, "standalone");
                  }}
                  className="hidden"
                  accept="image/*,video/*"
                />

                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition">
                  {isUploading ? (
                    <RefreshCw className="w-8 h-8 animate-spin" />
                  ) : (
                    <UploadCloud className="w-8 h-8" />
                  )}
                </div>

                <h3 className="text-base font-medium text-white mb-1">
                  {isUploading ? "Uploading to Cloudinary CDN..." : "Click or Drag & Drop File Here"}
                </h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Supports High-Resolution JPG, PNG, WebP, and 9:16 MP4 / MOV videos for Instagram Reels.
                </p>
              </div>

              {/* Result Preview Box */}
              {uploadedUrl && (
                <div className="bg-stone-900/80 border border-amber-500/40 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Uploaded to Cloudinary CDN
                    </span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(uploadedUrl);
                        setCopiedUrl(true);
                        setTimeout(() => setCopiedUrl(false), 2000);
                      }}
                      className="flex items-center gap-1.5 text-xs bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUrl ? "Copied!" : "Copy CDN URL"}</span>
                    </button>
                  </div>

                  <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs font-mono text-amber-300 break-all select-all">
                    {uploadedUrl}
                  </div>

                  {/* Thumbnail / Video preview */}
                  <div className="relative w-full max-w-sm h-64 rounded-xl overflow-hidden bg-stone-950 border border-stone-800">
                    {uploadedUrl.endsWith(".mp4") || uploadedUrl.endsWith(".mov") ? (
                      <video src={uploadedUrl} controls className="w-full h-full object-contain" />
                    ) : (
                      <Image src={uploadedUrl} alt="Uploaded" fill className="object-cover" />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: SETTINGS & SSMS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white">System Settings &amp; SSMS Connection</h2>
                <p className="text-sm text-stone-400 mt-1">
                  Configure Cloudinary credentials, .NET Web API endpoints, and view SSMS connection strings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cloudinary Config Box */}
                <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <h3 className="text-base font-serif text-white flex items-center gap-2">
                      <UploadCloud className="w-4 h-4 text-amber-400" />
                      <span>Cloudinary Configuration</span>
                    </h3>
                    <span
                      className={`text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isCloudinaryConnected
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {isCloudinaryConnected ? "Connected" : "Cloud Name Required"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">
                      Cloud Name *
                    </label>
                    <input
                      type="text"
                      value={cloudName}
                      onChange={(e) => setCloudName(e.target.value)}
                      placeholder="e.g. dxyz123 or your-account-name"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <p className="text-[11px] text-amber-400/90 mt-1.5 leading-relaxed">
                      💡 <strong>Where to find:</strong> Open <a href="https://cloudinary.com/console" target="_blank" rel="noreferrer" className="underline text-amber-300">cloudinary.com/console</a> &gt; Check top-left under &quot;Account Details&quot; for <strong>Cloud name</strong>.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">
                      API Key
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="655244333868859"
                      className="w-full bg-stone-950/70 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">
                      API Secret
                    </label>
                    <input
                      type="password"
                      readOnly
                      value="HNOnhY5pU3lw4_epds_F1pDE08U"
                      className="w-full bg-stone-950/70 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-stone-300 font-mono"
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={handleTestCloudinary}
                      disabled={isTestingCloudinary}
                      className="w-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isTestingCloudinary ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      <span>{isTestingCloudinary ? "Verifying..." : "Verify & Connect Cloud Name"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSyncCloudinary}
                      disabled={isSyncingCloudinary || !isCloudinaryConnected}
                      className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium py-2 rounded-xl text-xs transition border border-stone-700 flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      {isSyncingCloudinary ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      ) : (
                        <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>
                        {isSyncingCloudinary
                          ? "Uploading Local Assets..."
                          : "Upload All Local Media to Cloudinary & Update DB"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* SSMS Database Info Box */}
                <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-serif text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>SQL Server Database (SSMS)</span>
                  </h3>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                      <span className="text-stone-500 block">Server Name:</span>
                      <span className="text-emerald-300">DESKTOP-6Q3P8HQ</span>
                    </div>
                    <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                      <span className="text-stone-500 block">Database Name:</span>
                      <span className="text-emerald-300">thepetalmuse</span>
                    </div>
                    <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                      <span className="text-stone-500 block">Authentication:</span>
                      <span className="text-emerald-300">Windows Authentication (Integrated Security=True)</span>
                    </div>
                    <div className="p-2.5 bg-stone-950 rounded-lg border border-stone-800">
                      <span className="text-stone-500 block">Backend Solution (.NET):</span>
                      <span className="text-amber-300">backend/ThePetalMuse.API</span>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ---------------- WORK MODAL (ADD / EDIT) ---------------- */}
      {workModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-xl font-serif text-white">
                {editingWork?.Id && works.some((w) => w.Id === editingWork.Id)
                  ? "Edit Creation"
                  : "Add New Creation"}
              </h3>
              <button
                onClick={() => {
                  setWorkModalOpen(false);
                  setEditingWork(null);
                }}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveWork} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingWork?.Title || ""}
                    onChange={(e) =>
                      setEditingWork((prev) => ({ ...prev, Title: e.target.value }))
                    }
                    placeholder="e.g. The Couture Bridal Bouquet"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingWork?.CategoryId || "cat-01"}
                    onChange={(e) =>
                      setEditingWork((prev) => ({ ...prev, CategoryId: e.target.value }))
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {categories.map((c) => (
                      <option key={c.Id} value={c.Id}>
                        {c.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={editingWork?.Badge || ""}
                    onChange={(e) =>
                      setEditingWork((prev) => ({ ...prev, Badge: e.target.value }))
                    }
                    placeholder="e.g. Signature Couture, Patron Favorite"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Price Display
                  </label>
                  <input
                    type="text"
                    value={editingWork?.PriceDisplay || ""}
                    onChange={(e) =>
                      setEditingWork((prev) => ({ ...prev, PriceDisplay: e.target.value }))
                    }
                    placeholder="e.g. Couture Pricing / ₹3,450"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Cover Image with Cloudinary Direct Upload */}
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Cover Image URL * (or upload directly to Cloudinary)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editingWork?.CoverImageUrl || ""}
                    onChange={(e) =>
                      setEditingWork((prev) => ({ ...prev, CoverImageUrl: e.target.value }))
                    }
                    placeholder="https://... or upload below"
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  <label className="cursor-pointer bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                    <UploadCloud className="w-4 h-4 text-amber-400" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f, "work");
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {editingWork?.CoverImageUrl && (
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden mt-3 border border-stone-800">
                    <Image
                      src={editingWork.CoverImageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Lightbox 5 Photos & 1 Video Gallery */}
              <div className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                      Lightbox Standard (5 Photos + 1 Video)
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">
                    Shown in customer creation popup
                  </span>
                </div>

                {/* 5 Photos */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
                  {[0, 1, 2, 3, 4].map((slotIdx) => {
                    const currentImg =
                      (editingWork?.Images && editingWork.Images[slotIdx]) ||
                      (slotIdx === 0 ? editingWork?.CoverImageUrl : "") ||
                      "";
                    return (
                      <div
                        key={slotIdx}
                        className="space-y-1.5 p-2 bg-stone-900 rounded-xl border border-stone-800/80"
                      >
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium">
                          <span>Photo #{slotIdx + 1} {slotIdx === 0 && "(Cover)"}</span>
                        </div>
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-black/60 border border-stone-800">
                          {currentImg ? (
                            <Image
                              src={currentImg}
                              alt={`P${slotIdx + 1}`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-600 text-[10px]">
                              P{slotIdx + 1}
                            </div>
                          )}
                        </div>
                        <label className="cursor-pointer w-full py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[10px] font-semibold flex items-center justify-center gap-1 transition">
                          <UploadCloud className="w-3 h-3 text-amber-400" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const f = e.target.files?.[0];
                              if (!f) return;
                              const url = await uploadMediaFile(f);
                              if (url) {
                                const currentImgs = [
                                  ...(editingWork?.Images || [
                                    editingWork?.CoverImageUrl || "",
                                    "",
                                    "",
                                    "",
                                    "",
                                  ]),
                                ];
                                currentImgs[slotIdx] = url;
                                setEditingWork((prev) => ({
                                  ...prev,
                                  CoverImageUrl:
                                    slotIdx === 0 ? url : prev?.CoverImageUrl || url,
                                  Images: currentImgs,
                                }));
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>

                {/* Video URL */}
                <div className="pt-2">
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Reel / Studio Video URL (Compulsory 6th Slide)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingWork?.VideoUrl || ""}
                      onChange={(e) =>
                        setEditingWork((prev) => ({ ...prev, VideoUrl: e.target.value }))
                      }
                      placeholder="/works/videos/jensi-reel-01.mp4 or Cloudinary video link"
                      className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                    <label className="cursor-pointer bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0">
                      <Film className="w-3.5 h-3.5 text-rose-400" />
                      <span>Upload Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          const url = await uploadMediaFile(f);
                          if (url) {
                            setEditingWork((prev) => ({ ...prev, VideoUrl: url }));
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingWork?.ShortDescription || ""}
                  onChange={(e) =>
                    setEditingWork((prev) => ({ ...prev, ShortDescription: e.target.value }))
                  }
                  placeholder="Brief summary displayed on cards..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Full Atelier Story &amp; Craft Notes
                </label>
                <textarea
                  rows={3}
                  value={editingWork?.FullStory || ""}
                  onChange={(e) =>
                    setEditingWork((prev) => ({ ...prev, FullStory: e.target.value }))
                  }
                  placeholder="Detailed artisanal backstory, materials, botanical choices..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setWorkModalOpen(false);
                    setEditingWork(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition shadow-lg"
                >
                  Save to SQL Server
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- CATEGORY MODAL ---------------- */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-xl font-serif text-white">
                {editingCategory?.Id && categories.some((c) => c.Id === editingCategory.Id)
                  ? "Edit Category"
                  : "Add New Category"}
              </h3>
              <button
                onClick={() => {
                  setCategoryModalOpen(false);
                  setEditingCategory(null);
                }}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory?.Name || ""}
                  onChange={(e) =>
                    setEditingCategory((prev) => ({ ...prev, Name: e.target.value }))
                  }
                  placeholder="e.g. Editorial Keepsake Magazines"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory?.Slug || ""}
                    onChange={(e) =>
                      setEditingCategory((prev) => ({ ...prev, Slug: e.target.value }))
                    }
                    placeholder="e.g. magazine"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingCategory?.DisplayOrder ?? 1}
                    onChange={(e) =>
                      setEditingCategory((prev) => ({ ...prev, DisplayOrder: Number(e.target.value) }))
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Cover Image URL (or upload to Cloudinary)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingCategory?.ImageUrl || ""}
                    onChange={(e) =>
                      setEditingCategory((prev) => ({ ...prev, ImageUrl: e.target.value }))
                    }
                    placeholder="https://..."
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  <label className="cursor-pointer bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                    <UploadCloud className="w-4 h-4 text-amber-400" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f, "category");
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingCategory?.Description || ""}
                  onChange={(e) =>
                    setEditingCategory((prev) => ({ ...prev, Description: e.target.value }))
                  }
                  placeholder="Curated suite description..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCategoryModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition shadow-lg"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- REEL MODAL ---------------- */}
      {reelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-xl font-serif text-white">
                {editingReel?.Id && reels.some((r) => r.Id === editingReel.Id)
                  ? "Edit Reel"
                  : "Upload New Reel"}
              </h3>
              <button
                onClick={() => {
                  setReelModalOpen(false);
                  setEditingReel(null);
                }}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReel} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Reel Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingReel?.Title || ""}
                  onChange={(e) =>
                    setEditingReel((prev) => ({ ...prev, Title: e.target.value }))
                  }
                  placeholder="e.g. Sculpting the Botanical Cloud"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Poster Cover Image URL * (Cloudinary)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editingReel?.PosterUrl || ""}
                    onChange={(e) =>
                      setEditingReel((prev) => ({ ...prev, PosterUrl: e.target.value }))
                    }
                    placeholder="https://..."
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  <label className="cursor-pointer bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                    <UploadCloud className="w-4 h-4 text-amber-400" />
                    <span>Upload Poster</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f, "reel_poster");
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Video URL (MP4 / Cloudinary Video)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingReel?.VideoUrl || ""}
                    onChange={(e) =>
                      setEditingReel((prev) => ({ ...prev, VideoUrl: e.target.value }))
                    }
                    placeholder="https://..."
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  <label className="cursor-pointer bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                    <Video className="w-4 h-4 text-rose-400" />
                    <span>Upload Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f, "reel_video");
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingReel?.Duration || "0:30"}
                    onChange={(e) =>
                      setEditingReel((prev) => ({ ...prev, Duration: e.target.value }))
                    }
                    placeholder="0:30"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Instagram Post Link
                  </label>
                  <input
                    type="text"
                    value={editingReel?.InstagramUrl || ""}
                    onChange={(e) =>
                      setEditingReel((prev) => ({ ...prev, InstagramUrl: e.target.value }))
                    }
                    placeholder="https://instagram.com/reel/..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setReelModalOpen(false);
                    setEditingReel(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition shadow-lg"
                >
                  Save Reel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- REVIEW MODAL ---------------- */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-xl font-serif text-white">
                {editingReview?.Id && reviews.some((r) => r.Id === editingReview.Id)
                  ? "Edit Review"
                  : "Add New Review"}
              </h3>
              <button
                onClick={() => {
                  setReviewModalOpen(false);
                  setEditingReview(null);
                }}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Customer / Patron Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingReview?.Author || ""}
                  onChange={(e) =>
                    setEditingReview((prev) => ({ ...prev, Author: e.target.value }))
                  }
                  placeholder="e.g. Aarav & Riya Mehta"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={editingReview?.City || ""}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, City: e.target.value }))
                    }
                    placeholder="Surat, Gujarat"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-400 mb-1">
                    Occasion
                  </label>
                  <input
                    type="text"
                    value={editingReview?.Occasion || ""}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, Occasion: e.target.value }))
                    }
                    placeholder="1st Wedding Anniversary"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingReview?.ReviewText || ""}
                  onChange={(e) =>
                    setEditingReview((prev) => ({ ...prev, ReviewText: e.target.value }))
                  }
                  placeholder="Customer quote about the atelier creation..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-stone-400 mb-1">
                  Customer Photo URL (Cloudinary)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingReview?.PhotoUrl || ""}
                    onChange={(e) =>
                      setEditingReview((prev) => ({ ...prev, PhotoUrl: e.target.value }))
                    }
                    placeholder="https://..."
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  <label className="cursor-pointer bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                    <UploadCloud className="w-4 h-4 text-amber-400" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(f, "review");
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setReviewModalOpen(false);
                    setEditingReview(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition shadow-lg"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
