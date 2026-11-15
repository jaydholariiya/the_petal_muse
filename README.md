# 🌸 THE PETAL MUSE — Creative Floral Atelier

> **"Flowers, reimagined."**  
> An artistic expression of nature, beauty, and thoughtful floral design.  
> Creative Direction & Floral Design by **Jensi Dholariya**  
> Official Instagram: [@the.petalmusee](https://www.instagram.com/the.petalmusee/)

---

## 🏛️ Creative Concept: "The Blooming Day" & Editorial High Art

THE PETAL MUSE is redesigned as an **immersive botanical art gallery meets luxury editorial fashion magazine**. 

As visitors scroll through the site, the atmosphere shifts smoothly across the light of one continuous day in a flower garden:
1. **DAWN (Hero)**: Soft buttercream, apricot blush, floating 3D petals, and the opening bloom.
2. **MORNING (Philosophy & About)**: Pistachio sage tones, sculptural arch portrait of founder Jensi Dholariya, and atelier storytelling.
3. **GOLDEN NOON (Creations Gallery & Featured Moment)**: Honey gold & marigold sunlight, varied architectural window masks (arch, oval, tall, wide), and fullscreen interactive lightbox.
4. **SUNSET (Floral Craft & Workshop)**: Apricot blush & peony rose, overlapping frosted glass service cards, and the interactive **"Design Your Floral Mood"** workshop.
5. **NIGHT GARDEN (Contact & Concierge)**: Deep ink aubergine & mulberry wine, glowing marigold fireflies, and seamless WhatsApp & email enquiry dispatch.

---

## 💎 Ground Rules Respected

- **Zero Backend / Zero Database / Zero Scraping**: Pure, lightweight frontend that deploys anywhere in seconds.
- **Single Source of Truth**: All text, images, reels, services, colors, and links live in **`/content/site.ts`**.
- **No Invented Contact Details**: Clear placeholders (`ADD_PHONE_HERE`, `ADD_EMAIL_HERE`, `ADD_LOCATION_HERE`) ready for the owner to drop in real details.
- **Real Logo Support**: Points to `/public/logo.png`. If not yet added, the website automatically renders a typographic display serif wordmark and botanical mark.
- **Outbound Instagram Links**: All items link cleanly to `@the.petalmusee`.

---

## 🛠️ Quick Start (How to Edit in 2 Minutes)

### 1. Update Contact Info & Phone
Open `/content/site.ts` and update the placeholders:
```typescript
brand: {
  whatsappNumber: "+919876543210", // Your real WhatsApp number
  contactEmail: "enquiries@thepetalmuse.com", // Your email
  location: "Surat & Ahmedabad, Gujarat",
  ...
}
```

### 2. Add New Creations to the Gallery
Add one object to the `creations` array in `/content/site.ts`:
```typescript
{
  id: "creation-09",
  title: "Ethereal Garden Wedding Arch",
  category: "installations", // 'installations' | 'editorial' | 'tablescapes' | 'bouquets'
  categoryLabel: "Sculptural Installation",
  imageUrl: "https://your-image-url.jpg", // or "/gallery/my-arch.jpg"
  maskShape: "arch", // 'arch' | 'oval' | 'tall' | 'wide'
  caption: "Over 800 heirloom garden roses draped in raw silk ribbon.",
  season: "Autumn Milestone",
  botanicals: ["David Austin Roses", "Delphinium", "Smokebush"],
  instagramUrl: "https://www.instagram.com/the.petalmusee/",
}
```

### 3. Add or Swap Video Reels
Drop your 9:16 vertical MP4 in `/public/reels/` and add to the `reels` array in `/content/site.ts`:
```typescript
{
  id: "reel-05",
  title: "Behind The Scenes: Morning Florals",
  caption: "Sourcing dawn stems for an intimate celebration.",
  posterUrl: "/gallery/poster-05.jpg",
  videoUrl: "/reels/reel-05.mp4",
  duration: "0:25",
  instagramUrl: "https://www.instagram.com/the.petalmusee/",
}
```

---

## 🎨 Color Palette & Design Tokens

| Token | Hex | Mood / Section |
| :--- | :--- | :--- |
| `--ink-aubergine` | `#1B1220` | Night Garden / Deep text |
| `--midnight-forest` | `#10251F` | Deep botanical shadow |
| `--mulberry-wine` | `#4A1F3D` | Sunset dusk / Luxury accent |
| `--dusty-orchid` | `#B78AA8` | Subtle petal tone |
| `--apricot-blush` | `#F4B9A0` | Dawn warmth & highlights |
| `--peony-rose` | `#E58FA0` | Sunset blossom |
| `--pistachio-sage` | `#B9C9A3` | Morning garden green |
| `--muted-jade` | `#668B78` | Botanical leaves |
| `--butter-cream` | `#FBF4E6` | Editorial paper backdrop |
| `--marigold-glow` | `#E8A93B` | Golden dust & fireflies |

---

## 🚀 Deployment to Vercel (1-Click Free Hosting)

1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Leave all build settings as default (Framework Preset: **Next.js**).
5. Click **"Deploy"**.
6. Connect your custom domain (e.g. `thepetalmuse.com`) in the Vercel dashboard.

---

## 💻 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D & Canvas**: Three.js + React Three Fiber + Drei
- **Motion & Interactions**: Framer Motion
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti

