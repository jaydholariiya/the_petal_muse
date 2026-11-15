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

export const SITE_CONTENT = {
  // ---------------------------------------------------------------------
  // 1. BRAND & IDENTITY
  // ---------------------------------------------------------------------
  brand: {
    name: "THE PETAL MUSE",
    owner: "Jensi Dholariya",
    role: "Founder & Creative Botanical Director",
    tagline: "Flowers, reimagined.",
    subtagline: "Creating Beauty in Every Detail.",
    statement: "An artistic expression of nature, beauty, and thoughtful floral design.",

    // Official Instagram profile
    instagramHandle: "@the.petalmusee",
    instagramUrl: "https://www.instagram.com/the.petalmusee/",

    // Contact Information (Owner placeholders until verified)
    whatsappNumber: "ADD_PHONE_HERE", 
    contactEmail: "ADD_EMAIL_HERE",
    location: "ADD_LOCATION_HERE", 
    locationDisplay: "Gujarat, India | Available for destination projects worldwide",

    // Logo configuration: Leave empty to show the elegant display mark, or set to "/logo.png" when you place your logo in /public
    logoPath: "",

    // Philosophy & Story
    philosophyHeadline: "Every bloom has a story.",
    philosophyQuote: "Nature has its own language. We create its expression.",
    brandStory: [
      "Founded by Jensi Dholariya, THE PETAL MUSE was conceived as an intersection of botanical art and high-fashion editorial aesthetics.",
      "We believe floral design transcends traditional decoration. Each stem is treated as a sculptural stroke, honoring its natural curvature, transient fragility, and evocative presence.",
      "From monumental architectural installations to intimate bridal florals and bespoke sensory tablescapes, our atelier curates moments of quiet wonder and unforgettable elegance."
    ],

    stats: [
      { label: "Bespoke Creations", value: "150+" },
      { label: "Curated Botanicals", value: "80+" },
      { label: "Heirloom Moments", value: "100%" },
    ],
  },

  // ---------------------------------------------------------------------
  // 2. HERO SECTION ("DAWN BLOOM")
  // ---------------------------------------------------------------------
  hero: {
    eyebrow: "CREATIVE FLORAL ATELIER",
    headlineLine1: "Flowers,",
    headlineLine2: "reimagined.",
    description: "An artistic expression of nature, beauty, and thoughtful floral design. Sculpting living wonders for life's most unforgettable chapters.",
    ctaPrimary: "EXPLORE THE COLLECTION",
    ctaSecondary: "DESIGN YOUR MOOD",
    backgroundImage: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=2400&q=90",
    badgeText: "EST. 2024 • THE PETAL MUSE",
    scrollHint: "SCROLL TO WITNESS THE BLOOM",
  },

  // ---------------------------------------------------------------------
  // 3. EDITORIAL INTRODUCTION ("MORNING LIGHT")
  // ---------------------------------------------------------------------
  intro: {
    eyebrow: "THE ATELIER PHILOSOPHY",
    quoteLarge: "Nature has its own language. We create its expression.",
    narrative: "We observe the silent poetry of blossoms—the way a petal unfurls under dawn light, the dramatic arch of a wild branch, the harmonious contrast of raw textures and velvet petals. Here, floristry becomes high art.",
    signatureName: "Jensi Dholariya",
    signatureTitle: "Founder & Creative Director",
    portraitImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    detailImage: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1200&q=85",
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
      posterUrl: "https://images.unsplash.com/photo-1545232979-fbf68fe9b1a2?auto=format&fit=crop&w=800&q=85",
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
  // 13. SERVICES: "OUR FLORAL CRAFT" ("SUNSET MOOD")
  // ---------------------------------------------------------------------
  services: [
    {
      id: "serv-01",
      slug: "bespoke-installations",
      title: "Bespoke Floral Installations",
      subtitle: "Architectural & Atmospheric Scenography",
      description: "Monumental botanical structures sculpted for luxury weddings, galas, brand pavilions, and private residences. We harmonize scale, light, and organic gravity to transform physical environments.",
      imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Spatial 3D floral scenography & architectural concept",
        "Sustainably sourced heirloom stems & foraged textures",
        "Master structural engineering, rigging & on-site sculpting",
        "Eco-conscious floral repurposing & post-event donation",
      ],
      enquiryType: "Large-Scale Floral Installation",
    },
    {
      id: "serv-02",
      slug: "bridal-editorial",
      title: "Bridal & Editorial Floral Styling",
      subtitle: "Poetic & Nuanced Botanical Storytelling",
      description: "Personal florals celebrating the individuality of every stem. From fluid organic bridal bouquets draped in imported raw silk ribbons to high-fashion editorial set styling.",
      imageUrl: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Signature organic, free-flowing bridal bouquet design",
        "Botanical boutonnieres, floral hair jewellery & cuffs",
        "Fashion editorial & luxury brand campaign set styling",
        "One-on-one moodboard curation with Jensi Dholariya",
      ],
      enquiryType: "Bridal & Editorial Florals",
    },
    {
      id: "serv-03",
      slug: "tablescapes-dining",
      title: "Tablescapes & Dining Atmospheres",
      subtitle: "Sensory Centerpieces & Ambient Detailing",
      description: "Transforming dinner tables into sensory landscapes. Handcrafted artisanal ceramics, tapered beeswax candles, textured linen drapes, and seasonal botanicals woven together.",
      imageUrl: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Low-profile floral sculpting ensuring open conversation sightlines",
        "Curated artisanal candle styling & custom ceramic vessel sourcing",
        "Bespoke individual place setting botanical accents",
        "Color temperature harmonization with venue lighting",
      ],
      enquiryType: "Tablescapes & Private Dining",
    },
    {
      id: "serv-04",
      slug: "signature-gifting",
      title: "Signature Muse Floral Gifting",
      subtitle: "Curated Bouquets & Heirloom Boxes",
      description: "Artisanal floral gifts for milestone moments. Each bespoke bouquet is wrapped in our signature coffee & aubergine archival paper, finished with imported velvet ribbon and wax stamp.",
      imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Weekly curated heirloom stems & seasonal rarities",
        "Luxury presentation packaging with signature wax seal",
        "Handwritten botanical calligraphy message card",
        "White-glove private courier delivery service",
      ],
      enquiryType: "Signature Floral Gifting",
    },
  ] as ServiceItem[],

  // ---------------------------------------------------------------------
  // 14. INSTAGRAM JOURNAL ("FROM OUR INSTAGRAM JOURNAL")
  // ---------------------------------------------------------------------
  journal: [
    {
      id: "post-01",
      imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=85",
      caption: "Quiet poetry in ivory and caramel tones. Every stem placed with intention. ✨ @the.petalmusee",
      date: "Recent Atelier Work",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-02",
      imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=85",
      caption: "The beauty of delicate garden roses draped in morning light for an intimate celebration.",
      date: "Editorial Journal",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-03",
      imageUrl: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=800&q=85",
      caption: "Behind the scenes: sculpting organic shapes with foraged branches and imported blooms.",
      date: "Studio Moments",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-04",
      imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=85",
      caption: "Warm cappuccino notes, lisianthus, and dried textural foliage. Hand-wrapped with love.",
      date: "Signature Stem",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-05",
      imageUrl: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=800&q=85",
      caption: "An ethereal aisle installation that breathes with the wind. Where romance meets modernism.",
      date: "Wedding Scenography",
      instagramUrl: "https://www.instagram.com/the.petalmusee/",
    },
    {
      id: "post-06",
      imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=85",
      caption: "Macro botanical study: nuanced gradients of garden ranunculus in honey and champagne hues.",
      date: "Botanical Study",
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
  // 16. FOOTER & CREDITS
  // ---------------------------------------------------------------------
  footer: {
    marqueeText: "THE PETAL MUSE • CREATING BEAUTY IN EVERY DETAIL • FLOWERS REIMAGINED • BOTANICAL ARTISTRY • ",
    tagline: "An international floral atelier sculpting living poetry for extraordinary spaces.",
    copyrightNotice: `© ${new Date().getFullYear()} THE PETAL MUSE. All rights reserved.`,
    credits: "Creative Direction & Floral Design by Jensi Dholariya",
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
