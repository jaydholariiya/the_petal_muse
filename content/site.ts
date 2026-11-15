/**
 * =======================================================================
 * THE PETAL MUSE — SITE CONTENT & CONFIGURATION
 * =======================================================================
 * 
 * Welcome Jensi! This is the single source of truth for the entire website.
 * To update any text, image, reel, service, or contact detail on the website:
 * 1. Edit the relevant section below.
 * 2. Save the file.
 * The website will instantly reflect your changes without any database or API needed!
 * 
 * Images:
 * - You can use any web image URL (e.g., Unsplash, Cloudinary, etc.)
 * - Or place photos in /public/gallery/your-photo.jpg and set url to "/gallery/your-photo.jpg"
 * 
 * Videos / Reels:
 * - Place 9:16 videos in /public/reels/your-video.mp4 and set url to "/reels/your-video.mp4"
 * 
 * Logo:
 * - Place your official logo at /public/logo.png. If missing, the website displays
 *   an exquisite typographic display wordmark automatically.
 * =======================================================================
 */

export interface CreationItem {
  id: string;
  title: string;
  category: "installations" | "editorial" | "tablescapes" | "bouquets" | "sculptural";
  categoryLabel: string;
  imageUrl: string;
  maskShape: "arch" | "oval" | "tall" | "wide";
  caption: string;
  season?: string;
  botanicals?: string[];
  instagramUrl?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
  enquiryType: string;
}

export interface ReelItem {
  id: string;
  title: string;
  caption: string;
  videoUrl?: string; // Optional local or hosted MP4 video
  posterUrl: string; // High-res cover image
  duration?: string;
  instagramUrl: string;
}

export interface JournalPost {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  instagramUrl: string;
  likesPlaceholder?: string;
}

export interface StemItem {
  id: string;
  commonName: string;
  botanicalName: string;
  season: "all" | "spring" | "summer" | "autumn" | "year-round";
  seasonLabel: string;
  colorPalette: string[];
  fragranceProfile: string;
  petalTexture: string;
  idealSetting: string;
  story: string;
  imageUrl: string;
}

export interface AtmosphereMode {
  id: "morning" | "golden" | "candlelight" | "midnight";
  name: string;
  timeLabel: string;
  ambience: string;
  description: string;
  ambientHex: string;
  glowIntensity: number;
}

export interface EventScope {
  id: string;
  title: string;
  subtitle: string;
  stemVolume: string;
  timeline: string;
  curatedFor: string;
  deliverables: string[];
  suggestedStems: string[];
}

export interface CareRitual {
  id: string;
  stepNumber: string;
  title: string;
  tagline: string;
  instruction: string;
  proTip: string;
}


export interface ProductCategoryItem {
  id: string;
  name: string;
  slug: string;
  shortTagline: string;
  description: string;
  imageUrl: string;
  badge?: string;
  customizationOptions: string[];
  suitableOccasions: string[];
  popularPairing: string;
  sampleItems: {
    title: string;
    detail: string;
  }[];
}

export interface BestsellerProduct {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  tagline: string;
  description: string;
  imageUrl: string;
  badge: string;
  customizationSnippet: string;
  featuredOccasion: string;
}

export interface OccasionItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  recommendedCategories: string[];
  curatedIdea: string;
  botanicalMood: string;
}

export interface ComboCollectionItem {
  id: string;
  title: string;
  subtitle: string;
  itemsIncluded: string[];
  pairingDescription: string;
  whyItsSpecial: string;
  imageUrl: string;
  badge: string;
  idealFor: string;
}

export interface CraftsmanshipStory {
  handmadeWithLove: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: { title: string; detail: string }[];
    imageUrl: string;
  };
  personalizedGifts: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    steps: { step: string; title: string; detail: string }[];
    imageUrl: string;
  };
  ourCreativeWorld: {
    eyebrow: string;
    title: string;
    quote: string;
    narrative: string[];
    imageUrl: string;
  };
  whyChooseUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: { icon: string; title: string; description: string }[];
  };
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  occasion: string;
  giftedItem: string;
  rating: number;
  quote: string;
  photoUrl: string;
  verified: boolean;
  date: string;
}

export const SITE_CONTENT = {
  // ---------------------------------------------------------------------
  // 1. BRAND & IDENTITY
  // ---------------------------------------------------------------------
  brand: {
    name: "THE PETAL MUSE",
    owner: "Jensi Dholariya",
    role: "Founder & Creative Director",
    tagline: "Bespoke Gifts & Blooms, reimagined.",
    subtagline: "Personalized Keepsakes, Luxury Hampers & Floral Art.",
    statement: "Bespoke handcrafted gifts, personalized keepsake frames, couture magazines, chocolate bouquets, luxury hampers, and poetic floral creations.",

    // Official Instagram profile
    instagramHandle: "@the.petalmusee",
    instagramUrl: "https://www.instagram.com/the.petalmusee/",

    // Contact Information (Owner placeholders until verified)
    whatsappNumber: "ADD_PHONE_HERE", 
    contactEmail: "ADD_EMAIL_HERE",
    location: "ADD_LOCATION_HERE", 
    locationDisplay: "Gujarat, India | Handcrafted & Delivered Across India & Worldwide",

    // Logo configuration: Leave empty to show the elegant display mark, or set to "/logo.png" when you place your logo in /public
    logoPath: "/logo.png",

    // Philosophy & Story
    philosophyHeadline: "Every celebration deserves a handcrafted memory.",
    philosophyQuote: "Turning fleeting emotions into enduring, physical keepsakes.",
    brandStory: [
      "Founded by Jensi Dholariya in Gujarat, THE PETAL MUSE was conceived as an intersection of botanical art and bespoke handcrafted gifting.",
      "We believe gifting should be unforgettable. From custom love story magazines and pressed flower frames to handcrafted chocolate bouquets, personalized phone covers, and sensory hamper boxes, each creation is hand-sculpted petal by petal with mindful love.",
      "From intimate couple milestones to grand family celebrations, our atelier curates moments of quiet wonder, personalized sentiment, and enduring elegance."
    ],

    stats: [
      { label: "Handcrafted Categories", value: "15+" },
      { label: "Personalized Creations", value: "250+" },
      { label: "Made with Love", value: "100%" },
    ],
  },

  // ---------------------------------------------------------------------
  // 2. HERO SECTION ("DAWN BLOOM")
  // ---------------------------------------------------------------------
  hero: {
    eyebrow: "BESPOKE GIFTS & FLORAL ATELIER",
    headlineLine1: "Bespoke Gifts &",
    headlineLine2: "Blooms, reimagined.",
    description: "An artisan atelier in Gujarat handcrafting couture keepsake magazines, personalized floral frames, artisan chocolate bouquets, luxury hampers, and botanical creations. Thoughtfully sculpted for life's most cherished celebrations.",
    ctaPrimary: "EXPLORE 15+ CREATIONS",
    ctaSecondary: "ORDER BESPOKE GIFT",
    backgroundImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=2400&q=90",
    badgeText: "EST. 2024 • THE PETAL MUSE • GUJARAT",
    scrollHint: "SCROLL TO WITNESS THE CREATIONS",
  },

  // ---------------------------------------------------------------------
  // 3. EDITORIAL INTRODUCTION ("MORNING LIGHT")
  // ---------------------------------------------------------------------
  intro: {
    eyebrow: "THE ATELIER PHILOSOPHY",
    quoteLarge: "Gifting is the art of turning fleeting emotions into enduring heirlooms.",
    narrative: "At THE PETAL MUSE, every creation—whether an 8-page love story magazine, a pressed flower memory frame, an artisan chocolate bouquet, or a velvet celebration hamper—is individually hand-sculpted by Jensi Dholariya. We combine nature's botanical poetry with tactile artisanal craft to make your celebrations truly unforgettable.",
    signatureName: "Jensi Dholariya",
    signatureTitle: "Founder & Creative Director",
    portraitImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    detailImage: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85",
  },

  // ---------------------------------------------------------------------
  // 4. CREATIONS GALLERY: "THE BLOOM ARCHIVE" ("GOLDEN NOON")
  // ---------------------------------------------------------------------
  galleryCategories: [
    { id: "all", label: "All Creations" },
    { id: "installations", label: "Installations" },
    { id: "editorial", label: "Editorial & Bridal" },
    { id: "tablescapes", label: "Tablescapes" },
    { id: "bouquets", label: "Signature Bouquets" },
  ],

  creations: [
    {
      id: "creation-01",
      title: "Poetry in Ivory & Ochre",
      category: "installations",
      categoryLabel: "Sculptural Installation",
      imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=90",
      maskShape: "arch",
      caption: "Quiet poetry in ivory, caramel, and muted foliage. Every stem suspended with mindful intention.",
      season: "Autumn / Winter",
      botanicals: ["Garden Roses", "Cappuccino Carnations", "Preserved Grasses"],
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "creation-02",
      title: "The Dew-Draped Ranunculus",
      category: "editorial",
      categoryLabel: "Editorial & Bridal",
      imageUrl: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1400&q=90",
      maskShape: "tall",
      caption: "Sensory bridal nuance celebrating delicate layers and morning dew. Fluid silhouette draped in raw silk.",
      season: "Spring Heirloom",
      botanicals: ["Butterfly Ranunculus", "Blushing Peonies", "Raw Silk Ribbon"],
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "creation-03",
      title: "Atmospheric Dining Harmony",
      category: "tablescapes",
      categoryLabel: "Tablescapes & Dining",
      imageUrl: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=1800&q=90",
      maskShape: "wide",
      caption: "Intimate gathering aesthetics combining artisan ceramic vessels, tapered beeswax candles, and organic florals.",
      season: "All Seasons",
      botanicals: ["Lisianthus", "Eucalyptus", "Sweet Pea Vines"],
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "creation-04",
      title: "Velvet Dawn Signature Bouquet",
      category: "bouquets",
      categoryLabel: "Signature Bouquets",
      imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1400&q=90",
      maskShape: "oval",
      caption: "Hand-crafted poetic stem selections wrapped in archival textured paper and sealed with our signature wax mark.",
      season: "Signature Edition",
      botanicals: ["Toffee Roses", "Astilbe", "Dried Seed Pods"],
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "creation-05",
      title: "Weightless Canopy of Clouds",
      category: "installations",
      categoryLabel: "Sculptural Installation",
      imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90",
      maskShape: "arch",
      caption: "A monumental floating floral canopy that breathes with gentle venue breezes. Ethereal romance reimagined.",
      season: "Summer Gala",
      botanicals: ["White Delphinium", "Hydrangea Arborescens", "Gypsophila Clouds"],
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "creation-06",
      title: "High-Fashion Botanical Still Life",
      category: "editorial",
      categoryLabel: "Editorial & Bridal",
      imageUrl: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1400&q=90",
      maskShape: "tall",
      caption: "Macro botanical study exploring color gradients, tactile textures, and the delicate decay of living blossoms.",
      season: "Editorial Exclusive",
      botanicals: ["French Tulips", "Clematis Vines", "Anemones"],
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "creation-07",
      title: "Candlelit Autumnal Tablescape",
      category: "tablescapes",
      categoryLabel: "Tablescapes & Dining",
      imageUrl: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1600&q=90",
      maskShape: "wide",
      caption: "A rich feast for the senses featuring dark berries, antique terracotta, and glowing amber glass.",
      season: "Autumn Celebration",
      botanicals: ["Dahlia Cafe Au Lait", "Privet Berries", "Smokebush"],
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "creation-08",
      title: "Petal Reverie Bouquet",
      category: "bouquets",
      categoryLabel: "Signature Bouquets",
      imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=90",
      maskShape: "arch",
      caption: "An exuberant harmony of pastel hues, dancing stems, and intoxicating botanical fragrance.",
      season: "Spring Awakening",
      botanicals: ["Garden Peonies", "Chamomile", "Fluffy Lilacs"],
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
  ] as CreationItem[],

  // ---------------------------------------------------------------------
  // 5. FEATURED CREATION ("MOMENT OF AWE")
  // ---------------------------------------------------------------------
  featuredCreation: {
    eyebrow: "FEATURED MASTERPIECE",
    title: "The Symphony of Stems",
    subtitle: "A Monumental Suspended Scenography",
    description: "Conceived for a private glass conservatory, this floating botanical architecture composed over 1,400 heirloom stems. Organic movement dances with changing daylight, transforming the atmosphere from dawn gold into twilight mystery.",
    imageUrl: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=2400&q=90",
    metrics: [
      { label: "Botanical Scale", value: "1,400+ Stems" },
      { label: "Palette", value: "Ivory, Apricot Blush, Fern" },
      { label: "Atmosphere", value: "Floating Kinetic Scenography" },
      { label: "Curated By", value: "Jensi Dholariya" },
    ],
    ctaText: "ENQUIRE FOR YOUR EVENT",
  },

  // ---------------------------------------------------------------------
  // 6. NEW UNIQUE SIGNATURE FEATURE: THE SENSORY STEM LIBRARY
  // ---------------------------------------------------------------------
  stemLibrary: {
    eyebrow: "BOTANICAL ARCHIVE",
    title: "The Sensory Stem Library",
    subtitle: "Rare Heirloom Botanicals Curated by Jensi Dholariya",
    description: "Explore the rare varieties, tactile textures, and seasonal rhythms that compose THE PETAL MUSE creations. Click any stem to request its inclusion in your upcoming celebration.",
    stems: [
      {
        id: "stem-01",
        commonName: "Heirloom Garden Rose",
        botanicalName: "Rosa 'Caramel Antike'",
        season: "summer",
        seasonLabel: "Summer & Autumn",
        colorPalette: ["#F4B9A0", "#FBF4E6", "#E8A93B"],
        fragranceProfile: "Warm Honey & Apricot Nectar",
        petalTexture: "Velvet ruffled whorls with 120+ petals",
        idealSetting: "Bridal Bouquets & Intimate Centerpieces",
        story: "Sourced from high-altitude heirloom growers, Caramel Antike unfurls over 5 days, shifting from delicate parchment to warm caramel gold.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85",
      },
      {
        id: "stem-02",
        commonName: "Butterfly Ranunculus",
        botanicalName: "Ranunculus 'Lycia'",
        season: "spring",
        seasonLabel: "Early Spring",
        colorPalette: ["#E58FA0", "#F4B9A0", "#F7F7F0"],
        fragranceProfile: "Delicate Morning Rain",
        petalTexture: "Translucent shimmering silk with waxy glow",
        idealSetting: "Loose Dancing Asymmetrical Styling",
        story: "Multiple blooming heads per stem that catch the light like shimmering butterfly wings. Celebrated for extraordinary 14-day vase vitality.",
        imageUrl: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?auto=format&fit=crop&w=800&q=85",
      },
      {
        id: "stem-03",
        commonName: "Towering Cloud Delphinium",
        botanicalName: "Delphinium elatum 'Moonlight'",
        season: "summer",
        seasonLabel: "Midsummer",
        colorPalette: ["#FBF4E6", "#C9B9D9", "#3F5A45"],
        fragranceProfile: "Crisp Green Fern & Dew",
        petalTexture: "Satin star-shaped florets along a 4-foot spire",
        idealSetting: "Monumental Arches & Suspended Clouds",
        story: "Provides the breathtaking architectural height in our monumental ceremony installations, mimicking natural cathedral lines.",
        imageUrl: "https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=800&q=85",
      },
      {
        id: "stem-04",
        commonName: "Ruffled Japanese Lisianthus",
        botanicalName: "Eustoma grandiflorum 'Voyage'",
        season: "year-round",
        seasonLabel: "Year-Round Atelier Reserve",
        colorPalette: ["#B78AA8", "#FBF4E6", "#668B78"],
        fragranceProfile: "Subtle & Hypoallergenic for Dining",
        petalTexture: "Layered pleated crepe paper with curled tips",
        idealSetting: "Sensory Dinner Tablescapes",
        story: "Bred in Japan for unrivaled stem strength and romantic double folds, Lisianthus ensures tablescapes look pristine until the final toast.",
        imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=85",
      },
      {
        id: "stem-05",
        commonName: "Ethereal Smokebush",
        botanicalName: "Cotinus coggygria 'Royal Purple'",
        season: "autumn",
        seasonLabel: "Autumn Harvest",
        colorPalette: ["#4A1F3D", "#1B1220", "#B78AA8"],
        fragranceProfile: "Woody Cedar & Dried Herbs",
        petalTexture: "Feathery cloud-like billows",
        idealSetting: "Editorial Spatial Contrast & Depth",
        story: "Brings mysterious, painterly shadow and dramatic organic atmosphere to our autumn and winter installations.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=85",
      },
      {
        id: "stem-06",
        commonName: "Sweet Pea & Clematis Tendrils",
        botanicalName: "Lathyrus odoratus & Clematis 'Inspiration'",
        season: "spring",
        seasonLabel: "Spring & Summer",
        colorPalette: ["#F4B9A0", "#C9B9D9", "#B9C9A3"],
        fragranceProfile: "Intoxicating Honeyed Floral",
        petalTexture: "Fluttering papery wings with twisting tendrils",
        idealSetting: "Organic Cascading Bridal Bouquets",
        story: "These fluid dancing stems break rigid geometry, creating the signature breathing, wind-kissed silhouette of THE PETAL MUSE.",
        imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
      },
    ] as StemItem[],
  },

  // ---------------------------------------------------------------------
  // 7. NEW UNIQUE SIGNATURE FEATURE: FLORAL ATMOSPHERE & LIGHTING SIMULATOR
  // ---------------------------------------------------------------------
  atmosphereSimulator: {
    eyebrow: "SPATIAL LIGHTING EXPERIENCE",
    title: "Light & Atmosphere Simulator",
    subtitle: "Experience How Floral Artistry Transforms Through Time",
    description: "Botanicals do not exist in static light. Switch between natural morning sun, golden sunset warmth, intimate candlelit dining, and midnight velvet to see how the atmosphere shifts.",
    modes: [
      {
        id: "morning",
        name: "Morning Sun",
        timeLabel: "09:00 AM • Crisp & Pure",
        ambience: "Airy daylight with soft botanical translucency",
        description: "Fresh morning sun reveals delicate pastel pigments, dew dewdrops, and crisp petal textures. Ideal for garden ceremonies.",
        ambientHex: "rgba(251, 244, 230, 0.4)",
        glowIntensity: 0.1,
      },
      {
        id: "golden",
        name: "Golden Hour",
        timeLabel: "05:30 PM • Warm & Radiant",
        ambience: "Honey-soaked warmth with long romantic shadows",
        description: "Low-angled golden light illuminates caramel and peach undertones, creating a glowing editorial halo around every blossom.",
        ambientHex: "rgba(232, 169, 59, 0.35)",
        glowIntensity: 0.4,
      },
      {
        id: "candlelight",
        name: "Candlelit Twilight",
        timeLabel: "08:15 PM • Intimate & Sensory",
        ambience: "Flickering beeswax candles & glowing centerpieces",
        description: "Tapered candlelight dances across ceramic vessels, creating soft dramatic contrast and bringing conversational intimacy to the table.",
        ambientHex: "rgba(244, 185, 160, 0.45)",
        glowIntensity: 0.7,
      },
      {
        id: "midnight",
        name: "Midnight Velvet",
        timeLabel: "11:00 PM • Dramatic & Moody",
        ambience: "Deep aubergine shadows with luminous accents",
        description: "Under evening ambient venue lighting, bold silhouettes and deep jewel tones command the room with high-fashion allure.",
        ambientHex: "rgba(74, 31, 61, 0.65)",
        glowIntensity: 0.9,
      },
    ] as AtmosphereMode[],
  },

  // ---------------------------------------------------------------------
  // 8. REELS: "MOVING PETALS"
  // ---------------------------------------------------------------------
  reels: [
    {
      id: "reel-01",
      title: "Sculpting the Cloud Installation",
      caption: "From raw stems to an ethereal suspended dream. Sound on for the studio whispers.",
      posterUrl: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=85",
      duration: "0:24",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "reel-02",
      title: "Dawn Stem Selection",
      caption: "Hand-picking each ranunculus and heirloom garden rose for this weekend's bridal suite.",
      posterUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
      duration: "0:31",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "reel-03",
      title: "The Art of the Tablescape",
      caption: "Harmonizing ceramic textures, tapered beeswax candles, and loose blooming stems.",
      posterUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85",
      duration: "0:19",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "reel-04",
      title: "Wrapping with Intention",
      caption: "Our signature wrapping ritual: archival coffee paper, wax seal, and silk velvet ribbons.",
      posterUrl: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=85",
      duration: "0:28",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
  ] as ReelItem[],

  // ---------------------------------------------------------------------
  // 9. UNIQUE INTERACTIVE FEATURE: "DESIGN YOUR BOUQUET / DÉCOR MOOD"
  // ---------------------------------------------------------------------
  moodDesigner: {
    title: "Design Your Floral Mood",
    subtitle: "A Bespoke Sensory Workshop",
    description: "Curate your dream botanical palette, scale, and occasion. Watch the living floral preview shift in real-time, then send your personalized concept directly to Jensi on WhatsApp.",
    
    occasions: [
      { id: "wedding", name: "Grand Wedding Celebration", defaultStyle: "statement" },
      { id: "editorial", name: "Editorial & Campaign", defaultStyle: "sculptural" },
      { id: "dinner", name: "Intimate Dining", defaultStyle: "organic" },
      { id: "gift", name: "Bespoke Gift Milestone", defaultStyle: "organic" },
      { id: "brand", name: "Brand Gala Pop-Up", defaultStyle: "statement" },
    ],

    palettes: [
      {
        id: "blush-romance",
        name: "Blush Romance",
        description: "Soft apricots, creamy garden roses, and delicate dusty orchid hues.",
        colors: ["#F4B9A0", "#E58FA0", "#FBF4E6", "#B78AA8"],
        accent: "#F4B9A0",
        moodTag: "Ethereal & Poetic",
      },
      {
        id: "golden-glow",
        name: "Golden Noon Glow",
        description: "Sun-drenched marigold, honey ranunculus, warm caramel, and deep aubergine.",
        colors: ["#E8A93B", "#F4B9A0", "#FBF4E6", "#1B1220"],
        accent: "#E8A93B",
        moodTag: "Radiant & Warm",
      },
      {
        id: "sage-garden",
        name: "Muted Sage Garden",
        description: "Pistachio foliage, muted jade, porcelain petals, and pale lilac dewdrops.",
        colors: ["#668B78", "#B9C9A3", "#C9B9D9", "#F7F7F0"],
        accent: "#668B78",
        moodTag: "Botanical & Serene",
      },
      {
        id: "midnight-velvet",
        name: "Midnight Velvet",
        description: "Deep mulberry wine, ink aubergine shadows, and luminous coral sparks.",
        colors: ["#1B1220", "#4A1F3D", "#F16B5B", "#B78AA8"],
        accent: "#4A1F3D",
        moodTag: "Dramatic & Editorial",
      },
    ],

    styles: [
      {
        id: "sculptural",
        name: "Minimal & Sculptural",
        detail: "Focus on Ikebana line purity, rare architectural stems, and negative space.",
        fullness: 0.4,
      },
      {
        id: "organic",
        name: "Lush & Organic",
        detail: "Meadow-style layered botanical depth with dancing stems and natural curves.",
        fullness: 0.75,
      },
      {
        id: "statement",
        name: "Statement Architectural",
        detail: "Maximal scale, cascading botanicals, and monumental presence.",
        fullness: 1.0,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 10. NEW UNIQUE SIGNATURE FEATURE: BESPOKE EVENT SCALE & SCOPE PLANNER
  // ---------------------------------------------------------------------
  eventScopes: {
    eyebrow: "BESPOKE CONSULTATION GUIDE",
    title: "Event Floral Scale & Scope",
    subtitle: "Tailored Curation for Weddings, Brand Galas, & Private Celebrations",
    description: "Every celebration possesses its own spatial cadence. Select a scale below to review typical stem counts, production timelines, and included botanical design deliverables.",
    tiers: [
      {
        id: "scope-intimate",
        title: "Intimate Dining & Soirée",
        subtitle: "10 to 40 Guests • Sensory Focus",
        stemVolume: "150 – 350 Curated Stems",
        timeline: "4 to 6 Weeks Consultation",
        curatedFor: "Private dinner parties, milestone birthdays, boutique brand gatherings.",
        deliverables: [
          "Low-profile artisanal ceramic centerpieces",
          "Individual place-setting botanical moments",
          "Curated tapered beeswax candle arrangements",
          "Cocktail bar & welcome floral accentuation",
        ],
        suggestedStems: ["Japanese Lisianthus", "Caramel Antike Rose", "Clematis Tendrils"],
      },
      {
        id: "scope-bridal",
        title: "Editorial Bridal Suite",
        subtitle: "The Wedding Couple & Intimate Party",
        stemVolume: "200 – 450 Heirloom Stems",
        timeline: "2 to 4 Months Consultation",
        curatedFor: "Couples desiring high-fashion, organic bridal florals draped in raw silk.",
        deliverables: [
          "Signature asymmetrical bridal bouquet with silk ribbon",
          "Groom & groomsmen botanical boutonnieres",
          "Bridesmaids organic stem selections",
          "Delicate botanical hair jewelry & ceremony petal cones",
        ],
        suggestedStems: ["Butterfly Ranunculus", "David Austin Roses", "Sweet Pea Vines"],
      },
      {
        id: "scope-grand",
        title: "Grand Ceremony & Celebration",
        subtitle: "80 to 250 Guests • Spatial Transformation",
        stemVolume: "800 – 2,000+ Stems",
        timeline: "3 to 6 Months Consultation",
        curatedFor: "Full-day wedding celebrations, luxury corporate galas, and venue transformations.",
        deliverables: [
          "Sculptural floral ceremony arch or grounded meadow installation",
          "Aisle runner floral clusters & entrance statement piece",
          "Complete reception dining tablescapes & candle design",
          "Post-event sustainable floral repurposing service",
        ],
        suggestedStems: ["Cloud Delphinium", "Hydrangeas", "Preserved Grasses"],
      },
      {
        id: "scope-monumental",
        title: "Monumental Destination Scenography",
        subtitle: "250+ Guests • Multi-Day Masterpiece",
        stemVolume: "2,500 – 6,000+ Stems",
        timeline: "4 to 9 Months Master Planning",
        curatedFor: "Multi-day destination weddings, palace galas, and architectural brand pavilions.",
        deliverables: [
          "Suspended organic floral chandeliers & overhead floating clouds",
          "Custom structural engineering, rigging & master sculpting",
          "Dedicated on-site floral team across all event days",
          "Pre-event 3D spatial visualization & sample mockups",
        ],
        suggestedStems: ["Rare Heirloom Imports", "Foraged Smokebush", "Giant Delphiniums"],
      },
    ] as EventScope[],
  },

  // ---------------------------------------------------------------------
  // 11. UNIQUE INTERACTIVE FEATURE 2: "FLORAL MOOD FINDER" QUIZ
  // ---------------------------------------------------------------------
  quiz: {
    badge: "3-STEP INTUITIVE DISCOVERY",
    title: "Discover Your Botanical Muse",
    description: "Answer three sensory questions to reveal the floral aesthetic that resonates with your personal energy.",
    questions: [
      {
        id: "atmosphere",
        prompt: "What atmosphere stirs your heart most?",
        options: [
          { label: "A sun-drenched European glasshouse filled with rare heirloom roses.", value: "romantic", tag: "Ethereal Romantic" },
          { label: "An avant-garde contemporary art gallery with bold architectural lines.", value: "sculptural", tag: "High Modernist" },
          { label: "An intimate candlelit dinner in an olive grove under the twilight sky.", value: "sensory", tag: "Sensory Gathering" },
        ],
      },
      {
        id: "texture",
        prompt: "Which tactile detail calls to your touch?",
        options: [
          { label: "Raw-edged flowing silk ribbon trailing gently in the breeze.", value: "romantic", tag: "Tactile Silk" },
          { label: "Sculptural twisted branches and dramatic, unexpected seed pods.", value: "sculptural", tag: "Organic Architecture" },
          { label: "Handmade terracotta pottery paired with flickering beeswax candles.", value: "sensory", tag: "Artisan Earth" },
        ],
      },
      {
        id: "palette",
        prompt: "Which light of day moves you most?",
        options: [
          { label: "Dawn mist with pastel peach and delicate lilac dewdrops.", value: "romantic", tag: "Dawn Awakening" },
          { label: "Deep midnight with ink aubergine shadows and glowing embers.", value: "sculptural", tag: "Night Velvet" },
          { label: "Golden noon warmth spilling amber hues across the table.", value: "sensory", tag: "Golden Hour" },
        ],
      },
    ],
    results: {
      romantic: {
        title: "The Poetic Muse",
        subtitle: "Delicate • Flowing • Heartfelt",
        recommendation: "Bridal & Editorial Floral Design",
        serviceSlug: "bridal-editorial",
        summary: "You are drawn to tenderness, movement, and the quiet romance of heirloom petals. Your aesthetic thrives in soft blush, flowing silk ribbons, and loose, breathing arrangements.",
      },
      sculptural: {
        title: "The Architectural Muse",
        subtitle: "Bold • Minimal • Transformative",
        recommendation: "Bespoke Floral Installations",
        serviceSlug: "bespoke-installations",
        summary: "You treat nature as modern sculpture. Your aesthetic celebrates dramatic lines, rare botanicals, and high-impact spatial moments that stop guests in their tracks.",
      },
      sensory: {
        title: "The Alchemist Muse",
        subtitle: "Warm • Atmospheric • Unforgettable",
        recommendation: "Tablescapes & Dining Atmospheres",
        serviceSlug: "tablescapes-dining",
        summary: "You believe the magic is in the shared gathering. Your aesthetic flourishes in amber candlelight, textured ceramic vessels, and bountiful seasonal centerpieces.",
      },
    },
  },

  // ---------------------------------------------------------------------
  // 12. NEW UNIQUE SIGNATURE FEATURE: BOTANICAL CARE & PRESERVATION RITUALS
  // ---------------------------------------------------------------------
  careRituals: {
    eyebrow: "THE ART OF PRESERVATION",
    title: "Atelier Care & Heirloom Keepsakes",
    subtitle: "Extending the Life and Memory of Your Blooms",
    description: "Botanical art is living, breathing poetry. Follow these atelier rituals to maximize fresh stem longevity, or preserve your wedding bouquet as an archival heirloom.",
    rituals: [
      {
        id: "ritual-1",
        stepNumber: "01",
        title: "The Angled Cut & Cold Water Ritual",
        tagline: "Unlocking Stem Capillaries",
        instruction: "Trim stems at a 45-degree angle under running cold water using sterile floral shears. Change water every 48 hours and keep away from direct heat or ripe fruit.",
        proTip: "Never crush woody branches—make a single vertical 1-inch slice up the stem base instead.",
      },
      {
        id: "ritual-2",
        stepNumber: "02",
        title: "Bouquet Mist & Shadow Repose",
        tagline: "Honoring Petal Hydration",
        instruction: "Before an evening dinner or ceremony, mist delicate butterfly ranunculus and sweet pea blossoms with chilled distilled water, allowing them to rest in a cool, shaded alcove.",
        proTip: "Keep flowers away from direct AC draft vents, which dehydrate petals quickly.",
      },
      {
        id: "ritual-3",
        stepNumber: "03",
        title: "Heirloom Inverted Drying",
        tagline: "Preserving Wedding Memories",
        instruction: "Within 48 hours of your celebration, bind your bridal bouquet stems with linen twine and suspend inverted in a dark, dry, ventilated room for 3 weeks.",
        proTip: "Darkness is essential—exposure to sunlight bleaches the natural antique pigments.",
      },
      {
        id: "ritual-4",
        stepNumber: "04",
        title: "Botanical Petal Pressing",
        tagline: "Framed Fine Art Archival Keepsake",
        instruction: "Carefully press select garden rose petals between acid-free parchment paper inside heavy weighted boards to create museum-grade botanical art for your home.",
        proTip: "Jensi Dholariya offers bespoke post-wedding bridal petal preservation upon request.",
      },
    ] as CareRitual[],
  },

  // ---------------------------------------------------------------------
  // 13. SERVICES: "OUR FLORAL & BESPOKE GIFTING CRAFT"
  // ---------------------------------------------------------------------
  services: [
    {
      id: "serv-01",
      slug: "bespoke-hampers-suites",
      title: "Bespoke Hampers & Curated Suites",
      subtitle: "Multi-Sensory Gift Boxes, Chocolates & Cards",
      description: "Artisan keepsake velvet boxes filled with fragrant preserved florals, scented soy candles, imported Swiss chocolates, customized mobile covers, and wax-sealed milestone letters.",
      imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Velvet rigid box with gilded name personalization",
        "Curated chocolate arrangements & scented candle pairings",
        "Handmade pressed flower cards & custom wax seals",
        "Doorstep courier delivery across India & worldwide",
      ],
      enquiryType: "Luxury Hamper & Combo Gift Suite",
    },
    {
      id: "serv-02",
      slug: "heirloom-photo-frames",
      title: "Heirloom Photo & Botanical Frames",
      subtitle: "Double-Glass Teak, Vintage, Glitter & 3D Pipe Cleaner",
      description: "Preserving your most treasured wedding, couple, and milestone memories encased with real dried garden petals, antique baroque borders, 3D pipe cleaner florals, and 24k gold calligraphy.",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=85",
      features: [
        "High-definition archival couple photograph printing",
        "Real pressed Gujarat garden roses, delphinium & ferns",
        "Solid teakwood, vintage baroque, or luminous glitter options",
        "Personalized engraved names, anniversary dates & mantras",
      ],
      enquiryType: "Heirloom Photo & Botanical Frame",
    },
    {
      id: "serv-03",
      slug: "editorial-love-magazines",
      title: "Couture Love Story Magazines",
      subtitle: "Bespoke 8-Page Publications in High-Fashion Print",
      description: "A magazine cover featuring the couple, with high-fashion typography, vows, timeline stories, and romantic photo spreads. Bound with silk velvet ribbons as the ultimate unforgettable keepsake.",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Full editorial layout designed by master graphic artists",
        "Couple interview, vows & wedding milestone narrative",
        "High-gloss heavyweight archival paper with velvet spine stitching",
        "Delivered in a wax-sealed gold-embossed presentation folder",
      ],
      enquiryType: "Couture Editorial Magazine",
    },
    {
      id: "serv-04",
      slug: "signature-bouquets-chocolates",
      title: "Artisanal Bouquets & Chocolate Blooms",
      subtitle: "Fresh Flowers, Ferrero Bouquets & Gift Baskets",
      description: "Poetic hand-tied bouquets and playful gourmet chocolate arrangements wrapped in coffee-toned parchment, tied with imported silk ribbons, and accompanied by deckle-edge flower notes.",
      imageUrl: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Fresh Ecuadorian blooms or 3-year preserved everlasting flora",
        "Ferrero Rocher & Lindt Lindor chocolate bouquet sculpting",
        "Handmade deckle-edge pressed petal calligraphy card",
        "White-glove private handover with signature wax monogram",
      ],
      enquiryType: "Artisanal Bouquet & Chocolate Floral Suite",
    },
  ] as ServiceItem[],

  // ---------------------------------------------------------------------
  // 14. INSTAGRAM JOURNAL ("FROM OUR INSTAGRAM JOURNAL")
  // ---------------------------------------------------------------------
  journal: [
    {
      id: "post-01",
      imageUrl: "/works/magazines/The Petal Muse Luxury Cover.png",
      caption: "The Petal Muse Luxury Bridal Edition: Custom 8-page couple love story mini magazine bound with silk velvet ribbon and botanical wax seal. ✨ @the.petalmusee",
      date: "Keepsake Magazines",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-02",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
      caption: "Botanical baby footprint & wedding double-glass frame with genuinely pressed garden roses and larkspur. Sealed for decades of memories.",
      date: "Heirloom Frames",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-03",
      imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85",
      caption: "Signature 3-Part Luxury Hamper: Curated across Men's Grooming, Women's Pampering & Royal Afghan Dry Fruits inside rigid velvet keepsake trunks.",
      date: "Luxury Hampers",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-04",
      imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=85",
      caption: "Artisan 24-Ferrero Rocher & Ecuadorian garden rose sweet bloom bouquet wrapped in coffee parchment with raw silk ribbons.",
      date: "Chocolate Bouquets",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-05",
      imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85",
      caption: "Everlasting tactile chenille pipe cleaner tulip bouquet, bag charms & dining cloche accents. Handcrafted fuzzy floral wonders.",
      date: "Pipe Cleaner Art",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-06",
      imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=85",
      caption: "Genuine pressed garden petals and 24k gold leaf flakes encased in anti-yellowing crystal clear resin mobile phone cover.",
      date: "Botanical Phone Covers",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
  ] as JournalPost[],

  // ---------------------------------------------------------------------
  // 15. CONTACT: "LET'S CREATE SOMETHING BEAUTIFUL" ("NIGHT GARDEN")
  // ---------------------------------------------------------------------
  contact: {
    eyebrow: "LET'S CREATE SOMETHING BEAUTIFUL",
    headlineLine1: "Begin Your",
    headlineLine2: "Floral Journey.",
    description: "Whether planning a destination celebration, an editorial campaign, or an intimate gathering, we would be honoured to hear your vision. Share your details below for a bespoke consultation.",
    enquiryTypes: [
      "Bespoke Floral Installation",
      "Bridal & Wedding Floral Styling",
      "Tablescapes & Dining Experience",
      "Editorial / Brand Campaign",
      "Signature Floral Gifting",
      "Other Creative Collaboration",
    ],
    budgetCategories: [
      "Select Anticipated Scope",
      "Intimate Gathering (Select Floral Accents)",
      "Full Celebration Styling",
      "Monumental Spatial Scenography",
      "Custom Creative Commission",
    ],
    whatsappPrompt: "Chat directly on WhatsApp with Jensi",
    instagramPrompt: "Direct Message on Instagram",
  },


  // ---------------------------------------------------------------------
  // 18. OUR BESTSELLERS — MOST LOVED CREATIONS
  // ---------------------------------------------------------------------
  bestsellersSection: {
    eyebrow: "ATELIER FAVORITES",
    title: "OUR BESTSELLERS",
    subtitle: "Most Loved Creations by THE PETAL MUSE",
    description: "Discover our most celebrated signature pieces. From newborn baby footprint frames and couture love magazines to 3-part luxury hampers and everlasting pipe cleaner bouquets, each creation is individually handcrafted by Jensi Dholariya.",
    products: [
      {
        id: "best-01",
        title: "The Newborn Baby Footprint Botanical Frame",
        category: "photo-frames",
        categoryName: "Photo Frames & Footprints",
        tagline: "Baby's Tiny Footprint Sealed in Dried Blooms",
        description: "Your newborn baby's authentic clay or ink footprint surrounded by pressed baby's breath, miniature garden rose petals, and gilded gold birth statistics (date, weight, time) in solid double-glass teak.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=85",
        badge: "Newborn Keepsake Favorite",
        customizationSnippet: "Custom ink or clay footprint + baby name & birth statistics in gold foil + choice of petal hues.",
        featuredOccasion: "Baby Arrival, 1st Birthday & Parenthood Milestones",
      },
      {
        id: "best-02",
        title: "The Editorial Love Story Mini Magazine",
        category: "magazine",
        categoryName: "Mini Magazine",
        tagline: "Wedding, Engagement, Anniversary & Baby Editions",
        description: "A bespoke 8-page glossy editorial publication telling your personal story in couture magazine format. Custom styled with high-fashion typography, personal photography, vows, and velvet spine binding.",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85",
        badge: "Signature Couture Invention",
        customizationSnippet: "Choose edition (Wedding, Engagement, Anniversary, Baby) + custom cover headline + vows & story text.",
        featuredOccasion: "Weddings, Engagements & Milestone Anniversaries",
      },
      {
        id: "best-03",
        title: "The Couture Heirloom Bridal Wedding Bouquet",
        category: "bouquets",
        categoryName: "Bridal Bouquets",
        tagline: "Hand-Tied Wedding Florals Bound in Raw Silk",
        description: "A breathtaking couture bridal bouquet crafted with heirloom garden roses, butterfly ranunculus, and dancing sweet peas. Bound with hand-frayed imported silk velvet ribbon and a heated botanical wax crest.",
        imageUrl: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85",
        badge: "Bridal Atelier Masterpiece",
        customizationSnippet: "Bridal color harmony + choice of fresh dawn or preserved everlasting stems + custom silk ribbon hue.",
        featuredOccasion: "Weddings, Receptions & Bridal Portraits",
      },
      {
        id: "best-04",
        title: "The Triple-Tier Hamper Suite (Men, Women & Dry Fruit)",
        category: "hamper-boxes",
        categoryName: "Hamper Boxes",
        tagline: "Three Curations: Men's, Women's & Royal Dry Fruit",
        description: "A rigid velvet keepsake box customized for your recipient. Choose from Men's Luxury Grooming & Cologne, Women's Pampering & Preserved Roses, or Royal Festive Dry Fruits & Afghan dates with gold leaf.",
        imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85",
        badge: "VIP Luxury Hamper",
        customizationSnippet: "Select edition (Men, Women, Dry Fruit) + engraved gilded recipient name + wax-sealed milestone card.",
        featuredOccasion: "Festive Gifting, Grand Birthdays & VIP Celebrations",
      },
      {
        id: "best-05",
        title: "Handmade Everlasting Pipe Cleaner Bouquet & Keychain",
        category: "pipe-cleaner-frames",
        categoryName: "Pipe Cleaner Art",
        tagline: "Hand-Sculpted Chenille Blooms, Keychains & Decor",
        description: "Fuzzy, soft, tactile velvet chenille flowers hand-coiled into vibrant everlasting bouquets that never wilt. Accompanied by matching floral bag keychains and kitchen counter cloche accents.",
        imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85",
        badge: "Viral Studio Favorite",
        customizationSnippet: "Choice of flower species (Tulips, Daisies, Sunflowers) + matching keychain + customized packaging.",
        featuredOccasion: "Friendship Celebrations, Graduation & Home Desk Joy",
      },
      {
        id: "best-06",
        title: "The Milestone Polaroid Ring Album & Prints",
        category: "photo-frames",
        categoryName: "Polaroid Keepsakes",
        tagline: "Handmade Ring-Bound Polaroid Album & Retro Prints",
        description: "A vintage-style ring-binder photo album housing 20 to 40 retro Polaroid prints adorned with delicate pressed petals, handwritten dates, and raw silk tie closures. The ultimate sentimental memory archive.",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85",
        badge: "Sentimental Keepsake",
        customizationSnippet: "Up to 40 custom Polaroid prints + personalized gold engraved album cover + pressed flower pages.",
        featuredOccasion: "Couples Milestones, Dating Scrapbooks & Travel Memories",
      },
      {
        id: "best-07",
        title: "Velvet Bloom & Truffle Confection Bouquet",
        category: "chocolate-bouquets",
        categoryName: "Chocolate Bouquets",
        tagline: "Artisan Chocolates Sculpted with Fresh Roses",
        description: "A decadent harmony of imported Ferrero Rocher & Lindt Lindor truffles blooming alongside fresh Ecuadorian garden roses, wrapped in coffee archival parchment with velvet ribbon.",
        imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85",
        badge: "Romantic Bestseller",
        customizationSnippet: "Select preferred chocolate variety (Ferrero/Lindt) + fresh rose hues + custom wax monogram.",
        featuredOccasion: "Birthdays & Valentine's Celebrations",
      },
      {
        id: "best-08",
        title: "The Heirloom Memory Botanical Teak Frame",
        category: "photo-frames",
        categoryName: "Photo Frames",
        tagline: "Cherished Moments Sealed in Everlasting Blooms",
        description: "Your favorite couple or family photograph framed with genuine pressed garden roses, white larkspur, and delicate fern tendrils between double museum glass in solid teakwood.",
        imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
        badge: "Most Loved Keepsake",
        customizationSnippet: "High-resolution photo print + choice of dried floral color palette + gilded gold date calligraphy.",
        featuredOccasion: "Anniversary & Wedding Memories",
      },
    ] as BestsellerProduct[],
  },

  // ---------------------------------------------------------------------
  // 19. ALL 15 PRODUCT CATEGORIES
  // ---------------------------------------------------------------------
  productCategories: [
    {
      id: "cat-01",
      name: "Editorial Keepsake Magazines & Mini Magazines",
      slug: "magazine",
      shortTagline: "Wedding, Engagement, Anniversary & Baby Editions",
      description: "Custom-designed high-fashion bridal and couple story mini magazines. Available in 4 dedicated editions: Wedding Edition, Engagement Edition, Milestone Anniversary Edition, and Baby Arrival Edition. Styled with couture editorial typography, vows, photo spreads, and velvet ribbon spine binding.",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85",
      badge: "Signature Craft",
      customizationOptions: [
        "Choose your edition: Wedding, Engagement, Anniversary, or Baby Milestone",
        "Personalized couple cover design with custom headline & dates",
        "Curated 8-page narrative layout featuring up to 16 personal photos",
        "Bound with imported frayed silk velvet ribbon and botanical wax seal",
      ],
      suitableOccasions: ["Weddings", "Engagements", "Anniversaries", "Baby Arrival & Parenthood"],
      popularPairing: "Paired with Heirloom Botanical Photo Frame",
      sampleItems: [
        { title: "Wedding Edition Mini Magazine", detail: "Complete ceremony timeline, vows, couple interview & wedding portrait spreads." },
        { title: "Engagement Edition Mini Magazine", detail: "Proposal narrative, secret dating timeline, and romantic photo collages." },
        { title: "Anniversary Edition Mini Magazine", detail: "Reflecting on shared years with archival photo spreads and pressed rose petals." },
        { title: "Baby Milestone Edition Mini Magazine", detail: "Newborn footprints, arrival story, pregnancy memories & parenthood notes." },
      ],
    },
    {
      id: "cat-02",
      name: "Bespoke Artisanal & Bridal Bouquets",
      slug: "bouquets",
      shortTagline: "Couture bridal wedding bouquets & hand-tied floral wonders",
      description: "Handcrafted couture bridal bouquets for ceremonies, pre-wedding rituals, and anniversary milestones, alongside hand-tied poetic stem selections wrapped in archival parchment and bound with imported raw silk velvet ribbons.",
      imageUrl: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1200&q=85",
      badge: "Bridal Classic",
      customizationOptions: [
        "Couture bridal styling customized to match your wedding lehenga or gown palette",
        "Choice of living fresh dawn flowers or 3-year everlasting preserved florals",
        "Signature wax seal monogram and imported raw silk ribbon colors",
        "Handwritten botanical calligraphy message card included",
      ],
      suitableOccasions: ["Weddings & Receptions", "Engagements", "Anniversaries", "Proposals", "Grand Birthdays"],
      popularPairing: "Paired with Gourmet Artisan Chocolates or Celebration Card",
      sampleItems: [
        { title: "The Couture Heirloom Bridal Wedding Bouquet", detail: "Ecuadorian garden roses, butterfly ranunculus, and sweet peas draped in silk." },
        { title: "Pastel Meadow Reverie Bouquet", detail: "Soft lilac delphinium, blush peonies, and dancing sweet pea tendrils." },
      ],
    },
    {
      id: "cat-03",
      name: "Botanical & Baby Footprint Frames",
      slug: "photo-frames",
      shortTagline: "Baby footprints, photos & real preserved blooms in double-glass",
      description: "Treasured photographs and newborn baby footprints encased with genuine pressed garden roses, white larkspur, and delicate ferns. Sealed between double glass with solid teakwood, antique brass, or white lacquer borders.",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
      badge: "Newborn & Heirloom",
      customizationOptions: [
        "Newborn baby ink/clay footprint preservation with gilded birth details (date, time, weight)",
        "High-definition archival photo printing and color harmony",
        "Pressed dried floral arrangement matching your nursery or wedding palette",
        "Solid teakwood, antique brass, or white lacquer frame border",
      ],
      suitableOccasions: ["Baby Arrival & 1st Birthday", "Weddings", "Anniversaries", "Memorial Keepsakes"],
      popularPairing: "Paired with Baby Edition Mini Magazine or Desk Cloche",
      sampleItems: [
        { title: "Newborn Baby Footprint Botanical Frame", detail: "Real pressed flowers surrounding your baby's tiny footprint & gold foil birth stats." },
        { title: "Floating Double-Glass Wedding Frame", detail: "Real bridal petals suspended weightlessly around your ceremony portrait." },
      ],
    },
    {
      id: "cat-04",
      name: "Artisan Chocolate Bouquets",
      slug: "chocolate-bouquets",
      shortTagline: "Gourmet truffles blooming with Ecuadorian garden roses",
      description: "Gourmet Swiss and Belgian chocolate truffles (Ferrero Rocher, Lindt Lindor, artisan pralines) sculpted into blossoming floral arrangements wrapped in coffee-toned archival paper.",
      imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=85",
      badge: "Sweet Indulgence",
      customizationOptions: [
        "Choice of premium chocolate (Ferrero Rocher, Lindt, Dark Hazelnut)",
        "Fresh rose accent colors (Red Velvet, Apricot Nectar, White Cloud)",
        "Personalized wax monogram stamp and silk ribbon tails",
        "Hidden secret message card tucked between chocolate stems",
      ],
      suitableOccasions: ["Valentine's Day", "Birthdays", "Festive Celebrations", "Romantic Milestones"],
      popularPairing: "Paired with Handmade Flower Card",
      sampleItems: [
        { title: "The 24-Ferrero Golden Bloom Bouquet", detail: "Golden Ferrero spheres nestled inside a crown of ruby Ecuadorian roses." },
        { title: "Lindt Swiss Truffle & Blush Rose Bouquet", detail: "Smooth melting Lindt truffles nestled in apricot blush garden blooms." },
      ],
    },
    {
      id: "cat-05",
      name: "Three-Part Luxury Hampers (Men, Women & Dry Fruits)",
      slug: "hamper-boxes",
      shortTagline: "Curated across 3 suites: Men's Luxury, Women's Pampering & Royal Dry Fruits",
      description: "Our signature rigid keepsake velvet hamper boxes are curated into three distinct collections: Men's Luxury Grooming & Valet, Women's Indulgent Pampering & Preserved Blooms, and Royal Festive Dry Fruits with stuffed Medjool dates and organic honey.",
      imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85",
      badge: "VIP Luxury",
      customizationOptions: [
        "Select your curation: Men's Suite, Women's Suite, or Royal Dry Fruit Suite",
        "Velvet box exterior hue (Mulberry Wine, Sand Ivory, Midnight Forest Green)",
        "Gilded recipient name hand-lettered on the exterior box lid",
        "Custom milestone celebration card included with matching envelope",
      ],
      suitableOccasions: ["Diwali & Festive Gifting", "Grand Birthdays", "Corporate VIP Milestones", "Bridal Showers & Groomsmen"],
      popularPairing: "Paired with Celebration Milestone Card or Mini Magazine",
      sampleItems: [
        { title: "Men's Luxury Grooming & Cologne Hamper", detail: "Curated with artisan leather goods, fine men's fragrance, gourmet dark chocolates & wax-sealed note." },
        { title: "Women's Pampering & Botanical Hamper", detail: "Preserved garden roses, scented soy candle, French bath salts, silk accessories & artisanal truffles." },
        { title: "Royal Festive Afghan Dry Fruit Hamper", detail: "Imported jumbo almonds, Afghan pistachios, cashew nuts, stuffed Medjool dates & 24k edible gold leaf." },
      ],
    },
    {
      id: "cat-06",
      name: "Handmade Pipe Cleaner Bouquets, Keychains & Frames",
      slug: "pipe-cleaner-frames",
      shortTagline: "Everlasting chenille bouquets, bag keychains, kitchen decor & 3D shadowboxes",
      description: "Everlasting fuzzy velvet chenille blooms sculpted by hand into vibrant bouquets that never wilt, adorable floral keychains for handbags, charming cloche accents for kitchen and dining tables, and 3D shadowbox frames.",
      imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85",
      badge: "Handcrafted Art",
      customizationOptions: [
        "Select product style: Everlasting Bouquet, Bag Keychain, Kitchen Table Accent, or Shadowbox Frame",
        "Flower species selection: Pastel Tulips, Sunshine Daisies, English Roses, Bright Sunflowers",
        "Custom shadowbox frame color or wrapping parchment hue",
        "Handwritten personalized calligraphy lettering and quotes",
      ],
      suitableOccasions: ["Friendship Gifts", "Graduation Celebrations", "Kitchen & Home Styling", "Playful Birthday Gifts"],
      popularPairing: "Paired with Customized Phone Cover or Flower Card",
      sampleItems: [
        { title: "Everlasting Pipe Cleaner Bouquet", detail: "Hand-coiled chenille pastel tulips, daisies & sunflowers with velvet ribbon wrap." },
        { title: "Floral Chenille Keychains & Bag Charms", detail: "Miniature handmade pipe cleaner flower charms for keys, handbags & backpacks." },
        { title: "Kitchen & Dining Counter Floral Cloche", detail: "Charming everlasting chenille flowers nestled in miniature glass cloches for kitchen islands." },
        { title: "3D Chenille Botanical Shadowbox Frame", detail: "Tactile fuzzy floral arrangement mounted in wood shadowbox with calligraphy quote." },
      ],
    },
    {
      id: "cat-07",
      name: "Atelier Botanical Desk Decor",
      slug: "desk-decor",
      shortTagline: "Miniature glass cloches & floral paperweights for creative desks",
      description: "Miniature botanical glass cloches, preserved floral resin paperweights, and ceramic ikebana vessels crafted to bring daily calm and artistic inspiration to workspaces.",
      imageUrl: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1200&q=85",
      badge: "Workspace Muse",
      customizationOptions: [
        "Cloche base material: Hand-turned Walnut Wood or Brushed Antique Brass",
        "Preserved everlasting flower arrangement inside the glass dome",
        "Engraved miniature brass plaque with your personalized date or mantra",
        "Integrated botanical essential oil fragrance dropper option",
      ],
      suitableOccasions: ["New Job / Promotion", "Graduation", "Self-Care Moments", "Colleague Farewell"],
      popularPairing: "Paired with Customized Photo Frame",
      sampleItems: [
        { title: "The Enchanted Glass Botanical Cloche", detail: "A miniature world of dried delphinium, rosebuds and lichen under glass." },
        { title: "Crystal Floral Resin Cube Paperweight", detail: "Real suspended buttercup and gold foil frozen forever in crystal clarity." },
      ],
    },
    {
      id: "cat-08",
      name: "Real Pressed Flower Mobile Covers",
      slug: "mobile-covers",
      shortTagline: "Genuine garden petals and 24k gold leaf encased in resin",
      description: "Ultra-clear drop-resistant phone cases embedded with real garden petals, golden foil flakes, and delicate ferns encased in crystal resin. Each case is a 1-of-1 botanical original.",
      imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85",
      badge: "Wearable Nature",
      customizationOptions: [
        "Compatible with all phone models (iPhone, Samsung Galaxy, Pixel, OnePlus)",
        "Floral palette themes: Peach Blossom, Wild Sage & Daisy, Midnight Plum",
        "Personalized name or initials written in elegant gold foil calligraphy",
        "Embedded genuine 24k gold or silver leaf foil flakes",
      ],
      suitableOccasions: ["Birthdays", "Friendship Milestones", "Personal Treat", "Bridal Party Gifts"],
      popularPairing: "Paired with Pipe Cleaner Frame or Desk Flora",
      sampleItems: [
        { title: "Golden Ranunculus Crystal Case", detail: "Genuine pressed petals and floating gold leaf with shock-absorbing TPU sides." },
        { title: "Botanical Fern & Queen Anne's Lace Case", detail: "Delicate forest ferns and tiny white florets on crystal clear backing." },
      ],
    },
    {
      id: "cat-09",
      name: "Antique Vintage Botanical Frames",
      slug: "vintage-frames",
      shortTagline: "Ornate baroque frames holding preserved heirloom roses",
      description: "Sourced antique-finish ornate brass and baroque frames featuring dried heirloom garden roses, larkspur, and pressed foliage. Evoking Victorian glasshouse elegance.",
      imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85",
      badge: "Nostalgic Art",
      customizationOptions: [
        "Ornate baroque frame finish (Antique Gold, Verdigris Bronze, Champagne Gilded)",
        "Inclusion of your own preserved wedding bouquet petals upon request",
        "Handwritten poem excerpt, wedding vow, or anniversary date inscription",
        "Configured for antique tabletop easel display or wall hanging",
      ],
      suitableOccasions: ["Golden Anniversaries", "Wedding Vow Keepsakes", "Classical Art Lovers", "Housewarming"],
      popularPairing: "Paired with Pressed Flower Letter",
      sampleItems: [
        { title: "The Baroque Gilded Rose Frame", detail: "Deep dimensional frame displaying fully preserved dried garden rose blooms." },
        { title: "Victorian Pressed Herbarium Frame", detail: "Delicate pressed specimens arranged with vintage botanical label tags." },
      ],
    },
    {
      id: "cat-10",
      name: "Luminous Glitter Frames",
      slug: "glitter-frames",
      shortTagline: "Radiant shadowboxes with floating sparkles and crystals",
      description: "Sensory shadowbox frames filled with shimmering floating glitter particles, crystal glass chips, and vibrant preserved blooms that catch the sunlight with enchanting radiance.",
      imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85",
      badge: "Radiant Shimmer",
      customizationOptions: [
        "Glitter tint: Champagne Gold, Rose Quartz, Iridescent Holographic, Pearl",
        "Personalized photo placement with floating crystal glass chips",
        "Integrated warm LED fairy light illumination switch option",
        "Frame border finish: Mirrored Silver, Gilded Rose Gold, or Satin White",
      ],
      suitableOccasions: ["Milestone Birthdays (18th, 21st, 25th)", "Bachelorette Celebrations", "Festive Celebrations"],
      popularPairing: "Paired with Chocolate Bouquet",
      sampleItems: [
        { title: "Floating Rose Gold Shimmer Frame", detail: "Liquid-suspended glitter that flows gracefully around your favorite photo." },
        { title: "Luminous Starlight Shadowbox", detail: "Backlit fairy lights illuminating crystal glass chips and preserved pink petals." },
      ],
    },
    {
      id: "cat-11",
      name: "Artisanal Decorative Flower Baskets",
      slug: "decorative-baskets",
      shortTagline: "Handwoven rustic baskets spilling with meadow blooms",
      description: "Hand-woven willow, rattan, and seagrass baskets artfully arranged with loose, breathing meadow blooms, trailing eucalyptus, and silk ribbon tails. Perfect for grand tables and ceremonies.",
      imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85",
      badge: "Rustic Elegance",
      customizationOptions: [
        "Basket style: French Market Willow, Round Rattan Tote, Seagrass Caddy",
        "Selection of fresh dawn blossoms or everlasting dried meadow flora",
        "Personalized engraved wooden keepsake tag with recipient's name",
        "Optional addition of artisanal organic honey jar or scented candle",
      ],
      suitableOccasions: ["Weddings & Welcome Baskets", "Festive Gifting", "Grand Mother's Day Celebrations", "Housewarming"],
      popularPairing: "Paired with Personalized Wax-Sealed Letter",
      sampleItems: [
        { title: "The Provençal Meadow Basket", detail: "Rustic willow basket filled with chamomile, garden roses, and wild grasses." },
        { title: "The Bridal Welcome Basket", detail: "Curated with wedding morning essentials, floral sprigs, and silk ribbons." },
      ],
    },
    {
      id: "cat-12",
      name: "Handmade Flower Cards, Polaroid Prints & Ring Albums",
      slug: "flower-cards",
      shortTagline: "Handmade cotton cards, retro Polaroid prints & keepsake ring albums",
      description: "Preserve memories in physical, touchable art: custom printed vintage Polaroid photos, ring-bound keepsake Polaroid photo albums with pressed botanicals, and heavyweight handmade deckle-edge pressed flower cards.",
      imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85",
      badge: "Pure Sentiment",
      customizationOptions: [
        "Choose format: Milestone Polaroid Ring Album, Retro Polaroid Prints, or Botanical Wax-Sealed Card",
        "Custom photo selection (up to 40 vintage Polaroid prints with date captions)",
        "Deckle-edge handmade cotton paper with genuine pressed petals",
        "Sealed with authentic melted botanical wax stamp & raw silk ribbon ties",
      ],
      suitableOccasions: ["Anniversaries & Dating Milestones", "Weddings & Proposals", "Heartfelt Thank You", "Romantic Keepsakes"],
      popularPairing: "Paired with Signature Bouquet or Hamper Box",
      sampleItems: [
        { title: "Milestone Polaroid Ring-Bound Album", detail: "Handmade ring album with 20-40 Polaroid prints, pressed flower accents & silk tie." },
        { title: "Bespoke Retro Polaroid Photo Prints", detail: "Vintage mini photo prints with handwritten dates, captions, and pressed petals." },
        { title: "Deckle-Edge Botanical Wax-Sealed Card", detail: "Raw torn cotton paper with pressed pansy petals and gold ink calligraphy." },
      ],
    },
    {
      id: "cat-13",
      name: "Customized Combo Gift Suites",
      slug: "combo-gifts",
      shortTagline: "Multi-item curated collections designed for unforgettable moments",
      description: "Multi-layered curation combining 3 to 5 atelier creations into a cohesive gift suite—such as matching photo frame, signature bouquet, scented soy candle, and confectionery.",
      imageUrl: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=85",
      badge: "Ultimate Curation",
      customizationOptions: [
        "Complete bespoke mixology of any 2 to 5 atelier categories",
        "Unified aesthetic color & fragrance palette across all items",
        "Monogrammed luxury presentation packaging with satin bow",
        "One-on-one direct curation consultation with Jensi Dholariya",
      ],
      suitableOccasions: ["Milestone Birthdays", "Grand Anniversaries", "Bridal Proposals", "VIP Corporate Gifting"],
      popularPairing: "Comprehensive all-in-one gift experience",
      sampleItems: [
        { title: "The Sovereign Romance Suite", detail: "Signature Bouquet + Botanical Photo Frame + Artisan Chocolates + Wax Card." },
        { title: "The Modern Creative Suite", detail: "Desk Cloche + Custom Mobile Cover + Pipe Cleaner Frame + Note." },
      ],
    },
    {
      id: "cat-14",
      name: "Deluxe Chocolate Floral Arrangements",
      slug: "chocolate-arrangements",
      shortTagline: "Confectionery towers and velvet boxes with premium roses",
      description: "Lavish confectionery displays presenting tiers of imported truffles nestled among fresh Ecuadorian roses and hydrangeas inside velvet-lined circular or hexagonal atelier boxes.",
      imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=85",
      badge: "Sensory Delight",
      customizationOptions: [
        "Box architecture: Circular Hatbox, Hexagonal Velvet Tray, Heart Keepsake",
        "Tiered chocolate selection (Ferrero Rocher, Lindt, Godiva, Dark Truffles)",
        "Garden rose color harmony (Classic Scarlet, Ivory Silk, Peach Glow)",
        "Gilded foil lid message printed with recipient's name or milestone",
      ],
      suitableOccasions: ["Valentine's Day", "Festive Celebrations", "Luxury Dinner Centerpieces", "Proposal Sweets"],
      popularPairing: "Paired with Celebration Card",
      sampleItems: [
        { title: "The 36-Piece Velvet Rose & Truffle Tower", detail: "Circular tiered velvet box with Ecuadorian red roses and gold Ferrero spheres." },
        { title: "The Hexagonal Chocolate Garden Tray", detail: "Geometric velvet tray with mixed pralines, fresh blooms, and custom ribbon." },
      ],
    },
    {
      id: "cat-15",
      name: "Archival Celebration & Milestone Cards",
      slug: "celebration-cards",
      shortTagline: "Grand-format luxury cards with hot-foil stamping and wax seals",
      description: "Statement-sized celebration cards crafted from archival linen paper, layered parchment, hot-foil stamping, and sealed with authentic botanical wax seals.",
      imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
      badge: "Statement Stationery",
      customizationOptions: [
        "Milestone number customized (1st, 18th, 21st, 25th, 50th, 60th)",
        "Custom printed long-form personal letter or wedding speech insert",
        "Imported velvet ribbon bookmark accent and wax seal monogram",
        "Includes protective handcrafted presentation keepsake folio",
      ],
      suitableOccasions: ["Weddings", "Significant Anniversaries", "Retirement", "Graduation"],
      popularPairing: "Paired with Hamper Box or Flower Basket",
      sampleItems: [
        { title: "The Gilded 25th Silver Anniversary Folio", detail: "Layered vellum and handmade cotton paper with silver foil typography." },
        { title: "The Monumental Birthday Milestone Card", detail: "A4 luxury presentation card with dried baby's breath sprig and wax seal." },
      ],
    },
  ] as ProductCategoryItem[],

  // ---------------------------------------------------------------------
  // 20. OCCASION-BASED COLLECTIONS
  // ---------------------------------------------------------------------
  occasionCollections: {
    eyebrow: "MOMENTS THAT MATTER",
    title: "Gifts for Every Occasion",
    subtitle: "Curated Floral & Artisan Creations Tailored to Life's Chapters",
    description: "Every celebration possesses its own emotional cadence. Select an occasion below to discover handpicked combinations, botanical palettes, and custom gifts crafted to leave an indelible impression.",
    occasions: [
      {
        id: "occ-birthday",
        name: "Birthday Gifts",
        subtitle: "Vibrant Celebrations of Another Golden Year",
        description: "Joyful bursts of sunshine blooms, sweet chocolate bouquets, sparkling glitter frames, and personalized mobile covers that celebrate their unique individuality.",
        imageUrl: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["chocolate-bouquets", "hamper-boxes", "mobile-covers", "glitter-frames"],
        curatedIdea: "Artisan Chocolate Bouquet + Real Pressed Flower Mobile Cover",
        botanicalMood: "Marigold, Peach Blossom & Sweet Apricot",
      },
      {
        id: "occ-anniversary",
        name: "Anniversary Gifts",
        subtitle: "Honoring Enduring Love & Shared Milestones",
        description: "Preserved heirloom memory frames capturing wedding moments, bespoke editorial love story magazines, and everlasting floral arrangements that never wilt.",
        imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["magazine", "photo-frames", "vintage-frames", "bouquets"],
        curatedIdea: "Editorial Love Story Magazine + Botanical Photo Frame",
        botanicalMood: "Velvet Crimson, Champagne Antike & Ivory Silk",
      },
      {
        id: "occ-valentines",
        name: "Valentine's Day Gifts",
        subtitle: "Deep Romantic Nuance & Confectionery Poetry",
        description: "Lavish scarlet rose bouquets wrapped in velvet ribbon, tiered chocolate arrangements, and wax-sealed love letters designed to make their heart skip a beat.",
        imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["bouquets", "chocolate-bouquets", "chocolate-arrangements", "magazine"],
        curatedIdea: "Deluxe Chocolate Floral Tower + Hand-Penned Wax Sealed Letter",
        botanicalMood: "Ecuadorian Red Rose, Truffle Cocoa & Mulberry Wine",
      },
      {
        id: "occ-friendship",
        name: "Friendship Gifts",
        subtitle: "Cherishing the People Who Make Life Brighter",
        description: "Whimsical 3D pipe cleaner frames, pressed flower phone cases, and delicate handmade cards filled with warmth, nostalgia, and gratitude.",
        imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["pipe-cleaner-frames", "mobile-covers", "flower-cards", "desk-decor"],
        curatedIdea: "Tactile Pipe Cleaner Frame + Pressed Petal Mobile Case",
        botanicalMood: "Daisy Sunshine, Baby's Breath & Pastel Lilac",
      },
      {
        id: "occ-proposal",
        name: "Proposal Gifts",
        subtitle: "The Unforgettable Beginning of Forever",
        description: "Monumental meadow flower baskets with hidden ring compartments, bespoke magazines asking the question, and preserved eternal roses commemorating the 'Yes'.",
        imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["magazine", "decorative-baskets", "bouquets", "vintage-frames"],
        curatedIdea: "Custom 'Will You?' Editorial Magazine + Secret Compartment Floral Basket",
        botanicalMood: "Pure Ivory Peonies, White Ranunculus & Gold Sparkles",
      },
      {
        id: "occ-wedding",
        name: "Wedding Gifts",
        subtitle: "Heirloom Keepsakes for the Happy Couple",
        description: "Post-wedding bridal bouquet preservation frames, grand luxury celebration hampers, and archival wedding vow displays that will be treasured for generations.",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["photo-frames", "hamper-boxes", "celebration-cards", "vintage-frames"],
        curatedIdea: "Preserved Bridal Petal Double-Glass Frame + Luxury Atelier Hamper",
        botanicalMood: "Heirloom Garden Roses, White Delphinium & Gold Leaf",
      },
      {
        id: "occ-graduation",
        name: "Graduation Gifts",
        subtitle: "Celebrating Hard Work, Ambition & New Beginnings",
        description: "Inspiring desk decor cloches, cheerful pipe cleaner flower shadowboxes, and grand milestone cards honoring their academic milestone with artistic flair.",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["desk-decor", "pipe-cleaner-frames", "celebration-cards", "bouquets"],
        curatedIdea: "Botanical Desk Cloche with Engraved Brass Nameplate + Bouquet",
        botanicalMood: "Bright Sunflower Yellow, Royal Purple & Crisp Fern",
      },
      {
        id: "occ-festive",
        name: "Festive Gifts",
        subtitle: "Spreading Warmth, Joy & Abundance Across Festivals",
        description: "Artisanal woven decorative baskets, gourmet chocolate floral trays, and luxury hamper boxes curated for Diwali, New Year, and festive family reunions.",
        imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["hamper-boxes", "decorative-baskets", "chocolate-arrangements", "bouquets"],
        curatedIdea: "Grand Festive Wicker Basket with Scented Candle, Blooms & Truffles",
        botanicalMood: "Warm Ochre, Marigold Gold, Terracotta & Dried Herbs",
      },
      {
        id: "occ-justbecause",
        name: "Just Because Gifts",
        subtitle: "Spontaneous Gestures of Unconditional Care",
        description: "Because no reason is the best reason. Surprise someone on an ordinary Tuesday with a miniature desk cloche, a sweet flower card, or a petite bouquet.",
        imageUrl: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["flower-cards", "desk-decor", "pipe-cleaner-frames", "mobile-covers"],
        curatedIdea: "Pressed Petal Deckle Card + Miniature Botanical Desk Cloche",
        botanicalMood: "Dancing Sweet Pea, Wild Mint & Chamomile",
      },
      {
        id: "occ-personalized",
        name: "Personalized Memory Gifts",
        subtitle: "Preserving Moments You Never Want to Forget",
        description: "Gifts embedded with your actual memories—photographs, dates, preserved petals from an event, and custom calligraphy that transform fleeting time into art.",
        imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=85",
        recommendedCategories: ["photo-frames", "vintage-frames", "magazine", "celebration-cards"],
        curatedIdea: "Custom Date Inscribed Double-Glass Botanical Memory Frame",
        botanicalMood: "Antique Lavender, Dried Hydrangea & Pressed Rose Petals",
      },
    ] as OccasionItem[],
  },

  // ---------------------------------------------------------------------
  // 21. CREATIVE COMBO COLLECTIONS
  // ---------------------------------------------------------------------
  comboCollections: {
    eyebrow: "HARMONIOUS GIFT SUITES",
    title: "Creative Combo Collections",
    subtitle: "Artfully Paired Creations Designed to Complement Each Other",
    description: "Experience the magic of thoughtful pairing. We have combined our most sought-after creations into harmonious gift sets, ensuring your gesture feels complete, luxurious, and deeply personal.",
    combos: [
      {
        id: "combo-1",
        title: "The Classic Romance Suite",
        subtitle: "Signature Bouquet + Gourmet Artisan Chocolates",
        itemsIncluded: ["Fresh or Preserved Floral Bouquet", "Box of 16 Imported Ferrero Rocher or Lindt Truffles", "Silk Velvet Ribbon Binding", "Wax-Sealed Message Card"],
        pairingDescription: "The timeless elegance of fragrant Ecuadorian blooms paired with the melt-in-mouth luxury of artisan confections. The ultimate romantic gesture that appeals to both sight and taste.",
        whyItsSpecial: "Harmonized color tones between the chocolate packaging, parchment wrap, and flower petals for breathtaking unboxing aesthetics.",
        imageUrl: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=1200&q=85",
        badge: "Most Popular Combo",
        idealFor: "Valentine's Day, Romantic Anniversaries, Birthday Surprises",
      },
      {
        id: "combo-2",
        title: "The Love Story Archival Keepsake",
        subtitle: "Editorial Magazine + Botanical Photo Frame",
        itemsIncluded: ["Custom 8-Page Couple Story Magazine", "Double-Glass Pressed Flower Teak Frame with Photo", "Presentation Gift Box with Wax Seal"],
        pairingDescription: "A couture editorial magazine that narrates your love story in high-fashion print, paired with a physical wooden and glass botanical frame holding your most cherished portrait.",
        whyItsSpecial: "Turns fleeting digital photos into an enduring, physical heirloom collection that sits with pride on your coffee table and bedside.",
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
        badge: "Couple's Keepsake",
        idealFor: "Weddings, 1st & 5th Anniversaries, Proposal Keepsakes",
      },
      {
        id: "combo-3",
        title: "The Grand Milestone Celebration",
        subtitle: "Luxury Hamper Box + Archival Celebration Card",
        itemsIncluded: ["Velvet Rigid Hamper Box with Gilded Lid Name", "Scented Soy Wax Candle", "Preserved Floral Bouquet", "Confectionery Selection", "Large-Format Wax-Sealed Milestone Card"],
        pairingDescription: "A multi-sensory unboxing revelation. The recipient lifts the personalized velvet lid to discover fragrant blooms, soothing candlelight, gourmet treats, and an emotional handwritten milestone letter.",
        whyItsSpecial: "Full sensory engagement: sight, touch, fragrance, and taste combined into one unforgettable celebration box.",
        imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85",
        badge: "Ultimate VIP Suite",
        idealFor: "Grand Birthdays, Corporate Milestones, Bridal Shower",
      },
      {
        id: "combo-4",
        title: "Sweet Whispers Botanical Suite",
        subtitle: "Chocolate Bouquet + Handmade Flower Card",
        itemsIncluded: ["Hand-Tied Chocolate Truffle Floral Bouquet", "Handmade Cotton Deckle-Edge Flower Card", "Custom Ink Calligraphy Lettering"],
        pairingDescription: "A playful, sweet bouquet where chocolate truffles bloom like flowers, accompanied by a genuine deckle-edge cotton card adorned with delicately pressed real petals and handwritten words.",
        whyItsSpecial: "Combines immediate delicious confectionery joy with a sentimental card that is kept in scrapbooks and journals forever.",
        imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1200&q=85",
        badge: "Playful & Sweet",
        idealFor: "Birthdays, Best Friend Celebrations, Cheer-Up Surprises",
      },
      {
        id: "combo-5",
        title: "The Provençal Garden Greeting",
        subtitle: "Woven Flower Basket + Personalized Wax-Sealed Message",
        itemsIncluded: ["Handwoven Natural Willow / Rattan Basket", "Bountiful Fresh or Dried Meadow Flora Arrangement", "Engraved Wooden Monogram Tag", "Parchment Letter Sealed with Botanical Wax"],
        pairingDescription: "A rustic yet refined French-style flower basket overflowing with loose, airy garden blooms. Paired with an authentic wax-sealed personal letter resting gently among the petals.",
        whyItsSpecial: "The basket serves as an enduring home decor accent long after the celebration, adding timeless warmth to any room.",
        imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=85",
        badge: "Rustic Luxury",
        idealFor: "Housewarming, Mother's Day, Wedding Welcome Gifts",
      },
      {
        id: "combo-6",
        title: "The Daily Creative Muse",
        subtitle: "Customized Photo Frame + Botanical Desk Decor",
        itemsIncluded: ["Custom Dried Floral Photo Frame", "Miniature Botanical Glass Cloche with Wooden Base", "Matching Floral Color Temperature"],
        pairingDescription: "Elevate your favorite person's daily sanctuary or workspace. Includes an everlasting floral photo frame to keep memories close, paired with an enchanting glass cloche of preserved flora.",
        whyItsSpecial: "Brings nature's serene grounding energy and personal connection into daily study or office life.",
        imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85",
        badge: "Workspace Haven",
        idealFor: "New Job, Graduation, Study Desk Inspiration, Self-Care",
      },
    ] as ComboCollectionItem[],
  },

  // ---------------------------------------------------------------------
  // 22. CRAFTSMANSHIP & BRAND STORY
  // ---------------------------------------------------------------------
  craftsmanship: {
    handmadeWithLove: {
      eyebrow: "THE ATELIER PROMISE",
      title: "Handmade with Love",
      subtitle: "Every Single Bloom Pressed, Arranged & Sculpted by Hand",
      description: "At THE PETAL MUSE, we do not believe in mass production or cold assembly lines. Every flower frame, chocolate bouquet, and wax-sealed letter is individually crafted by our master floral artisans in Gujarat with painstaking care and genuine love.",
      highlights: [
        { title: "Individual Stem Inspection", detail: "Every petal is inspected for color depth, vascular integrity, and natural grace." },
        { title: "Zero Synthetic Adhesives on Petals", detail: "We preserve botanical delicacy using organic plant-safe drying and setting techniques." },
        { title: "Traditional Heated Wax Seals", detail: "Every package is hand-stamped with genuine heated botanical wax and custom seal dies." },
        { title: "Imported Raw Silk & Velvet Ribbons", detail: "Finished with luxurious hand-frayed silk and rich double-faced velvet ribbons." },
      ],
      imageUrl: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1200&q=85",
    },
    personalizedGifts: {
      eyebrow: "TAILORED TO YOUR HEART",
      title: "Personalized Gifts",
      subtitle: "Transforming Your Memories Into Lifelong Botanical Art",
      description: "No two relationships are identical, and no two gifts should be. We work closely with you via WhatsApp to customize every detail: your personal photos, favorite songs, significant dates, handwritten vows, and recipient's favorite flower varieties.",
      steps: [
        { step: "01", title: "Share Your Vision", detail: "Send us your photos, message, occasion, and preferred colors on WhatsApp." },
        { step: "02", title: "Curated Moodboard Preview", detail: "Jensi creates a tailored design concept matching flowers and layout to your taste." },
        { step: "03", title: "Handcrafted Atelier Production", detail: "Our studio brings the piece to life with museum-grade preservation." },
        { step: "04", title: "Luxury Archival Delivery", detail: "Packaged like fine jewelry and delivered safely to their doorstep." },
      ],
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
    },
    ourCreativeWorld: {
      eyebrow: "OUR CREATIVE WORLD",
      title: "Where Botanical Art Meets High Fashion",
      quote: "Flowers are not mere decorations. They are fleeting sculptures of time, emotion, and human tenderness.",
      narrative: [
        "Founded by Jensi Dholariya, THE PETAL MUSE was born from a desire to reinvent how flowers and gifts are experienced. We wanted to move beyond generic wrapping and create pieces that people preserve for decades.",
        "From our signature bridal love story magazines to intricate pressed flower phone cases and monumental floating floral clouds, our studio operates as a laboratory of beauty. Every material—from Italian deckle paper to Ecuadorian roses—is chosen with reverence.",
      ],
      imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=85",
    },
    whyChooseUs: {
      eyebrow: "WHY CHOOSE THE PETAL MUSE",
      title: "The Atelier Standard of Excellence",
      subtitle: "Why Discerning Clients Entrust Their Greatest Moments to Us",
      pillars: [
        {
          icon: "Sparkles",
          title: "100% Handcrafted Exclusivity",
          description: "Every frame, bouquet, and hamper is uniquely sculpted. No mass-market replicas—your gift is a true one-of-a-kind original.",
        },
        {
          icon: "Flower",
          title: "Everlasting 3-Year Preserved Florals",
          description: "We use museum-grade botanical preservation that keeps natural rose petals soft, supple, and vibrant for years without watering.",
        },
        {
          icon: "MessageCircle",
          title: "Bespoke 1-on-1 WhatsApp Consultation",
          description: "Consult directly with founder Jensi Dholariya to tailor custom messages, color palettes, and photo placements to perfection.",
        },
        {
          icon: "ShieldCheck",
          title: "Archival Packaging & Heated Wax Seals",
          description: "Presented in rigid keepsake velvet and coffee paper boxes finished with hand-stamped wax seals and imported silk ribbons.",
        },
        {
          icon: "Truck",
          title: "Safe Express & Worldwide Delivery",
          description: "Meticulous protective packaging ensures delicate botanical frames, cloches, and hampers arrive in flawless exhibition condition.",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // 16. FOOTER & CREDITS
  // ---------------------------------------------------------------------
  customerReviewsSection: {
    eyebrow: "VERIFIED PATRON EXPERIENCES",
    title: "LOVE STORIES & REVIEWS",
    subtitle: "Real Gifting Moments by THE PETAL MUSE",
    description: "Every keepsake we sculpt becomes a part of someone's treasured memory. Read genuine reflections from patrons who surprised their partners, commemorated milestones, and celebrated love with our creations.",
    stats: [
      { label: "Client Satisfaction", value: "5.0 ★" },
      { label: "Custom Keepsakes Gifted", value: "500+" },
      { label: "Cities Delivered Across", value: "28+" },
    ],
    reviews: [
      {
        id: "rev-01",
        name: "Aarav & Riya Mehta",
        location: "Surat, Gujarat",
        occasion: "1st Wedding Anniversary",
        giftedItem: "The Editorial Love Story Mini Magazine + Botanical Frame",
        rating: 5,
        quote: "I gifted the custom anniversary mini magazine to my husband on our 1st anniversary dinner. He was genuinely speechless! The editorial layout, the vows printed so elegantly, and the wax seal on the velvet spine made it feel like a luxury Vogue issue dedicated entirely to our story. Jensi did an incredible job!",
        photoUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
        verified: true,
        date: "October 2024",
      },
      {
        id: "rev-02",
        name: "Pooja & Hardik Patel",
        location: "Ahmedabad, Gujarat",
        occasion: "Baby Arrival & 1st Milestone",
        giftedItem: "The Newborn Baby Footprint Botanical Frame",
        rating: 5,
        quote: "We ordered the baby footprint frame with pressed baby's breath for our newborn daughter Anya. The gold lettering with her birth time and weight looks ethereal between the floating double glass. It is already hanging in our nursery as our most prized possession.",
        photoUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
        verified: true,
        date: "September 2024",
      },
      {
        id: "rev-03",
        name: "Kavya & Rohan Shah",
        location: "Vadodara / Mumbai",
        occasion: "Milestone Proposal Keepsake",
        giftedItem: "Milestone Polaroid Ring Album & Prints",
        rating: 5,
        quote: "For my fiancé, I wanted something beyond ordinary gifts. The vintage ring-bound Polaroid album with dried rose petals pressed on every page made him cry happy tears. 30 of our favorite memories bound in raw silk ribbon. Best keepsake ever!",
        photoUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
        verified: true,
        date: "November 2024",
      },
      {
        id: "rev-04",
        name: "Dr. Neha D. & Kunal",
        location: "Rajkot, Gujarat",
        occasion: "Royal Festive & Family Surprise",
        giftedItem: "Triple-Tier Luxury Hamper (Dry Fruit & Pampering Edition)",
        rating: 5,
        quote: "We ordered the 3-part hampers for Diwali gifting to our close family. The velvet box texture, the hand-lettered names in gold calligraphy, and the combination of organic Afghan dry fruits and scented candles set a new benchmark for luxury gifting.",
        photoUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
        verified: true,
        date: "October 2024",
      },
      {
        id: "rev-05",
        name: "Sneha Trivedi",
        location: "Surat, Gujarat",
        occasion: "Best Friend's Bridal Shower",
        giftedItem: "Everlasting Pipe Cleaner Sunflower Bouquet & Keychain",
        rating: 5,
        quote: "My best friend is obsessed with sunflowers, so I surprised her with the tactile pipe cleaner bouquet and matching keychain for her bridal shower bag. She loves that it will never wilt and looks so delightfully fluffy and cute on her kitchen dining counter!",
        photoUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
        verified: true,
        date: "August 2024",
      },
      {
        id: "rev-06",
        name: "Devanshi & Siddharth Joshi",
        location: "Vadodara, Gujarat",
        occasion: "Wedding Ceremony & Reception",
        giftedItem: "The Couture Heirloom Bridal Wedding Bouquet",
        rating: 5,
        quote: "Jensi customized my bridal wedding bouquet to complement my pastel lehenga perfectly. The Ecuadorian garden roses and flowing raw silk ribbon looked breathtaking in our wedding photographs. Everyone at the reception was asking where we got it!",
        photoUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
        verified: true,
        date: "July 2024",
      },
    ] as CustomerReview[],
  },

  // ---------------------------------------------------------------------
  // 17. FOOTER & CREDITS
  // ---------------------------------------------------------------------
  footer: {
    marqueeText: "THE PETAL MUSE • CREATING BEAUTY IN EVERY DETAIL • FLOWERS REIMAGINED • BOTANICAL ARTISTRY • ",
    tagline: "An international floral atelier sculpting living poetry for extraordinary spaces.",
    copyrightNotice: `© ${new Date().getFullYear()} THE PETAL MUSE. All rights reserved.`,
    credits: "Creative Direction & Floral Design by Jensi Dholariya",
    developerCredit: "Website Developed by Jay Dholariya",
    developerUrl: "https://in.linkedin.com/in/jaydholariyaa",
  },

  // ---------------------------------------------------------------------
  // 17. SEO METADATA & SCHEMA
  // ---------------------------------------------------------------------
  seo: {
    siteTitle: "THE PETAL MUSE | Luxury Floral Design & Botanical Artistry",
    siteDescription: "THE PETAL MUSE by Jensi Dholariya. An immersive floral atelier crafting bespoke botanical installations, poetic bridal styling, and luxury dining tablescapes.",
    siteKeywords: [
      "THE PETAL MUSE",
      "Jensi Dholariya",
      "Luxury floral designer",
      "Bespoke wedding florals",
      "Floral installations",
      "Editorial botanical styling",
      "Tablescape floral design",
      "Luxury florist India",
      "Floral atelier",
    ],
    siteUrl: "https://thepetalmuse.com",
    ogImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  },
};
